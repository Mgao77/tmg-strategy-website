export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  author: 'mahmoud-gao' | 'tiba-al-damen'
  publishedAt: string
  excerpt?: string
  body: unknown[]
  seoTitle?: string
  seoDescription?: string
}

export interface SanityCaseStudy {
  _id: string
  sector: string
  region: string
  situation: string
  outcome: string
  partner: 'Mahmoud Gao' | 'Tiba Al-Damen'
  order?: number
}
