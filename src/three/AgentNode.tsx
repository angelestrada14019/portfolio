import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { getThemeColor } from './themeColor'
import type { AgentNodeData } from './nodeLayout'

interface AgentNodeProps {
  node: AgentNodeData
  index: number
}

export function AgentNode({ node, index }: AgentNodeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const color = useMemo(() => getThemeColor(node.colorToken), [node.colorToken])

  // Entrance: scatter to final position, staggered per node so the network
  // reads as "settling into place" rather than popping in all at once.
  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const [tx, ty, tz] = node.position

    if (prefersReducedMotion()) {
      group.position.set(tx, ty, tz)
      return
    }

    const scatterRadius = 4.5
    group.position.set(
      tx + (Math.random() - 0.5) * scatterRadius,
      ty + (Math.random() - 0.5) * scatterRadius,
      tz + (Math.random() - 0.5) * scatterRadius,
    )

    gsap.to(group.position, {
      x: tx,
      y: ty,
      z: tz,
      duration: 1.4,
      delay: 0.15 + index * 0.09,
      ease: 'emil-out',
    })
  }, [node.position, index])

  // Gentle idle "breathing" scale — keeps the network feeling alive at rest.
  // useState's lazy initializer (not useMemo) is the sanctioned place to call
  // an impure function once — React guarantees it only runs on first render.
  const [phase] = useState(() => Math.random() * Math.PI * 2)
  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group || prefersReducedMotion()) return
    const s = 1 + Math.sin(clock.elapsedTime * 0.8 + phase) * 0.04
    group.scale.setScalar(s)
  })

  return (
    <group ref={groupRef}>
      {/* Core node */}
      <mesh>
        <icosahedronGeometry args={[node.radius, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} roughness={0.35} metalness={0.1} />
      </mesh>
      {/* Glow halo — a scaled-up backside shell fakes an outer glow without a Bloom pass */}
      <mesh scale={1.5}>
        <icosahedronGeometry args={[node.radius, 1]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </group>
  )
}
