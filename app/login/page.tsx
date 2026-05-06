'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  const handleGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, background: '#111', borderRadius: 12, color: '#fff' }}>
      <h1 style={{ marginBottom: 24, color: '#34d399' }}>Login to DevNest</h1>
      {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #333', background: '#1a1a1a', color: '#fff' }} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #333', background: '#1a1a1a', color: '#fff' }} />
      <button onClick={handleLogin} disabled={loading}
        style={{ width: '100%', padding: 12, background: '#34d399', color: '#000', borderRadius: 8, fontWeight: 'bold', marginBottom: 12, border: 'none' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button onClick={handleGoogle}
        style={{ width: '100%', padding: 12, background: '#fff', color: '#000', borderRadius: 8, fontWeight: 'bold', marginBottom: 12, border: 'none' }}>
        Continue with Google
      </button>
      <button onClick={handleGithub}
        style={{ width: '100%', padding: 12, background: '#333', color: '#fff', borderRadius: 8, fontWeight: 'bold', border: 'none' }}>
        Continue with GitHub
      </button>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        No account? <a href="/signup" style={{ color: '#34d399' }}>Sign up</a>
      </p>
    </div>
  )
}
