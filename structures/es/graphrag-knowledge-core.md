# 📂 GraphRAG Knowledge Core

> El espacio de trabajo canónico para una canalización de GraphRAG, extrayendo entidades y relaciones para construir un gráfico de conocimiento Neo4j para el razonamiento complejo de múltiples saltos.

📄 `graph-architecture-brief.md` # Resumen canónico: Define reglas de ontología, etiquetas de nodos y tipos de relaciones
🧠 `memory.md`                   # Memoria de sesión: Seguimiento dinámico del contexto de la sesión activa de extracción de entidades
🤖 `CLAUDE.md`                   # Reglas operativas: Instrucciones estrictas para generar consultas Cypher válidas

## 📁 ingestion-pipeline/ (4 habilidades - No estructurado a Gráfico)
📄 `document-chunker.md`         # Segmentación de texto optimizada para extracción de entidades en lugar de búsqueda vectorial
📄 `entity-extractor.md`         # Canalización LLM • identifica sustantivos clave, organizaciones y personas
📄 `relationship-mapper.md`      # Define los bordes semánticos entre entidades extraídas (p. ej., "WORKS_FOR", "OWNS")
📄 `ontology-enforcer.md`        # Evita nodos duplicados • asigna "Anthropic" y "Anthropic PBC" al mismo ID de entidad

## 📁 graph-database/ (3 habilidades - Sincronización Neo4j)
📄 `neo4j-connector.md`          # Autenticación segura y agrupación de conexiones para la base de datos de gráficos
📄 `batch-committer.md`          # Agrupa mutaciones de gráficos en transacciones masivas para evitar bloqueos de bases de datos
📄 `index-manager.md`            # Genera automáticamente índices de texto completo y vectoriales en propiedades de nodos para recuperación rápida

## 📁 retrieval-engine/ (4 habilidades - Generación de Consultas)
📄 `intent-classifier.md`        # Determina si la pregunta del usuario requiere una búsqueda vectorial o un recorrido de gráficos de múltiples saltos
📄 `cypher-generator.md`         # Traduce preguntas en lenguaje natural a consultas Neo4j Cypher altamente optimizadas
📄 `schema-injector.md`          # Pasa el esquema del gráfico al LLM para que sepa exactamente qué relaciones están disponibles
📄 `fallback-vector-search.md`   # Activa RAG estándar si la consulta Cypher devuelve vacío

## 📁 synthesis-layer/ (3 habilidades - Formato de Respuesta)
📄 `graph-context-formatter.md`  # Traduce rutas de gráficos JSON sin procesar de nuevo en contexto legible para el LLM
📄 `multi-hop-reasoner.md`       # Sintetiza respuestas que abarcan 3 o más grados de separación en el gráfico
📄 `github-final-sync.md`        # Confirmaciones automatizadas de definiciones de ontología actualizadas a repositorios finales de Github

## 📁 telemetry-evals/ (3 habilidades - Salud del Gráfico)
📄 `orphan-node-detector.md`     # Encuentra y limpia entidades que no tienen relaciones conectadas
📄 `extraction-cost-tracker.md`  # Monitorea la quema de tokens de canalizaciones de extracción de entidades pesadas en ejecución
📄 `cypher-error-logger.md`      # Rastrea fallos de sintaxis en consultas de gráficos generadas por LLM para ajuste fino

---
**Archivos de Configuración**
⚙️ `docker-compose.yml`          # Instancia local de Neo4j APOC e implementaciones de nodos de trabajadores
📦 `requirements.txt`            # Controlador Neo4j, LangChain Graph y dependencias del SDK de Anthropic
