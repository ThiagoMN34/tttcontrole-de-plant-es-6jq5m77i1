import { supabase } from '@/lib/supabase/client'

export const getEmployees = () =>
  supabase.from('employees').select('*').order('created_at', { ascending: true }).throwOnError()
export const createEmployee = (data: any) =>
  supabase.from('employees').insert(data).select().single().throwOnError()
export const deleteEmployee = (id: string) =>
  supabase.from('employees').delete().eq('id', id).throwOnError()
