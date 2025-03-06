'use client'

import React, { createContext, useContext, ReactNode } from 'react'

interface CurrentBgContextType {
  currentBg: number
  setCurrentBg: (bg: number) => void
}

const CurrentBgContext = createContext<CurrentBgContextType | undefined>(undefined)

export function useCurrentBg() {
  const context = useContext(CurrentBgContext)
  if (context === undefined) {
    throw new Error('useCurrentBg must be used within a CurrentBgProvider')
  }
  return context
}

interface CurrentBgProviderProps {
  children: ReactNode
  value: CurrentBgContextType
}

export function CurrentBgProvider({ children, value }: CurrentBgProviderProps) {
  return (
    <CurrentBgContext.Provider value={value}>
      {children}
    </CurrentBgContext.Provider>
  )
} 