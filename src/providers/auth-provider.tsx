import { useStore } from '@/store'
import { useEffect } from 'react'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialize, setUser, supabase } = useStore()

  useEffect(() => {
    initialize()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [initialize, setUser, supabase])

  return <>{children}</>
}
