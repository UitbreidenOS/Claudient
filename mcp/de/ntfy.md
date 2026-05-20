# MCP: ntfy-Benachrichtigungen

Senden Sie Push-Benachrichtigungen aus Claude Code-Agent-Flows. Statt nur zu benachrichtigen, wenn Claude Eingabe benötigt, lösen Sie Benachrichtigungen bei bestimmten Meilensteinen in Ihrer Automatisierung aus.

## Warum Sie das brauchen

Der ntfy-Hook wird ausgelöst, wenn Claude untätig ist. Dieser MCP-Server ermöglicht Claude, Benachrichtigungen programmgesteuert auszulösen:
- "Benachrichtige mich, wenn die Datenbankmigration abgeschlossen ist"
- "Sende eine Slack-ähnliche Warnung, wenn Tests fehlschlagen"
- "Ping mein Telefon, wenn der Build abgeschlossen ist"

## Konfiguration

```json
{
  "mcpServers": {
    "ntfy": {
      "command": "npx",
      "args": ["-y", "ntfy-mcp-server"],
      "env": {
        "NTFY_TOPIC": "your-claude-topic",
        "NTFY_SERVER": "https://ntfy.sh"
      }
    }
  }
}
```

## Verwendung

```
# Meilenstein-Benachrichtigung
"Run the database migration, then notify me on ntfy when it completes"

# Fehler-Warnungen
"Run all tests. If any fail, send a high-priority ntfy alert with the test name"

# Fortschritt bei langen Aufgaben
"Process these 500 files and send me an ntfy update every 100 files"
```

## In Agent-Workflows

```python
# Claude kann ntfy als Tool in einem Agent-Workflow aufrufen
# Beispiel: Claude benachrichtigt autonom bei Completion

await run_migration()
await ntfy.send(
    topic="your-claude-topic",
    message="Migration complete: 847 rows updated",
    priority="high",
    tags=["white_check_mark"]
)
```

## Benachrichtigungsprioritäten

| Priorität | Anwendungsfall |
|---|---|
| `min` | Hintergrund-Info |
| `low` | Nicht dringende Updates |
| `default` | Normale Fortschrittsupdates |
| `high` | Aufgabe abgeschlossen, benötigt Überprüfung |
| `urgent` | Fehler, erfordert sofortige Aufmerksamkeit |

## Kombinieren Sie mit dem ntfy-push-Hook

- **ntfy-push-Hook** — Claude benachrichtigt Sie, wenn es auf Berechtigung wartet
- **ntfy MCP** — Claude benachrichtigt Sie, wenn ein Task-Schritt abgeschlossen ist

Zusammen: vollständige Bewusstsein für lange laufende Agent-Workflows.

## Selbstgehostetes ntfy

```json
{
  "env": {
    "NTFY_SERVER": "https://your-server.com",
    "NTFY_TOPIC": "private-topic",
    "NTFY_TOKEN": "your-access-token"
  }
}
```
