interface LogoProps {
  variant?: 'nav' | 'footer'
  className?: string
}

export default function Logo({ variant = 'nav', className = '' }: LogoProps) {
  if (variant === 'footer') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 120"
        width="220"
        height="83"
        className={className}
        aria-label="TMG Strategy"
        role="img"
      >
        {/* Hairline frame */}
        <rect x="1" y="1" width="318" height="118" fill="none" stroke="currentColor" strokeWidth="0.5" />
        {/* TMG wordmark */}
        <text
          x="160"
          y="68"
          fontFamily="'Palatino Linotype', 'Book Antiqua', Georgia, serif"
          fontSize="62"
          fontWeight="400"
          fill="currentColor"
          letterSpacing="10"
          textAnchor="middle"
        >
          TMG
        </text>
        {/* Divider rule */}
        <line x1="90" y1="78" x2="230" y2="78" stroke="currentColor" strokeWidth="0.4" opacity="0.35" />
        {/* Strategy subtext */}
        <text
          x="160"
          y="96"
          fontFamily="'Palatino Linotype', 'Book Antiqua', Georgia, serif"
          fontSize="8"
          fill="currentColor"
          letterSpacing="5"
          textAnchor="middle"
          opacity="0.5"
        >
          STRATEGY
        </text>
      </svg>
    )
  }

  // Nav variant — compact, no frame, just the wordmark
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 32"
      width="90"
      height="24"
      className={className}
      aria-label="TMG Strategy"
      role="img"
    >
      <text
        x="60"
        y="24"
        fontFamily="'Palatino Linotype', 'Book Antiqua', Georgia, serif"
        fontSize="26"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="4"
        textAnchor="middle"
      >
        TMG
      </text>
    </svg>
  )
}
