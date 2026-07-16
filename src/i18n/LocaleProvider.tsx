import { type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { LocaleContext, type Locale } from './localeContext'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  // Spanish is the default/unprefixed locale; English lives under /en.
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'es'

  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  )
}
