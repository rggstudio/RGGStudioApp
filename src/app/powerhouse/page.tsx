import { redirect } from 'next/navigation'
import PlayerLoginForm from '@/components/powerhouse/PlayerLoginForm'
import PowerhouseFooter from '@/components/powerhouse/PowerhouseFooter'
import { getTeamSession } from '@/lib/powerhouse/session'

const PowerhouseLanding = async () => {
  const session = await getTeamSession()

  if (session?.teamId) {
    redirect('/powerhouse/dashboard')
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
        <PlayerLoginForm />
        <p className="mt-6 text-center text-xs text-slate-400">
          Commissioner?{' '}
          <a className="font-semibold text-indigo-400 hover:text-indigo-300" href="/powerhouse/admin">
            Open the admin console
          </a>
          .
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
        <h2 className="mb-4 text-2xl font-semibold">What is Power House Picks?</h2>
        <p className="mb-6 text-slate-300">
          Power House Picks is a web application for managing the <strong>Game of the Week (GOTW)</strong> pick system in the <strong>Power House League</strong>. 
          Players log in using their team name and a 4-digit PIN to make weekly picks, track their scores, and view their pick history.
        </p>

        <h3 className="mb-3 text-xl font-semibold">How It Works</h3>
        <div className="space-y-4 text-slate-300">
          <div>
            <h4 className="mb-2 font-semibold text-indigo-400">For Players (Team Owners)</h4>
            <ul className="ml-6 list-disc space-y-2">
              <li>Log in using your <strong>Team Name</strong> and your 4-digit <strong>PIN</strong></li>
              <li>View weekly Game of the Week matchups and make your picks</li>
              <li>Change your pick at any time until the game is <strong>locked by the commissioner</strong></li>
              <li>Track your current total points and view your complete pick history</li>
              <li>See which picks were correct (✔) or incorrect (✖) and points earned</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-indigo-400">Points System</h4>
            <ul className="ml-6 list-disc space-y-2">
              <li><strong>+3 points</strong> for a correct Game of the Week pick (awarded automatically)</li>
              <li>Points are tracked in a ledger that records all point transactions</li>
              <li>Commissioners can manually adjust points if needed</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-indigo-400">Game Locking</h4>
            <p className="ml-6">
              Games are manually locked by the commissioner. Once a game is locked, you cannot change your pick. 
              This ensures fairness and prevents last-minute changes after game results are known.
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-indigo-400">History & Tracking</h4>
            <p className="ml-6">
              View all your past picks organized by week, see the correct results, and track your points earned throughout the season.
            </p>
          </div>
        </div>
      </div>

      <PowerhouseFooter />
    </div>
  )
}

export default PowerhouseLanding

