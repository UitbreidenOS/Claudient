> 🇫🇷 This is the French translation. [English version](../claude-api.md).

---
name: claude-api
description: "Anthropic Claude API: prompt caching, streaming, tool use, batch processing, model selection, cost optimization"
updated: 2026-06-13
---

# Claude API Skill

## Quand activer
- Écrire du code appelant l'API Claude Anthropic (SDK Python ou TypeScript)
- Implémenter la mise en cache de prompts, le streaming ou le traitement par lots
- Concevoir la gestion des conversations multi-tours
- Sélectionner le bon modèle Claude (Haiku, Sonnet, Opus) pour une tâche
- Ajouter tool use / function calling à une intégration Claude
- Optimiser le coût ou la latence dans une application Claude de production

## Quand NE PAS utiliser
- APIs OpenAI ou d'autres fournisseurs — SDK et motifs différents
- Conseils LLM génériques non liés à l'API Anthropic
- Projets utilisant déjà les abstractions LangChain ou LlamaIndex — adressez la couche d'abstraction à la place

## Instructions

### Guide de sélection du modèle
| Modèle | Utiliser quand | Éviter quand |
|--------|----------|------------|
| `claude-haiku-4-5-20251001` | Classification, extraction, routage, Q&A simple, haut volume à bas coût | Raisonnement complexe, génération de code multi-étapes |
| `claude-sonnet-4-6` | Usage général : code, analyse, rédaction, workflows agentic | Budgets très limités à grande échelle |
| `claude-opus-4-7` | Raisonnement expert, jugement nuancé, long-form complexe | La plupart des tâches — généralement Sonnet suffit |

### Appel de message basique (Python)
```python
import anthropic

client = anthropic.Anthropic()  # lit ANTHROPIC_API_KEY depuis env

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a helpful assistant specialized in Python.",
    messages=[
        {"role": "user", "content": "Explain Python's GIL in 3 sentences."}
    ]
)
print(message.content[0].text)
```

### Prompt caching (critique pour les coûts)
La mise en cache des prompts peut réduire les coûts jusqu'à 90% pour le contexte répété. Mettez en cache le contenu stable (prompts système, grands documents, exemples few-shot).

```python
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "You are a code review assistant. Here are our coding standards: ...",
            "cache_control": {"type": "ephemeral"}  # Mettre en cache ce bloc
        }
    ],
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": large_document,
                    "cache_control": {"type": "ephemeral"}  # Mettre aussi le document en cache
                },
                {
                    "type": "text",
                    "text": "Summarize the key points."
                }
            ]
        }
    ]
)
# Vérifier l'utilisation du cache dans la réponse
print(message.usage.cache_read_input_tokens)   # tokens lus depuis le cache
print(message.usage.cache_creation_input_tokens)  # tokens écrits dans le cache
```

Règles de cache :
- Bloc minimal cacheable : 1024 tokens (Sonnet/Opus), 2048 tokens (Haiku)
- Cache TTL : 5 minutes
- Seul le dernier bloc `cache_control` dans un tableau de messages compte — les points de cache sont cumulatifs

### Streaming
```python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": prompt}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# Ou avec des événements :
with client.messages.stream(...) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            print(event.delta.text, end="")
        elif event.type == "message_stop":
            print()  # nouvelle ligne quand terminé
```

### Tool use
```python
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["city"]
        }
    }
]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Paris?"}]
)

# Vérifier si Claude veut utiliser un outil
if response.stop_reason == "tool_use":
    tool_use = next(b for b in response.content if b.type == "tool_use")
    tool_result = call_tool(tool_use.name, tool_use.input)

    # Continuer la conversation avec le résultat de l'outil
    follow_up = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "What's the weather in Paris?"},
            {"role": "assistant", "content": response.content},
            {
                "role": "user",
                "content": [{
                    "type": "tool_result",
                    "tool_use_id": tool_use.id,
                    "content": json.dumps(tool_result)
                }]
            }
        ]
    )
```

### Conversation multi-tours
```python
class Conversation:
    def __init__(self, system: str, model: str = "claude-sonnet-4-6"):
        self.client = anthropic.Anthropic()
        self.model = model
        self.system = system
        self.messages: list[dict] = []

    def chat(self, user_message: str, max_tokens: int = 1024) -> str:
        self.messages.append({"role": "user", "content": user_message})
        response = self.client.messages.create(
            model=self.model,
            max_tokens=max_tokens,
            system=self.system,
            messages=self.messages,
        )
        assistant_message = response.content[0].text
        self.messages.append({"role": "assistant", "content": assistant_message})
        return assistant_message
```

### Traitement par lots
```python
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

requests = [
    Request(
        custom_id=f"review-{i}",
        params=MessageCreateParamsNonStreaming(
            model="claude-haiku-4-5-20251001",
            max_tokens=256,
            messages=[{"role": "user", "content": f"Classify: {review}"}],
        )
    )
    for i, review in enumerate(reviews)
]

batch = client.messages.batches.create(requests=requests)
print(f"Batch ID: {batch.id}")

# Interroger pour les résultats (ou utiliser des webhooks)
import time
while True:
    batch = client.messages.batches.retrieve(batch.id)
    if batch.processing_status == "ended":
        break
    time.sleep(60)

for result in client.messages.batches.results(batch.id):
    print(result.custom_id, result.result.message.content[0].text)
```

### Gestion des erreurs et réessais
```python
from anthropic import APIStatusError, APITimeoutError, RateLimitError

def call_with_retry(client, **kwargs, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except RateLimitError:
            wait = 2 ** attempt
            time.sleep(wait)
        except APITimeoutError:
            if attempt == max_retries - 1:
                raise
            time.sleep(1)
        except APIStatusError as e:
            if e.status_code >= 500 and attempt < max_retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise
```

### Liste de contrôle d'optimisation des coûts
- Utiliser Haiku pour la classification, le routage et les tâches d'extraction simples
- Activer le prompt caching pour tout system prompt > 1024 tokens
- Utiliser l'API batch pour les workloads offline/async — réduction des coûts de 50%
- Définir `max_tokens` au minimum nécessaire — vous payez pour les tokens de sortie générés
- Mettre en cache les grands documents dans le message utilisateur, pas seulement dans le system prompt
- Surveiller le ratio `cache_read_input_tokens` vs `input_tokens` — viser >80% pour les contextes stables

## Exemple

**Utilisateur :** Construire une classe Python qui classe des tickets de support client dans des catégories avec Claude, avec prompt caching pour la liste des catégories et streaming pour l'explication.

**Sortie attendue :**
- Classe `TicketClassifier` avec `ANTHROPIC_API_KEY` depuis l'env
- System prompt avec toutes les catégories en cache via `cache_control: ephemeral`
- `classify(ticket_text)` → retourne `{category: str, confidence: str}` parsé depuis la sortie structurée
- `classify_and_explain(ticket_text)` → streame l'explication vers stdout
- Utilise `claude-haiku-4-5-20251001` pour la classification (économique), `claude-sonnet-4-6` pour l'explication

---
