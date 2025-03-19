import { supabase } from '@/supabase';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreState {
  supabase: SupabaseClient;
  user: User | null;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Fix: Properly type the store with middleware
export const useStore = create<StoreState>()(
  devtools(
    set => ({
      user: null,
      supabase,
      setUser: user => set({ user }),
      initialize: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          set({ user });
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ user: null });
        }
      },
      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({ user: null });
        } catch (error) {
          console.error('Error signing out:', error);
        }
      },
    }),
    { name: 'cs-museum-store' }
  )
);
