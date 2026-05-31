-- Direct messages table
create table if not exists direct_messages (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz default now(),
  sender_id   uuid references profiles(id) on delete cascade not null,
  receiver_id uuid references profiles(id) on delete cascade not null,
  body        text not null,
  read        boolean default false
);

alter table direct_messages enable row level security;

create policy "Users can view their own messages"
  on direct_messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Authenticated users can send messages"
  on direct_messages for insert
  with check (auth.uid() = sender_id);

create policy "Receivers can mark messages as read"
  on direct_messages for update
  using (auth.uid() = receiver_id);

-- Index for fast conversation lookup
create index if not exists dm_sender_receiver on direct_messages(sender_id, receiver_id);
create index if not exists dm_receiver_sender on direct_messages(receiver_id, sender_id);
