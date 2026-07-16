import { useEffect } from 'react'

/** Sets document title + meta description for the active page/locale. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    const setMeta = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute('content', val)
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
  }, [title, description])
}
