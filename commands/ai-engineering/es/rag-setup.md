---
description: Armar un pipeline RAG listo para producción para una fuente de datos y stack determinados
argument-hint: "[descripción de fuente de datos y stack preferido]"
---
Estás diseñando un pipeline de generación aumentada por recuperación basado en: $ARGUMENTS

Si no se especifica una preferencia de stack, utiliza por defecto: Python, LangChain, pgvector (PostgreSQL), `claude-sonnet-4-6` para generación, `text-embedding-3-small` a través de OpenAI para embeddings (cambiar a Voyage AI si el usuario especifica solo Anthropic).

**Paso 1 — Entender los datos**

Identifica de $ARGUMENTS:
- Tipo de fuente: PDFs, páginas web, filas de base de datos, archivos de código, Notion/Confluence, correos electrónicos, o mixto
- Frecuencia de actualización: corpus estático, solo anexos, o frecuentemente mutables
- Estimación de tamaño: <1 k documentos, 1 k–100 k, o 100 k+
- Sensibilidad: ¿Hay PII presente? ¿Se requiere aislamiento de aire?

Expresa explícitamente tus suposiciones si no se proporcionan.

**Paso 2 — Elegir estrategia de chunking**

Selecciona y justifica una:
- Tamaño fijo con superposición (rápido, línea base)
- Semántico / ventana de oración (mejor coherencia para prosa)
- División recursiva por carácter según estructura del documento (código, markdown)
- Recuperador de documento padre (recuperar chunk pequeño, devolver contexto padre)

Muestra la configuración exacta del chunker: `chunk_size`, `chunk_overlap`, lista de separadores.

**Paso 3 — Generar el pipeline de ingesta**

Escribe un script Python (`ingest.py`) que:
- Cargue documentos del tipo de fuente identificado arriba
- Limpie y normalice texto (eliminar boilerplate, normalizar espacios en blanco, manejar codificación)
- Divida documentos con la estrategia elegida
- Incruste chunks en lotes (máximo 512 por llamada API)
- Realice upsert en el almacén de vectores con metadatos: `source`, `chunk_index`, `ingested_at`
- Sea idempotente — ejecutar nuevamente en documentos sin cambios no re-incrusta

**Paso 4 — Generar la cadena de recuperación + generación**

Escribe un módulo Python (`rag_chain.py`) que:
- Acepte una cadena de consulta del usuario
- Incruste la consulta y recupere los K chunks principales (K=5 por defecto) con reranking MMR
- Construya un prompt del sistema que instruya al modelo a responder solo del contexto recuperado y citar fuentes por el campo de metadatos `source`
- Llame a `claude-sonnet-4-6` con caching de prompts en el bloque de contexto (usar `cache_control: {"type": "ephemeral"}` en los mensajes de contexto)
- Devuelva: `{"answer": str, "sources": list[str], "tokens_used": int}`

**Paso 5 — Lista de verificación operacional**

Lista como casillas de verificación:
- [ ] Estrategia de actualización de índice (re-ingesta programada vs. disparo webhook)
- [ ] Fijación de versión del modelo de embedding
- [ ] Métricas de calidad de recuperación a rastrear (MRR, recall@K)
- [ ] Fallback cuando la confianza de recuperación es baja
- [ ] Scrubbing de PII si es aplicable

Salida: `ingest.py`, `rag_chain.py`, lista de verificación operacional. Sin stubs.
