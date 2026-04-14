import CrudPage from '@/components/CrudPage'
import useMainStore from '@/stores/main'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function Employees() {
  const { employees, addEntity, removeEntity } = useMainStore()

  const renderForm = (close: () => void) => {
    const [form, setForm] = useState({ name: '', role: '', contact: '' })

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addEntity('employees', form)
          close()
        }}
        className="space-y-4 mt-4"
      >
        <div className="space-y-2">
          <Label>Nome Completo</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Ex: Ana Silva"
          />
        </div>
        <div className="space-y-2">
          <Label>Cargo</Label>
          <Input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
            placeholder="Ex: Enfermeira"
          />
        </div>
        <div className="space-y-2">
          <Label>Contato / Telefone</Label>
          <Input
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
            placeholder="(00) 00000-0000"
          />
        </div>
        <Button type="submit" className="w-full mt-4">
          Salvar Funcionário
        </Button>
      </form>
    )
  }

  return (
    <CrudPage
      title="Funcionários"
      items={employees}
      columns={[
        { key: 'name', label: 'Nome' },
        { key: 'role', label: 'Cargo' },
        { key: 'contact', label: 'Contato' },
      ]}
      renderForm={renderForm}
      onDelete={(id: string) => removeEntity('employees', id)}
    />
  )
}
