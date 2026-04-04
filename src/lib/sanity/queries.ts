import { sanityClient } from './client'
import type { SanityPost, SanityCaseStudy } from './types'

export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, author, publishedAt, excerpt
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, author, publishedAt, excerpt, body, seoTitle, seoDescription
    }`,
    { slug }
  )
}

export async function getAllCaseStudies(): Promise<SanityCaseStudy[]> {
  return sanityClient.fetch(
    `*[_type == "caseStudy"] | order(order asc) {
      _id, sector, region, situation, outcome, partner
    }`
  )
}
