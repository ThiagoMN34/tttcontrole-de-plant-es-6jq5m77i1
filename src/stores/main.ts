import React, { createContext, useContext, useState } from 'react'

export type StoreState = {
  employees: any[]
  guests: any[]
  reasons: any[]
  approvers: any[]
  values: any[]
  shifts: any[]
}

const mockData: StoreState = {
  employees: [
    { id: '1', name: 'Ana Silva', role: 'Enfermeira', contact: '11999999999' },
    { id: '2', name: 'Carlos Souza', role: 'Técnico de Enfermagem', contact: '11988888888' },
    { id: '3', name: 'Beatriz Lima', role: 'Cuidadora', contact: '11977777777' },
  ],
  guests: [
    { id: '1', name: 'Dona Maria Oliveira', room: '101' },
    { id: '2', name: 'Seu João Pedro', room: '102' },
    { id: '3', name: 'Sra. Tereza', room: '105' },
  ],
  reasons: [
    { id: '1', name: 'Cobertura de Feriado' },
    { id: '2', name: 'Emergência' },
    { id: '3', name: 'Acompanhamento Especial' },
  ],
  approvers: [{ id: '1', name: 'Dra. Helena (Gestora)' }],
  values: [{ id: '1', type: 'hourly', amount: 35 }],
  shifts: [
    {
      id: '1',
      employeeId: '1',
      guestId: '1',
      reasonId: '1',
      startTime: '2023-10-25T08:00',
      endTime: '2023-10-25T18:00',
      status: 'pending',
    },
    {
      id: '2',
      employeeId: '2',
      guestId: '2',
      reasonId: '2',
      startTime: '2023-10-24T08:00',
      endTime: '2023-10-24T18:00',
      status: 'approved',
      value: 350,
    },
    {
      id: '3',
      employeeId: '3',
      guestId: '3',
      reasonId: '3',
      startTime: '2023-10-20T08:00',
      endTime: '2023-10-20T18:00',
      status: 'paid',
      value: 350,
    },
  ],
}

export const StoreContext = createContext<any>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(mockData)

  const addEntity = (key: keyof StoreState, item: any) => {
    setState((s) => ({ ...s, [key]: [...s[key], { ...item, id: Date.now().toString() }] }))
  }

  const removeEntity = (key: keyof StoreState, id: string) => {
    setState((s) => ({ ...s, [key]: s[key].filter((i: any) => i.id !== id) }))
  }

  const updateShift = (id: string, updates: any) => {
    setState((s) => ({
      ...s,
      shifts: s.shifts.map((sh: any) => (sh.id === id ? { ...sh, ...updates } : sh)),
    }))
  }

  return React.createElement(
    StoreContext.Provider,
    {
      value: { ...state, addEntity, removeEntity, updateShift },
    },
    children,
  )
}

export default function useMainStore() {
  return useContext(StoreContext)
}
