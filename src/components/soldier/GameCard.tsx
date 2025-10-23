'use client'

import PickButtons from '@/components/soldier/PickButtons'

type Game = {
  id: string
  title: string
  weekNumber: number
  weekLabel: string
  homeTeam: string
  awayTeam: string
  kickoffAt: string | null
  isLocked: boolean
  selection: 'home' | 'away' | null
}

type Props = {
  game: Game
  isSubmitting?: boolean
  onSelect: (gameId: string, selection: 'home' | 'away') => void
}

const GameCard = ({ game, isSubmitting, onSelect }: Props) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{game.weekLabel}</p>
          <h3 className="text-xl font-semibold text-slate-100">{game.title}</h3>
        </div>
        <div className="text-right text-xs text-slate-400">
          {game.kickoffAt ? (
            <time dateTime={game.kickoffAt}>
              {new Date(game.kickoffAt).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </time>
          ) : (
            <span>TBD</span>
          )}
          {game.isLocked && <p className="mt-1 font-semibold text-amber-400">Locked by Commissioner</p>}
        </div>
      </div>
      <div className="mt-6">
        <PickButtons
          selection={game.selection}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          disabled={game.isLocked}
          isSubmitting={isSubmitting}
          onSelect={(selection) => onSelect(game.id, selection)}
        />
      </div>
    </div>
  )
}

export default GameCard
