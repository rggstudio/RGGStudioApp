import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/soldier/admin'
import { updateGameResultSchema } from '@/lib/soldier/validators'

export const runtime = 'nodejs'

export const POST = async (
  request: Request,
  { params }: { params: { gameId: string } },
) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const parsed = updateGameResultSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const supabase = createServiceRoleClient()

  const { data: game, error: updateError } = await supabase
    .from('sl_games')
    .update({
      result: parsed.data.result,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.gameId)
    .select('id')
    .maybeSingle()

  if (updateError) {
    return NextResponse.json({ error: 'Failed to set result' }, { status: 500 })
  }

  if (!game?.id) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const { data: awards, error: awardError } = await supabase.rpc('sl_award_points_for_game', {
    p_game_id: params.gameId,
  })

  if (awardError) {
    return NextResponse.json({ error: 'Failed to award points' }, { status: 500 })
  }

  revalidatePath('/soldier/admin')
  revalidatePath('/soldier/dashboard')

  return NextResponse.json({ success: true, awards })
}
