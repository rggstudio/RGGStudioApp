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

  const { data, error } = await supabase.rpc('sl_set_game_lock', {
    p_game_id: params.gameId,
    p_lock: parsed.data.lock,
  })

  if (error) {
    return NextResponse.json({ error: 'Unable to update lock' }, { status: 500 })
  }

  if (!data?.id) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  revalidatePath('/soldier/admin')
  revalidatePath('/soldier/dashboard')

  return NextResponse.json({ success: true, game: data })
}
