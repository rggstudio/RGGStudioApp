'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/raymondgoode/', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Contact' },
  ]

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-secondary/80 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="text-text hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          <div className="flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-text hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-text/60">
          <p>&copy; {new Date().getFullYear()} RGG Studio LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 