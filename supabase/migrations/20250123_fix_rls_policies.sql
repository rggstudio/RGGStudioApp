-- Fix RLS policies that reference non-existent user_id column
-- The admin authentication uses JWT tokens, not Supabase auth users
-- Service role should have full access to admin tables

-- Drop the problematic policies
drop policy if exists sl_games_read_admin on public.sl_games;
drop policy if exists sl_games_update_admin on public.sl_games;
drop policy if exists sl_picks_admin_read on public.sl_picks;
drop policy if exists sl_points_read_admin on public.sl_points_ledger;

-- Create simplified policies that only allow service role access
-- (since admin authentication is handled via JWT tokens in API routes)

-- Allow service role full access to sl_games
create policy sl_games_service_role on public.sl_games
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Allow service role full access to sl_picks  
create policy sl_picks_service_role on public.sl_picks
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Allow service role full access to sl_points_ledger
create policy sl_points_service_role on public.sl_points_ledger
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Allow service role full access to sl_admins
create policy sl_admins_service_role on public.sl_admins
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
