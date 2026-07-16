import { LogoMark } from '@/components/ui/LogoMark'
import { useSiteData, useUI } from '@/i18n/hooks'

export function Footer() {
  const siteData = useSiteData()
  const ui = useUI()

  return (
    <footer className="footer-signal" style={{ padding: '4.5rem 0 3.5rem', background: 'var(--color-bg-warm)' }}>
      <div
        className="container-main"
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            {siteData.footer.tagline}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--color-accent-3)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <LogoMark size={12} />
            {ui.footer.category}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-ink-muted)', letterSpacing: '0.05em' }}>
            {siteData.footer.copy}
          </p>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {'</>'} {ui.footer.credit}
        </p>

        <nav aria-label={ui.footer.navLabel}>
          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
            {siteData.footer.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  style={{
                    fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--color-ink-muted)',
                    transition: 'color 0.2s ease', cursor: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
