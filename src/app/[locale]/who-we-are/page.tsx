import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import FounderBio from '@/components/founders/FounderBio'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'About TMG Strategy | Mahmoud Gao & Tiba Al-Damen',
  description:
    'Meet the founding partners of TMG Strategy — a Dubai-based boutique consultancy built on senior operator and transaction advisory experience.',
}

const mahmoudBio = [
  "Mahmoud Gao is a co-founder of TMG Strategy and leads the firm's growth strategy and commercial transformation practice.",
  'Before founding TMG, Mahmoud spent several years at Accenture Strategy, where he advised consumer and retail clients across the GCC on market entry, portfolio strategy, and commercial restructuring.',
  'He subsequently founded Mr. Draper, a direct-to-consumer menswear brand that he built and operated in the UAE. This experience — managing a real business with real unit economics, customer acquisition costs, and margin pressure — shapes every growth strategy engagement TMG takes.',
  'Mahmoud works most closely with founders preparing to scale, raise capital, or enter a new market. He understands what investors look for because he has been on both sides of the table.',
]

const tibaBio = [
  "Tiba Al-Damen is a co-founder of TMG Strategy and leads the firm's commercial due diligence and transaction advisory practice.",
  'Tiba began her career in transaction advisory at EY, where she led commercial due diligence engagements for PE firms and strategic acquirers evaluating consumer and retail assets across the GCC. She subsequently joined AT Kearney in Saudi Arabia, where she advised government and corporate clients on strategy and transformation across the consumer and public sectors.',
  "Her experience spans both sides of the investment process — advising the businesses being evaluated and the investors doing the evaluating. That dual perspective makes TMG's CDD work unusually practical.",
  'Tiba works most closely with PE firms and investors who need a rigorous, independent view of a consumer or retail asset before committing capital.',
]

export default function WhoWeArePage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-10" aria-labelledby="about-heading">
        <Container>
          <ScrollReveal>
            <Eyebrow>who we are</Eyebrow>
            <h1 id="about-heading" className="text-display max-w-3xl mt-4">
              A firm built on doing, not just advising.
            </h1>
            <p className="text-body text-[var(--color-ink-secondary)] mt-6 max-w-[52ch]">
              TMG Strategy was founded by two practitioners who spent their careers at the intersection of strategy, transactions, and operations in the GCC consumer and retail market.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Founders */}
      <section className="pb-16 md:pb-24" aria-label="Founding partners">
        <Container>
          <Divider className="mb-10" />
          <FounderBio
            name="Mahmoud Gao"
            image="/images/mahmoud-headshot.jpg"
            alt="Mahmoud Gao, co-founder of TMG Strategy"
            bio={mahmoudBio}
          />

          <Divider className="my-12" />

          <FounderBio
            name="Tiba Al-Damen"
            image="/images/tiba-headshot.jpeg"
            alt="Tiba Al-Damen, co-founder of TMG Strategy"
            bio={tibaBio}
            reversed
          />
        </Container>
      </section>

      {/* Partner model note */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]" aria-labelledby="partner-model">
        <Container>
          <ScrollReveal>
            <Eyebrow>how we work together</Eyebrow>
            <h2 id="partner-model" className="text-heading mb-6 max-w-xl">
              Two partners. No layers.
            </h2>
            <p className="text-body text-[var(--color-ink-secondary)] max-w-[52ch]">
              TMG is a two-partner firm by design. Every client works directly with Mahmoud, Tiba, or both — depending on the nature of the engagement. There is no project team between you and the people with the most experience. That is not a marketing claim. It is how we are structured.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <ClosingCTA />
    </>
  )
}
