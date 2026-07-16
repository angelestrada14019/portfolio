import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteData } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'
import { localizedHref } from '@/lib/routing'
import { getProjectBySlug } from '@/data/projects'
import { ProjectHero } from '@/components/projects/ProjectHero'
import { Reveal } from '@/components/ui/Reveal'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const locale = useLocale()
  const siteData = useSiteData()
  const project = slug ? getProjectBySlug(slug) : undefined

  // Called unconditionally further down via usePageMeta — guard the lookup,
  // not the hook, to keep hook order stable across renders.
  const t = project?.translations[locale]
  usePageMeta(
    t ? `${t.title} — Angel Estrada` : siteData.meta.projects.title,
    t ? t.oneLiner : siteData.meta.projects.description,
  )

  if (!project || !t) return <NotFound />

  return (
    <div style={{ paddingBottom: 'var(--spacing-section)' }}>
      <ProjectHero project={project} />

      <div className="container-main" style={{ maxWidth: '48rem' }}>
        {t.description.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-body-lg" style={{ marginBottom: '1.25rem' }}>{paragraph}</p>
          </Reveal>
        ))}

        <Link
          to={localizedHref('/projects', locale)}
          className="btn-ghost"
          style={{ marginTop: '1.5rem', display: 'inline-flex' }}
        >
          ← {siteData.projectDetail.backLink}
        </Link>
      </div>
    </div>
  )
}
