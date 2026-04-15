import { supabase } from '@/lib/supabase/client'

export const getReasons = () =>
  supabase.from('reasons').select('*').order('created_at', { ascending: true }).throwOnError()
export const createReason = (data: any) =>
  supabase.from('reasons').insert(data).select().single().throwOnError()
export const deleteReason = (id: string) =>
  supabase.from('reasons').delete().eq('id', id).throwOnError()
