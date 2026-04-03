import Container from '@/components/layout/Container'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

export default function PerspectivesTeaser() {
  return (
    <section className="py-16" aria-label="Perspectives">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Eyebrow className="mb-0">perspectives</Eyebrow>
            <Badge color="neutral">coming soon</Badge>
          </div>
          <p className="text-body text-[var(--color-ink-muted)] mt-3 max-w-md">
            Practical thinking on strategy, commercial due diligence, and the GCC consumer and retail market.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  )
}
