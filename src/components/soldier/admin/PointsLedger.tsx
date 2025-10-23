'use client'

type LedgerEntry = {
  id: string
  points: number
  source: string
  note: string | null
  created_at: string
  team_name: string
  admin_email: string
}

type Props = {
  entries: LedgerEntry[]
}

const PointsLedger = ({ entries }: Props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatPoints = (points: number) => {
    return points > 0 ? `+${points}` : points.toString()
  }

  const getPointsColor = (points: number) => {
    return points > 0 ? 'text-emerald-400' : 'text-rose-400'
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'auto_win':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'manual':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'penalty':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  if (entries.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Points Ledger History</h3>
          <p className="mt-1 text-sm text-slate-400">Complete audit trail of all points adjustments</p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-200">No Points History</h4>
          <p className="mt-1 text-sm text-slate-400">Points adjustments will appear here once made.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Points Ledger History</h3>
        <p className="mt-1 text-sm text-slate-400">Complete audit trail of all points adjustments</p>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-800/50">
        <div className="max-h-96 overflow-y-auto">
          <div className="divide-y divide-slate-700">
            {entries.map((entry) => (
              <div key={entry.id} className="px-4 py-3 hover:bg-slate-700/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-slate-200 truncate">
                        {entry.team_name}
                      </span>
                      <span className={`font-mono text-sm font-semibold ${getPointsColor(entry.points)}`}>
                        {formatPoints(entry.points)}
                      </span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getSourceColor(entry.source)}`}>
                        {entry.source.replace('_', ' ')}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-slate-300 mb-2">{entry.note}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{formatDate(entry.created_at)}</span>
                      <span>•</span>
                      <span>{entry.admin_email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointsLedger
