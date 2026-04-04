import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import ContactForm from '@/components/contact/ContactForm'
import CalendlyEmbed from '@/components/contact/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Contact TMG Strategy',
  description: 'Book a conversation with TMG Strategy.',
}

export default function ContactPage() {
  return (
    <section className="pt-40 pb-24 md:pb-32" aria-labelledby="contact-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>get in touch</Eyebrow>
          <h1 id="contact-heading" className="text-display max-w-2xl mt-4 mb-6">
            Talk to us directly.
          </h1>
          <p className="text-body text-[var(--color-ink-secondary)] max-w-[48ch] mb-16">
            A 30-minute call is enough to understand if we are the right fit. Use the form below or book directly in the calendar.
          </p>
        </ScrollReveal>

        <Divider className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <h2 className="text-card-heading mb-8">Send a message</h2>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-card-heading mb-8">Book a call</h2>
            <CalendlyEmbed />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
