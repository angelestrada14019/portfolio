import { usePageMeta } from '@/hooks/usePageMeta'
import { useSiteData } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'
import { experience } from '@/data/experience'
import { Reveal } from '@/components/ui/Reveal'

function formatDateRange(start: string, end: string | undefined, locale: 'en' | 'es') {
  const fmt = (d: string) => {
    const [y, m] = d.split('-').map(Number)
    const date = new Date(y, m - 1)
    return date.toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', { month: 'short', year: 'numeric' })
  }
  const present = locale === 'es' ? 'Presente' : 'Present'
  return `${fmt(start)} — ${end ? fmt(end) : present}`
}

export default function About() {
  const siteData = useSiteData()
  const locale = useLocale()
  usePageMeta(siteData.meta.about.title, siteData.meta.about.description)

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: 'var(--spacing-section)' }}>
      <div className="container-main" style={{ maxWidth: '48rem' }}>
        <h1 className="text-h1" style={{ marginBottom: '2rem' }}>{siteData.about.heading}</h1>

        {siteData.about.intro.map((paragraph, i) => (
          <p key={i} className="text-body-lg" style={{ marginBottom: '1.25rem' }}>{paragraph}</p>
        ))}

        <div style={{ marginTop: '3.5rem' }}>
          <p className="section-number" style={{ marginBottom: '1.5rem' }}>{siteData.about.experienceHeading}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experience.map((entry, i) => {
              const t = entry.translations[locale]
              const isCurrent = !entry.endDate
              return (
                <Reveal key={entry.id} delay={i * 0.08} className="experience-card">
                  <div>
                    {isCurrent && (
                      <p className="experience-current-badge" style={{ marginBottom: '0.5rem' }}>
                        {locale === 'es' ? 'Actual' : 'Current'}
                      </p>
                    )}
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-ink-muted)', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
                      {formatDateRange(entry.startDate, entry.endDate, locale)}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                      {entry.company}
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                      {entry.role}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{t.summary}</p>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {t.highlights.map((h, hi) => (
                        <li key={hi} style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-ink-soft)' }}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
