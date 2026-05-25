import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// IMPORTANT: Disable body parsing so we can verify Stripe's signature
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const listingId = session.metadata?.listing_id

    if (listingId) {
      const db = createServiceClient()
      const { error } = await db
        .from('listings')
        .update({ status: 'active' })
        .eq('id', listingId)

      if (error) {
        console.error('Failed to activate listing:', error)
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
      }

      console.log(`Listing ${listingId} activated after payment ${session.id}`)
    }
  }

  return NextResponse.json({ received: true })
}
