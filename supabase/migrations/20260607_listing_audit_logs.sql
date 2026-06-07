-- Audit log table for automatic SEO + ADA checks on every listing activation.
-- Records what was checked, what issues were found, and what was auto-fixed.

create table if not exists listing_audit_logs (
  id              uuid primary key default gen_random_uuid(),
  listing_id      uuid not null references listings(id) on delete cascade,
  audited_at      timestamptz not null default now(),
  issues          jsonb not null default '[]',
  fixes_applied   integer not null default 0,
  seo_score       integer not null default 0,
  ada_score       integer not null default 0,
  pass            boolean not null default false
);

-- Index for fast lookups by listing
create index if not exists listing_audit_logs_listing_id_idx
  on listing_audit_logs (listing_id);

-- Index for audit dashboard queries ordered by time
create index if not exists listing_audit_logs_audited_at_idx
  on listing_audit_logs (audited_at desc);

-- RLS: only service role can insert/select (audit runs server-side only)
alter table listing_audit_logs enable row level security;

create policy "Service role only"
  on listing_audit_logs
  for all
  using (false)
  with check (false);
