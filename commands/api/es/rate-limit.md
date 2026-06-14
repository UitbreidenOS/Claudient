---
description: Agregar limitación de velocidad a puntos finales de API con estrategias configurables y respuestas 429 apropiadas
argument-hint: "[endpoint-o-router] [límite] [ventana]"
---
Implementar limitación de velocidad para: $ARGUMENTS

Analizar como: punto final o ruta del router de destino, límite de solicitudes (por ejemplo, 100), ventana de tiempo (por ejemplo, 1m, 1h). Si no se especifica, aplicar valores predeterminados sensatos: 100 solicitudes/min para puntos finales públicos, 1000 solicitudes/min para autenticados.

Requisitos de implementación:
- Identificar la infraestructura de limitación de velocidad existente (Redis, en memoria, biblioteca de middleware) — usarla en lugar de introducir un segundo sistema
- Si no existe un limitador de velocidad, elegir según el despliegue: respaldado por Redis para múltiples instancias, en memoria con una advertencia para instancia única
- Clave por: IP para rutas no autenticadas, ID de usuario/inquilino para rutas autenticadas, clave de API para rutas autenticadas con clave
- Aplicar límites a nivel de middleware/decorador — no dispersar controles de límite en lógica empresarial
- Devolver `429 Too Many Requests` con estos encabezados:
  - `Retry-After: <segundos>`
  - `X-RateLimit-Limit: <límite>`
  - `X-RateLimit-Remaining: <restante>`
  - `X-RateLimit-Reset: <marca-de-tiempo-unix>`
- Cuerpo de respuesta: `{ "error": "rate_limit_exceeded", "retry_after": <segundos> }`
- Ventana deslizante preferida sobre ventana fija — evita ráfagas en el límite de ventana
- Admitir anulación por ruta de los límites sin tocar la configuración global

Configuración:
- Los límites deben ser configurables a través de variables de entorno o archivo de configuración — sin números mágicos en middleware
- Documentar los nombres de variables de entorno en un comentario en el sitio de definición

Escribir pruebas para:
- Solicitud dentro del límite (aprobada)
- Solicitud en el límite exacto (aprobada)
- Solicitud que excede el límite (429 con encabezados correctos)
- Restablecimiento de límite después de que vence la ventana
