import { cookies } from 'next/headers'
import { getAdminSession } from '@/lib/soldier/session'

export const requireAdmin = async () => {
  const session = await getAdminSession()
  if (!session?.email) return null
  return { user: { id: session.email, email: session.email } as any, role: 'commissioner' }
}
