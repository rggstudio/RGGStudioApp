'use client'

import { useState } from 'react'

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

type Props = {
  game: Game
  isHistory?: boolean
  pendingAction: string | null
  onToggleLock: (gameId: string, lock: boolean) => void
  onSetResult: (gameId: string, result: 'home' | 'away') => void
  onEditGame: (game: Game) => void
  onDeleteGame: (gameId: string) => void
  getTeamShortCode: (teamName: string) => string
}

const GameCard = ({ game, isHistory = false, pendingAction, onToggleLock, onSetResult, onEditGame, onDeleteGame, getTeamShortCode }: Props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className={`rounded-xl border p-6 ${isHistory ? 'border-slate-600 bg-slate-800/40' : 'border-slate-800 bg-slate-900/60'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{game.week_label}</p>
          <h3 className="text-lg font-semibold text-slate-100">{game.title}</h3>
          <p className="text-xs text-slate-400">
            {game.home_team} vs {game.away_team}
          </p>
          {game.kickoff_at && (
            <p className="mt-1 text-xs text-slate-500">
              Kickoff: {new Date(game.kickoff_at).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          )}
          {isHistory && (
            <p className="mt-1 text-xs text-slate-500">
              Completed: {formatDate(game.updated_at)}
            </p>
          )}
        </div>
        <div className="text-right text-xs text-slate-400">
          <div className="flex items-center justify-end gap-2 mb-2">
            <button
              onClick={() => onEditGame(game)}
              className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
              title="Edit game"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDeleteGame(game.id)}
              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
              title="Delete game"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
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
              {game.result ? getTeamShortCode(game.result === 'home' ? game.home_team : game.away_team) : 'Pending'}
            </span>
          </p>
        </div>
      </div>
      
      {!isHistory && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                game.is_locked
                  ? 'border-amber-400 bg-amber-500/10 text-amber-300 hover:border-amber-300 hover:text-amber-200'
                  : 'border-emerald-400 bg-emerald-500/10 text-emerald-300 hover:border-emerald-300 hover:text-emerald-200'
              }`}
              type="button"
              disabled={pendingAction === `lock-${game.id}`}
              onClick={() => onToggleLock(game.id, !game.is_locked)}
            >
              {pendingAction === `lock-${game.id}` ? 'Updating...' : game.is_locked ? 'Unlock picks' : 'Lock picks'}
            </button>
            <button
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={pendingAction === `result-${game.id}-home` || !!game.result || !game.is_locked}
              onClick={() => onSetResult(game.id, 'home')}
            >
              {pendingAction === `result-${game.id}-home` ? 'Scoring...' : `${getTeamShortCode(game.home_team)} wins`}
            </button>
            <button
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={pendingAction === `result-${game.id}-away` || !!game.result || !game.is_locked}
              onClick={() => onSetResult(game.id, 'away')}
            >
              {pendingAction === `result-${game.id}-away` ? 'Scoring...' : `${getTeamShortCode(game.away_team)} wins`}
            </button>
          </div>
          {!game.is_locked && !game.result && (
            <p className="text-xs text-slate-500">
              Lock picks first before setting the winner
            </p>
          )}
        </div>
      )}
      
      {isHistory && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 text-emerald-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Completed</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameCard
