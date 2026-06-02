# 📂 Espacio de Trabajo de Agente Autónomo de Codificación
> El espacio de trabajo canónico para desplegar y gestionar agentes de codificación autónomos de calidad de producción, diseñados para ejecutar bucles de desarrollo continuo durante la noche e impulsar código validado de manera perfecta en sus repositorios finales.

📄 `agent-architecture-brief.md` # Descripción canónica: Define los permisos del agente, la pila tecnológica aprobada y los umbrales de intervención en el bucle humano (HITL)
🧠 `active-nightly-builds.md`    # Memoria de sesión: Seguimiento dinámico de contexto para tareas actuales de refactorización nocturna y errores de compilación sin resolver
🤖 `CLAUDE.md`                   # Reglas operativas: Instrucciones estrictas para evitar bucles de ejecución infinita y mandatar enrutamiento de API determinista

## 📁 agent-orchestration/ (4 habilidades - El Cerebro)
📄 `zaltaclaw-execution-loop.md` # El motor autónomo central que permite que el agente ZaltaClaw escriba, pruebe y depure código durante la noche sin intervención humana
📄 `claude-managed-agents.md`    # Configuraciones de integración para utilizar agentes gestionados de Claude en beta pública para tareas de razonamiento especializado
📄 `claude-code-integration.md`  # Envoltorios CLI que permiten al agente ejecutar comandos de shell y modificar archivos locales de forma segura
📄 `multi-agent-coordinator.md`  # Lógica de supervisor para enrutar tareas complejas a través de sistemas multi-agente alojados en AWS Bedrock

## 📁 compute-and-infrastructure/ (3 habilidades - Entorno de Ejecución)
📄 `mac-mini-host-config.md`     # Scripts de configuración para desplegar el bucle autónomo primario en una Mac mini dedicada para minimizar costos de inferencia en la nube
📄 `aws-bedrock-allocator.md`    # Configuraciones de Terraform para activar clústeres de agentes escalables bajo demanda para conductos RAG pesados
📄 `sandbox-container-rules.md`  # Configuraciones de Docker que garantizan que el agente no pueda eliminar accidentalmente archivos del sistema local durante una alucinación

## 📁 target-repositories/ (3 habilidades - Salida de Código)
📄 `health-api-backend.md`       # Procedimientos operativos estándar para el agente al contribuir al repositorio de backend Python/Node
📄 `health-ui-frontend.md`       # Estructuras de componentes y pautas de estilo para el agente al actualizar el repositorio de frontend Next.js/React
📄 `github-final-sync.md`        # Activadores de CI/CD automatizados que validan el trabajo nocturno del agente e lo fusionan de forma limpia en los repositorios Github finales

## 📁 frontend-asset-pipeline/ (3 habilidades - Salvaguardas de UI y Diseño)
📄 `texture-and-color-guardrails.md` # Reglas estrictas que interceptan las herramientas de generación de imágenes del agente: deben preservar absolutamente los colores de pintura originales durante mejoras de imágenes del sitio web, e imponer texturas hiperrealistas (por ejemplo, que coincidan con un coco verde natural) mientras se eliminan los logotipos de monstruos de terceros no deseados
📄 `responsive-layout-tester.md` # Scripts de Playwright que el agente ejecuta para verificar que las cuadrículas CSS no se rompan en ventanas móviles
📄 `component-storyboarder.md`   # Genera automáticamente entradas de Storybook para cualquier elemento de interfaz de usuario nuevo que cree el agente

## 📁 evals-and-telemetry/ (3 habilidades - Control de Calidad)
📄 `compile-success-tracker.md`  # Monitorea la relación de compilaciones nocturnas exitosas frente a errores de sintaxis generados por el agente
📄 `token-burn-alerter.md`       # Límites duros que pausan instantáneamente el bucle ZaltaClaw si el uso de tokens de API se dispara anormalmente
📄 `code-review-llm.md`          # Un agente secundario e aislado que exclusivamente critica y califica las solicitudes de extracción del agente primario

---
**Archivos de Configuración**
⚙️ `agent-permissions.json`      # Comandos CLI incluidos en la lista blanca (por ejemplo, `npm run build`, `git commit`) que el agente puede ejecutar legalmente
📦 `bedrock-models.yaml`         # Fijación de versiones para modelos de fundación específicos de AWS Bedrock para evitar cambios de indicación

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
