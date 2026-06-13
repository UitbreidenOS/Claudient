---
description: Generar un endpoint REST completamente tipado con validación, manejo de errores y pruebas
argument-hint: "[método] [ruta] [descripción]"
---
Generar un endpoint REST listo para producción a partir de la especificación: $ARGUMENTS

Analizar la entrada como: método HTTP, ruta y una breve descripción de la operación del recurso.

Reglas:
- Inferir el framework del código base existente (Express, FastAPI, Gin, Rails, etc.)
- Coincidir con la estructura de archivos existente del proyecto, convenciones de nombres e estilo de importaciones
- Definir tipos de solicitud/respuesta usando el sistema de tipos del proyecto (interfaces de TypeScript, modelos Pydantic, estructuras Go, etc.)
- Validar todas las entradas en el límite — rechazar solicitudes mal formadas antes de que la lógica empresarial se ejecute
- Retornar códigos de estado HTTP estándar: 200/201 éxito, 400 solicitud incorrecta, 401 no autenticado, 403 prohibido, 404 no encontrado, 409 conflicto, 422 no procesable, 500 error interno
- Nunca exponer trazas de pila o detalles de errores internos en cuerpos de respuesta
- Extraer la lógica empresarial en una capa de servicio, mantener el controlador delgado
- Agregar comprobaciones de autenticación/autorización si el proyecto utiliza guardias de middleware
- Escribir al menos tres pruebas: caso feliz, fallo de validación, caso no encontrado
- Seguir convenciones de recursos RESTful — usar sustantivos en rutas, no verbos

Salida:
1. Archivo de ruta/controlador (o adición al enrutador existente)
2. Definiciones de tipos de solicitud/respuesta
3. Función de servicio stub (o implementación si la lógica es simple)
4. Archivo de prueba con los tres casos requeridos
5. Cualquier migración o cambio de esquema si el endpoint toca la base de datos

Si $ARGUMENTS está vacío, preguntar: método, ruta y qué hace el endpoint.
