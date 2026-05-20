---
name: revenue-operations
description: "Operaciones de ingresos: análisis de pipeline, precisión de pronósticos, métricas GTM (CAC, LTV, NRR), diseño de procesos de ventas, planificación territorial y diseño de panel de control RevOps"
---

# Revenue Operations Skill

## Cuándo activar
- Construcción de marco de métricas de RevOps (CAC, LTV, NRR, cobertura de pipeline)
- Diagnóstico de por qué el pronóstico de ventas es inexacto
- Diseño del proceso de ventas y definiciones de etapas
- Análisis de la salud de la pipeline e identificación de cuellos de botella de conversión
- Configuración o auditoría de modelo de datos de CRM
- Creación del panel de control de métricas GTM para la dirección

## Cuándo NO usar
- Estrategia individual de trato — eso es ventas, no RevOps
- Ejecución de campaña de marketing — usa skills de email-automation o paid-ads
- Playbooks de éxito del cliente — usa la habilidad customer-success
- Decisiones de precio de producto — usa la habilidad pricing-strategy

## Instrucciones

### Marco de métricas GTM

```
Construye un marco de métricas GTM para [empresa].

Tipo de empresa: [B2B SaaS / mercado / servicios]
Movimiento de ventas: [PLG / ventas internas / ventas de campo / dirigida por socio]
Etapa: [pre-ingresos / $0-1M ARR / $1-10M ARR / $10M+ ARR]
Equipo GTM: [fundadores venden / SDR + AE / equipo GTM completo]

Métricas GTM principales por etapa de embudo:

ADQUISICIÓN:
- MQL generados: [leads calificados de marketing por mes]
- Tasa de conversión MQL→SQL: [%] (referencia: 10-25% según precisión de ICP)
- CAC (Costo de Adquisición de Clientes): [gasto total de ventas + marketing / clientes nuevos]
- CAC por canal: [pagado / orgánico / socio / outbound]
- Tiempo al primer contacto: [horas de MQL a alcance de SDR]

CONVERSIÓN:
- Conversión SQL→Oportunidad: [%]
- Tasa Oportunidad→Close-Won: [%] (referencia: 15-25% ventas internas, 10-20% empresa)
- Tamaño promedio de trato: [ACV]
- Duración del ciclo de ventas: [días de creación de oportunidad a cierre]
- Tasa de ganar por segmento: [SMB / mercado medio / empresa]

RETENCIÓN Y EXPANSIÓN:
- NRR (Retención de Ingresos Netos): [%] (referencia: >100% saludable, >120% excelente)
- GRR (Retención de Ingresos Brutos): [%]
- ARR de expansión: [nuevo ARR de clientes existentes por mes]
- Tasa de churn: [%] mensual o anual
- Logo churn vs. revenue churn: [historias diferentes]

EFICIENCIA:
- Ratio LTV:CAC: [objetivo >3x, >5x es fuerte]
- Período de reembolso de CAC: [meses para recuperar costo de adquisición]
- Número mágico: [ARR añadido / gasto de ventas + marketing]
- Eficiencia de ventas: [ARR nuevo / cantidad de personal con cuota]

Construye el marco de métricas con referencias actuales para mi tipo de empresa y etapa.
```

### Precisión de pronóstico

```
Diagnostica y arregla la precisión del pronóstico de ventas para [equipo].

Precisión de pronóstico actual: [X% preciso dentro de [Y]% varianza]
Método de pronóstico: [de abajo hacia arriba de reps / de arriba hacia abajo del gerente / asistido por IA]
CRM: [Salesforce / HubSpot / Pipedrive / otro]
Ciclo de ventas: [X días promedio]

Causas raíz de precisión de pronóstico:

PROBLEMAS DE DEFINICIÓN DE ETAPA (más común):
- Las etapas no se basan en acciones del comprador, solo en acciones del vendedor
  Solución: redefinir etapas como hitos del comprador
- Criterios de salida faltantes — los reps pueden hacer avanzar los tratos sin evidencia
  Solución: agregar campos requeridos por etapa

SESGO DE OPTIMISMO DEL REP:
- Los reps inflan la probabilidad del trato para evitar el escrutinio del gerente
  Solución: usar criterios objetivos para establecer probabilidad, no corazonada
  Buen señal: tiempo en etapa vs. tiempo promedio en etapa
  Mejor señal: puntuación de compromiso del comprador

TRATOS CON UN SOLO HILO:
- Solo un contacto en el trato
  Solución: marcar tratos de un solo hilo; requerimiento de multi-hilo como criterio de salida de etapa

HIGIENE DE INSPECCIÓN DE PIPELINE:
□ Completitud de datos de CRM: fecha de cierre, cantidad, etapa, responsable de decisión requeridos en cada trato > $X
□ Revisión semanal de pipeline: tratos que no se han movido >14 días
□ Auditoría de etapa de trato: tratos en etapas tardías sin actividad en 7 días
□ Tratos más antiguos: >2x el ciclo de ventas promedio debe impulsarse o perderse

CATEGORÍAS DE PRONÓSTICO (modelo Salesforce):
- Mejor caso: tratos en los que el rep está trabajando duro pero no completamente comprometido
- Commit: el rep cree que cerrará este período
- Cerrado: ya está cerrado
- Pipeline: demasiado temprano o incierto para este período

Referencia: la categoría Commit debe cerrar >80%.

Construye el plan de mejora de precisión de pronóstico para mi equipo y CRM.
```

### Análisis de pipeline

```
Analiza la salud de la pipeline para [período].

Período: [trimestre actual / próximo trimestre]
Pipeline total: $[X]
Cuota: $[X]
Relación de cobertura de pipeline: [pipeline / cuota]

Marco de salud de pipeline:

REFERENCIAS DE RELACIÓN DE COBERTURA:
- Ventas internas (ciclo de 30-60 días): 3-4x cuota en pipeline
- Empresa (ciclo de 90-180 días): 4-6x cuota en pipeline
- PLG (ciclo más corto): 2-3x puede ser suficiente

Tu cobertura de pipeline: $[X pipeline] / $[X cuota] = [Xx]
Interpretación: [adecuada / subcubierta / sobrecubierta]

ANÁLISIS DE CALIDAD DE PIPELINE:

Distribución de etapas (pipeline saludable tiene tratos en cada etapa):
| Etapa | Recuento de tratos | Valor total | % de pipeline |
|---|---|---|---|

BANDERAS ROJAS EN DISTRIBUCIÓN:
- Demasiada pipeline en etapas tempranas: pronóstico de trimestre actual en riesgo
- Demasiada pipeline en etapas tardías: futuros trimestres son delgados
- Trato individual >30% de pipeline: riesgo de resultado binario

ANÁLISIS DE EDAD:
Tratos más antiguos que 1,5x el ciclo de ventas promedio en su etapa = estancados

ACCIONES RECOMENDADAS:
□ Tratos estancados: revisión de rep y avance con etapas específico o mover a Closed-Lost
□ Brecha de cobertura: generar [X] nuevas oportunidades en próximos 30 días
□ Tratos de un solo hilo: multi-hilo o aceptar el riesgo explícitamente
□ Concentración de trato grande: acelerar tratos más pequeños

Genera el informe de salud de pipeline para los datos de pipeline de mi equipo.
```

---

> **Trabaja con nosotros:** Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA y soluciones B2B con comunidades de desarrolladores.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
