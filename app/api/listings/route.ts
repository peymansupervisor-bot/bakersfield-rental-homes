import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

// GET /api/listings — fetch active listings (with optional filters)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const minBeds = searchParams.get('minBeds')
  const maxRent = searchParams.get('maxRent')

  const db = createServiceClient()
  let query = db
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (minBeds) query = query.gte('bedrooms', parseInt(minBeds))
  if (maxRent) query = query.lte('monthly_rent', parseInt(maxRent))

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

    if (!Array.isArray(body.photos) || body.photos.length < 10) {
      return NextResponse.json({ error: 'Minimum 10 photos required' }, { status: 400 })
    }

    const db = createServiceClient()
    const { data, error } = await db
      .from('listings')
      .insert({
        ...body,
        status: 'pending',
        state: body.state || 'CA',
      })
      .select('id')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
