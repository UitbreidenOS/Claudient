# 📂 RAG Empresarial Avanzado
> El espacio de trabajo canónico para un pipeline de Generación Aumentada por Recuperación (RAG) de grado producción utilizando búsqueda híbrida, fragmentación padre-hijo y re-ranking con codificador cruzado.

📄 `rag-architecture-brief.md`  # Resumen canónico: Pesos de búsqueda (palabra clave vs. semántica) y límites de fragmentación
🧠 `memory.md`                  # Memoria de sesión: Seguimiento dinámico del contexto para la sesión de recuperación activa
🤖 `CLAUDE.md`                  # Reglas operativas: Instrucciones estrictas para que el LLM solo cite contexto recuperado

## 📁 ingestion-pipeline/ (4 skills - Preprocesamiento de Datos)
📄 `document-parser.md`         # Ingesta multiformato • maneja PDFs, Markdown y texto sin procesar
📄 `metadata-extractor.md`      # Etiqueta automáticamente fragmentos con autor, fecha y dominio de origen para prefiltrado
📄 `pii-scrubber.md`            # Redacta información sensible antes de enviar al modelo de embedding
📄 `vector-sync.md`             # Envía documentos procesados a bases de datos Pinecone/Milvus

## 📁 chunking-strategies/ (3 skills - Segmentación de Contexto)
📄 `semantic-splitter.md`       # Divide documentos naturalmente en límites de párrafo o encabezado
📄 `parent-child-linker.md`     # Crea fragmentos hijo pequeños para búsqueda precisa, vinculados a fragmentos padre más grandes para contexto LLM completo
📄 `table-preserver.md`         # Asegura que las tablas markdown no se dividan horizontalmente entre diferentes fragmentos

## 📁 retrieval-engine/ (4 skills - El Núcleo de Búsqueda)
📄 `query-expander.md`          # Paso de preprocesamiento LLM • genera 3 variaciones de la consulta del usuario para mejorar tasas de acierto
📄 `hybrid-search.md`           # Combina búsqueda de vector denso (embeddings) con búsqueda dispersa (palabra clave BM25)
📄 `cross-encoder-reranker.md`  # Pasa los 20 resultados principales a través de Cohere ReRank para surfear los 5 principales más relevantes
📄 `metadata-filter.md`         # Aplica restricciones duras (p. ej., "solo buscar docs de 2026") antes de coincidencia de vector

## 📁 generation-layer/ (3 skills - Síntesis)
📄 `context-injector.md`        # Formatea los fragmentos recuperados principales limpiamente en el prompt del LLM
📄 `hallucination-guard.md`     # Prompt de autorreflexión • obliga al modelo a verificar su respuesta contra los fragmentos proporcionados
📄 `citation-builder.md`        # Añade enlaces de fuente precisos y números de página al resultado final

## 📁 deployment-evals/ (3 skills - Mantenimiento del Pipeline)
📄 `ragas-evaluator.md`         # Métricas automatizadas que miden precisión de contexto y relevancia de respuesta
📄 `cache-invalidation.md`      # Limpia embeddings de vector obsoletos cuando se actualizan documentos de origen
📄 `github-final-sync.md`       # Commit automatizado de configuraciones de pipeline y scripts de prueba a repos finales de Github

---
**Archivos de Configuración**
⚙️ `docker-compose.yml`         # Implementación local para probar el DB de vector y microservicios de embedding
📦 `requirements.txt`           # Dependencias de LangChain, LlamaIndex y modelo de embedding
