interface LogoMarkProps {
  size?: number
  color?: string
  style?: React.CSSProperties
}

/**
 * "El Umbral" — Angel Estrada's personal logo mark.
 * Left: ascending dots (complexity, many moving parts).
 * Right: a clean stroke (the system that ties it together).
 * Teal apex: the point of resolution.
 * viewBox 0 0 24 32 · width = size × 0.75
 */
export function LogoMark({ size = 24, color = 'currentColor', style }: LogoMarkProps) {
  const w = size * 0.75

  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={style}
    >
      <line x1="12" y1="3.5" x2="22" y2="30" stroke={color} strokeWidth="2.2" strokeLinecap="round" />

      <line x1="12.5" y1="19" x2="18" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

      <line x1="6" y1="19" x2="12" y2="19" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="1.6 1.5" opacity="0.65" />

      <circle cx="2"    cy="30"   r="1.55" fill={color} />
      <circle cx="4.1"  cy="24.5" r="1.35" fill={color} opacity="0.88" />
      <circle cx="6.2"  cy="19"   r="1.25" fill={color} opacity="0.78" />
      <circle cx="8.3"  cy="13.5" r="1.15" fill={color} opacity="0.68" />
      <circle cx="10.2" cy="8.2"  r="1.05" fill={color} opacity="0.6"  />

      <circle cx="0.3"  cy="26.5" r="0.65" fill={color} opacity="0.5"  />
      <circle cx="0.8"  cy="19.5" r="0.55" fill={color} opacity="0.4"  />
      <circle cx="3.2"  cy="13"   r="0.65" fill={color} opacity="0.45" />
      <circle cx="5.2"  cy="7"    r="0.6"  fill={color} opacity="0.4"  />
      <circle cx="8.5"  cy="27.5" r="0.7"  fill={color} opacity="0.45" />
      <circle cx="10"   cy="25.5" r="0.5"  fill={color} opacity="0.35" />
      <circle cx="1.5"  cy="31"   r="0.8"  fill={color} opacity="0.3"  />

      <circle cx="12" cy="3.5" r="2.1" fill="#0D9488" />
    </svg>
  )
}
