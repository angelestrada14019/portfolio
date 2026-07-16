import { useState } from 'react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteData } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'
import { projects, type ProjectCategory } from '@/data/projects'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { CategoryFilter } from '@/components/projects/CategoryFilter'

export default function Projects() {
  const siteData = useSiteData()
  const locale = useLocale()
  usePageMeta(siteData.meta.projects.title, siteData.meta.projects.description)

  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.categories.includes(activeCategory))

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: 'var(--spacing-section)' }}>
      <div className="container-main">
        <h1 className="text-h1" style={{ marginBottom: '0.75rem' }}>{siteData.projects.heading}</h1>
        <p className="text-body-lg" style={{ maxWidth: '42rem', marginBottom: '2rem' }}>{siteData.projects.subhead}</p>

        <div style={{ marginBottom: '2.5rem' }}>
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} locale={locale} />
        </div>

        <ProjectGrid projects={filtered} />
      </div>
    </div>
  )
}
