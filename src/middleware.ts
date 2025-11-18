import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createMiddlewareClient<Database>({ req: request, res: response }, {
      supabaseUrl,
      supabaseKey,
    })
    await supabase.auth.getSession()
  }
  return response
}

export const config = {
  matcher: ['/soldier/:path*', '/api/soldier/:path*', '/powerhouse/:path*', '/api/powerhouse/:path*'],
}
