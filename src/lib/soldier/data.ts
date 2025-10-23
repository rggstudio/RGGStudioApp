import { createServiceRoleClient } from '@/lib/supabase/clients'

export const getTeamDashboardData = async (teamId: string) => {
  const supabase = createServiceRoleClient()

  const [
    { data: team, error: teamError },
    { data: pointRow, error: pointsError },
    { data: weeks, error: weeksError },
  ] = await Promise.all([
    supabase.from('sl_teams').select('id, name, short_code').eq('id', teamId).single(),
    supabase.from('sl_team_points').select('team_id, total_points').eq('team_id', teamId).maybeSingle(),
    supabase.from('sl_weeks').select('week_number, label'),
  ])

  if (teamError) {
    throw teamError
  }

  if (pointsError) {
    throw pointsError
  }

  if (!team) {
    throw new Error('Team not found')
  }

  const { data: games, error: gamesError } = await supabase
    .from('sl_games')
    .select(
      `
        id,
        title,
        week_number,
        home_team,
        away_team,
        kickoff_at,
        is_locked,
        result,
        picks:sl_picks(team_id, selection, updated_at)
      `,
    )
    .order('week_number', { ascending: true })

  if (gamesError) {
    throw gamesError
  }

  const selections = new Map<string, { selection: string; updated_at: string }>()
  const weekLabels = new Map<number, string>()
  weeks?.forEach((w) => {
    weekLabels.set(w.week_number as number, w.label as string)
  })

  games?.forEach((game) => {
    game.picks?.forEach((pick) => {
      if (pick.team_id === teamId) {
        selections.set(game.id, {
          selection: pick.selection,
          updated_at: pick.updated_at,
        })
      }
    })
  })

  const currentGames = games
    ?.filter((game) => !game.result)
    .map((game) => ({
      id: game.id,
      title: game.title,
      weekNumber: game.week_number,
      weekLabel: weekLabels.get(game.week_number) ?? `Week ${game.week_number}`,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      kickoffAt: game.kickoff_at,
      isLocked: game.is_locked,
      selection: (selections.get(game.id)?.selection as 'home' | 'away' | undefined) ?? null,
    })) ?? []

  const history = games
    ?.filter((game) => !!game.result)
    .map((game) => {
      const pick = selections.get(game.id)
      const wasCorrect = pick ? pick.selection === game.result : false
      return {
        id: game.id,
        title: game.title,
        weekNumber: game.week_number,
        weekLabel: weekLabels.get(game.week_number) ?? `Week ${game.week_number}`,
        homeTeam: game.home_team,
        awayTeam: game.away_team,
        result: game.result,
        selection: pick?.selection ?? null,
        wasCorrect,
      }
    }) ?? []

  return {
    team: {
      id: team.id,
      name: team.name,
      shortCode: team.short_code,
      totalPoints: pointRow?.total_points ?? 0,
    },
    currentGames,
    history,
  }
}

export const getAdminDashboardData = async () => {
  const supabase = createServiceRoleClient()

  const [{ data: games }, { data: teams }, { data: points }, { data: weeks }] = await Promise.all([
    supabase
      .from('sl_games')
      .select('id, title, week_number, home_team, away_team, kickoff_at, is_locked, result, created_at')
      .order('week_number', { ascending: true }),
    supabase.from('sl_teams').select('id, name, short_code').order('name', { ascending: true }),
    supabase.from('sl_team_points').select('team_id, total_points'),
    supabase.from('sl_weeks').select('week_number, label'),
  ])

  const totals = new Map<string, number>()
  points?.forEach((row) => {
    if (row.team_id) {
      totals.set(row.team_id, row.total_points ?? 0)
    }
  })

  const adminWeekLabels = new Map<number, string>()
  weeks?.forEach((w) => {
    adminWeekLabels.set(w.week_number as number, w.label as string)
  })

  return {
    games:
      (games ?? []).map((g) => ({
        ...g,
        week_label: adminWeekLabels.get(g.week_number) ?? `Week ${g.week_number}`,
      })),
    teams:
      teams?.map((team) => ({
        ...team,
        total_points: totals.get(team.id) ?? 0,
      })) ?? [],
  }
}
