import CrudPage from '@/components/CrudPage'
import useMainStore from '@/stores/main'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency } from '@/lib/format'

export default function Values() {
  const { values, addEntity, removeEntity } = useMainStore()

  const renderForm = (close: () => void) => {
    const [form, setForm] = useState({ type: 'hourly', amount: '' })
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addEntity('values', { ...form, amount: Number(form.amount) })
          close()
        }}
        className="space-y-4 mt-4"
      >
        <div className="space-y-2">
          <Label>Tipo de Cobrança</Label>
          <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Valor por Hora</SelectItem>
              <SelectItem value="fixed">Fixo por Plantão</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Valor Base (R$)</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            placeholder="0.00"
          />
        </div>
        <Button type="submit" className="w-full mt-4">
          Salvar Valor
        </Button>
      </form>
    )
  }

  const formattedItems = values.map((v: any) => ({
    ...v,
    typeLabel: v.type === 'hourly' ? 'Por Hora' : 'Fixo',
    amountLabel: formatCurrency(v.amount),
  }))

  return (
    <CrudPage
      title="Configuração de Valores"
      items={formattedItems}
      columns={[
        { key: 'typeLabel', label: 'Tipo' },
        { key: 'amountLabel', label: 'Valor Base' },
      ]}
      renderForm={renderForm}
      onDelete={(id: string) => removeEntity('values', id)}
    />
  )
}
