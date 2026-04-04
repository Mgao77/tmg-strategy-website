import Link from 'next/link'
import Container from '@/components/layout/Container'
import Divider from '@/components/ui/Divider'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

const services = [
  {
    number: '01',
    title: 'Growth strategy',
    description:
      'We help consumer and retail businesses define where to play, how to win, and how to execute. Market entry, revenue architecture, and go-to-market for founders preparing to scale or raise.',
    href: '/en/what-we-do#growth-strategy',
  },
  {
    number: '02',
    title: 'Commercial due diligence',
    description:
      'Independent commercial assessment of consumer and retail assets ahead of investment. Built for PE firms and investors who need a clear view of what they are actually buying.',
    href: '/en/what-we-do#commercial-due-diligence',
  },
  {
    number: '03',
    title: 'Restructuring & transformation',
    description:
      'Commercial and operational reset for businesses that need to change course. Diagnostic, prioritisation, and a 90-day plan for operators and investors managing a transition.',
    href: '/en/what-we-do#restructuring',
  },
]

export default function HomeServices() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="services-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>what we do</Eyebrow>
          <h2 id="services-heading" className="text-heading mb-10 max-w-xl">
            One area of expertise. Two kinds of clients.
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {services.map((service, index) => (
            <ScrollReveal key={service.number} delay={index * 0.08}>
              <div>
                <Divider />
                <Link
                  href={service.href}
                  className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 hover:opacity-70 transition-opacity duration-200"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <span className="text-eyebrow shrink-0 w-8">{service.number}</span>
                  <div className="flex-1">
                    <h3 className="text-card-heading mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-body text-[var(--color-ink-secondary)]">
                      {service.description}
                    </p>
                  </div>
                  <span className="hidden md:block text-[var(--color-ink-muted)] group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
          <Divider />
        </div>
      </Container>
    </section>
  )
}
