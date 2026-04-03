'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import MobileMenu from './MobileMenu'
import Button from '@/components/ui/Button'

interface NavProps {
  locale: string
}

const links = [
  { href: '/what-we-do', labelKey: 'whatWeDo' },
  { href: '/who-we-are', labelKey: 'whoWeAre' },
  { href: '/selected-work', labelKey: 'selectedWork' },
  { href: '/insights', labelKey: 'insights' },
] as const

export default function Nav({ locale }: NavProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Strip locale prefix for active check
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center pt-6 px-6">
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-8 bg-white/80 backdrop-blur-md border border-[rgba(0,0,0,0.08)] rounded-full px-6 py-3 shadow-[var(--shadow-nav)]"
        >
          {/* Wordmark */}
          <Link
            href={`/${locale}`}
            className="font-sans font-semibold text-sm tracking-tight text-[var(--color-ink-primary)] hover:text-[var(--color-accent)] transition-colors duration-200"
            aria-label="TMG Strategy — home"
          >
            TMG
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0" role="list">
            {links.map(({ href, labelKey }) => {
              const isActive = pathWithoutLocale.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={`/${locale}${href}`}
                    className={`text-sm font-medium transition-colors duration-200 relative
                      ${isActive
                        ? 'text-[var(--color-ink-primary)] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[1px] after:bg-[var(--color-accent)]'
                        : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]'
                      }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <Button href={`/${locale}/contact`} variant="primary">
              {t('bookCall')}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="w-5 h-[1.5px] bg-[var(--color-ink-primary)] block" />
            <span className="w-5 h-[1.5px] bg-[var(--color-ink-primary)] block" />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
        locale={locale}
        t={t}
      />
    </>
  )
}
