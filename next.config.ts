import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Sanity Studio route — exclude from i18n
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/studio/:path*', destination: '/studio/:path*' },
      ],
    }
  },
}

export default withNextIntl(nextConfig)
