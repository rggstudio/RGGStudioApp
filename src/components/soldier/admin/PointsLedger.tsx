'use client'

import { useState, useMemo } from 'react'

type LedgerEntry = {
  id: string
  points: number
  source: string
  note: string | null
  created_at: string
  team_name: string
  admin_email: string
}

type Props = {
  entries: LedgerEntry[]
}

const PointsLedger = ({ entries }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatPoints = (points: number) => {
    return points > 0 ? `+${points}` : points.toString()
  }

  const getPointsColor = (points: number) => {
    return points > 0 ? 'text-emerald-400' : 'text-rose-400'
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'auto_win':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'manual':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'penalty':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  // Filter entries based on search term
  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) return entries
    
    const term = searchTerm.toLowerCase()
    return entries.filter(entry => 
      entry.team_name.toLowerCase().includes(term) ||
      entry.admin_email.toLowerCase().includes(term) ||
      (entry.note && entry.note.toLowerCase().includes(term))
    )
  }, [entries, searchTerm])

  // Calculate pagination
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedEntries = filteredEntries.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  if (entries.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Points Ledger History</h3>
          <p className="mt-1 text-sm text-slate-400">Complete audit trail of all points adjustments</p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-200">No Points History</h4>
          <p className="mt-1 text-sm text-slate-400">Points adjustments will appear here once made.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Points Ledger History</h3>
        <p className="mt-1 text-sm text-slate-400">Complete audit trail of all points adjustments</p>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by team name, email, or note..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {searchTerm && (
          <button
            onClick={() => handleSearchChange('')}
            className="px-3 py-2 text-sm text-slate-400 hover:text-slate-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, filteredEntries.length)} of {filteredEntries.length} entries
          {searchTerm && ` (filtered from ${entries.length} total)`}
        </span>
        {totalPages > 1 && (
          <span>Page {currentPage} of {totalPages}</span>
        )}
      </div>

      {/* Ledger Table */}
      <div className="rounded-lg border border-slate-700 bg-slate-800/50">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800/80">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Team</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Points</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Note</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Commissioner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {paginatedEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-sm font-medium text-slate-200">
                    {entry.team_name}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`font-mono font-semibold ${getPointsColor(entry.points)}`}>
                      {formatPoints(entry.points)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getSourceColor(entry.source)}`}>
                      {entry.source.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300 max-w-xs truncate">
                    {entry.note || '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {formatDate(entry.created_at)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {entry.admin_email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 text-sm transition-colors ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PointsLedger