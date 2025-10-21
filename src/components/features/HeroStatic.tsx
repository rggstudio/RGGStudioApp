import React from 'react'

interface HeroStaticProps {
  currentBg: number;
}

const HeroStatic = ({ currentBg }: HeroStaticProps) => {
  return (
    <div className="text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold text-primary mb-6 leading-relaxed transition-all duration-300 ease-out animate-slide-up drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
        Hi, I&apos;m Ray | Front-End Developer
      </h1>
      <p className={`text-2xl md:text-3xl ${currentBg === 2 ? 'text-background/90' : 'text-text/80'} mb-4 max-w-2xl mx-auto transition-all duration-300 ease-out animate-slide-up delay-200`}>
        Helping brands, businesses, churches & creators turn clicks into clients
      </p>
      <p className="text-xl font-bold text-primary mb-12 max-w-2xl mx-auto transition-all duration-300 ease-out animate-slide-up delay-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
        Let&apos;s create something dope together
      </p>
    </div>
  )
}

export default HeroStatic 