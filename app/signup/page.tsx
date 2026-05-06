'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, background: '#111', borderRadius: 12, color: '#fff' }}>
      <h1 style={{ marginBottom: 24, color: '#34d399' }}>Join DevNest</h1>
      {success ? (
        <p style={{ color: '#34d399' }}>✅ Check your email to confirm your account!</p>
      ) : (
        <>
          {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #333', background: '#1a1a1a', color: '#fff' }} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #333', background: '#1a1a1a', color: '#fff' }} />
          <button onClick={handleSignup} disabled={loading}
            style={{ width: '100%', padding: 12, background: '#34d399', color: '#000', borderRadius: 8, fontWeight: 'bold', border: 'none' }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
          <p style={{ marginTop: 16, textAlign: 'center' }}>
            Have an account? <a href="/login" style={{ color: '#34d399' }}>Login</a>
          </p>
        </>
      )}
    </div>
  )
}
