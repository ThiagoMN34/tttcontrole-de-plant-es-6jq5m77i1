import useMainStore from '@/stores/main'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CheckCircle2, DollarSign } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/format'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Payments() {
  const { shifts, employees, updateShift } = useMainStore()
  const { toast } = useToast()

  const paymentShifts = shifts
    .filter((s: any) => s.status === 'approved' || s.status === 'paid')
    .sort((a: any, b: any) => (a.status === 'approved' ? -1 : 1))

  const handlePay = (id: string) => {
    updateShift(id, { status: 'paid' })
    toast({ title: 'Pago', description: 'Plantão marcado como pago com sucesso.' })
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in-up">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
        Controle de Pagamentos
      </h1>
      <Card className="shadow-sm border-0 sm:border">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="whitespace-nowrap">Funcionário</TableHead>
                <TableHead className="whitespace-nowrap">Data do Plantão</TableHead>
                <TableHead className="whitespace-nowrap">Valor Calculado</TableHead>
                <TableHead className="text-right whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentShifts.map((s: any) => (
                <TableRow
                  key={s.id}
                  className={`${s.status === 'paid' ? 'bg-slate-50/50 opacity-70' : 'hover:bg-slate-50/50'} transition-all`}
                >
                  <TableCell>
                    {s.status === 'paid' ? (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                      >
                        Pago
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      >
                        Pendente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {employees.find((e: any) => e.id === s.employeeId)?.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(s.startTime)}</TableCell>
                  <TableCell className="font-bold text-slate-700 whitespace-nowrap">
                    {formatCurrency(s.value || 0)}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    {s.status === 'approved' && (
                      <Button size="sm" onClick={() => handlePay(s.id)} className="shadow-sm">
                        <DollarSign className="w-4 h-4 sm:mr-1" />{' '}
                        <span className="hidden sm:inline">Marcar Pago</span>
                      </Button>
                    )}
                    {s.status === 'paid' && (
                      <span className="text-sm font-medium text-slate-500 flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Concluído
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {paymentShifts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-slate-500 bg-slate-50/30"
                  >
                    Nenhum plantão aprovado para pagamento.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
