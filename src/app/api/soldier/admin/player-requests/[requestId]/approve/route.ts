import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/soldier/admin'

export const runtime = 'nodejs'

export const POST = async (request: Request, { params }: { params: Promise<{ requestId: string }> }) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { requestId } = await params

  const supabase = createServiceRoleClient()

  const { data: adminData, error: adminError } = await supabase
    .from('sl_admins')
    .select('id')
    .eq('email', admin.user.email)
    .single()

  if (adminError || !adminData) {
    return NextResponse.json({ error: 'Failed to get admin info' }, { status: 500 })
  }

  const { data: requestData, error: fetchError } = await supabase
    .from('sl_player_requests')
    .select('team_id, player_name, attribute, points, status')
    .eq('id', requestId)
    .single()

  if (fetchError || !requestData) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 })
  }

  if (requestData.status !== 'pending') {
    return NextResponse.json({ error: 'Request has already been processed' }, { status: 400 })
  }

  const { error: updateError } = await supabase
    .from('sl_player_requests')
    .update({
      status: 'approved',
      processed_by: adminData.id,
      processed_at: new Date().toISOString(),
    })
    .eq('id', requestId)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to approve request', details: updateError.message }, { status: 500 })
  }

  const { error: deductError } = await supabase.from('sl_points_ledger').insert({
    team_id: requestData.team_id,
    points: -requestData.points,
    source: 'player_request',
    note: `Player: ${requestData.player_name}, Attribute: ${requestData.attribute}, Points: ${requestData.points}`,
    created_by: adminData.id,
  })

  if (deductError) {
    await supabase
      .from('sl_player_requests')
      .update({ status: 'pending', processed_by: null, processed_at: null })
      .eq('id', requestId)
    return NextResponse.json({ error: 'Failed to deduct points', details: deductError.message }, { status: 500 })
  }

  revalidatePath('/soldier/admin')
  revalidatePath('/soldier/dashboard')

  return NextResponse.json({ success: true })
}

