import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/soldier/admin'
import { adjustPointsSchema } from '@/lib/soldier/validators'

export const runtime = 'nodejs'

export const POST = async (request: Request) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const parsed = adjustPointsSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const supabase = createServiceRoleClient()

  // Get the admin ID from the email
  const { data: adminData, error: adminError } = await supabase
    .from('sl_admins')
    .select('id')
    .eq('email', admin.user.email)
    .single()

  if (adminError) {
    return NextResponse.json({ error: 'Failed to get admin info' }, { status: 500 })
  }

  const { error } = await supabase.from('sl_points_ledger').insert({
    team_id: parsed.data.teamId,
    points: parsed.data.points,
    note: parsed.data.note,
    source: 'manual_adjustment',
    created_by: adminData.id,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to adjust points', details: error.message }, { status: 500 })
  }

  revalidatePath('/soldier/admin')
  revalidatePath('/soldier/dashboard')

  return NextResponse.json({ success: true })
}
