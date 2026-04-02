# TMG Strategy Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a conversion-optimised, premium editorial website for TMG Strategy — a boutique GCC consulting firm — with 6 pages, Sanity CMS, and a 30-min Calendly booking flow.

**Architecture:** Next.js 15 App Router with `[locale]` route segment for RTL-ready i18n from day one. Sanity v3 as headless CMS. Design tokens in CSS custom properties consumed by Tailwind v4. Framer Motion v11 for scroll-entry and micro-interactions.

**Tech Stack:** Next.js 15 · React 19 · Tailwind CSS v4 · Framer Motion v11 · Sanity v3 · next-intl v3 · Resend · next-sitemap · Phosphor Icons · Vercel

**Working directory:** `C:\Users\Mahmoud G\Desktop\Claude Projects\TMG\`

**Design spec:** `docs/superpowers/specs/2026-04-02-tmg-website-design.md`

---

## File Structure

```
TMG/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx              # Localized root layout (lang/dir attrs, fonts, nav, footer)
│   │   │   ├── page.tsx                # Homepage
│   │   │   ├── what-we-do/
│   │   │   │   └── page.tsx
│   │   │   ├── who-we-are/
│   │   │   │   └── page.tsx
│   │   │   ├── selected-work/
│   │   │   │   └── page.tsx
│   │   │   ├── insights/
│   │   │   │   ├── page.tsx            # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx        # Blog post
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── privacy/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts            # Resend email handler
│   │   ├── studio/
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx            # Sanity Studio (dev only)
│   │   ├── globals.css                 # Design tokens, grain overlay, base resets
│   │   ├── layout.tsx                  # Root layout (grain overlay element)
│   │   └── not-found.tsx              # Custom 404
│   ├── components/
│   │   ├── nav/
│   │   │   ├── Nav.tsx                 # Floating pill nav (desktop)
│   │   │   └── MobileMenu.tsx          # Fullscreen overlay with staggered links
│   │   ├── layout/
│   │   │   ├── Container.tsx           # max-w-[1200px] wrapper
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx              # Primary / Ghost / TextLink variants
│   │   │   ├── Badge.tsx               # Pill badge (sector tags, "coming soon")
│   │   │   ├── Eyebrow.tsx             # Small uppercase label above headings
│   │   │   ├── Divider.tsx             # 1px warm border
│   │   │   └── ScrollReveal.tsx        # IntersectionObserver fade-up wrapper
│   │   ├── sections/
│   │   │   ├── Hero.tsx                # Homepage hero (serif headline + CTA)
│   │   │   ├── HomeServices.tsx        # Homepage 2+1 service preview
│   │   │   ├── WhyTMG.tsx              # 3 differentiators
│   │   │   ├── HomeWork.tsx            # 2 case card teasers
│   │   │   ├── HomeFounders.tsx        # 2 founder photos + names
│   │   │   ├── PerspectivesTeaser.tsx  # "Perspectives · coming soon" badge
│   │   │   └── ClosingCTA.tsx          # Final CTA section before footer
│   │   ├── work/
│   │   │   └── CaseCard.tsx            # Sector · Situation · Outcome · Partner
│   │   ├── founders/
│   │   │   └── FounderBio.tsx          # Photo + bio layout
│   │   ├── insights/
│   │   │   └── PostCard.tsx            # Blog listing card
│   │   └── contact/
│   │       ├── ContactForm.tsx         # Name / Company / Email / Message
│   │       └── CalendlyEmbed.tsx       # Async Calendly script loader
│   ├── lib/
│   │   ├── fonts.ts                    # next/font instances (Instrument Serif, Geist, Geist Mono)
│   │   ├── animations.ts               # Shared Framer Motion variants
│   │   └── sanity/
│   │       ├── client.ts               # createClient config
│   │       ├── queries.ts              # GROQ queries
│   │       └── types.ts                # TypeScript types for Sanity documents
│   ├── i18n/
│   │   ├── routing.ts                  # defineRouting({ locales, defaultLocale })
│   │   └── request.ts                  # getRequestConfig
│   └── middleware.ts                   # next-intl locale detection
├── sanity/
│   ├── schemaTypes/
│   │   ├── post.ts                     # Blog post schema
│   │   ├── caseStudy.ts                # Case study schema
│   │   ├── founder.ts                  # Founder profile schema
│   │   └── index.ts                    # Schema registry
│   └── sanity.config.ts                # Sanity Studio config
├── messages/
│   └── en.json                         # English UI strings
├── public/
│   ├── images/
│   │   ├── mahmoud-headshot.jpg        # Copied from Assets/Photos/Mahmoud/mahmoud_bio pic 2026.jpg
│   │   ├── mahmoud-speaking.jpeg       # Copied from Assets/Photos/Mahmoud/MG pic 2026 2.jpeg
│   │   ├── tiba-headshot.jpeg          # Copied from Assets/Photos/Tiba/WhatsApp Image 2026-04-02 at 12.14.39 PM.jpeg
│   │   └── tiba-outdoor.jpeg           # Copied from Assets/Photos/Tiba/IMG_7833.JPEG
│   ├── favicon.ico
│   ├── icon.svg
│   └── og-image.png                    # 1200×630 Open Graph image
├── next.config.ts
├── tailwind.config.ts                  # Minimal — most config is in globals.css with @theme
├── tsconfig.json
├── next-sitemap.config.js
├── sanity.cli.ts
└── .env.local                          # SANITY_PROJECT_ID, SANITY_DATASET, RESEND_API_KEY, NEXT_PUBLIC_CALENDLY_URL
```

---

## Phase 1: Project Foundation

### Task 1: Scaffold Next.js 15 Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`

- [ ] **Step 1: Run create-next-app**

```bash
cd "C:/Users/Mahmoud G/Desktop/Claude Projects/TMG"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

When prompted:
- "Would you like to use Turbopack?" → **Yes**
- Accept all other defaults

- [ ] **Step 2: Install all project dependencies**

```bash
npm install framer-motion@^11 next-intl@^3 @sanity/client@^6 next-sanity@^9 sanity@^3 @sanity/vision @sanity/image-url resend @react-email/components @phosphor-icons/react next-sitemap
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest
```

- [ ] **Step 4: Verify package.json has correct versions**

Check that `framer-motion` is `^11.x` (not v10 — breaks React 19). Run:
```bash
cat package.json | grep framer-motion
```
Expected output: `"framer-motion": "^11.x.x"`

- [ ] **Step 5: Copy photo assets to public/images/**

```bash
mkdir -p public/images
cp "Assets/Photos/Mahmoud/mahmoud_bio pic 2026.jpg" "public/images/mahmoud-headshot.jpg"
cp "Assets/Photos/Mahmoud/MG pic 2026 2.jpeg" "public/images/mahmoud-speaking.jpeg"
cp "Assets/Photos/Tiba/WhatsApp Image 2026-04-02 at 12.14.39 PM.jpeg" "public/images/tiba-headshot.jpeg"
cp "Assets/Photos/Tiba/IMG_7833.JPEG" "public/images/tiba-outdoor.jpeg"
```

- [ ] **Step 6: Configure Jest**

Create `jest.config.ts`:
```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with all dependencies"
```

---

### Task 2: Config Files

**Files:**
- Modify: `next.config.ts`
- Create: `.env.local`

- [ ] **Step 1: Write next.config.ts**

```typescript
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Sanity Studio route — exclude from i18n
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/studio/:path*', destination: '/studio/:path*' },
      ],
    }
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 2: Create .env.local**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/tmg-strategy/30min
NEXT_PUBLIC_SITE_URL=https://tmgstrategy.com
```

Note: Replace placeholder values after Sanity and Resend accounts are created (Task 23).

- [ ] **Step 3: Commit**

```bash
git add next.config.ts .env.local
git commit -m "feat: add Next.js and environment config"
```

---

### Task 3: i18n Setup (next-intl)

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Create: `messages/en.json`

- [ ] **Step 1: Define locale routing**

Create `src/i18n/routing.ts`:
```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  // Arabic ships later — architecture ready now
})
```

- [ ] **Step 2: Create request config**

Create `src/i18n/request.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as 'en' | 'ar')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 3: Create middleware**

Create `src/middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all paths except internals and static files
    '/((?!_next|api|studio|.*\\..*).*)',
    '/',
    '/(en|ar)/:path*',
  ],
}
```

- [ ] **Step 4: Create English messages file**

Create `messages/en.json`:
```json
{
  "nav": {
    "whatWeDo": "What we do",
    "whoWeAre": "Who we are",
    "selectedWork": "Selected work",
    "insights": "Perspectives",
    "bookCall": "Book a call"
  },
  "footer": {
    "tagline": "Strategy and commercial advisory for consumer and retail businesses across the GCC.",
    "privacy": "Privacy policy",
    "copyright": "© 2026 TMG Strategy. All rights reserved."
  },
  "cta": {
    "bookCall": "Book a 30-minute call",
    "bookCallShort": "Book a call"
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ src/middleware.ts messages/
git commit -m "feat: configure next-intl with en/ar locale architecture"
```

---

### Task 4: Design Tokens and Global Styles

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/lib/fonts.ts`

- [ ] **Step 1: Write fonts.ts**

Create `src/lib/fonts.ts`:
```typescript
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google'

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

- [ ] **Step 2: Write globals.css**

Replace `src/app/globals.css` with:
```css
@import "tailwindcss";

/* ─── Design Tokens ─────────────────────────────────── */
@theme {
  /* Colors */
  --color-canvas: #F7F6F3;
  --color-surface: #FFFFFF;
  --color-border: rgba(0, 0, 0, 0.08);
  --color-ink-primary: #111111;
  --color-ink-secondary: #6B6B6B;
  --color-ink-muted: #9B9B9B;
  --color-accent: #C4B49A;
  --color-accent-text: #7A6848;

  /* Fonts */
  --font-serif: var(--font-serif-var);
  --font-sans: var(--font-sans-var);
  --font-mono: var(--font-mono-var);

  /* Shadows (warm-tinted, never pure black) */
  --shadow-card: 0 2px 12px rgba(180, 160, 120, 0.08);
  --shadow-card-hover: 0 4px 20px rgba(180, 160, 120, 0.14);
  --shadow-nav: 0 1px 24px rgba(180, 160, 120, 0.10);

  /* Easing */
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── Base Resets ────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-canvas);
  color: var(--color-ink-primary);
  font-family: var(--font-sans), 'Helvetica Neue', sans-serif;
  line-height: 1.65;
}

/* ─── Typography Utilities ──────────────────────────── */
.text-display {
  font-family: var(--font-serif), 'Playfair Display', Georgia, serif;
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.05;
  text-wrap: balance;
}

.text-heading {
  font-family: var(--font-serif), 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}

.text-card-heading {
  font-family: var(--font-sans), sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.text-body {
  font-family: var(--font-sans), sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.65;
  text-wrap: pretty;
  max-width: 65ch;
}

.text-eyebrow {
  font-family: var(--font-sans), sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.4;
  color: var(--color-ink-muted);
  text-transform: lowercase;
}

.text-caption {
  font-family: var(--font-sans), sans-serif;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-ink-secondary);
}

/* ─── Focus Ring ─────────────────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ─── Skip Link ──────────────────────────────────────── */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-ink-primary);
  color: white;
  font-size: 0.875rem;
  border-radius: 0 0 4px 4px;
  z-index: 1000;
  transition: top 200ms;
}

.skip-link:focus {
  top: 0;
}

/* ─── Grain Overlay ──────────────────────────────────── */
/* Applied via a fixed div in root layout — see app/layout.tsx */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/lib/fonts.ts
git commit -m "feat: add design tokens, typography utilities, grain overlay"
```

---

## Phase 2: Core UI Primitives

### Task 5: Container and Divider

**Files:**
- Create: `src/components/layout/Container.tsx`
- Create: `src/components/ui/Divider.tsx`
- Create: `src/components/layout/Container.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/layout/Container.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container><p>Test content</p></Container>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies correct max-width class', () => {
    const { container } = render(<Container><span /></Container>)
    expect(container.firstChild).toHaveClass('max-w-[1200px]')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest src/components/layout/Container.test.tsx --no-coverage
```
Expected: FAIL — `Container` not found

- [ ] **Step 3: Implement Container**

Create `src/components/layout/Container.tsx`:
```typescript
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-[1200px] mx-auto px-6 md:px-12 ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Implement Divider**

Create `src/components/ui/Divider.tsx`:
```typescript
export default function Divider({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`border-0 border-t border-[rgba(0,0,0,0.08)] ${className}`}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx jest src/components/layout/Container.test.tsx --no-coverage
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/ src/components/ui/Divider.tsx
git commit -m "feat: add Container and Divider primitives"
```

---

### Task 6: Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Button.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/ui/Button.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders primary variant by default', () => {
    render(<Button>Book a call</Button>)
    const btn = screen.getByRole('button', { name: 'Book a call' })
    expect(btn).toBeInTheDocument()
  })

  it('renders as anchor when href provided', () => {
    render(<Button href="/contact">Contact</Button>)
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('calls onClick handler', async () => {
    const handler = jest.fn()
    render(<Button onClick={handler}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest src/components/ui/Button.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement Button**

Create `src/components/ui/Button.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'text'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  'aria-label'?: string
}

const baseStyles =
  'inline-flex items-center justify-center font-sans text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-ink-primary)] text-white px-6 py-3 rounded-[4px] hover:bg-[#333333] active:scale-[0.97]',
  ghost:
    'border border-[rgba(0,0,0,0.15)] text-[var(--color-ink-primary)] px-6 py-3 rounded-[4px] hover:bg-[rgba(0,0,0,0.04)] hover:border-[rgba(0,0,0,0.25)] active:scale-[0.97]',
  text:
    'text-[var(--color-ink-primary)] underline underline-offset-4 hover:text-[var(--color-accent)] p-0',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const styles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={styles} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest src/components/ui/Button.test.tsx --no-coverage
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Button.test.tsx
git commit -m "feat: add Button component with primary/ghost/text variants"
```

---

### Task 7: Badge and Eyebrow

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Eyebrow.tsx`

- [ ] **Step 1: Implement Badge**

Create `src/components/ui/Badge.tsx`:
```typescript
import { ReactNode } from 'react'

type BadgeColor = 'neutral' | 'blue' | 'green' | 'yellow' | 'red'

interface BadgeProps {
  children: ReactNode
  color?: BadgeColor
  className?: string
}

const colorMap: Record<BadgeColor, string> = {
  neutral: 'bg-[rgba(0,0,0,0.06)] text-[var(--color-ink-secondary)]',
  blue:    'bg-[#E1F3FE] text-[#1F6C9F]',
  green:   'bg-[#EDF3EC] text-[#346538]',
  yellow:  'bg-[#FBF3DB] text-[#956400]',
  red:     'bg-[#FDEBEC] text-[#9F2F2D]',
}

export default function Badge({ children, color = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[0.6875rem] font-medium tracking-[0.05em] ${colorMap[color]} ${className}`}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Implement Eyebrow**

Create `src/components/ui/Eyebrow.tsx`:
```typescript
import { ReactNode } from 'react'

export default function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={`text-eyebrow mb-3 ${className}`} aria-hidden="true">
      {children}
    </p>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Badge.tsx src/components/ui/Eyebrow.tsx
git commit -m "feat: add Badge and Eyebrow UI primitives"
```

---

### Task 8: ScrollReveal Animation Wrapper

**Files:**
- Create: `src/components/ui/ScrollReveal.tsx`
- Create: `src/lib/animations.ts`

- [ ] **Step 1: Write animation variants**

Create `src/lib/animations.ts`:
```typescript
import type { Variants } from 'framer-motion'

// Shared spring easing
export const SPRING_EASE = [0.32, 0.72, 0, 1] as const
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const

// Scroll entry: fade up
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: REVEAL_EASE,
    },
  },
}

// Staggered container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// Staggered child (use inside staggerContainer)
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: REVEAL_EASE,
    },
  },
}

// Hero headline: slightly longer reveal
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: REVEAL_EASE,
      delay: 0.1,
    },
  },
}
```

- [ ] **Step 2: Implement ScrollReveal**

Create `src/components/ui/ScrollReveal.tsx`:
```typescript
'use client'

import { motion, LazyMotion, domAnimation } from 'framer-motion'
import { ReactNode } from 'react'
import { fadeUp } from '@/lib/animations'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: ScrollRevealProps) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: fadeUp.hidden,
          visible: {
            ...fadeUp.visible,
            transition: {
              ...(fadeUp.visible as { transition?: object }).transition,
              delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </LazyMotion>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ScrollReveal.tsx src/lib/animations.ts
git commit -m "feat: add ScrollReveal with Framer Motion LazyMotion"
```

---

## Phase 3: Layout Shell

### Task 9: Root Layouts

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Write root layout (grain overlay)**

Replace `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { instrumentSerif, geist, geistMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com'),
  title: {
    default: 'TMG Strategy | Strategy Consulting Firm in Dubai',
    template: '%s | TMG Strategy',
  },
  description:
    'Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'TMG Strategy',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Grain overlay — fixed, pointer-events-none, never on scroll container */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Write localized layout**

Create `src/app/[locale]/layout.tsx`:
```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/layout/Footer'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <>
      <html lang={locale} dir={dir}>
        <body>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <NextIntlClientProvider messages={messages}>
            <Nav />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  )
}
```

Note: The `<html>` and `<body>` tags here will be merged with the root layout by Next.js. Set `lang` and `dir` attributes on the root `<html>` by using a different approach — pass them as props through `generateStaticParams` or use a `suppressHydrationWarning` pattern. See Next.js docs on i18n layout.

Correct approach — update `src/app/layout.tsx` to accept locale from params, and set `lang`/`dir` there. Revise the locale layout to just wrap with `NextIntlClientProvider`:

Update `src/app/[locale]/layout.tsx`:
```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav locale={locale} />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  )
}
```

Update root `src/app/layout.tsx` to set `lang` and `dir` dynamically. Since the root layout does not have locale access directly, use the `<html>` tag in the locale layout instead — Next.js allows nested `<html>` in the App Router when the root layout omits it. Remove `<html>` and `<body>` from root layout and move them to the locale layout:

Final `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { instrumentSerif, geist, geistMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com'),
  title: {
    default: 'TMG Strategy | Strategy Consulting Firm in Dubai',
    template: '%s | TMG Strategy',
  },
  description:
    'Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'TMG Strategy',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

Final `src/app/[locale]/layout.tsx`:
```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { instrumentSerif, geist, geistMono } from '@/lib/fonts'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-canvas)]">
        <div className="grain-overlay" aria-hidden="true" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <Nav locale={locale} />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/app/[locale]/layout.tsx
git commit -m "feat: configure root and locale layouts with i18n, fonts, grain overlay"
```

---

### Task 10: Navigation

**Files:**
- Create: `src/components/nav/Nav.tsx`
- Create: `src/components/nav/MobileMenu.tsx`

- [ ] **Step 1: Implement Nav**

Create `src/components/nav/Nav.tsx`:
```typescript
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
```

- [ ] **Step 2: Implement MobileMenu**

Create `src/components/nav/MobileMenu.tsx`:
```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/nav/
git commit -m "feat: add floating pill Nav with mobile fullscreen overlay"
```

---

### Task 11: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Implement Footer**

Create `src/components/layout/Footer.tsx`:
```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with wordmark, LinkedIn, privacy link"
```

---

## Phase 4: Homepage

### Task 12: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Implement Hero**

Create `src/components/sections/Hero.tsx`:
```typescript
'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/layout/Container'
import { heroReveal, fadeUp, REVEAL_EASE } from '@/lib/animations'

export default function Hero() {
  return (
    <section
      className="min-h-[100dvh] flex items-center pt-32 pb-24"
      aria-labelledby="hero-headline"
    >
      <Container>
        <LazyMotion features={domAnimation}>
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <m.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="text-eyebrow mb-6"
            >
              dubai · gcc · consumer & retail
            </m.p>

            {/* Headline */}
            <m.h1
              id="hero-headline"
              initial="hidden"
              animate="visible"
              variants={heroReveal}
              className="text-display mb-8"
            >
              Strategy and commercial advisory for consumer and retail businesses across the GCC.
            </m.h1>

            {/* Subheadline */}
            <m.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: fadeUp.hidden,
                visible: {
                  ...fadeUp.visible,
                  transition: { duration: 0.7, ease: REVEAL_EASE, delay: 0.25 },
                },
              }}
              className="text-body text-[var(--color-ink-secondary)] mb-10 max-w-[52ch]"
            >
              TMG Strategy is a Dubai-based boutique consultancy founded by two senior
              practitioners. We work directly with the companies we advise — and the
              investors who back them.
            </m.p>

            {/* CTA */}
            <m.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: REVEAL_EASE, delay: 0.4 },
                },
              }}
              className="flex items-center gap-4"
            >
              <Button href="/en/contact" variant="primary">
                Book a 30-minute call
              </Button>
              <Button href="/en/what-we-do" variant="text">
                What we do →
              </Button>
            </m.div>
          </div>
        </LazyMotion>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with staggered Framer Motion entrance"
```

---

### Task 13: Homepage Services and Why TMG Sections

**Files:**
- Create: `src/components/sections/HomeServices.tsx`
- Create: `src/components/sections/WhyTMG.tsx`

- [ ] **Step 1: Implement HomeServices**

Create `src/components/sections/HomeServices.tsx`:
```typescript
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Divider from '@/components/ui/Divider'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

const services = [
  {
    number: '01',
    title: 'Growth strategy',
    description:
      'We help consumer and retail businesses define where to play, how to win, and how to execute. Market entry, revenue architecture, and go-to-market for founders preparing to scale or raise.',
    href: '/en/what-we-do#growth-strategy',
  },
  {
    number: '02',
    title: 'Commercial due diligence',
    description:
      'Independent commercial assessment of consumer and retail assets ahead of investment. Built for PE firms and investors who need a clear view of what they are actually buying.',
    href: '/en/what-we-do#commercial-due-diligence',
  },
  {
    number: '03',
    title: 'Restructuring & transformation',
    description:
      'Commercial and operational reset for businesses that need to change course. Diagnostic, prioritisation, and a 90-day plan for operators and investors managing a transition.',
    href: '/en/what-we-do#restructuring',
  },
]

export default function HomeServices() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="services-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>what we do</Eyebrow>
          <h2 id="services-heading" className="text-heading mb-16 max-w-xl">
            One area of expertise. Two kinds of clients.
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {services.map((service, index) => (
            <ScrollReveal key={service.number} delay={index * 0.08}>
              <div>
                <Divider />
                <Link
                  href={service.href}
                  className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 hover:opacity-70 transition-opacity duration-200"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <span className="text-eyebrow shrink-0 w-8">{service.number}</span>
                  <div className="flex-1">
                    <h3 className="text-card-heading mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-body text-[var(--color-ink-secondary)]">
                      {service.description}
                    </p>
                  </div>
                  <span className="hidden md:block text-[var(--color-ink-muted)] group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
          <Divider />
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Implement WhyTMG**

Create `src/components/sections/WhyTMG.tsx`:
```typescript
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

const differentiators = [
  {
    label: 'Senior partners, always',
    body: 'Every engagement is led and delivered by Mahmoud or Tiba. No junior teams, no hand-offs, no dilution of expertise.',
  },
  {
    label: 'Operators and advisors',
    body: "Mahmoud built and ran a D2C brand. Tiba closed transactions at the table. We understand the decisions clients face because we have made them.",
  },
  {
    label: 'GCC-native',
    body: 'Built-in networks, market knowledge, and pattern recognition that takes years to develop. We know the region — not from the outside.',
  },
]

export default function WhyTMG() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-surface)]" aria-labelledby="why-tmg-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>why tmg</Eyebrow>
          <h2 id="why-tmg-heading" className="text-heading mb-16 max-w-xl">
            What makes us different is not what we say — it is what we have done.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {differentiators.map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 0.1}>
              <article>
                <h3 className="text-card-heading mb-4">{item.label}</h3>
                <p className="text-body text-[var(--color-ink-secondary)]">{item.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HomeServices.tsx src/components/sections/WhyTMG.tsx
git commit -m "feat: add HomeServices and WhyTMG homepage sections"
```

---

### Task 14: CaseCard Component and HomeWork Section

**Files:**
- Create: `src/components/work/CaseCard.tsx`
- Create: `src/components/sections/HomeWork.tsx`

- [ ] **Step 1: Implement CaseCard**

Create `src/components/work/CaseCard.tsx`:
```typescript
import Badge from '@/components/ui/Badge'

export interface CaseStudy {
  sector: string
  region: string
  situation: string
  outcome: string
  partner: 'Mahmoud Gao' | 'Tiba Al-Damen'
}

export default function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article
      className="bg-[var(--color-surface)] border border-[rgba(0,0,0,0.08)] rounded-[8px] p-8 flex flex-col gap-6 transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Sector badge */}
      <div className="flex items-center gap-2">
        <Badge color="neutral">{study.sector}</Badge>
        <span className="text-eyebrow">· {study.region}</span>
      </div>

      {/* Situation */}
      <p className="text-body text-[var(--color-ink-secondary)] flex-1">
        {study.situation}
      </p>

      {/* Outcome — larger type */}
      <div className="border-t border-[rgba(0,0,0,0.08)] pt-6">
        <p className="text-eyebrow mb-2">outcome</p>
        <p className="font-sans font-semibold text-[1.1rem] leading-snug text-[var(--color-ink-primary)]">
          {study.outcome}
        </p>
      </div>

      {/* Partner */}
      <p className="text-caption">Partner: {study.partner}</p>
    </article>
  )
}
```

- [ ] **Step 2: Implement HomeWork**

Create `src/components/sections/HomeWork.tsx`:
```typescript
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import CaseCard, { type CaseStudy } from '@/components/work/CaseCard'

const featuredWork: CaseStudy[] = [
  {
    sector: 'Consumer / D2C',
    region: 'UAE',
    situation:
      'Supported a direct-to-consumer apparel brand ahead of a Series A raise. Rebuilt the commercial model and channel architecture to reflect sustainable unit economics.',
    outcome: 'Revenue per customer improved 34% over two quarters.',
    partner: 'Mahmoud Gao',
  },
  {
    sector: 'Food & Beverage',
    region: 'KSA',
    situation:
      'Delivered commercial due diligence for a regional PE firm evaluating a fast-casual restaurant operator at Series B. Assessed market positioning, franchisee quality, and growth runway.',
    outcome: 'Investment approved with negotiated valuation adjustment.',
    partner: 'Tiba Al-Damen',
  },
]

export default function HomeWork() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="work-heading">
      <Container>
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <Eyebrow>selected work</Eyebrow>
              <h2 id="work-heading" className="text-heading">
                Recent engagements.
              </h2>
            </div>
            <Link
              href="/en/selected-work"
              className="hidden md:block text-sm font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors duration-200"
            >
              View all →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredWork.map((study, index) => (
            <ScrollReveal key={study.sector + study.region} delay={index * 0.1}>
              <CaseCard study={study} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/work/CaseCard.tsx src/components/sections/HomeWork.tsx
git commit -m "feat: add CaseCard component and HomeWork section"
```

---

### Task 15: Founders Teaser, Perspectives Teaser, Closing CTA

**Files:**
- Create: `src/components/sections/HomeFounders.tsx`
- Create: `src/components/sections/PerspectivesTeaser.tsx`
- Create: `src/components/sections/ClosingCTA.tsx`

- [ ] **Step 1: Implement HomeFounders**

Create `src/components/sections/HomeFounders.tsx`:
```typescript
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

const founders = [
  {
    name: 'Mahmoud Gao',
    role: 'Growth strategy and commercial transformation',
    image: '/images/mahmoud-headshot.jpg',
    alt: 'Mahmoud Gao, founding partner at TMG Strategy',
  },
  {
    name: 'Tiba Al-Damen',
    role: 'Commercial due diligence and transaction advisory',
    image: '/images/tiba-headshot.jpeg',
    alt: 'Tiba Al-Damen, founding partner at TMG Strategy',
  },
]

export default function HomeFounders() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-surface)]" aria-labelledby="founders-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>the partners</Eyebrow>
          <h2 id="founders-heading" className="text-heading mb-16 max-w-xl">
            Senior practitioners. Not a firm that sends juniors.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {founders.map((founder, index) => (
            <ScrollReveal key={founder.name} delay={index * 0.1}>
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-[8px] overflow-hidden shrink-0">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    fill
                    className="object-cover grayscale-[30%] sepia-[10%] brightness-[0.97]"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-[var(--color-ink-primary)] mb-1">
                    {founder.name}
                  </p>
                  <p className="text-caption">{founder.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <Link
            href="/en/who-we-are"
            className="text-sm font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors duration-200"
          >
            About the partners →
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Implement PerspectivesTeaser**

Create `src/components/sections/PerspectivesTeaser.tsx`:
```typescript
import Container from '@/components/layout/Container'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'

export default function PerspectivesTeaser() {
  return (
    <section className="py-16" aria-label="Perspectives">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Eyebrow className="mb-0">perspectives</Eyebrow>
            <Badge color="neutral">coming soon</Badge>
          </div>
          <p className="text-body text-[var(--color-ink-muted)] mt-3 max-w-md">
            Practical thinking on strategy, commercial due diligence, and the GCC consumer and retail market.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Implement ClosingCTA**

Create `src/components/sections/ClosingCTA.tsx`:
```typescript
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export default function ClosingCTA() {
  return (
    <section className="py-24 md:py-32" aria-label="Book a consultation">
      <Container>
        <Divider className="mb-16" />
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-heading max-w-md">
                Ready to talk?
              </h2>
              <p className="text-body text-[var(--color-ink-secondary)] mt-4 max-w-sm">
                A 30-minute call is enough to understand if we are the right fit for your situation.
              </p>
            </div>
            <div className="shrink-0">
              <Button href="/en/contact" variant="primary">
                Book a 30-minute call
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HomeFounders.tsx src/components/sections/PerspectivesTeaser.tsx src/components/sections/ClosingCTA.tsx
git commit -m "feat: add HomeFounders, PerspectivesTeaser, ClosingCTA sections"
```

---

### Task 16: Homepage Assembly

**Files:**
- Create: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Implement homepage**

Create `src/app/[locale]/page.tsx`:
```typescript
import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import HomeServices from '@/components/sections/HomeServices'
import WhyTMG from '@/components/sections/WhyTMG'
import HomeWork from '@/components/sections/HomeWork'
import HomeFounders from '@/components/sections/HomeFounders'
import PerspectivesTeaser from '@/components/sections/PerspectivesTeaser'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'TMG Strategy | Strategy Consulting Firm in Dubai',
  description:
    'Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
  openGraph: {
    title: 'TMG Strategy | Strategy Consulting Firm in Dubai',
    description:
      'Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeServices />
      <WhyTMG />
      <HomeWork />
      <HomeFounders />
      <PerspectivesTeaser />
      <ClosingCTA />
    </>
  )
}
```

- [ ] **Step 2: Start dev server and verify homepage renders**

```bash
npm run dev
```

Open `http://localhost:3000` — verify:
- Nav floating pill visible
- Hero text renders with Instrument Serif font
- All sections scroll into view
- No console errors

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: assemble homepage from all sections"
```

---

## Phase 5: Interior Pages

### Task 17: What We Do Page

**Files:**
- Create: `src/app/[locale]/what-we-do/page.tsx`

- [ ] **Step 1: Implement What We Do page**

Create `src/app/[locale]/what-we-do/page.tsx`:
```typescript
import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import Button from '@/components/ui/Button'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'Strategy, CDD & Transformation',
  description:
    'Growth strategy, commercial due diligence, and restructuring for consumer and retail businesses across the GCC.',
}

const services = [
  {
    id: 'growth-strategy',
    number: '01',
    title: 'Growth strategy',
    audience: 'For consumer and retail founders',
    description:
      'We work with founders and leadership teams to define where to play, how to win, and how to execute. This means making hard choices about markets, channels, and positioning — and building the commercial architecture to deliver on them.',
    scope: [
      'Market sizing and opportunity assessment',
      'Revenue and margin architecture',
      'Go-to-market strategy and channel design',
      'Fundraising narrative and commercial story',
      'Strategic planning and roadmap development',
    ],
  },
  {
    id: 'commercial-due-diligence',
    number: '02',
    title: 'Commercial due diligence',
    audience: 'For PE firms and investors',
    description:
      'We deliver independent commercial assessments of consumer and retail assets ahead of investment decisions. Our work gives deal teams a clear, evidence-based view of market dynamics, competitive position, and growth headroom — so they invest with confidence, not assumptions.',
    scope: [
      'Market attractiveness and competitive landscape',
      'Revenue quality and growth runway assessment',
      'Customer and channel analysis',
      'Management team commercial capability review',
      'Key risk identification and mitigation framing',
    ],
    credential:
      'Tiba Al-Damen led transaction advisory work at EY and strategic advisory at AT Kearney in KSA before co-founding TMG.',
  },
  {
    id: 'restructuring',
    number: '03',
    title: 'Restructuring & transformation',
    audience: 'For operators and investors managing a transition',
    description:
      'When a business needs to change course, we provide the commercial diagnostic and prioritisation that makes transformation executable. We identify the root causes of underperformance, isolate the two or three levers that actually move the business, and build a 90-day plan that teams can act on.',
    scope: [
      'Commercial performance diagnostic',
      'Category, channel, and margin analysis',
      'Restructuring options and trade-off assessment',
      'Priority action plan with ownership and timelines',
      'Ongoing implementation support',
    ],
  },
]

export default function WhatWeDoPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16" aria-labelledby="page-heading">
        <Container>
          <ScrollReveal>
            <Eyebrow>what we do</Eyebrow>
            <h1 id="page-heading" className="text-display max-w-3xl mt-4">
              Three services. One area of expertise.
            </h1>
            <p className="text-body text-[var(--color-ink-secondary)] mt-6 max-w-[52ch]">
              Every engagement we take is rooted in consumer and retail. We do not work across all sectors — we go deep in one.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Services */}
      <section className="pb-24 md:pb-32" aria-label="Our services">
        <Container>
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.05}>
              <div id={service.id} className="py-16 scroll-mt-32">
                <Divider className="mb-16" />
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16">
                  <span className="text-eyebrow">{service.number}</span>
                  <div>
                    <p className="text-eyebrow mb-3">{service.audience}</p>
                    <h2 className="text-heading mb-6">{service.title}</h2>
                    <p className="text-body text-[var(--color-ink-secondary)] mb-8 max-w-[56ch]">
                      {service.description}
                    </p>

                    {/* Scope list */}
                    <ul className="space-y-3 mb-8" role="list">
                      {service.scope.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-body text-[var(--color-ink-secondary)]">
                          <span className="mt-[0.4em] w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {service.credential && (
                      <p className="text-caption italic border-l-2 border-[var(--color-accent)] pl-4 max-w-[48ch]">
                        {service.credential}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </Container>
      </section>

      {/* How We Work */}
      <section className="py-24 md:py-32 bg-[var(--color-surface)]" aria-labelledby="how-we-work">
        <Container>
          <ScrollReveal>
            <Eyebrow>how we work</Eyebrow>
            <h2 id="how-we-work" className="text-heading mb-8 max-w-xl">
              Small team. Direct access. Defined scope.
            </h2>
            <p className="text-body text-[var(--color-ink-secondary)] max-w-[52ch] mb-6">
              We do not run large project teams. Every engagement involves one or both founding partners, directly. Scope is defined at the start — we work to clear deliverables, not open-ended retainers.
            </p>
            <p className="text-body text-[var(--color-ink-secondary)] max-w-[52ch]">
              Most engagements run for six to twelve weeks. Some are shorter diagnostics. Some extend into implementation support. We will always tell you what we think the right scope is — including when we think you do not need us.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <ClosingCTA />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/[locale]/what-we-do/
git commit -m "feat: add What We Do page with three service sections"
```

---

### Task 18: Who We Are Page

**Files:**
- Create: `src/components/founders/FounderBio.tsx`
- Create: `src/app/[locale]/who-we-are/page.tsx`

- [ ] **Step 1: Implement FounderBio**

Create `src/components/founders/FounderBio.tsx`:
```typescript
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface FounderBioProps {
  name: string
  image: string
  alt: string
  bio: string[]
  reversed?: boolean
}

export default function FounderBio({ name, image, alt, bio, reversed = false }: FounderBioProps) {
  return (
    <ScrollReveal>
      <article
        className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start ${reversed ? 'md:[direction:rtl]' : ''}`}
      >
        {/* Photo */}
        <div className={reversed ? '[direction:ltr]' : ''}>
          <div className="relative aspect-[3/4] rounded-[8px] overflow-hidden max-w-sm">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover object-top"
              style={{ filter: 'grayscale(30%) sepia(10%) brightness(0.97)' }}
              sizes="(max-width: 768px) 100vw, 384px"
            />
          </div>
        </div>

        {/* Bio */}
        <div className={reversed ? '[direction:ltr]' : ''}>
          <h2 className="text-heading mb-2">{name}</h2>
          <div className="space-y-4 mt-6">
            {bio.map((paragraph, index) => (
              <p key={index} className="text-body text-[var(--color-ink-secondary)]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}
```

- [ ] **Step 2: Implement Who We Are page**

Create `src/app/[locale]/who-we-are/page.tsx`:
```typescript
import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import FounderBio from '@/components/founders/FounderBio'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'About TMG Strategy | Mahmoud Gao & Tiba Al-Damen',
  description:
    'Meet the founding partners of TMG Strategy — a Dubai-based boutique consultancy built on senior operator and transaction advisory experience.',
}

const mahmoudBio = [
  'Mahmoud Gao is a co-founder of TMG Strategy and leads the firm\'s growth strategy and commercial transformation practice.',
  'Before founding TMG, Mahmoud spent several years at Accenture Strategy, where he advised consumer and retail clients across the GCC on market entry, portfolio strategy, and commercial restructuring.',
  'He subsequently founded Mr. Draper, a direct-to-consumer menswear brand that he built and operated in the UAE. This experience — managing a real business with real unit economics, customer acquisition costs, and margin pressure — shapes every growth strategy engagement TMG takes.',
  'Mahmoud works most closely with founders preparing to scale, raise capital, or enter a new market. He understands what investors look for because he has been on both sides of the table.',
]

const tibaBio = [
  'Tiba Al-Damen is a co-founder of TMG Strategy and leads the firm\'s commercial due diligence and transaction advisory practice.',
  'Tiba began her career at AT Kearney in Saudi Arabia, where she advised government and corporate clients on strategy and transformation across the consumer and public sectors. She subsequently moved into transaction advisory at EY, where she led commercial due diligence engagements for PE firms and strategic acquirers evaluating consumer and retail assets across the GCC.',
  'Her experience spans both sides of the investment process — advising the businesses being evaluated and the investors doing the evaluating. That dual perspective makes TMG\'s CDD work unusually practical.',
  'Tiba works most closely with PE firms and investors who need a rigorous, independent view of a consumer or retail asset before committing capital.',
]

export default function WhoWeArePage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16" aria-labelledby="about-heading">
        <Container>
          <ScrollReveal>
            <Eyebrow>who we are</Eyebrow>
            <h1 id="about-heading" className="text-display max-w-3xl mt-4">
              A firm built on doing, not just advising.
            </h1>
            <p className="text-body text-[var(--color-ink-secondary)] mt-6 max-w-[52ch]">
              TMG Strategy was founded by two practitioners who spent their careers at the intersection of strategy, transactions, and operations in the GCC consumer and retail market.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Founders */}
      <section className="pb-24 md:pb-32" aria-label="Founding partners">
        <Container>
          <Divider className="mb-16" />
          <FounderBio
            name="Mahmoud Gao"
            image="/images/mahmoud-headshot.jpg"
            alt="Mahmoud Gao, co-founder of TMG Strategy"
            bio={mahmoudBio}
          />

          <Divider className="my-20" />

          <FounderBio
            name="Tiba Al-Damen"
            image="/images/tiba-headshot.jpeg"
            alt="Tiba Al-Damen, co-founder of TMG Strategy"
            bio={tibaBio}
            reversed
          />
        </Container>
      </section>

      {/* Partner model note */}
      <section className="py-24 md:py-32 bg-[var(--color-surface)]" aria-labelledby="partner-model">
        <Container>
          <ScrollReveal>
            <Eyebrow>how we work together</Eyebrow>
            <h2 id="partner-model" className="text-heading mb-6 max-w-xl">
              Two partners. No layers.
            </h2>
            <p className="text-body text-[var(--color-ink-secondary)] max-w-[52ch]">
              TMG is a two-partner firm by design. Every client works directly with Mahmoud, Tiba, or both — depending on the nature of the engagement. There is no project team between you and the people with the most experience. That is not a marketing claim. It is how we are structured.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <ClosingCTA />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/founders/ src/app/[locale]/who-we-are/
git commit -m "feat: add Who We Are page with FounderBio component"
```

---

### Task 19: Selected Work Page

**Files:**
- Create: `src/app/[locale]/selected-work/page.tsx`

- [ ] **Step 1: Implement Selected Work page**

Create `src/app/[locale]/selected-work/page.tsx`:
```typescript
import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import CaseCard, { type CaseStudy } from '@/components/work/CaseCard'
import ClosingCTA from '@/components/sections/ClosingCTA'

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Engagements across consumer, retail, and PE in the GCC.',
}

const caseStudies: CaseStudy[] = [
  {
    sector: 'Consumer / D2C',
    region: 'UAE',
    situation:
      'Supported a direct-to-consumer apparel brand ahead of a Series A raise. Rebuilt the commercial model and channel architecture to reflect sustainable unit economics.',
    outcome: 'Revenue per customer improved 34% over two quarters.',
    partner: 'Mahmoud Gao',
  },
  {
    sector: 'Food & Beverage',
    region: 'KSA',
    situation:
      'Delivered commercial due diligence for a regional PE firm evaluating a fast-casual restaurant operator at Series B. Assessed market positioning, franchisee quality, and growth runway.',
    outcome: 'Investment approved with negotiated valuation adjustment. Portfolio company reached break-even ahead of plan.',
    partner: 'Tiba Al-Damen',
  },
  {
    sector: 'Retail / Multi-brand',
    region: 'GCC',
    situation:
      'Engaged by the majority shareholder of a multi-brand retail group to diagnose underperformance and prioritise a commercial reset. Identified three underperforming categories and restructured the buying and margin model.',
    outcome: 'Gross margin improved 8 percentage points within the first operating year.',
    partner: 'Mahmoud Gao',
  },
  {
    sector: 'Consumer Technology',
    region: 'UAE',
    situation:
      'Supported a growth-stage consumer app with GCC market entry strategy following initial traction in KSA. Defined the UAE go-to-market and identified three partnership channels unavailable to the existing team.',
    outcome: 'UAE launch delivered first 10,000 users within 60 days of go-live.',
    partner: 'Tiba Al-Damen',
  },
]

export default function SelectedWorkPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16" aria-labelledby="work-heading">
        <Container>
          <ScrollReveal>
            <Eyebrow>selected work</Eyebrow>
            <h1 id="work-heading" className="text-display max-w-3xl mt-4">
              Engagements across consumer, retail, and PE.
            </h1>
            <p className="text-body text-[var(--color-ink-secondary)] mt-6 max-w-[48ch]">
              Engagements are described without naming clients to protect confidentiality.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Case cards */}
      <section className="pb-24 md:pb-32" aria-label="Case studies">
        <Container>
          <Divider className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.sector + study.region} delay={index * 0.08}>
                <CaseCard study={study} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/[locale]/selected-work/
git commit -m "feat: add Selected Work page with 4 placeholder case studies"
```

---

### Task 20: Contact Page

**Files:**
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/CalendlyEmbed.tsx`
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Write failing test for ContactForm**

Create `src/components/contact/ContactForm.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  it('renders all required fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation error on empty submit', async () => {
    render(<ContactForm />)
    await userEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
  })

  it('shows email format error for invalid email', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email')
    await userEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest src/components/contact/ContactForm.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement ContactForm**

Create `src/components/contact/ContactForm.tsx`:
```typescript
'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface FormData {
  name: string
  company: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required.'
  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.message.trim()) errors.message = 'Message is required.'
  return errors
}

const fieldClass =
  'w-full px-4 py-3 bg-[var(--color-surface)] border border-[rgba(0,0,0,0.12)] rounded-[4px] text-sm text-[var(--color-ink-primary)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-ink-primary)] transition-colors duration-200'

const labelClass = 'block text-sm font-medium text-[var(--color-ink-secondary)] mb-2'

export default function ContactForm() {
  const [data, setData] = useState<FormData>({ name: '', company: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-8 text-center" role="status">
        <p className="font-sans font-semibold text-[var(--color-ink-primary)] mb-2">Message received.</p>
        <p className="text-body text-[var(--color-ink-secondary)]">
          We will be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Your name"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-2 text-[0.8rem] text-[#9F2F2D]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input
            id="company"
            name="company"
            type="text"
            value={data.company}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Your company (optional)"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="email" className={labelClass}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className={fieldClass}
          placeholder="you@company.com"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-[0.8rem] text-[#9F2F2D]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={handleChange}
          rows={5}
          className={`${fieldClass} resize-none`}
          placeholder="Tell us about your situation"
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-2 text-[0.8rem] text-[#9F2F2D]">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="mb-6 text-sm text-[#9F2F2D]">
          Could not send your message. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest src/components/contact/ContactForm.test.tsx --no-coverage
```
Expected: PASS

- [ ] **Step 5: Implement CalendlyEmbed**

Create `src/components/contact/CalendlyEmbed.tsx`:
```typescript
'use client'

import { useEffect } from 'react'

export default function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/tmg-strategy/30min'

  return (
    <div
      className="calendly-inline-widget min-h-[700px] rounded-[8px] overflow-hidden border border-[rgba(0,0,0,0.08)]"
      data-url={`${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=F7F6F3&text_color=111111&primary_color=C4B49A`}
    />
  )
}
```

- [ ] **Step 6: Implement contact API route**

Create `src/app/api/contact/route.ts`:
```typescript
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { name, company, email, message } = await request.json()

  // Basic server-side validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'TMG Strategy Website <noreply@tmgstrategy.com>',
      to: ['hello@tmgstrategy.com'],
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` at ${company}` : ''}`,
      text: `Name: ${name}\nCompany: ${company || 'Not provided'}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

- [ ] **Step 7: Implement Contact page**

Create `src/app/[locale]/contact/page.tsx`:
```typescript
import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Eyebrow from '@/components/ui/Eyebrow'
import Divider from '@/components/ui/Divider'
import ContactForm from '@/components/contact/ContactForm'
import CalendlyEmbed from '@/components/contact/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Contact TMG Strategy',
  description: 'Book a conversation with TMG Strategy.',
}

export default function ContactPage() {
  return (
    <section className="pt-40 pb-24 md:pb-32" aria-labelledby="contact-heading">
      <Container>
        <ScrollReveal>
          <Eyebrow>get in touch</Eyebrow>
          <h1 id="contact-heading" className="text-display max-w-2xl mt-4 mb-6">
            Talk to us directly.
          </h1>
          <p className="text-body text-[var(--color-ink-secondary)] max-w-[48ch] mb-16">
            A 30-minute call is enough to understand if we are the right fit. Use the form below or book directly in the calendar.
          </p>
        </ScrollReveal>

        <Divider className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <h2 className="text-card-heading mb-8">Send a message</h2>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-card-heading mb-8">Book a call</h2>
            <CalendlyEmbed />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/contact/ src/app/[locale]/contact/ src/app/api/
git commit -m "feat: add Contact page with form validation and Calendly embed"
```

---

## Phase 6: Sanity CMS

### Task 21: Sanity Project Setup

**Files:**
- Create: `sanity.cli.ts`
- Create: `sanity/sanity.config.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity/schemaTypes/post.ts`
- Create: `sanity/schemaTypes/caseStudy.ts`
- Create: `sanity/schemaTypes/founder.ts`

- [ ] **Step 1: Initialize Sanity project**

Go to [sanity.io/manage](https://sanity.io/manage) and create a new project named "TMG Strategy". Note the `projectId`.

Update `.env.local` with the real project ID:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
```

- [ ] **Step 2: Create sanity.cli.ts**

Create `sanity.cli.ts`:
```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: 'production',
  },
})
```

- [ ] **Step 3: Create post schema**

Create `sanity/schemaTypes/post.ts`:
```typescript
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      options: {
        list: [
          { title: 'Mahmoud Gao', value: 'mahmoud-gao' },
          { title: 'Tiba Al-Damen', value: 'tiba-al-damen' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title (optional override)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description (optional override)',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author' },
  },
})
```

- [ ] **Step 4: Create caseStudy schema**

Create `sanity/schemaTypes/caseStudy.ts`:
```typescript
import { defineField, defineType } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'sector', title: 'Sector', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'region', title: 'Region', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'situation', title: 'Situation', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'outcome', title: 'Outcome', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'partner',
      title: 'Partner lead',
      type: 'string',
      options: {
        list: [
          { title: 'Mahmoud Gao', value: 'Mahmoud Gao' },
          { title: 'Tiba Al-Damen', value: 'Tiba Al-Damen' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
```

- [ ] **Step 5: Create schema registry**

Create `sanity/schemaTypes/index.ts`:
```typescript
import { postType } from './post'
import { caseStudyType } from './caseStudy'

export const schemaTypes = [postType, caseStudyType]
```

- [ ] **Step 6: Create Sanity Studio config**

Create `sanity/sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'tmg-strategy',
  title: 'TMG Strategy',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 7: Create Sanity Studio route in Next.js**

Create `src/app/studio/[[...tool]]/page.tsx`:
```typescript
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 8: Commit**

```bash
git add sanity/ src/app/studio/ sanity.cli.ts
git commit -m "feat: add Sanity CMS schema and Studio route"
```

---

### Task 22: Sanity Client and Queries

**Files:**
- Create: `src/lib/sanity/client.ts`
- Create: `src/lib/sanity/queries.ts`
- Create: `src/lib/sanity/types.ts`

- [ ] **Step 1: Create Sanity client**

Create `src/lib/sanity/client.ts`:
```typescript
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})
```

- [ ] **Step 2: Create TypeScript types**

Create `src/lib/sanity/types.ts`:
```typescript
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
```

- [ ] **Step 3: Create GROQ queries**

Create `src/lib/sanity/queries.ts`:
```typescript
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
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/sanity/
git commit -m "feat: add Sanity client, GROQ queries, and TypeScript types"
```

---

### Task 23: Insights Pages

**Files:**
- Create: `src/components/insights/PostCard.tsx`
- Create: `src/app/[locale]/insights/page.tsx`
- Create: `src/app/[locale]/insights/[slug]/page.tsx`

- [ ] **Step 1: Implement PostCard**

Create `src/components/insights/PostCard.tsx`:
```typescript
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
```

- [ ] **Step 2: Implement Insights listing page**

Create `src/app/[locale]/insights/page.tsx`:
```typescript
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
```

- [ ] **Step 3: Implement blog post page**

Create `src/app/[locale]/insights/[slug]/page.tsx`:
```typescript
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
          {/* Header */}
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

          {/* Body */}
          <div className="prose prose-lg max-w-2xl prose-headings:font-serif prose-headings:font-normal prose-p:text-[var(--color-ink-secondary)] prose-p:leading-[1.65]">
            <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} />
          </div>
        </Container>
      </article>
      <ClosingCTA />
    </>
  )
}
```

Note: Install `@tailwindcss/typography` for the `prose` classes:
```bash
npm install -D @tailwindcss/typography
```

Add to `globals.css`:
```css
@plugin "@tailwindcss/typography";
```

- [ ] **Step 4: Commit**

```bash
git add src/components/insights/ src/app/[locale]/insights/
git commit -m "feat: add Insights listing and post pages with Sanity PortableText"
```

---

## Phase 7: SEO and Sitemap

### Task 24: JSON-LD Structured Data

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Implement JSON-LD component**

Create `src/components/seo/JsonLd.tsx`:
```typescript
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
```

- [ ] **Step 2: Add JsonLd to locale layout head**

Modify `src/app/[locale]/layout.tsx` — add to the `<head>` section. Since App Router layout doesn't have explicit `<head>`, export it as metadata or use Next.js `<Head>` pattern. Use Next.js `Script` component approach:

In the locale layout, import and render `<JsonLd />` directly in the layout body (Next.js will hoist `<script>` tags):
```typescript
// Add to imports:
import JsonLd from '@/components/seo/JsonLd'

// Add inside the layout return, before NextIntlClientProvider:
<JsonLd />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/seo/
git commit -m "feat: add Organization and WebSite JSON-LD structured data"
```

---

### Task 25: Sitemap and Robots

**Files:**
- Create: `next-sitemap.config.js`

- [ ] **Step 1: Configure next-sitemap**

Create `next-sitemap.config.js`:
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
    ],
  },
  // Exclude locale-prefixed duplicates except /en/
  exclude: ['/ar/*', '/ar'],
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || 'https://tmgstrategy.com',
      hreflang: 'en',
    },
  ],
}
```

- [ ] **Step 2: Add postbuild script to package.json**

In `package.json`, update scripts:
```json
"scripts": {
  "build": "next build",
  "postbuild": "next-sitemap",
  "start": "next start",
  "dev": "next dev --turbopack",
  "lint": "next lint",
  "test": "jest"
}
```

- [ ] **Step 3: Commit**

```bash
git add next-sitemap.config.js package.json
git commit -m "feat: add next-sitemap with robots.txt generation"
```

---

## Phase 8: Privacy Policy and 404

### Task 26: Privacy Policy and Custom 404

**Files:**
- Create: `src/app/[locale]/privacy/page.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Implement Privacy Policy page**

Create `src/app/[locale]/privacy/page.tsx`:
```typescript
import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TMG Strategy privacy policy.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-24 md:pb-32">
      <Container>
        <ScrollReveal>
          <h1 className="text-heading mb-12">Privacy policy</h1>
          <div className="prose max-w-2xl text-[var(--color-ink-secondary)]">
            <p className="text-caption mb-8">Last updated: April 2026</p>

            <h2 className="text-card-heading mt-10 mb-4">1. Data we collect</h2>
            <p className="text-body mb-6">
              When you submit the contact form on this website, we collect your name, email address, company name (if provided), and the message you send. We do not use cookies for tracking, advertising, or analytics beyond basic server-side access logs.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">2. How we use your data</h2>
            <p className="text-body mb-6">
              We use the information you provide solely to respond to your enquiry. We do not share, sell, or transfer your personal data to third parties, except where required by law.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">3. Data retention</h2>
            <p className="text-body mb-6">
              Contact form submissions are retained for as long as necessary to manage our client relationships. You may request deletion of your data at any time by emailing us.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">4. Your rights</h2>
            <p className="text-body mb-6">
              Under applicable data protection law (including the UAE PDPL and, where applicable, GDPR), you have the right to access, correct, or delete personal data we hold about you. To exercise these rights, email us at{' '}
              <a href="mailto:hello@tmgstrategy.com" className="underline hover:text-[var(--color-accent)]">
                hello@tmgstrategy.com
              </a>.
            </p>

            <h2 className="text-card-heading mt-10 mb-4">5. Contact</h2>
            <p className="text-body">
              TMG Strategy, Dubai, UAE.{' '}
              <a href="mailto:hello@tmgstrategy.com" className="underline hover:text-[var(--color-accent)]">
                hello@tmgstrategy.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Implement custom 404**

Create `src/app/not-found.tsx`:
```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/privacy/ src/app/not-found.tsx
git commit -m "feat: add Privacy Policy page and custom 404"
```

---

## Phase 9: Performance and Accessibility

### Task 27: Favicon and OG Image

**Files:**
- Create: `public/favicon.ico`
- Create: `public/icon.svg`
- Create: `public/og-image.png`

- [ ] **Step 1: Create favicon**

Create `public/icon.svg` with a minimal TMG monogram:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="4" fill="#111111"/>
  <text x="5" y="23" font-family="Georgia, serif" font-size="16" fill="#F7F6F3" font-weight="400">T</text>
</svg>
```

Note: For a production-quality favicon, generate all required sizes (16×16, 32×32, 180×180 Apple touch) using a tool like [realfavicongenerator.net](https://realfavicongenerator.net) after the site is built. Place the resulting `favicon.ico` in `public/`.

- [ ] **Step 2: Create og:image placeholder**

Create `public/og-image.png` — a 1200×630 PNG. At minimum, create a simple image with:
- `#F7F6F3` background
- "TMG Strategy" in `#111111` text centred
- Subtitle: "Strategy Consulting · Dubai · GCC"

This can be done with any image editor or created programmatically. A placeholder that prevents a blank OG image is sufficient for launch.

Note: For a polished OG image, use `next/og` with `ImageResponse` for dynamic generation per page. This is a post-launch improvement.

- [ ] **Step 3: Verify meta tags in root layout**

Confirm `src/app/layout.tsx` `metadata` object includes:
- `metadataBase` with the production domain
- Default `og:image` pointing to `/og-image.png`
- Correct `title.template`

- [ ] **Step 4: Commit**

```bash
git add public/favicon.ico public/icon.svg public/og-image.png
git commit -m "feat: add favicon and og:image"
```

---

### Task 28: Lighthouse Audit and Performance Pass

**Files:**
- Modify: various components (only if issues found)

- [ ] **Step 1: Build for production**

```bash
npm run build
```

Expected: Build completes with no errors. Any TypeScript errors must be resolved before proceeding.

- [ ] **Step 2: Run production server**

```bash
npm run start
```

- [ ] **Step 3: Run Lighthouse**

Open Chrome DevTools → Lighthouse → run for:
- `http://localhost:3000/en` (Homepage)
- `http://localhost:3000/en/what-we-do`
- `http://localhost:3000/en/contact`

Target scores: Performance 90+, Accessibility 95+, SEO 100.

- [ ] **Step 4: Fix any Lighthouse failures**

Common issues to check:
- **Images without `sizes` prop** — add `sizes` to all `next/image` components
- **Missing `aria-label` on icon buttons** — check nav hamburger and close buttons
- **Colour contrast failures** — verify `--color-ink-muted` (#9B9B9B) against canvas (#F7F6F3) meets 4.5:1 for small text. If not, darken to `#888888`
- **`<html>` missing `lang` attribute** — verify `lang={locale}` is rendering
- **Render-blocking resources** — Tailwind v4 should be zero; check for any stray `<link rel="stylesheet">` 
- **LCP image not priority** — if hero section has an image, add `priority` prop

- [ ] **Step 5: Run full test suite**

```bash
npm run test
```

Expected: All tests pass.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: performance pass and Lighthouse fixes"
```

---

## Phase 10: Deployment

### Task 29: Vercel Deployment

- [ ] **Step 1: Push to GitHub**

Create a new repository at github.com named `tmg-strategy-website` (private). Then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/tmg-strategy-website.git
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import the `tmg-strategy-website` GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (default)
5. Add all environment variables from `.env.local` to Vercel project settings

- [ ] **Step 3: Configure custom domain**

In Vercel project settings → Domains:
- Add `tmgstrategy.com` (or the actual domain)
- Follow Vercel's DNS configuration instructions
- Verify SSL certificate is issued

- [ ] **Step 4: Post-deployment verification**

After deploy completes:
- [ ] Visit production URL — verify homepage loads
- [ ] Submit contact form — verify email received via Resend
- [ ] Test Calendly embed — verify it loads
- [ ] Check `https://tmgstrategy.com/sitemap.xml` — verify all pages listed
- [ ] Check `https://tmgstrategy.com/robots.txt` — verify `/studio` is disallowed
- [ ] Run Google Rich Results Test on homepage URL
- [ ] Open Google Search Console → Add property → submit sitemap

- [ ] **Step 5: Register Google Business Profile**

Go to [business.google.com](https://business.google.com) → Add business:
- Business name: TMG Strategy
- Category: Management Consulting
- Location: Dubai, UAE
- Website: `https://tmgstrategy.com`

---

## Self-Review Against Spec

**Spec section coverage check:**

| Spec Section | Covered in Plan |
|---|---|
| Tech stack (§2) | Task 1 — exact versions, all packages |
| Typography (§4) | Task 4 — fonts.ts, CSS utilities |
| Color palette (§5) | Task 4 — CSS custom properties in @theme |
| Layout principles (§6) | Task 5 — Container, section padding in all components |
| Nav component (§7) | Task 10 — floating pill, mobile overlay |
| Buttons (§7) | Task 6 — primary/ghost/text variants |
| Cards (§7) | Task 14 — CaseCard with warm-tinted shadow |
| Motion/animation (§8) | Task 8 — ScrollReveal, animations.ts, LazyMotion |
| Iconography (§9) | Phosphor Icons imported in Nav (hamburger); no Lucide/Feather |
| Homepage (§10.1) | Tasks 12–16 |
| What We Do (§10.2) | Task 17 |
| Who We Are (§10.3) | Task 18 — FounderBio with photo treatment |
| Selected Work (§10.4) | Task 19 — 4 placeholder case records |
| Insights (§10.5) | Task 23 — listing + post template |
| Contact (§10.6) | Task 20 — form + Calendly |
| SEO metadata (§11) | Tasks 24, 25 + page-level metadata in each page file |
| Accessibility (§12) | Skip link (Task 9), focus rings (Task 4), form labels (Task 20), aria-labels throughout |
| i18n architecture (§13) | Task 3 — next-intl, [locale] routing, logical properties |
| Photo assets (§14) | Task 1 Step 5 — copied to public/images/ |
| Legal pages (§15) | Task 26 — Privacy Policy |
| Performance targets (§16) | Task 28 — Lighthouse audit task |
| Launch checklist (§17) | Task 29 — Vercel deployment and verification |
