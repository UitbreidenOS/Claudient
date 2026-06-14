---
description: Implementar un receptor de webhook seguro, idempotente con verificación de firma y tolerancia a reintentos
argument-hint: "[proveedor] [tipos-de-evento]"
---
Implementar un manejador de webhook para: $ARGUMENTS

Parsear como: nombre del proveedor de webhook (p. ej. Stripe, GitHub, Twilio) y una lista separada por comas de tipos de eventos a manejar. Si el proveedor es desconocido, construir un patrón genérico de webhook firmado.

Seguridad — no negociable:
- Verificar la firma del proveedor antes de procesar cualquier carga. Leer el patrón de documentación del proveedor para el encabezado exacto y algoritmo HMAC (usualmente `HMAC-SHA256`)
- Comparar firmas con una función de comparación de tiempo constante — nunca igualdad de cadenas
- Rechazar solicitudes con firmas ausentes o inválidas con `401` inmediatamente — registrar la falla
- Validar el campo `timestamp` si el proveedor lo incluye; rechazar eventos más antiguos que 5 minutos para prevenir ataques de repetición
- El secreto debe provenir de una variable de entorno — nunca codificado

Idempotencia:
- Cada entrega de webhook tiene un ID de evento único en el encabezado o carga — extráerlo
- Verificar un almacén de deduplicación (tabla de BD o conjunto Redis con TTL) antes de procesar
- Si el ID del evento ya fue procesado, retornar `200` inmediatamente — no reprocesar
- Almacenar el ID del evento con un TTL de al menos la ventana de reintento del proveedor (típicamente 72 horas)

Patrón de procesamiento:
- Reconocer inmediatamente con `200` — no hacer que el proveedor espere por lógica de negocio
- Encolar la carga validada y deserializada en una cola de trabajo para procesamiento asincrónico
- Si no existe una cola de trabajo, procesar sincrónicalmente pero aún responder dentro de 5 segundos
- Registrar el tipo de evento, ID del evento y resultado del procesamiento para cada evento

Estructura del manejador:
1. Middleware de verificación de firma (reutilizable, no en línea)
2. Verificación de deduplicación
3. Análisis de carga y despacho de tipo por tipo de evento
4. Funciones de manejador por evento (una por tipo de evento listado en $ARGUMENTS)
5. Manejo de errores que retorna 200 incluso en caso de falla de procesamiento (para evitar reintentos por errores)

Escribir pruebas para: firma válida, firma inválida, evento duplicado, cada tipo de evento despachado correctamente.
