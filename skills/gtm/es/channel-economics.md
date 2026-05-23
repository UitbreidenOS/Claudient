---
name: channel-economics
description: "Economía de canales: calcular costo completamente cargado de servir por canal, ROI de canal (efectivo, ajustado por LTV, marginal), mezcla óptima de canal directo vs. socio, y análisis de rendimientos decrecientes"
---

# Skill Channel Economics

## Cuándo activar
- Revisión trimestral de canal: tienes una mezcla de canal directo y liderado por socios pero no sabes cuál es realmente rentable después de cargar todos los costos
- Evaluar si contratar un gerente de canal (¿justifica la economía del canal el incremento de personal?)
- La junta directiva pregunta por el ROI del programa de socios ("gastamos $X en MDF — ¿qué obtuvimos?")
- Planificar una nueva región y decidir directo-primero vs. socio-primero
- Debida diligencia de M&A en un objetivo que reclama un canal de socio de alto margen

## Cuándo NO usar
- Diseñar niveles de socio, GTM conjunto, estructura de revshare — usar la habilidad de partnerships
- Enrutamiento de SDR a AE y proceso de pipeline — usar la habilidad de revenue-operations
- Decisiones estratégicas de CRO (planes de compensación, contratación de VP Sales) — usar el cro-advisor
- Aprobación de descuento por trato — usar la habilidad de deal-desk

## Instrucciones

### Análisis de costo de servicio

```
Calcular costo completamente cargado de servir para [canal].

Canal: [directo / reseller / referral partner / SI / marketplace]
Período de datos: [últimos 12 meses]
Métricas de trato: [número de tratos, ARR total, ACV promedio, días del ciclo de ventas]
Retención: [NRR%, GRR%]

Categorías de costo a cargar (la mayoría de equipos pierden 3-4 de estas):

COSTOS DIRECTOS:
- Incremento de ventas (salario AE + comisión OTE / tratos cerrados = costo por trato)
- Atribución de SDR (costo por oportunidad calificada × oportunidades necesarias por cierre)
- Tiempo de ingeniero de soluciones (horas por trato × costo por hora cargado)
- Costo de ciclo legal / adquisiciones (horas de revisión de contrato × tarifa)

COSTOS ESPECÍFICOS DE CANAL:
- Descuento de socio fuera del precio de lista (%) — esta es una reducción directa de ingresos
- Market Development Funds (MDF) pagado al socio
- Incremento de gerente de canal (salario / número de socios administrados)
- Costo de habilitación y certificación del socio (una sola vez + anual por socio)
- Tiempo de resolución de conflictos de canal (horas estimadas por trimestre)

COSTOS POSTERIORES A LA VENTA:
- Carga de éxito del cliente (¿es el canal de socio de esfuerzo más alto o más bajo post-venta?)
- Volumen de ticket de soporte diferencial (clientes de socio a menudo necesitan más soporte)
- Diferencial de tasa de churn (socio vs. directo — impulsión clave de diferencia de LTV)

ASIGNACIÓN DE GASTOS GENERALES:
- Asignación de marketing (¿qué % del presupuesto de generación de demanda apoya este canal?)
- Tiempo de operaciones / RevOps en informes de canal y administración

Salida: costo de servir por trato Y por dólar de ARR, para cada canal.
```

### ROI de canal bajo tres lentes

```
Calcular ROI de canal usando tres lentes.

Datos de canal: [pegar resultados de costo de servir + datos de retención]

LENTE 1 — CASH ROI (Año 1):
Fórmula: (Margen bruto del Año 1 del canal) / (Año 1 completamente cargado CAC)
Umbral de veredicto: < 1.0x = cash-negative en año 1 → cuestionar viabilidad
Fuerte: > 2.5x cash ROI en año 1

LENTE 2 — ROI AJUSTADO POR LTV:
Fórmula: (LTV por cliente del canal) / (CAC completamente cargado)
LTV = ACV × Margen Bruto % × (1 / Tasa de Churn Anual)
Nota: si el canal de socio tiene mayor churn, LTV es menor incluso con ACV igual
Umbral de veredicto: < 3x LTV/CAC = el canal está bajo rendimiento
Fuerte: > 5x LTV/CAC

LENTE 3 — ROI MARGINAL:
"¿Qué devuelve el siguiente $100K invertido en este canal?"
Esto representa rendimientos decrecientes — los primeros tratos de socio son ROI alto,
los posteriores requieren más habilitación, MDF más alto, tasas de cierre más bajas.

Inflexión de rendimientos decrecientes: el punto donde ROI marginal cae por debajo de 1x
(agregar más inversión destruye valor al margen)

Veredicto por canal:
DOUBLE-DOWN: LTV/CAC > 5x Y ROI marginal aún positivo → escalar agresivamente
MAINTAIN: LTV/CAC 3-5x, ROI marginal positivo → mantener inversión actual
DEFUND: LTV/CAC 1.5-3x, ROI marginal cerca de 1x → mantener plano, no crezcas
EXIT: LTV/CAC < 1.5x, cash-negative → cerrar (los socios no son rentables)

Producir el veredicto de ROI para cada canal en mi mezcla.
```

### Optimización de mezcla de canales

```
Recomendar mezcla de canales óptima para [empresa].

Mezcla actual: [X% directo, Y% liderado por socio, Z% marketplace]
Restricciones:
  - Piso directo mínimo: [X% — no puedo bajar para relaciones empresariales]
  - Concentración máxima de socio: [X% — no quiero sobre-dependencia de ningún canal]
  - Capacidad de ventas total: [X AEs + X gerentes de canal]
  - Objetivo de ingresos: $[X] ARR el próximo año

Entrada: datos de ROI de canal del análisis anterior

Enfoque de optimización:
1. Comenzar con el canal LTV/CAC más alto — asignar capacidad aquí primero
2. Respetar el piso directo mínimo (clientes empresariales a menudo requieren toque directo)
3. No exceder el techo de concentración de socio (riesgo de dependencia de pipeline)
4. Aplicar rendimientos decrecientes — no sobre-asignar más allá del punto de inflexión
5. Verificar: ¿la mezcla resultante alcanza el objetivo de ingresos con la capacidad disponible?

Salida:
- Mezcla recomendada: X% directo, Y% socio, Z% marketplace
- ARR esperado en esta mezcla: $[X]
- Sensibilidad: si la tasa de cierre de socio cae 10%, impacto de ARR: ($[X])
- Plan de un año: ¿qué inversiones son necesarias para alcanzar la mezcla óptima?

DECISIÓN HUMANA REQUERIDA: Esta es una recomendación. El CRO y el liderazgo comercial toman la decisión final sobre la estrategia de canal.
```

## Ejemplo

**Usuario:** Estamos en $8M ARR, 60% directo / 40% liderado por socio. ACV directo es $45K, ACV de socio es $28K. NRR directo 118%, NRR de socio 97%. ¿Estamos sobre-indexados en socio?

**Análisis de Claude:**

Sí — la diferencia de NRR es la indicación. Déjame cargar los números:

**Canal directo:**
- ACV: $45K, NRR 118% → LTV = $45K × 0.75GM × (1/0.08 churn) ≈ $422K
- Si CAC es ~$15K (típico para inside sales en este ACV): LTV/CAC = **28x** — excelente

**Canal de socio:**
- ACV: $28K, NRR 97% → esa erosión de ingresos del 3% anual significa que estás perdiendo dinero en clientes existentes antes de expansión
- GRR es probablemente 85-88% (clientes que se van). LTV = $28K × 0.72GM × (1/0.14 churn) ≈ $144K
- Después de cargar descuento de socio (típicamente 20-25% de ACV), MDF y gerente de canal: CAC efectivo es ~$12K
- LTV/CAC = **12x** — se ve OK en efectivo, pero...

**El problema:** NRR de socio del 97% significa que tu canal de socio es un drenaje de ingresos neto en la base existente. Cada $1M de ARR de socio está perdiendo $30K/año de churn/downgrades antes de que agregues ningún negocio nuevo. En $3.2M de ARR de socio, eso es ~$96K/año evaporándose.

**Veredicto:**
- Directo: DOUBLE-DOWN — 28x LTV/CAC con expansión fuerte. Tu mejor canal.
- Socio: DEFUND movimiento actual, investiga por qué NRR es tan diferente de directo.

Antes de cortar socio, diagnostica: ¿la brecha de NRR se debe a (a) ICP incorrecto de socios, (b) menos cobertura de CS, o (c) clientes de socio usando menos del producto? Arregla la causa raíz antes de salir del canal.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
