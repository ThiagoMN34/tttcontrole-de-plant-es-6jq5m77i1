import { useState } from 'react'
import useMainStore from '@/stores/main'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle2, Clock } from 'lucide-react'

export default function PublicRegisterShift() {
  const { employees, guests, reasons, addEntity } = useMainStore()
  const { toast } = useToast()
  const [form, setForm] = useState({
    employeeId: '',
    guestId: '',
    reasonId: '',
    startTime: '',
    endTime: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.employeeId || !form.guestId || !form.reasonId || !form.startTime || !form.endTime) {
      toast({
        title: 'Atenção',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    if (new Date(form.startTime) >= new Date(form.endTime)) {
      toast({
        title: 'Atenção',
        description: 'A data de fim deve ser posterior à data de início.',
        variant: 'destructive',
      })
      return
    }

    addEntity('shifts', { ...form, status: 'pending' })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 animate-fade-in">
        <Card className="w-full max-w-md text-center py-8 shadow-lg border-0">
          <CardContent className="flex flex-col items-center gap-4">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-slide-up" />
            <h2 className="text-2xl font-bold text-slate-800">Plantão Registrado!</h2>
            <p className="text-slate-500">
              Seu plantão foi enviado com sucesso e está aguardando aprovação da gestão.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="mt-6 w-full max-w-[200px]"
            >
              Registrar Novo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-8 animate-fade-in">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-3 bg-primary/5 border-b border-primary/10 rounded-t-lg pb-8">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Clock className="w-7 h-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl text-primary font-bold">Registrar Plantão</CardTitle>
          <CardDescription className="text-slate-600">
            Preencha os dados abaixo para registrar suas horas extras e atendimentos.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Seu Perfil (Funcionário)</Label>
              <Select
                value={form.employeeId}
                onValueChange={(v) => setForm({ ...form, employeeId: v })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione seu nome" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((e: any) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name} ({e.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Hóspede Atendido</Label>
              <Select value={form.guestId} onValueChange={(v) => setForm({ ...form, guestId: v })}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione o hóspede" />
                </SelectTrigger>
                <SelectContent>
                  {guests.map((e: any) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name} (Quarto {e.room})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Motivo do Plantão</Label>
              <Select
                value={form.reasonId}
                onValueChange={(v) => setForm({ ...form, reasonId: v })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  {reasons.map((e: any) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Início</Label>
                <Input
                  type="datetime-local"
                  className="h-12"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fim</Label>
                <Input
                  type="datetime-local"
                  className="h-12"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-8 h-12 text-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Enviar Registro
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
