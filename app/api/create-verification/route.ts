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
      .select('id, title')
      .eq('id', listingId)
      .eq('status', 'pending')
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Create a Stripe Identity verification session
    const verificationSession = await stripe.identity.verificationSessions.create({
      type: 'document',
      options: {
        document: {
          require_live_capture: true,
          require_matching_selfie: true,
        },
      },
      metadata: {
        listing_id: listingId,
      },
      return_url: `${baseUrl}/list/success?listing_id=${listingId}`,
    })

    // Save verification session ID on the listing for webhook correlation
    await db
      .from('listings')
      .update({ stripe_session_id: verificationSession.id })
      .eq('id', listingId)

    return NextResponse.json({ url: verificationSession.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
