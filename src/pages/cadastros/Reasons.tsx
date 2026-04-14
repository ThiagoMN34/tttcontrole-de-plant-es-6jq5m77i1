import CrudPage from '@/components/CrudPage'
import useMainStore from '@/stores/main'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function Reasons() {
  const { reasons, addEntity, removeEntity } = useMainStore()

  const renderForm = (close: () => void) => {
    const [form, setForm] = useState({ name: '' })
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addEntity('reasons', form)
          close()
        }}
        className="space-y-4 mt-4"
      >
        <div className="space-y-2">
          <Label>Descrição do Motivo</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Ex: Cobertura de Feriado"
          />
        </div>
        <Button type="submit" className="w-full mt-4">
          Salvar Motivo
        </Button>
      </form>
    )
  }

  return (
    <CrudPage
      title="Motivos de Plantão"
      items={reasons}
      columns={[{ key: 'name', label: 'Descrição' }]}
      renderForm={renderForm}
      onDelete={(id: string) => removeEntity('reasons', id)}
    />
  )
}
