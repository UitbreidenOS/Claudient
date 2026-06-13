---
description: Construire une architecture d'agent Claude multi-étapes avec utilisation d'outils, mémoire et condition d'arrêt définie
argument-hint: "[description de l'objectif ou tâche de l'agent]"
---
Construire un agent Claude de production qui accomplisse : $ARGUMENTS

**Étape 1 — Spécification de conception de l'agent**

Avant d'écrire du code, définissez :

- **Objectif** — la condition de succès terminal (pas un processus, un état)
- **Entrées** — ce que l'agent reçoit au lancement (chaînes de caractères, chemins de fichiers, données structurées)
- **Sorties** — ce qu'il produit une fois terminé (fichiers écrits, appels API effectués, résultat structuré renvoyé)
- **Outils nécessaires** — énumérez chaque outil : nom, objectif, schéma d'entrée, forme de retour
- **Modèle de mémoire** — choisissez un :
  - Sans état (fenêtre contextuelle seulement, convenable pour <20 appels d'outils)
  - Mémoire résumée (compresser l'historique avec Haiku après chaque N étapes)
  - Mémoire externe (écrire les faits clés dans un fichier de brouillon ou une base clé-valeur)
- **Conditions d'arrêt** — qu'est-ce qui déclenche le retour de la sortie finale par l'agent versus continuer en boucle :
  - Succès : état objectif atteint
  - Échec : dépassement du nombre d'erreurs, état contradictoire détecté
  - Plafond : max_iterations atteint (toujours inclure ceci)

**Étape 2 — Générer l'agent**

Écrivez `agent.py` en utilisant le SDK Python Anthropic. Exigences :

- Modèle : `claude-sonnet-4-6` (configurable via la variable d'environnement `AGENT_MODEL`)
- Implémentez la boucle d'agent :
  ```
  while not done and iterations < max_iterations:
      response = client.messages.create(tools=tools, messages=history)
      if response.stop_reason == "tool_use":
          results = execute_tools(response)
          history.append(assistant_turn)
          history.append(tool_results_turn)
      elif response.stop_reason == "end_turn":
          done = True
  ```
- Définissez chaque outil comme un dictionnaire avec `name`, `description`, `input_schema` (Schéma JSON)
- Distribution d'outils : une fonction `dispatch(tool_name, tool_input)` qui achemine vers les callables Python
- Utilisez `cache_control: {"type": "ephemeral"}` sur le message d'invite système
- Sortie finale structurée : l'agent retourne une dataclass typée, pas du texte brut
- Enregistrer chaque itération : outil appelé, résumé d'entrée, résumé de résultat (pas le contenu complet)

**Étape 3 — Gestion des erreurs**

- Enveloppez chaque appel d'outil dans try/except ; retournez `{"error": str(e)}` comme résultat d'outil — ne levez jamais dans la boucle
- Sur `max_iterations` dépassé : retournez les résultats partiels avec un drapeau `status: "incomplete"`
- Sur les erreurs API (`anthropic.APIStatusError`) : réessayez jusqu'à 3 fois avec backoff exponentiel

**Étape 4 — Point d'entrée CLI**

Exposez via `argparse` :
- `--goal` (ou positionnel) : remplacer l'objectif codé en dur
- `--max-iterations` : défaut 25
- `--dry-run` : imprimer le plan (invite système + outils) sans exécution

**Sortie :** `agent.py` avec tous les outils implémentés, pas de stubs. Incluez un exemple d'utilisation dans un bloc de commentaire en haut du fichier.
