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

function ValueForm({ close }: { close: () => void }) {
  const { addEntity } = useMainStore()
  const [form, setForm] = useState({ type: 'hourly', amount: '' })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addEntity('values', { ...form, amount: parseFloat(form.amount) })
        close()
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Tipo de Cobrança</Label>
        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Por Hora</SelectItem>
            <SelectItem value="fixed">Fixo por Plantão</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Valor (R$)</Label>
        <Input
          type="number"
          step="0.01"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
          placeholder="Ex: 50.00"
        />
      </div>
      <Button type="submit" className="w-full mt-4">
        Salvar
      </Button>
    </form>
  )
}

export default function Values() {
  const { values, removeEntity } = useMainStore()

  const formattedValues = values.map((v) => ({
    ...v,
    typeLabel: v.type === 'hourly' ? 'Por Hora' : 'Fixo',
    amountLabel: `R$ ${v.amount?.toFixed(2)}`,
  }))

  return (
    <CrudPage
      title="Valores e Regras"
      items={formattedValues}
      columns={[
        { key: 'typeLabel', label: 'Tipo' },
        { key: 'amountLabel', label: 'Valor' },
      ]}
      renderForm={ValueForm}
      onDelete={(id: string) => removeEntity('values', id)}
    />
  )
}
