import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  try {
    const { listingId } = await req.json()
    if (!listingId) {
      return NextResponse.json({ error: 'Missing listingId' }, { status: 400 })
    }

    const db = createServiceClient()
    const { data: listing, error } = await db
      .from('listings')
      .select('id, title, status')
      .eq('id', listingId)
      .eq('status', 'active')
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found or not active' }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 2900, // $29.00
            product_data: {
              name: 'Featured Listing — 30 Days',
              description: `Boost: ${listing.title} — pinned to top of search results for 30 days`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        listing_id: listingId,
        type: 'boost',
      },
      success_url: `${baseUrl}/list/boost-success?listing_id=${listingId}`,
      cancel_url: `${baseUrl}/listings/${listingId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
