-- ─────────────────────────────────────────────────────────────────────────────
-- Bakersfield Rental Homes — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Listings table
CREATE TABLE IF NOT EXISTS listings (
  id                UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at        TIMESTAMPTZ   DEFAULT NOW(),
  status            TEXT          DEFAULT 'pending'
                                  CHECK (status IN ('pending', 'active', 'expired')),
  stripe_session_id TEXT          UNIQUE,

  -- Location
  address           TEXT          NOT NULL,
  city              TEXT          NOT NULL,
  state             TEXT          DEFAULT 'CA',
  zip               TEXT,
  lat               FLOAT,
  lng               FLOAT,

  -- Property
  title             TEXT          NOT NULL,
  description       TEXT          NOT NULL,
  monthly_rent      INTEGER       NOT NULL,
  deposit           INTEGER       NOT NULL,
  bedrooms          INTEGER       NOT NULL DEFAULT 1,
  bathrooms         NUMERIC(3,1)  NOT NULL DEFAULT 1,
  living_area_sqft  INTEGER       NOT NULL,
  lot_size_sqft     INTEGER,

  -- Details
  available_date    DATE,
  lease_term        TEXT          DEFAULT '12 Months',
  pets_allowed      BOOLEAN       DEFAULT false,
  parking           TEXT          DEFAULT 'Street',
  amenities         TEXT[]        DEFAULT '{}',

  -- Photos (array of public Supabase Storage URLs)
  photos            TEXT[]        NOT NULL DEFAULT '{}',

  -- Contact
  contact_name      TEXT          NOT NULL,
  contact_email     TEXT          NOT NULL,
  contact_phone     TEXT
);

-- 2. Row-level security: anyone can read active listings
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active listings"
  ON listings FOR SELECT
  USING (status = 'active');

-- Service role key bypasses RLS automatically (used by API routes)

-- 3. Storage bucket for listing photos
--    Run this separately in: Supabase Dashboard → Storage → New bucket
--    Name: listing-photos
--    Public: YES (so photo URLs work without auth)
--
--    Or run via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-photos', 'listing-photos', true)
ON CONFLICT DO NOTHING;

-- Allow public read on the bucket
CREATE POLICY "Public read listing photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-photos');

-- Allow anyone to upload (the listing form calls Supabase directly with anon key)
CREATE POLICY "Anyone can upload listing photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'listing-photos');
