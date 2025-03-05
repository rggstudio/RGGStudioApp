'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HomePage from '@/app/page'

interface LayoutContentProps {
  children: React.ReactNode
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const [isStarsEnabled, setIsStarsEnabled] = React.useState(true)
  const [currentBg, setCurrentBg] = React.useState(1)

  return (
    <div className="bg-background text-text min-h-screen">
      <Header 
        isStarsEnabled={isStarsEnabled} 
        onStarsToggle={setIsStarsEnabled}
        currentBg={currentBg}
        onBgToggle={setCurrentBg}
      />
      <main className="pt-16">
        {isStarsEnabled && (
          <>
            <div className="stars fixed inset-0" />
            <div className="twinkling fixed inset-0" />
          </>
        )}
        <div className="relative z-10">
          <HomePage currentBg={currentBg} />
        </div>
      </main>
      <Footer />
    </div>
  )
} 