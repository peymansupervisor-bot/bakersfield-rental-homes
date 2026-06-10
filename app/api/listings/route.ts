import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, generateSlug } from '@/lib/supabase'
import { warmPhotoCache } from '@/lib/warmPhotoCache'

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
    .eq('city', 'Bakersfield')
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

    // Kern County-only restriction
    const KERN_COUNTY_ZIPS = new Set([
      '93201','93203','93204','93205','93206','93207','93208','93215','93216',
      '93220','93222','93224','93225','93226','93230','93232','93234','93238',
      '93239','93240','93241','93242','93243','93244','93245','93246','93247',
      '93249','93250','93251','93252','93255','93256','93257','93258','93260',
      '93261','93262','93263','93265','93267','93268','93270','93271','93272',
      '93274','93275','93276','93277','93278','93279','93280','93281','93282',
      '93283','93285','93286','93287','93291','93292','93301','93302','93303',
      '93304','93305','93306','93307','93308','93309','93310','93311','93312',
      '93313','93314','93380','93381','93382','93383','93384','93385','93386',
      '93387','93388','93389','93390','93501','93502','93505','93516','93518',
      '93519','93523','93524','93527','93528','93531','93532','93534','93535',
      '93536','93553','93554','93555','93556','93558','93560','93561','93562',
      '93563','93581','93596',
    ])
    const KERN_COUNTY_CITIES = new Set([
      'bakersfield','delano','ridgecrest','tehachapi','wasco','shafter',
      'mcfarland','arvin','taft','california city','maricopa','lamont',
      'rosamond','boron','frazier park','lake isabella','mojave','stallion springs',
      'buttonwillow','lost hills','mettler','oildale','rancheria',
      'keene','glennville','kernville','onyx','weldon','inyokern',
    ])
    const zip = (body.zip ?? '').trim()
    const city = (body.city ?? '').trim().toLowerCase()
    const inKern = (zip && KERN_COUNTY_ZIPS.has(zip)) || KERN_COUNTY_CITIES.has(city)
    if (!inKern) {
      return NextResponse.json(
        { error: 'This platform only accepts properties located in Kern County, CA.' },
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
        status: 'active',
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
        rental_status:    body.rental_status === 'active' ? 'draft' : (body.rental_status ?? 'draft'),
        available_date:   body.available_date ?? null,
        lease_term:       body.lease_term ?? null,
        pets_allowed:     body.pets_allowed ?? false,
        section_8:        body.section_8 ?? false,
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

    // Warm photo cache so first visitor sees photos instantly
    if (data && body.photos?.length) {
      warmPhotoCache(body.photos).catch(() => {})
    }

    // Trigger SEO + ADA audit — fire-and-forget
    const auditSecret = process.env.LISTING_AUDIT_SECRET
    if (auditSecret && data?.id) {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bakersfieldrentalhomes.com'}/api/listing-audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-secret': auditSecret },
        body: JSON.stringify({ listingId: data.id, _internal: true }),
      }).catch(() => {})
    }

    return NextResponse.json({ id: data.id, slug: data.slug })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
