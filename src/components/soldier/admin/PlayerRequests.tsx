'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DenialReason from '@/components/shared/DenialReason'

type PlayerRequest = {
  id: string
  team_name: string
  player_name: string
  attribute: string
  points: number
  status: 'pending' | 'approved' | 'denied'
  denial_reason: string | null
  created_at: string
}

export default function PlayerRequests() {
  const router = useRouter()
  const [requests, setRequests] = useState<PlayerRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [denyModal, setDenyModal] = useState<{ id: string; open: boolean }>({ id: '', open: false })
  const [denialReason, setDenialReason] = useState('')

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const url =
        statusFilter === 'all'
          ? '/api/soldier/admin/player-requests'
          : `/api/soldier/admin/player-requests?status=${statusFilter}`
      const response = await fetch(url)
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
  }, [statusFilter])

  const handleApprove = async (requestId: string) => {
    setProcessingId(requestId)
    try {
      const response = await fetch(`/api/soldier/admin/player-requests/${requestId}/approve`, {
        method: 'POST',
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        alert(payload?.error || 'Failed to approve request')
        setProcessingId(null)
        return
      }

      await fetchRequests()
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unexpected error')
      setProcessingId(null)
    }
  }

  const handleDeny = async () => {
    if (!denialReason.trim()) {
      alert('Please provide a denial reason')
      return
    }

    setProcessingId(denyModal.id)
    try {
      const response = await fetch(`/api/soldier/admin/player-requests/${denyModal.id}/deny`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ denialReason }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        alert(payload?.error || 'Failed to deny request')
        setProcessingId(null)
        return
      }

      setDenyModal({ id: '', open: false })
      setDenialReason('')
      await fetchRequests()
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unexpected error')
      setProcessingId(null)
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">Player Upgrade Requests</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`rounded px-3 py-1 text-xs font-semibold transition ${
              statusFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`rounded px-3 py-1 text-xs font-semibold transition ${
              statusFilter === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`rounded px-3 py-1 text-xs font-semibold transition ${
              statusFilter === 'approved'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setStatusFilter('denied')}
            className={`rounded px-3 py-1 text-xs font-semibold transition ${
              statusFilter === 'denied'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Denied
          </button>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center text-sm text-slate-400">
          No player upgrade requests found.
        </div>
      ) : (
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700 text-sm">
              <thead className="bg-slate-800/80 uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left">Team</th>
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
                    <td className="px-4 py-3 font-medium">{request.team_name}</td>
                    <td className="px-4 py-3">{request.player_name}</td>
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            disabled={processingId === request.id}
                            className="rounded px-2 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-400/10 disabled:opacity-50"
                            title="Approve"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => setDenyModal({ id: request.id, open: true })}
                            disabled={processingId === request.id}
                            className="rounded px-2 py-1 text-xs font-semibold text-rose-400 hover:bg-rose-400/10 disabled:opacity-50"
                            title="Deny"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      <DenialReason
                        status={request.status}
                        denialReason={request.denial_reason}
                        className="max-w-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {denyModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Deny Request</h3>
              <button
                onClick={() => {
                  setDenyModal({ id: '', open: false })
                  setDenialReason('')
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="denialReason" className="block text-sm font-medium text-slate-300 mb-1">
                  Denial Reason
                </label>
                <textarea
                  id="denialReason"
                  value={denialReason}
                  onChange={(e) => setDenialReason(e.target.value)}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none"
                  placeholder="Enter reason for denial"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDenyModal({ id: '', open: false })
                    setDenialReason('')
                  }}
                  disabled={processingId === denyModal.id}
                  className="flex-1 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeny}
                  disabled={processingId === denyModal.id || !denialReason.trim()}
                  className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingId === denyModal.id ? 'Denying...' : 'Deny Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

