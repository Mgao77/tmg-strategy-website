import type { Metadata } from 'next'
import { instrumentSerif, geist, geistMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com'),
  title: {
    default: 'TMG Strategy | Strategy Consulting Firm in Dubai',
    template: '%s | TMG Strategy',
  },
  description:
    'Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'TMG Strategy',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
