import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1E3A5F] mb-8">Terms of Service</h1>
        <p className="text-[#2D2D2D] mb-4">Effective Date: February 19, 2026</p>
        <p className="text-[#2D2D2D] mb-8">Last Updated: February 19, 2026</p>

        <div className="prose prose-lg max-w-none text-[#2D2D2D]">
          <p className="mb-6">
            Please read these Terms of Service ("Terms") carefully before using the Bible StudyLink mobile application and related services (collectively, the "Service") operated by Bible StudyLink ("we," "our," or "us").
          </p>
          <p className="mb-6">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">1. Description of Service</h2>
          <p className="mb-4">
            Bible StudyLink is a mobile application that provides AI-powered Bible study recording, transcription, scripture detection, and note-taking services. The Service allows users to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Record audio of Bible study sessions</li>
            <li>Generate text transcriptions of recordings</li>
            <li>Receive automatic scripture reference detection and verse display</li>
            <li>Create bookmarks and notes linked to specific verses</li>
            <li>Generate AI-powered session summaries</li>
            <li>Export and share study materials</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">2. User Accounts</h2>
          <p className="mb-4">
            To access certain features of the Service, you must create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly notify us of any unauthorized access</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
          <p className="mb-4">
            We reserve the right to terminate or suspend accounts that violate these Terms or for any other reason at our sole discretion.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">3. Subscription Terms and Billing</h2>
          
          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">3.1 Subscription Plans</h3>
          <p className="mb-4">
            Bible StudyLink offers both free and premium subscription plans. Premium subscriptions are processed through:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Apple App Store:</strong> For iOS users, subscriptions are managed through Apple&apos;s In-App Purchase system</li>
            <li><strong>Google Play Store:</strong> For Android users, subscriptions are managed through Google Play Billing</li>
            <li><strong>RevenueCat:</strong> We use RevenueCat as our subscription management platform</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">3.2 Billing and Renewal</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period</li>
            <li>Your account will be charged for renewal within 24 hours prior to the end of the current period</li>
            <li>All payments are processed by Apple, Google, or Stripe according to their respective terms</li>
            <li>Prices are subject to change with notice provided prior to renewal</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">3.3 Cancellation</h3>
          <p className="mb-4">
            You may cancel your subscription at any time through:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>iOS: Settings → Apple ID → Subscriptions</li>
            <li>Android: Google Play Store → Subscriptions</li>
          </ul>
          <p className="mb-4">
            Cancellation takes effect at the end of the current billing period. No refunds are provided for partial periods.
          </p>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">3.4 Free Trials</h3>
          <p className="mb-4">
            When applicable, free trials provide access to Premium features for a limited time. At the end of the trial period, your subscription will automatically convert to a paid subscription unless cancelled.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">4. Content Ownership</h2>
          
          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">4.1 Your Content</h3>
          <p className="mb-4">
            You retain all rights to your audio recordings, transcripts, notes, and other content created using the Service ("User Content"). You grant us a limited license to process, store, and display your User Content solely for the purpose of providing and improving the Service.
          </p>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">4.2 Scripture Content</h3>
          <p className="mb-4">
            Bible translations displayed in the Service are licensed from third-party publishers. You may use scripture content in accordance with each publisher&apos;s terms. Common versions available include ESV, NIV, KJV, NKJV, NLT, NASB, and CSB.
          </p>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">4.3 AI-Generated Content</h3>
          <p className="mb-4">
            AI-generated summaries and insights are provided for reference purposes only. We do not claim ownership of AI-generated content based on your recordings. You are responsible for verifying the accuracy of AI-generated content before using it for teaching or other purposes.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">5. Acceptable Use</h2>
          <p className="mb-4">You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Record individuals without their knowledge or consent where required by law</li>
            <li>Create, upload, or share content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon intellectual property rights of others</li>
            <li>Attempt to gain unauthorized access to the Service or its related systems</li>
            <li>Use the Service for any commercial purpose without our written consent</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Reverse engineer or attempt to extract source code from the Service</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">6. Recording Consent and Privacy</h2>
          <p className="mb-4">
            You are solely responsible for complying with all applicable laws regarding audio recording, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Obtaining consent from all participants before recording</li>
            <li>Complying with wiretapping and eavesdropping laws in your jurisdiction</li>
            <li>Ensuring recording is permitted in your location</li>
            <li>Informing participants how recordings will be used and stored</li>
          </ul>
          <p className="mb-4">
            By using the recording feature, you represent that you have obtained all necessary consents and permissions.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">7. AI-Generated Content Disclaimer</h2>
          <p className="mb-4">
            The Service uses artificial intelligence (Anthropic Claude) to generate session summaries and insights. You acknowledge that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>AI-generated content may not be 100% accurate</li>
            <li>AI may misinterpret context, nuance, or theological concepts</li>
            <li>You should verify all AI-generated content against original sources</li>
            <li>We are not responsible for errors or omissions in AI-generated content</li>
            <li>AI-generated content should not be considered professional theological advice</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The Service is provided "AS IS" without warranties of any kind</li>
            <li>We do not warrant that the Service will be uninterrupted, timely, secure, or error-free</li>
            <li>We are not liable for any loss of data, recordings, or content</li>
            <li>Our total liability shall not exceed the amount paid by you to us in the 12 months preceding the claim</li>
            <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">9. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify and hold harmless Bible StudyLink, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses arising from:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Your User Content</li>
            <li>Your recording of others without proper consent</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">10. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.
          </p>
          <p className="mb-4">
            Upon termination:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your right to use the Service immediately ceases</li>
            <li>Your account and data may be deleted</li>
            <li>Provisions that by their nature should survive termination shall survive</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">11. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Travis County, Texas.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">12. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of significant changes through the app or via email. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">13. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-none mb-4 space-y-2">
            <li><strong>Email:</strong> legal@biblestudylink.app</li>
            <li><strong>Address:</strong> Bible StudyLink, 123 Faith Way, Suite 100, Austin, TX 78701</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">14. Severability</h2>
          <p className="mb-4">
            If any provision of these Terms is held to be unenforceable or invalid, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">15. Entire Agreement</h2>
          <p className="mb-4">
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Bible StudyLink regarding the Service and supersede all prior agreements and understandings.
          </p>

          <p className="mt-8 pt-8 border-t border-[#1E3A5F]/20">
            By using Bible StudyLink, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  )
}
