import Link from 'next/link'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import CaseCard, { type CaseStudy } from '@/components/work/CaseCard'

const featuredWork: CaseStudy[] = [
  {
    sector: 'Consumer / D2C',
    region: 'UAE',
    situation:
      'Supported a direct-to-consumer apparel brand ahead of a Series A raise. Rebuilt the commercial model and channel architecture to reflect sustainable unit economics.',
    outcome: 'Revenue per customer improved 34% over two quarters.',
    partner: 'Mahmoud Gao',
  },
  {
    sector: 'Food & Beverage',
    region: 'KSA',
    situation:
      'Delivered commercial due diligence for a regional PE firm evaluating a fast-casual restaurant operator at Series B. Assessed market positioning, franchisee quality, and growth runway.',
    outcome: 'Investment approved with negotiated valuation adjustment.',
    partner: 'Tiba Al-Damen',
  },
]

export default function HomeWork() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="work-heading">
      <Container>
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <Eyebrow>selected work</Eyebrow>
              <h2 id="work-heading" className="text-heading">
                Recent engagements.
              </h2>
            </div>
            <Link
              href="/en/selected-work"
              className="hidden md:block text-sm font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors duration-200"
            >
              View all →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredWork.map((study, index) => (
            <ScrollReveal key={study.sector + study.region} delay={index * 0.1}>
              <CaseCard study={study} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
