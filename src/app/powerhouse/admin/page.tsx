import AdminDashboard from '@/components/powerhouse/admin/AdminDashboard'
import AdminLogin from '@/components/powerhouse/admin/AdminLogin'
import { getAdminSession } from '@/lib/powerhouse/session'
import { getAdminDashboardData } from '@/lib/powerhouse/data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const AdminPage = async () => {
  const session = await getAdminSession()
  if (!session?.email) {
    return <AdminLogin />
  }

  const dashboard = await getAdminDashboardData()

  return <AdminDashboard dashboard={dashboard} />
}

export default AdminPage

