// Canonical content shape — English is the source of truth; es/site.ts must satisfy this type.
export interface SiteData {
  meta: {
    home: { title: string; description: string }
    about: { title: string; description: string }
    projects: { title: string; description: string }
    contact: { title: string; description: string }
  }
  nav: {
    logo: string
    items: { href: string; label: string }[]
  }
  hero: {
    eyebrow: string
    headline: string
    subhead: string
    ctaPrimary: string
    ctaSecondary: string
  }
  home: {
    featuredHeading: string
    featuredSubhead: string
    viewAllProjects: string
    readCaseStudy: string
    cursorViewLabel: string
    skillsHeading: string
    skillsSubhead: string
    stackLayers: {
      agents: string
      application: string
      infrastructure: string
    }
  }
  about: {
    heading: string
    intro: string[]
    experienceHeading: string
    skillsHeading: string
  }
  projects: {
    heading: string
    subhead: string
  }
  projectDetail: {
    backLink: string
    techStackLabel: string
    viewOnGithub: string
    statusLabels: { live: string; demo: string; codeSample: string }
  }
  contact: {
    heading: string
    subhead: string
    form: {
      nameLabel: string
      emailLabel: string
      messageLabel: string
      messagePlaceholder: string
      submitLabel: string
      submittingLabel: string
      successHeading: string
      successBody: string
      errorGeneric: string
    }
  }
  footer: {
    tagline: string
    copy: string
    links: { href: string; label: string }[]
  }
}

export const siteDataEn: SiteData = {
  meta: {
    home: {
      title: 'Angel Estrada — AI Automation Engineer & Backend Developer',
      description: 'Portfolio of AI agents, RAG systems, and backend platforms built by Angel Estrada — Senior AI Automation Engineer & Backend Developer based in Bogotá, Colombia.',
    },
    about: {
      title: 'About — Angel Estrada',
      description: 'Senior AI Automation Engineer and Backend Developer based in Bogotá, Colombia. Multi-agent systems, RAG, LangGraph, n8n, and production Java/Python microservices.',
    },
    projects: {
      title: 'Projects — Angel Estrada',
      description: 'AI agents, RAG pipelines, automation workflows, and backend platforms — all with public source on GitHub.',
    },
    contact: {
      title: 'Contact — Angel Estrada',
      description: 'Get in touch about roles, collaborations, or AI/backend engineering questions.',
    },
  },
  nav: {
    logo: 'Angel Estrada',
    items: [
      { href: '/about', label: 'About' },
      { href: '/projects', label: 'Projects' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  hero: {
    eyebrow: 'Senior AI Automation Engineer · Backend Developer',
    headline: 'I build multi-agent AI systems—and the backend platforms that keep them running.',
    subhead: 'Based in Bogotá, Colombia. RAG pipelines, LangGraph, n8n orchestration, and Java/Python microservices built to hold up under real load.',
    ctaPrimary: 'View Projects',
    ctaSecondary: 'Get in Touch',
  },
  home: {
    featuredHeading: 'Featured Projects',
    featuredSubhead: 'A sample of AI agents, RAG systems, and backend platforms — full source for each is public on GitHub.',
    viewAllProjects: 'View all projects',
    readCaseStudy: 'Read the case study',
    cursorViewLabel: 'View',
    skillsHeading: 'The Stack, Layered',
    skillsSubhead: "The way I actually build: agents on top, application logic in the middle, infrastructure underneath.",
    stackLayers: {
      agents: 'Agents & Orchestration',
      application: 'Application & APIs',
      infrastructure: 'Data & Infrastructure',
    },
  },
  about: {
    heading: 'About',
    intro: [
      "Senior AI Automation Engineer and Backend Developer with 3+ years shipping production software — from multi-tenant SaaS platforms handling high-volume logistics data to autonomous AI agents deployed for real users, not tech demos.",
      'I design and ship multi-agent AI systems end to end: LangGraph and crewAI orchestration, RAG/GraphRAG pipelines over vector stores like Supabase pgvector and Chroma, and Model Context Protocol (MCP) integrations that connect agents to real data and tools. That includes conversational ecosystems on the WhatsApp and Telegram APIs, and real-time Voice-AI agents built on LiveKit — n8n is my go-to when a full custom framework is more than the job needs.',
      "On the backend side, I build and operate Java/Spring Boot and Python/FastAPI (with Pandas for the data-heavy parts) microservices on Kubernetes, with infrastructure automated through Terraform and CI/CD on AWS and Azure. I've also extended self-hosted analytics platforms like Metabase with a RAG layer for natural-language reporting. At Transborder I work on both halves of that stack at once — agentic RAG workflows and the multi-tenant platform they run inside of — while taking on independent AI automation contracts on the side.",
      "What I care about most is the seam between the two: agents that hold up under real operational load, not just a good demo.",
    ],
    experienceHeading: 'Experience',
    skillsHeading: 'Tools & Technologies',
  },
  projects: {
    heading: 'Projects',
    subhead: 'AI agents, RAG pipelines, automation workflows, and backend platforms. Every project links to its public source on GitHub.',
  },
  projectDetail: {
    backLink: 'All projects',
    techStackLabel: 'Tech Stack',
    viewOnGithub: 'View source on GitHub',
    statusLabels: { live: 'Live', demo: 'Demo', codeSample: 'Code sample' },
  },
  contact: {
    heading: "Let's talk",
    subhead: "Reach out about roles, collaborations, or if you just want to talk shop about agents and RAG. I'll get back to you personally.",
    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      messagePlaceholder: "What's on your mind?",
      submitLabel: 'Send message',
      submittingLabel: 'Sending…',
      successHeading: 'Message sent',
      successBody: "Thanks for reaching out — I'll reply as soon as I can.",
      errorGeneric: 'Something went wrong. Try again, or email me directly.',
    },
  },
  footer: {
    tagline: 'AI agents & backend systems',
    copy: '© 2026 Angel Estrada',
    links: [
      { href: 'https://linkedin.com/in/angel-estrada-869397214', label: 'LinkedIn' },
      { href: 'https://github.com/angelestrada14019', label: 'GitHub' },
      { href: 'mailto:rangel1998.rt@gmail.com', label: 'Email' },
    ],
  },
}
