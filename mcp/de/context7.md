# MCP: Context7 — Live-Dokumentation

Geben Sie Claude Code Zugriff auf aktuelle Dokumentation für jede Bibliothek oder jedes Framework. Keine halluzinierten APIs oder veralteten Code-Beispiele mehr.

## Warum Sie das brauchen

Claudes Wissensstichtag hat ein Limit. Für schnelllebige Bibliotheken (Next.js 16, LangGraph 1.2, shadcn/ui) kann die Dokumentation, die Claude kennt, Monate oder Jahre veraltet sein. Context7 löst dies, indem aktuelle Dokumentation auf Anfrage abgerufen wird.

## Was es tut

- Ruft aktuelle, versionsspezifische Dokumentation für jede Bibliothek ab
- Injiziert den relevanten Dokumentationsabschnitt in Claudes Kontext
- Claude generiert Code gegenüber der tatsächlichen, aktuellen API, nicht einer gemerkten Version
- Deckt ab: React, Next.js, Tailwind, shadcn/ui, Prisma, Drizzle, LangChain, LangGraph und tausende mehr

## Konfiguration

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

Keine API-Schlüssel für grundlegende Nutzung erforderlich.

## Verwendung in Sessions

```
# Fordern Sie aktuelle Dokumentation explizit an
"Using context7, get the latest Next.js 16 App Router docs for data fetching"

# Claude wird sie abrufen und verwenden
"Build a server action using the current Next.js syntax"

# Für versionsspezifische Fragen
"What's the correct way to use useFormState in React 19?"
```

## Auslöser

Sie können auch normal arbeiten — Context7 wird ausgelöst, wenn Claude erkennt, dass es die Dokumentation nachschlagen muss. Oder fügen Sie dies zu Ihrem CLAUDE.md hinzu:

```markdown
## Libraries
When writing code with Next.js, React, Tailwind, or shadcn/ui:
- Use context7 MCP to fetch current documentation before generating code
- Always specify the version we're using (see package.json)
```

## Unterstützte Bibliotheken

Deckt die meisten großen npm-Pakete und Python-Bibliotheken ab. Wenn eine Bibliothek nicht indexiert ist, greift Context7 auf das direkte Abrufen der offiziellen Dokumentationsseite zurück.

## vs. Dokumentation in CLAUDE.md einschließen

CLAUDE.md Dokumentation wird verwaltet und verbraucht bei jeder Session Kontext. Context7 ruft nur auf, was nötig ist, wenn nötig — keine Belastung, wenn Sie eine bestimmte Bibliothek nicht verwenden.
