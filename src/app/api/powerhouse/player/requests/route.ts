import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { getTeamSession } from '@/lib/powerhouse/session'

export const runtime = 'nodejs'

export const GET = async () => {
  const session = await getTeamSession()

  if (!session?.teamId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceRoleClient()

  const { data, error } = await supabase
    .from('phl_player_requests')
    .select('id, player_name, attribute, points, status, denial_reason, created_at')
    .eq('team_id', session.teamId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch requests', details: error.message }, { status: 500 })
  }

  return NextResponse.json({ requests: data || [] })
}

