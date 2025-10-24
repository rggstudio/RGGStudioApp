'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GameCard from '@/components/soldier/GameCard'
import HistoryTable from '@/components/soldier/HistoryTable'
import PointsBadge from '@/components/soldier/PointsBadge'
import SoldierFooter from '@/components/soldier/SoldierFooter'

type DashboardData = {
  team: {
    id: string
    name: string
    shortCode: string | null
    totalPoints: number
  }
  currentGames: {
    id: string
    title: string
    weekNumber: number
    weekLabel: string
    homeTeam: string
    awayTeam: string
    kickoffAt: string | null
    isLocked: boolean
    selection: 'home' | 'away' | null
  }[]
  history: {
    id: string
    title: string
    weekLabel: string
    homeTeam: string
    awayTeam: string
    result: string | null
    selection: string | null
    wasCorrect: boolean
    madePick: boolean
  }[]
  ledger: {
    id: string
    points: number
    source: string
    note: string | null
    created_at: string
    admin_email: string
    team_name: string
  }[]
}

const PlayerDashboard = ({ dashboard }: { dashboard: DashboardData }) => {
  const router = useRouter()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handlePick = async (gameId: string, selection: 'home' | 'away') => {
    setPendingId(gameId)
    setMessage(null)

    try {
      const response = await fetch('/api/soldier/player/picks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId, selection }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: payload?.error ?? 'Unable to save pick' })
        setPendingId(null)
        return
      }

      setMessage({ type: 'success', text: 'Pick saved' })
      setPendingId(null)
      router.refresh()
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unexpected error',
      })
      setPendingId(null)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/soldier/auth/logout', { method: 'POST' })
    router.push('/soldier')
    router.refresh()
  }

  return (
    <div className="space-y-10">
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <div>
          <p className="text-sm text-slate-400">Team</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">
            {dashboard.team.name}
            {dashboard.team.shortCode ? (
              <span className="ml-2 text-sm text-slate-400">({dashboard.team.shortCode})</span>
            ) : null}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <PointsBadge points={dashboard.team.totalPoints} />
          <button
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-rose-400 hover:text-rose-300"
            type="button"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-100">Current Game of the Week</h3>
          <p className="mt-1 text-xs text-slate-400">Select your winner before the commissioner locks it.</p>
        </div>
        <div className="space-y-4">
          {dashboard.currentGames.length ? (
            dashboard.currentGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isSubmitting={pendingId === game.id}
                onSelect={handlePick}
              />
            ))
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
              No active games. Check back soon!
            </div>
          )}
        </div>
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

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">Season History</h3>
          <p className="text-xs text-slate-400">Lock in your picks weekly to climb the leaderboard.</p>
        </div>
        <HistoryTable history={dashboard.history} />
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-100">Points Ledger</h3>
          <p className="mt-1 text-xs text-slate-400">Complete audit trail of all points earned by your team.</p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/50">
          {dashboard.ledger.length > 0 ? (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-slate-700 text-sm">
                <thead className="bg-slate-800/80 uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Points</th>
                    <th className="px-4 py-3 text-left">Source</th>
                    <th className="px-4 py-3 text-left">Note</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Commissioner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {dashboard.ledger.map((entry) => (
                    <tr key={entry.id} className="text-slate-200">
                      <td className="px-4 py-3">
                        <span
                          className={`font-semibold ${
                            entry.points > 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {entry.points > 0 ? '+' : ''}{entry.points}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            entry.source === 'auto_win'
                              ? 'bg-emerald-400/20 text-emerald-300'
                              : entry.source === 'manual'
                              ? 'bg-blue-400/20 text-blue-300'
                              : 'bg-slate-400/20 text-slate-300'
                          }`}
                        >
                          {entry.source === 'auto_win' ? 'Game Win' : entry.source === 'manual' ? 'Manual' : entry.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {entry.note || '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {new Date(entry.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {entry.admin_email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-slate-400">
              No points earned yet. Make your picks and win games to earn points!
            </div>
          )}
        </div>
      </section>

      <SoldierFooter />
    </div>
  )
}

export default PlayerDashboard
