'use client'

type Props = {
  selection: 'home' | 'away' | null
  homeTeam: string
  awayTeam: string
  disabled?: boolean
  isSubmitting?: boolean
  onSelect: (selection: 'home' | 'away') => void
  homePickCount?: number
  awayPickCount?: number
}

const baseButton =
  'flex-1 rounded-lg border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'

const PickButtons = ({ selection, homeTeam, awayTeam, disabled, isSubmitting, onSelect, homePickCount, awayPickCount }: Props) => {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className={`${baseButton} ${
          selection === 'home'
            ? 'border-indigo-400 bg-indigo-600/30 text-indigo-200'
            : 'border-slate-700 bg-slate-900/50 text-slate-200 hover:border-indigo-400 hover:text-indigo-200'
        }`}
        disabled={disabled || isSubmitting}
        onClick={() => onSelect('home')}
      >
        <div className="flex flex-col items-center">
          <span>Home • {homeTeam}</span>
          {homePickCount !== undefined && (
            <span className="text-xs text-slate-400 mt-1">({homePickCount})</span>
          )}
        </div>
      </button>
      <button
        type="button"
        className={`${baseButton} ${
          selection === 'away'
            ? 'border-indigo-400 bg-indigo-600/30 text-indigo-200'
            : 'border-slate-700 bg-slate-900/50 text-slate-200 hover:border-indigo-400 hover:text-indigo-200'
        }`}
        disabled={disabled || isSubmitting}
        onClick={() => onSelect('away')}
      >
        <div className="flex flex-col items-center">
          <span>Away • {awayTeam}</span>
          {awayPickCount !== undefined && (
            <span className="text-xs text-slate-400 mt-1">({awayPickCount})</span>
          )}
        </div>
      </button>
    </div>
  )
}

export default PickButtons
