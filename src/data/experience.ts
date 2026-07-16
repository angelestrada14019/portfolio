// Employer roles — no public repo to link, so these live on the About page
// timeline rather than the Projects grid.

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
