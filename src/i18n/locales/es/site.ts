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
  },
  nav: {
    logo: 'Angel Estrada',
    items: [
      { href: '/about', label: 'Sobre mí' },
      { href: '/projects', label: 'Proyectos' },
    ],
  },
  hero: {
    eyebrow: 'Senior AI Automation Engineer · Backend Developer',
    headline: 'Construyo sistemas de IA multiagente — y las plataformas backend que los mantienen funcionando.',
    subhead: 'Con base en Bogotá, Colombia. Pipelines RAG, LangGraph, orquestación con n8n, y microservicios en Java/Python hechos para aguantar carga real.',
    ctaPrimary: 'Ver proyectos',
    ctaSecondary: 'Sobre mí',
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
      'Senior AI Automation Engineer y Backend Developer con un historial comprobado diseñando plataformas empresariales escalables y entregando soluciones de IA autónoma de alto impacto, tanto en entornos corporativos como de forma independiente. Experto en diseñar sistemas multiagente listos para producción, arquitecturas avanzadas de RAG/GraphRAG, e integraciones a la medida de Model Context Protocol (MCP) usando Python, orquestación con n8n, y frameworks agénticos como LangGraph y crewAI.',
      'Experiencia práctica profunda desplegando ecosistemas conversacionales (API oficial de WhatsApp y Telegram), agentes de voz en tiempo real con LiveKit, y plataformas de analítica autoalojadas como Metabase sobre infraestructura de servidor dedicada. Altamente calificado en microservicios Java (Spring Boot) y Python (FastAPI, Pandas) desplegados en AWS y Azure. Hábil conectando la IA de punta con aplicaciones de negocio de nivel producción para impulsar eficiencia operativa medible.',
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
