import { useRef, type ReactNode, type CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

interface RevealProps {
  children: ReactNode
  /** Vertical offset (px) the content rises from. */
  y?: number
  /** Extra delay (s) — use to stagger a handful of siblings by hand. */
  delay?: number
  className?: string
  style?: CSSProperties
}

/**
 * Shared scroll-reveal primitive (fade + rise, gated on scroll position)
 * so every page uses the same easing/duration/ScrollTrigger conventions
 * instead of each section hand-rolling its own gsap.fromTo.
 */
export function Reveal({ children, y = 24, delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'emil-out',
          scrollTrigger: { trigger: ref.current },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
