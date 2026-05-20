# MCP : Context7 — Documentation en direct

Donnez à Claude Code accès à la documentation à jour de toute bibliothèque ou framework. Plus d'API hallucinées ou d'exemples de code obsolètes.

## Pourquoi vous en avez besoin

La date limite des connaissances de Claude a une limite. Pour les bibliothèques évolutives (Next.js 16, LangGraph 1.2, shadcn/ui), la documentation que Claude connaît peut être des mois ou des années obsolète. Context7 résout ce problème en récupérant la documentation actuelle à la demande.

## Ce qu'il fait

- Récupère la documentation à jour et spécifique à la version pour toute bibliothèque
- Injecte la section de documentation pertinente dans le contexte de Claude
- Claude génère du code par rapport à l'API réelle actuelle, pas une version mémorisée
- Couvre : React, Next.js, Tailwind, shadcn/ui, Prisma, Drizzle, LangChain, LangGraph et des milliers d'autres

## Configuration

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

Pas de clé API requise pour l'utilisation de base.

## Comment l'utiliser dans les sessions

```
# Demandez explicitement la documentation actuelle
"Using context7, get the latest Next.js 16 App Router docs for data fetching"

# Claude va récupérer et les utiliser
"Build a server action using the current Next.js syntax"

# Pour les questions spécifiques à la version
"What's the correct way to use useFormState in React 19?"
```

## Déclencheurs

Vous pouvez également travailler normalement — Context7 est déclenché lorsque Claude détecte qu'il a besoin de consulter la documentation. Ou ajoutez ceci à votre CLAUDE.md :

```markdown
## Libraries
When writing code with Next.js, React, Tailwind, or shadcn/ui:
- Use context7 MCP to fetch current documentation before generating code
- Always specify the version we're using (see package.json)
```

## Bibliothèques supportées

Couvre la plupart des packages npm et des bibliothèques Python majeurs. Si une bibliothèque n'est pas indexée, Context7 bascule vers la récupération de la page de documentation officielle directement.

## vs. inclusion des docs dans CLAUDE.md

Les docs CLAUDE.md deviennent obsolètes et consomment du contexte à chaque session. Context7 récupère uniquement ce qui est nécessaire, quand c'est nécessaire — zéro surcharge quand vous n'utilisez pas une bibliothèque spécifique.
