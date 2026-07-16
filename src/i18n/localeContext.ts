import { createContext, useContext } from 'react'

export type Locale = 'en' | 'es'

export const LocaleContext = createContext<Locale>('en')

export function useLocale(): Locale {
  return useContext(LocaleContext)
}
