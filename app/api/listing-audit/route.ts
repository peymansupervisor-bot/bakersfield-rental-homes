/**
 * POST /api/listing-audit
 *
 * Called in two ways:
 *   1. Internally from /api/activate-listing (fire-and-forget after activation)
 *   2. Via Supabase Database Webhook when listings.status changes to 'active'
 *
 * Supabase webhook payload shape:
 *   { type: 'UPDATE', table: 'listings', record: { ...listing }, old_record: { ... } }
 *
 * Internal call shape:
 *   { listingId: string, _internal: true }
 *
 * Security: requests must include either:
 *   - Header: x-audit-secret: <LISTING_AUDIT_SECRET>    (Supabase webhook)
 *   - Header: x-internal-secret: <LISTING_AUDIT_SECRET> (internal calls)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { auditAndFixListing } from '@/lib/listingAudit'
import type { Listing } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const secret = process.env.LISTING_AUDIT_SECRET
  if (!secret) {
    console.error('[listing-audit] LISTING_AUDIT_SECRET not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const providedSecret =
    req.headers.get('x-audit-secret') ??
    req.headers.get('x-internal-secret')

  if (providedSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Parse payload ────────────────────────────────────────────────────────────
  let listing: Listing | null = null
  const db = createServiceClient()

  try {
    const body = await req.json()

    if (body._internal && body.listingId) {
      // Internal call from activate-listing — fetch fresh from DB
      const { data, error } = await db
        .from('listings')
        .select('*')
        .eq('id', body.listingId)
        .single()
      if (error || !data) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
      }
      listing = data as Listing
    } else if (body.record) {
      // Supabase database webhook — payload contains the updated row
      // Only audit when status just became 'active'
      if (body.record.status !== 'active') {
        return NextResponse.json({ skipped: true, reason: 'status is not active' })
      }
      // Skip if the old record was already active (avoid re-auditing on unrelated updates)
      if (body.old_record?.status === 'active') {
        return NextResponse.json({ skipped: true, reason: 'already was active' })
      }
      listing = body.record as Listing
    } else {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // ── Run audit ────────────────────────────────────────────────────────────────
  try {
    const result = await auditAndFixListing(listing, db)

    console.log(
      `[listing-audit] ${listing.id} — SEO: ${result.seo_score}/100, ADA: ${result.ada_score}/100, fixes: ${result.fixes_applied}`
    )

    return NextResponse.json(result)
  } catch (err: any) {
    console.error('[listing-audit] Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
