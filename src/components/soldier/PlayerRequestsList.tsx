'use client'

import { useEffect, useState } from 'react'

type PlayerRequest = {
  id: string
  player_name: string
  attribute: string
  points: number
  status: 'pending' | 'approved' | 'denied'
  denial_reason: string | null
  created_at: string
}

export default function PlayerRequestsList() {
  const [requests, setRequests] = useState<PlayerRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/soldier/player/requests')
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests || [])
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleDelete = async (requestId: string) => {
    if (!confirm('Are you sure you want to delete this request?')) {
      return
    }

    setDeletingId(requestId)

    try {
      const response = await fetch(`/api/soldier/player/requests/${requestId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        alert(payload?.error || 'Failed to delete request')
        setDeletingId(null)
        return
      }

      await fetchRequests()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unexpected error')
      setDeletingId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex rounded-full bg-yellow-400/20 px-2 py-1 text-xs font-semibold text-yellow-300">
            Pending
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-semibold text-emerald-300">
            Approved
          </span>
        )
      case 'denied':
        return (
          <span className="inline-flex rounded-full bg-rose-400/20 px-2 py-1 text-xs font-semibold text-rose-300">
            Denied
          </span>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center text-sm text-slate-400">
        Loading requests...
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center text-sm text-slate-400">
        No player upgrade requests yet.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700 text-sm">
          <thead className="bg-slate-800/80 uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Player</th>
              <th className="px-4 py-3 text-left">Attribute</th>
              <th className="px-4 py-3 text-left">Points</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {requests.map((request) => (
              <tr key={request.id} className="text-slate-200">
                <td className="px-4 py-3 font-medium">{request.player_name}</td>
                <td className="px-4 py-3 text-slate-300">{request.attribute}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-indigo-400">+{request.points}</span>
                </td>
                <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                <td className="px-4 py-3 text-slate-400">
                  {new Date(request.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleDelete(request.id)}
                      disabled={deletingId === request.id}
                      className="rounded px-2 py-1 text-xs font-semibold text-rose-400 hover:bg-rose-400/10 disabled:opacity-50"
                    >
                      {deletingId === request.id ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                  {request.status === 'denied' && request.denial_reason && (
                    <div className="text-xs text-slate-400">
                      <p className="font-semibold text-rose-400 mb-1">Denied:</p>
                      <p>{request.denial_reason}</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

