'use client'

type Props = {
  selection: 'home' | 'away' | null
  homeTeam: string
  awayTeam: string
  disabled?: boolean
  isSubmitting?: boolean
  onSelect: (selection: 'home' | 'away') => void
}

const baseButton =
  'flex-1 rounded-lg border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'

const PickButtons = ({ selection, homeTeam, awayTeam, disabled, isSubmitting, onSelect }: Props) => {
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
        Home • {homeTeam}
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
        Away • {awayTeam}
      </button>
    </div>
  )
}

export default PickButtons
