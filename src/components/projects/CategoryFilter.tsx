import type { ProjectCategory } from '@/data/projects'

const categoryLabels: Record<ProjectCategory, { en: string; es: string }> = {
  'ai-agents': { en: 'AI Agents', es: 'Agentes de IA' },
  rag: { en: 'RAG', es: 'RAG' },
  'backend-cloud': { en: 'Backend & Cloud', es: 'Backend y Cloud' },
  automation: { en: 'Automation', es: 'Automatización' },
}

interface CategoryFilterProps {
  active: ProjectCategory | 'all'
  onChange: (category: ProjectCategory | 'all') => void
  locale: 'en' | 'es'
}

export function CategoryFilter({ active, onChange, locale }: CategoryFilterProps) {
  const categories: (ProjectCategory | 'all')[] = ['all', 'ai-agents', 'rag', 'backend-cloud', 'automation']
  const allLabel = locale === 'es' ? 'Todos' : 'All'

  return (
    <div role="group" aria-label={locale === 'es' ? 'Filtrar por categoría' : 'Filter by category'} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className="category-filter-btn"
          aria-pressed={active === cat}
          onClick={() => onChange(cat)}
        >
          {cat === 'all' ? allLabel : categoryLabels[cat][locale]}
        </button>
      ))}
    </div>
  )
}
