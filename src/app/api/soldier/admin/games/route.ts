import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/soldier/admin'
import { getAdminDashboardData } from '@/lib/soldier/data'
import { createGameSchema } from '@/lib/soldier/validators'

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
  const parsed = createGameSchema.safeParse({
    ...payload,
    weekNumber: typeof payload?.weekNumber === 'string' ? Number(payload.weekNumber) : payload?.weekNumber,
  })

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const supabase = createServiceRoleClient()

  const { error } = await supabase.from('sl_games').insert({
    title: parsed.data.title,
    week_number: parsed.data.weekNumber,
    home_team: parsed.data.homeTeam,
    away_team: parsed.data.awayTeam,
    kickoff_at: parsed.data.kickoffAt,
    created_by: null,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 })
  }

  revalidatePath('/soldier/admin')
  revalidatePath('/soldier/dashboard')

  return NextResponse.json({ success: true })
}
