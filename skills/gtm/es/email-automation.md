---
name: email-automation
description: "Multi-step outreach email sequences: personalised touchpoints, reply detection routing, follow-up cadence, meeting booking integration, deliverability patterns"
---

> 🇪🇸 Versión en español. [Versión en inglés](../email-automation.md).

# Habilidad de Automatización de Email

## Cuándo activar
- Diseño de una secuencia de prospección en frío (3-5 puntos de contacto)
- Redacción de emails de seguimiento que se sientan personales, no automatizados
- Configuración de lógica de detección de respuestas (interesado / no ahora / darse de baja)
- Integración de secuencias de email con reserva de calendario (Calendly, Cal.com)
- Revisión de patrones de entregabilidad (evitar spam, calentamiento de dominio)

## Cuándo NO usar
- Envíos masivos de boletines — usar Mailchimp/Klaviyo directamente
- Emails transaccionales (recibos, confirmaciones) — gestionados por su plataforma
- Clientes existentes que no optaron por la prospección — riesgo RGPD/CAN-SPAM

## Instrucciones

### Diseñar una secuencia de prospección de 4 pasos

```typescript
// Diseño de la secuencia:
// Día 0: Prospección inicial (personal, específica)
// Día 3: Seguimiento 1 (agregar valor — recurso, insight, datos)
// Día 7: Seguimiento 2 (ángulo o canal diferente)
// Día 14: Email de cierre (cierre respetuoso, puerta abierta)

const sequence: EmailStep[] = [
  { day: 0,  subject: '{{personalised_hook}}',    type: 'initial' },
  { day: 3,  subject: 'Re: {{original_subject}}', type: 'followup_value' },
  { day: 7,  subject: 'Re: {{original_subject}}', type: 'followup_angle' },
  { day: 14, subject: 'Closing the loop',          type: 'breakup' },
]
```

### Redactar cada tipo de email

**Inicial (Día 0) — específico, breve, humano:**
```
Redacte el email del Día 0 para una secuencia de prospección en frío.
Remitente: [nombre, empresa, lo que hacemos]
Prospecto: [nombre, título, empresa, un dato específico sobre él]
Objetivo: reservar una llamada de 15 minutos
Longitud máxima: 5-6 oraciones
Reglas: referenciar algo específico (noticias recientes, publicación, cambio de rol),
        expresar el valor en una oración, CTA suave ("¿abierto a una llamada rápida?")
```

**Seguimiento 1 (Día 3) — agregar valor genuino:**
```
Redacte el seguimiento del Día 3.
Agregue valor con: [un caso de estudio relevante / estadística / recurso / insight]
Referencia: el email original (manténgalo breve)
CTA: igual que el Día 0, reformulado
Longitud: 4-5 oraciones
```

**Email de cierre (Día 14) — cerrar con gracia:**
```
Redacte el email de cierre del Día 14.
Tono: comprensivo, no pasivo-agresivo
Deje la puerta abierta: "si el momento cambia / es relevante más adelante"
Sin culpa, sin "he intentado contactarle X veces"
Longitud: máximo 3 oraciones
```

### Lógica de gestión de respuestas

```typescript
async function handleReply(reply: EmailReply) {
  const intent = await classifyIntent(reply.body)
  // intent: 'interested' | 'not_now' | 'not_interested' | 'question' | 'referral'
  
  switch (intent) {
    case 'interested':
      return bookMeeting(reply.from, reply.threadId)
    case 'not_now':
      return scheduleFutureTouch(reply.from, daysFromNow: 90)
    case 'not_interested':
      return markOptedOut(reply.from)
    case 'referral':
      const referred = extractReferredContact(reply.body)
      return addToSequence(referred)
  }
}
```

### Integración de reserva de reuniones

```typescript
// Agregar a cada email con CTA — usar siempre un enlace de reserva directo
const BOOKING_FOOTER = `
If a call sounds useful, here's my calendar: {{calendly_link}}
Or just reply and I'll send over a time that works.
`

// API de Cal.com — verificar disponibilidad antes de enviar
const slots = await cal.availability.get({
  username: 'your-username',
  dateFrom: addDays(new Date(), 1),
  dateTo: addDays(new Date(), 7),
})
```

### Reglas de entregabilidad

```typescript
const SENDING_RULES = {
  maxPerDay: 50,              // por dominio de envío
  minDelayBetweenEmails: 90,  // segundos — evitar patrones de envío masivo
  warmUpNewDomain: true,      // empezar a 10/día, aumentar 10% diariamente
  spfDkimRequired: true,      // verificar antes del primer envío
  unsubscribeLink: true,      // requerido para CAN-SPAM/RGPD
  plainTextVersion: true,     // mejora la entregabilidad
  avoidSpamTriggers: [        // nunca usar en líneas de asunto
    'free', 'guarantee', 'no risk', 'click here',
    'make money', 'earn cash', '!!!',
  ],
}
```

### Patrones de personalización que triplican las tasas de respuesta

```
// Investigar antes de escribir — encontrar UNA cosa específica:
// - Noticias recientes de la empresa (financiación, lanzamiento de producto, contrataciones)
// - Publicación o comentario reciente en LinkedIn
// - Contacto mutuo o historial compartido
// - Cambio de rol en los últimos 6 meses
// - Competidor que acaban de reemplazar o una herramienta que mencionaron

// Malo (intercambio de plantilla): "Noté que es el [Título] en [Empresa]"
// Bueno (genuino): "Vi su publicación sobre la migración de Postgres a Neon —
//                  la función de ramificación que mencionó es exactamente por qué
//                  construimos [X]"
```

## Ejemplo

**Contexto:** SaaS B2B vendiendo una herramienta de gestión de proyectos. El prospecto es un VP de Ingeniería que publicó recientemente sobre dificultades con la visibilidad entre equipos.

**Día 0:**
> Asunto: Visibilidad entre equipos en proyectos grandes
>
> Vi su publicación de LinkedIn sobre el problema de visibilidad entre squads — lo escuchamos mucho de VPs a su escala.
>
> Construimos [Producto] específicamente para eso: una vista del progreso de cada equipo sin el peso de las reuniones de estado. [Empresa X] redujo sus sincronizaciones semanales de 4 a 1 tras el cambio.
>
> ¿Vale la pena 15 minutos para mostrarle cómo funciona?

**Día 3:**
> Asunto: Re: Visibilidad entre equipos en proyectos grandes
>
> Adjunto un resumen de 2 minutos de cómo [Empresa X] (escala similar a la suya) reestructuró su capa de visibilidad — podría ser relevante dado lo que describió.
>
> Encantado de mostrárselo en vivo si le resulta útil — mismo enlace: [calendario]

---

> **Trabaje con nosotros:** Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA y soluciones B2B con comunidades de desarrolladores.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
