import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Bible StudyLink — AI-Powered Bible Study Recording & Transcription',
  description: 'Never miss a moment of God\'s Word. Bible StudyLink records your Bible study sessions with AI transcription, automatic scripture detection, and smart note-taking. Perfect for small groups, pastors, and individual study.',
  keywords: ['bible study app', 'bible study recording', 'bible transcription', 'scripture study app', 'small group bible study', 'youth pastor tools', 'bible note taking', 'AI bible study', 'church small groups', 'bible study notes'],
  authors: [{ name: 'Bible StudyLink' }],
  openGraph: {
    type: 'website',
    title: 'Bible StudyLink — Never Miss a Moment of God\'s Word',
    description: 'Record, transcribe, and organize your Bible study sessions with AI. Scripture auto-detection, verse-linked notes, and session summaries.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bible StudyLink — AI-Powered Bible Study',
    description: 'Record your Bible study sessions with automatic scripture detection and smart transcription.',
    images: ['/og-image.jpg'],
  },
}

export default function BibleStudyLinkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {children}
    </div>
  )
}
