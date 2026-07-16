import { Color } from 'three'
import type { ColorToken } from './nodeLayout'

/**
 * Reads a color straight from the live CSS custom properties instead of
 * hardcoding hex values in the scene — keeps the 3D scene themeable from the
 * same single source of truth (index.css) as the rest of the UI.
 */
export function getThemeColor(token: ColorToken): Color {
  if (typeof window === 'undefined') return new Color('#1752CC')
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  return new Color(value || '#1752CC')
}
