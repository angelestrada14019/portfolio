// Real projects only — every entry links to a public repo under
// github.com/angelestrada14019. Nothing here is invented, and none of them
// reference Salesforce (the job posting this portfolio supports asks for it,
// but it isn't part of Angel's real background).

export type ProjectCategory = 'ai-agents' | 'rag' | 'backend-cloud' | 'automation'

export interface TechBadge {
  label: string
  logo?: string // /logos/<name>.svg — TechBadge falls back to text-only if missing
}

export interface ProjectTranslation {
  title: string
  oneLiner: string
  description: string[]
}

export interface Project {
  id: string
  slug: string
  repoUrl: string
  liveUrl?: string
  categories: ProjectCategory[]
  techStack: TechBadge[]
  featured: boolean
  status: 'live' | 'demo' | 'code-sample'
  image?: string // /screenshots/<slug>.png — falls back to the abstract placeholder if unset
  translations: { en: ProjectTranslation; es: ProjectTranslation }
}

export const projects: Project[] = [
  {
    id: 'segurodata',
    slug: 'segurodata',
    repoUrl: 'https://github.com/angelestrada14019/segurodata',
    liveUrl: 'https://segurodata-frontend.vercel.app',
    categories: ['ai-agents', 'rag'],
    techStack: [
      { label: 'Python' },
      { label: 'XGBoost' },
      { label: 'FastAPI' },
      { label: 'React' },
      { label: 'Supabase' },
      { label: 'pgvector' },
    ],
    featured: true,
    status: 'live',
    image: '/screenshots/segurodata.png',
    translations: {
      en: {
        title: 'SeguroData',
        oneLiner: 'Crime prediction & prescription system for Bogotá — 12 open-data sources, XGBoost + SHAP, and a GraphRAG causal chatbot.',
        description: [
          'A full-stack crime-risk platform built for MinTIC\'s "Datos al Ecosistema 2026" open-data challenge. It ingests ~870,000 records from 12 public sources (police incident reports, weather, TransMilenio station locations, streetlight coverage, road works, and more) through a Bronze/Silver/Gold medallion pipeline.',
          'An XGBoost model predicts risk by UPZ (Bogotá\'s planning zones), with SHAP values explaining every prediction. On top of that sits a prescriptive layer — a GraphRAG chatbot over Supabase pgvector that can answer causal questions about why a zone is high-risk and what factors are driving it.',
          'Deployed end-to-end: a React + deck.gl frontend for map-based exploration, a FastAPI backend, four modules (diagnosis, prediction, prescription, causal chatbot), and an admin panel.',
        ],
      },
      es: {
        title: 'SeguroData',
        oneLiner: 'Sistema de predicción y prescripción de crimen para Bogotá — 12 fuentes de datos abiertos, XGBoost + SHAP, y un chatbot causal con GraphRAG.',
        description: [
          'Una plataforma full-stack de riesgo de crimen construida para el reto de datos abiertos "Datos al Ecosistema 2026" de MinTIC. Ingiere ~870,000 registros de 12 fuentes públicas (incidentes de policía, clima, estaciones de TransMilenio, cobertura de alumbrado, obras viales, entre otras) a través de un pipeline medallion Bronze/Silver/Gold.',
          'Un modelo XGBoost predice el riesgo por UPZ, con valores SHAP explicando cada predicción. Sobre eso, una capa prescriptiva — un chatbot causal con GraphRAG sobre Supabase pgvector que responde preguntas sobre por qué una zona tiene alto riesgo y qué factores lo explican.',
          'Desplegado de punta a punta: frontend en React + deck.gl para exploración en mapa, backend en FastAPI, cuatro módulos (diagnóstico, predicción, prescripción, chatbot causal), y un panel de administración.',
        ],
      },
    },
  },
  {
    id: 'langgraph-support-triage',
    slug: 'langgraph-support-triage',
    repoUrl: 'https://github.com/angelestrada14019/langgraph-support-triage',
    categories: ['ai-agents', 'rag'],
    techStack: [
      { label: 'Python' },
      { label: 'LangGraph' },
      { label: 'LangChain' },
      { label: 'Chroma' },
      { label: 'FastAPI' },
    ],
    featured: true,
    status: 'code-sample',
    image: '/illustrations/langgraph-support-triage.svg',
    translations: {
      en: {
        title: 'LangGraph Support Triage',
        oneLiner: 'A from-scratch LangGraph demo: a supervisor agent routes support tickets to a local RAG agent or escalates to a human.',
        description: [
          'A support-ticket triage system built specifically to demonstrate LangGraph graph-authoring from scratch. A supervisor node classifies each incoming ticket and routes it: self-service questions go to a hybrid-search (dense + BM25) RAG agent answering from a local knowledge base; disputes and irreversible account actions escalate straight to a human.',
          'The RAG path has an LLM-based grounding check before trusting its own answer — a design that replaced an earlier, simpler confidence-threshold approach after testing showed the threshold wasn\'t reliable. Runs fully locally (Chroma + free local embeddings), configurable across OpenRouter, OpenAI, or Anthropic with a one-line env change.',
        ],
      },
      es: {
        title: 'LangGraph Support Triage',
        oneLiner: 'Un demo de LangGraph desde cero: un agente supervisor enruta tickets de soporte a un agente RAG local o escala a un humano.',
        description: [
          'Un sistema de triage de tickets de soporte construido específicamente para demostrar la autoría de grafos en LangGraph desde cero. Un nodo supervisor clasifica cada ticket entrante y lo enruta: preguntas de autoservicio van a un agente RAG con búsqueda híbrida (densa + BM25) sobre una base de conocimiento local; disputas y acciones irreversibles de cuenta escalan directo a un humano.',
          'La ruta RAG tiene un chequeo de "grounding" hecho por el LLM antes de confiar en su propia respuesta — un diseño que reemplazó un enfoque más simple de umbral de confianza, después de que las pruebas mostraran que ese umbral no era confiable. Corre completamente en local (Chroma + embeddings locales gratuitos), configurable entre OpenRouter, OpenAI o Anthropic con un solo cambio en el .env.',
        ],
      },
    },
  },
  {
    id: 'livekit-voice-agent',
    slug: 'livekit-voice-agent',
    repoUrl: 'https://github.com/angelestrada14019/livekit-voice-agent',
    categories: ['ai-agents', 'backend-cloud'],
    techStack: [
      { label: 'Python' },
      { label: 'LiveKit' },
      { label: 'Twilio' },
      { label: 'Docker' },
    ],
    featured: true,
    status: 'code-sample',
    image: '/illustrations/livekit-voice-agent.svg',
    translations: {
      en: {
        title: 'LiveKit Voice Agent',
        oneLiner: 'Real-time Voice-AI agent on LiveKit with inbound/outbound SIP telephony and an OpenAI-backed voice pipeline.',
        description: [
          'A production-shaped real-time voice agent built on LiveKit, with full SIP telephony (inbound and outbound calls via Twilio) and a configurable voice pipeline — either a classic STT→LLM→TTS chain or OpenAI\'s low-latency Realtime API.',
          'Includes a webhook service that delivers call transcripts after each conversation ends, and a fully containerized deployment setup (Docker Compose) for the LiveKit server, the voice agent, and the call-management API.',
        ],
      },
      es: {
        title: 'LiveKit Voice Agent',
        oneLiner: 'Agente de voz en tiempo real sobre LiveKit con telefonía SIP entrante/saliente y un pipeline de voz basado en OpenAI.',
        description: [
          'Un agente de voz en tiempo real con forma de producción construido sobre LiveKit, con telefonía SIP completa (llamadas entrantes y salientes vía Twilio) y un pipeline de voz configurable — ya sea una cadena clásica STT→LLM→TTS o la API Realtime de baja latencia de OpenAI.',
          'Incluye un servicio de webhooks que entrega transcripciones de llamada al finalizar cada conversación, y una configuración de despliegue totalmente en contenedores (Docker Compose) para el servidor LiveKit, el agente de voz, y la API de gestión de llamadas.',
        ],
      },
    },
  },
  {
    id: 'whatsapp-data-agent',
    slug: 'whatsapp-data-agent',
    repoUrl: 'https://github.com/angelestrada14019/whatsapp-data-agent',
    categories: ['ai-agents'],
    techStack: [
      { label: 'Python' },
      { label: 'WhatsApp Cloud API' },
      { label: 'MCP' },
      { label: 'OpenAI' },
      { label: 'FastAPI' },
    ],
    featured: true,
    status: 'code-sample',
    image: '/illustrations/whatsapp-data-agent.svg',
    translations: {
      en: {
        title: 'WhatsApp Data Agent',
        oneLiner: 'AI agent on the official WhatsApp Cloud API that answers data questions by voice or text via MCP-backed PostgreSQL queries.',
        description: [
          'A conversational data-analysis agent on Meta\'s official WhatsApp Cloud API (not a third-party gateway). Understands voice notes (Whisper transcription) and text, runs safe, read-only PostgreSQL queries through an MCP server, and replies with charts, formatted Excel exports, or voice responses (ElevenLabs TTS).',
          'Built on the OpenAI Agents SDK with a async FastAPI backend. A Telegram-native sibling of this same core agent lives in a separate repo.',
        ],
      },
      es: {
        title: 'WhatsApp Data Agent',
        oneLiner: 'Agente de IA sobre la API oficial de WhatsApp Cloud que responde preguntas de datos por voz o texto vía consultas a PostgreSQL con MCP.',
        description: [
          'Un agente conversacional de análisis de datos sobre la API oficial de WhatsApp Cloud de Meta (no un gateway de terceros). Entiende notas de voz (transcripción con Whisper) y texto, ejecuta consultas seguras y de solo lectura a PostgreSQL a través de un servidor MCP, y responde con gráficos, exportaciones a Excel formateadas, o respuestas de voz (TTS de ElevenLabs).',
          'Construido sobre el OpenAI Agents SDK con un backend asíncrono en FastAPI. Una versión hermana de este mismo agente, nativa de Telegram, vive en un repositorio separado.',
        ],
      },
    },
  },
  {
    id: 'telegram-data-agent',
    slug: 'telegram-data-agent',
    repoUrl: 'https://github.com/angelestrada14019/telegram-data-agent',
    categories: ['ai-agents'],
    techStack: [
      { label: 'Python' },
      { label: 'Telegram' },
      { label: 'OpenAI' },
      { label: 'FastAPI' },
    ],
    featured: false,
    status: 'code-sample',
    image: '/illustrations/telegram-data-agent.svg',
    translations: {
      en: {
        title: 'Telegram Data Agent',
        oneLiner: 'The Telegram-native sibling of the WhatsApp data agent — same conversational data-analysis core, Telegram Bot API instead.',
        description: [
          'Shares its core agent, tools, and PostgreSQL/MCP integration with the WhatsApp Data Agent, adapted to the Telegram Bot API (polling mode) instead of WhatsApp Cloud API — voice notes, chart generation, and Excel export all carry over.',
        ],
      },
      es: {
        title: 'Telegram Data Agent',
        oneLiner: 'La versión nativa de Telegram del agente de datos de WhatsApp — el mismo núcleo de análisis conversacional, sobre la Bot API de Telegram.',
        description: [
          'Comparte su agente central, herramientas, e integración PostgreSQL/MCP con el WhatsApp Data Agent, adaptado a la Bot API de Telegram (modo polling) en vez de la API de WhatsApp Cloud — notas de voz, generación de gráficos y exportación a Excel se mantienen igual.',
        ],
      },
    },
  },
  {
    id: 'agent-chatbot',
    slug: 'agent-chatbot',
    repoUrl: 'https://github.com/angelestrada14019/agent-chatbot',
    categories: ['ai-agents'],
    techStack: [
      { label: 'Python' },
      { label: 'Evolution API' },
      { label: 'OpenAI' },
      { label: 'PostgreSQL' },
    ],
    featured: false,
    status: 'code-sample',
    image: '/illustrations/agent-chatbot.svg',
    translations: {
      en: {
        title: 'Agent Chatbot',
        oneLiner: 'WhatsApp AI agent (via Evolution API) for conversational data analysis, safe PostgreSQL queries, and chart/Excel generation.',
        description: [
          'A WhatsApp-based data agent built on Evolution API (a self-hosted WhatsApp gateway) rather than the official Cloud API — understands voice and text, runs safe read-only PostgreSQL queries, and generates charts and Excel exports. OpenAI Whisper for transcription, FastAPI for the async backend.',
        ],
      },
      es: {
        title: 'Agent Chatbot',
        oneLiner: 'Agente de IA para WhatsApp (vía Evolution API) para análisis conversacional de datos, consultas seguras a PostgreSQL, y generación de gráficos/Excel.',
        description: [
          'Un agente de datos sobre WhatsApp construido con Evolution API (un gateway de WhatsApp autoalojado) en vez de la API oficial de Cloud — entiende voz y texto, ejecuta consultas seguras y de solo lectura a PostgreSQL, y genera gráficos y exportaciones a Excel. OpenAI Whisper para transcripción, FastAPI para el backend asíncrono.',
        ],
      },
    },
  },
  {
    id: 'n8n-automation-templates',
    slug: 'n8n-automation-templates',
    repoUrl: 'https://github.com/angelestrada14019/n8n-automation-templates',
    categories: ['automation', 'ai-agents'],
    techStack: [
      { label: 'n8n' },
      { label: 'MCP' },
      { label: 'OpenRouter' },
    ],
    featured: true,
    status: 'code-sample',
    image: '/illustrations/n8n-automation-templates.svg',
    translations: {
      en: {
        title: 'n8n Automation Templates',
        oneLiner: 'A curated set of my own n8n workflows — multi-agent orchestration, RAG ingestion, an MCP server, and business process automation.',
        description: [
          'Twenty of my own n8n workflows, organized by what they do: a manager agent that routes messages to specialized sub-agents (calendar, email, research, tasks, notes); RAG ingestion pipelines that scrape/chunk/embed content into a hybrid-search knowledge base; an MCP server exposing Gmail, Calendar, Tasks, and Airtable as tools; and business-process automations like lead capture and scheduled reminders.',
          'Every workflow ships with an explanation of what it does and how it\'s wired — this is the collection I actually use, not a curated demo set.',
        ],
      },
      es: {
        title: 'n8n Automation Templates',
        oneLiner: 'Una selección de mis propios workflows de n8n — orquestación multiagente, ingestión RAG, un servidor MCP, y automatización de procesos de negocio.',
        description: [
          'Veinte de mis propios workflows de n8n, organizados por lo que hacen: un agente manager que enruta mensajes a sub-agentes especializados (calendario, email, investigación, tareas, notas); pipelines de ingestión RAG que extraen/dividen/embeben contenido en una base de conocimiento con búsqueda híbrida; un servidor MCP que expone Gmail, Calendar, Tasks y Airtable como herramientas; y automatizaciones de procesos de negocio como captura de leads y recordatorios programados.',
          'Cada workflow viene con una explicación de qué hace y cómo está armado — esta es la colección que realmente uso, no un set curado para demo.',
        ],
      },
    },
  },
  {
    id: 'healthcare-ai-agent-workflows',
    slug: 'healthcare-ai-agent-workflows',
    repoUrl: 'https://github.com/angelestrada14019/healthcare-ai-agent-workflows',
    categories: ['automation', 'ai-agents'],
    techStack: [
      { label: 'n8n' },
      { label: 'WhatsApp Cloud API' },
    ],
    featured: false,
    status: 'code-sample',
    image: '/illustrations/healthcare-ai-agent-workflows.svg',
    translations: {
      en: {
        title: 'Healthcare AI Agent Workflows',
        oneLiner: 'A multi-agent n8n system for a healthcare client engagement: patient scheduling, health education, and risk-based outreach.',
        description: [
          'A multi-agent workflow system built for a healthcare client engagement: a WhatsApp-based patient assistant handles appointment scheduling and health education questions, with proactive risk-based outreach flagging patients who need follow-up. An admin agent handles reporting.',
          'Shared here as a fully generic, credential-free version — all client-identifying details were stripped before publishing.',
        ],
      },
      es: {
        title: 'Healthcare AI Agent Workflows',
        oneLiner: 'Un sistema multiagente en n8n para un cliente del sector salud: agendamiento de pacientes, educación en salud, y contacto proactivo basado en riesgo.',
        description: [
          'Un sistema de workflows multiagente construido para un cliente del sector salud: un asistente de pacientes sobre WhatsApp maneja agendamiento de citas y preguntas de educación en salud, con contacto proactivo basado en riesgo que marca pacientes que necesitan seguimiento. Un agente admin maneja el reporting.',
          'Compartido aquí en una versión completamente genérica y sin credenciales — todo detalle que identificara al cliente fue removido antes de publicar.',
        ],
      },
    },
  },
  {
    id: 'obsidian-second-brain',
    slug: 'obsidian-second-brain',
    repoUrl: 'https://github.com/angelestrada14019/obsidian-second-brain',
    categories: ['automation'],
    techStack: [
      { label: 'Claude Code' },
      { label: 'MCP' },
      { label: 'Python' },
    ],
    featured: false,
    status: 'code-sample',
    image: '/illustrations/obsidian-second-brain.svg',
    translations: {
      en: {
        title: 'Obsidian Second Brain',
        oneLiner: 'A Claude Code skill that captures YouTube, NotebookLM, Drive, X/Twitter, LinkedIn, and RSS content into a cross-linked Obsidian vault.',
        description: [
          'An installable Claude Code skill implementing Andrej Karpathy\'s "LLM-wiki" pattern: capture content from a variety of sources and turn it into cross-linked, structured notes in an Obsidian vault, rather than a flat pile of unconnected clippings.',
        ],
      },
      es: {
        title: 'Obsidian Second Brain',
        oneLiner: 'Una skill de Claude Code que captura contenido de YouTube, NotebookLM, Drive, X/Twitter, LinkedIn y RSS en un vault de Obsidian interconectado.',
        description: [
          'Una skill instalable de Claude Code que implementa el patrón "LLM-wiki" de Andrej Karpathy: capturar contenido de varias fuentes y convertirlo en notas estructuradas e interconectadas dentro de un vault de Obsidian, en vez de un montón plano de recortes sin conexión entre sí.',
        ],
      },
    },
  },
  {
    id: 'NaturalQL',
    slug: 'naturalql',
    repoUrl: 'https://github.com/angelestrada14019/NaturalQL',
    categories: ['rag'],
    techStack: [
      { label: 'JavaScript' },
      { label: 'SQL' },
    ],
    featured: false,
    status: 'code-sample',
    image: '/illustrations/naturalql.svg',
    translations: {
      en: {
        title: 'NaturalQL',
        oneLiner: 'Chat with your database — a natural-language interface for querying data conversationally.',
        description: [
          'A natural-language-to-SQL interface: ask a question in plain language, get back a query and a readable answer — an early exploration of the same "chat with your data" pattern that shows up in several of the later agent projects.',
        ],
      },
      es: {
        title: 'NaturalQL',
        oneLiner: 'Chatea con tu base de datos — una interfaz en lenguaje natural para consultar datos conversacionalmente.',
        description: [
          'Una interfaz de lenguaje natural a SQL: haces una pregunta en lenguaje simple, y obtienes una consulta y una respuesta legible — una exploración temprana del mismo patrón "chatea con tus datos" que aparece en varios de los proyectos de agentes posteriores.',
        ],
      },
    },
  },
  {
    id: 'microservice_security_oauth2',
    slug: 'microservice-security-oauth2',
    repoUrl: 'https://github.com/angelestrada14019/microservice_security_oauth2',
    categories: ['backend-cloud'],
    techStack: [
      { label: 'Java' },
      { label: 'Spring Boot' },
      { label: 'OAuth2' },
    ],
    featured: false,
    status: 'code-sample',
    image: '/illustrations/microservice-security-oauth2.svg',
    translations: {
      en: {
        title: 'Microservice Security (OAuth2)',
        oneLiner: 'A Java/Spring Boot OAuth2 security implementation for microservice architectures.',
        description: [
          'A reference implementation of OAuth2-based security for Java Spring Boot microservices — the same backend security patterns used in production at Transborder and Carvajal, shown here as a standalone, self-contained example.',
        ],
      },
      es: {
        title: 'Microservice Security (OAuth2)',
        oneLiner: 'Una implementación de seguridad OAuth2 en Java/Spring Boot para arquitecturas de microservicios.',
        description: [
          'Una implementación de referencia de seguridad basada en OAuth2 para microservicios Java Spring Boot — los mismos patrones de seguridad backend usados en producción en Transborder y Carvajal, mostrados aquí como un ejemplo autocontenido.',
        ],
      },
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
