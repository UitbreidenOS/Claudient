---
name: advanced-tool-use
updated: 2026-06-13
---

# Advanced Tool Use

## When to activate
Benutzer möchte Tool-Use-Muster in Claude-API-Anwendungen optimieren, Tokens von Tool-Definitionen oder Call-Overhead reduzieren, die Genauigkeit bei komplexen Tool-Parametern verbessern oder ausgefeilte Tool-Calling-Workflows erstellen.

## When NOT to use
- Einfache Single-Tool-Workflows, bei denen die Overhead-Optimierung irrelevant ist
- Anwendungen mit der Standard-Messages-API mit weniger als 5 Tools und keinen wiederholten Aufrufen
- Debugging einer fehlerhaften Tool-Definition — zuerst Korrektheit beheben, dann optimieren

## Instructions

### Pattern 1: Programmatic Tool Calling (PTC)
Claude schreibt Python-Orchestrierungscode anstatt Tools einzeln nacheinander aufzurufen. Reduziert Round Trips und Tokens.

**Token-Reduktion: ~37% für Multi-Tool-Workflows.**

Pro Tool aktivieren:
```python
{
    "name": "read_file",
    "description": "Read a file",
    "input_schema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]},
    "allowed_callers": ["code_execution_20250825"],
}
```

Wenn aktiviert, kann Claude sich dafür entscheiden, eine Python-Schleife zu schreiben, die dieses Tool N-mal aufruft, anstatt N separate tool_use-Blöcke zu erstellen. Verwenden Sie für: wiederholte Read/Lookup-Muster, Datentransformations-Pipelines, beliebige Tools, die >3-mal pro Turn aufgerufen werden.

Nicht aktivieren für Tools mit Nebenwirkungen (Write, Delete, Deploy) oder Tools, die eine Pro-Call-Autorisierung erfordern.

---

### Pattern 2: Dynamic Filtering for Web Tools
Neue integrierte Tool-Typen für Web-Suche und Fetch, die Ergebnisse filtern, bevor sie in den Kontext gelangen.

**Beta-Header erforderlich:** `anthropic-beta: code-execution-web-tools-2026-02-09`

**Token-Reduktion: ~24% weniger Input-Tokens. Genauigkeitsverbesserung: +13–16 Prozentpunkte.**

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

Mit diesen Tool-Typen schreibt Claude Filtercode, der nur die relevanten Daten aus Suchergebnissen oder abgerufenen Seiten extrahiert, bevor der Inhalt in das Kontextfenster gelangt. Eine vollständige Webseite mit 50.000 Tokens wird zu einem 200-Token-Extract.

---

### Pattern 3: Tool Search / Deferred Loading
Für große Tool-Kataloge selten genutzte Tools aufschieben, damit sie nicht in den Kontext geladen werden, es sei denn, sie sind notwendig.

**Token-Reduktion: ~85% für Kataloge mit vielen Tools.**

Über Umgebungsvariable aktivieren:
```
ENABLE_TOOL_SEARCH=auto:N
```
Wobei N der Threshold ist — Tools über den top N relevantesten werden aufgeschoben.

Einzelne Tools als aufschiebbar kennzeichnen:
```python
{
    "name": "advanced_analytics",
    "description": "Run complex analytics queries",
    "input_schema": {...},
    "defer_loading": True,  # Only load when Claude needs this tool
}
```

Aufgeschobene Tools werden von Claude bei Bedarf über MCPSearch erkannt, wenn es feststellt, dass es eine Funktion benötigt, die nicht im aktuell geladenen Kontext vorhanden ist. Verwenden Sie für: große MCP-Tool-Kataloge, Enterprise-APIs mit Hunderten von Endpoints, Plugin-Systeme, bei denen die meisten Tools selten verwendet werden.

Nicht aufgeschobene Tools aufschieben, die in fast jedem Gespräch aufgerufen werden — der Discovery-Overhead macht die Einsparungen zunichte.

---

### Pattern 4: Tool Use Examples (`input_examples`)
Konkrete Call-Beispiele zu Tool-Definitionen über das JSON-Schema hinaus hinzufügen.

**Genauigkeitsverbesserung: ~72% → ~90% bei komplexen Parametern.**

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

`input_examples` ist am wertvollsten für:
- Tools mit nicht offensichtlichen Parameterkombinationen
- Komplexe verschachtelte Schemas
- Parameter, bei denen das Format wichtiger ist als der Typ (SQL-Strings, Regex, JSON-Pfade)
- Tools, bei denen Claude konsequent denselben Parameterfehler ohne Beispiele macht

---

### Combining Patterns

Maximaler Effizienz-Stack für einen großen Tool-Katalog:

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

Web-Tool-Typen verwenden, wenn Web-Suche/Fetch relevant ist:
```python
tools += [
    {"type": "web_search_20260209", "name": "web_search"},
    {"type": "web_fetch_20260209", "name": "web_fetch"},
]
```

## Example

Ein Agent mit 120 Tools (vollständige API-Oberfläche einer SaaS-Plattform):

Ohne Optimierung: 120 Tool-Definitionen × ~150 Tokens pro Stück = ~18.000 Tokens pro Call, nur für Tool-Definitionen. Die meisten Tools werden nie aufgerufen.

Mit aufgeschobenem Laden (`ENABLE_TOOL_SEARCH=auto:10`): nur die 10 wahrscheinlichsten Tools werden geladen. Die Token-Kosten für Tool-Definitionen sinken von 18.000 auf ~1.500 — 85% Reduktion. Wenn Claude ein selten genutztes Tool benötigt, sucht und lädt es es bei Bedarf, was etwa 200 Tokens für diesen Turn hinzufügt.

Das Hinzufügen von `input_examples` zu den 10 immer geladenen Tools erhöht die Parametergenauigkeit von 72% auf 90% bei den Tools, die am meisten zählen.

---
