---
description: Audita la API y produce una estrategia de versionado con rutas de migración para cambios que rompen compatibilidad
argument-hint: "[current-version] [target-version]"
---
Produce un plan de versionado de API para: $ARGUMENTS

Analiza como: versión actual (ej. v1) y versión objetivo (ej. v2). Si se omite, analiza la API existente y recomienda si el versionado es necesario en absoluto.

Fase de análisis — lee el código y identifica:
1. Todos los endpoints públicos (ruta, método, forma de solicitud, forma de respuesta)
2. Qué cambios rompen compatibilidad versus no rompen:
   - Rompen compatibilidad: eliminar un campo, cambiar el tipo de un campo, renombrar un campo, cambiar la semántica de códigos de estado, eliminar un endpoint, cambiar requisitos de autenticación
   - No rompen compatibilidad: agregar un campo opcional, agregar un nuevo endpoint, agregar un nuevo valor de enum (con cuidado), relajar validación
3. Cualquier cliente existente o consumidor de SDK que sería afectado

Selección de estrategia de versionado:
- Versionado de ruta de URL (`/v2/`) — recomendado por defecto; explícito, almacenable en caché, fácil de enrutar
- Versionado de encabezado (`API-Version: 2`) — URLs más limpias pero más difícil de probar en navegadores; usar solo si el proyecto ya lo hace
- Versionado de parámetro de consulta — evitar; no es RESTful y rompe el almacenamiento en caché

Plan de implementación:
- Define el prefijo de versión en un solo lugar (configuración del enrutador, constante de URL base) — no disperso en cada ruta
- Las rutas de versión anterior deben seguir siendo funcionales durante una ventana de deprecación (recomendar: mínimo 6 meses para APIs externas, 1 lanzamiento mayor para internas)
- Agrega encabezados `Deprecation` y `Sunset` a las respuestas de v1 cuando se lance v2
- Versiona solo las rutas que tienen cambios que rompen compatibilidad — las rutas idénticas pueden compartir controladores entre versiones
- Define un documento de guía de migración que enumere todos los cambios que rompen compatibilidad con ejemplos antes/después

Resultado:
1. Lista de cambios que rompen compatibilidad encontrados (o "ninguno encontrado" si está limpio)
2. Estrategia de versionado recomendada con justificación
3. Estructura de enrutamiento mostrando cómo v1 y v2 coexisten
4. Cambios de código necesarios para implementar la división de versión
5. Recomendación de línea de tiempo de deprecación
6. Esqueleto de guía de migración para consumidores de API
