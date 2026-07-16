import type { Locale } from '@/i18n/localeContext'

/** Prefixes a canonical (Spanish) path with /en when the active locale is English. */
export function localizedHref(path: string, locale: Locale): string {
  if (locale === 'es') return path
  return path === '/' ? '/en' : `/en${path}`
}
