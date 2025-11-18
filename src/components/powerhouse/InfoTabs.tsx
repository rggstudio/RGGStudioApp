'use client'

import { useState } from 'react'

export default function InfoTabs() {
  const [activeTab, setActiveTab] = useState<'info' | 'cap'>('info')

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-slate-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'info'
                ? 'border-indigo-400 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
            }`}
          >
            What is Power House Picks?
          </button>
          <button
            onClick={() => setActiveTab('cap')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'cap'
                ? 'border-indigo-400 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
            }`}
          >
            CAP XP Position Points
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="text-slate-300">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <p>
              Power House Picks is a web application for managing the <strong>Game of the Week (GOTW)</strong> pick system in the <strong>Power House League</strong>. 
              Players log in using their team name and a 4-digit PIN to make weekly picks, track their scores, and view their pick history.
            </p>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-white">How It Works</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-indigo-400">For Players (Team Owners)</h4>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Log in using your <strong>Team Name</strong> and your 4-digit <strong>PIN</strong></li>
                    <li>View weekly Game of the Week matchups and make your picks</li>
                    <li>Change your pick at any time until the game is <strong>locked by the commissioner</strong></li>
                    <li>Track your current total points and view your complete pick history</li>
                    <li>See which picks were correct (✔) or incorrect (✖) and points earned</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-indigo-400">Points System</h4>
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>+3 points</strong> for a correct Game of the Week pick (awarded automatically)</li>
                    <li>Points are tracked in a ledger that records all point transactions</li>
                    <li>Commissioners can manually adjust points if needed</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-indigo-400">Game Locking</h4>
                  <p className="ml-6">
                    Games are manually locked by the commissioner. Once a game is locked, you cannot change your pick. 
                    This ensures fairness and prevents last-minute changes after game results are known.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-indigo-400">History & Tracking</h4>
                  <p className="ml-6">
                    View all your past picks organized by week, see the correct results, and track your points earned throughout the season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cap' && (
          <div className="space-y-6">
            <div>
              <p className="mb-4">
                <strong className="text-red-400">Speed or Acceleration points are not permitted</strong>
              </p>
              
              <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <h4 className="mb-3 font-semibold text-indigo-400">Exceptions:</h4>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong>QB</strong> - (THP, SAC, MAC, and DAC)</li>
                  <li><strong>LB</strong> - (BSH, PMV, and FMV)</li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">Offense:</h3>
                <ul className="space-y-2">
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">QB</strong> CAP <strong className="text-green-400">88</strong>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">HB</strong> CAP <strong className="text-green-400">88</strong>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">WR</strong> CAP <strong className="text-green-400">88</strong>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">TE</strong> CAP <strong className="text-green-400">85</strong>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">OL</strong> CAP <strong className="text-green-400">88</strong>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">Defense:</h3>
                <ul className="space-y-2">
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">DT</strong> CAP <strong className="text-green-400">88</strong>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">DE</strong> CAP <strong className="text-green-400">88</strong>
                    <p className="mt-1 text-xs text-slate-400">
                      (True DE's only, coaches are required to send proof. If proof is not sent they will be CAP as a LB)
                    </p>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">LB</strong> CAP <strong className="text-green-400">84</strong>
                    <p className="mt-1 text-xs text-slate-400">
                      (CAP 80 - PMV or FMV, and BSH) If any ability is met between PMV or FMV, no additional points will be granted. BSH can independently be earned if below the threshold.
                    </p>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">CB</strong> CAP <strong className="text-green-400">88</strong>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">SS</strong> CAP <strong className="text-green-400">85</strong>
                  </li>
                  <li className="rounded bg-slate-800/50 p-3">
                    <strong className="text-indigo-400">FS</strong> CAP <strong className="text-green-400">85</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

