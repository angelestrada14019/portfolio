import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'
import { useLocale } from '@/i18n/localeContext'
import { localizedHref } from '@/lib/routing'
import { TechBadge } from './TechBadge'
import { ProjectPlaceholderVisual } from './ProjectPlaceholderVisual'

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale()
  const t = project.translations[locale]

  return (
    <Link
      to={localizedHref(`/projects/${project.slug}`, locale)}
      className="project-card"
      style={{ display: 'block', padding: '1.25rem', textDecoration: 'none' }}
    >
      <ProjectPlaceholderVisual categories={project.categories} image={project.image} />
      <h3 className="text-h2" style={{ fontSize: '1.25rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>
        {t.title}
      </h3>
      <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>{t.oneLiner}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {project.techStack.slice(0, 4).map((tech) => (
          <TechBadge key={tech.label} {...tech} />
        ))}
      </div>
    </Link>
  )
}
