'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const BouncingCircle = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [aboutSectionTop, setAboutSectionTop] = useState(0)
  const [contactSectionTop, setContactSectionTop] = useState(0)

  useEffect(() => {
    // Get initial position of About and Contact sections
    const aboutSection = document.getElementById('about')
    const contactSection = document.getElementById('contact')
    
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect()
      setAboutSectionTop(rect.top + window.scrollY)
    }
    
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect()
      setContactSectionTop(rect.top + window.scrollY)
    }

    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    // Set initial scroll position
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Only show if we're above the About section and not at the Contact section
  const shouldShow = scrollPosition < aboutSectionTop && scrollPosition < contactSectionTop

  // Calculate opacity based on scroll position (fade out over 250px)
  const opacity = Math.max(0, 1 - scrollPosition / 250)

  if (!shouldShow || opacity === 0) return null

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary border-2 border-white/20 flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-all duration-300 hover:scale-110 animate-bounce z-50"
      aria-label="Scroll to About section"
      style={{ opacity }}
    >
      <ChevronDown className="text-white" size={24} />
    </button>
  )
}

export default BouncingCircle 