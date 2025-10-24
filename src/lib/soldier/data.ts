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
    .map((game) => {
      // Count picks for each team
      const homePicks = game.picks?.filter(pick => pick.selection === 'home').length ?? 0
      const awayPicks = game.picks?.filter(pick => pick.selection === 'away').length ?? 0
      
      return {
        id: game.id,
        title: game.title,
        weekNumber: game.week_number,
        weekLabel: weekLabels.get(game.week_number) ?? `Week ${game.week_number}`,
        homeTeam: game.home_team,
        awayTeam: game.away_team,
        kickoffAt: game.kickoff_at,
        isLocked: game.is_locked,
        selection: (selections.get(game.id)?.selection as 'home' | 'away' | undefined) ?? null,
        homePickCount: homePicks,
        awayPickCount: awayPicks,
      }
    }) ?? []

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

  const [{ data: games }, { data: teams }, { data: points }, { data: weeks }, { data: ledger }] = await Promise.all([
    supabase
      .from('sl_games')
      .select('id, title, week_number, home_team, away_team, kickoff_at, is_locked, result, created_at, updated_at')
      .order('week_number', { ascending: true }),
    supabase.from('sl_teams').select('id, name, short_code').order('name', { ascending: true }),
    supabase.from('sl_team_points').select('team_id, total_points'),
    supabase.from('sl_weeks').select('week_number, label'),
    supabase
      .from('sl_points_ledger')
      .select(`
        id,
        points,
        source,
        note,
        created_at,
        created_by,
        team:sl_teams(name)
      `)
      .order('created_at', { ascending: false }),
  ])

  // Try to get admin data, but don't fail if it doesn't exist
  let admins: any[] = []
  try {
    const { data: adminData } = await supabase.from('sl_admins').select('id, email')
    admins = adminData || []
  } catch {
    // If admin table doesn't exist or has issues, continue without it
    admins = []
  }

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

  // Create admin lookup map
  const adminMap = new Map<string, string>()
  if (admins) {
    admins.forEach((admin) => {
      adminMap.set(admin.id, admin.email)
    })
  }

  const allGames = (games ?? []).map((g) => ({
    ...g,
    week_label: adminWeekLabels.get(g.week_number) ?? `Week ${g.week_number}`,
  }))

  // Separate games by result status
  const currentGames = allGames.filter(game => !game.result)
  const gameHistory = allGames.filter(game => !!game.result)

  // Sort current games by week number, then by kickoff time
  currentGames.sort((a, b) => {
    if (a.week_number !== b.week_number) {
      return a.week_number - b.week_number
    }
    if (a.kickoff_at && b.kickoff_at) {
      return new Date(a.kickoff_at).getTime() - new Date(b.kickoff_at).getTime()
    }
    return 0
  })

  // Sort game history by week number, then by updated_at (completion date)
  gameHistory.sort((a, b) => {
    if (a.week_number !== b.week_number) {
      return a.week_number - b.week_number
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })

  return {
    currentGames,
    gameHistory,
    teams:
      teams?.map((team) => ({
        ...team,
        total_points: totals.get(team.id) ?? 0,
      })) ?? [],
    ledger: ledger?.map((entry) => ({
      id: entry.id,
      points: entry.points,
      source: entry.source,
      note: entry.note,
      created_at: entry.created_at,
      team_name: entry.team?.name ?? 'Unknown Team',
      admin_email: entry.created_by ? adminMap.get(entry.created_by) ?? 'Unknown Admin' : 'System',
    })) ?? [],
  }
}
