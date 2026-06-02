# 📂 Ingesta de Vectores en Tiempo Real
> El espacio de trabajo canónico para una canalización de ingesta RAG en tiempo real, utilizando Kafka y Pinecone para procesar e incrustar actualizaciones de documentos de transmisión con una latencia inferior a un segundo.

📄 `streaming-architecture-brief.md` # Breve canónico: particionamiento de temas de Kafka, escalado de grupos de consumidores y dimensiones de vectores
🧠 `memory.md`                       # Memoria de sesión: contexto dinámico para seguimiento activo del desplazamiento del consumidor
🤖 `CLAUDE.md`                       # Reglas operativas: instrucciones estrictas para manejar cargas JSON malformadas con elegancia

## 📁 stream-consumers/ (4 habilidades - Ingesta de Kafka)
📄 `topic-subscriber.md`             # Gestiona conexiones a temas Kafka/Redpanda de alto rendimiento
📄 `offset-committer.md`             # Asegura procesamiento exactamente una vez • previene el re-incrustado del mismo documento al reiniciar
📄 `dead-letter-router.md`           # Atrapa mensajes corruptos y los enruta a un bucket seguro para revisión humana
📄 `schema-validator.md`             # Aplica esquemas Protobuf/Avro estrictos antes de permitir datos en la canalización

## 📁 transformation-layer/ (3 habilidades - Procesamiento en Tiempo Real)
📄 `streaming-chunker.md`            # Divide flujos de texto entrantes en segmentos listos para vectores sobre la marcha
📄 `metadata-enricher.md`            # Añade marca de tiempo, ID de fuente y autor a cada fragmento para filtrado descendente
📄 `embedding-generator.md`          # Llamador de lote asincrónico para APIs de incrustación OpenAI/Cohere • maximiza el rendimiento

## 📁 vector-sync/ (3 habilidades - Escrituras en Base de Datos)
📄 `pinecone-upserter.md`            # Maneja inserciones masivas en la base de datos de vectores • optimiza llamadas de red
📄 `collision-handler.md`            # Deduplicación respaldada por Redis • sobrescribe fragmentos obsoletos si un documento fue actualizado
📄 `index-optimizer.md`              # Activa fusiones periódicas en segundo plano para mantener baja la latencia de búsqueda de vectores

## 📁 fallback-mechanisms/ (3 habilidades - Tolerancia a Fallos)
📄 `retry-jitter.md`                 # Retroceso exponencial para límites de velocidad de API de incrustación (errores 429)
📄 `circuit-breaker.md`              # Pausa el consumo de Kafka si la base de datos de vectores se apaga
📄 `spooling-cache.md`               # Escribe temporalmente en disco local si la salida de red falla completamente

## 📁 observability/ (3 habilidades - Salud de la Canalización)
📄 `throughput-monitor.md`           # Rastrea mensajes por segundo (MPS) y latencia de incrustación
📄 `lag-detector.md`                 # Alerta a Slack si los grupos de consumidores se quedan atrás del productor de Kafka
📄 `github-final-sync.md`            # Confirmaciones automatizadas de actualizaciones de esquema y configuraciones de canalización a repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `docker-compose.yml`              # Configuración local de clúster Kafka, Zookeeper y Redis
📦 `go.mod`                          # Dependencias de Go (la concurrencia es crítica para el rendimiento de la transmisión)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
