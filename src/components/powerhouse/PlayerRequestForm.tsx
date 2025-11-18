'use client'

import { useState } from 'react'
import { ATTRIBUTES } from '@/lib/powerhouse/validators'

type Props = {
  onSuccess: () => void
  onCancel: () => void
}

export default function PlayerRequestForm({ onSuccess, onCancel }: Props) {
  const [playerName, setPlayerName] = useState('')
  const [attribute, setAttribute] = useState('')
  const [points, setPoints] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/powerhouse/player/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          attribute,
          points: parseInt(points, 10),
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setError(payload?.error || 'Failed to submit request')
        setIsSubmitting(false)
        return
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="playerName" className="block text-sm font-medium text-slate-300 mb-1">
          Player Name
        </label>
        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none"
          placeholder="Enter player name"
        />
      </div>

      <div>
        <label htmlFor="attribute" className="block text-sm font-medium text-slate-300 mb-1">
          Attribute
        </label>
        <select
          id="attribute"
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-indigo-400 focus:outline-none"
        >
          <option value="">Select an attribute</option>
          {ATTRIBUTES.map((attr) => (
            <option key={attr} value={attr}>
              {attr}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="points" className="block text-sm font-medium text-slate-300 mb-1">
          Points
        </label>
        <input
          id="points"
          type="number"
          min="1"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none"
          placeholder="Enter points"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-rose-400 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !playerName || !attribute || !points}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  )
}

