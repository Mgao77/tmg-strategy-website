import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import Button from '@/components/ui/Button'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'Strategy, CDD & Transformation',
  description:
    'Growth strategy, commercial due diligence, and restructuring for consumer and retail businesses across the GCC.',
}

interface Service {
  id: string
  number: string
  title: string
  audience: string
  description: string
  scope: string[]
  credential?: string
}

const services: Service[] = [
  {
    id: 'growth-strategy',
    number: '01',
    title: 'Growth strategy',
    audience: 'For consumer and retail founders',
    description:
      'We work with founders and leadership teams to define where to play, how to win, and how to execute. This means making hard choices about markets, channels, and positioning — and building the commercial architecture to deliver on them.',
    scope: [
      'Market sizing and opportunity assessment',
      'Revenue and margin architecture',
      'Go-to-market strategy and channel design',
      'Fundraising narrative and commercial story',
      'Strategic planning and roadmap development',
    ],
  },
  {
    id: 'commercial-due-diligence',
    number: '02',
    title: 'Commercial due diligence',
    audience: 'For PE firms and investors',
    description:
      'We deliver independent commercial assessments of consumer and retail assets ahead of investment decisions. Our work gives deal teams a clear, evidence-based view of market dynamics, competitive position, and growth headroom — so they invest with confidence, not assumptions.',
    scope: [
      'Market attractiveness and competitive landscape',
      'Revenue quality and growth runway assessment',
      'Customer and channel analysis',
      'Management team commercial capability review',
      'Key risk identification and mitigation framing',
    ],
    credential:
      'Tiba Al-Damen led transaction advisory work at EY and strategic advisory at AT Kearney in KSA before co-founding TMG.',
  },
  {
    id: 'restructuring',
    number: '03',
    title: 'Restructuring & transformation',
    audience: 'For operators and investors managing a transition',
    description:
      'When a business needs to change course, we provide the commercial diagnostic and prioritisation that makes transformation executable. We identify the root causes of underperformance, isolate the two or three levers that actually move the business, and build a 90-day plan that teams can act on.',
    scope: [
      'Commercial performance diagnostic',
      'Category, channel, and margin analysis',
      'Restructuring options and trade-off assessment',
      'Priority action plan with ownership and timelines',
      'Ongoing implementation support',
    ],
  },
]

export default function WhatWeDoPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16" aria-labelledby="page-heading">
        <Container>
          <ScrollReveal>
            <Eyebrow>what we do</Eyebrow>
            <h1 id="page-heading" className="text-display max-w-3xl mt-4">
              Three services. One area of expertise.
            </h1>
            <p className="text-body text-[var(--color-ink-secondary)] mt-6 max-w-[52ch]">
              Every engagement we take is rooted in consumer and retail. We do not work across all sectors — we go deep in one.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Services */}
      <section className="pb-24 md:pb-32" aria-label="Our services">
        <Container>
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.05}>
              <div id={service.id} className="py-16 scroll-mt-32">
                <Divider className="mb-16" />
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16">
                  <span className="text-eyebrow">{service.number}</span>
                  <div>
                    <p className="text-eyebrow mb-3">{service.audience}</p>
                    <h2 className="text-heading mb-6">{service.title}</h2>
                    <p className="text-body text-[var(--color-ink-secondary)] mb-8 max-w-[56ch]">
                      {service.description}
                    </p>

                    {/* Scope list */}
                    <ul className="space-y-3 mb-8" role="list">
                      {service.scope.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-body text-[var(--color-ink-secondary)]">
                          <span className="mt-[0.4em] w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {service.credential && (
                      <p className="text-caption italic border-l-2 border-[var(--color-accent)] pl-4 max-w-[48ch]">
                        {service.credential}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </Container>
      </section>

      {/* How We Work */}
      <section className="py-24 md:py-32 bg-[var(--color-surface)]" aria-labelledby="how-we-work">
        <Container>
          <ScrollReveal>
            <Eyebrow>how we work</Eyebrow>
            <h2 id="how-we-work" className="text-heading mb-8 max-w-xl">
              Small team. Direct access. Defined scope.
            </h2>
            <p className="text-body text-[var(--color-ink-secondary)] max-w-[52ch] mb-6">
              We do not run large project teams. Every engagement involves one or both founding partners, directly. Scope is defined at the start — we work to clear deliverables, not open-ended retainers.
            </p>
            <p className="text-body text-[var(--color-ink-secondary)] max-w-[52ch]">
              Most engagements run for six to twelve weeks. Some are shorter diagnostics. Some extend into implementation support. We will always tell you what we think the right scope is — including when we think you do not need us.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <ClosingCTA />
    </>
  )
}
