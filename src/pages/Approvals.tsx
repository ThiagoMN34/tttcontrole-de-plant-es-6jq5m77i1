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
import { Check, X } from 'lucide-react'
import { formatDate } from '@/lib/format'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/card'

export default function Approvals() {
  const { shifts, employees, guests, updateShift, values } = useMainStore()
  const { toast } = useToast()

  const pendingShifts = shifts.filter((s: any) => s.status === 'pending')

  const handleApprove = (id: string, startTime: string, endTime: string) => {
    const valueConfig = values[0]
    let total = 0

    if (valueConfig) {
      if (valueConfig.type === 'fixed') {
        total = valueConfig.amount
      } else {
        const start = new Date(startTime).getTime()
        const end = new Date(endTime).getTime()
        const hours = Math.max(0, (end - start) / (1000 * 60 * 60))
        total = hours * valueConfig.amount
      }
    }

    updateShift(id, { status: 'approved', value: total })
    toast({ title: 'Sucesso', description: 'Plantão aprovado com sucesso!' })
  }

  const handleReject = (id: string) => {
    updateShift(id, { status: 'rejected' })
    toast({ title: 'Rejeitado', description: 'Plantão foi rejeitado.', variant: 'destructive' })
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in-up">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
        Aprovações Pendentes
      </h1>
      <Card className="shadow-sm border-0 sm:border">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="whitespace-nowrap">Funcionário</TableHead>
                <TableHead className="whitespace-nowrap">Hóspede</TableHead>
                <TableHead className="whitespace-nowrap">Início</TableHead>
                <TableHead className="whitespace-nowrap">Fim</TableHead>
                <TableHead className="text-right whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingShifts.map((s: any) => (
                <TableRow key={s.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium whitespace-nowrap">
                    {employees.find((e: any) => e.id === s.employeeId)?.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {guests.find((e: any) => e.id === s.guestId)?.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(s.startTime)}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(s.endTime)}</TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      onClick={() => handleApprove(s.id, s.startTime, s.endTime)}
                    >
                      <Check className="w-4 h-4 sm:mr-1" />{' '}
                      <span className="hidden sm:inline">Aprovar</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleReject(s.id)}
                    >
                      <X className="w-4 h-4 sm:mr-1" />{' '}
                      <span className="hidden sm:inline">Rejeitar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {pendingShifts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-slate-500 bg-slate-50/30"
                  >
                    Tudo limpo! Não há plantões aguardando aprovação.
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
