import { supabase } from '@/lib/supabase/client'

export const getEmployees = async () =>
  await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: true })
    .throwOnError()
export const createEmployee = async (data: any) =>
  await supabase.from('employees').insert(data).select().single().throwOnError()
export const deleteEmployee = async (id: string) =>
  await supabase