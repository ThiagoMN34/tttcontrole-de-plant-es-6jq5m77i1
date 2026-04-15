import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute() {
  const { user, profile, loading, signOut } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user && !profile) {
    // Se o usuário está autenticado mas não tem perfil, há uma inconsistência.
    // Deslogamos para limpar o estado e evitar travamentos.
    signOut()
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <p className="text-destructive font-medium mb-4">Erro de acesso: Perfil não encontrado.</p>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (profile?.role === 'approver' && location.pathname !== '/aprovacoes') {
    return <Navigate to="/aprovacoes" replace />
  }

  return <Outlet />
}
