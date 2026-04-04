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
