-- Add Player Requests table for Power House League
-- Run this script in your Supabase SQL editor

-- Create the player_requests table
create table if not exists public.phl_player_requests (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.phl_teams (id) on delete cascade,
  player_name text not null,
  attribute text not null,
  points integer not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'denied')),
  denial_reason text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  processed_by uuid references public.phl_admins (id) on delete set null,
  processed_at timestamptz
);

-- Enable row level security
alter table public.phl_player_requests enable row level security;

-- Create RLS policy (service_role only, like other admin tables)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'phl_player_requests' and policyname = 'phl_player_requests_manage'
  ) then
    create policy phl_player_requests_manage on public.phl_player_requests
      for all
      using (false)
      with check (false);
  end if;
end
$$;

