import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

const differentiators = [
  {
    label: 'Senior partners, always',
    body: 'Every engagement is led and delivered by Mahmoud or Tiba. No junior teams, no hand-offs, no dilution of expertise.',
  },
  {
    label: 'Operators and advisors',
    body: "Mahmoud built and ran a D2C brand. Tiba closed transactions at the table. We understand the decisions clients face because we have made them.",
  },
  {
    label: 'GCC-native',
    body: 'Built-in networks, market knowledge, and pattern recognition that takes years to develop. We know the region — not from the outside.',
  },
]

export default function WhyTMG() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-surface)]" aria-labelledby="why-tmg-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>why tmg</Eyebrow>
          <h2 id="why-tmg-heading" className="text-heading mb-10 max-w-xl">
            What makes us different is not what we say — it is what we have done.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {differentiators.map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 0.1}>
              <article>
                <h3 className="text-card-heading mb-4">{item.label}</h3>
                <p className="text-body text-[var(--color-ink-secondary)]">{item.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
