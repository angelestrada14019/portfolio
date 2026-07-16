import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { QuadraticBezierLine } from '@react-three/drei'
import * as THREE from 'three'
import { prefersReducedMotion } from '@/lib/gsap'
import { getThemeColor } from './themeColor'
import { findNode, type NodeEdgeData } from './nodeLayout'

interface NodeEdgeProps {
  edge: NodeEdgeData
  /** Staggers this edge's pulse cycle so connections don't all fire in unison —
   * reads as asynchronous message flow rather than a synchronized loop. */
  phaseOffset: number
}

export function NodeEdge({ edge, phaseOffset }: NodeEdgeProps) {
  const pulseRef = useRef<THREE.Mesh>(null)
  const from = findNode(edge.from)
  const to = findNode(edge.to)

  const curve = useMemo(() => {
    const start = new THREE.Vector3(...from.position)
    const end = new THREE.Vector3(...to.position)
    const mid = start.clone().lerp(end, 0.5)
    mid.z += edge.bow
    return new THREE.QuadraticBezierCurve3(start, mid, end)
  }, [from.position, to.position, edge.bow])

  const pulseColor = useMemo(() => getThemeColor(to.colorToken), [to.colorToken])

  useFrame(({ clock }) => {
    const pulse = pulseRef.current
    if (!pulse || prefersReducedMotion()) return

    const speed = 0.35 // full traversals per second
    const t = ((clock.elapsedTime * speed + phaseOffset) % 1)
    const point = curve.getPointAt(t)
    pulse.position.copy(point)

    // Fade in/out over the first/last ~12% of travel to avoid abrupt pop-in/out.
    const fade = t < 0.12 ? t / 0.12 : t > 0.88 ? (1 - t) / 0.12 : 1
    const material = pulse.material as THREE.MeshBasicMaterial
    material.opacity = fade * 0.9
  })

  return (
    <>
      <QuadraticBezierLine
        start={from.position}
        end={to.position}
        mid={curve.getPointAt(0.5)}
        color={pulseColor}
        lineWidth={0.6}
        transparent
        opacity={0.3}
      />
      {!prefersReducedMotion() && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={pulseColor} transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
    </>
  )
}
