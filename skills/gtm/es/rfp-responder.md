---
name: rfp-responder
description: "RFP and security questionnaire response: analyse, score, and respond to enterprise RFPs, security questionnaires (SIG, CAIQ), and vendor assessments — efficiently and accurately"
---

# Habilidad RFP Responder

## Cuándo activar
- Responder a una Solicitud de Propuesta (RFP) o Invitación a Ofertar (ITT) empresarial
- Completar un cuestionario de seguridad (SIG Lite, SIG Core, CAIQ, personalizado)
- Responder a una evaluación de proveedores o cuestionario de diligencia debida
- Construir una biblioteca de respuestas reutilizable para preguntas RFP frecuentes
- Puntuar una RFP entrante para decidir si ofertar

## Cuándo no usar
- Negociación de contrato después de ganar una RFP — use la habilidad deal-desk
- Revisión de cumplimiento legal de los términos de RFP — use la habilidad vendor-contract-review
- Posicionamiento de marketing — use la habilidad copywriting
- Primera llamada de ventas o demostración — use la habilidad sdr-agent

## Instrucciones

### Puntuación de oferta/no oferta de RFP

```
Score this RFP to decide whether to bid.

RFP details:
- Issuer: [company name, size, industry]
- Estimated contract value: $[X]
- Submission deadline: [date] (time available: [X weeks])
- Contract length: [X months/years]
- Geographic restrictions: [jurisdiction or location requirements]
- Incumbent: [known / unknown / we are the incumbent]

Score on 5 criteria (1-5 each):

1. STRATEGIC FIT:
   - Is this customer in our ICP?
   - Would winning this deal advance our market position?
   - Is there a strong reference-customer opportunity?
   Score: [1-5]

2. WIN PROBABILITY:
   - Do we have an existing relationship or champion?
   - Is this a competitive replacement or greenfield?
   - Did we help shape the requirements (wired RFP)?
   Score: [1-5]

3. COMMERCIAL ATTRACTIVENESS:
   - Is the contract value worth the bid effort?
   - Are the payment terms acceptable?
   - Is the budget confirmed or exploratory?
   Score: [1-5]

4. DELIVERY FIT:
   - Can we fulfil the technical requirements as stated?
   - Are there onerous custom requirements?
   - Is the timeline achievable?
   Score: [1-5]

5. BID FEASIBILITY:
   - Do we have the capacity to respond by the deadline?
   - Who would own this response internally?
   - Do we have the collateral ready (case studies, security questionnaire, certifications)?
   Score: [1-5]

Total score = sum of 5 criteria (max 25)
- 20-25: BID — strong fit, invest fully
- 15-19: BID SELECTIVELY — bid only if champion exists or you have spare capacity
- 10-14: EVALUATE — consider a light bid or no-bid with relationship-building alternative
- < 10: NO BID — not worth the investment

Output: score + rationale + bid/no-bid recommendation.
HUMAN DECISION required — this is a recommendation, not an auto-decision.
```

### Estructura de respuesta RFP

```
Construir una respuesta para [RFP].

Requisitos de RFP: [pegar o describir las secciones clave]
Criterios de evaluación: [si se divulgan — ponderaciones o prioridades]
Formato de envío: [documento / portal / correo electrónico / presentación en persona]
Fecha límite: [fecha]
Diferenciales que deseamos destacar: [enumerar 3-5]

Estructura de respuesta RFP (adaptar al formato específico requerido):

RESUMEN EJECUTIVO (1-2 páginas):
- Declaración del problema: demostrar que entiende lo que intentan resolver (no solo lo que preguntaron)
- Solución propuesta: cómo la resuelve a alto nivel
- Por qué elegirnos: 3 diferenciales clave específicos de las prioridades declaradas de este cliente
- Prueba: un estudio de caso relevante con resultado cuantificado

DESCRIPCIÓN GENERAL DE LA EMPRESA (1 página):
- Fundada, sede, tamaño del equipo
- Ingresos o financiación (si es compartible)
- Cantidad de clientes y logos notables en su industria
- Certificaciones (SOC 2, ISO 27001, RGPD, etc.)

DESCRIPCIÓN DE LA SOLUCIÓN (grueso de la respuesta):
- Asignar cada uno de sus requisitos a una capacidad específica
- Formato: [Su requisito] → [Nuestra capacidad] → [Prueba]
- Nunca omitir un requisito: "no aplicable" es mejor que el silencio
- Usar su vocabulario, no el suyo

IMPLEMENTACIÓN / INCORPORACIÓN (si corresponde):
- Cronograma: despliegue por fases con fechas de hito
- Equipo: quién será asignado, su experiencia
- Capacitación: lo que proporciona a usuarios finales y administradores
- Soporte: SLA, canales, tiempos de respuesta

PRECIOS (seguir su formato):
- Precios de línea para cada componente que solicitaron
- Si personalizado: proporcionar un rango o indicar que los precios siguen una llamada de descubrimiento
- Vista de costo total de propiedad si ayuda (evitar golpe de pegatina)

REFERENCIAS Y ESTUDIOS DE CASOS:
- 2-3 referencias en una industria o caso de uso similar
- Incluir: nombre de la empresa (si se permite), desafío, solución, resultado cuantificado
- "Referencias disponibles bajo solicitud" es débil — proporcionar detalles específicos

APÉNDICES (según sea necesario):
- Respuestas del cuestionario de seguridad
- Documentos de certificación y acreditación
- Contrato estándar / MSA

Escriba el marco de respuesta para mi RFP específica.
```

### Respuesta a cuestionario de seguridad

```
Completa este cuestionario de seguridad.

Tipo de cuestionario: [SIG Lite / SIG Core / CAIQ / personalizado]
Emisor: [nombre de la empresa]
Fecha límite: [fecha]
Nuestras certificaciones: [SOC 2 Type II / ISO 27001 / HIPAA / PCI-DSS / ninguna]

Principios de respuesta estándar:

1. Responder primero a partir de certificaciones:
   - Para controles SOC 2: « Este control está cubierto por nuestro informe SOC 2 Type II (disponible bajo NDA). Referencia de control: CC6.1. »
   - Para ISO 27001: « Esto se trata en nuestro SGSI bajo control A.9.2 (Gestión de acceso de usuarios). Certificado ISO 27001 disponible bajo solicitud. »
   - No redescribir lo que la certificación ya prueba — hacerle referencia

2. Para preguntas no cubiertas por certificación:
   - Responder de forma específica y veraz
   - Incluir tipo de prueba: « Documentado en nuestra Política de Control de Acceso (v2.1) »
   - Ofrecer proporcionar documentación bajo NDA si necesitan la política misma

3. Para brechas (donde no tiene un control):
   - « En progreso: estamos implementando [X] como parte de nuestra hoja de ruta de seguridad Q[N]. Finalización prevista: [fecha]. »
   - O ofrecer un control compensatorio: « Aunque no tenemos [X], mitigamos este riesgo a través de [control compensatorio]. »
   - Nunca dejar una brecha en blanco — se ve evasivo; las brechas honestas con mitigaciones son mejores

Preguntas comunes y respuestas recomendadas:

P: ¿Tiene SOC 2 Type II?
R (si sí): « Sí. Nuestro informe SOC 2 Type II (Seguridad + Disponibilidad TSC) está disponible bajo NDA. Período de auditoría más reciente: [fechas]. Auditor: [empresa]. »

P: ¿Cómo maneja las brechas de datos?
R: « Mantenemos un Plan de Respuesta a Incidentes documentado. Bajo el RGPD, notificamos a las autoridades supervisoras dentro de 72 horas y a los clientes afectados dentro de [X] horas de confirmar una brecha. Nuestra última prueba de respuesta a incidentes fue [fecha]. »

P: ¿Encripta datos en reposo y en tránsito?
R: « Todos los datos en reposo se cifran con AES-256 (AWS KMS). Todos los datos en tránsito usan TLS 1.2+. El cifrado se aplica en todos los entornos de producción. »

P: ¿Con qué frecuencia realiza pruebas de penetración?
R: « Las pruebas de penetración anuales las realiza [empresa tercerista]. Última prueba: [fecha]. Los hallazgos se remedian según nuestro SLA de gestión de vulnerabilidades (crítico: 30 días, alto: 60 días). »

P: ¿Dónde se almacenan los datos de los clientes?
R: « Todos los datos de los clientes se almacenan en [AWS us-east-1 / EU-West-1 / etc.]. No transferimos datos fuera de [jurisdicción] excepto cuando sea requerido por [excepción específica — por ejemplo, herramientas de soporte con acuerdos de procesamiento de datos vigentes]. »

Construye la respuesta completa del cuestionario para mi nivel de certificación y las preguntas específicas formuladas.
```

### Biblioteca de respuestas

```
Construir una biblioteca de respuestas RFP reutilizable para [empresa].

Empresa: [nombre]
Productos: [describir]
Certificaciones: [enumerar]
Principales segmentos de clientes: [industrias / tamaños de empresas]
Secciones RFP frecuentemente solicitadas: [enumerar las categorías que surgen con más frecuencia]

Estructura de la biblioteca:

PLANTILLA EMPRESARIAL (actualizar trimestralmente):
- Descripción general de la empresa: [250 palabras, actualizado con el recuento de empleados más reciente y ARR]
- Biografías del equipo ejecutivo: [CEO, CTO, VP Sales — 3-4 oraciones cada uno]
- Inversión y financiación: [Serie X, respaldado por X — o « privado » si no divulgable]
- Referencias de clientes: [5-7 referencias preaprobadas para compartir, con industria y resultado]

DESCRIPCIONES DE CAPACIDADES (por área de producto):
[Producto/característica]: [Descripción de 250 palabras lista para pegar]

SEGURIDAD (bloque estándar):
[Respuesta preparada para cada una de las 20 preguntas de seguridad más comunes]
Actualizar siempre que cambie el estado de certificación.

ESTUDIOS DE CASOS (2-3 por vertical):
[Industria]: [Tipo de empresa] + [Problema] + [Solución] + [Resultado con un número]

CERTIFICACIONES Y CUMPLIMIENTO:
[SOC 2: fechas, auditor, cobertura]
[ISO 27001: número de certificado, vencimiento, alcance]
[RGPD: plantilla DPA disponible, contacto DPO]
[HIPAA: BAA disponible bajo solicitud]

LENGUAJE DE PRECIOS:
[Respuesta estándar: « Los precios se personalizan según el volumen y la configuración. Nuestro equipo proporcionará una cotización detallada dentro de 3 días hábiles de recibir sus requisitos. »]
[O: tabla de precios estándar si sus precios se publican]

Cadencia de mantenimiento:
- Trimestral: actualizar estadísticas de la empresa, recuento de clientes, certificaciones
- Después de cada RFP: agregar nuevo estudio de caso o referencia aprobada si es una nueva victoria
- Después de cada cuestionario de seguridad: actualizar bloque de seguridad con nuevos controles

Genere la estructura de la biblioteca de respuestas para mi empresa.
```

## Ejemplo

**Usuario:** Recibimos una SIG Core de 200 preguntas de una empresa de servicios financieros empresarial. Tenemos SOC 2 Type II pero no ISO 27001. La fecha límite es 10 días. ¿Cómo respondemos eficientemente?

**Estrategia de Claude:**

200 preguntas en 10 días = no responder a cada pregunta desde cero. Priorizar primero.

**Paso 1 — Categorizar (Día 1, 2 horas):**
Agrupar las 200 preguntas en:
- Cubierto por SOC 2: marcar con « referencia SOC 2: [control] » — responder citando el informe
- Documentado por política: marcar con « Política: [nombre] » — respuesta rápida específica
- No aplicable: marcar como N/A con justificación (por ejemplo, controles físicos si solo en la nube)
- Brechas: respuesta honesta + control compensatorio o nota en progreso

Desglose esperado para un tenedor de SOC 2 Type II: ~70 preguntas cubiertas por SOC 2, ~60 por política, ~40 N/A, ~30 brechas reales.

**Paso 2 — Agrupar por propietario (Día 1-2):**
Ingeniería posee: encriptación, controles de acceso, gestión de vulnerabilidades, registro
Legal posee: procesamiento de datos, privacidad, cumplimiento regulatorio
Finanzas/ops posee: continuidad empresarial, seguros, contratos de terceros

**Paso 3 — Escribir el bloque SOC 2 una vez, referenciarlo en todas partes (Día 2):**
« Este control se aborda en nuestra auditoría SOC 2 Type II (disponible bajo NDA). Referencia de control: [CC#]. Período de auditoría: [fechas]. Auditor: [empresa]. »
Copiar esta plantilla en todas las preguntas cubiertas por SOC 2 — 10 minutos por control, no 10 preguntas × 30 minutos cada una.

**Paso 4 — Brechas (Día 5-7):**
Para cada brecha real: 2-3 oraciones — lo que no tenemos, lo que hacemos en su lugar, cuándo planeamos abordarlo.

**Paso 5 — Revisar y enviar (Día 8-10):**
Legal revisa la sección de datos/privacidad. Verificación puntual del CEO en las 10 preguntas más sensibles. Enviar con una nota de cobertura que ofrezca una reunión de seguridad virtual con su CTO.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
