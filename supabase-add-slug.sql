-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: add slug column to listings
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add the slug column (nullable so existing rows don't break)
ALTER TABLE listings ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- 2. Create an index for fast slug lookups
CREATE INDEX IF NOT EXISTS listings_slug_idx ON listings (slug);

-- 3. Back-fill slugs for existing listings that don't have one yet
--    Converts address to lowercase-hyphenated form, e.g. "717 Monterey St" → "717-monterey-st"
--    Appends the first 8 chars of the UUID to avoid collisions between identical addresses.
UPDATE listings
SET slug = regexp_replace(
             regexp_replace(lower(address), '[^a-z0-9\s-]', '', 'g'),
             '\s+', '-', 'g'
           ) || '-' || substring(id::text, 1, 8)
WHERE slug IS NULL;
