'use client'

import React from 'react'
import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import Projects from '@/components/features/Projects'
import Contact from '@/components/features/Contact'
import { useCurrentBg } from '@/context/CurrentBgContext'

export default function Home() {
  const [mounted, setMounted] = React.useState(false)
  const { currentBg } = useCurrentBg()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main>
      <Hero currentBg={currentBg} />
      <About />
      <Projects />
      <Contact />
    </main>
  )
} 