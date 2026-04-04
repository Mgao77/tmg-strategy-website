import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface FounderBioProps {
  name: string
  image: string
  alt: string
  bio: string[]
  reversed?: boolean
}

export default function FounderBio({ name, image, alt, bio, reversed = false }: FounderBioProps) {
  return (
    <ScrollReveal>
      <article
        className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start ${reversed ? 'md:[direction:rtl]' : ''}`}
      >
        {/* Photo */}
        <div className={reversed ? '[direction:ltr]' : ''}>
          <div className="relative aspect-[3/4] rounded-[8px] overflow-hidden max-w-sm">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover object-top"
              style={{ filter: 'grayscale(30%) sepia(10%) brightness(0.97)' }}
              sizes="(max-width: 768px) 100vw, 384px"
            />
          </div>
        </div>

        {/* Bio */}
        <div className={reversed ? '[direction:ltr]' : ''}>
          <h2 className="text-heading mb-2">{name}</h2>
          <div className="space-y-4 mt-6">
            {bio.map((paragraph, index) => (
              <p key={index} className="text-body text-[var(--color-ink-secondary)]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}
