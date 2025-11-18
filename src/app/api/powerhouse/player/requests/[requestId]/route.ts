import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { getTeamSession } from '@/lib/powerhouse/session'

export const runtime = 'nodejs'

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ requestId: string }> }
) => {
  const session = await getTeamSession()

  if (!session?.teamId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { requestId } = await params

  const supabase = createServiceRoleClient()

  // First verify the request belongs to this team
  const { data: requestData, error: fetchError } = await supabase
    .from('phl_player_requests')
    .select('team_id, status')
    .eq('id', requestId)
    .single()

  if (fetchError || !requestData) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 })
  }

  if (requestData.team_id !== session.teamId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  // Only allow deletion of pending requests
  if (requestData.status !== 'pending') {
    return NextResponse.json({ error: 'Only pending requests can be deleted' }, { status: 400 })
  }

  const { error } = await supabase.from('phl_player_requests').delete().eq('id', requestId)

  if (error) {
    return NextResponse.json({ error: 'Failed to delete request', details: error.message }, { status: 500 })
  }

  revalidatePath('/powerhouse/dashboard')

  return NextResponse.json({ success: true })
}

