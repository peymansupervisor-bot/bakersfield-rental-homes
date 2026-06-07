/**
 * Automated SEO + ADA audit and auto-fix pipeline for listings.
 *
 * Called automatically whenever a listing is activated. Uses Claude to
 * rewrite thin or poorly structured content, then patches the listing
 * in Supabase and writes a structured audit log.
 *
 * SEO checks:
 *   - Title length (40–70 chars), keyword presence (address + city + beds)
 *   - Description length (≥150 chars), key property details mentioned
 *   - Slug existence and URL safety
 *   - Photo presence (≥1 photo required)
 *
 * ADA checks:
 *   - Title must be descriptive (not generic like "Nice house")
 *   - Description must not be ALL CAPS
 *   - Description must be readable (no symbol spam)
 *   - No content that could confuse assistive tech
 */

import Anthropic from '@anthropic-ai/sdk'
import type { Listing } from './supabase'
import { generateSlug } from './supabase'

const SITE_URL = 'https://bakersfieldrentalhomes.com'

export type AuditIssue = {
  type: 'seo' | 'ada'
  severity: 'critical' | 'high' | 'medium' | 'low'
  field: string
  message: string
  fixed: boolean
  original?: string
  fixed_value?: string
}

export type AuditResult = {
  listing_id: string
  audited_at: string
  issues: AuditIssue[]
  fixes_applied: number
  seo_score: number   // 0–100
  ada_score: number   // 0–100
  pass: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isAllCaps(text: string): boolean {
  const letters = text.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 10) return false
  return letters === letters.toUpperCase()
}

function hasKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

function isTitleDescriptive(title: string): boolean {
  const generic = ['house', 'home', 'rental', 'rent', 'property', 'nice', 'great', 'beautiful']
  const words = title.toLowerCase().split(/\s+/)
  const nonGeneric = words.filter(w => !generic.includes(w) && w.length > 2)
  return nonGeneric.length >= 2
}

// ─── Claude auto-fix ─────────────────────────────────────────────────────────

async function claudeFix(prompt: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [{ role: 'user', content: prompt }],
  })
  const block = msg.content[0]
  return block.type === 'text' ? block.text.trim() : ''
}

async function improveTitle(listing: Listing): Promise<string> {
  const bedsLabel = listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms}-Bedroom`
  const prompt = `You are writing an SEO-optimized rental listing title for a real estate website.

Property details:
- Address: ${listing.address}, ${listing.city}, CA ${listing.zip}
- Bedrooms: ${listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}
- Bathrooms: ${listing.bathrooms}
- Rent: $${listing.monthly_rent}/mo
- Pets allowed: ${listing.pets_allowed ? 'Yes' : 'No'}
- Key amenities: ${listing.amenities?.slice(0, 4).join(', ') || 'None listed'}

Current title: "${listing.title}"

Write a new title that:
- Is 45–68 characters long
- Includes the address and city
- Includes beds/baths count
- Mentions a key feature (pets, yard, solar, etc.) if applicable
- Is natural and readable — not keyword-stuffed
- Starts with the address

Reply with ONLY the title text, nothing else.`

  const result = await claudeFix(prompt)
  // Sanity check — must be between 30 and 80 chars
  if (result.length >= 30 && result.length <= 80) return result
  // Fallback: construct a simple guaranteed-valid title
  return `${listing.address} — ${bedsLabel} for Rent in ${listing.city}, CA`
}

async function improveDescription(listing: Listing): Promise<string> {
  const prompt = `You are writing an SEO-optimized, ADA-compliant rental listing description for a real estate website.

Property details:
- Address: ${listing.address}, ${listing.city}, CA ${listing.zip}
- Bedrooms: ${listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}
- Bathrooms: ${listing.bathrooms}
- Living area: ${listing.living_area_sqft} sq ft
- Lot size: ${listing.lot_size_sqft ? `${listing.lot_size_sqft} sq ft` : 'not listed'}
- Rent: $${listing.monthly_rent}/mo
- Deposit: $${listing.deposit}
- Lease term: ${listing.lease_term}
- Pets allowed: ${listing.pets_allowed ? 'Yes' : 'No'}
- Parking: ${listing.parking}
- Amenities: ${listing.amenities?.join(', ') || 'None listed'}
- Available: ${listing.available_date || 'Now'}

Current description: "${listing.description}"

Write an improved description that:
- Is 180–350 characters long
- Is written in plain, accessible English (ADA-compliant readability)
- Mentions bedrooms, bathrooms, square footage
- Highlights the top 2–3 amenities naturally
- Ends with a call to action like "Contact us directly — no broker fees."
- Uses sentence case (not ALL CAPS)
- Contains no symbols or emoji

Reply with ONLY the description text, nothing else.`

  const result = await claudeFix(prompt)
  if (result.length >= 100) return result
  // Fallback
  const bedsLabel = listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`
  return `${bedsLabel}, ${listing.bathrooms} bath home at ${listing.address}, ${listing.city}, CA. ${listing.living_area_sqft} sq ft. $${listing.monthly_rent}/mo. ${listing.pets_allowed ? 'Pets welcome.' : ''} Contact us directly — no broker fees.`
}

// ─── Main audit function ──────────────────────────────────────────────────────

export async function auditAndFixListing(
  listing: Listing,
  db: ReturnType<typeof import('./supabase').createServiceClient>
): Promise<AuditResult> {
  const issues: AuditIssue[] = []
  const updates: Partial<Listing> = {}

  // ── SEO Checks ──────────────────────────────────────────────────────────────

  // 1. Slug
  if (!listing.slug) {
    const newSlug = generateSlug(listing.address)
    issues.push({
      type: 'seo', severity: 'critical', field: 'slug',
      message: 'Missing URL slug — listing cannot be linked or indexed.',
      fixed: true, original: '', fixed_value: newSlug,
    })
    updates.slug = newSlug
  }

  // 2. Title length
  if (listing.title.length < 30 || listing.title.length > 80) {
    const newTitle = await improveTitle(listing)
    issues.push({
      type: 'seo', severity: 'high', field: 'title',
      message: `Title is ${listing.title.length} chars (ideal: 40–70). Rewritten for SEO.`,
      fixed: true, original: listing.title, fixed_value: newTitle,
    })
    updates.title = newTitle
    listing = { ...listing, title: newTitle }
  }

  // 3. Title missing address/city
  if (
    !hasKeyword(listing.title, listing.city) &&
    !hasKeyword(listing.title, listing.address.split(' ')[0])
  ) {
    const newTitle = await improveTitle(listing)
    issues.push({
      type: 'seo', severity: 'high', field: 'title',
      message: 'Title missing city or address — hurts local SEO ranking.',
      fixed: true, original: listing.title, fixed_value: newTitle,
    })
    updates.title = newTitle
    listing = { ...listing, title: newTitle }
  }

  // 4. Description length
  if (!listing.description || listing.description.length < 150) {
    const newDesc = await improveDescription(listing)
    issues.push({
      type: 'seo', severity: 'high', field: 'description',
      message: `Description is ${listing.description?.length ?? 0} chars (minimum 150). Expanded for SEO.`,
      fixed: true, original: listing.description, fixed_value: newDesc,
    })
    updates.description = newDesc
    listing = { ...listing, description: newDesc }
  }

  // 5. Photos
  if (!listing.photos || listing.photos.length === 0) {
    issues.push({
      type: 'seo', severity: 'critical', field: 'photos',
      message: 'No photos uploaded. Listings without photos rank significantly lower.',
      fixed: false,
    })
  } else if (listing.photos.length < 5) {
    issues.push({
      type: 'seo', severity: 'medium', field: 'photos',
      message: `Only ${listing.photos.length} photo(s). 10+ photos improve engagement and ranking.`,
      fixed: false,
    })
  }

  // ── ADA Checks ──────────────────────────────────────────────────────────────

  // 6. ALL CAPS title
  if (isAllCaps(listing.title)) {
    const newTitle = await improveTitle(listing)
    issues.push({
      type: 'ada', severity: 'high', field: 'title',
      message: 'Title is ALL CAPS — screen readers read each letter individually.',
      fixed: true, original: listing.title, fixed_value: newTitle,
    })
    updates.title = newTitle
    listing = { ...listing, title: newTitle }
  }

  // 7. ALL CAPS description
  if (listing.description && isAllCaps(listing.description)) {
    const newDesc = await improveDescription(listing)
    issues.push({
      type: 'ada', severity: 'high', field: 'description',
      message: 'Description is ALL CAPS — difficult for screen readers and low readability.',
      fixed: true, original: listing.description, fixed_value: newDesc,
    })
    updates.description = newDesc
    listing = { ...listing, description: newDesc }
  }

  // 8. Non-descriptive title
  if (!isTitleDescriptive(listing.title)) {
    const newTitle = await improveTitle(listing)
    issues.push({
      type: 'ada', severity: 'medium', field: 'title',
      message: 'Title is too generic — does not convey property details to screen reader users.',
      fixed: true, original: listing.title, fixed_value: newTitle,
    })
    updates.title = newTitle
    listing = { ...listing, title: newTitle }
  }

  // 9. Symbol/emoji spam in description
  const symbolCount = (listing.description || '').replace(/[a-zA-Z0-9\s.,!?$'\-–]/g, '').length
  if (symbolCount > 10) {
    const newDesc = await improveDescription(listing)
    issues.push({
      type: 'ada', severity: 'medium', field: 'description',
      message: 'Description contains excessive symbols/emoji that disrupt screen reader flow.',
      fixed: true, original: listing.description, fixed_value: newDesc,
    })
    updates.description = newDesc
  }

  // ── Apply fixes to Supabase ──────────────────────────────────────────────────

  const fixesApplied = Object.keys(updates).length

  if (fixesApplied > 0) {
    await db.from('listings').update(updates).eq('id', listing.id)
  }

  // ── Scoring ──────────────────────────────────────────────────────────────────

  const seoIssues = issues.filter(i => i.type === 'seo')
  const adaIssues = issues.filter(i => i.type === 'ada')

  const seoDeductions = seoIssues.reduce((sum, i) => {
    return sum + (i.severity === 'critical' ? 30 : i.severity === 'high' ? 20 : i.severity === 'medium' ? 10 : 5)
  }, 0)
  const adaDeductions = adaIssues.reduce((sum, i) => {
    return sum + (i.severity === 'critical' ? 30 : i.severity === 'high' ? 20 : i.severity === 'medium' ? 10 : 5)
  }, 0)

  const seoScore = Math.max(0, 100 - seoDeductions)
  const adaScore = Math.max(0, 100 - adaDeductions)

  const result: AuditResult = {
    listing_id: listing.id,
    audited_at: new Date().toISOString(),
    issues,
    fixes_applied: fixesApplied,
    seo_score: seoScore,
    ada_score: adaScore,
    pass: seoScore >= 70 && adaScore >= 70,
  }

  // ── Log to Supabase audit_logs table ─────────────────────────────────────────
  await db.from('listing_audit_logs').insert({
    listing_id: listing.id,
    audited_at: result.audited_at,
    issues: result.issues,
    fixes_applied: result.fixes_applied,
    seo_score: result.seo_score,
    ada_score: result.ada_score,
    pass: result.pass,
  }).then(() => {}) // fire-and-forget — don't block on logging failure

  return result
}
