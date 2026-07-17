import type { ProjectCategory } from '@/data/projects'

const categoryColor: Record<ProjectCategory, string> = {
  'ai-agents': 'var(--color-accent)',
  rag: 'var(--color-accent-3)',
  'backend-cloud': 'var(--color-accent-2)',
  automation: 'var(--color-accent)',
}

/**
 * Real screenshots only exist for a handful of these projects — rather than
 * an apologetic empty box for the rest, this is a deliberate visual that
 * says "the code is the demo": a dot-grid + circuit-corner treatment tinted
 * per category, with a prominent GitHub link. When a real screenshot IS
 * available (`image`), it takes over the same frame instead.
 */
export function ProjectPlaceholderVisual({ categories, image }: { categories: ProjectCategory[]; image?: string }) {
  const accent = categoryColor[categories[0]] ?? 'var(--color-accent)'

  if (image) {
    return (
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          borderRadius: '0.75rem',
          border: '1px solid var(--color-line)',
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16 / 10',
        borderRadius: '0.75rem',
        background: 'var(--color-bg-warm)',
        border: '1px solid var(--color-line)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="circuit-corner tl" style={{ borderColor: accent }} />
      <div className="circuit-corner tr" style={{ borderColor: accent }} />
      <div className="circuit-corner bl" style={{ borderColor: accent }} />
      <div className="circuit-corner br" style={{ borderColor: accent }} />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${accent} 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
          opacity: 0.12,
        }}
      />
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-ink-muted)', opacity: 0.5 }} aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.02c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12" />
      </svg>
    </div>
  )
}
