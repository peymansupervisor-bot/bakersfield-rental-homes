import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, generateSlug } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/listings — fetch active listings (with optional filters)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const minBeds    = searchParams.get('minBeds')
  const minBaths   = searchParams.get('minBaths')
  const minRent    = searchParams.get('minRent')
  const maxRent    = searchParams.get('maxRent')
  const zip        = searchParams.get('zip')
  const district   = searchParams.get('district')

  const db = createServiceClient()
  let query = db
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (minBeds)  query = query.gte('bedrooms', parseInt(minBeds))
  if (minBaths) query = query.gte('bathrooms', parseFloat(minBaths))
  if (minRent)  query = query.gte('monthly_rent', parseInt(minRent))
  if (maxRent)  query = query.lte('monthly_rent', parseInt(maxRent))
  if (zip)      query = query.eq('zip', zip.trim())
  if (district) query = query.ilike('description', `%${district.trim()}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ listings: data })
}

// POST /api/listings — create a pending listing (called before Stripe redirect)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    const required = [
      'title', 'address', 'city', 'description',
      'monthly_rent', 'deposit', 'bedrooms', 'bathrooms',
      'living_area_sqft', 'photos', 'contact_name', 'contact_email',
    ]
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 })
      }
    }

    // California-only restriction
    const state = (body.state ?? '').trim().toUpperCase()
    if (state !== 'CA' && state !== 'CALIFORNIA') {
      return NextResponse.json(
        { error: 'This platform only accepts properties located in California.' },
        { status: 400 }
      )
    }

    if (!Array.isArray(body.photos) || body.photos.length < 10) {
      return NextResponse.json({ error: 'Minimum 10 photos required' }, { status: 400 })
    }

    const db = createServiceClient()
    const today = new Date().toISOString().split('T')[0]

    // Duplicate guard — normalize address for comparison
    const normalizedAddress = (body.address as string).trim().toLowerCase()

    const { data: existingListings } = await db
      .from('listings')
      .select('id, slug, status')
      .ilike('address', normalizedAddress)

    if (existingListings?.length) {
      const active  = existingListings.find(l => l.status === 'active')
      const pending = existingListings.find(l => l.status === 'pending')

      if (active) {
        return NextResponse.json(
          { error: 'A listing for this address is already active on the site. Contact us if you need to update it.' },
          { status: 409 }
        )
      }
      if (pending) {
        // Reuse the existing draft so the landlord can proceed to payment
        return NextResponse.json({ id: pending.id, slug: pending.slug })
      }
    }

    // Generate a unique slug from the address (e.g. "717 Monterey St" → "717-monterey-st")
    const baseSlug = generateSlug(body.address as string)
    // Check for conflicts and append a counter if needed
    let slug = baseSlug
    let attempt = 0
    while (true) {
      const { data: existing } = await db
        .from('listings')
        .select('id')
        .eq('slug', slug)
        .maybeSingle()
      if (!existing) break
      attempt++
      slug = `${baseSlug}-${attempt}`
    }

    const { data, error } = await db
      .from('listings')
      .insert({
        slug,
        status: 'pending',
        listed_date: today,
        // Whitelisted fields only — never spread the full body
        title:            body.title,
        address:          body.address,
        city:             body.city,
        state:            'CA',
        zip:              body.zip ?? null,
        lat:              body.lat ?? null,
        lng:              body.lng ?? null,
        description:      body.description,
        monthly_rent:     body.monthly_rent,
        deposit:          body.deposit,
        bedrooms:         body.bedrooms,
        bathrooms:        body.bathrooms,
        living_area_sqft: body.living_area_sqft,
        lot_size_sqft:    body.lot_size_sqft ?? null,
        rental_status:    body.rental_status ?? 'vacant',
        available_date:   body.available_date ?? null,
        lease_term:       body.lease_term ?? null,
        pets_allowed:     body.pets_allowed ?? false,
        parking:          body.parking ?? null,
        amenities:        body.amenities ?? [],
        photos:           body.photos,
        contact_name:     body.contact_name,
        contact_email:    body.contact_email,
        contact_phone:    body.contact_phone ?? null,
      })
      .select('id, slug')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ id: data.id, slug: data.slug })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
