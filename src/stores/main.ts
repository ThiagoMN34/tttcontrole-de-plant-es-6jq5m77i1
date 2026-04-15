import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/use-auth'
import * as employeesService from '@/services/employees'
import * as guestsService from '@/services/guests'
import * as reasonsService from '@/services/reasons'
import * as approversService from '@/services/approvers'
import * as valuesService from '@/services/values'
import * as shiftsService from '@/services/shifts'

export type StoreState = {
  employees: any[]
  guests: any[]
  reasons: any[]
  approvers: any[]
  values: any[]
  shifts: any[]
  loading: boolean
}

const initialState: StoreState = {
  employees: [],
  guests: [],
  reasons: [],
  approvers: [],
  values: [],
  shifts: [],
  loading: true,
}

export const StoreContext = createContext<any>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(initialState)
  const { user, loading: authLoading } = useAuth()

  const fetchData = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }))
    try {
      const [
        { data: employees },
        { data: guests },
        { data: reasons },
        { data: approvers },
        { data: values },
        { data: shiftsData },
      ] = await Promise.all([
        employeesService.getEmployees().catch(() => ({ data: [] })),
        guestsService.getGuests().catch(() => ({ data: [] })),
        reasonsService.getReasons().catch(() => ({ data: [] })),
        approversService.getApprovers().catch(() => ({ data: [] })),
        valuesService.getValues().catch(() => ({ data: [] })),
        shiftsService.getShifts().catch(() => ({ data: [] })),
      ])

      const shifts =
        shiftsData?.map((s: any) => ({
          ...s,
          employeeId: s.employee_id,
          guestId: s.guest_id,
          reasonId: s.reason_id,
          startTime: s.start_time,
          endTime: s.end_time,
        })) || []

      setState({
        employees: employees || [],
        guests: guests || [],
        reasons: reasons || [],
        approvers: approvers || [],
        values: values || [],
        shifts,
        loading: false,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      setState((s) => ({ ...s, loading: false }))
    }
  }, [])

  useEffect(() => {
    if (!authLoading) {
      fetchData()
    }
  }, [fetchData, user, authLoading])

  const addEntity = async (key: keyof StoreState, item: any) => {
    let result: any = null
    if (key === 'employees') result = await employeesService.createEmployee(item)
    if (key === 'guests') result = await guestsService.createGuest(item)
    if (key === 'reasons') result = await reasonsService.createReason(item)
    if (key === 'approvers') result = await approversService.createApprover(item)
    if (key === 'values') result = await valuesService.createValue(item)
    if (key === 'shifts') {
      const { data } = await shiftsService.createShift(item)
      if (data) {
        const mapped = {
          ...data,
          employeeId: data.employee_id,
          guestId: data.guest_id,
          reasonId: data.reason_id,
          startTime: data.start_time,
          endTime: data.end_time,
        }
        setState((s) => ({ ...s, shifts: [mapped, ...s.shifts] }))
      }
      return
    }

    if (result?.data) {
      setState((s) => ({ ...s, [key]: [...(s[key] as any[]), result.data] }))
    }
  }

  const removeEntity = async (key: keyof StoreState, id: string) => {
    if (key === 'employees') await employeesService.deleteEmployee(id)
    if (key === 'guests') await guestsService.deleteGuest(id)
    if (key === 'reasons') await reasonsService.deleteReason(id)
    if (key === 'approvers') await approversService.deleteApprover(id)
    if (key === 'values') await valuesService.deleteValue(id)
    if (key === 'shifts') await shiftsService.deleteShift(id)

    setState((s) => ({ ...s, [key]: (s[key] as any[]).filter((i: any) => i.id !== id) }))
  }

  const updateShift = async (id: string, updates: any) => {
    const { data } = await shiftsService.updateShift(id, updates)
    if (data) {
      setState((s) => ({
        ...s,
        shifts: s.shifts.map((sh: any) =>
          sh.id === id ? { ...sh, ...data, status: data.status, value: data.value } : sh,
        ),
      }))
    }
  }

  return React.createElement(
    StoreContext.Provider,
    {
      value: { ...state, addEntity, removeEntity, updateShift, refresh: fetchData },
    },
    children,
  )
}

export default function useMainStore() {
  return useContext(StoreContext)
}
