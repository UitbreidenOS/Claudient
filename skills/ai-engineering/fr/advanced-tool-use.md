---
name: advanced-tool-use
updated: 2026-06-13
---

# Utilisation avancée des outils

## Quand l'activer
L'utilisateur souhaite optimiser les modèles d'utilisation des outils dans les applications Claude API, réduire les tokens des définitions d'outils ou la surcharge des appels, améliorer la précision sur les paramètres d'outils complexes, ou construire des workflows d'appel d'outils sophistiqués.

## Quand NE PAS l'utiliser
- Les workflows simples avec un seul outil où l'optimisation de surcharge est non pertinente
- Les applications utilisant l'API Messages standard avec moins de 5 outils et pas d'appels répétés
- Déboguer une définition d'outil cassée — corriger d'abord la précision, puis optimiser

## Instructions

### Modèle 1 : Appel d'outils programmatique (PTC)
Claude écrit du code d'orchestration Python au lieu d'appeler les outils un par un. Réduit les allers-retours et les tokens.

**Réduction de tokens : ~37% pour les workflows multi-outils.**

Activer par outil :
```python
{
    "name": "read_file",
    "description": "Read a file",
    "input_schema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]},
    "allowed_callers": ["code_execution_20250825"],
}
```

Quand activé, Claude peut choisir d'écrire une boucle Python appelant cet outil N fois au lieu de faire N blocs tool_use séparés. Utiliser pour : les modèles de lecture/recherche répétitifs, les pipelines de transformation de données, tout outil appelé >3 fois par tour.

Ne pas activer pour les outils avec effets secondaires (écriture, suppression, déploiement) ou les outils nécessitant une autorisation par appel.

---

### Modèle 2 : Filtrage dynamique pour les outils web
Nouveaux types d'outils intégrés pour la recherche web et la récupération qui filtrent les résultats avant qu'ils ne s'intègrent au contexte.

**En-tête Beta requis :** `anthropic-beta: code-execution-web-tools-2026-02-09`

**Réduction de tokens : ~24% moins de tokens d'entrée. Amélioration de la précision : +13–16 points de pourcentage.**

```python
import anthropic

client = anthropic.Anthropic(default_headers={"anthropic-beta": "code-execution-web-tools-2026-02-09"})

response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=2048,
    tools=[
        {"type": "web_search_20260209", "name": "web_search"},
        {"type": "web_fetch_20260209", "name": "web_fetch"},
    ],
    messages=[{"role": "user", "content": "What is the current price of NVDA stock?"}],
)
```

Avec ces types d'outils, Claude écrit du code de filtrage qui extrait uniquement les données pertinentes des résultats de recherche ou des pages récupérées avant que le contenu ne s'intègre à la fenêtre de contexte. Une page web complète de 50 000 tokens devient une extraction de 200 tokens.

---

### Modèle 3 : Recherche d'outils / Chargement différé
Pour les grands catalogues d'outils, différer les outils rarement utilisés pour qu'ils ne se chargent pas dans le contexte à moins d'être nécessaires.

**Réduction de tokens : ~85% pour les catalogues avec de nombreux outils.**

Activer via variable d'environnement :
```
ENABLE_TOOL_SEARCH=auto:N
```
Où N est le seuil — les outils au-delà des N plus pertinents sont différés.

Marquer les outils individuels comme reportables :
```python
{
    "name": "advanced_analytics",
    "description": "Run complex analytics queries",
    "input_schema": {...},
    "defer_loading": True,  # Only load when Claude needs this tool
}
```

Les outils différés sont découverts à la demande par Claude via MCPSearch quand il détermine qu'il a besoin d'une capacité non présente dans le contexte chargé actuel. Utiliser pour : les grands catalogues d'outils MCP, les API d'entreprise avec des centaines de points de terminaison, les systèmes de plugins où la plupart des outils sont rarement utilisés.

Ne pas différer les outils appelés dans presque toutes les conversations — la surcharge de découverte élimine les économies.

---

### Modèle 4 : Exemples d'utilisation d'outils (`input_examples`)
Ajouter des exemples d'appel concrets aux définitions d'outils au-delà du schéma JSON.

**Amélioration de la précision : ~72% → ~90% sur les paramètres complexes.**

```python
{
    "name": "query_database",
    "description": "Run a SQL query against the analytics database",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "SQL query to execute"},
            "timeout_seconds": {"type": "integer", "description": "Max execution time"},
            "read_only": {"type": "boolean", "description": "Enforce read-only mode"},
        },
        "required": ["query"],
    },
    "input_examples": [
        {
            "query": "SELECT user_id, count(*) as orders FROM orders WHERE created_at > NOW() - INTERVAL '7 days' GROUP BY user_id ORDER BY orders DESC LIMIT 10",
            "timeout_seconds": 30,
            "read_only": True,
        },
        {
            "query": "SELECT AVG(order_value) FROM orders WHERE status = 'completed'",
            "read_only": True,
        },
    ],
}
```

`input_examples` est très utile pour :
- Les outils avec des combinaisons de paramètres non évidentes
- Les schémas imbriqués complexes
- Les paramètres où le format importe plus que le type (chaînes SQL, regex, chemins JSON)
- Les outils où Claude fait systématiquement la même erreur de paramètre sans exemples

---

### Combiner les modèles

Pile d'efficacité maximale pour un grand catalogue d'outils :

```python
tools = [
    # Frequently used tools — loaded always, PTC enabled, with examples
    {
        "name": "read_file",
        "allowed_callers": ["code_execution_20250825"],
        "input_examples": [{"path": "/src/api/users.ts"}],
        ...
    },
    # Infrequently used tools — deferred
    {
        "name": "run_migration",
        "defer_loading": True,
        ...
    },
    # Last frequent tool — cache everything up to here
    {
        "name": "list_files",
        "cache_control": {"type": "ephemeral"},
        ...
    },
]
```

Utiliser les types d'outils web quand la recherche/récupération web est en scope :
```python
tools += [
    {"type": "web_search_20260209", "name": "web_search"},
    {"type": "web_fetch_20260209", "name": "web_fetch"},
]
```

## Exemple

Un agent avec 120 outils (surface API complète d'une plateforme SaaS) :

Sans optimisation : 120 définitions d'outils × ~150 tokens chacun = ~18 000 tokens par appel, juste pour les définitions d'outils. La plupart des outils ne sont jamais appelés.

Avec chargement différé (`ENABLE_TOOL_SEARCH=auto:10`) : seuls les 10 outils les plus probables sont chargés. Le coût en tokens pour les définitions d'outils passe de 18 000 à ~1 500 — réduction de 85%. Quand Claude a besoin d'un outil rarement utilisé, il le recherche et le charge à la demande, ajoutant ~200 tokens pour ce tour uniquement.

Ajouter `input_examples` aux 10 outils toujours chargés augmente la précision des paramètres de 72% à 90% sur les outils qui importent le plus.

---
