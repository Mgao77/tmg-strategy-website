import Link from 'next/link'
import type { SanityPost } from '@/lib/sanity/types'

const authorNames: Record<string, string> = {
  'mahmoud-gao': 'Mahmoud Gao',
  'tiba-al-damen': 'Tiba Al-Damen',
}

export default function PostCard({ post, locale }: { post: SanityPost; locale: string }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article>
      <Link
        href={`/${locale}/insights/${post.slug.current}`}
        className="group block py-8 hover:opacity-70 transition-opacity duration-200"
      >
        <div className="flex items-center gap-3 mb-3">
          <time className="text-eyebrow" dateTime={post.publishedAt}>{date}</time>
          <span className="text-[var(--color-ink-muted)] text-[0.6875rem]">·</span>
          <span className="text-eyebrow">{authorNames[post.author] || post.author}</span>
        </div>
        <h2 className="text-card-heading group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-3">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-body text-[var(--color-ink-secondary)] max-w-[56ch]">
            {post.excerpt}
          </p>
        )}
      </Link>
    </article>
  )
}
