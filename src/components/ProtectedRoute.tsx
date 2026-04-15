import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute() {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading || (user && !profile)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (profile?.role === 'approver' && location.pathname !== '/aprovacoes') {
    return <Navigate to="/aprovacoes" replace />
  }

  return <Outlet />
}
