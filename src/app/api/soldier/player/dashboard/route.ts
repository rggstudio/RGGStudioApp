import { NextResponse } from 'next/server'
import { getTeamSession } from '@/lib/soldier/session'
import { getTeamDashboardData } from '@/lib/soldier/data'

export const runtime = 'edge'

export const GET = async () => {
  const session = await getTeamSession()

  if (!session?.teamId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dashboard = await getTeamDashboardData(session.teamId)
    return NextResponse.json(dashboard)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load dashboard', details: `${error}` }, { status: 500 })
  }
}
