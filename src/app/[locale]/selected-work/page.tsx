import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import CaseCard, { type CaseStudy } from '@/components/work/CaseCard'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Engagements across consumer, retail, and PE in the GCC.',
}

const caseStudies: CaseStudy[] = [
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
    outcome: 'Investment approved with negotiated valuation adjustment. Portfolio company reached break-even ahead of plan.',
    partner: 'Tiba Al-Damen',
  },
  {
    sector: 'Retail / Multi-brand',
    region: 'GCC',
    situation:
      'Engaged by the majority shareholder of a multi-brand retail group to diagnose underperformance and prioritise a commercial reset. Identified three underperforming categories and restructured the buying and margin model.',
    outcome: 'Gross margin improved 8 percentage points within the first operating year.',
    partner: 'Mahmoud Gao',
  },
  {
    sector: 'Consumer Technology',
    region: 'UAE',
    situation:
      'Supported a growth-stage consumer app with GCC market entry strategy following initial traction in KSA. Defined the UAE go-to-market and identified three partnership channels unavailable to the existing team.',
    outcome: 'UAE launch delivered first 10,000 users within 60 days of go-live.',
    partner: 'Tiba Al-Damen',
  },
]

export default function SelectedWorkPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16" aria-labelledby="work-heading">
        <Container>
          <ScrollReveal>
            <Eyebrow>selected work</Eyebrow>
            <h1 id="work-heading" className="text-display max-w-3xl mt-4">
              Engagements across consumer, retail, and PE.
            </h1>
            <p className="text-body text-[var(--color-ink-secondary)] mt-6 max-w-[48ch]">
              Engagements are described without naming clients to protect confidentiality.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Case cards */}
      <section className="pb-24 md:pb-32" aria-label="Case studies">
        <Container>
          <Divider className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.sector + study.region} delay={index * 0.08}>
                <CaseCard study={study} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA />
    </>
  )
}
