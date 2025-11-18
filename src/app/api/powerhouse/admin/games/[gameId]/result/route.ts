import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/powerhouse/admin'
import { updateGameResultSchema } from '@/lib/powerhouse/validators'

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
    .from('phl_games')
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

  // Check if there are any picks for this game before awarding points
  const { data: picks, error: picksError } = await supabase
    .from('phl_picks')
    .select('team_id, selection')
    .eq('game_id', params.gameId)

  if (picksError) {
    console.error('Error fetching picks:', picksError)
    return NextResponse.json({ error: 'Failed to check picks' }, { status: 500 })
  }

  console.log('Game result:', parsed.data.result)
  console.log('Picks for this game:', picks)

  // Award points directly instead of using the RPC function
  const { data: awards, error: awardError } = await supabase
    .from('phl_points_ledger')
    .insert(
      picks
        ?.filter(pick => pick.selection === parsed.data.result)
        .map(pick => ({
          team_id: pick.team_id,
          points: 3,
          source: 'auto_win',
          game_id: params.gameId,
        })) || []
    )
    .select('team_id, points')

  if (awardError) {
    console.error('Award points error:', awardError)
    return NextResponse.json({ error: 'Failed to award points' }, { status: 500 })
  }

  console.log('Points awarded:', awards)

  if (!awards || awards.length === 0) {
    console.log('No points were awarded - this might mean no teams picked the winning team')
  }

  revalidatePath('/powerhouse/admin')
  revalidatePath('/powerhouse/dashboard')

  return NextResponse.json({ success: true, awards: awards || [] })
}

