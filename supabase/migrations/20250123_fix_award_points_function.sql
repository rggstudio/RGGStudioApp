-- Fix ambiguous column reference in sl_award_points_for_game function
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
