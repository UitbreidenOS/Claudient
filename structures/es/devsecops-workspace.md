# 📂 DevSecOps Workspace
> El espacio de trabajo canónico para un Ingeniero de Seguridad o líder de DevSecOps, diseñado para automatizar el modelado de amenazas, clasificar vulnerabilidades y aplicar políticas de confianza cero sin ralentizar la canalización de ingeniería.

📄 `security-charter.md`       # Documento canónico: Principios de confianza cero, matriz de clasificación de datos y umbrales de riesgo aceptable
🧠 `active-audits-memory.md`   # Memoria de sesión: Seguimiento de contexto dinámico para pruebas de penetración activas y mitigaciones de CVE en curso
🤖 `CLAUDE.md`                 # Reglas operativas: Instrucciones estrictas para NUNCA generar secretos sin encriptar, credenciales codificadas o controles RBAC omitidos

## 📁 threat-modeling/ (4 habilidades - Defensa Proactiva)
📄 `stride-analyzer.md`        # Marco para mapear Suplantación, Manipulación, Repudio, Divulgación de Información, Denegación de Servicio y Elevación de Privilegios
📄 `attack-tree-builder.md`    # Genera rutas visuales que un adversario podría tomar para comprometer un microservicio específico
📄 `secure-design-reviewer.md` # Analiza documentos de requisitos y diagramas de arquitectura para marcar defectos de seguridad antes de que se escriba código
📄 `red-team-scenarios.md`     # Redacta simulaciones de brechas específicas para ejercicios de mesa de trabajo de ingeniería

## 📁 vulnerability-management/ (3 habilidades - AppSec)
📄 `cve-triage-bot.md`         # Filtra alertas ruidosas de Dependabot/Snyk, priorizando correcciones basadas en capacidad de explotación (EPSS) y contexto comercial
📄 `sast-dast-orchestrator.md` # Reglas de CI/CD para Pruebas de Seguridad de Aplicaciones Estáticas y Dinámicas (ej. SonarQube, OWASP ZAP)
📄 `patch-management-sla.md`   # Rastrea plazos de mitigación (ej. Crítico = 24h, Alto = 7 días) y escala SLA incumplidos

## 📁 infrastructure-security/ (3 habilidades - Seguridad en la Nube)
📄 `iam-policy-generator.md`   # Genera políticas AWS IAM/GCP de menor privilegio, evitando completamente acceso a recursos `"*"`
📄 `cspm-auditor.md`           # Gestión de Postura de Seguridad en la Nube • marca buckets S3 públicos, puerto 22 abierto e instancias RDS sin encriptar
📄 `secret-rotation-engine.md` # Flujos de trabajo para rotación segura de claves API y credenciales de base de datos a través de HashiCorp Vault o AWS Secrets Manager

## 📁 incident-response/ (4 habilidades - Lucha contra Incidentes y Análisis Forense)
📄 `breach-playbook.md`        # Instrucciones paso a paso de contención para escenarios específicos (ej. Ransomware, Amenaza Interna, Relleno de Credenciales)
📄 `forensics-log-parser.md`   # Analiza CloudTrail y registros de VPC Flow para rastrear el movimiento lateral exacto de un atacante
📄 `ioc-extractor.md`          # Extrae Indicadores de Compromiso (IP, hash de archivo, dominios) de reportes de inteligencia de amenazas
📄 `post-mortem-generator.md`  # Redacta la revisión de incidente sin culpables y análisis de causa raíz después de un evento de seguridad

## 📁 compliance-and-audit/ (3 habilidades - Gobernanza)
📄 `soc2-evidence-collector.md`# Automatiza la recopilación de registros de verificación de antecedentes, revisiones de acceso y resúmenes de pruebas de penetración para auditores externos
📄 `gdpr-anonymizer.md`        # Scripts para asegurar que PII (Información de Identificación Personal) sea eliminada de bases de datos de ensayo
📄 `github-final-sync.md`      # Acción CI/CD para confirmar plantillas de configuración endurecida y modelos de amenaza sanitizados en repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `semgrep-rules.yaml`        # Reglas de análisis estático personalizadas adaptadas específicamente al stack tecnológico de la empresa
📦 `opa-policies.rego`         # Reglas Open Policy Agent que aplican cumplimiento de infraestructura en la capa Kubernetes/Terraform

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
