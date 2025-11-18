import { redirect } from 'next/navigation'
import PlayerLoginForm from '@/components/powerhouse/PlayerLoginForm'
import PowerhouseFooter from '@/components/powerhouse/PowerhouseFooter'
import InfoTabs from '@/components/powerhouse/InfoTabs'
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

      <InfoTabs />

      <PowerhouseFooter />
    </div>
  )
}

export default PowerhouseLanding

