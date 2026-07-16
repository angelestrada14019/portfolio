import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { AgentNode } from './AgentNode'
import { NodeEdge } from './NodeEdge'
import { nodes, edges } from './nodeLayout'
import { prefersReducedMotion } from '@/lib/gsap'
import { LogoMark } from '@/components/ui/LogoMark'

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function NodeNetworkGroup() {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  // Tracked separately from group.rotation so the continuous idle spin and
  // the lerped mouse-tilt can be combined additively each frame instead of
  // fighting over the same value.
  const idleY = useRef(0)
  const tilt = useRef({ x: 0, y: 0 })
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [reduced])

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    if (reduced) return

    // Slow continuous idle spin — gives the scene life before the first
    // mouse move, and on touch devices where mousemove never fires.
    idleY.current += 0.0006

    // Lerp the mouse-reactive tilt toward its target — never a snap.
    const targetTiltX = mouse.current.y * 0.15
    const targetTiltY = mouse.current.x * 0.2
    tilt.current.x += (targetTiltX - tilt.current.x) * 0.04
    tilt.current.y += (targetTiltY - tilt.current.y) * 0.04

    group.rotation.x = tilt.current.x
    group.rotation.y = idleY.current + tilt.current.y
  })

  // viewport referenced to keep the scene responsive to container resize
  void viewport

  return (
    <group ref={groupRef}>
      {edges.map((edge, i) => (
        <NodeEdge key={`${edge.from}-${edge.to}`} edge={edge} phaseOffset={i / edges.length} />
      ))}
      {nodes.map((node, i) => (
        <AgentNode key={node.id} node={node} index={i} />
      ))}
    </group>
  )
}

function Fallback() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
      <LogoMark size={64} color="var(--color-ink)" />
    </div>
  )
}

export function NodeNetworkScene() {
  // Lazy initializer — runs the (impure, DOM-dependent) check once on first
  // render instead of via a setState-in-effect round trip. This is a
  // client-only SPA (no SSR pass), so calling it during render is safe.
  const [webglOk] = useState(() => supportsWebGL())

  if (!webglOk) return <Fallback />

  return (
    <Suspense fallback={<Fallback />}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 4]} intensity={1.2} />
        <NodeNetworkGroup />
      </Canvas>
    </Suspense>
  )
}
