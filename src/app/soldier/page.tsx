import { redirect } from 'next/navigation'
import PlayerLoginForm from '@/components/soldier/PlayerLoginForm'
import SoldierFooter from '@/components/soldier/SoldierFooter'
import { getTeamSession } from '@/lib/soldier/session'

const SoldierLanding = async () => {
  const session = await getTeamSession()

  if (session?.teamId) {
    redirect('/soldier/dashboard')
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
        <PlayerLoginForm />
        <p className="mt-6 text-center text-xs text-slate-400">
          Commissioner?{' '}
          <a className="font-semibold text-indigo-400 hover:text-indigo-300" href="/soldier/admin">
            Open the admin console
          </a>
          .
        </p>
      </div>
      <SoldierFooter />
    </div>
  )
}

export default SoldierLanding
