import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'
import { useLocale } from '@/i18n/localeContext'
import { useSiteData } from '@/i18n/hooks'
import { localizedHref } from '@/lib/routing'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { TechBadge } from './TechBadge'
import { ProjectPlaceholderVisual } from './ProjectPlaceholderVisual'

export function ProjectChapter({ project, index }: { project: Project; index: number }) {
  const locale = useLocale()
  const siteData = useSiteData()
  const t = project.translations[locale]
  const reversed = index % 2 === 1
  const rootRef = useRef<HTMLDivElement>(null)
  const href = localizedHref(`/projects/${project.slug}`, locale)

  useGSAP(
    () => {
      const text = rootRef.current?.querySelector<HTMLElement>('.chapter-text')
      const visual = rootRef.current?.querySelector<HTMLElement>('.chapter-visual')
      if (!text || !visual) return

      if (prefersReducedMotion()) {
        gsap.set(text, { opacity: 1 })
        gsap.set(visual, { clipPath: 'inset(0 0 0 0)' })
        return
      }

      gsap.fromTo(
        text,
        { opacity: 0, x: reversed ? 24 : -24 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'emil-out', scrollTrigger: { trigger: rootRef.current } },
      )
      // A clip-path wipe reads as a more deliberate "reveal" for the
      // visual half than a plain fade — the text keeps the directional
      // slide since a mask reads oddly on running text. No delay: text
      // and visual share the same trigger and start together.
      gsap.fromTo(
        visual,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0 0)',
          duration: 0.8,
          ease: 'emil-io',
          scrollTrigger: { trigger: rootRef.current },
        },
      )
    },
    { scope: rootRef, dependencies: [reversed] },
  )

  return (
    <div
      ref={rootRef}
      className="project-chapter"
      style={{
        padding: 'clamp(2.5rem, 6vw, 4rem) 0',
        borderTop: index === 0 ? 'none' : '1px solid var(--color-line)',
      }}
    >
      <div className="chapter-text" style={{ order: reversed ? 2 : 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '3rem',
            fontWeight: 600,
            color: 'var(--color-line)',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="text-h2" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', marginBottom: '0.75rem' }}>
          {t.title}
        </h3>
        <p className="text-body-lg" style={{ marginBottom: '1.25rem' }}>{t.oneLiner}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.techStack.slice(0, 5).map((tech) => (
            <TechBadge key={tech.label} {...tech} />
          ))}
        </div>
        <Link to={href} className="chapter-link">
          {siteData.home.readCaseStudy} →
        </Link>
      </div>

      <Link
        to={href}
        className="chapter-visual"
        data-cursor-text={siteData.home.cursorViewLabel}
        style={{ order: reversed ? 1 : 2, display: 'block', textDecoration: 'none' }}
      >
        <ProjectPlaceholderVisual categories={project.categories} image={project.image} />
      </Link>
    </div>
  )
}
