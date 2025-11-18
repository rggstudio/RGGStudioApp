import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/powerhouse/admin'

export const runtime = 'nodejs'

export const GET = async (request: Request) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const statusFilter = searchParams.get('status')

  const supabase = createServiceRoleClient()

  let query = supabase
    .from('phl_player_requests')
    .select(
      `
      id,
      player_name,
      attribute,
      points,
      status,
      denial_reason,
      created_at,
      team_id,
      phl_teams!phl_player_requests_team_id_fkey(name)
    `
    )
    .order('created_at', { ascending: false })

  if (statusFilter && ['pending', 'approved', 'denied'].includes(statusFilter)) {
    query = query.eq('status', statusFilter)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch requests', details: error.message }, { status: 500 })
  }

  // Transform the data to flatten the team name
  const requests = (data || []).map((req: any) => ({
    id: req.id,
    team_name: req.phl_teams?.name || 'Unknown',
    player_name: req.player_name,
    attribute: req.attribute,
    points: req.points,
    status: req.status,
    denial_reason: req.denial_reason,
    created_at: req.created_at,
  }))

  return NextResponse.json({ requests })
}

