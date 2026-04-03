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
