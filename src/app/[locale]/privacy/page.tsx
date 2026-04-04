import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TMG Strategy privacy policy.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-24 md:pb-32">
      <Container>
        <ScrollReveal>
          <h1 className="text-heading mb-12">Privacy policy</h1>
          <div className="prose max-w-2xl text-[var(--color-ink-secondary)]">
            <p className="text-caption mb-8">Last updated: April 2026</p>

            <h2 className="text-card-heading mt-10 mb-4">1. Data we collect</h2>
            <p className="text-body mb-6">
              When you submit the contact form on this website, we collect your name, email address, company name (if provided), and the message you send. We do not use cookies for tracking, advertising, or analytics beyond basic server-side access logs.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">2. How we use your data</h2>
            <p className="text-body mb-6">
              We use the information you provide solely to respond to your enquiry. We do not share, sell, or transfer your personal data to third parties, except where required by law.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">3. Data retention</h2>
            <p className="text-body mb-6">
              Contact form submissions are retained for as long as necessary to manage our client relationships. You may request deletion of your data at any time by emailing us.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">4. Your rights</h2>
            <p className="text-body mb-6">
              Under applicable data protection law (including the UAE PDPL and, where applicable, GDPR), you have the right to access, correct, or delete personal data we hold about you. To exercise these rights, email us at{' '}
              <a href="mailto:hello@tmgstrategy.com" className="underline hover:text-[var(--color-accent)]">
                hello@tmgstrategy.com
              </a>.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">5. Contact</h2>
            <p className="text-body">
              TMG Strategy, Dubai, UAE.{' '}
              <a href="mailto:hello@tmgstrategy.com" className="underline hover:text-[var(--color-accent)]">
                hello@tmgstrategy.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
