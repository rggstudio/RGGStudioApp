'use client'

import { useState, FormEvent } from 'react'

type CreateGameModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const CreateGameModal = ({ isOpen, onClose, onSuccess }: CreateGameModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    weekNumber: '',
    homeTeam: '',
    awayTeam: '',
    kickoffAt: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/soldier/admin/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          week_number: parseInt(formData.weekNumber),
          home_team: formData.homeTeam,
          away_team: formData.awayTeam,
          kickoff_at: formData.kickoffAt || null,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setMessage({ type: 'error', text: payload?.error ?? 'Unable to create game' })
        return
      }

      setMessage({ type: 'success', text: 'Game created successfully' })
      
      // Reset form
      setFormData({
        title: '',
        weekNumber: '',
        homeTeam: '',
        awayTeam: '',
        kickoffAt: '',
      })
      
      // Close modal after a short delay
      setTimeout(() => {
        onSuccess()
      }, 1000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unexpected error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: '',
        weekNumber: '',
        homeTeam: '',
        awayTeam: '',
        kickoffAt: '',
      })
      setMessage(null)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
        
        <div className="relative w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Create Game of the Week</h2>
            <p className="mt-1 text-sm text-slate-400">
              Set up a new game for players to pick from
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                Game Title
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Commanders vs Titans"
              />
            </div>

            <div>
              <label htmlFor="weekNumber" className="block text-sm font-medium text-slate-300 mb-1">
                Week Number
              </label>
              <input
                id="weekNumber"
                type="number"
                required
                min="1"
                max="18"
                value={formData.weekNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, weekNumber: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="1"
              />
            </div>

            <div>
              <label htmlFor="homeTeam" className="block text-sm font-medium text-slate-300 mb-1">
                Home Team
              </label>
              <input
                id="homeTeam"
                type="text"
                required
                value={formData.homeTeam}
                onChange={(e) => setFormData(prev => ({ ...prev, homeTeam: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Washington Commanders"
              />
            </div>

            <div>
              <label htmlFor="awayTeam" className="block text-sm font-medium text-slate-300 mb-1">
                Away Team
              </label>
              <input
                id="awayTeam"
                type="text"
                required
                value={formData.awayTeam}
                onChange={(e) => setFormData(prev => ({ ...prev, awayTeam: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Tennessee Titans"
              />
            </div>

            <div>
              <label htmlFor="kickoffAt" className="block text-sm font-medium text-slate-300 mb-1">
                Kickoff Date & Time (Optional)
              </label>
              <input
                id="kickoffAt"
                type="datetime-local"
                value={formData.kickoffAt}
                onChange={(e) => setFormData(prev => ({ ...prev, kickoffAt: e.target.value }))}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {message && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  message.type === 'success'
                    ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                    : 'border-rose-400 bg-rose-500/10 text-rose-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 rounded-lg border border-slate-600 px-4 py-2 text-slate-300 transition hover:border-slate-500 hover:text-slate-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Game'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateGameModal
