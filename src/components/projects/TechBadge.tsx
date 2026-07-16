import { useState } from 'react'
import type { TechBadge as TechBadgeData } from '@/data/projects'

/** Renders a tech chip with its logo when available; falls back to
 * text-only if no logo path was given, or if the image fails to load
 * (some tools like LangGraph/MCP/LiveKit don't have a simple-icon yet). */
export function TechBadge({ label, logo }: TechBadgeData) {
  const [imgFailed, setImgFailed] = useState(false)
  const showLogo = logo && !imgFailed

  return (
    <span className="tech-badge">
      {showLogo && (
        <img src={logo} alt="" width={12} height={12} onError={() => setImgFailed(true)} style={{ display: 'block' }} />
      )}
      {label}
    </span>
  )
}
