import { type ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel,
  type = 'button',
}: MagneticButtonProps) {
  const magneticRef = useMagnetic<HTMLElement>(0.4)

  const variantClass = variant === 'ghost' ? 'btn-ghost' : 'btn-primary'
  const combinedClass = `${variantClass} ${className}`.trim()

  if (href) {
    return (
      <a
        ref={magneticRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={combinedClass}
      >
        <span className="mag-inner">{children}</span>
      </a>
    )
  }

  return (
    <button
      ref={magneticRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      type={type}
      className={combinedClass}
    >
      <span className="mag-inner">{children}</span>
    </button>
  )
}
