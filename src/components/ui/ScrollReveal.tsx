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
