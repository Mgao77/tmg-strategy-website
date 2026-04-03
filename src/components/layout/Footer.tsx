import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Container from './Container'
import Divider from '@/components/ui/Divider'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="py-12 mt-24">
      <Container>
        <Divider className="mb-10" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Wordmark + tagline */}
          <div>
            <p className="font-sans font-semibold text-sm text-[var(--color-ink-primary)] mb-2">
              TMG Strategy
            </p>
            <p className="text-caption max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-6 list-none m-0 p-0" role="list">
              <li>
                <a
                  href="https://linkedin.com/company/tmg-strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption hover:text-[var(--color-ink-primary)] transition-colors duration-200"
                  aria-label="TMG Strategy on LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-caption hover:text-[var(--color-ink-primary)] transition-colors duration-200"
                >
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="text-caption mt-8">
          {t('copyright')}
        </p>
      </Container>
    </footer>
  )
}
