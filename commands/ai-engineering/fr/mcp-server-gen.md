---
description: Générer un serveur MCP entièrement fonctionnel exposant des outils, ressources ou invites pour un domaine donné
argument-hint: "[domaine ou service à exposer, p. ex. « GitHub issues » ou « requête Postgres »]"
---
Générer un serveur MCP (Model Context Protocol) prêt pour la production pour : $ARGUMENTS

**Étape 1 — Conception des capacités**

À partir du domaine dans $ARGUMENTS, énumérer ce que le serveur doit exposer à travers chaque primitive MCP :

- **Outils** — actions que le modèle peut invoquer (créer, mettre à jour, supprimer, interroger). Lister le nom, la description, le schéma d'entrée (JSON Schema), et la forme de retour.
- **Ressources** — données que le modèle peut lire (motifs de liste et d'URI de lecture). Lister le modèle d'URI et le type de contenu.
- **Invites** — modèles d'invites réutilisables que l'hôte peut exposer. Lister le nom, les arguments et le texte de l'invite.

Indiquer uniquement ce qui est approprié pour le domaine — les trois primitives ne sont pas toujours nécessaires.

**Étape 2 — Générer le serveur**

Écrire un serveur MCP Python complet utilisant le package `mcp` (`pip install mcp`). Exigences :

- Utiliser `mcp.server.Server` et le transport `stdio_server()`
- Enregistrer chaque outil, ressource et invite identifiés à l'Étape 1
- Chaque gestionnaire d'outil doit :
  - Valider l'entrée avec des modèles Pydantic
  - Retourner `[TextContent(...)]` ou `[ImageContent(...)]` selon le cas
  - Lever `McpError` avec un `ErrorCode` approprié en cas d'échec (ne pas retourner de chaînes d'erreur dans le contenu)
- Inclure un bloc `__main__` : `asyncio.run(main())`
- Utiliser `httpx.AsyncClient` ou le SDK pertinent pour les appels API sortants — pas de `requests`
- Secrets via variables d'environnement uniquement — jamais en dur

**Étape 3 — Snippet de registration settings.json**

Afficher le bloc JSON exact à coller dans `.claude/settings.json` (ou `~/.claude/settings.json`) pour enregistrer le serveur :

```json
{
  "mcpServers": {
    "<server-name>": {
      "command": "python",
      "args": ["path/to/server.py"],
      "env": {
        "API_KEY": "${API_KEY}"
      }
    }
  }
}
```

**Étape 4 — Test de fumée**

Écrire un `test_server.py` utilisant `mcp.client.session.ClientSession` et `stdio_client` qui :
- Se connecte au serveur via un sous-processus
- Liste les outils, ressources et invites
- Appelle chaque outil avec une entrée valide minimale et affirme une réponse non-erreur
- S'exécute avec `pytest -xvs test_server.py`

**Résultat :** `server.py`, snippet `settings.json`, `test_server.py`. Pas de stubs `# TODO`. Pas de logique d'espace réservé.
