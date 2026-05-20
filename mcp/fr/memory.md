# MCP : Mémoire persistante

Donnez à Claude Code une mémoire qui persiste d'une session à l'autre. Par défaut, Claude oublie tout lorsqu'une session se termine. Ce serveur MCP stocke les faits, les décisions et le contexte dans un graphe de connaissances local que Claude peut interroger dans toute session future.

## Pourquoi vous en avez besoin

Sans mémoire, chaque session Claude Code recommence à zéro. Avec la mémoire persistante :
- Claude se souvient de vos préférences, votre style de codage et vos décisions passées
- Pas besoin de réexpliquer le contexte du projet à chaque session
- Claude peut rappeler des fonctions spécifiques, des bugs corrigés ou des décisions architecturales d'il y a des semaines
- La connaissance s'accumule au fil du temps au lieu de s'évaporer après chaque `/compact`

## Installation

```bash
# Le serveur de mémoire le plus populaire
npm install -g @modelcontextprotocol/server-memory

# Ou utilisez la version npx (pas d'installation)
# Référencez-la simplement dans votre config ci-dessous
```

## Configuration

Ajoutez à `~/.claude.json` ou `.claude/mcp.json` du projet :

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

## Ce qu'il stocke

Le serveur de mémoire utilise un **graphe de connaissances** — entités et relations :

```
Entity: "authentication system"
  → Relations: "uses JWT", "built in May 2026", "has refresh token issue"
  
Entity: "database schema"
  → Relations: "uses PostgreSQL", "has 3 tables", "users table has soft delete"
```

## Utilisation de la mémoire dans les sessions

```
# Dites à Claude de se souvenir de quelque chose
"Remember that we decided to use Zod for all API validation"

# Claude stocke : entity("validation-decision") → uses("Zod")

# Session suivante — Claude récupère cela automatiquement quand c'est pertinent
# Ou demandez directement :
"What validation library did we decide on for this project?"
```

## Déclencheurs de mémoire automatiques

Claude stockera automatiquement :
- Les nouvelles décisions architecturales lorsque vous les prenez
- Les bugs et leurs corrections
- Vos préférences de codage au fur et à mesure qu'elles apparaissent
- Les services externes et leurs configurations

## Emplacement de stockage

Par défaut : `~/.claude/memory/knowledge.json`
- JSON lisible — vous pouvez l'inspecter et le modifier
- Portable — sauvegardez-le, synchronisez-le entre les machines
- Léger — généralement < 1 Mo même après des mois d'utilisation

## Confidentialité

Toute la mémoire est stockée localement. Rien ne quitte votre machine. Le serveur MCP lit/écrit uniquement un fichier JSON local.

## Combinez avec CLAUDE.md

Memory MCP complète (ne remplace pas) CLAUDE.md :
- **CLAUDE.md** — contexte de projet stable toujours chargé, versionné
- **Memory MCP** — connaissance dynamique et session par session qui grandit au fil du temps
