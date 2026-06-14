---
name: advanced-tool-use
updated: 2026-06-13
---

# Uso Avanzado de Herramientas

## Cuándo activar
El usuario quiere optimizar patrones de uso de herramientas en aplicaciones de Claude API, reducir tokens de definiciones de herramientas o gastos generales de llamadas, mejorar la precisión en parámetros de herramientas complejos, o construir flujos de trabajo sofisticados con llamadas a herramientas.

## Cuándo NO usar
- Flujos de trabajo simples con una sola herramienta donde la optimización de gastos generales es irrelevante
- Aplicaciones que usan la API estándar de Messages con menos de 5 herramientas y sin llamadas repetidas
- Depuración de una definición de herramienta rota — primero corrige la exactitud, luego optimiza

## Instrucciones

### Patrón 1: Llamadas a Herramientas Programáticas (PTC)
Claude escribe código de orquestación Python en lugar de llamar a herramientas una por una. Reduce viajes de ida y vuelta y tokens.

**Reducción de tokens: ~37% para flujos de trabajo con múltiples herramientas.**

Habilitar por herramienta:
```python
{
    "name": "read_file",
    "description": "Read a file",
    "input_schema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]},
    "allowed_callers": ["code_execution_20250825"],
}
```

Cuando está habilitado, Claude puede elegir escribir un bucle Python que llama a esta herramienta N veces en lugar de hacer N bloques tool_use separados. Usa para: patrones de lectura/búsqueda repetitivos, tuberías de transformación de datos, cualquier herramienta llamada >3 veces por turno.

No habilites para herramientas con efectos secundarios (escribir, eliminar, desplegar) o herramientas que requieren autorización por llamada.

---

### Patrón 2: Filtrado Dinámico para Herramientas Web
Nuevos tipos de herramientas integradas para búsqueda web y obtención que filtran resultados antes de entrar en el contexto.

**Encabezado Beta requerido:** `anthropic-beta: code-execution-web-tools-2026-02-09`

**Reducción de tokens: ~24% menos tokens de entrada. Mejora de precisión: +13–16 puntos porcentuales.**

```python
import anthropic

client = anthropic.Anthropic(default_headers={"anthropic-beta": "code-execution-web-tools-2026-02-09"})

response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=2048,
    tools=[
        {"type": "web_search_20260209", "name": "web_search"},
        {"type": "web_fetch_20260209", "name": "web_fetch"},
    ],
    messages=[{"role": "user", "content": "What is the current price of NVDA stock?"}],
)
```

Con estos tipos de herramientas, Claude escribe código de filtrado que extrae solo los datos relevantes de los resultados de búsqueda o páginas obtenidas antes de que el contenido entre en la ventana de contexto. Una página web completa que es 50,000 tokens se convierte en una extracción de 200 tokens.

---

### Patrón 3: Búsqueda de Herramientas / Carga Diferida
Para catálogos grandes de herramientas, difiere herramientas usadas infrecuentemente para que no se carguen en el contexto a menos que sea necesario.

**Reducción de tokens: ~85% para catálogos con muchas herramientas.**

Habilitar mediante variable de entorno:
```
ENABLE_TOOL_SEARCH=auto:N
```
Donde N es el umbral — las herramientas más allá de las N más relevantes se difieren.

Marca herramientas individuales como diferibles:
```python
{
    "name": "advanced_analytics",
    "description": "Run complex analytics queries",
    "input_schema": {...},
    "defer_loading": True,  # Only load when Claude needs this tool
}
```

Las herramientas diferidas son descubiertas por Claude bajo demanda a través de MCPSearch cuando determina que necesita una capacidad que no está en el contexto cargado actual. Usa para: catálogos grandes de herramientas MCP, APIs empresariales con cientos de puntos finales, sistemas de complementos donde la mayoría de herramientas rara vez se usan.

No diferas herramientas que se llaman en casi todas las conversaciones — el gasto general de descubrimiento elimina los ahorros.

---

### Patrón 4: Ejemplos de Uso de Herramientas (`input_examples`)
Agrega ejemplos de llamadas concretos a definiciones de herramientas más allá del esquema JSON.

**Mejora de precisión: ~72% → ~90% en parámetros complejos.**

```python
{
    "name": "query_database",
    "description": "Run a SQL query against the analytics database",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "SQL query to execute"},
            "timeout_seconds": {"type": "integer", "description": "Max execution time"},
            "read_only": {"type": "boolean", "description": "Enforce read-only mode"},
        },
        "required": ["query"],
    },
    "input_examples": [
        {
            "query": "SELECT user_id, count(*) as orders FROM orders WHERE created_at > NOW() - INTERVAL '7 days' GROUP BY user_id ORDER BY orders DESC LIMIT 10",
            "timeout_seconds": 30,
            "read_only": True,
        },
        {
            "query": "SELECT AVG(order_value) FROM orders WHERE status = 'completed'",
            "read_only": True,
        },
    ],
}
```

`input_examples` es más valioso para:
- Herramientas con combinaciones de parámetros no obvias
- Esquemas anidados complejos
- Parámetros donde el formato importa más que el tipo (strings SQL, regex, rutas JSON)
- Herramientas donde Claude consistentemente hace el mismo error de parámetro sin ejemplos

---

### Combinando Patrones

Pila de máxima eficiencia para un catálogo grande de herramientas:

```python
tools = [
    # Frequently used tools — loaded always, PTC enabled, with examples
    {
        "name": "read_file",
        "allowed_callers": ["code_execution_20250825"],
        "input_examples": [{"path": "/src/api/users.ts"}],
        ...
    },
    # Infrequently used tools — deferred
    {
        "name": "run_migration",
        "defer_loading": True,
        ...
    },
    # Last frequent tool — cache everything up to here
    {
        "name": "list_files",
        "cache_control": {"type": "ephemeral"},
        ...
    },
]
```

Usa tipos de herramientas web cuando la búsqueda/obtención web esté en el ámbito:
```python
tools += [
    {"type": "web_search_20260209", "name": "web_search"},
    {"type": "web_fetch_20260209", "name": "web_fetch"},
]
```

## Ejemplo

Un agente con 120 herramientas (la superficie API completa de una plataforma SaaS):

Sin optimización: 120 definiciones de herramientas × ~150 tokens cada una = ~18,000 tokens por llamada, solo para definiciones de herramientas. La mayoría de herramientas nunca se llaman.

Con carga diferida (`ENABLE_TOOL_SEARCH=auto:10`): solo las 10 herramientas más probables se cargan. El costo de tokens para definiciones de herramientas baja de 18,000 a ~1,500 — reducción del 85%. Cuando Claude necesita una herramienta poco usada, la busca y carga bajo demanda, agregando ~200 tokens solo para ese turno.

Agregar `input_examples` a las 10 herramientas siempre cargadas eleva la precisión de parámetros de 72% a 90% en las herramientas que más importan.

---
