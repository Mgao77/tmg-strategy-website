import Link from 'next/link'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-[100dvh] flex items-center">
      <Container>
        <p className="text-eyebrow mb-6">404</p>
        <h1 className="text-display max-w-xl mb-6">
          This page does not exist.
        </h1>
        <p className="text-body text-[var(--color-ink-secondary)] mb-10 max-w-sm">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Button href="/en" variant="primary">Back to home</Button>
      </Container>
    </section>
  )
}
