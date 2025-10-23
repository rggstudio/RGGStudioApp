'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import AdminTable from '@/components/soldier/AdminTable'

type AdminDashboardData = {
  games: {
    id: string
    title: string
    week_number: number
    week_label: string
    home_team: string
    away_team: string
    kickoff_at: string | null
    is_locked: boolean
    result: string | null
    created_at: string
  }[]
  teams: {
    id: string
    name: string
    short_code: string | null
    total_points: number
  }[]
}

const AdminDashboard = ({ dashboard }: { dashboard: AdminDashboardData }) => {
  const router = useRouter()
  const [createState, setCreateState] = useState({
    title: '',
    weekNumber: '',
    homeTeam: '',
    awayTeam: '',
    kickoffAt: '',
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [pendingAction, setPendingAction] = useState<string | null>(null)

  // Helper function to extract team short code from team name
  const getTeamShortCode = (teamName: string): string => {
    // Common NFL team abbreviations mapping
    const teamAbbreviations: Record<string, string> = {
      'Washington Commanders': 'WAS',
      'Tennessee Titans': 'TEN',
      'Kansas City Chiefs': 'KC',
      'Los Angeles Chargers': 'LAC',
      'Baltimore Ravens': 'BAL',
      'San Francisco 49ers': 'SF',
      'Buffalo Bills': 'BUF',
      'Miami Dolphins': 'MIA',
      'New England Patriots': 'NE',
      'New York Jets': 'NYJ',
      'Cincinnati Bengals': 'CIN',
      'Cleveland Browns': 'CLE',
      'Pittsburgh Steelers': 'PIT',
      'Houston Texans': 'HOU',
      'Indianapolis Colts': 'IND',
      'Jacksonville Jaguars': 'JAX',
      'Denver Broncos': 'DEN',
      'Las Vegas Raiders': 'LV',
      'Los Angeles Rams': 'LAR',
      'Arizona Cardinals': 'ARI',
      'Seattle Seahawks': 'SEA',
      'Dallas Cowboys': 'DAL',
      'New York Giants': 'NYG',
      'Philadelphia Eagles': 'PHI',
      'Chicago Bears': 'CHI',
      'Detroit Lions': 'DET',
      'Green Bay Packers': 'GB',
      'Minnesota Vikings': 'MIN',
      'Atlanta Falcons': 'ATL',
      'Carolina Panthers': 'CAR',
      'New Orleans Saints': 'NO',
      'Tampa Bay Buccaneers': 'TB',
    }
    
    return teamAbbreviations[teamName] || teamName.split(' ').map(word => word.charAt(0)).join('').substring(0, 3).toUpperCase()
  }

  const postJson = async (url: string, payload: Record<string, unknown>, actionLabel: string) => {
    setPendingAction(actionLabel)
    setMessage(null)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: body?.error ?? 'Request failed' })
        setPendingAction(null)
        return false
      }

      setMessage({ type: 'success', text: 'Updated successfully' })
      setPendingAction(null)
      router.refresh()
      return true
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unexpected error',
      })
      setPendingAction(null)
      return false
    }
  }

  const handleCreateGame = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const kickoffIso = createState.kickoffAt ? new Date(createState.kickoffAt).toISOString() : null

    const success = await postJson(
      '/api/soldier/admin/games',
      {
        ...createState,
        weekNumber: Number(createState.weekNumber),
        kickoffAt: kickoffIso,
      },
      'create-game',
    )

    if (success) {
      setCreateState({
        title: '',
        weekNumber: '',
        homeTeam: '',
        awayTeam: '',
        kickoffAt: '',
      })
    }
  }

  const toggleLock = (gameId: string, lock: boolean) =>
    postJson(`/api/soldier/admin/games/${gameId}/lock`, { lock }, `lock-${gameId}`)

  const setResult = (gameId: string, result: 'home' | 'away') =>
    postJson(`/api/soldier/admin/games/${gameId}/result`, { result }, `result-${gameId}-${result}`)

  const adjustPoints = (teamId: string, points: number, note?: string) =>
    postJson('/api/soldier/admin/points', { teamId, points, note }, `adjust-${teamId}`)

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow">
        <h2 className="text-lg font-semibold text-white">Create Game of the Week</h2>
        <p className="mt-1 text-sm text-slate-400">
          Define the matchup and share it with the league. You can lock picks or set the winner later.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleCreateGame}>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              value={createState.title}
              onChange={(event) => setCreateState((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Ravens vs Bengals"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="weekNumber">
              Week
            </label>
            <input
              id="weekNumber"
              type="number"
              min={1}
              max={22}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              value={createState.weekNumber}
              onChange={(event) => setCreateState((prev) => ({ ...prev, weekNumber: event.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="kickoffAt">
              Kickoff (optional)
            </label>
            <input
              id="kickoffAt"
              type="datetime-local"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              value={createState.kickoffAt}
              onChange={(event) => setCreateState((prev) => ({ ...prev, kickoffAt: event.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="homeTeam">
              Home team
            </label>
            <select
              id="homeTeam"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              value={createState.homeTeam}
              onChange={(event) => setCreateState((prev) => ({ ...prev, homeTeam: event.target.value }))}
              required
            >
              <option value="" disabled>
                Select home team
              </option>
              {dashboard.teams.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                  {t.short_code ? ` (${t.short_code})` : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="awayTeam">
              Away team
            </label>
            <select
              id="awayTeam"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              value={createState.awayTeam}
              onChange={(event) => setCreateState((prev) => ({ ...prev, awayTeam: event.target.value }))}
              required
            >
              <option value="" disabled>
                Select away team
              </option>
              {dashboard.teams.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                  {t.short_code ? ` (${t.short_code})` : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              type="submit"
              disabled={pendingAction === 'create-game'}
            >
              {pendingAction === 'create-game' ? 'Creating...' : 'Create game'}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Games Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Lock picks before kickoff, set results, and award points automatically.
          </p>
        </div>
        <div className="space-y-4">
          {dashboard.games.length ? (
            dashboard.games.map((game) => (
              <div key={game.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">{game.week_label}</p>
                    <h3 className="text-lg font-semibold text-slate-100">{game.title}</h3>
                    <p className="text-xs text-slate-400">
                      {game.home_team} vs {game.away_team}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      {game.is_locked ? (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-amber-400 font-semibold">Locked</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                          </svg>
                          <span className="text-emerald-400 font-semibold">Open</span>
                        </div>
                      )}
                    </div>
                    <p>
                      Result:{' '}
                      <span className="font-semibold text-slate-200">
                        {game.result ? game.result.toUpperCase() : 'Pending'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      game.is_locked
                        ? 'border-amber-400 bg-amber-500/10 text-amber-300 hover:border-amber-300 hover:text-amber-200'
                        : 'border-emerald-400 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:text-emerald-200'
                    }`}
                    type="button"
                    disabled={pendingAction === `lock-${game.id}`}
                    onClick={() => toggleLock(game.id, !game.is_locked)}
                  >
                    {pendingAction === `lock-${game.id}` ? 'Updating...' : game.is_locked ? 'Unlock picks' : 'Lock picks'}
                  </button>
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
                    type="button"
                    disabled={pendingAction === `result-${game.id}-home`}
                    onClick={() => setResult(game.id, 'home')}
                  >
                    {pendingAction === `result-${game.id}-home` ? 'Scoring...' : `${getTeamShortCode(game.home_team)} wins`}
                  </button>
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
                    type="button"
                    disabled={pendingAction === `result-${game.id}-away`}
                    onClick={() => setResult(game.id, 'away')}
                  >
                    {pendingAction === `result-${game.id}-away` ? 'Scoring...' : `${getTeamShortCode(game.away_team)} wins`}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
              No games scheduled yet. Create one above to get started.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Teams & Points</h2>
          <p className="mt-1 text-sm text-slate-400">Award or deduct points with notes for audit history.</p>
        </div>
        <AdminTable teams={dashboard.teams} pendingAction={pendingAction} onAdjust={adjustPoints} />
      </section>

      {message ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
              : 'border-rose-400 bg-rose-500/10 text-rose-200'
          }`}
        >
          {message.text}
        </div>
      ) : null}
    </div>
  )
}

export default AdminDashboard
