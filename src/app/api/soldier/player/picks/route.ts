import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { getTeamSession } from '@/lib/soldier/session'
import { updatePickSchema } from '@/lib/soldier/validators'

export const runtime = 'nodejs'

export const POST = async (request: Request) => {
  const session = await getTeamSession()

  if (!session?.teamId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const parsed = updatePickSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const supabase = createServiceRoleClient()

  const { data: game, error: gameError } = await supabase
    .from('sl_games')
    .select('id, is_locked, result')
    .eq('id', parsed.data.gameId)
    .maybeSingle()

  if (gameError) {
    return NextResponse.json({ error: 'Unable to load game' }, { status: 500 })
  }

  if (!game || game.is_locked || game.result) {
    return NextResponse.json({ error: 'Game is locked' }, { status: 400 })
  }

  const { data: existingPick } = await supabase
    .from('sl_picks')
    .select('id')
    .eq('team_id', session.teamId)
    .eq('game_id', parsed.data.gameId)
    .maybeSingle()

  if (existingPick?.id) {
    const { error: updateError } = await supabase
      .from('sl_picks')
      .update({
        selection: parsed.data.selection,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingPick.id)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update pick' }, { status: 500 })
    }
  } else {
    const { error: insertError } = await supabase.from('sl_picks').insert({
      team_id: session.teamId,
      game_id: parsed.data.gameId,
      selection: parsed.data.selection,
    })

    if (insertError) {
      return NextResponse.json({ error: 'Failed to save pick' }, { status: 500 })
    }
  }

  revalidatePath('/soldier/dashboard')
  revalidatePath('/soldier/admin')

  return NextResponse.json({ success: true })
}
