import AdminDashboard from '@/components/soldier/admin/AdminDashboard'
import AdminLogin from '@/components/soldier/admin/AdminLogin'
import { getAdminSession } from '@/lib/soldier/session'
import { getAdminDashboardData } from '@/lib/soldier/data'

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
