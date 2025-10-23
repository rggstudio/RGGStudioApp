type HistoryRow = {
  id: string
  title: string
  weekLabel: string
  homeTeam: string
  awayTeam: string
  result: string | null
  selection: string | null
  wasCorrect: boolean
}

const HistoryTable = ({ history }: { history: HistoryRow[] }) => {
  if (!history.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
        No completed games yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-900/80 uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 text-left">Week</th>
            <th className="px-4 py-3 text-left">Matchup</th>
            <th className="px-4 py-3 text-left">Pick</th>
            <th className="px-4 py-3 text-left">Result</th>
            <th className="px-4 py-3 text-left">Outcome</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {history.map((row) => (
            <tr key={row.id} className="text-slate-200">
              <td className="px-4 py-3">{row.weekLabel}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-slate-100">{row.title}</div>
                <div className="text-xs text-slate-400">
                  {row.homeTeam} vs {row.awayTeam}
                </div>
              </td>
              <td className="px-4 py-3">{row.selection ? row.selection.toUpperCase() : '—'}</td>
              <td className="px-4 py-3">{row.result ? row.result.toUpperCase() : 'Pending'}</td>
              <td className="px-4 py-3">
                {row.selection ? (
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      row.wasCorrect ? 'bg-emerald-400/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {row.wasCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryTable
