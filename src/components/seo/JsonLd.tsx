export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TMG Strategy',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com'}/icon.svg`,
    description:
      'Dubai boutique strategy consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    founders: [
      { '@type': 'Person', name: 'Mahmoud Gao' },
      { '@type': 'Person', name: 'Tiba Al-Damen' },
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TMG Strategy',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
