import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface MainStoreContextType {
  employees: any[]
  guests: any[]
  reasons: any[]
  values: any[]
  shifts: any[]
  approvers: any[]
  addEntity: (entity: string, data: any) => Promise<void>
  removeEntity: (entity: string, id: string) => Promise<void>
  updateShift: (id: string, updates: any) => Promise<void>
  loading: boolean
}

const MainStoreContext = createContext<MainStoreContextType | undefined>(undefined)

export const useMainStore = () => {
  const context = useContext(MainStoreContext)
  if (!context) throw new Error('useMainStore must be used within StoreProvider')
  return context
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<any[]>([])
  const [guests, setGuests] = useState<any[]>([])
  const [reasons, setReasons] = useState<any[]>([])
  const [values, setValues] = useState<any[]>([])
  const [shifts, setShifts] = useState<any[]>([])
  const [approvers, setApprovers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)
      const [
        { data: empData },
        { data: guestData },
        { data: reasonData },
        { data: valueData },
        { data: shiftData },
        { data: approverData },
      ] = await Promise.all([
        supabase.from('employees').select('*').order('created_at'),
        supabase.from('guests').select('*').order('created_at'),
        supabase.from('reasons').select('*').order('created_at'),
        supabase.from('values').select('*').order('created_at'),
        supabase.from('shifts').select('*').order('created_at', { ascending: false }),
        supabase.from('approvers').select('*').order('created_at'),
      ])

      setEmployees(empData || [])
      setGuests(guestData || [])
      setReasons(reasonData || [])
      setValues(valueData || [])
      setShifts(shiftData || [])
      setApprovers(approverData || [])
    } catch (error: any) {
      console.error('Error loading data:', error)
      toast({ title: 'Erro ao carregar dados', description: error.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const addEntity = async (entity: string, data: any) => {
    try {
      let payload = { ...data }
      if (entity === 'shifts') {
        payload = {
          employee_id: data.employeeId,
          guest_id: data.guestId,
          reason_id: data.reasonId,
          start_time: data.startTime,
          end_time: data.endTime,
          status: data.status || 'pending',
          value: data.value,
        }
      }

      const { data: newRecord, error } = await supabase
        .from(entity)
        .insert(payload)
        .select()
        .single()
      if (error) throw error

      if (entity === 'employees') setEmployees((prev) => [...prev, newRecord])
      if (entity === 'guests') setGuests((prev) => [...prev, newRecord])
      if (entity === 'reasons') setReasons((prev) => [...prev, newRecord])
      if (entity === 'values') setValues((prev) => [...prev, newRecord])
      if (entity === 'shifts') setShifts((prev) => [newRecord, ...prev])
      if (entity === 'approvers') setApprovers((prev) => [...prev, newRecord])

      toast({ title: 'Sucesso', description: 'Registro salvo com sucesso!' })
    } catch (error: any) {
      console.error('Error adding entity:', error)
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' })
      throw error
    }
  }

  const removeEntity = async (entity: string, id: string) => {
    try {
      const { error } = await supabase.from(entity).delete().eq('id', id)
      if (error) throw error

      if (entity === 'employees') setEmployees((prev) => prev.filter((item) => item.id !== id))
      if (entity === 'guests') setGuests((prev) => prev.filter((item) => item.id !== id))
      if (entity === 'reasons') setReasons((prev) => prev.filter((item) => item.id !== id))
      if (entity === 'values') setValues((prev) => prev.filter((item) => item.id !== id))
      if (entity === 'shifts') setShifts((prev) => prev.filter((item) => item.id !== id))
      if (entity === 'approvers') setApprovers((prev) => prev.filter((item) => item.id !== id))

      toast({ title: 'Sucesso', description: 'Registro removido com sucesso!' })
    } catch (error: any) {
      console.error('Error removing entity:', error)
      toast({ title: 'Erro ao remover', description: error.message, variant: 'destructive' })
    }
  }

  const updateShift = async (id: string, updates: any) => {
    try {
      const { data: updatedRecord, error } = await supabase
        .from('shifts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error

      setShifts((prev) => prev.map((item) => (item.id === id ? updatedRecord : item)))
    } catch (error: any) {
      console.error('Error updating shift:', error)
      toast({ title: 'Erro ao atualizar', description: error.message, variant: 'destructive' })
    }
  }

  return (
    <MainStoreContext.Provider
      value={{
        employees,
        guests,
        reasons,
        values,
        shifts,
        approvers,
        addEntity,
        removeEntity,
        updateShift,
        loading,
      }}
    >
      {children}
    </MainStoreContext.Provider>
  )
}

export default useMainStore
