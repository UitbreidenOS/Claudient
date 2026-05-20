---
name: customer-success
description: "Customer success management: health scoring, churn prediction signals, expansion playbooks, QBR structure, onboarding plans, and customer lifecycle management for SaaS"
---

# Habilidad de Éxito del Cliente

## Cuándo activar
- Construcción de un modelo de puntuación de salud del cliente
- Identificación de clientes en riesgo antes de que se vayan
- Diseño de estrategias de expansión y venta adicional
- Realización de una revisión comercial trimestral (QBR) con un cliente
- Creación de un plan de incorporación de clientes
- Segmentación de la base de clientes para modelos de cobertura CS

## Cuándo no usar
- Prospección de ventas — use las habilidades sdr-agent o lead-enrichment
- Análisis de productos para decisiones internas — use la habilidad product-analytics
- Campañas de marketing para clientes existentes — use la habilidad email-sequence
- Soporte técnico o triaje de errores — función diferente

## Instrucciones

### Puntuación de salud del cliente

```
Cree un modelo de puntuación de salud para [producto].

Producto: [describir — SaaS / plataforma / servicio administrado]
Tipo de cliente: [PyME / mercado medio / empresa]
Métrica de éxito clave: [lo que indica que un cliente obtiene valor]
Datos disponibles: [uso del producto / tickets de soporte / NPS / historial de pago / compromiso]

Marco de puntuación de salud (compuesto ponderado):

SEÑALES DE USO (ponderación 40%):
- Frecuencia de inicio de sesión: [diario/semanal/mensual] versus esperado para el plan
- Adopción de funciones principales: % de funciones compradas realmente utilizadas
- Usuarios de poder: número de usuarios con > X sesiones/semana
- Amplitud: % de asientos licenciados usados activamente
- Tendencia: ¿crece el uso, es plano o disminuye MoM?

SEÑALES DE RELACIÓN (ponderación 25%):
- Puntuación NPS: última respuesta de encuesta y tendencia
- Volumen de tickets de soporte: tickets crecientes = fricción ; cero tickets = riesgo de desconexión
- Compromiso del ejecutivo: último contacto con tomador de decisiones
- Campeones: defensores internos identificados para su producto?

SEÑALES COMERCIALES (ponderación 20%):
- Días vencidos en facturas: >30 días es una señal de pérdida
- Fecha de renovación: <90 días para renovar = prioridad alta
- Crecimiento del contrato: en expansión (saludable) vs. en contracción (riesgo de pérdida)
- Nivel de descuento: cuentas con descuento pesado = costo de cambio inferior

SEÑALES DE RESULTADOS (ponderación 15%):
- Criterios de éxito declarados del cliente: ¿se están cumpliendo?
- Resultados comerciales logrados: ¿ROI documentado?
- Estudio de caso / referencia dispuesta: señal fuerte de éxito

Puntuación:
Cada señal puntuada 1-10 → promedio ponderado → nivel de salud:

Saludable (puntuación 7-10): monitorear trimestralmente, buscar oportunidades de expansión
En riesgo (puntuación 4-6): check-ins mensuales, identificar y resolver bloques
Crítico (puntuación 1-3): compromiso semanal, escalada ejecutiva si es necesario

Construya el modelo de puntuación de salud para mi producto con definiciones de métricas específicas.
```

### Señales de predicción de pérdida

```
Identifique clientes en riesgo antes de que se vayan.

Tipo de producto: [SaaS]
Tipo de contrato: [mensual / anual / multi-año]
Tasa de pérdida histórica: [X%]
Datos disponibles: [describir lo que rastrean]

Señales de alerta temprana por marco de tiempo:

90+ DÍAS ANTES DE PÉRDIDA (señales estratégicas):
- El ejecutivo patrocinador abandonó la empresa (trabajar inmediatamente con el sucesor)
- La empresa pasó por adquisición o reestructuración
- Congelación de presupuesto o reducción de personal anunciada (LinkedIn/noticias)
- Campeón promoviendo su producto se ha silenciado o se fue

60-90 DÍAS ANTES DE PÉRDIDA (señales de compromiso):
- Frecuencia de inicio de sesión disminuyó > 30% versus promedio de 3 meses
- Uso de funciones principales disminuyendo durante 2+ meses consecutivos
- Tickets de soporte abiertos sobre exportación de datos o acceso API (preparación de migración)
- Puntuación NPS disminuyó ≥ 2 categorías (Promotor → Pasivo / Pasivo → Detractor)
- Ticket de soporte preguntando sobre términos de contrato, fecha de renovación o proceso de cancelación

30-60 DÍAS ANTES DE PÉRDIDA (señales comerciales):
- Factura vencida > 15 días sin comunicación anterior
- Cliente pidió comparación de precios o RFP
- El equipo CS no tiene punto de contacto con contacto principal en > 45 días
- Solicitudes de funciones enviadas pero sin respuesta dada

<30 DÍAS ANTES DE PÉRDIDA (señales de última oportunidad):
- Cantidad de usuarios disminuyó significativamente (usuarios en offboarding)
- Integración eliminada o claves API desactivadas
- Cliente no asiste a QBR o se salta llamadas programadas
- Comunicación directa sobre insatisfacción o evaluación competitiva

Estrategia de juego de respuesta por nivel de riesgo:
Señal 90+ días: contacto inmediato de CSM, presentación de patrocinador ejecutivo
Señal 60-90 días: llamada de revisión de salud, identificar bloques de éxito, escalar a líder de CS
Señal 30-60 días: llamada de alineación ejecutiva, oferta de guardaespaldas si es comercial, respuesta rápida a quejas
Señal <30 días: llamada de guardaespaldas con tomador de decisiones, comprender causa raíz, oferta de última oportunidad

Cree el estrategia de juego de detección de señales de pérdida para mi producto y términos de contrato.
```

### Estructura QBR

```
Diseñe una revisión comercial trimestral para [cliente].

Cliente: [nombre de la empresa, nivel, valor del contrato]
Duración: [30 min / 60 min / 90 min]
Asistentes: [ejecutivo cliente + usuarios / CS + AE / alineación ejecutiva]
Objetivo: [retención / expansión / estudio de caso / construcción de relaciones]

Agenda de QBR:

[10 min] APERTURA: Relación y agenda
- Agradézcales por el tiempo
- Confirme la agenda y los resultados deseados para esta sesión
- « ¿Qué haría que estos 60 minutos fueran lo más valioso para su equipo? »

[15 min] SU NEGOCIO: ¿Qué ha cambiado desde el último trimestre?
- Pregunte antes de decir: « ¿Cuáles son sus 3 principales prioridades para el próximo trimestre? »
- ¿Qué desafíos está enfrentando?
- ¿Ha habido cambios en el equipo, presupuesto o dirección estratégica?
[Esta sección a menudo revela oportunidades de expansión o riesgos de pérdida]

[20 min] VALOR ENTREGADO: Lo que obtuvieron de su producto
- Métricas de uso versus trimestre anterior (mostrar crecimiento o estabilidad)
- Éxito contra sus objetivos declarados de QBR anterior
- Resultados específicos: [X horas ahorradas / $Y ingresos influidos / Z% ganancia de eficiencia]
- Asigne el impacto de su producto a las prioridades comerciales

[10 min] VISTA PREVIA DE ROADMAP: Lo que viene que es relevante para ellos
- 1-3 próximas funciones que aborden directamente sus casos de uso
- Obtenga comentarios: « ¿Resolvería esto el problema que mencionó? »
- Evite: « Aquí está todo lo que estamos construyendo » — seleccione su contexto

[15 min] PROBLEMAS ABIERTOS Y PRÓXIMOS PASOS:
- Cualquier ticket de soporte abierto o punto de dolor no resuelto
- Discusión de expansión si es apropiada (no force si la confianza no está allí)
- Confirme los criterios de éxito para el próximo trimestre
- Elementos de acción con propietarios y fechas

[10 min] CIERRE:
- « ¿Cuál es la única cosa que deberíamos hacer diferente el próximo trimestre? »
- Cronograma de renovación y próximos puntos de contacto
- Solicite referencia / estudio de caso / referencia si la relación es fuerte

Reglas QBR:
- Envíe la agenda 5 días de anticipación
- Pase > 50% del tiempo escuchando, < 50% presentando
- Nunca comience con una demostración de producto — comience con su negocio
- Siempre termine con próximos pasos documentados

Genere el esquema de cubierta QBR y los puntos de conversación para mi cliente específico.
```

### Plan de incorporación del cliente

```
Cree un plan de incorporación para [nuevo cliente].

Cliente: [tamaño, sofisticación técnica, caso de uso]
Contrato: [$X ARR, [X] asientos, [Y] casos de uso clave comprados]
Propietario de éxito: [nombre de CSM]
Línea de tiempo: [incorporación de 30/60/90 días]
Momento aha: [el resultado específico que muestra valor rápidamente]

Plan de incorporación de 30-60-90 días:

DÍAS 1-7 — Configuración y orientación:
□ Llamada de inicio: presentaciones, confirmar criterios de éxito, establecer cadencia de comunicación
□ Configuración técnica: aprovisionamiento de cuenta, integraciones, invitaciones de usuario
□ Capacitación del administrador: el usuario comprador / admin puede configurar la herramienta de forma independiente
□ Victoria rápida: identifique el caso de uso individual más impactante — hágalo funcionar esta semana

DÍAS 8-30 — Primer valor entregado:
□ Capacitación de campeones: 1-2 usuarios internos de poder capacitados y activos
□ Primer flujo de trabajo principal funcionando de extremo a extremo
□ Llamada de verificación (semana 2): ¿bloques? ¿Qué funciona?
□ Hito de activación confirmado: [momento aha específico alcanzado]
□ Introducción a miembros adicionales del equipo que deberían usar el producto

DÍAS 31-60 — Profundización de la adopción:
□ Expandir a casos de uso o departamentos adicionales
□ Capacite a los usuarios restantes en flujos de trabajo principales
□ Documenting early wins and ROI signals (prepare evidence for internal stakeholders)
□ Revisión a mitad de integración: verificación de puntuación de salud, señales de pérdida identificadas

DÍAS 61-90 — Enfoque en resultados comerciales:
□ Revisión de resultados: contra criterios de éxito establecidos en el inicio
□ Documentación de ROI: ¿puede el cliente articular valor a su liderazgo?
□ Campeón interno identificado y cultivado
□ Camino a la expansión discutido (si el uso lo respalda)
□ Solicitud de estudio de caso / referencia si la relación es fuerte

Activadores de escalada durante la incorporación (marque inmediatamente):
- Configuración técnica no completada por el día 7
- Sin inicios de sesión de usuarios que no sean administradores por el día 14
- CSM no puede alcanzar contacto principal durante > 5 días
- El cliente expresa insatisfacción o expectativa incumplida en los primeros 30 días

Genere el plan de incorporación para mi cliente y producto específicos.
```

## Ejemplo

**Usuario:** Tenemos 50 clientes que pagan $2K-$10K/mes. Sin proceso de CS formal. 3 pérdidas el trimestre pasado sin advertencia. ¿Cómo construyo una puntuación de salud básica con lo que tengo?

**Modelo de inicio rápido de Claude:**

Sin datos de CS formales, construya a partir de lo que tiene — registros de productos + CRM + tickets de soporte. Esto lleva 1 semana de configuración.

**Puntuación de salud de 3 señales (comience aquí, construya más adelante):**

| Señal | Fuente de datos | Verde | Amarillo | Rojo | Peso |
|---|---|---|---|---|---|
| Usuarios activos mensuales | BD de productos | >60% asientos activos | 30-60% | <30% | 40% |
| Tickets de soporte | Helpdesk | 0-2/mes | 3-5/mes | >5 o 0 durante 60+ días | 30% |
| Días desde el último contacto de CS | CRM | <30 días | 31-60 días | >60 días | 30% |

**Puntuación = promedio ponderado de puntuaciones de señal (1-10 por señal)**

**En su CRM ahora:** cree un campo de salud en cada cuenta (Verde/Amarillo/Rojo). Revise manualmente y establezca cada cuenta esta semana. Revise mensualmente.

**Las 3 pérdidas no tenían advertencia porque:** no tenía puntuación ni cadencia de contacto. Cadencia de contacto de corrección primero — una llamada mensual de 30 minutos con cada cliente vale más que un modelo de puntuación de salud perfecto que construye en 3 meses.

**Acciones inmediatas:**
1. Esta semana llame a cada cliente con el que no ha hablado en >60 días (probablemente 15-20 de 50)
2. Pregúnteles: « ¿Qué haría que se renovaran sin dudar? » — aprenderá más de 10 llamadas que 3 meses de análisis
3. Establezca una regla: ninguna cuenta va > 45 días sin un punto de contacto

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
