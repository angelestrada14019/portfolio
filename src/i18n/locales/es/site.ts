import type { SiteData } from '../en/site'

export const siteDataEs: SiteData = {
  meta: {
    home: {
      title: 'Angel Estrada — Ingeniero de Automatización con IA y Backend',
      description: 'Portafolio de agentes de IA, sistemas RAG y plataformas backend construidos por Angel Estrada — Senior AI Automation Engineer y Backend Developer en Bogotá, Colombia.',
    },
    about: {
      title: 'Sobre mí — Angel Estrada',
      description: 'Senior AI Automation Engineer y Backend Developer en Bogotá, Colombia. Sistemas multiagente, RAG, LangGraph, n8n, y microservicios de producción en Java/Python.',
    },
    projects: {
      title: 'Proyectos — Angel Estrada',
      description: 'Agentes de IA, pipelines RAG, workflows de automatización y plataformas backend — todos con código público en GitHub.',
    },
    contact: {
      title: 'Contacto — Angel Estrada',
      description: 'Escríbeme sobre oportunidades laborales, colaboraciones, o preguntas de ingeniería de IA/backend.',
    },
  },
  nav: {
    logo: 'Angel Estrada',
    items: [
      { href: '/about', label: 'Sobre mí' },
      { href: '/projects', label: 'Proyectos' },
      { href: '/contact', label: 'Contacto' },
    ],
  },
  hero: {
    eyebrow: 'Senior AI Automation Engineer · Backend Developer',
    headline: 'Construyo sistemas de IA multiagente — y las plataformas backend que los mantienen funcionando.',
    subhead: 'Con base en Bogotá, Colombia. Pipelines RAG, LangGraph, orquestación con n8n, y microservicios en Java/Python hechos para aguantar carga real.',
    ctaPrimary: 'Ver proyectos',
    ctaSecondary: 'Contactar',
  },
  home: {
    featuredHeading: 'Proyectos destacados',
    featuredSubhead: 'Una muestra de agentes de IA, sistemas RAG y plataformas backend — el código completo de cada uno está público en GitHub.',
    viewAllProjects: 'Ver todos los proyectos',
    readCaseStudy: 'Leer el caso de estudio',
    cursorViewLabel: 'Ver',
    skillsHeading: 'El stack, por capas',
    skillsSubhead: 'Así construyo de verdad: agentes arriba, lógica de aplicación en medio, infraestructura debajo.',
    stackLayers: {
      agents: 'Agentes y orquestación',
      application: 'Aplicación y APIs',
      infrastructure: 'Datos e infraestructura',
    },
  },
  about: {
    heading: 'Sobre mí',
    intro: [
      'Senior AI Automation Engineer y Backend Developer con más de 3 años entregando software en producción — desde plataformas SaaS multi-tenant que procesan datos logísticos de alto volumen, hasta agentes de IA autónomos usados por usuarios reales, no demos técnicas.',
      'Diseño y entrego sistemas de IA multiagente de punta a punta: orquestación con LangGraph y crewAI, pipelines RAG/GraphRAG sobre bases vectoriales como Supabase pgvector y Chroma, e integraciones con Model Context Protocol (MCP) que conectan agentes con datos y herramientas reales. Esto incluye ecosistemas conversacionales sobre las APIs de WhatsApp y Telegram, y agentes de voz en tiempo real construidos sobre LiveKit — n8n es mi opción cuando un framework completo a la medida es más de lo que el problema necesita.',
      'Del lado backend, construyo y opero microservicios en Java/Spring Boot y Python/FastAPI (con Pandas para la parte pesada de datos) sobre Kubernetes, con infraestructura automatizada mediante Terraform y CI/CD en AWS y Azure. También he extendido plataformas de analítica autoalojadas como Metabase con una capa RAG para reporting en lenguaje natural. En Transborder trabajo en las dos mitades de ese stack a la vez — flujos agénticos con RAG y la plataforma multi-tenant sobre la que corren — mientras tomo contratos independientes de automatización con IA en paralelo.',
      'Lo que más me interesa es justo ese punto de encuentro: agentes que aguanten carga operativa real, no solo una buena demo.',
    ],
    experienceHeading: 'Experiencia',
    skillsHeading: 'Herramientas y tecnologías',
  },
  projects: {
    heading: 'Proyectos',
    subhead: 'Agentes de IA, pipelines RAG, workflows de automatización y plataformas backend. Cada proyecto enlaza a su código público en GitHub.',
  },
  projectDetail: {
    backLink: 'Todos los proyectos',
    techStackLabel: 'Stack técnico',
    viewOnGithub: 'Ver código en GitHub',
    statusLabels: { live: 'En producción', demo: 'Demo', codeSample: 'Muestra de código' },
  },
  contact: {
    heading: 'Hablemos',
    subhead: 'Escríbeme sobre oportunidades laborales, colaboraciones, o si solo quieres hablar de agentes y RAG. Te respondo personalmente.',
    form: {
      nameLabel: 'Nombre',
      emailLabel: 'Email',
      messageLabel: 'Mensaje',
      messagePlaceholder: '¿Qué tienes en mente?',
      submitLabel: 'Enviar mensaje',
      submittingLabel: 'Enviando…',
      successHeading: 'Mensaje enviado',
      successBody: 'Gracias por escribirme — te respondo lo antes posible.',
      errorGeneric: 'Algo salió mal. Intenta de nuevo, o escríbeme directamente por email.',
    },
  },
  footer: {
    tagline: 'Agentes de IA y sistemas backend',
    copy: '© 2026 Angel Estrada',
    links: [
      { href: 'https://linkedin.com/in/angel-estrada-869397214', label: 'LinkedIn' },
      { href: 'https://github.com/angelestrada14019', label: 'GitHub' },
      { href: 'mailto:rangel1998.rt@gmail.com', label: 'Email' },
    ],
  },
}
