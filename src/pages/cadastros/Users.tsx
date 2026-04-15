import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { KeyRound, Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

function ChangePasswordDialog({
  userId,
  onOpenChange,
}: {
  userId: string
  onOpenChange: (open: boolean) => void
}) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.functions.invoke('admin-users', {
      body: { action: 'update_password', userId, password },
    })
    setLoading(false)
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Sucesso', description: 'Senha atualizada!' })
      onOpenChange(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label>Nova Senha</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={4}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar Senha'}
      </Button>
    </form>
  )
}

function AddUserDialog({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ email: '', name: '', password: '', role: 'approver' })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.functions.invoke('admin-users', {
      body: { action: 'create_user', ...form },
    })
    setLoading(false)
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Sucesso', description: 'Usuário criado!' })
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label>Nome</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>E-mail</Label>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Senha</Label>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={4}
        />
      </div>
      <div className="space-y-2">
        <Label>Perfil</Label>
        <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approver">Aprovador</SelectItem>
            <SelectItem value="master">Master</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Usuário'}
      </Button>
    </form>
  )
}

export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [pwdOpenId, setPwdOpenId] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const { toast } = useToast()

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este usuário?')) return
    const { error } = await supabase.functions.invoke('admin-users', {
      body: { action: 'delete_user', userId: id },
    })
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Sucesso', description: 'Usuário removido!' })
      fetchUsers()
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
          Usuários do Sistema
        </h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Usuário</DialogTitle>
            </DialogHeader>
            <AddUserDialog
              onSuccess={() => {
                setAddOpen(false)
                fetchUsers()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm border-0 sm:border">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'master' ? 'default' : 'secondary'}>
                      {u.role === 'master' ? 'Master' : 'Aprovador'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    <Dialog
                      open={pwdOpenId === u.id}
                      onOpenChange={(open) => setPwdOpenId(open ? u.id : null)}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <KeyRound className="w-4 h-4 sm:mr-1" />{' '}
                          <span className="hidden sm:inline">Senha</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Alterar Senha de {u.name}</DialogTitle>
                        </DialogHeader>
                        <ChangePasswordDialog
                          userId={u.id}
                          onOpenChange={(o) => setPwdOpenId(o ? u.id : null)}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(u.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-12 text-slate-500 bg-slate-50/30"
                  >
                    Nenhum usuário encontrado.
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
