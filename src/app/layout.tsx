import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import LayoutContent from '@/components/layout/LayoutContent'

export const metadata: Metadata = {
  title: 'Freelance Web Developer & AI Integration Expert in Southern Maryland | RGG Studio LLC',
  description: 'Elevate your business with RGG Studio LLC—specializing in custom web development and AI solutions for small businesses in Southern Maryland. Let\'s innovate together!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
} 