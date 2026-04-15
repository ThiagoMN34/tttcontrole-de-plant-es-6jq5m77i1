import CrudPage from '@/components/CrudPage'
import useMainStore from '@/stores/main'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

function ReasonForm({ close }: { close: () => void }) {
  const { addEntity } = useMainStore()
  const [form, setForm] = useState({ name: '' })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addEntity('reasons', form)
        close()
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Motivo (Ex: Falta, Reforço, Feriado)</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          placeholder="Ex: Cobertura de Férias"
        />
      </div>
      <Button type="submit" className="w-full mt-4">
        Salvar
      </Button>
    </form>
  )
}

export default function Reasons() {
  const { reasons, removeEntity } = useMainStore()

  return (
    <CrudPage
      title="Motivos de Plantão"
      items={reasons}
      columns={[{ key: 'name', label: 'Motivo' }]}
      renderForm={ReasonForm}
      onDelete={(id: string) => removeEntity('reasons', id)}
    />
  )
}
