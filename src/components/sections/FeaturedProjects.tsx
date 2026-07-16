import { useSiteData } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'
import { localizedHref } from '@/lib/routing'
import { getFeaturedProjects } from '@/data/projects'
import { ProjectChapter } from '@/components/projects/ProjectChapter'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function FeaturedProjects() {
  const siteData = useSiteData()
  const locale = useLocale()
  const featured = getFeaturedProjects()

  return (
    <section style={{ padding: 'var(--spacing-section) 0' }}>
      <div className="container-main">
        <p className="section-number">01 · Projects</p>
        <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>{siteData.home.featuredHeading}</h2>
        <p className="text-body-lg" style={{ maxWidth: '42rem', marginBottom: '1rem' }}>{siteData.home.featuredSubhead}</p>

        {featured.map((project, i) => (
          <ProjectChapter key={project.id} project={project} index={i} />
        ))}

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <MagneticButton href={localizedHref('/projects', locale)}>
            {siteData.home.viewAllProjects} →
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
