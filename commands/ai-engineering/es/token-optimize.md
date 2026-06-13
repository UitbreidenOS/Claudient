---
description: Auditar un prompt o pipeline de LLM en busca de pérdida de tokens y aplicar reducciones dirigidas
argument-hint: "[archivo de prompt, archivo de cadena o ruta de código]"
---
Audita el prompt o pipeline en $ARGUMENTS en busca de ineficiencia de tokens y produce una versión optimizada.

Lee las rutas de archivo proporcionadas. Si el argumento es un directorio, escanea archivos `.py`, `.ts`, `.md` que contengan cadenas de prompt o sitios de llamadas LLM.

**Dimensiones de auditoría — verifica cada una:**

**1. Verbosidad del prompt**
- Frases de relleno que añaden tokens sin añadir restricción ("Como un modelo de lenguaje de IA", "¡Por supuesto!", "Ciertamente")
- Instrucciones repetidas que aparecen tanto en el mensaje del sistema como en el del usuario
- Ejemplos redundantes que cubren casos idénticos
- Instrucciones en prosa que podrían ser una lista con viñetas con la mitad de los tokens

**2. Mal uso de la ventana de contexto**
- Documento completo pasado cuando solo se necesita una sección — marcar con ahorros estimados
- Historial de chat incluido textualmente cuando un resumen sería suficiente
- Contenido duplicado: el mismo texto incluido dos veces bajo claves diferentes

**3. Oportunidades de almacenamiento en caché**
- Identificar segmentos de prompt estáticos (prompt del sistema, contexto estático, ejemplos pocas veces) que deben usar `cache_control: {"type": "ephemeral"}` en la API de Anthropic
- Marcar si el segmento elegible para caché es < 1024 tokens (por debajo del umbral mínimo de caché — sin beneficio)
- Mostrar la matriz de mensajes reestructurada con bloques de caché colocados correctamente

**4. Longitud de salida**
- ¿Está establecido `max_tokens`? Si no, marcar como riesgo de costo sin límites
- ¿El prompt pide una explicación cuando solo se necesitan datos estructurados?
- ¿Un formato de salida más corto (JSON vs prosa, solo código vs código+explicación) reduciría el costo de generación?

**5. Ajuste del nivel del modelo**
- ¿La tarea utiliza `claude-sonnet-4-6` o `claude-opus-4-7` para trabajo que `claude-haiku-4-5-20251001` puede manejar con un costo 10 veces menor?
- Clasificar complejidad de tareas: extracción/clasificación simple → Haiku; razonamiento/generación → Sonnet; multi-paso complejo → Opus

**Formato de salida:**

```
## Resumen del auditoría de tokens
| Problema | Ubicación | Impacto de tokens estimado | Prioridad |
|----------|-----------|---------------------------|-----------|
| ...      | ...       | ...                       | A/M/B     |

## Prompt / cadena optimizada
<versión completamente reescrita con cambios aplicados>

## Configuración de almacenamiento en caché
<fragmento de matriz de mensajes mostrando colocación de cache_control, si aplica>

## Ahorros estimados
Antes: ~N tokens/llamada  →  Después: ~M tokens/llamada  (~X% reducción)
En 1000 llamadas/día en [modelo]: $Y/mes de ahorros
```

Aplica todas las correcciones de alta prioridad directamente en la salida. Explica elementos de prioridad media/baja pero no apliques sin preguntar.
