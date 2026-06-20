# 📂 Almacén de Vectores Multi-Inquilino
> El espacio de trabajo canónico para una base de datos vectorial RAG altamente segura y multi-inquilino donde el aislamiento de datos empresariales está matemáticamente garantizado a nivel de consulta.

📄 `tenant-architecture-brief.md` # Resumen canónico: Define enrutamiento de espacios de nombres, esquemas de metadatos y seguridad a nivel de fila (RLS) para vectores
🧠 `memory.md`                    # Memoria de sesión: Seguimiento de contexto para canalizaciones activas de ingesta de inquilinos
🤖 `CLAUDE.md`                    # Reglas operativas: Instrucciones estrictas para NUNCA escribir consultas sin un filtro `tenant_id` hardcodeado

## 📁 identity-gateway/ (4 habilidades - Autenticación y Enrutamiento)
📄 `jwt-decoder.md`               # Analiza solicitudes entrantes para extraer el `tenant_id` y `user_role` inmutables
📄 `namespace-allocator.md`       # Mapea grandes clientes empresariales a espacios de nombres de índice físicos dedicados (ej: espacios de nombres de Pinecone)
📄 `rate-limiter.md`              # Previene problemas de vecino ruidoso • limita el rendimiento de API por inquilino
📄 `zero-trust-middleware.md`     # Rechaza cualquier carga de vectores que carezca de metadatos explícitos de propiedad de inquilino

## 📁 ingestion-api/ (3 habilidades - Cargas de Datos Seguras)
📄 `tenant-aware-chunker.md`      # Divide documentos mientras fuerza la adición del `tenant_id` a los metadatos de cada fragmento
📄 `embedding-proxy.md`           # Agrupa textos a OpenAI/Cohere mientras rastrean costos de tokens nuevamente al inquilino específico
📄 `data-retention-manager.md`    # Trabajo cron automatizado para eliminar permanentemente fragmentos de vectores cuando un inquilino cancela su suscripción (cumplimiento GDPR)

## 📁 search-gateway/ (4 habilidades - Recuperación Aislada)
📄 `query-rewriter.md`            # Toma la pregunta en lenguaje natural del usuario y la formatea para búsqueda de vectores
📄 `filter-enforcer.md`           # CRÍTICO: Inyecta automáticamente `{ "tenant_id": { "$eq": current_tenant } }` en CADA filtro de búsqueda antes de la ejecución
📄 `hybrid-search-router.md`      # Mezcla búsqueda de vectores densa con búsqueda de palabras clave BM25, limitada estrictamente a los datos del inquilino
📄 `cross-encoder-reranker.md`    # Reordena los 20 resultados aislados principales para garantizar la máxima precisión para el LLM

## 📁 compliance-auditing/ (3 habilidades - Registro de Seguridad)
📄 `access-ledger.md`             # Registro inmutable de exactamente qué usuario consultó qué vectores
📄 `breach-detector.md`           # Escaneo de heurísticas nocturnas que aseguran que ningún fragmento en el espacio de nombres del Inquilino A tenga metadatos del Inquilino B
📄 `soc2-report-generator.md`     # Compila evidencia automatizada de segregación de datos para revisiones de seguridad empresariales

## 📁 infrastructure/ (3 habilidades - Despliegue)
📄 `vector-db-connector.md`       # Agrupación de conexiones para Qdrant/Pinecone/Milvus
📄 `disaster-recovery.md`         # Captura de instantáneas en un punto en el tiempo de la base de datos de vectores
📄 `github-final-sync.md`         # Confirmaciones automatizadas de definiciones de esquema actualizadas en repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `qdrant-schema.json`           # Define la estructura exacta de la carga, asegurando que `tenant_id` sea un índice requerido
📦 `package.json`                 # Dependencias de Node/TypeScript (LangChain, SDK de base de datos vectorial, utilidades JWT)
