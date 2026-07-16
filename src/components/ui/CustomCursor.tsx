import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

// Ring is a fixed 64px box scaled down to its default (~36px) size, so
// "growing" it for the text state animates transform:scale — never
// width/height — even though the box is visually much bigger.
const RING_SIZE = 64
const RING_DEFAULT_SCALE = 36 / RING_SIZE

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.set(dot, { x: mouseX, y: mouseY })
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.18, ease: 'power2.out' })
    }

    const onMouseEnterLink = function (this: HTMLElement) {
      const cursorText = this.dataset.cursorText
      gsap.to(dot, { scale: 0, duration: 0.2 })

      if (cursorText) {
        label.textContent = cursorText
        gsap.to(ring, { scale: 1, opacity: 1, backgroundColor: 'var(--color-accent-bg)', duration: 0.35, ease: 'emil-out' })
        gsap.to(label, { opacity: 1, duration: 0.2, delay: 0.08 })
      } else {
        gsap.to(ring, { scale: 2.4 * RING_DEFAULT_SCALE, opacity: 0.6, duration: 0.3 })
      }
    }
    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: RING_DEFAULT_SCALE, opacity: 0.5, backgroundColor: 'transparent', duration: 0.3 })
      gsap.to(label, { opacity: 0, duration: 0.15 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    document.addEventListener('mousemove', onMouseMove)

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, label'
    const bindInteractive = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }
    bindInteractive()

    let debounceTimer: ReturnType<typeof setTimeout>
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(bindInteractive, 150)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(debounceTimer)
      document.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--color-accent)',
          pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%, -50%)', willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: `${RING_SIZE}px`, height: `${RING_SIZE}px`, borderRadius: '50%',
          border: '1.5px solid var(--color-accent)', opacity: 0.5,
          background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 9998,
          transform: `translate(-50%, -50%) scale(${RING_DEFAULT_SCALE})`, willChange: 'transform',
        }}
      >
        <span
          ref={labelRef}
          style={{
            opacity: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}
        />
      </div>
    </>
  )
}
