'use client'

import { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CapXpImageModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-4xl rounded-lg bg-slate-900 p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="mt-2">
          <img
            src="/images/cap-xp-position-points.png"
            alt="CAP XP Position Points Rules"
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `
                  <div class="p-8 text-center text-slate-400">
                    <p class="mb-2">Image not found. Please add the CAP XP Position Points image to /public/images/cap-xp-position-points.png</p>
                    <p class="text-sm">The image should show the CAP XP Position Points rules for offense and defense positions.</p>
                  </div>
                `
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
