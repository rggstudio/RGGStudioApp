import { NextResponse } from 'next/server'
import { clearAdminSession } from '@/lib/soldier/session'

export const runtime = 'nodejs'

export const POST = async () => {
  clearAdminSession()
  return NextResponse.json({ success: true })
}


