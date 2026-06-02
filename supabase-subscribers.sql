-- Bakersfield Rental Homes — Subscribers table
-- Run in: Supabase Dashboard → SQL Editor → New Query

CREATE TABLE IF NOT EXISTS subscribers (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email      TEXT        NOT NULL UNIQUE,
  phone      TEXT,
  source     TEXT        DEFAULT 'homepage'
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Only service role (server-side API) can insert or read
CREATE POLICY "Service role only"
  ON subscribers FOR ALL
  USING (false)
  WITH CHECK (false);
