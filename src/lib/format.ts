import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date: string | Date | undefined | null) {
  if (!date) return '-'
  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ptBR })
  } catch (error) {
    return '-'
  }
}
