import { type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { LocaleContext, type Locale } from './localeContext'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  // English is the default/unprefixed locale here (flipped from the
  // Spanish-default reference site) — this app targets a US-based audience.
  const locale: Locale = pathname.startsWith('/es') ? 'es' : 'en'

  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  )
}
