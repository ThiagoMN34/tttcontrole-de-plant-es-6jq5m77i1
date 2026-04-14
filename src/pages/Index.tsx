import useMainStore from '@/stores/main'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarCheck, DollarSign, Clock } from 'lucide-react'
import { formatCurrency } from '@/lib/format'
import { useMemo } from 'react'

export default function Index() {
  const { shifts } = useMainStore()

  const pendingCount = shifts.filter((s: any) => s.status === 'pending').length
  const approvedCount = shifts.filter((s: any) => s.status === 'approved').length
  const totalValuePending = shifts
    .filter((s: any) => s.status === 'approved')
    .reduce((acc: number, s: any) => acc + (s.value || 0), 0)

  const daysInMonth = 30
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const shiftsByDay = useMemo(() => {
    const map: Record<number, any[]> = {}
    shifts.forEach((s: any) => {
      const d = new Date(s.startTime).getDate()
      if (isNaN(d)) return
      if (!map[d]) map[d] = []
      map[d].push(s)
    })
    return map
  }, [shifts])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-400'
      case 'approved':
        return 'bg-emerald-500'
      case 'paid':
        return 'bg-blue-500'
      case 'rejected':
        return 'bg-red-500'
      default:
        return 'bg-slate-300'
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in-up">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50/30 border-amber-100/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">
              Pendentes de Aprovação
            </CardTitle>
            <Clock className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-950">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50/30 border-emerald-100/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">
              Plantões Aprovados
            </CardTitle>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-950">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50/30 border-blue-100/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Pagamentos Pendentes
            </CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-950">
              {formatCurrency(totalValuePending)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Visão Geral do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
              <div
                key={d}
                className="text-center text-xs font-semibold text-slate-500 py-2 uppercase tracking-wider"
              >
                {d}
              </div>
            ))}
            <div className="col-span-3"></div>
            {days.map((day) => (
              <div
                key={day}
                className="aspect-square border rounded-md p-1.5 relative bg-card hover:bg-slate-50 transition-colors group cursor-default flex flex-col"
              >
                <span className="text-xs text-slate-400 group-hover:text-primary font-medium">
                  {day}
                </span>
                <div className="flex-1 flex flex-col gap-1 mt-1 overflow-hidden">
                  {shiftsByDay[day]?.slice(0, 3).map((s: any, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-full rounded-full ${getStatusColor(s.status)}`}
                      title={s.status}
                    ></div>
                  ))}
                  {shiftsByDay[day]?.length > 3 && (
                    <div className="text-[10px] text-slate-400 leading-none">
                      +{shiftsByDay[day].length - 3}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-500 justify-end">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div> Pendente
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Aprovado
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Pago
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
