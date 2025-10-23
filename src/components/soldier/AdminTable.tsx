'use client'

type TeamRow = {
  id: string
  name: string
  short_code: string | null
  total_points: number
}

type Props = {
  teams: TeamRow[]
  pendingAction: string | null
  onAdjust: (teamId: string, points: number, note?: string) => Promise<boolean> | boolean
}

const AdminTable = ({ teams, pendingAction, onAdjust }: Props) => {
  if (!teams.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
        Add teams in Supabase to manage points.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-900/80 text-slate-400">
          <tr>
            <th className="px-4 py-3 text-left">Team</th>
            <th className="px-4 py-3 text-left">Points</th>
            <th className="px-4 py-3 text-left">Adjust</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {teams.map((team) => (
            <tr key={team.id} className="text-slate-200">
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-100">{team.name}</div>
                {team.short_code ? <div className="text-xs text-slate-400">{team.short_code}</div> : null}
              </td>
              <td className="px-4 py-3">{team.total_points}</td>
              <td className="px-4 py-3">
                <form
                  className="flex flex-wrap items-center gap-2"
                  onSubmit={async (event) => {
                    event.preventDefault()
                    const formData = new FormData(event.currentTarget)
                    const points = Number(formData.get('points'))
                    const note = (formData.get('note') as string) || undefined
                    const success = await onAdjust(team.id, points, note)
                    if (success) {
                      try {
                        // In rare cases currentTarget can be null if React pools the event
                        const form = event.currentTarget as HTMLFormElement | null
                        form?.reset()
                      } catch {}
                    }
                  }}
                >
                  <input
                    type="number"
                    name="points"
                    placeholder="+3"
                    className="h-9 w-20 rounded border border-slate-700 bg-slate-950 px-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    required
                  />
                  <input
                    type="text"
                    name="note"
                    placeholder="Reason"
                    className="h-9 flex-1 rounded border border-slate-700 bg-slate-950 px-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                  <button
                    className="h-9 rounded bg-indigo-600 px-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                    type="submit"
                    disabled={pendingAction === `adjust-${team.id}`}
                  >
                    {pendingAction === `adjust-${team.id}` ? 'Saving...' : 'Apply'}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable
