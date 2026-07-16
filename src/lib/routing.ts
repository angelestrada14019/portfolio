import type { Locale } from '@/i18n/localeContext'

/** Prefixes a canonical (English) path with /es when the active locale is Spanish. */
export function localizedHref(path: string, locale: Locale): string {
  if (locale === 'en') return path
  return path === '/' ? '/es' : `/es${path}`
}
