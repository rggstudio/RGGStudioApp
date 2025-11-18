import { NextResponse } from 'next/server'
import { clearTeamSession } from '@/lib/powerhouse/session'

export const runtime = 'edge'

export const POST = async () => {
  clearTeamSession()
  return NextResponse.json({ success: true })
}

