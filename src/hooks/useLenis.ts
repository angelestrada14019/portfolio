import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let lenisInstance: Lenis | null = null

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !prefersReduced,
    })

    lenisRef.current = lenis
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const lenisRAF = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisRAF)

    return () => {
      gsap.ticker.remove(lenisRAF)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisRef
}

/** Global access to the instance (for programmatic scroll from anywhere) */
export function getLenis() {
  return lenisInstance
}
