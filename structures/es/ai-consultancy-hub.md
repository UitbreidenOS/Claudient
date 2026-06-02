# Centro de Consultoría de IA

Una estructura integral de espacio de trabajo de Claude Code para un Arquitecto de IA que gestiona una consultoría de IA global con implementaciones multi-región, flujos de propuestas complejos y gestión de clientes empresariales.

---

## Descripción General del Espacio de Trabajo

Esta estructura admite:
- Entrega de proyectos multi-cliente con seguimiento de SLA
- Generación de propuestas y gestión de acuerdos a través de Notion CRM
- Aprovisionamiento de infraestructura como código (AWS/GCP multi-región)
- Base de conocimiento para reutilización de soluciones y lecciones aprendidas
- Generación de contenido de liderazgo intelectual y operaciones de webinarios
- Monitoreo de conformidad (SOC 2, GDPR, ISO 27001)

---

## Estructura de Directorios

```
ai-consultancy-hub/
├── client-delivery/
│   ├── proposal-generation.md
│   ├── deployment-orchestration.md
│   ├── client-onboarding.md
│   ├── sla-monitoring.md
│   └── config/
│       ├── sla-matrix.json
│       └── client-taxonomy.json
│
├── deployment-infrastructure/
│   ├── terraform-provisioning.md
│   ├── cicd-orchestration.md
│   ├── observability-stack.md
│   ├── compliance-automation.md
│   └── config/
│       ├── terraform/
│       │   ├── aws-multi-region.tf
│       │   ├── gcp-multi-region.tf
│       │   └── modules/
│       │       ├── vpc.tf
│       │       ├── k8s-cluster.tf
│       │       ├── rds-postgres.tf
│       │       └── redis-cache.tf
│       └── secrets-rotation.json
│
├── proposal-engine/
│   ├── scope-analysis.md
│   ├── cost-calculation.md
│   ├── deal-tracking-notion.md
│   └── config/
│       ├── pricing-matrix.json
│       ├── service-catalog.json
│       └── stripe-integration.json
│
├── knowledge-management/
│   ├── client-context-persistence.md
│   ├── solution-library.md
│   ├── tech-debt-ledger.md
│   ├── retrospectives.md
│   └── kb/
│       ├── reference-architectures/
│       ├── case-studies/
│       ├── lessons-learned/
│       └── solution-templates/
│
├── content-and-growth/
│   ├── thought-leadership.md
│   ├── webinar-operations.md
│   ├── referral-engine.md
│   └── config/
│       ├── content-calendar.json
│       └── speaker-schedule.json
│
├── integrations/
│   ├── notion-crm.json
│   ├── slack-webhooks.json
│   ├── stripe-api.json
│   └── github-sync.json
│
└── README.md
```

---

## Definiciones de Habilidades

### Entrega de Clientes (4 habilidades)

#### 1. Generación de Propuestas
**Trigger**: Al iniciar un nuevo compromiso con cliente o responder a una RFP
**Output**: Documento Notion con alcance, diagrama de arquitectura, cronograma y desglose de costos
- Analizar requisitos del cliente desde email/Slack
- Generar SOW con hitos
- Crear plan de asignación de recursos
- Estimar cronograma de entrega
- Calcular costos usando la matriz de precios
- Exportar a Notion CRM para seguimiento de acuerdos
- Generar PDF para revisión del cliente

**Config**: `config/sla-matrix.json`, `config/client-taxonomy.json`

#### 2. Orquestación de Implementación
**Trigger**: Aprobación del cliente de la propuesta y fecha de lanzamiento
**Output**: Infraestructura multi-región completamente aprovisionada con paneles de monitoreo
- Seleccionar proveedor en la nube (AWS/GCP) y regiones según geografía del cliente
- Ejecutar aprovisionamiento Terraform a través del pipeline CI/CD
- Configurar conmutación por error de DNS y equilibrio de carga
- Configurar observabilidad (DataDog/New Relic)
- Crear libros de ejecución y procedimientos de escalamiento de incidentes
- Notificar al canal #deployments de Slack con detalles de acceso

**Config**: `deployment-infrastructure/config/terraform/`

#### 3. Incorporación de Clientes
**Trigger**: Después del despliegue de infraestructura
**Output**: Wiki de base de conocimiento, credenciales de acceso, cronograma de capacitación
- Crear sitio de documentación del cliente (Docusaurus/Sphinx)
- Programar llamadas de incorporación y capacitación
- Compartir diagramas de arquitectura y libros de ejecución
- Aprovisionar claves de API y puntos finales de webhook
- Configurar paneles de monitoreo para equipos de clientes
- Crear puente de Slack para escalamiento de soporte 24/7

**Config**: `integrations/slack-webhooks.json`

#### 4. Monitoreo de SLA
**Trigger**: Continuo durante el compromiso con el cliente
**Output**: Informe semanal de cumplimiento de SLA; alertas sobre incumplimientos
- Rastrear métricas de disponibilidad en todas las regiones
- Monitorear latencia de API y tasas de error
- Calcular porcentaje de disponibilidad mensual
- Generar panel de control de SLA en Grafana
- Alertar sobre incumplimientos de umbral (Slack, PagerDuty)
- Preparar informes de cumplimiento mensuales
- Reconciliar créditos/penalizaciones a través de Stripe

**Config**: `config/sla-matrix.json`

---

### Infraestructura de Implementación (4 habilidades)

#### 1. Aprovisionamiento Terraform
**Trigger**: Antes del lanzamiento del cliente o actualización de infraestructura
**Output**: VPCs, clústeres Kubernetes, bases de datos desplegadas en múltiples regiones
- Analizar requisitos de propuesta de Notion
- Seleccionar regiones AWS/GCP apropiadas para latencia/conformidad
- Aprovisionar VPCs, subredes, puertas de enlace NAT
- Desplegar Kubernetes administrado (EKS/GKE)
- Configurar RDS multi-AZ o Cloud SQL
- Configurar Redis para almacenamiento en caché
- Habilitar cifrado en reposo y en tránsito
- Planificar y aplicar Terraform con puertas de aprobación

**Config**: `deployment-infrastructure/config/terraform/aws-multi-region.tf`, `gcp-multi-region.tf`

#### 2. Orquestación CI/CD
**Trigger**: Push de código a GitHub; solicitud de despliegue del cliente
**Output**: Pipeline de compilación, prueba e implementación automatizado
- Definir flujos de trabajo de GitHub Actions / GitLab CI
- Compilar imágenes Docker y empujar a ECR/GCR
- Ejecutar análisis de seguridad (SAST, DAST, escaneo de contenedores)
- Ejecutar pruebas automatizadas (unitarias, integración, carga)
- Desplegar en ambiente de preparación para control de calidad
- Requerir aprobación antes del despliegue en producción
- Realizar implementaciones canaria/azul-verde
- Revertir en fallos de verificación de estado

**Config**: `.github/workflows/` o `.gitlab-ci.yml`

#### 3. Pila de Observabilidad
**Trigger**: Después del despliegue de infraestructura; monitoreo continuo
**Output**: Monitoreo, registro, seguimiento y alertas integrados
- Desplegar Prometheus + Grafana para métricas
- Configurar registro centralizado (ELK stack, Cloud Logging)
- Configurar seguimiento distribuido (Jaeger, DataDog)
- Crear paneles para visibilidad del cliente
- Definir reglas de alerta (altas tasas de error, picos de latencia)
- Configurar rotación de guardia y políticas de escalamiento
- Generar informes y tendencias de SLO

**Config**: Configuraciones de extracción de Prometheus, JSON de paneles de Grafana

#### 4. Automatización de Conformidad
**Trigger**: Trimestral o en cada lanzamiento de nueva característica
**Output**: Resultados de análisis de conformidad, registro de auditoría, tareas de remediación
- Escanear infraestructura en busca de configuraciones incorrectas de seguridad (Prowler, Cloud Asset Inventory)
- Verificar estado de cifrado (TLS, cifrado en reposo)
- Comprobar políticas de IAM para violaciones de privilegios mínimos
- Validar requisitos de residencia de datos de GDPR
- Generar registros de auditoría de SOC 2 y atestación
- Rastrear deuda de conformidad en Notion
- Programar tareas de remediación con propietarios

**Config**: `config/secrets-rotation.json`

---

### Motor de Propuestas (3 habilidades)

#### 1. Análisis de Alcance
**Trigger**: Nueva consulta de cliente o RFP recibida
**Output**: Documento de alcance estructurado con criterios de aceptación y entregables
- Extraer requisitos del resumen del cliente o RFP
- Identificar restricciones técnicas y riesgos
- Mapear requisitos a ofertas de servicios
- Definir métricas de éxito y criterios de aceptación
- Señalar riesgos de expansión del alcance
- Estimar esfuerzo en puntos de historia
- Crear matriz de dependencia con otros servicios

**Config**: `config/service-catalog.json`

#### 2. Cálculo de Costos
**Trigger**: Después de la aprobación del análisis de alcance
**Output**: Desglose detallado de costos, opciones de precios, análisis de ROI
- Estimar costos de computación, almacenamiento y transferencia de datos
- Consultar precios de API de precios de AWS/GCP
- Calcular esfuerzo del equipo (ingeniería, arquitectura, operaciones)
- Aplicar margen y contingencia
- Generar tabla de comparación de costos (nube vs local)
- Ofrecer opciones de precios flexibles (mensual, anual, basado en uso)
- Calcular período de recuperación para el cliente
- Exportar a Stripe para configuración de facturación

**Config**: `config/pricing-matrix.json`, `integrations/stripe-api.json`

#### 3. Seguimiento de Acuerdos (Notion CRM)
**Trigger**: Después de enviar propuesta; gestión continua de acuerdos
**Output**: Entradas de base de datos de Notion sincronizadas entre equipos de ventas, entrega y finanzas
- Crear registro de base de datos de Notion con todos los detalles de la propuesta
- Agregar información de contacto del cliente, presupuesto y fecha de decisión
- Vincular a arquitecturas de referencia y casos de estudio relevantes
- Rastrear etapas de acuerdos (Descubrimiento → Propuesta → Negociación → Firmado)
- Calcular probabilidad de ganancia e ingresos del pipeline
- Activar alertas para acuerdos en riesgo
- Sincronizar con Stripe para generación de facturas en la firma
- Archivar acuerdos cerrados para análisis retrospectivo

**Config**: `integrations/notion-crm.json`

---

### Gestión del Conocimiento (4 habilidades)

#### 1. Persistencia de Contexto del Cliente
**Trigger**: Durante el compromiso continuo; antes de tickets de soporte
**Output**: Base de conocimiento con información específica del cliente
- Documentar contexto comercial y objetivos del cliente
- Mantener diagramas de arquitectura (Miro, Figma)
- Almacenar documentación de API y puntos de integración
- Mantener libros de ejecución para escenarios de solución de problemas comunes
- Rastrear configuraciones personalizadas y desviaciones del estándar
- Registrar tickets de soporte y resoluciones
- Crear listas de verificación y procedimientos específicos del cliente
- Controlar versiones de toda la documentación

**Config**: Estructura del directorio `kb/`

#### 2. Biblioteca de Soluciones
**Trigger**: Durante la generación de propuestas; después de la finalización de la entrega
**Output**: Plantillas de soluciones reutilizables y arquitecturas de referencia
- Catalogar patrones de arquitectura probados (microservicios, impulsados por eventos, pipeline de datos)
- Documentar pilas tecnológicas y compensaciones
- Crear módulos Terraform para despliegue rápido
- Mantener imágenes base Docker optimizadas para cargas de trabajo comunes
- Almacenar configuraciones de puerta de enlace de API y patrones de middleware
- Crear biblioteca de funciones Lambda / Cloud Functions
- Rastrear tiempos de despliegue y uso de recursos por patrón
- Compartir entre equipo y clientes (con controles de acceso)

**Config**: `kb/reference-architectures/`, `kb/solution-templates/`

#### 3. Registro de Deuda Técnica
**Trigger**: Retrospectivas post-despliegue; revisiones trimestrales
**Output**: Registro pendiente priorizado de mejoras técnicas
- Registrar problemas conocidos y limitaciones en sistemas de producción
- Estimar esfuerzo de remediación e impacto comercial
- Rastrear actualizaciones de dependencias y registro de parches de seguridad
- Documentar mejoras arquitectónicas necesarias
- Programar sprints de deuda técnica entre proyectos de clientes
- Monitorear vulnerabilidades (CVEs, escaneo de dependencias)
- Calcular interés de deuda técnica (costo de retrasar correcciones)
- Presentar opciones al cliente para abordar la deuda

**Config**: `kb/tech-debt-ledger/`

#### 4. Retrospectivas
**Trigger**: Fin de fase de compromiso o trimestralmente
**Output**: Documento de lecciones aprendidas con elementos de acción
- Realizar análisis post-mortem sobre éxitos y fracasos
- Documentar qué salió bien y qué podría mejorar
- Capturar sobrecostos y desviaciones de cronograma
- Recopilar retroalimentación de equipo y cliente
- Actualizar biblioteca de soluciones con nuevos patrones
- Generar material de capacitación desde lecciones aprendidas
- Compartir información en contenido de liderazgo intelectual
- Actualizar matriz de SLA según desempeño real

**Config**: `kb/lessons-learned/`

---

### Contenido y Crecimiento (3 habilidades)

#### 1. Liderazgo Intelectual
**Trigger**: Planificación trimestral de contenido; después de compromiso significativo
**Output**: Publicaciones de blog, libros blancos, casos de estudio para marketing y construcción de marca
- Identificar temas populares en consultoría de IA/nube
- Escribir análisis técnicos profundos sobre patrones de arquitectura
- Desarrollar casos de estudio de compromisos exitosos con clientes (anonimizados)
- Crear guías de comparación (proveedores en la nube, arquitecturas, herramientas)
- Generar juegos de diapositivas para charlas de conferencias
- Producir resúmenes de contenido de video
- Publicar en blog de empresa, LinkedIn, Medium
- Rastrear métricas de engagement y optimizar temas
- Crear portafolio de liderazgo intelectual para el equipo

**Config**: `config/content-calendar.json`

#### 2. Operaciones de Webinarios
**Trigger**: Mensual o trimestral; alrededor de lanzamientos de productos
**Output**: Webinarios programados con promoción, diapositivas y campañas de seguimiento
- Planificar temas de webinarios e identificar oradores internos
- Programar oradores y ensayos técnicos
- Crear juegos de diapositivas y demostraciones en vivo
- Promocionar a través de email, LinkedIn y Slack
- Gestionar registros y seguimiento de asistentes
- Grabar webinarios y crear clips destacados
- Generar publicación de recapitulación de webinario
- Rastrear conversiones desde webinario a pipeline de ventas
- Mantener cronograma de oradores y rotación

**Config**: `config/speaker-schedule.json`

#### 3. Motor de Referidos
**Trigger**: Después de compromiso exitoso con cliente o cuando se generan nuevos leads
**Output**: Campaña de referidos con seguimiento y recompensas
- Identificar clientes y socios satisfechos para referidos
- Crear programa de incentivos de referidos (descuentos, créditos, recompensas)
- Generar enlaces y códigos de referencia únicos
- Rastrear atribución de referidos en Notion CRM
- Enviar pagos de gracias y comisiones a través de Stripe
- Nutrir socios de referidos con contenido educativo
- Analizar ROI de referidos y optimizar orientación
- Escalar canales de referidos más exitosos

**Config**: `integrations/stripe-api.json`

---

## Puntos de Integración

### Notion CRM
- **Archivo**: `integrations/notion-crm.json`
- **Uso**: Seguimiento de acuerdos, historial de propuestas, registros de clientes
- **Sincronización**: Activada por generación de propuestas e informes de SLA

### Webhooks de Slack
- **Archivo**: `integrations/slack-webhooks.json`
- **Uso**: Escalamiento de incidentes, notificaciones de despliegue, alertas de SLA
- **Canales**: #deployments, #incidents, #sales, #support

### API de Stripe
- **Archivo**: `integrations/stripe-api.json`
- **Uso**: Generación de facturas, seguimiento de costos, pagos de referidos
- **Flujo**: Activado después de firma de contrato y mensualmente para créditos de SLA

### Sincronización de GitHub
- **Archivo**: `integrations/github-sync.json`
- **Uso**: Control de versiones de infraestructura como código, flujos de trabajo CI/CD
- **Ramas**: `main` (producción), `staging`, `dev` por cliente

---

## Archivos de Configuración

### Matriz de SLA
**Archivo**: `config/sla-matrix.json`
```json
{
  "service_levels": {
    "premium": {
      "uptime_slo": 99.99,
      "response_time_p99": 100,
      "support_hours": "24/7",
      "incident_resolution": "4h",
      "price_per_hour": 500
    },
    "standard": {
      "uptime_slo": 99.9,
      "response_time_p99": 500,
      "support_hours": "business",
      "incident_resolution": "8h",
      "price_per_hour": 250
    }
  }
}
```

### Matriz de Precios
**Archivo**: `config/pricing-matrix.json`
- Costos de despliegue por región (transferencia de datos, computación, almacenamiento)
- Tarifas horarias de ingeniería por nivel de antigüedad
- Asignación de tiempo de arquitectura y diseño
- Soporte operativo (guardia, créditos de SLA)
- Prima de servicios administrados

### Catálogo de Servicios
**Archivo**: `config/service-catalog.json`
- Niveles de servicio disponibles (pequeño, mediano, empresa)
- Opciones de pila tecnológica (computación, base de datos, mensajería)
- Servicios complementarios (monitoreo, conformidad, capacitación)
- Estimaciones de cronograma de entrega por servicio

### Taxonomía de Clientes
**Archivo**: `config/client-taxonomy.json`
- Clasificaciones de industria (fintech, healthtech, e-commerce, etc.)
- Categorías de tamaño de empresa (startup, SMB, empresa)
- Preferencias de despliegue (AWS, GCP, híbrido, local)
- Requisitos de conformidad (HIPAA, PCI-DSS, SOC 2, GDPR)

---

## Gestión de Secretos

**Archivo**: `config/secrets-rotation.json`

Todas las credenciales (claves de API, contraseñas de base de datos, certificados TLS) son:
- Almacenadas en AWS Secrets Manager / GCP Secret Manager por región
- Rotadas automáticamente según un cronograma
- Accedidas mediante roles de IAM (nunca comprometidas en Git)
- Registradas para registros de auditoría
- Sincronizadas a ambientes de clientes de forma segura

---

## Flujos de Trabajo Mensuales

1. **Informe de Cumplimiento de SLA**: Generar resumen de disponibilidad, tasas de error y costo
2. **Revisión de Deuda Técnica**: Priorizar y programar remediación
3. **Planificación del Calendario de Contenido**: Planificar liderazgo intelectual y webinarios
4. **Análisis del Pipeline de Referidos**: Rastrear atribución y ROI
5. **Optimización de Costos**: Revisar gastos en la nube y ajustar capacidad reservada
6. **Retrospectiva del Equipo**: Lecciones aprendidas y mejoras de procesos

---

## Cómo Adaptar Esta Estructura

### Para consultorías más pequeñas:
- Combinar `client-delivery/` y `deployment-infrastructure/` en una carpeta `operations/` única
- Fusionar `proposal-engine/` con `knowledge-management/`
- Reducir a 1-2 iniciativas de liderazgo intelectual por trimestre

### Para consultorías enfocadas en productos:
- Agregar carpeta `product-development/` con control de versiones y gestión de lanzamientos
- Énfasis en componentes reutilizables y licencia de IP
- Separar `solution-marketplace/` para ofertas empaquetadas

### Para proveedores de servicios administrados:
- Expandir `observability-stack/` con gestión de incidentes 24/7
- Agregar carpeta `customer-success/` para incorporación y retención
- Enfatizar cumplimiento de SLA y métricas de disponibilidad

---

## Primeros Pasos

1. Clonar la plantilla del espacio de trabajo en su proyecto de Claude Code
2. Actualizar archivos `config/` con su precios, regiones y estructura de equipo
3. Configurar integración de Notion agregando clave de API a `integrations/notion-crm.json`
4. Configurar webhooks de Slack para canales de incidentes y despliegues
5. Crear cuentas de servicio de AWS/GCP y almacenar credenciales en Secrets Manager
6. Personalizar módulos Terraform para sus patrones de infraestructura estándar
7. Agregar sus arquitecturas de referencia y casos de estudio a `kb/`
8. Programar retrospectivas mensuales y revisiones de deuda técnica
9. Crear su calendario de contenido de liderazgo intelectual
10. Habilitar flujos de trabajo de GitHub Actions para automatización CI/CD

---

## Referencias

- [AWS Best Practices](https://docs.aws.amazon.com/whitepapers/)
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)
- [Terraform Best Practices](https://terraform.io/docs/configuration/best-practices.html)
- [Kubernetes Hardening Guide](https://kubernetes.io/docs/concepts/security/)
- [SOC 2 Compliance Checklist](https://www.aicpa.org/soc2)
