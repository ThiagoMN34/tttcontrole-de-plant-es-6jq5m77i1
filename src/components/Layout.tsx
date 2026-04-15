import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  DollarSign,
  Users,
  UserCheck,
  Bed,
  Tag,
  Settings,
  QrCode,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
export default function Layout() {
  const location = useLocation()

  const menu = [
    { title: 'Dashboard', url: '/', icon: LayoutDashboard },
    { title: 'Aprovações', url: '/aprovacoes', icon: CalendarCheck },
    { title: 'Pagamentos', url: '/pagamentos', icon: DollarSign },
  ]
  const cadastros = [
    { title: 'Funcionários', url: '/cadastros/funcionarios', icon: Users },
    { title: 'Aprovadores', url: '/cadastros/aprovadores', icon: UserCheck },
    { title: 'Hóspedes', url: '/cadastros/hospedes', icon: Bed },
    { title: 'Motivos', url: '/cadastros/motivos', icon: Tag },
    { title: 'Valores', url: '/cadastros/valores', icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <CalendarCheck className="w-5 h-5" /> Plantões
            </h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menu.map((m) => (
                    <SidebarMenuItem key={m.url}>
                      <SidebarMenuButton asChild isActive={location.pathname === m.url}>
                        <Link to={m.url}>
                          <m.icon className="w-4 h-4" /> <span>{m.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {cadastros.length > 0 && (
              <SidebarGroup>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-2">
                  Cadastros
                </div>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {cadastros.map((m) => (
                      <SidebarMenuItem key={m.url}>
                        <SidebarMenuButton asChild isActive={location.pathname === m.url}>
                          <Link to={m.url}>
                            <m.icon className="w-4 h-4" /> <span>{m.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="h-14 border-b flex items-center justify-between px-4 bg-card shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="font-medium text-slate-700 hidden sm:inline-block border-l pl-4 ml-2 border-slate-200">
                Administração
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex text-primary border-primary/20 hover:bg-primary/5"
                  >
                    <QrCode className="w-4 h-4 mr-2" /> Gerar QR Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md text-center">
                  <DialogHeader>
                    <DialogTitle className="text-center">QR Code para Registro</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center p-6 gap-4">
                    <img
                      src="https://img.usecurling.com/i?q=qrcode&shape=outline&color=solid-black"
                      alt="QR Code"
                      className="w-48 h-48 opacity-80"
                    />
                    <p className="text-sm text-muted-foreground">
                      Imprima e disponibilize para escaneamento.
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/registrar-plantao" target="_blank">
                        Acessar Portal Mobile
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-transparent">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
