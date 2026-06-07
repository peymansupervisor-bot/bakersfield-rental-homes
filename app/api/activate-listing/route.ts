import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { warmPhotoCache } from '@/lib/warmPhotoCache'

export async function POST(req: NextRequest) {
  try {
    const { listingId, contactEmail } = await req.json()

    if (!listingId || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ownerEmail = process.env.OWNER_EMAIL
    if (!ownerEmail) {
      return NextResponse.json({ error: 'Owner not configured' }, { status: 500 })
    }

    // Server-side check — OWNER_EMAIL never leaves the server
    if (contactEmail.toLowerCase().trim() !== ownerEmail.toLowerCase().trim()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = createServiceClient()

    // Double-check: listing must be pending AND its stored contact_email must also match
    const { data: listing, error: fetchErr } = await db
      .from('listings')
      .select('id, title, contact_email')
      .eq('id', listingId)
      .eq('status', 'pending')
      .single()

    if (fetchErr || !listing) {
      return NextResponse.json({ error: 'Listing not found or already active' }, { status: 404 })
    }

    if (listing.contact_email.toLowerCase().trim() !== ownerEmail.toLowerCase().trim()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Both checks passed — activate without payment
    const { data: fullListing, error: updateErr } = await db
      .from('listings')
      .update({ status: 'active' })
      .eq('id', listingId)
      .select('photos')
      .single()

    if (updateErr) {
      return NextResponse.json({ error: 'Failed to activate listing' }, { status: 500 })
    }

    // Warm Vercel image cache so photos load instantly for the first visitor
    if (fullListing?.photos?.length) {
      warmPhotoCache(fullListing.photos).catch(() => {})
    }

    // Trigger SEO + ADA audit automatically — fire-and-forget, doesn't block the response
    const auditSecret = process.env.LISTING_AUDIT_SECRET
    if (auditSecret) {
      const auditUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bakersfieldrentalhomes.com'}/api/listing-audit`
      fetch(auditUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': auditSecret,
        },
        body: JSON.stringify({ listingId, _internal: true }),
      }).catch(err => console.error('[activate-listing] audit trigger failed:', err))
    }

    return NextResponse.json({ success: true, listingId })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
