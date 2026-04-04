import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import Container from '@/components/layout/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import ClosingCTA from '@/components/sections/ClosingCTA'
import { getPostBySlug } from '@/lib/sanity/queries'

const authorNames: Record<string, string> = {
  'mahmoud-gao': 'Mahmoud Gao',
  'tiba-al-damen': 'Tiba Al-Damen',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const date = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <article className="pt-40 pb-24 md:pb-32">
        <Container>
          <header className="mb-16 max-w-3xl">
            <Eyebrow>perspectives</Eyebrow>
            <h1 className="text-display mt-4 mb-6">{post.title}</h1>
            <div className="flex items-center gap-3">
              <time className="text-caption" dateTime={post.publishedAt}>{date}</time>
              <span className="text-[var(--color-ink-muted)] text-xs">·</span>
              <span className="text-caption">{authorNames[post.author] || post.author}</span>
            </div>
          </header>

          <Divider className="mb-12" />

          <div className="prose prose-lg max-w-2xl prose-headings:font-serif prose-headings:font-normal prose-p:text-[var(--color-ink-secondary)] prose-p:leading-[1.65]">
            <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} />
          </div>
        </Container>
      </article>
      <ClosingCTA />
    </>
  )
}
