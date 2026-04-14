import CrudPage from '@/components/CrudPage'
import useMainStore from '@/stores/main'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

function ApproverForm({ close }: { close: () => void }) {
  const { addEntity } = useMainStore()
  const [form, setForm] = useState({ name: '' })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addEntity('approvers', form)
        close()
      }}
      className="space-y-4 mt-4"
    >
      <div className="space-y-2">
        <Label>Nome do Gestor/Aprovador</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          placeholder="Ex: Dra. Helena"
        />
      </div>
      <Button type="submit" className="w-full mt-4">
        Salvar Aprovador
      </Button>
    </form>
  )
}

export default function Approvers() {
  const { approvers, removeEntity } = useMainStore()

  return (
    <CrudPage
      title="Aprovadores"
      items={approvers}
      columns={[{ key: 'name', label: 'Nome' }]}
      renderForm={ApproverForm}
      onDelete={(id: string) => removeEntity('approvers', id)}
    />
  )
}
