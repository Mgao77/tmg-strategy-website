'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: ReadonlyArray<{ href: string; labelKey: string }>
  locale: string
  t: (key: string) => string
}

export default function MobileMenu({ isOpen, onClose, links, locale, t }: MobileMenuProps) {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-3xl flex flex-col px-6 pt-24 pb-12"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-full"
              aria-label="Close menu"
            >
              <span className="relative w-5 h-5">
                <span className="absolute inset-0 w-full h-[1.5px] bg-[var(--color-ink-primary)] top-1/2 rotate-45" />
                <span className="absolute inset-0 w-full h-[1.5px] bg-[var(--color-ink-primary)] top-1/2 -rotate-45" />
              </span>
            </button>

            {/* Staggered nav links */}
            <nav aria-label="Mobile navigation">
              <ul className="list-none m-0 p-0 space-y-2" role="list">
                {links.map(({ href, labelKey }, index) => (
                  <m.li
                    key={href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={`/${locale}${href}`}
                      onClick={onClose}
                      className="block text-[2rem] font-serif font-normal text-[var(--color-ink-primary)] hover:text-[var(--color-accent)] transition-colors duration-200 py-2"
                    >
                      {t(labelKey)}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-auto"
            >
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                className="w-full justify-center py-4 text-base"
                onClick={onClose}
              >
                {t('bookCall')}
              </Button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
