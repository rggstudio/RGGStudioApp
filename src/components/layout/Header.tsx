'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Download } from 'lucide-react'

interface HeaderProps {
  isStarsEnabled: boolean;
  onStarsToggle: (enabled: boolean) => void;
  currentBg: number;
  onBgToggle: (bg: number) => void;
}

const Header = ({ currentBg, onBgToggle, isStarsEnabled, onStarsToggle }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  const navItems = [
    { label: 'Home', href: '#home' },
    {
      label: 'Projects',
      href: '#work',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Work Projects', href: '#work' },
        { label: 'Personal Projects', href: '#personal' },
      ],
    },
    {
      label: 'About',
      href: '#about',
      hasDropdown: true,
      dropdownItems: [
        { label: 'About Me', href: '#about' },
        { label: 'Who I Worked With', href: '#worked-with' },
      ],
    },
    { label: 'Contact', href: '#contact' },
  ]

  const handleBgToggle = () => {
    onBgToggle(currentBg === 1 ? 2 : 1)
  }

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
      setActiveDropdown(null)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f36]/40 backdrop-blur-sm border-b border-gray-800/50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-2xl font-bold text-primary [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]"
          >
            &lt;RGG /&gt;
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.label)}
                    className={`
                      text-[1.125rem] text-text hover:text-white font-medium tracking-wide
                      flex items-center
                    `}
                  >
                    {item.label}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`
                      text-[1.125rem] text-text hover:text-white font-medium tracking-wide
                      relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary
                      after:transition-all after:duration-300
                      ${item.href === '#home' 
                        ? 'after:w-full text-white' 
                        : 'after:w-0 hover:after:w-full'
                      }
                      flex items-center
                    `}
                  >
                    {item.label}
                  </a>
                )}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-[#1a1f36]/95 backdrop-blur-sm rounded-md shadow-lg border border-gray-800/50">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        onClick={(e) => handleNavClick(e, dropdownItem.href)}
                        className="block px-4 py-2 text-text hover:text-white hover:bg-[#1a1f36]"
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Background Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-text text-sm font-medium">BG</span>
              <button
                onClick={handleBgToggle}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  currentBg === 2 ? 'bg-primary' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    currentBg === 2 ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Resume Button */}
            <a
              href="/RGG-RESUME2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-[#1a1f36] px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-all duration-300 text-sm font-medium"
            >
              <span>Resume</span>
              <Download size={16} className="ml-2" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="flex items-center justify-between w-full text-text hover:text-white font-medium text-sm tracking-wide"
                      >
                        {item.label}
                        <ChevronDown size={16} className="ml-1" />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <a
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={(e) => handleNavClick(e, dropdownItem.href)}
                              className="block text-text hover:text-white text-sm"
                            >
                              {dropdownItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`
                        text-text hover:text-white font-medium text-sm tracking-wide
                        relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary
                        after:transition-all after:duration-300
                        ${item.href === '#home' 
                          ? 'after:w-full text-white' 
                          : 'after:w-0 hover:after:w-full'
                        }
                        flex items-center
                      `}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <span className="text-text text-sm font-medium">BG</span>
                <button
                  onClick={handleBgToggle}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    currentBg === 2 ? 'bg-primary' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      currentBg === 2 ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <a
                href="/RGG-RESUME2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-[#1a1f36] px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-all duration-300 text-sm font-medium"
              >
                <span>Resume</span>
                <Download size={16} className="ml-2" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header 