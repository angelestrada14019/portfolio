import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

interface PreloaderProps {
  onComplete: () => void
}

/**
 * Name resolves from blurred/loose letter-spacing to sharp — a brief
 * "settling into focus" moment before the hero (and its node network)
 * take over.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const overlay = overlayRef.current
    const name = nameRef.current
    const rule = ruleRef.current
    if (!overlay || !name || !rule) return

    const done = { fired: false }
    const fireHandoff = () => {
      if (done.fired) return
      done.fired = true
      onComplete()
    }
    const hardFinish = () => {
      fireHandoff()
      setVisible(false)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set(name, { opacity: 1, filter: 'blur(0px)', letterSpacing: '-0.02em' })
      const t = gsap.to(overlay, { opacity: 0, duration: 0.4, delay: 0.5, onStart: fireHandoff, onComplete: () => setVisible(false) })
      const safety = window.setTimeout(hardFinish, 2500)
      return () => { t.kill(); window.clearTimeout(safety) }
    }

    gsap.set(name, { filter: 'blur(14px)', opacity: 0.35, letterSpacing: '0.14em', scale: 1.02 })
    gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({ onComplete: () => setVisible(false) })
    tl.to(name, { filter: 'blur(0px)', opacity: 1, letterSpacing: '-0.02em', scale: 1, duration: 0.28, ease: 'emil-out' })
      .to(rule, { scaleX: 1, duration: 0.18, ease: 'emil-out' }, '-=0.1')
      .add(fireHandoff)
      .to(overlay, { opacity: 0, duration: 0.28, ease: 'power2.out' })

    const safety = window.setTimeout(hardFinish, 900)

    return () => { tl.kill(); window.clearTimeout(safety) }
  }, [onComplete])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9990,
        background: 'var(--color-bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '1.25rem',
      }}
    >
      <h1
        ref={nameRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 600,
          color: 'var(--color-ink)',
          letterSpacing: '-0.02em',
          margin: 0,
          width: '100%',
          textAlign: 'center',
          willChange: 'filter, opacity, transform',
        }}
      >
        Angel Estrada
      </h1>
      <div ref={ruleRef} style={{ width: 'min(220px, 40vw)', height: '1px', background: 'var(--color-ink)', opacity: 0.45 }} />
    </div>
  )
}
