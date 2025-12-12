-- Soldier Picks schema
create extension if not exists pgcrypto;

create table if not exists public.sl_teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  short_code text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.sl_team_codes (
  team_id uuid primary key references public.sl_teams (id) on delete cascade,
  pin_hash text not null,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.sl_weeks (
  week_number smallint primary key,
  label text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.sl_games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  week_number smallint not null references public.sl_weeks (week_number) on delete restrict,
  home_team text not null,
  away_team text not null,
  kickoff_at timestamptz,
  is_locked boolean not null default false,
  result text check (result in ('home', 'away')) ,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  created_by uuid
);

create table if not exists public.sl_picks (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.sl_teams (id) on delete cascade,
  game_id uuid not null references public.sl_games (id) on delete cascade,
  selection text not null check (selection in ('home', 'away')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (team_id, game_id)
);

create table if not exists public.sl_points_ledger (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.sl_teams (id) on delete cascade,
  points integer not null,
  source text not null,
  note text,
  game_id uuid references public.sl_games (id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  created_by uuid
);

create unique index if not exists sl_points_auto_unique
  on public.sl_points_ledger (team_id, game_id)
  where source = 'auto_win';

create table if not exists public.sl_admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  pin_hash text,
  role text not null default 'commissioner',
  created_at timestamptz not null default timezone('utc'::text, now()),
  created_by uuid
);

create table if not exists public.sl_player_requests (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.sl_teams (id) on delete cascade,
  player_name text not null,
  attribute text not null,
  points integer not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'denied')),
  denial_reason text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  processed_by uuid references public.sl_admins (id) on delete set null,
  processed_at timestamptz
);

-- Use security_invoker to ensure RLS policies are respected
drop view if exists public.sl_team_points;
create view public.sl_team_points 
with (security_invoker = on) as
  select team_id, coalesce(sum(points), 0) as total_points
  from public.sl_points_ledger
  group by team_id;

-- Row level security
alter table public.sl_teams enable row level security;
alter table public.sl_team_codes enable row level security;
alter table public.sl_weeks enable row level security;
alter table public.sl_games enable row level security;
alter table public.sl_picks enable row level security;
alter table public.sl_points_ledger enable row level security;
alter table public.sl_admins enable row level security;
alter table public.sl_player_requests enable row level security;

-- Admin table is managed only by service role via API; no user-based policy needed

-- Ensure clients can call RPCs
do $$
begin
  -- Grant execute on auth function to anonymous and authenticated users
  grant execute on function public.sl_authenticate_team(text, text) to anon, authenticated;
  -- Admin functions are invoked by service role API routes
  grant execute on function public.sl_set_game_lock(uuid, boolean) to service_role;
  grant execute on function public.sl_award_points_for_game(uuid) to service_role;
exception when others then
  -- Ignore if already granted
  null;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'sl_admins' and policyname = 'sl_admins_manage'
  ) then
    create policy sl_admins_manage on public.sl_admins
      for all
      using (false)
      with check (false);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'sl_player_requests' and policyname = 'sl_player_requests_manage'
  ) then
    create policy sl_player_requests_manage on public.sl_player_requests
      for all
      using (false)
      with check (false);
  end if;
end
$$;

-- Allow admins to manage picks and games via service key or RPCs.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'sl_games' and policyname = 'sl_games_read_admin'
  ) then
    create policy sl_games_read_admin on public.sl_games
      for select
      using (
        auth.role() = 'service_role'
        or auth.uid() in (select user_id from public.sl_admins)
      );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'sl_games' and policyname = 'sl_games_update_admin'
  ) then
    create policy sl_games_update_admin on public.sl_games
      for all
      using (auth.uid() in (select user_id from public.sl_admins))
      with check (auth.uid() in (select user_id from public.sl_admins));
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'sl_picks' and policyname = 'sl_picks_admin_read'
  ) then
    create policy sl_picks_admin_read on public.sl_picks
      for select
      using (
        auth.role() = 'service_role'
        or auth.uid() in (select user_id from public.sl_admins)
      );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'sl_points_ledger' and policyname = 'sl_points_read_admin'
  ) then
    create policy sl_points_read_admin on public.sl_points_ledger
      for select
      using (
        auth.role() = 'service_role'
        or auth.uid() in (select user_id from public.sl_admins)
      );
  end if;
end
$$;

-- Public read access to teams list for login dropdown
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'sl_teams' and policyname = 'sl_teams_public_read'
  ) then
    create policy sl_teams_public_read on public.sl_teams
      for select
      using (true);
  end if;
end
$$;

create or replace function public.sl_authenticate_team(
  p_team_name text,
  p_pin text
) returns table (
  id uuid,
  name text,
  short_code text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team_id uuid;
  v_name text;
  v_short text;
  v_pin_hash text;
begin
  select t.id, t.name, t.short_code, c.pin_hash
  into v_team_id, v_name, v_short, v_pin_hash
  from public.sl_teams t
  join public.sl_team_codes c on c.team_id = t.id
  where lower(t.name) = lower(p_team_name)
  limit 1;

  if v_team_id is null then
    return;
  end if;

  -- Supabase typically installs pgcrypto into the "extensions" schema
  if extensions.crypt(p_pin, v_pin_hash) = v_pin_hash then
    return query
      select v_team_id, v_name, v_short;
  end if;
end;
$$;

-- Admin email+pin authentication
create or replace function public.sl_authenticate_admin(
  p_email text,
  p_pin text
) returns table (
  email text,
  role text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_role text;
  v_hash text;
begin
  select a.email, a.role, a.pin_hash
  into v_email, v_role, v_hash
  from public.sl_admins a
  where lower(a.email) = lower(p_email)
  limit 1;

  if v_email is null then
    return;
  end if;

  if v_hash is null then
    return;
  end if;

  if extensions.crypt(p_pin, v_hash) = v_hash then
    return query select v_email, v_role;
  end if;
end;
$$;

do $$
begin
  grant execute on function public.sl_authenticate_admin(text, text) to anon, authenticated;
exception when others then
  null;
end
$$;

create or replace function public.sl_set_game_lock(
  p_game_id uuid,
  p_lock boolean
) returns table (
  id uuid,
  is_locked boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_game_id uuid;
  v_is_locked boolean;
begin
  -- First check if the game exists
  select id into v_game_id
  from public.sl_games
  where id = p_game_id;
  
  if v_game_id is null then
    raise exception 'Game not found';
  end if;
  
  -- Update the game
  update public.sl_games
  set is_locked = p_lock, updated_at = timezone('utc'::text, now())
  where id = p_game_id
  returning id, is_locked into v_game_id, v_is_locked;
  
  -- Return the updated data
  return query select v_game_id, v_is_locked;
end;
$$;

create or replace function public.sl_award_points_for_game(
  p_game_id uuid
) returns table (
  team_id uuid,
  points_awarded integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result text;
begin
  select result into v_result
  from public.sl_games
  where id = p_game_id;

  if v_result is null then
    raise exception 'Game result is not set';
  end if;

  return query
    with winners as (
      select p.team_id as winning_team_id
      from public.sl_picks p
      where p.game_id = p_game_id
        and p.selection = v_result
    ),
    inserted as (
      insert into public.sl_points_ledger (team_id, points, source, game_id)
      select winning_team_id, 3, 'auto_win', p_game_id
      from winners
      on conflict on constraint sl_points_auto_unique do nothing
      returning team_id, points
    )
    select team_id, points from inserted;
end;
$$;

-- Seed helper: create weeks 1-18 if not present.
insert into public.sl_weeks (week_number, label)
select gs.week_number, gs.label
from (
  select generate_series(1, 18) as week_number,
         'Week ' || generate_series(1, 18) as label
) as gs
where not exists (
  select 1 from public.sl_weeks w where w.week_number = gs.week_number
);

-- Seed playoff rounds after Week 18
insert into public.sl_weeks (week_number, label)
values
  (19, 'Wildcard Round'),
  (20, 'Divisional Round'),
  (21, 'Conference Finals'),
  (22, 'Super Bowl')
on conflict (week_number) do nothing;
