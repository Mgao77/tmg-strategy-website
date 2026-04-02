# TMG Strategy — Website Design Spec
**Date:** 2026-04-02
**Status:** Approved (G3–G8)
**Working directory:** `C:\Users\Mahmoud G\Desktop\Claude Projects\TMG\`

---

## 1. Project Overview

**Client:** TMG Strategy — boutique strategy consulting firm, Dubai, UAE
**Founders:** Mahmoud Gao (Growth Strategy / D2C operator) · Tiba Al-Damen (Commercial Due Diligence / Transaction Advisory)
**Primary goal:** Generate inbound consultation bookings (30-min Calendly call)
**Launch scope:** 6 pages + blog template, English only (Arabic architecture ready)

### Positioning Statement
> TMG Strategy is a boutique consultancy that works with consumer and retail businesses — and the investors who back them — across the GCC.

**Two audiences. One area of deep expertise.**
- Consumer/retail founders → Growth Strategy, Restructuring & Transformation
- PE firms/investors → Commercial Due Diligence

**Core differentiators:**
- Senior partner on every engagement (not delegated to junior teams)
- Operators, not just advisors (Mahmoud built a D2C brand; Tiba closed transactions at the table)
- GCC-native networks and pattern recognition

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router, React 19) | Server Components, ISR |
| Styling | Tailwind CSS v4 | Logical properties for RTL (`ms-`, `ps-` prefixes) |
| Animation | Framer Motion v11 | `LazyMotion` + `domAnimation` bundle (~18KB) |
| CMS | Sanity v3 + `next-sanity` v9 | Founders edit via Sanity Studio web UI |
| i18n | `next-intl` v3 | `[locale]` route segment from day one; Arabic ready |
| Email | Resend + `react-email` | Contact form submissions + confirmation |
| Deployment | Vercel (free tier) | Vercel Analytics enabled |
| SEO | `next-sitemap` + JSON-LD | Organization + WebSite schema in root layout |
| Fonts | `next/font` | Self-hosted, no external requests |

**Key version notes:**
- Framer Motion must be v11.x (React 19 compatibility; v10 breaks)
- Tailwind v4 drops `@layer` directive behavior — do not mix v3 patterns
- `next-intl` middleware must exclude `/api`, `/_next`, `/studio` from matcher
- Framer Motion `AnimatePresence` + App Router `<Suspense>` — test page transitions early

---

## 3. Design Direction

**Archetype:** Editorial (Direction B) with spring physics and accent discipline from Direction A (The Operator).

**Reference aesthetic:** Stripe.com · Vercel.com · high-end financial publications. NOT consulting firm websites.

**One-line brief:** Premium, restrained, editorial — reads as a $150k build, not a template.

---

## 4. Typography

### Font Stack

| Role | Font | Fallback |
|---|---|---|
| Display / Hero headings | `Instrument Serif` | `'Playfair Display', Georgia, serif` |
| Body / UI / Buttons | `Geist` | `'Switzer', 'Helvetica Neue', sans-serif` |
| Code / metadata / keystrokes | `Geist Mono` | `'SF Mono', monospace` |

All fonts loaded via `next/font/google` — no external requests, no layout shift.

### Scale and Treatment

| Element | Size | Weight | Tracking | Line Height |
|---|---|---|---|---|
| Hero H1 | `clamp(3rem, 6vw, 5.5rem)` | 400 (Serif) | `-0.03em` | `1.05` |
| Section H2 | `clamp(2rem, 4vw, 3.5rem)` | 400 (Serif) | `-0.02em` | `1.1` |
| Card heading | `1.25rem` | 600 (Geist) | `-0.01em` | `1.2` |
| Body | `1rem` | 400 (Geist) | `0` | `1.65` |
| Label / eyebrow | `0.6875rem` | 500 (Geist) | `0.08em` | `1.4` |
| Caption / meta | `0.8125rem` | 400 (Geist) | `0` | `1.5` |

**Rules:**
- `text-wrap: balance` on all headlines
- `text-wrap: pretty` on body paragraphs
- Max paragraph width: `65ch`
- Never all-caps headings — sentence case throughout
- Eyebrow labels: lowercase, wide tracking, muted color

---

## 5. Color Palette

### Base

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#F7F6F3` | Page background |
| `--color-surface` | `#FFFFFF` | Card surfaces |
| `--color-border` | `rgba(0,0,0,0.08)` | All borders and dividers |
| `--color-ink-primary` | `#111111` | Primary text |
| `--color-ink-secondary` | `#6B6B6B` | Secondary text, labels |
| `--color-ink-muted` | `#9B9B9B` | Captions, placeholders |

### Accent (single)

| Token | Value | Use |
|---|---|---|
| `--color-accent` | `#C4B49A` | CTA hover state, active nav indicator, one highlight element per page |
| `--color-accent-text` | `#7A6848` | Text on accent backgrounds |

**Rules:**
- One accent color. No others.
- Pure `#000000` and `#FFFFFF` avoided — `#111111` and `#F7F6F3` instead
- Shadows tinted warm, never pure black opacity: `rgba(180, 160, 120, 0.12)`
- No gradients (linear or radial) as hero treatments
- Grain/noise overlay on canvas via fixed `::after` pseudo-element, `opacity: 0.025`, `pointer-events: none`

---

## 6. Layout Principles

- **Container:** `max-w-[1200px]` with `mx-auto px-6 md:px-12`
- **Section padding:** `py-24 md:py-32` minimum — let the design breathe
- **Grid:** CSS Grid for all multi-column structures (no flexbox percentage hacks)
- **Mobile breakpoint:** All asymmetric layouts collapse to `w-full` below `768px`
- **Full-height sections:** `min-h-[100dvh]` only — never `height: 100vh`
- **Border radius:** `8px` on cards/inputs · `4px` on buttons · `9999px` on pill nav and badges
- **No forced equal-height cards** — allow natural content height; pin CTAs to card bottoms via grid

### What to avoid
- 3-column equal card grid as feature row
- Perfectly centered and symmetrical hero
- Elements sitting flat with no overlap or depth
- Random dark sections breaking an otherwise warm-light page

---

## 7. Component Specifications

### Navigation
- Floating pill: `mt-6 mx-auto w-max rounded-full px-6 py-3`
- Background: `bg-white/80 backdrop-blur-md` (sticky only — blur on fixed element, never scrolling)
- Border: `border border-[rgba(0,0,0,0.08)]`
- Active link: accent color underline, not bold weight change
- Mobile: hamburger morphs to × on click; full-screen overlay with staggered link reveal

### Buttons

**Primary (CTA):**
- Background: `#111111` · Text: `#FFFFFF`
- Border radius: `4px`
- Padding: `px-6 py-3`
- Hover: `background → #333333` + `transform: scale(0.99)`
- Active: `transform: scale(0.97)`
- Transition: `300ms cubic-bezier(0.32, 0.72, 0, 1)`

**Secondary / Ghost:**
- Border: `1px solid rgba(0,0,0,0.15)` · Text: `#111111`
- Hover: border darkens, subtle background `rgba(0,0,0,0.04)`

**Text link:**
- Color: `#111111` with underline offset
- Hover: accent color

### Cards
- Background: `#FFFFFF`
- Border: `1px solid rgba(0,0,0,0.08)`
- Border radius: `8px`
- Padding: `24px` to `32px`
- Shadow: `0 2px 12px rgba(180,160,120,0.08)` (warm-tinted, diffuse — not `shadow-md`)
- Hover: shadow shifts to `0 4px 20px rgba(180,160,120,0.14)` over `200ms`
- No `shadow-lg` or `shadow-xl`

### Case Study Cards
Format: Sector tag · Situation (2 sentences) · Outcome (1 result in larger type) · Partner lead badge

### Eyebrow Labels
```
font: Geist 500, 0.6875rem
letter-spacing: 0.08em
color: var(--color-ink-muted)
text-transform: lowercase
```
Example: `consumer · uae`

### Badges / Tags
- Pill shape (`border-radius: 9999px`)
- `font-size: 0.6875rem`, `letter-spacing: 0.05em`
- Background: muted pastel from palette
- Used for: sector labels on case cards, "Perspectives coming soon" tag

### Dividers
- `border-top: 1px solid rgba(0,0,0,0.08)` only
- Never colored or thick

---

## 8. Motion & Animation

**Principle:** Quiet sophistication. Motion is present but never distracting.

### Transitions
- All transitions use `cubic-bezier(0.32, 0.72, 0, 1)` — never `linear` or `ease-in-out`
- Duration: `200ms` for micro-interactions · `600–800ms` for scroll entry

### Scroll Entry
- Trigger: `IntersectionObserver` (never `window.addEventListener('scroll')`)
- Entry: `translateY(16px)` + `opacity: 0` → `translateY(0)` + `opacity: 1`
- Duration: `700ms` with `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger on grid/list items: `animation-delay: calc(var(--index) * 80ms)`

### Page Load
- Hero headline: fade up on mount, `600ms`, slight delay after nav
- No "loading screen" or splash

### Performance Rules
- Animate only `transform` and `opacity` — never `top`, `left`, `width`, `height`
- `will-change: transform` only on actively animating elements, removed after
- `backdrop-blur` only on fixed/sticky elements (nav, mobile menu overlay)
- Grain overlay: `position: fixed; pointer-events: none; z-index: 50` — never on scrolling containers

---

## 9. Iconography

- Icon library: **Phosphor Icons** (Regular weight) — not Lucide, not Feather
- Stroke width: consistent across all icons (do not mix weights)
- Size: `20px` standard UI · `24px` feature sections
- Favicon: TMG wordmark or monogram — must be included at launch

---

## 10. Page Specifications

### 10.1 Homepage

| Section | Content | Notes |
|---|---|---|
| Nav | Floating pill | See component spec |
| Hero | Serif display headline + 1-line sub + CTA button | `min-h-[100dvh]`, headline ~5rem, no background photo |
| What We Do | 3 services, editorial stacked list or 2+1 asymmetric | Not 3-column equal grid |
| Why TMG | 3 differentiators in prose or large-number callouts | No icon grid |
| Selected Work | 2 case cards | Anonymous, see case card spec |
| The Founders | 2 photos + name + 1-sentence role | Link to Who We Are |
| Perspectives | "Perspectives coming soon" — pill badge, muted | Hidden section becomes blog teaser on first post |
| Closing CTA | 1 line copy + Book a call button | Warm section, not a full dark inversion |
| Footer | Wordmark · LinkedIn · Privacy Policy · © 2026 | No link farm |

**Hero headline (draft):**
> *Strategy and commercial advisory for consumer and retail businesses across the GCC.*

**Hero sub (draft):**
> *TMG Strategy is a Dubai-based boutique consultancy founded by two senior practitioners. We work directly with the companies we advise — and the investors who back them.*

### 10.2 What We Do

| Section | Content |
|---|---|
| Page header | 2–3 sentence positioning — all services from same expertise base |
| Growth Strategy | What · Who it's for · Typical engagement scope |
| Commercial Due Diligence | What · Who it's for · Typical deliverable · Tiba credential |
| Restructuring & Transformation | What · Who it's for · Typical engagement |
| How We Work | Small team · direct access · defined scope · not open-ended retainers |
| CTA | Book a call |

### 10.3 Who We Are

| Section | Content |
|---|---|
| Firm intro | 2–3 sentences: what TMG is, why it exists |
| Mahmoud Gao | Photo (B&W headshot primary) · Full bio · Accenture strategy + Mr. Draper founder background |
| Tiba Al-Damen | Photo (white top headshot primary) · Full bio · AT Kearney KSA + EY Transaction Advisory |
| Partner model | 2–3 sentences on two-partner model — no hand-off to junior teams |
| CTA | Book a call |

**Photo treatment:**
- Both headshots desaturated to match warm monochrome palette
- Mahmoud B&W headshot can be used as-is
- Tiba headshot: apply warm desaturation in CSS (`filter: grayscale(40%) sepia(15%)`) to harmonise

### 10.4 Selected Work

| Section | Content |
|---|---|
| Page header | Brief confidentiality framing note |
| Case cards (3–4) | Sector · Situation · Outcome · Partner lead |
| CTA | Book a call |

**Placeholder case records (to be replaced with real engagements):**

**Case 1**
- Sector: Consumer / D2C — UAE
- Situation: Supported a direct-to-consumer apparel brand ahead of a Series A raise. Rebuilt commercial model and channel architecture to reflect sustainable unit economics.
- Outcome: Revenue per customer improved 34% over two quarters.
- Partner: Mahmoud Gao

**Case 2**
- Sector: Food & Beverage — KSA
- Situation: Delivered commercial due diligence for a regional PE firm evaluating a fast-casual restaurant operator at Series B. Assessed market positioning, franchisee quality, and growth runway.
- Outcome: Investment approved with negotiated valuation adjustment. Portfolio company reached break-even ahead of plan.
- Partner: Tiba Al-Damen

**Case 3**
- Sector: Retail / Multi-brand — GCC
- Situation: Engaged by the majority shareholder of a multi-brand retail group to diagnose underperformance and prioritise a commercial reset. Identified three underperforming categories and restructured the buying and margin model.
- Outcome: Gross margin improved 8 percentage points within the first operating year.
- Partner: Mahmoud Gao

**Case 4**
- Sector: Consumer Technology — UAE
- Situation: Supported a growth-stage consumer app with GCC market entry strategy following initial traction in KSA. Defined the UAE go-to-market and identified three partnership channels unavailable to the existing team.
- Outcome: UAE launch delivered first 10,000 users within 60 days of go-live.
- Partner: Tiba Al-Damen

### 10.5 Insights (Blog)

- Built at launch, empty state visible
- Homepage section: pill badge "Perspectives · coming soon" — no full section
- Blog listing page: `/insights` — ready to populate
- Post template: title · date · read time · author (partner name + photo) · body (MDX or Sanity portable text)
- First 3 posts to publish post-launch (from SEO research):
  1. *Building a D2C Brand in the GCC: What the Market Still Gets Wrong*
  2. *Commercial Due Diligence vs. Financial Due Diligence: What's the Difference?*
  3. *What Does a Growth Strategy Consultant Actually Do?*

### 10.6 Contact

- Short intro line: "Talk to us directly."
- Contact form: Name · Company · Email · Message (Resend API)
- Calendly embed: below form, same page
- No phone number unless founders want to add

---

## 11. SEO Implementation

### Meta Tags (per page)

| Page | Title | Description |
|---|---|---|
| Homepage | TMG Strategy \| Strategy Consulting Firm in Dubai | Dubai consultancy specialising in growth strategy, commercial due diligence, and transformation for consumer, retail, and PE clients across the GCC. |
| What We Do | Strategy, CDD & Transformation \| TMG Strategy | Growth strategy, commercial due diligence, and restructuring for consumer and retail businesses across the GCC. |
| Who We Are | About TMG Strategy \| Mahmoud Gao & Tiba Al-Damen | Meet the founding partners of TMG Strategy — a Dubai-based boutique consultancy built on senior operator and transaction advisory experience. |
| Selected Work | Selected Work \| TMG Strategy | Engagements across consumer, retail, and PE in the GCC. |
| Insights | Perspectives \| TMG Strategy | Practical thinking on strategy, commercial due diligence, and the GCC consumer and retail market. |
| Contact | Contact TMG Strategy | Book a conversation with TMG Strategy. |

### Technical SEO
- JSON-LD: `Organization` + `WebSite` schema in root layout
- `next-sitemap` configured to include blog posts dynamically from Sanity
- `robots.txt`: disallow `/studio`
- Google Business Profile: register on launch day
- All images: descriptive `alt` text, `next/image` with `sizes` prop
- Open Graph: `og:title`, `og:description`, `og:image` per page
- `og:image`: 1200×630px, clean wordmark or founder photo on canvas background

---

## 12. Accessibility

- WCAG 2.1 AA minimum
- Focus ring: visible on all interactive elements (not `outline: none`)
- Skip-to-content link: hidden, shown on focus
- Semantic HTML throughout: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`
- `lang="en"` on `<html>`, `dir` set via `next-intl`
- Contrast ratio: all text meets AA (4.5:1 body, 3:1 large text)
- `aria-label` on icon-only buttons
- Form labels: explicit `<label>` elements, not placeholder-only

---

## 13. Internationalization Architecture

- Route structure: `/en/` prefix from day one (even though Arabic ships later)
- `next-intl` middleware handles locale detection and redirect
- `dir` attribute on `<html>` set automatically by locale
- Tailwind v4 logical properties (`ms-`, `me-`, `ps-`, `pe-`) used throughout — no `ml-`, `mr-`, `pl-`, `pr-`
- Sanity schema: locale fields defined upfront with `sanity-plugin-internationalized-array`
- Arabic content: file for 2027+; architecture ready at launch

---

## 14. Photo Assets

### Mahmoud Gao (priority order)
1. `mahmoud_bio pic 2026.jpg` — **Primary headshot** (B&W, turtleneck blazer)
2. `MG bio pic 2026.JPG` — Seamless Commerce Talks event (warmer, smiling)
3. `MG pic 2026 2.jpeg` — On stage speaking (thought leadership context)

### Tiba Al-Damen (priority order)
1. `WhatsApp Image 2026-04-02 at 12.14.39 PM.jpeg` — **Primary headshot** (white top, professional)
2. `IMG_7833.JPEG` — Outdoor portrait, natural (About section / warmer feel)

**Photo treatment rule:** Apply warm desaturation to all headshots for palette consistency. CSS: `filter: grayscale(30%) sepia(10%) brightness(0.97)`. Mahmoud's B&W can be used as-is.

---

## 15. Placeholder Strategy

### Logos
- Client logos: not displayed at launch — no placeholder grid
- Testimonials: not displayed at launch — no placeholder quotes

### Case Studies
- 4 placeholder records provided in Section 10.4 above
- All anonymised by sector/geography
- Founders to review and confirm accuracy before launch or swap for real records

### Legal Pages
- Privacy Policy: required at launch — use a GDPR/UAE PDPL-compliant template
- Terms of Service: optional at launch but recommended
- Both linked in footer

---

## 16. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 200ms |

**Performance notes:**
- Framer Motion: `LazyMotion` with `domAnimation` bundle only
- Images: `next/image` with `priority` on above-fold, `lazy` below
- Fonts: `display: swap` with `next/font` preloading
- No third-party scripts in `<head>` except Vercel Analytics (async)
- Calendly: loaded as `<script async>` — not blocking render

---

## 17. Launch Checklist

- [ ] Domain configured on Vercel (`tmgstrategy.com` or equivalent)
- [ ] Sanity Studio production auth enabled (not open)
- [ ] Google Search Console connected on day one
- [ ] Google Business Profile registered
- [ ] Favicon at all required sizes
- [ ] Privacy Policy page live
- [ ] All `alt` text populated
- [ ] `robots.txt` excludes `/studio`
- [ ] XML sitemap submitted to Search Console
- [ ] JSON-LD structured data validated via Google Rich Results Test
- [ ] Calendly booking link functional
- [ ] Contact form tested (Resend delivery confirmed)
- [ ] Mobile layout tested on iOS Safari (viewport `dvh` units confirmed)
- [ ] Page transitions tested with `AnimatePresence` + App Router
