import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  DollarSign,
  Users,
  UserCog,
  BedDouble,
  FileText,
  Settings,
  Menu,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const navItems = [
  { icon: LayoutDashboard, label: 'Painel', href: '/' },
  { icon: CheckSquare, label: 'Aprovações', href: '/aprovacoes' },
  { icon: DollarSign, label: 'Pagamentos', href: '/pagamentos' },
  { icon: Users, label: 'Funcionários', href: '/cadastros/funcionarios' },
  { icon: UserCog, label: 'Aprovadores', href: '/cadastros/aprovadores' },
  { icon: BedDouble, label: 'Hóspedes', href: '/cadastros/hospedes' },
  { icon: FileText, label: 'Motivos', href: '/cadastros/motivos' },
  { icon: Settings, label: 'Valores', href: '/cadastros/valores' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const NavLinks = () => (
    <div className="space-y-1 py-4">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
            )}
          >
            <item.icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-slate-400')} />
            {item.label}
          </Link>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="font-bold text-lg text-primary">Controle de Plantões</div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
            <div className="p-6 pb-2">
              <div className="font-bold text-xl text-primary">Menu</div>
            </div>
            <ScrollArea className="h-[calc(100vh-80px)] px-3">
              <NavLinks />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 min-h-screen sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <div className="font-bold text-xl text-primary">Controle de Plantões</div>
          <div className="text-xs text-slate-500 mt-1">Gestão simplificada sem login</div>
        </div>
        <ScrollArea className="flex-1 px-3">
          <NavLinks />
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[100vw]">
        <Outlet />
      </main>
    </div>
  )
}
