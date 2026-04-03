import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import HomeServices from '@/components/sections/HomeServices'
import WhyTMG from '@/components/sections/WhyTMG'
import HomeWork from '@/components/sections/HomeWork'
import HomeFounders from '@/components/sections/HomeFounders'
import PerspectivesTeaser from '@/components/sections/PerspectivesTeaser'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'TMG Strategy | Strategy Consulting Firm in Dubai',
  description:
    'Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
  openGraph: {
    title: 'TMG Strategy | Strategy Consulting Firm in Dubai',
    description:
      'Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeServices />
      <WhyTMG />
      <HomeWork />
      <HomeFounders />
      <PerspectivesTeaser />
      <ClosingCTA />
    </>
  )
}
