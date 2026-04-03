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
