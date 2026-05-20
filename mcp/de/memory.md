# MCP: Persistente Speicherung

Geben Sie Claude Code Speicher, der über Sessions hinweg bestehen bleibt. Standardmäßig vergisst Claude alles, wenn eine Session endet. Dieser MCP-Server speichert Fakten, Entscheidungen und Kontext in einem lokalen Wissensgraph, den Claude in zukünftigen Sessions abfragen kann.

## Warum Sie das brauchen

Ohne Speicher startet jede Claude Code-Session bei Null. Mit persistentem Speicher:
- Claude erinnert sich an Ihre Vorlieben, Ihren Codierungsstil und vergangene Entscheidungen
- Kein Bedarf, Projekt-Kontext in jeder Session neu zu erklären
- Claude kann sich an spezifische Funktionen, behobene Bugs oder Architekturentscheidungen von vor Wochen erinnern
- Wissen baut sich im Laufe der Zeit auf, statt nach jedem `/compact` zu verdampfen

## Installation

```bash
# Der beliebteste Speicherserver
npm install -g @modelcontextprotocol/server-memory

# Oder verwenden Sie die npx-Version (keine Installation)
# Referenzieren Sie ihn einfach in Ihrer Config unten
```

## Konfiguration

Fügen Sie zu `~/.claude.json` oder Project `.claude/mcp.json` hinzu:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "/Users/your-name/.claude/memory/knowledge.json"
      }
    }
  }
}
```

## Was es speichert

Der Speicherserver nutzt einen **Wissensgraph** — Entitäten und Beziehungen:

```
Entity: "authentication system"
  → Relations: "uses JWT", "built in May 2026", "has refresh token issue"
  
Entity: "database schema"
  → Relations: "uses PostgreSQL", "has 3 tables", "users table has soft delete"
```

## Speicher in Sessions verwenden

```
# Sagen Sie Claude, sich etwas zu merken
"Remember that we decided to use Zod for all API validation"

# Claude speichert: entity("validation-decision") → uses("Zod")

# Nächste Session — Claude ruft dies automatisch ab, wenn relevant
# Oder fragen Sie direkt:
"What validation library did we decide on for this project?"
```

## Automatische Speicher-Trigger

Claude wird automatisch speichern:
- Neue Architekturentscheidungen, wenn Sie sie treffen
- Bugs und deren Fixes
- Ihre Codiervorlieben, während sie auftauchen
- Externe Services und ihre Konfigurationen

## Speicherort

Standard: `~/.claude/memory/knowledge.json`
- Menschenlesbares JSON — Sie können es inspizieren und bearbeiten
- Tragbar — sichern Sie es, synchronisieren Sie es zwischen Maschinen
- Leichtgewichtig — typischerweise < 1 MB auch nach Monaten der Nutzung

## Datenschutz

Alle Speicher werden lokal gespeichert. Nichts verlässt Ihren Computer. Der MCP-Server liest/schreibt nur eine lokale JSON-Datei.

## Kombinieren Sie mit CLAUDE.md

Memory MCP ergänzt (ersetzt nicht) CLAUDE.md:
- **CLAUDE.md** — stabiler Projektkonttext, immer geladen, versionskontrolliert
- **Memory MCP** — dynamisches, sessions-weise Wissen, das im Laufe der Zeit wächst
