'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrentBg } from '@/context/CurrentBgContext'
import HeroStatic from './HeroStatic'

const Hero = () => {
  const { currentBg } = useCurrentBg()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(/images/hero-bg-${currentBg}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4">
        <HeroStatic currentBg={currentBg} />
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-300 ease-out animate-slide-up delay-500">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20"
          >
            Get in Touch
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary bg-transparent border-2 border-primary hover:bg-primary/10 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero 