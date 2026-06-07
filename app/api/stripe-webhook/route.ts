import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase'
import { warmPhotoCache } from '@/lib/warmPhotoCache'

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

  // Handle Stripe Identity verification completed
  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object as Stripe.Identity.VerificationSession
    const listingId = session.metadata?.listing_id

    if (listingId) {
      const db = createServiceClient()
      const { data: activated, error } = await db
        .from('listings')
        .update({ status: 'active' })
        .eq('id', listingId)
        .select('photos')
        .single()

      if (error) {
        console.error('Failed to activate listing:', error)
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
      }

      console.log(`Listing ${listingId} activated after identity verification ${session.id}`)

      // Warm Vercel image cache so photos load instantly for the first visitor
      if (activated?.photos?.length) {
        warmPhotoCache(activated.photos).catch(() => {})
      }
    }
  }

  // Keep supporting legacy $1 payment flow during transition
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const listingId = session.metadata?.listing_id

    if (listingId) {
      const db = createServiceClient()
      const { data: activated, error } = await db
        .from('listings')
        .update({ status: 'active' })
        .eq('id', listingId)
        .select('photos')
        .single()

      if (error) {
        console.error('Failed to activate listing:', error)
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
      }

      console.log(`Listing ${listingId} activated after payment ${session.id}`)

      if (activated?.photos?.length) {
        warmPhotoCache(activated.photos).catch(() => {})
      }
    }
  }

  return NextResponse.json({ received: true })
}
