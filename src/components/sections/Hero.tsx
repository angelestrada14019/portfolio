import { lazy, Suspense, useRef } from 'react'
import SplitType from 'split-type'
import { useGSAP } from '@gsap/react'
import { useSiteData } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'
import { localizedHref } from '@/lib/routing'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { MagneticButton } from '@/components/ui/MagneticButton'

// Lazy-loaded so the ~230KB three-vendor chunk never competes with first paint.
const NodeNetworkScene = lazy(() =>
  import('@/three/NodeNetworkScene').then((m) => ({ default: m.NodeNetworkScene }))
)

export function Hero() {
  const siteData = useSiteData()
  const locale = useLocale()
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  // First-time-only entrance (once per page load, not a repeated
  // interaction) — this is exactly where the "delight budget" from the
  // animation standards allows a longer, more deliberate sequence.
  useGSAP(
    () => {
      const eyebrow = contentRef.current?.querySelector<HTMLElement>('.hero-eyebrow')
      const subhead = contentRef.current?.querySelector<HTMLElement>('.hero-subhead')
      const ctas = contentRef.current?.querySelector<HTMLElement>('.hero-ctas')
      const headlineEl = headlineRef.current
      if (!headlineEl || !eyebrow || !subhead || !ctas) return

      // Splitting by lines alone drops the space at line-break boundaries
      // (adjacent words end up in separate block-level line divs with no
      // whitespace between them) — also splitting into words preserves it.
      const split = new SplitType(headlineEl, { types: ['lines', 'words'] })
      const lines = split.lines ?? []
      // split-type doesn't wrap each line in its own mask box, so a
      // translateY on the line itself would just move — never clip —
      // wrapping it ourselves in an overflow:hidden box is what makes
      // the line actually reveal from behind an edge.
      lines.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        line.parentNode?.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })

      let tl: gsap.core.Timeline | undefined

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0, opacity: 1 })
        gsap.set([eyebrow, subhead, ctas], { opacity: 1, y: 0 })
      } else {
        tl = gsap.timeline({ delay: 0.1 })
        tl.fromTo(eyebrow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'emil-out' })
          .fromTo(
            lines,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'emil-out' },
            '-=0.2',
          )
          .fromTo(subhead, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'emil-out' }, '-=0.35')
          .fromTo(ctas, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'emil-out' }, '-=0.3')
      }

      return () => {
        tl?.kill()
        split.revert()
      }
    },
    { scope: contentRef },
  )

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        paddingTop: '8rem',
        paddingBottom: 'var(--spacing-section)',
        overflow: 'hidden',
      }}
    >
      <div className="circuit-corner tl" />
      <div className="circuit-corner tr" />

      <div className="container-main hero-grid">
        <div className="hero-content" ref={contentRef}>
          <p className="text-label hero-eyebrow" style={{ marginBottom: '1.25rem' }}>{siteData.hero.eyebrow}</p>
          <h1 ref={headlineRef} className="text-display" style={{ marginBottom: '1.5rem' }}>{siteData.hero.headline}</h1>
          <p className="text-body-lg hero-subhead" style={{ maxWidth: '38rem', marginBottom: '2.25rem' }}>{siteData.hero.subhead}</p>
          <div className="hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <MagneticButton href={localizedHref('/projects', locale)}>
              {siteData.hero.ctaPrimary} →
            </MagneticButton>
            <MagneticButton href={localizedHref('/about', locale)} variant="ghost">
              {siteData.hero.ctaSecondary}
            </MagneticButton>
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%', height: 'clamp(320px, 42vw, 480px)' }} className="hero-canvas">
          <Suspense fallback={null}>
            <NodeNetworkScene />
          </Suspense>
        </div>
      </div>

      <div className="hero-signal-strip" />
    </section>
  )
}
