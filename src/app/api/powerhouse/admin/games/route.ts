import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/powerhouse/admin'
import { getAdminDashboardData } from '@/lib/powerhouse/data'
import { createGameSchema } from '@/lib/powerhouse/validators'

export const runtime = 'nodejs'

export const GET = async () => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await getAdminDashboardData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admin data', details: `${error}` }, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  
  // Debug logging
  console.log('Received payload:', JSON.stringify(payload, null, 2))
  
  const processedPayload = {
    ...payload,
    weekNumber: typeof payload?.weekNumber === 'string' ? Number(payload.weekNumber) : payload?.weekNumber,
    kickoffAt: payload?.kickoffAt ? new Date(payload.kickoffAt).toISOString() : null,
  }
  
  console.log('Processed payload:', JSON.stringify(processedPayload, null, 2))
  
  const parsed = createGameSchema.safeParse(processedPayload)

  if (!parsed.success) {
    console.log('Validation errors:', JSON.stringify(parsed.error.flatten(), null, 2))
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const supabase = createServiceRoleClient()

  // Get the admin ID from the email
  const { data: adminData, error: adminError } = await supabase
    .from('phl_admins')
    .select('id')
    .eq('email', admin.user.email)
    .single()

  if (adminError) {
    return NextResponse.json({ error: 'Failed to get admin info' }, { status: 500 })
  }

  const { error } = await supabase.from('phl_games').insert({
    title: parsed.data.title,
    week_number: parsed.data.weekNumber,
    home_team: parsed.data.homeTeam,
    away_team: parsed.data.awayTeam,
    kickoff_at: parsed.data.kickoffAt,
    created_by: adminData.id,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 })
  }

  revalidatePath('/powerhouse/admin')
  revalidatePath('/powerhouse/dashboard')

  return NextResponse.json({ success: true })
}

