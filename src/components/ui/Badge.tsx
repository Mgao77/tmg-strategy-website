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
