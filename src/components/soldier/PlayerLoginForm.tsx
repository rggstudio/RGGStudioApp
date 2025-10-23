'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const PlayerLoginForm = () => {
  const router = useRouter()
  const [teamName, setTeamName] = useState('')
  const [teams, setTeams] = useState<{ id: string; name: string; short_code: string | null }[]>([])
  const [teamsError, setTeamsError] = useState<string | null>(null)
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/soldier/auth/teams', { cache: 'no-store' })
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}))
          if (mounted) setTeamsError(payload?.error ?? 'Failed to load teams')
          return
        }
        const payload = await res.json()
        if (mounted) setTeams(payload.teams ?? [])
      } catch (e) {
        if (mounted) setTeamsError('Failed to load teams')
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])
  const [pin, setPin] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/soldier/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, pin }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setError(payload?.error ?? 'Login failed')
        setIsSubmitting(false)
        return
      }

      setTeamName('')
      setPin('')
      router.push('/soldier/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="teamName">
          Team Name
        </label>
        <select
          id="teamName"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
          required
        >
          <option value="" disabled>
            {teams.length ? 'Select your team' : 'Loading teams...'}
          </option>
          {teams.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
              {t.short_code ? ` (${t.short_code})` : ''}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="teamPin">
          Team PIN
        </label>
        <input
          id="teamPin"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          maxLength={4}
          inputMode="numeric"
          autoComplete="one-time-code"
          required
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Authenticating...' : 'Access Dashboard'}
      </button>
    </form>
  )
}

export default PlayerLoginForm
