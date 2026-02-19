'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/bible-studylink#features', label: 'Features' },
    { href: '/bible-studylink#pricing', label: 'Pricing' },
    { href: '/bible-studylink/privacy', label: 'Privacy' },
    { href: '/bible-studylink/terms', label: 'Terms' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#1E3A5F]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/bible-studylink" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1E3A5F] rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-xl font-bold text-[#1E3A5F] hidden sm:block">
              Bible StudyLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2D2D2D] hover:text-[#1E3A5F] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/bible-studylink#pricing"
              className="bg-[#1E3A5F] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#152a45] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#1E3A5F]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#1E3A5F]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1E3A5F]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1E3A5F]/10">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#2D2D2D] hover:text-[#1E3A5F] font-medium py-2 px-4 rounded-lg hover:bg-[#1E3A5F]/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/bible-studylink#pricing"
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#1E3A5F] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#152a45] transition-colors text-center mt-2"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
