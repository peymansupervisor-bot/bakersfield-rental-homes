-- Enable UUID extension (already enabled in most Supabase projects)
create extension if not exists "uuid-ossp";

-- ── Profiles ────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  display_name text,
  avatar_url  text,
  created_at  timestamptz default now()
);

alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── Community Posts ──────────────────────────────────────────────────────────
create table if not exists community_posts (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz default now(),
  user_id     uuid references profiles(id) on delete cascade not null,
  category    text not null,
  title       text not null,
  body        text not null,
  photo_url   text,
  contact_email text,
  is_flagged  boolean default false
);

alter table community_posts enable row level security;
create policy "Posts viewable by everyone"   on community_posts for select using (not is_flagged);
create policy "Authenticated users can post" on community_posts for insert with check (auth.uid() = user_id);
create policy "Authors can delete own posts" on community_posts for delete using (auth.uid() = user_id);

-- ── Comments ────────────────────────────────────────────────────────────────
create table if not exists community_comments (
  id         uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  post_id    uuid references community_posts(id) on delete cascade not null,
  user_id    uuid references profiles(id) on delete cascade not null,
  body       text not null
);

alter table community_comments enable row level security;
create policy "Comments viewable by everyone"       on community_comments for select using (true);
create policy "Authenticated users can comment"     on community_comments for insert with check (auth.uid() = user_id);
create policy "Authors can delete own comments"     on community_comments for delete using (auth.uid() = user_id);

-- ── Storage bucket for community photos ─────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('community-photos', 'community-photos', true)
on conflict (id) do nothing;

create policy "Anyone can view community photos"
  on storage.objects for select
  using (bucket_id = 'community-photos');

create policy "Authenticated users can upload community photos"
  on storage.objects for insert
  with check (bucket_id = 'community-photos' and auth.role() = 'authenticated');
