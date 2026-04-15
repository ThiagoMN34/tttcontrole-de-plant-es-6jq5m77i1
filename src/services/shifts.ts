import { supabase } from '@/lib/supabase/client'

export const getShifts = () =>
  supabase.from('shifts').select('*').order('created_at', { ascending: false }).throwOnError()

export const createShift = (data: any) => {
  const payload = {
    employee_id: data.employeeId,
    guest_id: data.guestId,
    reason_id: data.reasonId,
    start_time: data.startTime,
    end_time: data.endTime,
    status: data.status || 'pending',
    value: data.value,
  }
  return supabase.from('shifts').insert(payload).select().single().throwOnError()
}

export const deleteShift = (id: string) =>
  supabase.from('shifts').delete().eq('id', id).throwOnError()

export const updateShift = (id: string, updates: any) => {
  const payload: any = {}
  if (updates.status !== undefined) payload.status = updates.status
  if (updates.value !== undefined) payload.value = updates.value
  return supabase.from('shifts').update(payload).eq('id', id).select().single().throwOnError()
}
