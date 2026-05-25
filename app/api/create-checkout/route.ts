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

    // Verify the listing exists and is pending
    const db = createServiceClient()
    const { data: listing, error } = await db
      .from('listings')
      .select('id, title, monthly_rent')
      .eq('id', listingId)
      .eq('status', 'pending')
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 100, // $1.00
            product_data: {
              name: 'Rental Listing Fee',
              description: `Publish: ${listing.title}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        listing_id: listingId,
      },
      success_url: `${baseUrl}/list/success?listing_id=${listingId}`,
      cancel_url: `${baseUrl}/list?cancelled=1`,
    })

    // Save session ID on the listing for webhook correlation
    await db
      .from('listings')
      .update({ stripe_session_id: session.id })
      .eq('id', listingId)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
