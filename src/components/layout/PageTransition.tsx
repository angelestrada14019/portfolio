import { useRef } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { getLenis } from '@/hooks/useLenis'

/**
 * Wraps <Outlet> so every route change gets the same settle-in entrance
 * instead of an instant snap, and always lands scrolled to the top —
 * React Router doesn't do either by default, and Lenis needs its own
 * scrollTo (a plain window.scrollTo fights the smooth-scroll rig).
 */
export function PageTransition() {
  const location = useLocation()
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      getLenis()?.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)

      if (prefersReducedMotion()) return
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'emil-out' },
      )
    },
    { scope: rootRef, dependencies: [location.pathname] },
  )

  return (
    <div key={location.pathname} ref={rootRef}>
      <Outlet />
    </div>
  )
}
