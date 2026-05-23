---
name: commercial-forecaster
description: "Pronóstico comercial: construir pronósticos de reservas trimestrales con niveles commit/best-case/pipe-only, proyecciones de ARR por cohorte, puntuación de confianza de funnel por etapa, y análisis de NRR/GRR para reportes a la junta"
---

# Skill Commercial Forecaster

## Cuándo activar
- Construir el pronóstico de reservas trimestral para una reunión de junta directiva o QBR
- El CFO pregunta por números "commit, best-case, and pipe-only"
- Proyectar ARR para los próximos 4-8 trimestres utilizando datos de retención de cohorte
- Sospechando que un NRR consolidado está ocultando una cohorte reciente con fugas
- La cobertura de pipeline se está reduciendo y necesitas saber qué etapas de funnel siguen siendo confiables

## Cuándo NO usar
- Informes financieros históricos — usar las habilidades de financial-plan o earnings-analysis
- Planificación estratégica multi-año — usar cfo-advisor o pitch-deck skill
- Establecer precios — usar la habilidad pricing-strategy
- Aprobaciones de descuento por trato — usar la habilidad deal-desk

## Instrucciones

### Pronóstico de reservas de 3 niveles

```
Construir un pronóstico de reservas trimestral.

Período: [Q3 2026]
Datos de pipeline:
  - Lista de oportunidades con: etapa, monto, fecha de cierre, días en etapa, fecha de última actividad
  - Tasas de conversión de etapa a etapa (últimos 4 trimestres + últimos 12 trimestres)
Velocidad del equipo: [días promedio por etapa en pipeline actual]

PRONÓSTICO DE 3 NIVELES:

NIVEL 1 — COMMIT ($X):
Definición: tratos en los que el rep apostará su credibilidad
Método: aplicar peso de probabilidad del 90% a tratos en etapa Commit
Incluir: tratos donde la actividad fue < 7 días atrás, fecha de cierre < 30 días
Excluir: tratos estancados > 2x tiempo promedio en etapa

NIVEL 2 — BEST CASE ($X):
Definición: Commit + upside realista si los 3 tratos principales se cierran
Método: Commit + peso de probabilidad del 60% en tratos de etapa "Best Case"
Incluir: tratos con actividad reciente, comité de compra calificado, pasos siguientes claros

NIVEL 3 — PIPE ONLY ($X):
Definición: todo en el pipeline a valor nominal
Método: suma de todas las oportunidades abiertas × tasa de cierre histórica para su etapa
Nota: Esto casi siempre es incorrecto — usarlo como techo, no como objetivo

BLOQUE DE SUPOSICIONES (no negociable — presentar esto a la junta):
| Suposición | Valor | Fuente |
|---|---|---|
| Tasa de cierre aplicada a Commit | 90% | Juicio de Ops |
| Tasa de cierre aplicada a Best Case | 60% | Promedio últimos 4Q |
| Días promedio al cierre desde Propuesta | X días | Promedio últimos 12Q |
| Umbral de trato estancado | 14 días sin actividad | Política |
| Excluído: tratos abiertos > 2x ciclo promedio | $X | Filtro de riesgo |

SEÑALES DE RIESGO:
- Relación cobertura Commit/Pipe: [X]% (saludable: > 35%)
- Tratos estancados como % del pipeline: [X]% (por encima del 25% = pronóstico poco confiable)
- Días promedio sobre fecha de cierre esperada: [X] (por encima de 30 días = retrasos)

Generar el pronóstico de 3 niveles a partir de mis datos de pipeline.
DECISIÓN HUMANA REQUERIDA: El CRO presenta el número con estas suposiciones visibles.
```

### Proyección de ARR por cohorte

```
Proyectar ARR por cohorte durante [X trimestres].

Datos de cohorte: [listar cohortes con ARR inicial y retención por trimestre]
Horizonte de proyección: [Q4 2026 hasta Q4 2027]
Suposición de nuevo ARR: [del pronóstico de 3 niveles anterior]

Enfoque de análisis de cohorte:

Para cada cohorte (por trimestre de primera compra):
  ARR inicial: $[X]
  Retención Q1: [X]% GRR
  Retención Q2: [X]% GRR
  ...
  Expansión: [NRR promedio - GRR = tasa de expansión]

ARR proyectado en cada trimestre:
  ARR(t) = Σ[cohorte(i) × GRR(i,t) × expansión(i,t)] + nuevo_ARR(t)

DETECCIÓN DE COHORTE CON FUGAS:
Una cohorte "pierde" cuando su GRR está por debajo del GRR promedio de la empresa en > 5pp.
Las cohortes con fugas se ocultan dentro de un NRR consolidado "saludable" porque la expansión
de otras cohortes enmascara el problema de retención.

Bandera: cualquier cohorte con GRR < [GRR promedio de empresa - 5pp]
Implicación: si las cohortes con fugas son recientes, el problema está empeorando, no mejorando.

Salida: tabla de proyección de ARR por cohorte + cohortes marcadas con fugas + impacto en NRR consolidado.
```

### Puntuación de confianza de etapa de funnel

```
Puntuar cada etapa de funnel por confiabilidad de pronóstico.

Datos históricos: conversión de etapa a cierre por etapa, últimos 4Q y últimos 12Q
Pipeline actual por etapa: [montos y números de trato]

PUNTUACIÓN DE CONFIANZA por etapa:

Alta confianza (ponderar a valor nominal):
- Coeficiente de variación (CV) < 20% durante 8+ trimestres
- Conversión de etapa es predecible → número de tratos × conversión promedio = estimación confiable

Confianza media (aplicar descuento del 20%):
- CV 20-40% o < 6 trimestres de datos
- Conversión de etapa varía con el desempeño del rep o tamaño del trato

Confianza baja (aplicar descuento del 40% o excluir):
- CV > 40%
- La etapa depende en gran medida de un único trato grande
- La etapa fue redefinida recientemente o tiene < 4 trimestres de historial

MATEMÁTICA DE FUNNEL (versión transparente para junta):
| Etapa | Tratos Abiertos | Total $ | Tasa de Conversión | Confianza | $ Ponderado |
|---|---|---|---|---|---|
| Propuesta Enviada | 12 | $1.2M | 45% | Alta | $540K |
| Demo Completada | 28 | $2.8M | 22% | Media | $493K |
| Calificada | 67 | $6.7M | 8% | Baja | $322K |
| **Total** | | $10.7M | | | **$1.35M** |

Nota: El "Total" del pipeline ponderado es tu pronóstico pipe-only con honestidad aplicada.

Generar el modelo de confianza de funnel a partir de mis datos de conversión histórica.
```

### Descomposición de NRR

```
Descomponer NRR para identificar qué está realmente impulsando el número.

Datos de NRR: [NRR consolidado + GRR por trimestre, idealmente por cohorte]

NRR = GRR + Tasa de Expansión
Donde: GRR = 1 - (tasa de churn + tasa de downgrade)
       Expansión = tasa de upsell + cross-sell de clientes existentes

DIAGNÓSTICO:

NRR > 110%: expansión está enmascarando churn moderado. Preguntar: ¿el churn está aumentando?
NRR 100-110%: saludable pero vigilar sostenibilidad de expansión
NRR < 100%: churn + downgrades superan expansión. Base destructora de ingresos.

NRR por cohorte vs. NRR consolidado:
Si cohortes recientes (< 12 meses de antigüedad) tienen NRR más bajo que cohortes de 12-24 meses,
el producto o ICP ha retrocedido. El NRR consolidado empeorará con el tiempo a medida que
las cohortes recientes envejecen y su churn completo se manifiesta.

Pregunta clave: "¿Está mejorando o empeorando nuestro NRR cuando miras cohortes de la misma edad?"

NRR normalizado por edad de cohorte: ¿cuál es el NRR a los 6 meses, 12 meses, 24 meses?
Si esto está disminuyendo en todas las generaciones de cohortes → la retención está empeorando.

Salida: descomposición de NRR + comparación normalizada por edad de cohorte + veredicto.
```

## Ejemplo

**Usuario:** El CRO está presentando a la junta. ARR es $12M. NRR parece 108%. Pipeline es $4.2M para Q3. ¿Qué números necesito y cómo los presento?

**Preparación de pronóstico de Claude:**

No presentes un número. Presenta tres con suposiciones visibles — las juntas confían más en eso que en un número único sin respaldar.

**Los tres números que necesitas:**

Commit: $800K — tratos en tu etapa de commit con < 7 días desde última actividad
Best case: $1.1M — commit + tus 5 mejores tratos de upside al 60% de probabilidad
Pipe only: $1.6M — pipeline completo × tasas de cierre históricas por etapa

**La pregunta de NRR a preparar:**

NRR consolidado del 108% suena saludable. Pero: extrae tus últimas 3 generaciones de cohorte (clientes que se unieron hace 0-6 meses, 7-12 meses, 13-18 meses). Si el NRR del 6 meses de la cohorte más nueva es más bajo que el NRR del 6 meses de la cohorte de 7-12 meses — tu NRR está a punto de bajar incluso si el número consolidado se ve bien hoy.

**Estructura de diapositiva del deck de junta:**
1. Commit: $800K (90% confianza) — aquí está en qué apostamos
2. Best case: $1.1M (si los 5 tratos principales cierran) — aquí está qué sale bien
3. Pipe only: $1.6M (pipeline completo) — aquí está el techo
4. Suposiciones: [una tabla mostrando tasas de conversión utilizadas, umbrales de actividad, exclusiones]
5. NRR: 108% consolidado; [nota si el análisis de cohorte muestra algún deterioro]

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
