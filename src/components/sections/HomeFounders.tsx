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
    <section className="py-24 md:py-32 bg-[var(--color-surface)]" aria-labelledby="founders-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>the partners</Eyebrow>
          <h2 id="founders-heading" className="text-heading mb-16 max-w-xl">
            Senior practitioners. Not a firm that sends juniors.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {founders.map((founder, index) => (
            <ScrollReveal key={founder.name} delay={index * 0.1}>
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-[8px] overflow-hidden shrink-0">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    fill
                    className="object-cover grayscale-[30%] sepia-[10%] brightness-[0.97]"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-[var(--color-ink-primary)] mb-1">
                    {founder.name}
                  </p>
                  <p className="text-caption">{founder.role}</p>
                </div>
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
