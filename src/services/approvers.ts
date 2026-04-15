import { supabase } from '@/lib/supabase/client'

export const getApprovers = () =>
  supabase.from('approvers').select('*').order('created_at', { ascending: true }).throwOnError()
export const createApprover = (data: any) =>
  supabase.from('approvers').insert(data).select().single().throwOnError()
export const deleteApprover = (id: string) =>
  supabase.from('approvers').delete().eq('id', id).throwOnError()
