import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const GET = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Soft fallback to avoid breaking local dev without env vars
    return NextResponse.json({ teams: [] })
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseKey)

  const { data, error } = await supabase
    .from('phl_teams')
    .select('id, name, short_code')
    .order('name', { ascending: true })

  if (error) {
    return NextResponse.json({ teams: [], error: 'Failed to load teams' })
  }

  return NextResponse.json({ teams: data ?? [] })
}

