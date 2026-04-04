import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import Badge from '@/components/ui/Badge'
import PostCard from '@/components/insights/PostCard'
import { getAllPosts } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Perspectives',
  description:
    'Practical thinking on strategy, commercial due diligence, and the GCC consumer and retail market.',
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const posts = await getAllPosts()

  return (
    <section className="pt-40 pb-24 md:pb-32" aria-labelledby="insights-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>perspectives</Eyebrow>
          <h1 id="insights-heading" className="text-display max-w-2xl mt-4 mb-6">
            Thinking from the field.
          </h1>
          <p className="text-body text-[var(--color-ink-secondary)] max-w-[48ch] mb-16">
            Practical writing on strategy, commercial due diligence, and the GCC consumer and retail market.
          </p>
        </ScrollReveal>

        <Divider />

        {posts.length === 0 ? (
          <ScrollReveal>
            <div className="py-20 flex flex-col items-start gap-4">
              <Badge color="neutral">coming soon</Badge>
              <p className="text-body text-[var(--color-ink-secondary)]">
                The first perspectives are on their way.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="divide-y divide-[rgba(0,0,0,0.08)]">
            {posts.map((post) => (
              <ScrollReveal key={post._id}>
                <PostCard post={post} locale={locale} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
