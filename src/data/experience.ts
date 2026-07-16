// Employer/contractor roles — no public repo to link, so these live on the
// About page timeline rather than the Projects grid. Two separate current
// roles per the CV: full-time at Transborder, and an independent AI
// contracting practice run in parallel — kept as distinct entries rather
// than folded into one, since they're different employers/engagements.

export interface ExperienceTranslation {
  summary: string
  highlights: string[]
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  startDate: string // YYYY-MM
  endDate?: string // undefined = present
  translations: { en: ExperienceTranslation; es: ExperienceTranslation }
}

export const experience: ExperienceEntry[] = [
  {
    id: 'ai-contractor',
    company: 'Self-Employed',
    role: 'AI Solutions Engineer (Contractor)',
    startDate: '2025-01',
    translations: {
      en: {
        summary: 'Independent AI engineering practice delivering production-ready orchestration, workflow automation, and data-analytics architectures for clients, run in parallel with my full-time role.',
        highlights: [
          'Architect multimedia AI agents on WhatsApp and Telegram using Python and n8n, with automated Excel data processing for scheduling and self-hosted Metabase dashboards for interactive analytics.',
          'Design production business workflows in n8n and engineer proof-of-concept autonomous agent networks on the OpenAI Agents SDK.',
          'Implement RAG and GraphRAG architectures in Python and n8n to give autonomous agents deep contextual data retrieval.',
          'Build and self-host custom Model Context Protocol (MCP) integrations and real-time Voice-AI agents on LiveKit, including full server deployment for low-latency interactions.',
          'Delivered results: low-latency voice AI in production, fully automated scheduling pipelines, and interactive real-time BI dashboards.',
        ],
      },
      es: {
        summary: 'Práctica independiente de ingeniería de IA — arquitecturas de orquestación, automatización de workflows, y analítica de datos listas para producción para clientes propios, en paralelo a mi rol de tiempo completo.',
        highlights: [
          'Diseño agentes de IA multimedia para WhatsApp y Telegram con Python y n8n, con procesamiento automatizado de Excel para agendamiento y dashboards de Metabase autoalojados para analítica interactiva.',
          'Diseño workflows de negocio en producción con n8n, y construyo redes de agentes autónomos como prueba de concepto sobre el OpenAI Agents SDK.',
          'Implemento arquitecturas RAG y GraphRAG en Python y n8n para darle a los agentes autónomos recuperación de contexto profunda.',
          'Construyo y autoalojo integraciones de Model Context Protocol (MCP) y agentes de voz en tiempo real sobre LiveKit, incluyendo el despliegue completo del servidor para interacciones de baja latencia.',
          'Resultados entregados: voz IA de baja latencia en producción, pipelines de agendamiento totalmente automatizados, y dashboards de BI interactivos en tiempo real.',
        ],
      },
    },
  },
  {
    id: 'transborder',
    company: 'Transborder',
    role: 'Senior Backend & AI Automation Engineer',
    startDate: '2023-11',
    translations: {
      en: {
        summary: 'Logistics-technology company delivering automated freight tariff processing, customs, and cross-border trade solutions.',
        highlights: [
          'Architected an automated freight tariff processing pipeline: n8n for secure customer data ingestion, triggering a Python (FastAPI) microservice parsing complex rate files with Pandas.',
          'Implemented autonomous agentic decision-making flows with LangGraph and RAG architectures, using Supabase for vector storage and semantic retrieval.',
          'Designed a multi-tenant SaaS architecture with strict data isolation using Azure B2C, Azure App Configuration, and Azure Key Vault.',
          'Engineer and maintain mission-critical Java 11 / Spring Boot microservices on Kubernetes, handling high-load logistics data.',
          'Automated infrastructure provisioning and deployments through CI/CD pipelines built with Azure DevOps and Terraform.',
          'Measurable impact: a 70%+ reduction in manual rate classification time, a 35% increase in query performance, and 97% uptime sustained on critical integrations.',
        ],
      },
      es: {
        summary: 'Empresa de tecnología logística que entrega procesamiento automatizado de tarifas de carga, aduanas, y soluciones de comercio transfronterizo.',
        highlights: [
          'Diseñé un pipeline automatizado de procesamiento de tarifas de carga: n8n para ingestión segura de datos de clientes, disparando un microservicio en Python (FastAPI) que procesa archivos de tarifas complejos con Pandas.',
          'Implementé flujos de decisión agénticos autónomos con LangGraph y arquitecturas RAG, usando Supabase para almacenamiento vectorial y recuperación semántica.',
          'Diseñé una arquitectura SaaS multi-tenant con aislamiento estricto de datos usando Azure B2C, Azure App Configuration, y Azure Key Vault.',
          'Desarrollo y mantengo microservicios críticos en Java 11 / Spring Boot sobre Kubernetes, manejando datos logísticos de alta carga.',
          'Automaticé el aprovisionamiento de infraestructura y despliegues mediante pipelines CI/CD construidos con Azure DevOps y Terraform.',
          'Impacto medible: una reducción de más del 70% en el tiempo de clasificación manual de tarifas, un aumento del 35% en el rendimiento de consultas, y 97% de uptime sostenido en integraciones críticas.',
        ],
      },
    },
  },
  {
    id: 'carvajal',
    company: 'Carvajal Tecnología y Servicios S.A.S',
    role: 'Software Engineer Expert',
    startDate: '2022-09',
    endDate: '2023-10',
    translations: {
      en: {
        summary: 'Enterprise technology and systems-integration company delivering B2B software solutions for corporate clients across Latin America.',
        highlights: [
          'Developed and maintained highly available Java 8/11 microservices using Spring Boot and Apache Camel for complex enterprise B2B data exchanges.',
          'Integrated and configured ActiveMQ messaging brokers, boosting system resilience under peak transactional loads.',
          'Enforced clean-code standards and static analysis using SonarQube, CheckStyle, and Jacoco — sustained 85%+ unit test coverage.',
          'Deployed scalable REST APIs on AWS EC2 with Kubernetes auto-scaling.',
        ],
      },
      es: {
        summary: 'Empresa de tecnología empresarial e integración de sistemas que entrega soluciones de software B2B para clientes corporativos en Latinoamérica.',
        highlights: [
          'Desarrollé y mantuve microservicios de alta disponibilidad en Java 8/11 con Spring Boot y Apache Camel para intercambios de datos B2B empresariales complejos.',
          'Integré y configuré brokers de mensajería ActiveMQ, mejorando la resiliencia del sistema bajo cargas transaccionales pico.',
          'Apliqué estándares de código limpio y análisis estático con SonarQube, CheckStyle y Jacoco — mantuve más de 85% de cobertura en pruebas unitarias.',
          'Desplegué APIs REST escalables en AWS EC2 con auto-escalado en Kubernetes.',
        ],
      },
    },
  },
]
