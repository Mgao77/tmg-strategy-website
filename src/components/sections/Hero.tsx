'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/layout/Container'
import { heroReveal, fadeUp, REVEAL_EASE } from '@/lib/animations'

export default function Hero() {
  return (
    <section
      className="min-h-[100dvh] flex items-center pt-32 pb-24"
      aria-labelledby="hero-headline"
    >
      <Container>
        <LazyMotion features={domAnimation}>
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <m.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="text-eyebrow mb-6"
            >
              dubai · gcc · consumer & retail
            </m.p>

            {/* Headline */}
            <m.h1
              id="hero-headline"
              initial="hidden"
              animate="visible"
              variants={heroReveal}
              className="text-display mb-8"
            >
              Strategy and commercial advisory for consumer and retail businesses across the GCC.
            </m.h1>

            {/* Subheadline */}
            <m.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: fadeUp.hidden,
                visible: {
                  ...fadeUp.visible,
                  transition: { duration: 0.7, ease: REVEAL_EASE, delay: 0.25 },
                },
              }}
              className="text-body text-[var(--color-ink-secondary)] mb-10 max-w-[52ch]"
            >
              TMG Strategy is a Dubai-based boutique consultancy founded by two senior
              practitioners. We work directly with the companies we advise — and the
              investors who back them.
            </m.p>

            {/* CTA */}
            <m.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: REVEAL_EASE, delay: 0.4 },
                },
              }}
              className="flex items-center gap-4"
            >
              <Button href="/en/contact" variant="primary">
                Book a 30-minute call
              </Button>
              <Button href="/en/what-we-do" variant="text">
                What we do →
              </Button>
            </m.div>
          </div>
        </LazyMotion>
      </Container>
    </section>
  )
}
