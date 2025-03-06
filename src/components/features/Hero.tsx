'use client'

import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import BouncingCircle from '@/components/shared/BouncingCircle'

interface HeroProps {
  currentBg: number;
}

const Hero = ({ currentBg }: HeroProps) => {
  const [scrollOpacity, setScrollOpacity] = useState(0.3)
  const [prevBg, setPrevBg] = useState(currentBg)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const newOpacity = Math.min(0.8, 0.3 + (scrollPosition / 500) * 0.5)
      setScrollOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (currentBg !== prevBg) {
      setIsTransitioning(true)
      setPrevBg(currentBg)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [currentBg, prevBg])

  // Preload both images
  useEffect(() => {
    const preloadImages = () => {
      [1, 2].forEach((bgNum) => {
        const img = document.createElement('img');
        img.src = `/images/hero-bg-${bgNum}.png`;
      });
    };
    preloadImages();
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Contact' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black" style={{ paddingTop: 'calc(50vh -400px)' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Current background */}
        <Image
          src={`/images/hero-bg-${currentBg}.png`}
          alt={`Hero background ${currentBg}`}
          fill
          priority
          className={`object-cover object-center transition-all duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          quality={100}
          onError={() => setImageError(true)}
        />
        
        {/* Previous background (for smooth transition) */}
        {isTransitioning && (
          <Image
            src={`/images/hero-bg-${prevBg}.png`}
            alt={`Hero background ${prevBg}`}
            fill
            priority
            className="object-cover object-center opacity-100"
            quality={100}
          />
        )}
        
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/30 transition-opacity duration-300"
          style={{ opacity: scrollOpacity }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold text-primary mb-6 leading-relaxed transition-all duration-300 ease-out animate-slide-up drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
            Hi, I&apos;m Ray | Front-End Developer
          </h1>
          <p className={`text-2xl md:text-3xl ${currentBg === 2 ? 'text-background/90' : 'text-text/80'} mb-4 max-w-2xl mx-auto transition-all duration-300 ease-out animate-slide-up delay-200`}>
            Turning ideas into high-quality and impactful web solutions
          </p>
          <p className="text-xl font-bold text-primary mb-12 max-w-2xl mx-auto transition-all duration-300 ease-out animate-slide-up delay-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            Let&apos;s create something dope together
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fade-in delay-500">
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-all duration-300 hover:scale-110 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                aria-label={label}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bouncing Circle */}
      <BouncingCircle />
    </section>
  )
}

export default Hero

// Add this to globals.css
/*
@keyframes twinkle {
  from { background-position: 0 0; }
  to { background-position: -10000px 5000px; }
}

.stars {
  background: #000 url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.twinkling {
  background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png) repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  animation: twinkle 200s linear infinite;
}
*/ 