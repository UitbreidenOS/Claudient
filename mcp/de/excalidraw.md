# MCP: Excalidraw-Diagramm-Generator

Generieren Sie Architekturdiagramme, Flussdiagramme und Systemkarten direkt aus Claude Code. Beschreiben Sie Ihr System in einfachen englischen — Claude zeichnet das Diagramm.

## Warum Sie das brauchen

Architekturdiagramme sind wertvoll aber langsam, manuell zu erstellen. Mit dem Excalidraw MCP-Server kann Claude:
- Eine Codebasis-Beschreibung in ein System-Architektur-Diagramm umwandeln
- Datenflussdiagramme aus API-Endpoint-Beschreibungen zeichnen
- Sequenzdiagramme für komplexe Workflows erstellen
- Bestehende Diagramme aktualisieren, wenn die Architektur sich ändert

## Konfiguration

```json
{
  "mcpServers": {
    "excalidraw": {
      "command": "npx",
      "args": ["-y", "excalidraw-mcp-server"]
    }
  }
}
```

## Verwendung

```
# Architektur-Diagramm
"Draw a system architecture diagram for our app:
 - React frontend on Vercel
 - Express API on Railway
 - PostgreSQL on Neon
 - Redis cache on Upstash
 - Stripe for payments"

# Datenfluss
"Create a sequence diagram for the user authentication flow:
 login form → Express API → check database → generate JWT → return to client"

# Servicekarte
"Draw a microservices map showing how these services communicate: [describe services]"
```

## Ausgabeformate

- **Excalidraw JSON** — öffnen Sie in excalidraw.com oder VS Code-Erweiterung
- **SVG** — in README oder Docs einbetten
- **PNG** — für Präsentationen und Notion

## Diagramme speichern

```
"Save the architecture diagram as docs/architecture.excalidraw"
```

Claude speichert ihn direkt in Ihr Projekt. Committen Sie — Excalidraw-Dateien sind versioniertes JSON, also sind Diffs aussagekräftig.

## Kombinieren Sie mit der codebase-onboarding-Skill

Generieren Sie Diagramme als Teil der Onboarding-Dokumentation:
```
"Read the codebase structure and generate:
1. A system architecture diagram
2. A data model diagram from the Prisma schema
3. A deployment diagram based on the infrastructure config"
```
