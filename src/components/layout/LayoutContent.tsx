'use client'

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { CurrentBgProvider } from '@/context/CurrentBgContext'

interface LayoutContentProps {
  children: React.ReactNode
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const [currentBg, setCurrentBg] = React.useState(1)

  return (
    <CurrentBgProvider value={{ currentBg, setCurrentBg }}>
      <div className="min-h-screen flex flex-col">
        <Header 
          currentBg={currentBg} 
          onBgToggle={setCurrentBg}
          isStarsEnabled={false}
          onStarsToggle={() => {}}
        />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </CurrentBgProvider>
  )
} 