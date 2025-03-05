'use client'

import React from 'react'
import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import Projects from '@/components/features/Projects'
import Contact from '@/components/features/Contact'

interface HomeProps {
  currentBg?: number;
}

export default function Home({ currentBg = 1 }: HomeProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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