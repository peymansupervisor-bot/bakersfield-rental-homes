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
        ...body,
        slug,
        status: 'pending',
        state: 'CA',
        listed_date: today,
      })
      .select('id, slug')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ id: data.id, slug: data.slug })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
