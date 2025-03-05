import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import LayoutContent from '@/components/layout/LayoutContent'

export const metadata: Metadata = {
  title: 'RGG Studio',
  description: 'Freelance Front-End Developer | Let\'s build something dope together!',
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