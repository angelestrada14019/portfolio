import { useLocale } from './localeContext'
import { siteDataEn } from './locales/en/site'
import { siteDataEs } from './locales/es/site'
import { uiEn } from './locales/en/ui'
import { uiEs } from './locales/es/ui'

export function useSiteData() {
  return useLocale() === 'es' ? siteDataEs : siteDataEn
}

export function useUI() {
  return useLocale() === 'es' ? uiEs : uiEn
}
