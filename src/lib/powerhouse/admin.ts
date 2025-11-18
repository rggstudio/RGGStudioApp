import { getAdminSession } from '@/lib/powerhouse/session'

export const requireAdmin = async () => {
  const session = await getAdminSession()
  if (!session?.email) return null
  return { user: { id: session.email, email: session.email } as any, role: 'commissioner' }
}

