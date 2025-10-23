import { redirect } from 'next/navigation'
import PlayerDashboard from '@/components/soldier/PlayerDashboard'
import { getTeamDashboardData } from '@/lib/soldier/data'
import { getTeamSession } from '@/lib/soldier/session'

const PlayerDashboardPage = async () => {
  const session = await getTeamSession()

  if (!session?.teamId) {
    redirect('/soldier')
  }

  const dashboard = await getTeamDashboardData(session.teamId)

  return <PlayerDashboard dashboard={dashboard} />
}

export default PlayerDashboardPage
