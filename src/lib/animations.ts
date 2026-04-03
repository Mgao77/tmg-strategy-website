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
