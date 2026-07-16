import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useSiteData } from '@/i18n/hooks'

interface StackLayer {
  id: 'agents' | 'application' | 'infrastructure'
  color: string
  bg: string
  items: string[]
}

// Grouped top-to-bottom the way the systems themselves are layered:
// agents on top calling into application code, which runs on the
// infrastructure underneath — not an arbitrary sort of the same list.
const LAYERS: StackLayer[] = [
  {
    id: 'agents',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-bg)',
    items: ['LangGraph', 'LangChain', 'crewAI', 'n8n', 'MCP', 'OpenAI API', 'Anthropic API'],
  },
  {
    id: 'application',
    color: 'var(--color-accent-2)',
    bg: 'var(--color-accent-2-light)',
    items: ['Python', 'Java', 'Spring Boot', 'FastAPI', 'JavaScript', 'React', 'TypeScript', 'CSS', 'Vite'],
  },
  {
    id: 'infrastructure',
    color: 'var(--color-accent-3)',
    bg: 'var(--color-accent-3-light)',
    items: ['PostgreSQL', 'Supabase', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'Git & GitHub'],
  },
]

function LayerRow({ layer, label }: { layer: StackLayer; label: string }) {
  return (
    <div
      className="stack-layer"
      style={{
        borderLeft: `3px solid ${layer.color}`,
        background: layer.bg,
        borderRadius: '0 0.75rem 0.75rem 0',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: layer.color,
          marginBottom: '0.875rem',
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
        {layer.items.map((item) => (
          <span
            key={item}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--color-ink)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-line)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsSummary() {
  const siteData = useSiteData()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const layers = gsap.utils.toArray<HTMLElement>('.stack-layer')
      if (prefersReducedMotion()) {
        gsap.set(layers, { opacity: 1 })
        return
      }
      gsap.fromTo(
        layers,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: 'emil-out',
          scrollTrigger: { trigger: sectionRef.current },
        },
      )
    },
    { scope: sectionRef },
  )

  const labels = siteData.home.stackLayers

  return (
    <section ref={sectionRef} style={{ padding: 'var(--spacing-section) 0' }}>
      <div className="container-main">
        <p className="section-number">02 · Stack</p>
        <h2 className="text-h2" style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>{siteData.home.skillsHeading}</h2>
        <p className="text-body-lg" style={{ maxWidth: '38rem', marginBottom: '2.5rem' }}>{siteData.home.skillsSubhead}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {LAYERS.map((layer) => (
            <LayerRow key={layer.id} layer={layer} label={labels[layer.id]} />
          ))}
        </div>
      </div>
    </section>
  )
}
