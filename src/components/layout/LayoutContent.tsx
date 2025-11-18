'use client'

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { CurrentBgProvider } from '@/context/CurrentBgContext'
import { usePathname } from 'next/navigation'

interface LayoutContentProps {
  children: React.ReactNode
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const [currentBg, setCurrentBg] = React.useState(1)
  const pathname = usePathname()
  const hideChrome = pathname?.startsWith('/soldier') || pathname?.startsWith('/powerhouse')

  return (
    <CurrentBgProvider value={{ currentBg, setCurrentBg }}>
      <div className="min-h-screen flex flex-col">
        {!hideChrome && (
          <Header 
            currentBg={currentBg} 
            onBgToggle={setCurrentBg}
            isStarsEnabled={false}
            onStarsToggle={() => {}}
          />
        )}
        <div className="flex-grow">
          {children}
        </div>
        {!hideChrome && <Footer />}
      </div>
    </CurrentBgProvider>
  )
} 