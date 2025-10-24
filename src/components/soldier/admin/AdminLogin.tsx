'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import SoldierFooter from '@/components/soldier/SoldierFooter'

const AdminLogin = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const res = await fetch('/api/soldier/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pin }),
      })

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        setError(payload?.error ?? 'Login failed')
        setIsSubmitting(false)
        return
      }

      setMessage('Signed in')
      setEmail('')
      setPin('')
      setIsSubmitting(false)
      router.push('/soldier/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow">
        <h2 className="text-xl font-semibold text-white">Commissioner Sign In</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter your email to receive a magic link through Supabase Auth.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="adminEmail">
              Email
            </label>
            <input
              id="adminEmail"
              type="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="adminPin">
              4-digit PIN
            </label>
            <input
              id="adminPin"
              inputMode="numeric"
              maxLength={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="1234"
              required
            />
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
          <button
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
      <SoldierFooter />
    </div>
  )
}

export default AdminLogin
