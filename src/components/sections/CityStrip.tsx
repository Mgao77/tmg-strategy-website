import Image from 'next/image'

interface CityStripProps {
  src: string
  alt: string
  className?: string
}

export default function CityStrip({ src, alt, className = '' }: CityStripProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="relative w-full h-[40vh] md:h-[52vh]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.75)' }}
          sizes="100vw"
          priority={false}
        />
        {/* Subtle top/bottom fade to blend into page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)] opacity-40 pointer-events-none" />
      </div>
    </div>
  )
}
