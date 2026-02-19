import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/bible-studylink/Navbar'
import {
  Mic,
  BookOpen,
  Bookmark,
  Sparkles,
  Check,
  Star,
  Download,
  Shield,
  Apple,
  Play,
} from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bible StudyLink — AI-Powered Bible Study Recording & Transcription',
  description: 'Never miss a moment of God\'s Word. Bible StudyLink records your Bible study sessions with AI transcription, automatic scripture detection, and smart note-taking.',
}

export default function BibleStudyLinkPage() {
  return (
    <div className={`${inter.className} min-h-screen bg-[#F5F1E8]`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A5F] mb-6 leading-tight">
            Never Miss a Moment of<br />God's Word
          </h1>
          <p className="text-lg sm:text-xl text-[#2D2D2D] mb-8 max-w-3xl mx-auto leading-relaxed">
            Bible StudyLink transforms how your small group studies Scripture. Record sessions, capture every insight with AI transcription, and keep your notes eternally linked to God's Word.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#1E3A5F] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#152a45] transition-colors">
              <Apple className="w-6 h-6" />
              Download for iOS
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#1E3A5F] px-8 py-4 rounded-xl font-semibold hover:bg-[#c4a030] transition-colors">
              <Play className="w-6 h-6" />
              Download for Android
            </a>
          </div>
          
          {/* Supporting Microcopy */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#2D2D2D]">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#87A878]" />
              Automatic scripture detection
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#87A878]" />
              Works offline
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#87A878]" />
              7 Bible versions supported
            </span>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1E3A5F]/5 rounded-full blur-3xl" />
      </section>

      {/* Feature Section 1: Record & Transcribe */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-[#1E3A5F]/10 rounded-2xl flex items-center justify-center mb-6">
                <Mic className="w-8 h-8 text-[#1E3A5F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
                Your Study, Captured Perfectly
              </h2>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                Focus on the conversation—not on taking notes. Bible StudyLink records your entire Bible study session and transcribes it in real-time with remarkable accuracy.
              </p>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                Whether you're leading a living room discussion, teaching a youth group, or studying solo with a podcast, every word is preserved. The AI understands biblical language and theological terminology, so nothing gets lost in translation.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time transcription as you study',
                  'Crystal-clear audio recording optimized for group settings',
                  'Pause and resume sessions seamlessly',
                  'Offline recording mode for retreat settings',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#87A878] mt-0.5 flex-shrink-0" />
                    <span className="text-[#2D2D2D]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1E3A5F] rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center text-white">
                <Mic className="w-24 h-24 mx-auto mb-4 opacity-80" aria-hidden="true" />
                <p className="text-lg opacity-80">Recording in progress...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Scripture Detection */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-[#D4AF37]/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-24 h-24 mx-auto mb-4 text-[#1E3A5F]" aria-hidden="true" />
                <div className="bg-white rounded-xl p-4 shadow-lg max-w-xs mx-auto">
                  <p className="text-sm text-[#D4AF37] font-semibold mb-1">John 3:16 detected</p>
                  <p className="text-[#2D2D2D] text-sm italic">
                    "For God so loved the world, that he gave his only Son..."
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#1E3A5F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
                Scripture That Finds You
              </h2>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                Mention a verse during study and watch the magic happen. Our AI instantly recognizes scripture references and displays the full text in real-time—no more scrambling to find the passage while the conversation moves on.
              </p>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                ESV, NIV, KJV, NKJV, NLT, NASB, or CSB. Choose your preferred translation and see verses appear as naturally as if you had the Bible open in front of you.
              </p>
              <ul className="space-y-3">
                {[
                  'Automatic verse detection from spoken references',
                  'Instant display of full scripture text',
                  '7 trusted Bible versions available',
                  'Works even with paraphrased citations',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#87A878] mt-0.5 flex-shrink-0" />
                    <span className="text-[#2D2D2D]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3: Smart Notes & Bookmarks */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-[#87A878]/20 rounded-2xl flex items-center justify-center mb-6">
                <Bookmark className="w-8 h-8 text-[#1E3A5F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
                Notes That Stay Connected to Scripture
              </h2>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                The best insights come in the moment. Tap to bookmark any part of your transcript and add your own notes—they're automatically linked to the verse being discussed.
              </p>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                Months later, when you're preparing your next lesson or revisiting a powerful revelation, find exactly what you need. Search by keyword, scripture reference, or date. Your spiritual journey, beautifully organized.
              </p>
              <ul className="space-y-3">
                {[
                  'One-tap bookmarks linked to verses',
                  'Add personal reflections and prayer points',
                  'Search across all your study sessions',
                  'Export notes for sermon prep or sharing',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#87A878] mt-0.5 flex-shrink-0" />
                    <span className="text-[#2D2D2D]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl aspect-square flex items-center justify-center border border-[#1E3A5F]/10">
              <div className="w-full max-w-sm">
                <div className="bg-[#F5F1E8] rounded-xl p-4 mb-3">
                  <p className="text-sm text-[#2D2D2D]">
                    <span className="text-[#D4AF37] font-semibold">Romans 8:28</span>
                    <br />
                    "And we know that in all things God works for the good..."
                  </p>
                </div>
                <div className="bg-[#1E3A5F] rounded-xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-semibold text-[#D4AF37]">YOUR NOTE</span>
                  </div>
                  <p className="text-sm">
                    This verse reminds me that even in difficult seasons, God is working behind the scenes for our good and His glory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 4: AI Session Summaries */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-[#1E3A5F] to-[#2a4a73] rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-white text-center">
                <Sparkles className="w-24 h-24 mx-auto mb-4 text-[#D4AF37]" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
                <div className="text-left space-y-2 text-sm opacity-90">
                  <p>• Key theme: God's faithfulness in trials</p>
                  <p>• Main scripture: James 1:2-4</p>
                  <p>• Discussion focused on perseverance</p>
                  <p>• Action items for next week</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-[#1E3A5F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
                Review What Matters Most
              </h2>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                Every study session generates an AI-powered summary highlighting the key themes, main scripture passages, and important discussion points. Get the essence of a 90-minute study in a 2-minute read.
              </p>
              <p className="text-[#2D2D2D] mb-6 leading-relaxed">
                Perfect for sharing with absent group members, refreshing your memory before the next meeting, or creating follow-up materials for your church.
              </p>
              <ul className="space-y-3">
                {[
                  'Automatic session summaries after each study',
                  'Key themes and main takeaways highlighted',
                  'Scripture references extracted and listed',
                  'Easy sharing with your group',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#87A878] mt-0.5 flex-shrink-0" />
                    <span className="text-[#2D2D2D]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
              Invest in Your Spiritual Growth
            </h2>
            <p className="text-lg text-[#2D2D2D]">
              Start free. Upgrade when you're ready for unlimited study.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#1E3A5F]/10">
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">Free</h3>
              <p className="text-4xl font-bold text-[#1E3A5F] mb-2">$0</p>
              <p className="text-[#2D2D2D] mb-6">/ month</p>
              <p className="text-[#2D2D2D] mb-6">Perfect for trying Bible StudyLink or occasional personal study.</p>
              <button className="w-full py-3 px-6 rounded-xl border-2 border-[#1E3A5F] text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F] hover:text-white transition-colors mb-8">
                Download Free
              </button>
              <ul className="space-y-3">
                {[
                  '3 sessions per month',
                  '45 minutes per session',
                  '3 bookmarks/notes per session',
                  'AI transcription',
                  'Scripture detection',
                  'Basic session summaries',
                  'ESV & NIV Bible versions',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#87A878]" />
                    <span className="text-[#2D2D2D]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#1E3A5F] rounded-3xl p-8 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1E3A5F] px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4" />
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-4xl font-bold text-white mb-2">$9.99</p>
              <p className="text-white/70 mb-2">/ month</p>
              <p className="text-white/80 mb-6">Unlimited study for leaders, pastors, and devoted groups.</p>
              <button className="w-full py-3 px-6 rounded-xl bg-[#D4AF37] text-[#1E3A5F] font-semibold hover:bg-[#c4a030] transition-colors mb-8">
                Start Premium Trial
              </button>
              <ul className="space-y-3">
                {[
                  'Unlimited sessions',
                  '3 hours per session',
                  'Unlimited bookmarks & notes',
                  'AI transcription with priority processing',
                  'Scripture detection',
                  'Enhanced session summaries',
                  'AI reflection questions for deeper study',
                  'All 7 Bible versions',
                  'Export & share notes and summaries',
                  'Priority support',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-[#2D2D2D] flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Cancel anytime. No credit card required for free plan.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] text-center mb-12">
            What Bible Study Leaders Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We used to have one person frantically typing notes during our small group. Now everyone participates fully. Bible StudyLink has transformed our Wednesday night gatherings.",
                author: "Sarah M.",
                role: "Small Group Leader, Austin TX",
              },
              {
                quote: "As a youth pastor, I review 4-5 study sessions a week. The AI summaries save me hours of prep time, and the verse-linked notes are a sermon goldmine.",
                author: "Pastor James T.",
                role: "Youth Ministry Director",
              },
              {
                quote: "I study alone most mornings with Bible podcasts. StudyLink lets me capture insights like never before. It's become essential to my quiet time.",
                author: "David K.",
                role: "Bible Student",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#F5F1E8] rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-[#2D2D2D] mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-[#1E3A5F]">{testimonial.author}</p>
                <p className="text-sm text-[#2D2D2D]/70">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
            Start Recording God's Word Today
          </h2>
          <p className="text-lg text-[#2D2D2D] mb-8">
            Join thousands of Bible study leaders, pastors, and students who never miss a divine moment.
          </p>
          
          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#1E3A5F] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#152a45] transition-colors">
              <Apple className="w-6 h-6" />
              Download on the App Store
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#1E3A5F] px-8 py-4 rounded-xl font-semibold hover:bg-[#c4a030] transition-colors">
              <Play className="w-6 h-6" />
              Get it on Google Play
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#2D2D2D] mb-8">
            <span className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
              4.9 rating on App Store
            </span>
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              50,000+ downloads
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#D4AF37]">🏆</span>
              Featured on ChurchTechToday
            </span>
          </div>
          
          {/* Final Microcopy */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#2D2D2D]">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#87A878]" />
              Free to download
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#87A878]" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#87A878]" />
              Cancel Premium anytime
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-2">Bible StudyLink</h3>
              <p className="text-white/70 text-sm">Never miss a moment of God's Word.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/bible-studylink/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/bible-studylink/terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><span className="text-white/40">Coming soon...</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            <p>© 2025 Bible StudyLink. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for the Church.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
