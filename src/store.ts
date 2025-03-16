import { supabase } from '@/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BearState {
  supabase: SupabaseClient;
}

export const useBearStore = create<BearState>()(
  devtools(() => ({
    supabase: supabase,
  }))
);
