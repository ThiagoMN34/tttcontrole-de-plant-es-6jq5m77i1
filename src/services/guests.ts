import { supabase } from '@/lib/supabase/client'

export const getGuests = () =>
  supabase.from('guests').select('*').order('created_at', { ascending: true }).throwOnError()
export const createGuest = (data: any) =>
  supabase.from('guests').insert(data).select().single().throwOnError()
export const deleteGuest = (id: string) =>
  supabase.from('guests').delete().eq('id', id).throwOnError()
