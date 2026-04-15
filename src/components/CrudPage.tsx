import { ReactNode, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Plus, Trash2 } from 'lucide-react'

interface Column {
  key: string
  label: string
}

interface CrudPageProps {
  title: string
  items: any[]
  columns: Column[]
  renderForm: (props: { close: () => void }) => ReactNode
  onDelete: (id: string) => Promise<void> | void
}

export default function CrudPage({ title, items, columns, renderForm, onDelete }: CrudPageProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir?')) {
        await onDelete(id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">{title}</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Novo
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Adicionar {title}</SheetTitle>
            </SheetHeader>
            <div className="mt-4">{renderForm({ close: () => setOpen(false) })}</div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="shadow-sm border-0 sm:border">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key} className="whitespace-nowrap">
                    {col.label}
                  </TableHead>
                ))}
                <TableHead className="text-right whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/50">
                  {columns.map((col) => (
                    <TableCell key={col.key} className="whitespace-nowrap">
                      {item[col.key] || '-'}
                    </TableCell>
                  ))}
                  <TableCell className="text-right whitespace-nowrap">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center py-12 text-slate-500 bg-slate-50/30"
                  >
                    Nenhum registro encontrado.
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
