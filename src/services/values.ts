import { supabase } from '@/lib/supabase/client'

export const getValues = () =>
  supabase.from('values').select('*').order('created_at', { ascending: true }).throwOnError()
export const createValue = (data: any) =>
  supabase.from('values').insert(data).select().single().throwOnError()
export const deleteValue = (id: string) =>
  supabase.from('values').delete().eq('id', id).throwOnError()
