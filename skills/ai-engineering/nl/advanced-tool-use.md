---
name: advanced-tool-use
updated: 2026-06-13
---

# Advanced Tool Use

## When to activate
Gebruiker wil toolgebruikspatronen in Claude API-applicaties optimaliseren, tokens uit tool definities of call overhead verminderen, nauwkeurigheid op complexe tool parameters verbeteren, of geavanceerde tool-calling workflows bouwen.

## When NOT to use
- Eenvoudige single-tool workflows waar overhead optimalisatie irrelevant is
- Applicaties die de standaard Messages API gebruiken met minder dan 5 tools en geen herhaalde calls
- Debug van een verbroken tool definitie — fix eerst de correctheid, optimaliseer daarna

## Instructions

### Pattern 1: Programmatic Tool Calling (PTC)
Claude schrijft Python orchestration code in plaats van tools één-voor-één aan te roepen. Vermindert round trips en tokens.

**Token reductie: ~37% voor multi-tool workflows.**

Inschakelen per tool:
```python
{
    "name": "read_file",
    "description": "Read a file",
    "input_schema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]},
    "allowed_callers": ["code_execution_20250825"],
}
```

Wanneer ingeschakeld, kan Claude ervoor kiezen om een Python loop te schrijven die deze tool N keer aanroept in plaats van N aparte tool_use blocks te maken. Gebruik voor: repetitieve read/lookup patronen, data transformation pipelines, elke tool aangeroepen >3 keer per turn.

Schakel niet in voor tools met bijwerkingen (write, delete, deploy) of tools die per-call autorisatie vereisen.

---

### Pattern 2: Dynamic Filtering for Web Tools
Nieuwe ingebouwde tool types voor web search en fetch die resultaten filteren voordat ze in de context binnenkomen.

**Beta header vereist:** `anthropic-beta: code-execution-web-tools-2026-02-09`

**Token reductie: ~24% minder input tokens. Nauwkeurigheidsverbetering: +13–16 percentage punten.**

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

Met deze tool types schrijft Claude filteringscode die alleen de relevante gegevens uit zoekresultaten of opgehaalde pagina's haalt voordat de content in het context window binnengaat. Een volledige webpagina van 50.000 tokens wordt een 200-token extract.

---

### Pattern 3: Tool Search / Deferred Loading
Voor grote tool catalogi, stellen u zelden gebruikte tools uit zodat ze niet in de context worden geladen tenzij nodig.

**Token reductie: ~85% voor catalogi met veel tools.**

Inschakelen via omgevingsvariabele:
```
ENABLE_TOOL_SEARCH=auto:N
```
Waarbij N de drempel is — tools buiten de top N meest relevante worden uitgesteld.

Markeer individuele tools als deferrable:
```python
{
    "name": "advanced_analytics",
    "description": "Run complex analytics queries",
    "input_schema": {...},
    "defer_loading": True,  # Only load when Claude needs this tool
}
```

Uitgestelde tools worden door Claude on-demand ontdekt via MCPSearch wanneer het bepaalt dat het een mogelijkheid nodig heeft die niet in de huidige geladen context staat. Gebruik voor: grote MCP tool catalogi, enterprise APIs met honderden endpoints, plugin systemen waar de meeste tools zelden worden gebruikt.

Stel geen tools uit die in bijna elk gesprek worden aangeroepen — de discovery overhead elimineert de besparingen.

---

### Pattern 4: Tool Use Examples (`input_examples`)
Voeg concrete call voorbeelden toe aan tool definities buiten het JSON schema.

**Nauwkeurigheidsverbetering: ~72% → ~90% op complexe parameters.**

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

`input_examples` is het meest waardevol voor:
- Tools met niet-voor-de-hand liggende parametercombinaties
- Complexe geneste schema's
- Parameters waarbij het formaat meer uitmaakt dan het type (SQL strings, regex, JSON paths)
- Tools waar Claude consistent dezelfde parameterfout maakt zonder voorbeelden

---

### Combining Patterns

Maximaal efficiëntie stack voor een grote tool catalogus:

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

Gebruik web tool types wanneer web search/fetch in scope is:
```python
tools += [
    {"type": "web_search_20260209", "name": "web_search"},
    {"type": "web_fetch_20260209", "name": "web_fetch"},
]
```

## Example

Een agent met 120 tools (volledige API oppervlak van een SaaS platform):

Zonder optimalisatie: 120 tool definities × ~150 tokens elk = ~18.000 tokens per call, alleen voor tool definities. De meeste tools worden nooit aangeroepen.

Met uitgestelde loading (`ENABLE_TOOL_SEARCH=auto:10`): alleen de 10 meest waarschijnlijke tools worden geladen. Token kosten voor tool definities dalen van 18.000 naar ~1.500 — 85% reductie. Wanneer Claude een zelden gebruikte tool nodig heeft, zoekt het die op en laadt het on demand, wat ~200 tokens voor die turn toevoegt.

Het toevoegen van `input_examples` aan de 10 altijd geladen tools verhoogt de parameternauwkeurigheid van 72% naar 90% op de tools die het meest uitmaken.

---
