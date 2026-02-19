export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1E3A5F] mb-8">Privacy Policy</h1>
        <p className="text-[#2D2D2D] mb-4">Effective Date: February 19, 2026</p>
        <p className="text-[#2D2D2D] mb-8">Last Updated: February 19, 2026</p>

        <div className="prose prose-lg max-w-none text-[#2D2D2D]">
          <p className="mb-6">
            Bible StudyLink ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services (collectively, the "Service").
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">1.1 Audio Recordings and Transcriptions</h3>
          <p className="mb-4">
            When you use Bible StudyLink's recording feature, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Audio recordings of your Bible study sessions captured through your device's microphone</li>
            <li>Text transcriptions generated from your audio recordings</li>
            <li>Timestamps and metadata associated with recordings</li>
          </ul>
          <p className="mb-4">
            <strong>Purpose:</strong> To provide transcription services, enable note-taking, generate session summaries, and allow you to review and search your study sessions.
          </p>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">1.2 User Content</h3>
          <p className="mb-4">
            We collect content you create or upload to the Service:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Bookmarks and notes you add to transcripts</li>
            <li>AI-generated session summaries</li>
            <li>Exported files and shared content</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">1.3 Account Information</h3>
          <p className="mb-4">
            When you create an account, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Name and email address</li>
            <li>User ID and authentication credentials</li>
            <li>Subscription status and purchase history (via RevenueCat)</li>
            <li>Preferred Bible translation settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">1.4 Usage Data</h3>
          <p className="mb-4">
            We automatically collect information about how you interact with the Service:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Device information (model, operating system, unique device identifiers)</li>
            <li>App usage statistics and feature preferences</li>
            <li>Session duration and frequency</li>
            <li>Crash reports and performance data</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide, maintain, and improve the Service</li>
            <li>Process audio recordings into text transcriptions</li>
            <li>Generate AI-powered session summaries</li>
            <li>Enable scripture detection and verse lookup</li>
            <li>Manage your account and subscription</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send service-related notifications and updates</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Prevent fraud and ensure security</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">3. AI Processing and Third-Party Services</h2>
          
          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">3.1 Anthropic Claude AI Processing</h3>
          <p className="mb-4">
            Bible StudyLink uses Anthropic Claude Sonnet, a third-party artificial intelligence service, to generate summaries of your Bible study transcripts. When you enable AI summarization:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your transcribed text is securely transmitted to Anthropic's servers</li>
            <li>AI analyzes the content to generate summaries, key themes, and reflection questions</li>
            <li>Anthropic processes this data in accordance with their privacy policy</li>
          </ul>
          <p className="mb-4">
            <strong>Important:</strong> You must explicitly consent to AI processing before using this feature. AI-generated content is for reference purposes only and may contain errors. Always verify AI summaries against the original transcript.
          </p>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">3.2 RevenueCat (Subscription Management)</h3>
          <p className="mb-4">
            We use RevenueCat to manage subscriptions and in-app purchases. RevenueCat processes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Purchase transactions and subscription status</li>
            <li>Receipt validation</li>
            <li>User entitlements and access levels</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">3.3 Cloud Storage and Infrastructure</h3>
          <p className="mb-4">
            Your data is stored on secure cloud servers. We use industry-standard cloud providers who maintain strict security and privacy standards.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">4. Data Sharing and Disclosure</h2>
          <p className="mb-4">We do not sell your personal information. We may share your information only in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
            <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating the Service (subject to confidentiality obligations)</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental regulation</li>
            <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property, or that of our users</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">5. Audio Recording and Consent</h2>
          <p className="mb-4">
            Bible StudyLink records audio during Bible study sessions for the purpose of transcription and note-taking. By using the recording feature, you consent to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Collection of audio recordings via your device's microphone</li>
            <li>Processing of audio to generate text transcriptions</li>
            <li>Storage of recordings and transcripts on our secure servers</li>
            <li>AI processing of transcriptions to generate study summaries (with your explicit consent)</li>
          </ul>
          <p className="mb-4">
            You can revoke recording permission at any time in your device settings. You are responsible for obtaining consent from all participants before recording group Bible studies.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">6. Data Retention and Deletion</h2>
          <p className="mb-4">We retain your data for the following periods:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Audio recordings:</strong> Retained until you delete them or delete your account</li>
            <li><strong>Transcripts:</strong> Retained until account deletion</li>
            <li><strong>AI summaries:</strong> Retained until account deletion</li>
            <li><strong>Account information:</strong> Retained until account deletion</li>
            <li><strong>Usage data:</strong> Retained for up to 36 months for analytics</li>
          </ul>
          <p className="mb-4">
            You may request early deletion of specific recordings without deleting your account through the app's library management features. Upon account deletion, all personal data including recordings, transcripts, and AI summaries will be permanently deleted within 30 days.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">7. Your Rights and Choices</h2>
          <p className="mb-4">Depending on your location, you may have the following rights:</p>
          
          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">7.1 GDPR Rights (European Union)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
            <li><strong>Right to Object:</strong> Object to certain processing activities</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#1E3A5F] mt-6 mb-3">7.2 CCPA Rights (California)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Right to Know:</strong> Request disclosure of personal information collected</li>
            <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
            <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell data)</li>
            <li><strong>Right to Non-Discrimination:</strong> Exercise rights without discrimination</li>
          </ul>

          <p className="mb-4">
            To exercise any of these rights, please contact us at privacy@biblestudylink.app. We will respond within 30 days.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">8. Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
            <li>Secure authentication protocols</li>
            <li>Regular security assessments and monitoring</li>
            <li>Limited access to personal data by authorized personnel only</li>
            <li>Regular backups with encrypted storage</li>
          </ul>
          <p className="mb-4">
            While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">9. Children's Privacy</h2>
          <p className="mb-4">
            The Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">10. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place for such transfers, including Standard Contractual Clauses approved by the European Commission.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">11. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy in the app and updating the "Last Updated" date. Your continued use of the Service after such changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-bold text-[#1E3A5F] mt-8 mb-4">12. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul className="list-none mb-4 space-y-2">
            <li><strong>Email:</strong> privacy@biblestudylink.app</li>
            <li><strong>Address:</strong> Bible StudyLink, 123 Faith Way, Suite 100, Austin, TX 78701</li>
          </ul>

          <p className="mt-8 pt-8 border-t border-[#1E3A5F]/20">
            By using Bible StudyLink, you acknowledge that you have read and understood this Privacy Policy and agree to our collection, use, and disclosure of your information as described herein.
          </p>
        </div>
      </div>
    </div>
  )
}
