'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminTable from '@/components/soldier/AdminTable'
import PointsLedger from '@/components/soldier/admin/PointsLedger'
import GameCard from '@/components/soldier/admin/GameCard'
import SoldierFooter from '@/components/soldier/SoldierFooter'

type Game = {
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
  updated_at: string
}

type AdminDashboardData = {
  currentGames: Game[]
  gameHistory: Game[]
  teams: {
    id: string
    name: string
    short_code: string | null
    total_points: number
  }[]
  ledger: {
    id: string
    points: number
    source: string
    note: string | null
    created_at: string
    team_name: string
    admin_email: string
  }[]
}

const AdminDashboard = ({ dashboard }: { dashboard: AdminDashboardData }) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'ledger' | 'management'>('overview')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [pendingAction, setPendingAction] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    currentGames: true,
    gameHistory: false,
    ledger: false,
  })
  const [createState, setCreateState] = useState({
    title: '',
    weekNumber: '',
    homeTeam: '',
    awayTeam: '',
    kickoffAt: '',
  })
  const [editState, setEditState] = useState({
    title: '',
    weekNumber: '',
    homeTeam: '',
    awayTeam: '',
    kickoffAt: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Auto-dismiss messages after 10 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [message])

  // Helper function to extract team short code from team name
  const getTeamShortCode = (teamName: string): string => {
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

  const handleSetResult = async (gameId: string, result: 'home' | 'away') => {
    setPendingAction(`result-${gameId}-${result}`)
    
    try {
      const response = await fetch(`/api/soldier/admin/games/${gameId}/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: payload?.error ?? 'Failed to set game result' })
        return
      }

      setMessage({ type: 'success', text: 'Game result set successfully' })
      router.refresh()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to set game result' })
    } finally {
      setPendingAction(null)
    }
  }

  const handleToggleLock = async (gameId: string, isLocked: boolean) => {
    setPendingAction(`lock-${gameId}`)
    
    try {
      const response = await fetch(`/api/soldier/admin/games/${gameId}/lock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lock: !isLocked }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: payload?.error ?? 'Failed to update lock status' })
        return
      }

      setMessage({ type: 'success', text: isLocked ? 'Picks unlocked successfully' : 'Picks locked successfully' })
      router.refresh()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update lock status' })
    } finally {
      setPendingAction(null)
    }
  }

  const handleAdjustPoints = async (teamId: string, points: number, note?: string) => {
    setPendingAction(`adjust-${teamId}`)
    
    try {
      const response = await fetch('/api/soldier/admin/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, points, note }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: payload?.error ?? 'Failed to adjust points' })
        return false
      }

      setMessage({ type: 'success', text: `Points adjusted successfully (${points > 0 ? '+' : ''}${points})` })
      router.refresh()
      return true
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to adjust points' })
      return false
    } finally {
      setPendingAction(null)
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/soldier/admin/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: createState.title,
          weekNumber: parseInt(createState.weekNumber),
          homeTeam: createState.homeTeam,
          awayTeam: createState.awayTeam,
          kickoffAt: createState.kickoffAt || null,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: payload?.error ?? 'Unable to create game' })
        return
      }

      setMessage({ type: 'success', text: 'Game created successfully' })
      
      // Reset form
      setCreateState({
        title: '',
        weekNumber: '',
        homeTeam: '',
        awayTeam: '',
        kickoffAt: '',
      })
      
      // Close modal and refresh
      setIsCreateModalOpen(false)
      router.refresh()
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unexpected error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditGame = (game: Game) => {
    setEditingGame(game)
    
    // Convert UTC time to local time for datetime-local input
    let localKickoffTime = ''
    if (game.kickoff_at) {
      const date = new Date(game.kickoff_at)
      // Format for datetime-local input (YYYY-MM-DDTHH:MM)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      localKickoffTime = `${year}-${month}-${day}T${hours}:${minutes}`
    }
    
    setEditState({
      title: game.title,
      weekNumber: game.week_number.toString(),
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      kickoffAt: localKickoffTime,
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateGame = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGame) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/soldier/admin/games/${editingGame.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editState.title,
          weekNumber: parseInt(editState.weekNumber),
          homeTeam: editState.homeTeam,
          awayTeam: editState.awayTeam,
          kickoffAt: editState.kickoffAt || null,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: payload?.error ?? 'Unable to update game' })
        return
      }

      setMessage({ type: 'success', text: 'Game updated successfully' })
      
      // Close modal and refresh
      setIsEditModalOpen(false)
      setEditingGame(null)
      router.refresh()
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unexpected error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteGame = async (gameId: string) => {
    if (!confirm('Are you sure you want to delete this game? This action cannot be undone.')) {
      return
    }

    setPendingAction(`delete-${gameId}`)

    try {
      const response = await fetch(`/api/soldier/admin/games/${gameId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        alert(payload?.error ?? 'Unable to delete game')
        return
      }

      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unexpected error')
    } finally {
      setPendingAction(null)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'games', label: 'Games', icon: '🎮' },
    { id: 'ledger', label: 'Points Ledger', icon: '📝' },
    { id: 'management', label: 'Management', icon: '⚙️' },
  ] as const

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-slate-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Message Display */}
        {message && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm flex items-center justify-between ${
              message.type === 'success'
                ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                : 'border-rose-400 bg-rose-500/10 text-rose-200'
            }`}
          >
            <span>{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className={`ml-3 text-xs font-medium hover:opacity-70 transition-opacity ${
                message.type === 'success' ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              ✕
            </button>
          </div>
        )}
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Create New Game
              </button>
            </div>

            {/* Current Games */}
            {dashboard.currentGames.length > 0 && (
              <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white">Current Games</h2>
                  <p className="mt-1 text-sm text-slate-400">Active games awaiting results</p>
                </div>
                <div className="space-y-4">
                  {dashboard.currentGames.slice(0, 3).map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isHistory={false}
                      pendingAction={pendingAction}
                      onSetResult={handleSetResult}
                      onToggleLock={handleToggleLock}
                      onEditGame={handleEditGame}
                      onDeleteGame={handleDeleteGame}
                      getTeamShortCode={getTeamShortCode}
                    />
                  ))}
                  {dashboard.currentGames.length > 3 && (
                    <div className="text-center">
                      <button
                        onClick={() => setActiveTab('games')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        View {dashboard.currentGames.length - 3} more games →
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Teams & Points Summary */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">Teams & Points</h2>
                <p className="mt-1 text-sm text-slate-400">Current standings and team performance</p>
              </div>
              <AdminTable 
                teams={dashboard.teams} 
                pendingAction={pendingAction}
                onAdjust={handleAdjustPoints}
              />
            </section>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-lg">🎮</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-400">Active Games</p>
                    <p className="text-2xl font-semibold text-white">{dashboard.currentGames.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-400 text-lg">✅</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-400">Completed Games</p>
                    <p className="text-2xl font-semibold text-white">{dashboard.gameHistory.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 text-lg">📝</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-400">Total Points Awarded</p>
                    <p className="text-2xl font-semibold text-white">
                      {dashboard.ledger.reduce((sum, entry) => sum + entry.points, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            {/* Current Games */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Current Games</h2>
                  <p className="mt-1 text-sm text-slate-400">Active games awaiting results</p>
                </div>
                <button
                  onClick={() => toggleSection('currentGames')}
                  className="text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {expandedSections.currentGames ? '▼' : '▶'}
                </button>
              </div>
              
              {expandedSections.currentGames && (
                <div className="space-y-4">
                  {dashboard.currentGames.length ? (
                    dashboard.currentGames.map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        isHistory={false}
                        pendingAction={pendingAction}
                        onSetResult={handleSetResult}
                        onToggleLock={handleToggleLock}
                        onEditGame={handleEditGame}
                        onDeleteGame={handleDeleteGame}
                        getTeamShortCode={getTeamShortCode}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      No active games. Create a new game to get started!
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Game History */}
            {dashboard.gameHistory.length > 0 && (
              <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Game History</h2>
                    <p className="mt-1 text-sm text-slate-400">Completed games and results</p>
                  </div>
                  <button
                    onClick={() => toggleSection('gameHistory')}
                    className="text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {expandedSections.gameHistory ? '▼' : '▶'}
                  </button>
                </div>
                
                {expandedSections.gameHistory && (
                  <div className="space-y-4">
                    {dashboard.gameHistory.map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        isHistory={true}
                        pendingAction={pendingAction}
                        onSetResult={handleSetResult}
                        onToggleLock={handleToggleLock}
                        onEditGame={handleEditGame}
                        onDeleteGame={handleDeleteGame}
                        getTeamShortCode={getTeamShortCode}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        )}

        {/* Ledger Tab */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <PointsLedger entries={dashboard.ledger} />
          </div>
        )}

        {/* Management Tab */}
        {activeTab === 'management' && (
          <div className="space-y-6">
            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">Game Management</h2>
                <p className="mt-1 text-sm text-slate-400">Create and manage games</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Create New Game
                </button>
                
                <div className="text-sm text-slate-400">
                  <p>• Create games for upcoming weeks</p>
                  <p>• Set kickoff times and matchups</p>
                  <p>• Lock picks when ready for results</p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">System Status</h2>
                <p className="mt-1 text-sm text-slate-400">Current system information</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Teams:</span>
                  <span className="text-white">{dashboard.teams.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Games:</span>
                  <span className="text-white">{dashboard.currentGames.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Completed Games:</span>
                  <span className="text-white">{dashboard.gameHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Ledger Entries:</span>
                  <span className="text-white">{dashboard.ledger.length}</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Create Game Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsCreateModalOpen(false)} />
            
            <div className="relative w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Create Game of the Week</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Set up a new game for players to pick from
                </p>
              </div>

              <form onSubmit={handleCreateGame} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                    Game Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={createState.title}
                    onChange={(e) => setCreateState(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., NFC East Showdown"
                  />
                </div>

                <div>
                  <label htmlFor="weekNumber" className="block text-sm font-medium text-slate-300 mb-1">
                    Week Number
                  </label>
                  <input
                    id="weekNumber"
                    type="number"
                    required
                    min="1"
                    max="18"
                    value={createState.weekNumber}
                    onChange={(e) => setCreateState(prev => ({ ...prev, weekNumber: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label htmlFor="homeTeam" className="block text-sm font-medium text-slate-300 mb-1">
                    Home Team
                  </label>
                  <select
                    id="homeTeam"
                    required
                    value={createState.homeTeam}
                    onChange={(e) => setCreateState(prev => ({ ...prev, homeTeam: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Home Team</option>
                    {dashboard.teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="awayTeam" className="block text-sm font-medium text-slate-300 mb-1">
                    Away Team
                  </label>
                  <select
                    id="awayTeam"
                    required
                    value={createState.awayTeam}
                    onChange={(e) => setCreateState(prev => ({ ...prev, awayTeam: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Away Team</option>
                    {dashboard.teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="kickoffAt" className="block text-sm font-medium text-slate-300 mb-1">
                    Kickoff Date & Time (Optional)
                  </label>
                  <input
                    id="kickoffAt"
                    type="datetime-local"
                    value={createState.kickoffAt}
                    onChange={(e) => setCreateState(prev => ({ ...prev, kickoffAt: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {message && (
                  <div
                    className={`rounded-lg border px-4 py-3 text-sm ${
                      message.type === 'success'
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                        : 'border-rose-400 bg-rose-500/10 text-rose-200'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg border border-slate-600 px-4 py-2 text-slate-300 transition hover:border-slate-500 hover:text-slate-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Game'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Game Modal */}
      {isEditModalOpen && editingGame && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsEditModalOpen(false)} />
            
            <div className="relative w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Edit Game</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Update game details
                </p>
              </div>

              <form onSubmit={handleUpdateGame} className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-slate-300 mb-1">
                    Game Title
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    required
                    value={editState.title}
                    onChange={(e) => setEditState(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., NFC East Showdown"
                  />
                </div>

                <div>
                  <label htmlFor="edit-weekNumber" className="block text-sm font-medium text-slate-300 mb-1">
                    Week Number
                  </label>
                  <input
                    id="edit-weekNumber"
                    type="number"
                    required
                    min="1"
                    max="18"
                    value={editState.weekNumber}
                    onChange={(e) => setEditState(prev => ({ ...prev, weekNumber: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label htmlFor="edit-homeTeam" className="block text-sm font-medium text-slate-300 mb-1">
                    Home Team
                  </label>
                  <select
                    id="edit-homeTeam"
                    required
                    value={editState.homeTeam}
                    onChange={(e) => setEditState(prev => ({ ...prev, homeTeam: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Home Team</option>
                    {dashboard.teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-awayTeam" className="block text-sm font-medium text-slate-300 mb-1">
                    Away Team
                  </label>
                  <select
                    id="edit-awayTeam"
                    required
                    value={editState.awayTeam}
                    onChange={(e) => setEditState(prev => ({ ...prev, awayTeam: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Away Team</option>
                    {dashboard.teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-kickoffAt" className="block text-sm font-medium text-slate-300 mb-1">
                    Kickoff Date & Time (Optional)
                  </label>
                  <input
                    id="edit-kickoffAt"
                    type="datetime-local"
                    value={editState.kickoffAt}
                    onChange={(e) => setEditState(prev => ({ ...prev, kickoffAt: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {message && (
                  <div
                    className={`rounded-lg border px-4 py-3 text-sm ${
                      message.type === 'success'
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                        : 'border-rose-400 bg-rose-500/10 text-rose-200'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false)
                      setEditingGame(null)
                    }}
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg border border-slate-600 px-4 py-2 text-slate-300 transition hover:border-slate-500 hover:text-slate-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Game'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <SoldierFooter />
    </div>
  )
}

export default AdminDashboard