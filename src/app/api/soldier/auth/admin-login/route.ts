import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/clients'
import { setAdminSession } from '@/lib/soldier/session'

export const runtime = 'nodejs'

export const POST = async (request: Request) => {
  const payload = await request.json().catch(() => null)
  const email = typeof payload?.email === 'string' ? payload.email : ''
  const pin = typeof payload?.pin === 'string' ? payload.pin : ''

  if (!email || !pin || !/^\d{4}$/.test(pin)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const supabase = createServiceRoleClient()

  const { data, error } = await supabase.rpc('sl_authenticate_admin', {
    p_email: email,
    p_pin: pin,
  })

  if (error) {
    return NextResponse.json({ error: 'Login failed', details: error.message }, { status: 500 })
  }

  const admin = Array.isArray(data) ? data[0] : data
  if (!admin?.email) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await setAdminSession(admin.email)
  return NextResponse.json({ success: true })
}


