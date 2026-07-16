import { Link, useLocation } from 'react-router-dom'
import { useLocale } from '@/i18n/localeContext'
import { useUI } from '@/i18n/hooks'

interface Props {
  variant?: 'desktop' | 'mobile'
  onSwitch?: () => void
}

/**
 * Path-preserving language switch — this is the fix the reference site
 * (angel-landing) doesn't need, since it's a single-page site where every
 * language switch harmlessly lands on "the page." Here, a recruiter reading
 * /projects/segurodata and clicking "ES" must land on /es/projects/segurodata,
 * not get bounced to the Spanish homepage and lose their place.
 */
function targetPath(locale: 'en' | 'es', pathname: string): string {
  if (locale === 'en') {
    // Currently English → build the /es equivalent
    return pathname === '/' ? '/es' : `/es${pathname}`
  }
  // Currently Spanish → strip the /es prefix
  const stripped = pathname.replace(/^\/es/, '')
  return stripped === '' ? '/' : stripped
}

export function LanguageSwitcher({ variant = 'desktop', onSwitch }: Props) {
  const locale = useLocale()
  const { pathname } = useLocation()
  const ui = useUI()

  const esHref = locale === 'en' ? targetPath('en', pathname) : pathname
  const enHref = locale === 'es' ? targetPath('es', pathname) : pathname

  if (variant === 'mobile') {
    return (
      <nav aria-label={ui.langSwitcher.label} style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
        <Link to={enHref} aria-current={locale === 'en' ? 'true' : undefined} className="lang-btn lang-btn--mobile" onClick={onSwitch}>
          EN
        </Link>
        <span aria-hidden="true" style={{ color: 'rgba(251,250,248,0.25)', lineHeight: '44px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>|</span>
        <Link to={esHref} aria-current={locale === 'es' ? 'true' : undefined} className="lang-btn lang-btn--mobile" onClick={onSwitch}>
          ES
        </Link>
      </nav>
    )
  }

  return (
    <nav aria-label={ui.langSwitcher.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
      <Link to={enHref} aria-current={locale === 'en' ? 'true' : undefined} className="lang-btn">
        EN
      </Link>
      <span aria-hidden="true" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', lineHeight: 1 }}>|</span>
      <Link to={esHref} aria-current={locale === 'es' ? 'true' : undefined} className="lang-btn">
        ES
      </Link>
    </nav>
  )
}
