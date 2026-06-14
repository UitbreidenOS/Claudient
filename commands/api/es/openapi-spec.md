---
description: Generar o actualizar una especificación OpenAPI 3.1 desde rutas existentes o una descripción
argument-hint: "[archivo-fuente-o-descripción]"
---
Generar o actualizar una especificación OpenAPI 3.1 basada en: $ARGUMENTS

Si $ARGUMENTS es una ruta de archivo, lee las definiciones de rutas de ese archivo. Si es una descripción, genera una especificación desde cero. Si está vacío, escanea el código fuente en busca de todas las definiciones de rutas y genera una especificación completa.

Requisitos:
- Usar OpenAPI 3.1.0 (no 3.0.x — usar `type: "null"` no `nullable: true`)
- Cada ruta debe tener: summary, operationId (camelCase, único), tags, parameters, requestBody (si aplica) y responses
- Definir todos los esquemas bajo `components/schemas` — los esquemas en línea en elementos de ruta están prohibidos
- Usar `$ref` para cualquier esquema referenciado más de una vez
- Documentar todos los códigos de estado de respuesta posibles que el código realmente devuelve — no inventar códigos adicionales
- Los campos obligatorios deben estar en arrays `required` — sin opcionales silenciosos
- Los valores de enumeración deben coincidir con lo que el código aplica
- Incluir definiciones de esquema de seguridad si la API utiliza autenticación (Bearer JWT, clave de API, OAuth2, etc.)
- Agregar campos `description` en todas las propiedades no obvias
- Marcar puntos finales deprecados con `deprecated: true` si se encuentran

Reglas de formato:
- Salida YAML, indentación de 2 espacios
- Mantener `paths` ordenadas alfabéticamente por ruta
- Mantener `components/schemas` ordenadas alfabéticamente

Mostrar el archivo `openapi.yaml` completo. Si se actualiza una especificación existente, mostrar solo las secciones cambiadas con contexto suficiente para ubicarlas, luego escribir el archivo actualizado completo.

Si la fuente de ruta es ambigua o los decoradores específicos del framework no se reconocen, listar qué rutas se omitieron y por qué.
