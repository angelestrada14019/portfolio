import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

/**
 * Refreshes ScrollTrigger when layout changes (resize, font-load, etc.)
 * Call this in App or at the root of the layout.
 */
export function useScrollSetup() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])
}
