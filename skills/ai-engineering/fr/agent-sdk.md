---
name: agent-sdk
updated: 2026-06-13
---

# SDK Claude Agent

## Quand activer
Construire une application Python ou TypeScript qui utilise les capacités de Claude Code de manière programmatique ; déployer Claude comme agent autonome au sein d'un produit ; écrire du code qui pilote le CLI `claude` en mode non-interactif ; écrire des scripts de flux de travail agentiques qui nécessitent une gestion automatique des appels d'outils, des tentatives et du contexte.

## Quand NE PAS utiliser
Utiliser Claude Code de manière interactive dans le terminal — c'est l'expérience par défaut, pas un cas d'usage SDK ; construire un simple chatbot ou une interface Q&R à tour unique (utilisez l'API Messages directement) ; quand Anthropic Managed Agents est plus adapté (infrastructure hébergée, mise à l'échelle automatique, persistance de mémoire intégrée).

## Instructions

**Ce qu'est le SDK Agent :**
La même boucle d'outils, gestion du contexte et capacités d'agent que Claude Code interactif — packagé en tant que bibliothèque que vous intégrez dans votre propre application. Vous contrôlez l'infrastructure ; Anthropic fournit le modèle et la boucle d'agent.

**SDK vs alternatives — choisir la bonne couche :**

| Besoin | Utiliser |
|---|---|
| Intégrer Claude agentique dans votre app, contrôler l'infra | Agent SDK |
| Claude agentique hébergé par Anthropic, sans gestion d'ops | Managed Agents |
| Réponses à tour unique, pas de boucle d'outils nécessaire | API Messages |
| Flux de travail interactif en terminal | CLI Claude Code |

**Installation :**

Python :
```bash
pip install claude-code-sdk
```

TypeScript :
```bash
npm install @anthropic-ai/claude-code
```

**Flag `--bare` via options :** Ignore le chargement de `CLAUDE.md` et la découverte du serveur MCP. Utilisez-le dans les contextes CI et de scripting où la vitesse de démarrage compte — environ 10× plus rapide d'initialisation.

**Facturation (à partir du 15 juin 2026) :** Les sessions du SDK Agent utilisent un pool de crédits dédié au SDK Agent, séparé des limites de session interactive.

**Outils en processus :** Les outils s'exécutent dans le processus plutôt que de générer des sous-processus. Utilisez ceci pour les appels haute fréquence où la surcharge des sous-processus s'accumule.

**Support des fournisseurs de cloud :** AWS Bedrock, Google Vertex AI et Microsoft Azure AI Foundry sont tous supportés. Configurez via des variables d'environnement — aucune modification du code SDK requise.

**Exemple Python :**
```python
import asyncio
from claude_code_sdk import query, ClaudeCodeOptions

async def run_agent(task: str):
    options = ClaudeCodeOptions(system_prompt="You are a code reviewer.")
    async for message in query(prompt=task, options=options):
        if message.type == "result":
            print(message.result)

asyncio.run(run_agent("Review this PR diff and list security issues"))
```

**Exemple TypeScript :**
```typescript
import { query, ClaudeCodeOptions } from "@anthropic-ai/claude-code";

const options: ClaudeCodeOptions = {
  systemPrompt: "You are a code reviewer.",
};

for await (const message of query({ prompt: "Review this PR diff", options })) {
  if (message.type === "result") {
    console.log(message.result);
  }
}
```

**SDK Agent vs Managed Agents — guide de décision :**
- SDK Agent : contrôle complet de l'infrastructure, s'exécute dans votre CI/CD, charges de travail sensibles à la latence, journalisation et observabilité personnalisées
- Managed Agents : Anthropic gère les crashes, la mise à l'échelle et la persistance de la mémoire ; aucune infrastructure à gérer ; meilleur pour les équipes non techniques déployant des agents comme fonctionnalité de produit

## Exemple

Un pipeline d'examen de code en CI : à chaque événement d'ouverture de PR, une tâche GitHub Actions appelle le SDK Agent avec la différence PR comme invite. L'agent examine la différence, appelle des outils internes pour vérifier la base de données de couverture de test, et poste un commentaire d'examen structuré sur la PR via l'API GitHub. Le flag `--bare` garde le temps de démarrage à froid sous 2 secondes.

---
