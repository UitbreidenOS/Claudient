---
name: agent-construction
description: "Architecture multi-agents, patterns d'orchestration, conception d'outils, boucles d'agents, mémoire, gestion d'erreurs, transferts"
updated: 2026-06-13
---

# Compétence de Construction d'Agents

## Quand activer
- Conception d'un système multi-agents avec Claude (orchestrateur + sous-agents)
- Construction d'un agent alimenté par Claude qui utilise des outils sur plusieurs tours
- Conception de la mémoire pour un agent long terme (en contexte vs. externe)
- Gestion des erreurs d'agents, des tentatives et des conditions d'arrêt
- Implémentation des transferts d'agents entre sous-agents spécialisés

## Quand NE PAS l'utiliser
- Appels API Claude simples (un seul tour) — la compétence Claude API est suffisante
- Chatbots simples sans utilisation d'outils ou de prise de décision autonome
- Abstractions LangChain/LlamaIndex — adressez directement la couche d'abstraction

## Instructions

### Patterns d'architecture d'agents

**Agent unique avec outils** — une instance Claude, plusieurs outils, boucle jusqu'à fin de tâche :
```
User → Agent → [Tool A] → [Tool B] → Agent → User
```

**Orchestrateur + sous-agents** — un parent génère des enfants spécialisés :
```
User → Orchestrator → [ResearchAgent] → [WriterAgent] → Orchestrator → User
```

**Pipeline** — les agents se transmettent les résultats en séquence :
```
User → Agent1(classify) → Agent2(extract) → Agent3(generate) → User
```

Choisissez l'architecture la plus simple qui résout le problème. Un agent unique avec outils gère la plupart des cas.

### Conception d'outils
```python
# Définitions d'outils pour boucle d'agent multi-turn
tools = [
    {
        "name": "search_web",
        "description": "Rechercher sur le web les informations actuelles. À utiliser quand vous avez besoin de faits non présents dans vos données d'entraînement.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Requête de recherche"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "read_file",
        "description": "Lire le contenu d'un fichier par chemin.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Chemin de fichier absolu"}
            },
            "required": ["path"]
        }
    },
    {
        "name": "write_file",
        "description": "Écrire du contenu dans un fichier. Crée le fichier s'il n'existe pas.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "content": {"type": "string"}
            },
            "required": ["path", "content"]
        }
    }
]
```

Règles de conception d'outils :
- La description doit dire à Claude QUAND l'utiliser, pas juste ce qu'il fait
- Gardez `input_schema` minimal — seulement les champs requis, pas de bruit optionnel
- Retournez des données structurées (JSON), pas de prose, pour que Claude puisse les utiliser de manière fiable
- Un outil par action — ne fusionnez pas lecture+écriture dans un seul outil

### Boucle d'agent
```python
import anthropic
import json

client = anthropic.Anthropic()

def run_agent(task: str, max_iterations: int = 20) -> str:
    messages = [{"role": "user", "content": task}]
    
    for iteration in range(max_iterations):
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            system=AGENT_SYSTEM_PROMPT,
            tools=tools,
            messages=messages,
        )
        
        # Ajouter la réponse de l'assistant
        messages.append({"role": "assistant", "content": response.content})
        
        if response.stop_reason == "end_turn":
            # Extraire la réponse textuelle finale
            return next(b.text for b in response.content if hasattr(b, "text"))
        
        if response.stop_reason == "tool_use":
            # Exécuter tous les appels d'outils dans cette réponse
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": json.dumps(result) if not isinstance(result, str) else result
                    })
            
            messages.append({"role": "user", "content": tool_results})
        else:
            # Raison d'arrêt inattendue
            break
    
    raise RuntimeError(f"Agent exceeded {max_iterations} iterations without completing")


def execute_tool(name: str, inputs: dict) -> any:
    match name:
        case "search_web":
            return search(inputs["query"])
        case "read_file":
            return Path(inputs["path"]).read_text()
        case "write_file":
            Path(inputs["path"]).write_text(inputs["content"])
            return {"success": True, "path": inputs["path"]}
        case _:
            return {"error": f"Unknown tool: {name}"}
```

### Prompt système pour les agents
```
AGENT_SYSTEM_PROMPT = """Vous êtes un agent autonome accomplissant des tâches étape par étape.

Approche :
1. Analysez la tâche avant d'agir
2. Utilisez le minimum d'outils nécessaires
3. Vérifiez votre travail avant de déclarer terminer
4. Si un outil renvoie une erreur, diagnostiquez et réessayez une fois — s'il échoue à nouveau, signalez l'erreur

Conditions d'arrêt — déclarez "DONE: <result>" quand :
- La tâche est complètement achevée
- Vous avez atteint une erreur irrécupérable après nouvelle tentative
- On vous a demandé de faire quelque chose de nuisible ou impossible

Ne bouchez jamais plus de 3 fois sur le même appel d'outil avec les mêmes entrées.
"""
```

### Patterns de mémoire

**Mémoire en contexte** (tableau de messages) — pour une seule session, petit état :
```python
# Résumé quand le contexte s'agrandit
if count_tokens(messages) > 150_000:
    summary = summarize_messages(messages[:-5])  # garder les 5 derniers tours
    messages = [
        {"role": "user", "content": f"[Previous context summary]\n{summary}"},
        {"role": "assistant", "content": "Understood. Continuing from where we left off."},
        *messages[-5:]
    ]
```

**Mémoire externe** (pour les agents multi-session) :
```python
# Mémoire simple basée sur fichier
class AgentMemory:
    def __init__(self, path: str):
        self.path = Path(path)
        self.data = json.loads(self.path.read_text()) if self.path.exists() else {}

    def remember(self, key: str, value: any):
        self.data[key] = {"value": value, "timestamp": datetime.utcnow().isoformat()}
        self.path.write_text(json.dumps(self.data, indent=2))

    def recall(self, key: str) -> any:
        entry = self.data.get(key)
        return entry["value"] if entry else None

    def as_context(self) -> str:
        if not self.data:
            return ""
        lines = [f"- {k}: {v['value']}" for k, v in self.data.items()]
        return "Known context:\n" + "\n".join(lines)
```

### Pattern Orchestrateur
```python
def orchestrate(task: str) -> str:
    # Étape 1 : L'agent de planification décompose la tâche
    plan = run_subagent(
        model="claude-sonnet-4-6",
        system="Vous êtes un planificateur. Décomposez les tâches en étapes numérotées.",
        task=f"Décomposez cette tâche en étapes : {task}",
        tools=[]  # Aucun outil nécessaire pour la planification
    )

    # Étape 2 : Exécuter chaque étape avec des agents spécialisés
    results = []
    for step in parse_steps(plan):
        agent_type = classify_step(step)  # "research" | "code" | "write"
        result = run_subagent(
            model=agent_model(agent_type),
            system=agent_system_prompt(agent_type),
            task=step,
            tools=agent_tools(agent_type),
            context="\n".join(results)  # Donner le contexte des étapes précédentes
        )
        results.append(f"Step result: {result}")

    # Étape 3 : L'agent de synthèse combine les résultats
    return run_subagent(
        model="claude-sonnet-4-6",
        system="Vous êtes un synthétiseur. Combinez les résultats des étapes en une réponse finale.",
        task=f"Tâche originale : {task}\n\nRésultats des étapes :\n" + "\n".join(results),
        tools=[]
    )
```

### Gestion des erreurs et conditions d'arrêt
```python
class AgentError(Exception):
    pass

class MaxIterationsError(AgentError):
    pass

class ToolFailureError(AgentError):
    pass

def execute_tool_safe(name: str, inputs: dict, consecutive_failures: dict) -> dict:
    try:
        result = execute_tool(name, inputs)
        consecutive_failures[name] = 0
        return {"success": True, "result": result}
    except Exception as e:
        consecutive_failures[name] = consecutive_failures.get(name, 0) + 1
        if consecutive_failures[name] >= 3:
            raise ToolFailureError(f"Tool {name} failed 3 consecutive times: {e}")
        return {"success": False, "error": str(e), "retry": True}
```

### Pattern de transfert
```python
# L'agent parent passe le contexte explicitement — les sous-agents n'ont pas de mémoire de session
def handoff_to_specialist(context: dict, task: str, specialist: str) -> str:
    handoff_prompt = f"""
Contexte de l'orchestrateur :
{json.dumps(context, indent=2)}

Votre tâche :
{task}
"""
    return run_subagent(
        system=SPECIALIST_PROMPTS[specialist],
        task=handoff_prompt,
        tools=SPECIALIST_TOOLS[specialist]
    )
```

## Exemple

**Utilisateur :** Construisez un agent de recherche qui prend un sujet, recherche sur le web 3 sources, lit chaque URL et écrit un résumé de 500 mots avec citations dans un fichier.

**Résultat attendu :**
- Liste `tools` : `search_web`, `fetch_url`, `write_file`
- Prompt système : instruit l'agent à rechercher → récupérer 3 URLs → synthétiser → écrire le fichier avant de déclarer terminé
- Boucle `run_agent(task)` avec `max_iterations=15`
- Gestion des erreurs : si `fetch_url` échoue, essayez le résultat de recherche suivant
- Résultat final : chemin du fichier de résumé écrit

---
