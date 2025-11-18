import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { setTeamSession } from '@/lib/powerhouse/session'
import { teamLoginSchema } from '@/lib/powerhouse/validators'

export const runtime = 'nodejs'

export const POST = async (request: Request) => {
  const payload = await request.json().catch(() => null)

  const parsed = teamLoginSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const supabase = createServiceRoleClient()

  const { data, error } = await supabase.rpc('phl_authenticate_team', {
    p_team_name: parsed.data.teamName,
    p_pin: parsed.data.pin,
  })

  if (error) {
    return NextResponse.json({ error: 'Login failed', details: error.message }, { status: 500 })
  }

  const team = Array.isArray(data) ? data[0] : data

  if (!team?.id) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await setTeamSession(team.id)

  return NextResponse.json({
    team: {
      id: team.id,
      name: team.name,
      shortCode: team.short_code,
    },
  })
}

