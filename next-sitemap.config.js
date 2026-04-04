/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
    ],
  },
  exclude: ['/ar/*', '/ar'],
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com',
      hreflang: 'en',
    },
  ],
}
