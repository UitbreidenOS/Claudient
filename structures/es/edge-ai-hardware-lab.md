# 📂 Laboratorio de Hardware AI de Borde
> El espacio de trabajo canónico para un Fundador de IA que opera en la intersección del compute de hardware local (cluster Mac mini, Nvidia DGX), fabricación física 3D (Bambu Lab), e implementación de SaaS multi-agente.

📄 `lab-architecture-brief.md`      # Resumen canónico: Topología de hardware, estrategia de asignación de compute, pipeline de inferencia, y modelo de monetización SaaS
🧠 `active-hardware-jobs.md`        # Memoria de sesión: Seguimiento en tiempo real de utilización de cluster, impresiones 3D en vuelo, cola de inferencia de modelos, y costo por solicitud
🤖 `CLAUDE.md`                      # Reglas operativas: Aislamiento estricto de recursos entre inferencia/fabricación, aplicar decisiones de diseño hardware-first, prohibir sobreasignación más allá del 85% de utilización de compute

## 📁 local-compute-cluster/ (4 habilidades - Compute Físico)
📄 `mac-mini-m4-cluster-setup.md`   # Configuración para cluster de 4 nodos Mac mini M4 que ejecuta servicios de inferencia y coordinación de agentes con orquestación SSH unificada
📄 `nvidia-dgx-spark-routing.md`    # Reglas de asignación de compute, configuración de CUDA/cuDNN, y colas de prioridad de tareas para descargar inferencia pesada de LLM y fine-tuning
📄 `edge-inference-gateway.md`       # Balanceo de carga, optimización de latencia, y estrategias de fallback cuando el compute local se satura; enrutamiento a endpoints gestionados
📄 `cluster-health-monitoring.md`    # Métricas Prometheus, alertas de temperatura, seguimiento de consumo de potencia, y disparadores de apagado automático para prevenir daño de hardware

## 📁 3d-fabrication-ops/ (4 habilidades - Pipeline de Fabricación)
📄 `bambu-x1c-slicer-automation.md` # Generación de G-code, perfiles multi-material, programación de impresión nocturna, y seguimiento de costo de filamento por unidad producida
📄 `hardware-design-validation.md`   # Verificaciones de CAD a gcode, validación de espesor de pared, análisis de remoción de soportes, y verificaciones de integridad estructural para enclosures desplegados en borde
📄 `print-queue-dispatcher.md`       # Planificador de trabajos priorizando ejecuciones de impresión, flujos de cambio de material, y recuperación automática de fallos con lógica de reintento predicha por ML
📄 `manufacturing-cost-ledger.md`    # Seguimiento de costo de material por unidad, registro de consumo de energía, asignación de horas de máquina, y análisis de punto de equilibrio para cada variante de producto

## 📁 agent-deployment/ (4 habilidades - Fuerza de Trabajo SaaS)
📄 `multi-agent-orchestrator.md`    # Máquina de estados para enrutamiento de tareas entre Agentes Claude ejecutándose en local, gestión de entregas y coordinación asincrónica
📄 `inference-service-deployment.md`# Tiempos de ejecución de agente en contenedores en cluster Mac, reglas de escalado, fijación de versión, y flujos de prueba A/B para actualizaciones de modelos
📄 `edge-api-gateway.md`             # Endpoints REST/WebSocket expuestos a clientes, throttling de solicitudes, tokens de autenticación, y medición de uso para facturación
📄 `managed-agent-integration.md`    # Puente de fallback a Claude Managed Agents API para capacidad de ráfaga, seguimiento de costo por token, y lógica de cambio automático

## 📁 edge-inference/ (3 habilidades - Operaciones de Modelo)
📄 `quantized-model-registry.md`     # Versionado y despliegue de modelos GGUF/ONNX, perfiles de cuantización 4-bit/8-bit para inferencia en Mac mini, benchmarks de latencia
📄 `fine-tuning-pipeline.md`         # Flujos LoRA/QLoRA locales en DGX Spark, versionado de dataset, seguimiento de split de validación, e implementación de prueba A/B para modelos personalizados
📄 `inference-caching-strategy.md`   # Caching a nivel de token, gestión de caché KV, optimización de ventana de contexto, y seguimiento de personalización de modelos por cliente

## 📁 cost-optimization/ (3 habilidades - Economía y Eficiencia)
📄 `unit-economics-dashboard.md`     # Costo en tiempo real por inferencia, márgenes brutos por feature, asignaciones de DRI para reducción de costos, y análisis de punto de equilibrio por cohorte de cliente
📄 `hardware-utilization-tuning.md`  # Optimización de tamaño de lote, programación de inferencia para minimizar tiempo inactivo, recuperación de throttling térmico, y optimización de consumo de potencia por carga de trabajo
📄 `capacity-planning-rules.md`      # Pronóstico de demanda, disparadores de expansión de cluster cuando la utilización sostenida excede el 75%, cronogramas de depreciación, y modelos de ROI para ciclos de actualización de hardware

---
**Archivos de Configuración**
⚙️ `hardware-topology.yaml`         # Inventario de nodos (cantidad de Mac mini M4, especificaciones de DGX Spark), topología de red, mapeos de endpoints de inferencia, y reglas de failover
⚙️ `edge-agent-manifest.json`       # Lista de agentes desplegados, núcleos de CPU asignados por agente, reservas de memoria, y asignaciones de modelos de inferencia por servicio
⚙️ `manufacturing-bill-of-materials.yaml` # Costos de partes, tiempos de entrega, proveedores, y disparadores de reorden para filamento y consumibles de hardware
📦 `requirements.txt`               # Dependencias Python (cargadores GGUF, librerías de cuantización, SDKs de monitoreo, frameworks de inferencia para despliegue en borde)

---

🔗 **[Uitbreiden — construyendo productos de IA y herramientas B2B con comunidades de desarrolladores.](https://uitbreiden.com/)**
📺 **[Suscríbete a nuestro Canal de YouTube para más análisis profundos](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
