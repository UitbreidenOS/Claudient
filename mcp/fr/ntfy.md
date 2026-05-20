# MCP : Notifications ntfy

Envoyez des notifications push depuis des flux de travail d'agent Claude Code. Au lieu de simplement notifier quand Claude a besoin d'une entrée, déclenchez des notifications à des jalons spécifiques dans votre automatisation.

## Pourquoi vous en avez besoin

Le hook ntfy s'active quand Claude est inactif. Ce serveur MCP permet à Claude de déclencher les notifications par programme :
- "Notifiez-moi quand la migration de base de données est complète"
- "Envoyez une alerte de style Slack si les tests échouent"
- "Ping mon téléphone quand la construction est terminée"

## Configuration

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

## Comment utiliser

```
# Notification d'étape
"Run the database migration, then notify me on ntfy when it completes"

# Alertes d'erreur
"Run all tests. If any fail, send a high-priority ntfy alert with the test name"

# Progression des tâches longues
"Process these 500 files and send me an ntfy update every 100 files"
```

## Dans les flux de travail d'agent

```python
# Claude peut appeler ntfy comme outil dans un flux de travail d'agent
# Exemple : Claude notifie de manière autonome lors de l'achèvement

await run_migration()
await ntfy.send(
    topic="your-claude-topic",
    message="Migration complete: 847 rows updated",
    priority="high",
    tags=["white_check_mark"]
)
```

## Priorités de notification

| Priorité | Cas d'usage |
|---|---|
| `min` | Infos de base |
| `low` | Mises à jour non urgentes |
| `default` | Mises à jour de progression normales |
| `high` | Tâche complète, nécessite une révision |
| `urgent` | Erreur, nécessite une attention immédiate |

## Combinez avec le hook ntfy-push

- **Hook ntfy-push** — Claude vous notifie quand il attend l'autorisation
- **MCP ntfy** — Claude vous notifie quand une étape de tâche se termine

Ensemble : sensibilisation complète aux flux de travail agentiques longue durée.

## ntfy auto-hébergé

```json
{
  "env": {
    "NTFY_SERVER": "https://your-server.com",
    "NTFY_TOPIC": "private-topic",
    "NTFY_TOKEN": "your-access-token"
  }
}
```
