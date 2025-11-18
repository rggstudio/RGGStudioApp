import { redirect } from 'next/navigation'
import PlayerDashboard from '@/components/powerhouse/PlayerDashboard'
import { getTeamDashboardData } from '@/lib/powerhouse/data'
import { getTeamSession } from '@/lib/powerhouse/session'

const PlayerDashboardPage = async () => {
  const session = await getTeamSession()

  if (!session?.teamId) {
    redirect('/powerhouse')
  }

  const dashboard = await getTeamDashboardData(session.teamId)

  return <PlayerDashboard dashboard={dashboard} />
}

export default PlayerDashboardPage

