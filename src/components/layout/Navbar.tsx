import { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { MobileNav } from './MobileNav'
import { LogoMark } from '@/components/ui/LogoMark'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useSiteData, useUI } from '@/i18n/hooks'
import { useLocale } from '@/i18n/localeContext'
import { localizedHref } from '@/lib/routing'
import { Link } from 'react-router-dom'

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const siteData = useSiteData()
  const ui = useUI()
  const locale = useLocale()
  const { pathname } = useLocation()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    gsap.fromTo(nav, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9 })
  }, [])

  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return
    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})` },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close mobile menu on route change. The React-docs "compare against a
  // ref during render" alternative to this effect is itself disallowed by
  // this project's (React Compiler-oriented) lint rules — refs can't be
  // read/written during render either — so a plain effect is the pragmatic
  // choice here; the setState is a single, non-cascading boolean flip.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const homeHref = localizedHref('/', locale)
  const isActive = (path: string) => {
    const target = localizedHref(path, locale)
    return pathname === target || (path !== '/' && pathname.startsWith(target))
  }

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
          padding: '1.125rem 0',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          background: scrolled ? 'rgba(251,250,248,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 var(--color-line)' : 'none',
        }}
      >
        <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to={homeHref}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600,
              color: 'var(--color-ink)', letterSpacing: '-0.02em', cursor: 'none', minHeight: '44px',
            }}
          >
            <LogoMark size={20} />
            {siteData.nav.logo}
          </Link>

          <nav aria-label={ui.nav.navLabel}>
            <ul className="nav-links">
              {siteData.nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={localizedHref(item.href, locale)}
                    className="nav-link"
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href={locale === 'es' ? '/cv/CV_Angel_Estrada_ES.pdf' : '/cv/CV_Angel_Estrada_EN.pdf'}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cv-link nav-cv-desktop"
            >
              {ui.nav.downloadCv}
            </a>
            <div className="nav-lang-desktop">
              <LanguageSwitcher />
            </div>
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label={ui.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem',
                color: 'var(--color-ink)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '5px', minWidth: '44px', minHeight: '44px',
              }}
            >
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'currentColor' }} />
              <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'currentColor' }} />
              <span style={{ display: 'block', width: '16px', height: '1.5px', background: 'currentColor' }} />
            </button>
          </div>
        </div>
      </header>

      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />
    </>
  )
}
