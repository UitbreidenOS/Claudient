---
name: deal-desk
description: "Deal desk: structure enterprise deals, review contract terms, set discount approval thresholds, analyse deal economics, and create commercial policy — for B2B sales operations"
---

# Habilidad Deal Desk

## Cuándo activar
- Estructuración de un acuerdo empresarial complejo (multi-año, términos personalizados, paquetes)
- Revisar un contrato propuesto por el cliente en busca de señales de alerta comerciales
- Establecer umbrales de aprobación de descuentos y políticas de escalado
- Analizar la economía de las transacciones (margen, amortización, LTV) antes de aprobar
- Crear o actualizar la política comercial (guardrails de precios, reglas de agrupación)

## Cuándo no usar
- Revisión legal del contrato para riesgo de cumplimiento — use la habilidad vendor-contract-review o diligence-review
- Estrategia de precios y diseño de tiers — use la habilidad pricing-strategy
- Pronóstico de ingresos — use la habilidad revenue-operations
- Éxito del cliente y estrategias de renovación — use la habilidad customer-success

## Instrucciones

### Estructuración de acuerdos

```
Estructurar un acuerdo para [cliente].

Cliente: [nombre, tamaño de la empresa, industria]
Tipo de acuerdo: [nuevo logo / expansión / renovación / multi-año]
ARR solicitado: $[X]
Productos / niveles solicitados: [lista]
Duración del contrato: [12 / 24 / 36 meses]
Fecha de inicio solicitada: [fecha]
Requisitos especiales: [SLA personalizado / soporte dedicado / integración personalizada / residencia de datos]

Revisión de la estructura del acuerdo:

1. INTEGRIDAD DE PRECIOS:
   ¿Cuál es el precio de lista para esta configuración?
   El cliente solicita: $[X] ([X]% de descuento en lista)
   ¿Está dentro de la autoridad de descuento estándar? [representante / gerente / VP / nivel CRO]
   ¿Cuál es la justificación? [volumen / estratégico / competitivo / retención de renovación]

2. ECONOMÍA DEL ACUERDO:
   ACV: $[X]
   CAC estimado para este acuerdo: $[X] (salario de ventas + comisión + tiempo SE + tiempo legal)
   Margen bruto a este precio: [X]%
   Reembolso CAC a este precio: [X] meses
   ¿Es este acuerdo económicamente viable? [sí / límite / no — escalar]

3. ESTRUCTURA DE TÉRMINOS:
   Condiciones de pago: [neto 30 / anual por adelantado / trimestral]
   Bloqueo multi-año: [año 2 y 3 precios comprometidos en lista / CPI + X%]
   Renovación automática: [sí / aviso de 90 días]
   Cláusula de rescisión anticipada: [sí — riesgo / no — estándar]

4. TÉRMINOS NO ESTÁNDAR PARA MARCAR:
   Responsabilidad ilimitada — rechazar o escalar a legal
   Alcance de indemnización ilimitado — escalar
   Sanciones de SLA como único recurso — aceptar si las sanciones están limitadas
   Cláusula de nación más favorecida — marcar ; puede limitar futuros precios
   Requisitos de portabilidad de datos al término — marcar ; confirmar que la ingeniería puede cumplir
   Restricciones de subcontratista — marcar ; confirmar que la lista de subcontratistas actual es aceptable

5. APROBACIÓN DEL ACUERDO:
   Aprobador en este nivel de descuento: [nombre/rol]
   Documentos requeridos antes de la aprobación: [SOW / cuestionario de seguridad / revisión legal]
   Fecha de cierre esperada: [fecha]

Resultado: recomendación de aprobación del acuerdo con condiciones específicas.
APROBACIÓN HUMANA REQUERIDA para todos los descuentos > autoridad de representante estándar.
```

### Política de aprobación de descuentos

```
Diseñar una política de aprobación de descuentos para [empresa].

Tamaño del equipo de ventas: [X representantes]
Tamaños de acuerdos: [$X ACV típico, $X ACV máx.]
Problema de descuento actual: [demasiado / inconsistente / sin política / compresión de margen]

Matriz de autoridad de descuento estándar:

| Nivel de descuento | Aprobado por | ACV máximo | Condiciones |
|---|---|---|---|
| 0-10% descuento de lista | AE (sin aprobación requerida) | Cualquiera | Solo términos estándar |
| 11-20% descuento de lista | Gerente de ventas | Cualquiera | Se requiere justificación escrita |
| 21-30% descuento de lista | VP de ventas | Cualquiera | Se requiere reunión de revisión de acuerdo |
| 31-40% descuento de lista | CRO | Solo > $100K ACV | Conciencia del CEO + revisión de economía de acuerdo |
| > 40% descuento de lista | CEO + Junta | Solo acuerdos estratégicos | Revisión completa de deal desk |

Categorías de justificación de descuento:
- Volumen: > X asientos / > volumen de uso X
- Estratégico: cliente de referencia / estudio de caso / valor de asociación
- Competitivo: desplazamiento competitivo documentado
- Retención: renovación en riesgo, evaluación de competidor en progreso
- Velocidad: firmar antes de [fecha] para el cierre del trimestre actual

Guardrails de descuento (no negociables):
- Sin descuento por debajo del piso de margen bruto mínimo ([X]% — fijado por finanzas)
- Acuerdos multi-año: año 2+ precio debe estar en lista o ajustado por CPI — nunca bloqueado a tasa de descuento
- Sin descuentos retroactivos en acuerdos ya cerrados
- El descuento se aplica solo a ARR — servicios profesionales siempre a lista

Genere la política de aprobación para mi estructura de empresa y equipo de ventas.
APROBACIÓN HUMANA REQUERIDA para cada acuerdo por encima del nivel de autoridad del representante.
```

### Revisión de términos de contrato

```
Revise estos términos de contrato para riesgos comerciales.

Tipo de contrato: [MSA / Formulario de pedido / Acuerdo de suscripción SaaS]
Nuestro papel: [proveedor / cliente]
Valor del contrato: $[X] / [término]

Señales de alerta comercial a verificar (marque como ROJO/AMARILLO/VERDE):

RESPONSABILIDAD:
Responsabilidad ilimitada — debe negociar un tope (estándar: 12 meses de honorarios)
Tope de responsabilidad < 3 meses de honorarios — demasiado bajo ; negociar a mínimo 12 meses
Sin exención para negligencia grave o incumplimiento intencional — verificar que se aplica el tope

PRECIOS Y PAGO:
Derecho de auditoría con alcance ilimitado — limitado a registros relevantes, notificación razonable
Tope de aumento de precio no especificado — agregar CPI o tope anual de [X]%
Condiciones de pago Neto 30 — estándar

PROPIEDAD INTELECTUAL:
Cláusula amplia de obra hecha por encargo que reclama toda la PI — limitar a entregables específicos
PI creada durante soporte o implementación reclamada por cliente — excluir
Alcance de licencia es « mundial, perpetuo, irrevocable » — estándar para SaaS

RESCISIÓN:
Sin rescisión por conveniencia — debe tener derecho de notificación de 30-90 días
Los activadores de rescisión son demasiado amplios (« cualquier incumplimiento ») — debería requerir período de cura
Efecto de la rescisión: cronograma de eliminación de datos del cliente no especificado — agregar período de gracia de 30 días

DATOS:
Sin DPA adjunto (si procesa datos personales) — requiera DPA
La propiedad de datos es ambigua — nos apropiamos de los datos del cliente ; cliente es dueño de su contenido
Auditorías de seguridad de datos — limitado a informes de auditoría de terceros (SOC 2) ; sin acceso directo

Producir: recomendaciones de redline para cada elemento ROJO/AMARILLO.
REVISIÓN LEGAL REQUERIDA antes de firmar cualquier acuerdo.
```

### Análisis de economía de trato

```
Analizar la economía de [acuerdo].

ACV: $[X]
Plazo: [X meses]
TCV (valor de contrato total): $[X]
Margen bruto a este precio: [X]%
CAC invertido: $[X] (salario de ventas + comisión + tiempo SE + tiempo legal)
Costo de implementación (si corresponde): $[X]

Economía del acuerdo:

Período de reembolso de CAC:
= CAC / (ACV × margen bruto %)
= $[X] / ($[X] × [X]%)
= [X] meses

A margen bruto [X]%, este acuerdo recupera su costo de adquisición en [X] meses.
Punto de referencia: < 12 meses = excelente ; 12-18 meses = aceptable ; > 24 meses = marginal

Cálculo LTV (asumiendo [X]% de churn anual):
Vida útil promedio del cliente = 1 / tasa de churn = [X] años
LTV = ACV × margen bruto % × vida útil
= $[X] × [X]% × [X] años = $[X]

Relación LTV:CAC = $[X] / $[X] = [X]x
Punto de referencia: > 3x = saludable ; > 5x = excelente ; < 2x = preocupación

Reconocimiento de ingresos:
- Anual por adelantado: TCV completo reconocido durante el plazo (ASC 606 ratable)
- Mensual: reconocido mensualmente a medida que se entrega

Implicaciones multi-año:
- Bloqueo de cliente a tasa [descuente] durante 3 años: previsibilidad de ingresos
- Riesgo: poder de fijación de precios perdido ; si el precio de lista sube 20%, este cliente se mantiene a la tasa anterior

Decisión: [aprobar / aprobar con condiciones / escalar]
Condiciones: [si es aplicable — p.ej. « aprobar a este precio si el plazo es 24 meses por adelantado »]
FIRMA HUMANA REQUERIDA antes del cierre del acuerdo.
```

## Ejemplo

**Usuario:** Un cliente de Fortune 500 quiere nuestro plan empresarial de $85K/año por $55K/año (35% descuento de lista), acuerdo de 3 años, con derecho de exportación de datos al término, condiciones neto 90 y cláusula NPF. ¿Acuerdo o no acuerdo?

**Análisis de Claude:**

**Descuento (35% descuento de lista):** Requiere aprobación a nivel CRO según política estándar. Se requiere justificación: logo estratégico, presión competitiva o compromiso de volumen. A $55K × 3 = $165K TCV — vale la pena escalar si el cliente es una referencia genuina.

**Término por término:**

- Condiciones neto 90 → Retroceder. Neto 30 es estándar. Neto 60 máximo para empresas. Neto 90 = impacto del capital de trabajo de 3 meses en este tamaño de acuerdo. Contraoferta: ofrecer 2% descuento por pago anticipado en neto 10, o mantener neto 30 sin descuento.

- Derecho de exportación de datos al término → Estándar y razonable. Confirme que su equipo de ingeniería puede proporcionar una exportación legible por máquina dentro de 30 días — esto es común y vale la pena comprometerse.

- Cláusula NPF → Rechazar o limitar la confusión estrictamente. Una NPF ilimitada (« obtenemos su mejor precio para cualquier cliente ») significa que si vende un acuerdo similar a un precio más bajo, este cliente obtiene automáticamente ese precio más bajo. Contraoferta: « NPF se aplica solo a acuerdos con ACV igual o superior, mismo plazo, firmado dentro de 12 meses. »

**Recomendación general:**
Apruebe con dos condiciones: (1) condiciones de pago negociadas a neto 30 o 60 (no 90), y (2) NPF limitado solo a acuerdos comparables. Se requiere firma del CRO antes de enviar términos finales.

APROBACIÓN HUMANA REQUERIDA. No envíe términos revisados sin la firma del CRO en el resumen del acuerdo.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
