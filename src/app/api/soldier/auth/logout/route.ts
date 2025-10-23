import { NextResponse } from 'next/server'
import { clearTeamSession } from '@/lib/soldier/session'

export const runtime = 'edge'

export const POST = async () => {
  clearTeamSession()
  return NextResponse.json({ success: true })
}
