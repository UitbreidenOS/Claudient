# 📂 Proxy de Protección LLM
> El espacio de trabajo canónico para un proxy LLM de nivel empresarial que intercepta, almacena en caché y audita todas las llamadas salientes a API de IA para prevenir costos de tokens descontrolados e imponer seguridad.

📄 `proxy-architecture-brief.md` # Resumen canónico: Define los límites globales de tokens, umbrales de caché semántico y reglas de enrutamiento
🧠 `memory.md`                   # Memoria de sesión: Seguimiento dinámico del contexto para la latencia actual del proxy y picos activos
🤖 `CLAUDE.md`                   # Reglas operativas: Instrucciones estrictas sobre cómo manejar tiempos de espera de API y lógica de conmutación por error

## 📁 traffic-interceptor/ (4 habilidades - La Puerta de Entrada)
📄 `request-validator.md`        # Rechaza cargas útiles malformadas antes de que lleguen a la API de LLM
📄 `rate-limiter.md`             # Aplica límites de tokens por minuto (TPM) por usuario o ID de inquilino
📄 `pii-redactor.md`             # Limpia datos sensibles (SSN, correos electrónicos) de indicaciones antes de salida
📄 `prompt-injection-guard.md`   # Comprobaciones heurísticas para bloquear intentos de jailbreak adversariales

## 📁 cost-optimization/ (3 habilidades - Gestión de Tokens)
📄 `semantic-cache.md`           # Búsqueda de vectores respaldada por Redis • sirve respuestas almacenadas en caché para consultas similares sin golpear el LLM
📄 `context-compressor.md`       # Resume o trunca automáticamente historiales de mensajes excesivamente largos
📄 `model-downgrader.md`         # Enruta dinámicamente consultas simples a Claude 3.5 Haiku para ahorrar costos, reservando Sonnet para razonamiento complejo

## 📁 observability-engine/ (4 habilidades - Analítica)
📄 `token-ledger.md`             # Contabilidad de alta precisión de tokens de indicación versus finalización por inquilino
📄 `latency-tracker.md`          # Monitorea Tiempo al Primer Token (TTFT) y tiempo total de generación
📄 `error-classifier.md`         # Agrupa fallos de API (por ejemplo, 429 Demasiadas Solicitudes vs 500 Error Interno del Servidor)
📄 `github-final-sync.md`        # Confirmaciones automatizadas de registros de cumplimiento diarios y configuraciones de proxy en repositorios finales de Github

## 📁 fallback-orchestrator/ (3 habilidades - Alta Disponibilidad)
📄 `circuit-breaker.md`          # Detiene temporalmente el tráfico a un proveedor LLM específico si las tasas de fallo se disparan
📄 `cross-region-router.md`      # Conmutación por error a diferentes regiones de AWS Bedrock para eludir interrupciones locales
📄 `retry-jitter.md`             # Algoritmos de retroceso exponencial para manejar límites de velocidad sin problemas

## 📁 evals/ (3 habilidades - Evaluación de Proxy)
📄 `cache-hit-ratio.md`          # Evalúa cuánto dinero está ahorrando realmente la caché semántica
📄 `redaction-accuracy.md`       # Audita el redactor de PII contra cargas útiles sensibles ficticias
📄 `overhead-latency.md`         # Garantiza que el proxy en sí no agregue más de 50 ms de retraso

---
**Archivos de Configuración**
⚙️ `envoy.yaml`                  # Configuraciones de proxy de borde para enrutamiento de tráfico de alto rendimiento
📦 `go.mod`                      # Dependencias de Go para manejo de solicitudes concurrentes ultra rápido
