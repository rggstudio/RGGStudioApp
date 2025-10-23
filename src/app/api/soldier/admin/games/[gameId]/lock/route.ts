import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { requireAdmin } from '@/lib/soldier/admin'
import { lockGameSchema } from '@/lib/soldier/validators'

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
  const parsed = lockGameSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const supabase = createServiceRoleClient()

  // First check if the game exists
  const { data: gameCheck, error: checkError } = await supabase
    .from('sl_games')
    .select('id')
    .eq('id', params.gameId)
    .maybeSingle()

  if (checkError) {
    return NextResponse.json({ error: 'Unable to check game' }, { status: 500 })
  }

  if (!gameCheck) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  // Update the game lock status
  const { data, error } = await supabase
    .from('sl_games')
    .update({ 
      is_locked: parsed.data.lock,
      updated_at: new Date().toISOString()
    })
    .eq('id', params.gameId)
    .select('id, is_locked')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Unable to update lock' }, { status: 500 })
  }

  revalidatePath('/soldier/admin')
  revalidatePath('/soldier/dashboard')

  return NextResponse.json({ success: true, game: data })
}
