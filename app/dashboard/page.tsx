'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      else setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return <p style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>Loading...</p>

  return (
    <div style={{ maxWidth: 600, margin: '100px auto', padding: 24, background: '#111', borderRadius: 12, color: '#fff' }}>
      <h1 style={{ color: '#34d399', marginBottom: 8 }}>Welcome to DevNest 🔥</h1>
      <p style={{ color: '#aaa', marginBottom: 24 }}>You are logged in as:</p>
      <p style={{ background: '#1a1a1a', padding: 12, borderRadius: 8, marginBottom: 24 }}>{user.email}</p>
      <button onClick={handleLogout}
        style={{ padding: '12px 24px', background: '#ef4444', color: '#fff', borderRadius: 8, fontWeight: 'bold', border: 'none' }}>
        Logout
      </button>
    </div>
  )
}
