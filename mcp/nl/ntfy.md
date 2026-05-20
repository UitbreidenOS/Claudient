# MCP: ntfy-meldingen

Stuur push-meldingen vanuit Claude Code-agent-flows. In plaats van alleen te melden wanneer Claude invoer nodig heeft, trigger meldingen op specifieke mijlpalen in uw automatisering.

## Waarom je dit nodig hebt

De ntfy-hook wordt geactiveerd wanneer Claude inactief is. Deze MCP-server stelt Claude in staat meldingen programmatisch uit te voeren:
- "Stuur me een melding wanneer de databasemigratie is voltooid"
- "Stuur een Slack-achtige waarschuwing als tests mislukken"
- "Ping mijn telefoon wanneer de build is voltooid"

## Configuratie

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

## Hoe te gebruiken

```
# Mijlpaal-melding
"Run the database migration, then notify me on ntfy when it completes"

# Foutmeldingen
"Run all tests. If any fail, send a high-priority ntfy alert with the test name"

# Voortgang van langlopende taak
"Process these 500 files and send me an ntfy update every 100 files"
```

## In agent-workflows

```python
# Claude kan ntfy als hulpmiddel in een agent-workflow aanroepen
# Voorbeeld: Claude meldt autonoom na voltooiing

await run_migration()
await ntfy.send(
    topic="your-claude-topic",
    message="Migration complete: 847 rows updated",
    priority="high",
    tags=["white_check_mark"]
)
```

## Meldingsprioriteiten

| Prioriteit | Gebruiksscenario |
|---|---|
| `min` | Achtergrondinformatie |
| `low` | Niet-urgente updates |
| `default` | Normale voortgangsupdates |
| `high` | Taak voltooid, vereist beoordeling |
| `urgent` | Fout, vereist onmiddellijke aandacht |

## Combineer met de ntfy-push-hook

- **ntfy-push-hook** — Claude stelt u in kennis wanneer het op toestemming wacht
- **ntfy MCP** — Claude stelt u in kennis wanneer een taakstap is voltooid

Samen: volledige bewustzijn van langlopende agent-workflows.

## Zelf-gehost ntfy

```json
{
  "env": {
    "NTFY_SERVER": "https://your-server.com",
    "NTFY_TOPIC": "private-topic",
    "NTFY_TOKEN": "your-access-token"
  }
}
```
