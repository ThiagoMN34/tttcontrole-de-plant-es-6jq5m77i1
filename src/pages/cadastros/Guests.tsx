import CrudPage from '@/components/CrudPage'
import useMainStore from '@/stores/main'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function Guests() {
  const { guests, addEntity, removeEntity } = useMainStore()

  const renderForm = (close: () => void) => {
    const [form, setForm] = useState({ name: '', room: '' })
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addEntity('guests', form)
          close()
        }}
        className="space-y-4 mt-4"
      >
        <div className="space-y-2">
          <Label>Nome do Hóspede</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Ex: Dona Maria"
          />
        </div>
        <div className="space-y-2">
          <Label>Quarto / Leito</Label>
          <Input
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
            required
            placeholder="Ex: 101"
          />
        </div>
        <Button type="submit" className="w-full mt-4">
          Salvar Hóspede
        </Button>
      </form>
    )
  }

  return (
    <CrudPage
      title="Hóspedes"
      items={guests}
      columns={[
        { key: 'name', label: 'Nome' },
        { key: 'room', label: 'Quarto' },
      ]}
      renderForm={renderForm}
      onDelete={(id: string) => removeEntity('guests', id)}
    />
  )
}
