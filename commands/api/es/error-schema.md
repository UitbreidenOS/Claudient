---
description: Define y aplica un esquema de respuesta de error consistente en todos los endpoints de la API
argument-hint: "[scope: file, router, o 'all']"
---
Audita y aplica un esquema de respuesta de error consistente para: $ARGUMENTS

El alcance se establece de forma predeterminada en toda la API si $ARGUMENTS está vacío o es "all".

Esquema de error objetivo (RFC 9457 / Problem Details for HTTP APIs):
```json
{
  "type": "https://example.com/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The 'email' field must be a valid email address.",
  "instance": "/requests/abc-123",
  "trace_id": "3f2e1d..."
}
```

Utiliza este esquema a menos que el proyecto ya tenga un formato de error establecido — si es así, estandariza según ese formato.

Pasos:
1. Escanea todas las rutas de código que devuelven errores: excepciones lanzadas, middleware de error, bloques catch, manejadores de validación
2. Identifica inconsistencias: cadenas simples, claves inconsistentes (`message` vs `error` vs `detail`), códigos de estado faltantes, formas mixtas
3. Define un único tipo/interfaz/clase de error en la raíz del proyecto (`ApiError` o equivalente)
4. Reemplaza cada respuesta de error ad-hoc con la construcción estructurada de ese tipo
5. Centraliza toda la serialización de errores en un lugar (middleware de error / manejador de excepciones) — no disperso en controladores
6. Asegúrate de que los errores de validación enumeren errores por campo:
   ```json
   "errors": [{ "field": "email", "message": "Invalid format" }]
   ```
7. Elimina los seguimientos de pila de las respuestas de producción — regístralos en el lado del servidor, nunca los envíes al cliente
8. Mapea tipos de error internos a códigos de estado HTTP en una única tabla de búsqueda — sin literales de código de estado fuera de esa tabla
9. Agrega un `trace_id` correlacionado con tu sistema de registro si uno está en uso

Salida:
- La definición del tipo de error
- El manejador de error centralizado
- Lista de todos los archivos modificados
- Cualquier respuesta de error que no pudo estandarizarse (con motivo)
