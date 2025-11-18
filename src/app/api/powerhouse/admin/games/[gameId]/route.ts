import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/powerhouse/admin'
import { createGameSchema } from '@/lib/powerhouse/validators'

export const runtime = 'nodejs'

// PUT - Update game
export const PUT = async (request: Request, { params }: { params: { gameId: string } }) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  
  // Debug logging
  console.log('Received update payload:', JSON.stringify(payload, null, 2))
  
  const processedPayload = {
    ...payload,
    weekNumber: typeof payload?.weekNumber === 'string' ? Number(payload.weekNumber) : payload?.weekNumber,
    kickoffAt: payload?.kickoffAt ? new Date(payload.kickoffAt).toISOString() : null,
  }
  
  console.log('Processed update payload:', JSON.stringify(processedPayload, null, 2))
  
  const parsed = createGameSchema.safeParse(processedPayload)

  if (!parsed.success) {
    console.log('Update validation errors:', JSON.stringify(parsed.error.flatten(), null, 2))
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const supabase = createServiceRoleClient()

  // Check if game exists
  const { data: existingGame, error: fetchError } = await supabase
    .from('phl_games')
    .select('id')
    .eq('id', params.gameId)
    .single()

  if (fetchError || !existingGame) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  // Update the game
  const { error } = await supabase
    .from('phl_games')
    .update({
      title: parsed.data.title,
      week_number: parsed.data.weekNumber,
      home_team: parsed.data.homeTeam,
      away_team: parsed.data.awayTeam,
      kickoff_at: parsed.data.kickoffAt,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.gameId)

  if (error) {
    console.log('Update error:', error)
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 })
  }

  revalidatePath('/powerhouse/admin')
  revalidatePath('/powerhouse/dashboard')

  return NextResponse.json({ success: true })
}

// DELETE - Delete game
export const DELETE = async (request: Request, { params }: { params: { gameId: string } }) => {
  const admin = await requireAdmin()

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceRoleClient()

  // Check if game exists
  const { data: existingGame, error: fetchError } = await supabase
    .from('phl_games')
    .select('id, result')
    .eq('id', params.gameId)
    .single()

  if (fetchError || !existingGame) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  // Prevent deletion of games with results (optional safety check)
  if (existingGame.result) {
    return NextResponse.json({ error: 'Cannot delete completed games' }, { status: 400 })
  }

  // Delete the game
  const { error } = await supabase
    .from('phl_games')
    .delete()
    .eq('id', params.gameId)

  if (error) {
    console.log('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 })
  }

  revalidatePath('/powerhouse/admin')
  revalidatePath('/powerhouse/dashboard')

  return NextResponse.json({ success: true })
}

