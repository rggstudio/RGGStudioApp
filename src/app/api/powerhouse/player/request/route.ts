import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { getTeamSession } from '@/lib/powerhouse/session'
import { playerRequestSchema } from '@/lib/powerhouse/validators'

export const runtime = 'nodejs'

export const POST = async (request: Request) => {
  const session = await getTeamSession()

  if (!session?.teamId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const parsed = playerRequestSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.errors }, { status: 400 })
  }

  const supabase = createServiceRoleClient()

  const { error } = await supabase.from('phl_player_requests').insert({
    team_id: session.teamId,
    player_name: parsed.data.playerName,
    attribute: parsed.data.attribute,
    points: parsed.data.points,
    status: 'pending',
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to create request', details: error.message }, { status: 500 })
  }

  revalidatePath('/powerhouse/dashboard')
  revalidatePath('/powerhouse/admin')

  return NextResponse.json({ success: true })
}

