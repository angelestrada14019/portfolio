import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP)

// Emil Kowalski's curves (animations.dev):
//  - 'emil-out' → entrances/reveals (ease-out with punch). NEVER ease-in for entrances.
//  - 'emil-io'  → on-screen movement (pronounced ease-in-out).
CustomEase.create('emil-out', 'M0,0 C0.23,1 0.32,1 1,1')
CustomEase.create('emil-io', 'M0,0 C0.77,0 0.175,1 1,1')

gsap.defaults({
  ease: 'emil-out',
  duration: 0.7,
})

ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  start: 'top 85%',
})

// Mobile URL bar show/hide fires resize; without this every appearance
// recalculates pin-spacers and causes layout shifts (CLS).
ScrollTrigger.config({ ignoreMobileResize: true })

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export { gsap, ScrollTrigger, useGSAP }
