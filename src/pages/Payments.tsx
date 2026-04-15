import useMainStore from '@/stores/main'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export default function Payments() {
  const { shifts, employees, guests } = useMainStore()

  const approvedShifts = shifts.filter((s: any) => s.status === 'approved')
  const totalValue = approvedShifts.reduce((acc: number, shift: any) => acc + (shift.value || 0), 0)

  const handleExport = () => {
    const csvContent = [
      ['Data Inicio', 'Data Fim', 'Funcionario', 'Hospede', 'Valor (R$)'],
      ...approvedShifts.map((s: any) => [
        new Date(s.startTime || s.start_time).toLocaleString(),
        new Date(s.endTime || s.end_time).toLocaleString(),
        employees.find((e: any) => e.id === (s.employeeId || s.employee_id))?.name || 'N/A',
        guests.find((e: any) => e.id === (s.guestId || s.guest_id))?.name || 'N/A',
        s.value || 0,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'relatorio_pagamentos.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Relatório de Pagamentos
          </h1>
          <p className="text-slate-500">Plantões aprovados e consolidados.</p>
        </div>
        <Button onClick={handleExport} className="w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" /> Exportar CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ {totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Plantões Aprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{approvedShifts.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-0 sm:border">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="whitespace-nowrap">Data Início</TableHead>
                <TableHead className="whitespace-nowrap">Data Fim</TableHead>
                <TableHead className="whitespace-nowrap">Funcionário</TableHead>
                <TableHead className="whitespace-nowrap">Hóspede</TableHead>
                <TableHead className="text-right whitespace-nowrap">Valor (R$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedShifts.map((s: any) => (
                <TableRow key={s.id} className="hover:bg-slate-50/50">
                  <TableCell className="whitespace-nowrap">
                    {formatDate(s.startTime || s.start_time)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(s.endTime || s.end_time)}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {employees.find((e: any) => e.id === (s.employeeId || s.employee_id))?.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {guests.find((e: any) => e.id === (s.guestId || s.guest_id))?.name}
                  </TableCell>
                  <TableCell className="text-right font-medium whitespace-nowrap">
                    R$ {(s.value || 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              {approvedShifts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-slate-500 bg-slate-50/30"
                  >
                    Nenhum plantão aprovado encontrado.
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
