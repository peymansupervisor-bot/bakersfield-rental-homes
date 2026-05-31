import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

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
    const { data, error } = await db
      .from('listings')
      .insert({
        ...body,
        status: 'pending',
        state: 'CA',
        listed_date: today,
      })
      .select('id')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
