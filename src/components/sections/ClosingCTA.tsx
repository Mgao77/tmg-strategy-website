import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export default function ClosingCTA() {
  return (
    <section className="py-16 md:py-24" aria-label="Book a consultation">
      <Container>
        <Divider className="mb-10" />
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-heading max-w-md">
                Ready to talk?
              </h2>
              <p className="text-body text-[var(--color-ink-secondary)] mt-4 max-w-sm">
                A 30-minute call is enough to understand if we are the right fit for your situation.
              </p>
            </div>
            <div className="shrink-0">
              <Button href="/en/contact" variant="primary">
                Book a 30-minute call
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
