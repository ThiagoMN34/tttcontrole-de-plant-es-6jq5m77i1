import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useMainStore from '@/stores/main'
import { Clock, CheckCircle2, XCircle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Index() {
  const { shifts, employees } = useMainStore()

  const pending = shifts.filter((s) => s.status === 'pending').length
  const approved = shifts.filter((s) => s.status === 'approved').length
  const rejected = shifts.filter((s) => s.status === 'rejected').length

  const registerUrl = `${window.location.origin}/registrar-plantao`
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(registerUrl)}&size=300`

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Painel Gerencial</h1>
          <p className="text-slate-500 mt-1">Visão geral dos plantões e acessos livres de senha.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Plantões Pendentes</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Aprovados</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Rejeitados</CardTitle>
            <XCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Funcionários</CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{employees.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20 shadow-md">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-xl text-primary">QR Code para Plantões</CardTitle>
            <CardDescription>
              Imprima ou deixe este QR Code visível para que os funcionários registrem seus plantões
              pelo celular.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <img src={qrCodeUrl} alt="QR Code de Registro" className="w-64 h-64 object-contain" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-500 break-all">{registerUrl}</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/registrar-plantao" target="_blank">
                  Abrir Link Diretamente
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funções do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start h-12" variant="secondary">
              <Link to="/aprovacoes">
                <Clock className="w-5 h-5 mr-3 text-amber-500" />
                <span className="text-base font-medium">Aprovações Pendentes</span>
              </Link>
            </Button>
            <Button asChild className="w-full justify-start h-12" variant="secondary">
              <Link to="/pagamentos">
                <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500" />
                <span className="text-base font-medium">Relatório de Pagamentos</span>
              </Link>
            </Button>
            <Button asChild className="w-full justify-start h-12" variant="secondary">
              <Link to="/cadastros/funcionarios">
                <Users className="w-5 h-5 mr-3 text-blue-500" />
                <span className="text-base font-medium">Gerenciar Funcionários</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
