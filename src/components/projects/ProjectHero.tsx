import type { Project } from '@/data/projects'
import { useLocale } from '@/i18n/localeContext'
import { useSiteData } from '@/i18n/hooks'
import { TechBadge } from './TechBadge'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function ProjectHero({ project }: { project: Project }) {
  const locale = useLocale()
  const siteData = useSiteData()
  const t = project.translations[locale]
  const statusLabel = project.status === 'live'
    ? siteData.projectDetail.statusLabels.live
    : project.status === 'demo'
      ? siteData.projectDetail.statusLabels.demo
      : siteData.projectDetail.statusLabels.codeSample

  return (
    <header style={{ paddingTop: '8rem', paddingBottom: '2.5rem' }}>
      <div className="container-main">
        <p className="text-label" style={{ marginBottom: '0.75rem' }}>{statusLabel}</p>
        <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{t.title}</h1>
        <p className="text-body-lg" style={{ maxWidth: '48rem', marginBottom: '1.5rem' }}>{t.oneLiner}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {project.techStack.map((tech) => (
            <TechBadge key={tech.label} {...tech} />
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <MagneticButton href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            {siteData.projectDetail.viewOnGithub} →
          </MagneticButton>
          {project.liveUrl && (
            <MagneticButton href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
              {locale === 'es' ? 'Ver en vivo' : 'View live'} →
            </MagneticButton>
          )}
        </div>
      </div>
    </header>
  )
}
