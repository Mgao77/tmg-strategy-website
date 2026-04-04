import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

const founders = [
  {
    name: 'Mahmoud Gao',
    role: 'Growth strategy and commercial transformation',
    image: '/images/mahmoud-headshot.jpg',
    alt: 'Mahmoud Gao, founding partner at TMG Strategy',
  },
  {
    name: 'Tiba Al-Damen',
    role: 'Commercial due diligence and transaction advisory',
    image: '/images/tiba-headshot.jpeg',
    alt: 'Tiba Al-Damen, founding partner at TMG Strategy',
  },
]

export default function HomeFounders() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-surface)]" aria-labelledby="founders-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>the partners</Eyebrow>
          <h2 id="founders-heading" className="text-heading mb-12 max-w-xl">
            Senior practitioners. Not a firm that sends juniors.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {founders.map((founder, index) => (
            <ScrollReveal key={founder.name} delay={index * 0.1}>
              <div className="flex flex-col">
                <div className="relative w-full aspect-[4/3] rounded-[4px] overflow-hidden mb-4">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    fill
                    className="object-cover object-top"
                    style={{ filter: 'grayscale(100%) contrast(1.05) brightness(0.97)' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="font-sans font-semibold text-sm text-[var(--color-ink-primary)] mb-1">
                  {founder.name}
                </p>
                <p className="text-caption">{founder.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <Link
            href="/en/who-we-are"
            className="text-sm font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors duration-200"
          >
            About the partners →
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  )
}
