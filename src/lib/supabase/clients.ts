import { cookies } from 'next/headers'
import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const buildSupabaseUrl = () => {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  if (!value) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL (or fallback SUPABASE_URL) is not set')
  }
  return value
}

const buildAnonKey = () => {
  const value = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!value) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')
  }
  return value
}

const buildServiceRoleKey = () => {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!value) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  }
  return value
}

export const createServiceRoleClient = () =>
  createClient<Database>(buildSupabaseUrl(), buildServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

export const createServerComponentSupabase = () =>
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createServerComponentClient<Database>({
        cookies,
      })
    : ({
        auth: {
          getSession: async () => ({
            data: { session: null },
            error: null,
          }),
        },
      } as any)

export const createRouteHandlerSupabase = () =>
  createRouteHandlerClient<Database>({
    cookies,
  })

export const createBrowserSupabase = () =>
  createClient<Database>(buildSupabaseUrl(), buildAnonKey())
