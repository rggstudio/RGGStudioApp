import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/soldier/admin'
import { denyRequestSchema } from '@/lib/soldier/validators'

export const runtime = 'nodejs'

export const POST = async (request: Request, { params }: { params: Promise<{ requestId: string }> }) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { requestId } = await params

  const payload = await request.json().catch(() => null)
  const parsed = denyRequestSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.errors }, { status: 400 })
  }

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
    .select('status')
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
      status: 'denied',
      denial_reason: parsed.data.denialReason,
      processed_by: adminData.id,
      processed_at: new Date().toISOString(),
    })
    .eq('id', requestId)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to deny request', details: updateError.message }, { status: 500 })
  }

  revalidatePath('/soldier/admin')
  revalidatePath('/soldier/dashboard')

  return NextResponse.json({ success: true })
}

