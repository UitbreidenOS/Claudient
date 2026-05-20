# MCP : Générateur de diagrammes Excalidraw

Générez des diagrammes d'architecture, des organigrammes et des cartes système directement depuis Claude Code. Décrivez votre système en anglais simple — Claude dessine le diagramme.

## Pourquoi vous en avez besoin

Les diagrammes d'architecture sont inestimables mais lents à créer manuellement. Avec le serveur MCP Excalidraw, Claude peut :
- Convertir une description de base de code en diagramme d'architecture système
- Dessiner des diagrammes de flux de données à partir de descriptions de points de terminaison API
- Créer des diagrammes de séquence pour les flux de travail complexes
- Mettre à jour les diagrammes existants lorsque l'architecture change

## Configuration

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

## Comment l'utiliser

```
# Diagramme d'architecture
"Draw a system architecture diagram for our app:
 - React frontend on Vercel
 - Express API on Railway
 - PostgreSQL on Neon
 - Redis cache on Upstash
 - Stripe for payments"

# Flux de données
"Create a sequence diagram for the user authentication flow:
 login form → Express API → check database → generate JWT → return to client"

# Carte de services
"Draw a microservices map showing how these services communicate: [describe services]"
```

## Formats de sortie

- **Excalidraw JSON** — ouvrir dans excalidraw.com ou l'extension VS Code
- **SVG** — intégrer dans README ou docs
- **PNG** — pour les présentations et Notion

## Enregistrement de diagrammes

```
"Save the architecture diagram as docs/architecture.excalidraw"
```

Claude l'enregistre directement dans votre projet. Validez-le — les fichiers Excalidraw sont du JSON versionné, donc les diffs sont significatifs.

## Combinez avec la compétence codebase-onboarding

Générez des diagrammes dans le cadre de la documentation d'intégration :
```
"Read the codebase structure and generate:
1. A system architecture diagram
2. A data model diagram from the Prisma schema
3. A deployment diagram based on the infrastructure config"
```
