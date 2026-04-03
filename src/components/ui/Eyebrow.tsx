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
