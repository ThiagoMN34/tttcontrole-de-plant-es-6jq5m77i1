import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StoreProvider } from '@/stores/main'
import { AuthProvider } from '@/hooks/use-auth'
import Layout from './components/Layout'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import PublicRegisterShift from './pages/PublicRegisterShift'
import Approvals from './pages/Approvals'
import Payments from './pages/Payments'
import Employees from './pages/cadastros/Employees'
import Approvers from './pages/cadastros/Approvers'
import Guests from './pages/cadastros/Guests'
import Reasons from './pages/cadastros/Reasons'
import Values from './pages/cadastros/Values'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <StoreProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/registrar-plantao" element={<PublicRegisterShift />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/aprovacoes" element={<Approvals />} />
              <Route path="/pagamentos" element={<Payments />} />
              <Route path="/cadastros/funcionarios" element={<Employees />} />
              <Route path="/cadastros/aprovadores" element={<Approvers />} />
              <Route path="/cadastros/hospedes" element={<Guests />} />
              <Route path="/cadastros/motivos" element={<Reasons />} />
              <Route path="/cadastros/valores" element={<Values />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </StoreProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
