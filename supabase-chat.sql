-- Bakersfield Rental Homes — Chat sessions table
-- Run in: Supabase Dashboard → SQL Editor → New Query

CREATE TABLE IF NOT EXISTS chat_messages (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT        NOT NULL,
  role       TEXT        NOT NULL CHECK (role IN ('user', 'bot')),
  message    TEXT        NOT NULL,
  name       TEXT,
  email      TEXT
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Only service role (server-side API) can read or write
CREATE POLICY "Service role only"
  ON chat_messages FOR ALL
  USING (false)
  WITH CHECK (false);

CREATE INDEX IF NOT EXISTS chat_session ON chat_messages(session_id, created_at);
