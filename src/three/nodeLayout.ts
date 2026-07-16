// Pure layout data — no Three.js/rendering imports here on purpose, so the
// conceptual graph (who connects to whom) stays decoupled from how it's drawn.
//
// Echoes Angel's real n8n architecture rather than a generic graph: one
// supervisor/manager node routing to specialized sub-agents, the same
// hub-and-spoke shape as personal-assistant-orchestrator.json in
// n8n-automation-templates.

export type ColorToken =
  | '--color-accent'
  | '--color-accent-2'
  | '--color-accent-3'

export interface AgentNodeData {
  id: string
  position: [number, number, number]
  radius: number
  colorToken: ColorToken
}

export interface NodeEdgeData {
  from: string
  to: string
  /** How far the curve's midpoint bows in Z, for visible depth. */
  bow: number
}

export const nodes: AgentNodeData[] = [
  { id: 'supervisor', position: [0, 0, 0], radius: 0.42, colorToken: '--color-accent' },
  { id: 'calendar', position: [-2.3, 1.05, -0.6], radius: 0.24, colorToken: '--color-accent-2' },
  { id: 'email', position: [-1.5, -1.55, 0.35], radius: 0.21, colorToken: '--color-accent-3' },
  { id: 'research', position: [1.85, 1.35, 0.55], radius: 0.27, colorToken: '--color-accent-3' },
  { id: 'tasks', position: [2.15, -0.75, -0.45], radius: 0.23, colorToken: '--color-accent-2' },
  { id: 'notes', position: [0.15, -2.05, 0.75], radius: 0.19, colorToken: '--color-accent-3' },
]

export const edges: NodeEdgeData[] = [
  // Hub-and-spoke — the supervisor routes to every specialist.
  { from: 'supervisor', to: 'calendar', bow: 0.6 },
  { from: 'supervisor', to: 'email', bow: -0.5 },
  { from: 'supervisor', to: 'research', bow: 0.7 },
  { from: 'supervisor', to: 'tasks', bow: -0.6 },
  { from: 'supervisor', to: 'notes', bow: 0.4 },
  // Sparse cross-links — keeps it reading as an organic graph, not a sterile star.
  { from: 'research', to: 'notes', bow: 0.3 },
  { from: 'calendar', to: 'tasks', bow: -0.35 },
]

export function findNode(id: string): AgentNodeData {
  const node = nodes.find((n) => n.id === id)
  if (!node) throw new Error(`nodeLayout: unknown node id ${id}`)
  return node
}
