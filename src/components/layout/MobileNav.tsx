import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { useSiteData, useUI } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { localizedHref } from '@/lib/routing'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  isActive: (path: string) => boolean
}

export function MobileNav({ isOpen, onClose, isActive }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const siteData = useSiteData()
  const ui = useUI()
  const locale = useLocale()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (isOpen) {
      gsap.fromTo(panel, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'emil-out' })
    } else {
      gsap.to(panel, { opacity: 0, y: -12, duration: 0.22, ease: 'power2.in' })
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    if (!panel) return

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    const focusTimer = window.setTimeout(() => focusable[0]?.focus(), 50)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={panelRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label={ui.nav.menuLabel}
      inert={!isOpen || undefined}
      style={{
        position: 'fixed', inset: 0, zIndex: 850,
        background: 'var(--color-ink)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: 0,
      }}
    >
      <button
        onClick={onClose}
        aria-label={ui.nav.closeMenu}
        style={{
          position: 'absolute', top: '1.125rem', right: 'clamp(1.25rem, 5vw, 5rem)',
          background: 'none', border: 'none', color: 'var(--color-bg)', padding: '0.5rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <nav aria-label={ui.nav.mainLabel}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
          {siteData.nav.items.map((item) => (
            <li key={item.href}>
              <Link
                to={localizedHref(item.href, locale)}
                onClick={onClose}
                aria-current={isActive(item.href) ? 'page' : undefined}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 9vw, 3.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: isActive(item.href) ? 'var(--color-accent-light)' : 'var(--color-bg)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: '3rem' }}>
        <LanguageSwitcher variant="mobile" onSwitch={onClose} />
      </div>
    </div>
  )
}
