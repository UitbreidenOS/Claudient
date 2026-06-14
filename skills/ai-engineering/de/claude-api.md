---
name: claude-api
description: "Anthropic Claude API: Prompt-Caching, Streaming, Tool-Nutzung, Batch-Verarbeitung, Modellauswahl, Kostenoptimierung"
updated: 2026-06-13
---

# Claude API Skill

## Wann aktivieren
- Code schreiben, der die Anthropic Claude API aufruft (Python oder TypeScript SDK)
- Prompt-Caching, Streaming oder Batch-Verarbeitung implementieren
- Multi-Turn-Konversationsverwaltung gestalten
- Das richtige Claude-Modell (Haiku, Sonnet, Opus) für eine Aufgabe auswählen
- Tool-Nutzung / Function Calling zu einer Claude-Integration hinzufügen
- Optimierung für Kosten oder Latenz in einer produktiven Claude-App

## Wann NICHT verwenden
- OpenAI oder andere Provider-APIs — anderes SDK, andere Muster
- Generischer LLM-Ratschlag ohne Bezug zur Anthropic API
- Projekte, die bereits LangChain oder LlamaIndex Abstraktionen verwenden — das Abstraktionssystem adressieren

## Anleitung

### Modellauswahlführer
| Modell | Verwenden wenn | Vermeiden wenn |
|--------|---|---|
| `claude-haiku-4-5-20251001` | Klassifikation, Extraktion, Routing, einfache Fragen & Antworten, hochvolumig kostengünstig | Komplexe Reasoning, mehrstufige Code-Generierung |
| `claude-sonnet-4-6` | Universell: Code, Analyse, Schreiben, agentengesteuerte Workflows | Token-limitierte Budgets in großem Maßstab |
| `claude-opus-4-7` | Experten-Level Reasoning, nuanciertes Urteilsvermögen, komplexe längere Texte | Die meisten Aufgaben — normalerweise ist Sonnet ausreichend |

### Basis-Nachricht-Aufruf (Python)
```python
import anthropic

client = anthropic.Anthropic()  # liest ANTHROPIC_API_KEY aus Umgebung

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Du bist ein hilfreicher Assistent spezialisiert auf Python.",
    messages=[
        {"role": "user", "content": "Erkläre Pythons GIL in 3 Sätzen."}
    ]
)
print(message.content[0].text)
```

### Prompt-Caching (kritisch für Kosten)
Prompt-Caching kann Kosten um bis zu 90% für wiederholte Kontexte reduzieren. Cache stabile Inhalte (System-Prompts, große Dokumente, Few-Shot-Beispiele).

```python
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "Du bist ein Code-Review-Assistent. Hier sind unsere Coding-Standards: ...",
            "cache_control": {"type": "ephemeral"}  # Cache diesen Block
        }
    ],
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": large_document,
                    "cache_control": {"type": "ephemeral"}  # Auch das Dokument cachen
                },
                {
                    "type": "text",
                    "text": "Fasse die Schlüsselpunkte zusammen."
                }
            ]
        }
    ]
)
# Cache-Nutzung in der Antwort überprüfen
print(message.usage.cache_read_input_tokens)   # Tokens aus Cache gelesen
print(message.usage.cache_creation_input_tokens)  # Tokens in Cache geschrieben
```

Cache-Regeln:
- Mindestens cachebarer Block: 1024 Tokens (Sonnet/Opus), 2048 Tokens (Haiku)
- Cache TTL: 5 Minuten
- Nur der letzte `cache_control`-Block in einem Message-Array zählt — Cache-Punkte sind kumulativ

### Streaming
```python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": prompt}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# Oder mit Events:
with client.messages.stream(...) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            print(event.delta.text, end="")
        elif event.type == "message_stop":
            print()  # Neue Zeile wenn fertig
```

### Tool-Nutzung
```python
tools = [
    {
        "name": "get_weather",
        "description": "Hole aktuelles Wetter für eine Stadt",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "Stadtname"},
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
    messages=[{"role": "user", "content": "Wie ist das Wetter in Paris?"}]
)

# Überprüfe, ob Claude ein Tool nutzen möchte
if response.stop_reason == "tool_use":
    tool_use = next(b for b in response.content if b.type == "tool_use")
    tool_result = call_tool(tool_use.name, tool_use.input)

    # Konversation mit Tool-Ergebnis fortsetzen
    follow_up = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "Wie ist das Wetter in Paris?"},
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

### Multi-Turn-Konversation
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

### Batch-Verarbeitung
```python
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

requests = [
    Request(
        custom_id=f"review-{i}",
        params=MessageCreateParamsNonStreaming(
            model="claude-haiku-4-5-20251001",
            max_tokens=256,
            messages=[{"role": "user", "content": f"Klassifiziere: {review}"}],
        )
    )
    for i, review in enumerate(reviews)
]

batch = client.messages.batches.create(requests=requests)
print(f"Batch-ID: {batch.id}")

# Warte auf Ergebnisse (oder nutze Webhooks)
import time
while True:
    batch = client.messages.batches.retrieve(batch.id)
    if batch.processing_status == "ended":
        break
    time.sleep(60)

for result in client.messages.batches.results(batch.id):
    print(result.custom_id, result.result.message.content[0].text)
```

### Fehlerbehandlung und Wiederholungen
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

### Kostenoptimierungs-Checkliste
- Nutze Haiku für Klassifikation, Routing und einfache Extraktionsaufgaben
- Aktiviere Prompt-Caching für jeden System-Prompt > 1024 Tokens
- Nutze Batch API für Offline-/Async-Workloads — 50% Kostenreduktion
- Stelle `max_tokens` auf das Minimum ein — du bezahlst für generierte Output-Tokens
- Cache große Dokumente in der User-Nachricht, nicht nur im System-Prompt
- Überwache `cache_read_input_tokens` vs `input_tokens` Verhältnis — Ziel >80% für stabile Kontexte

## Beispiel

**Benutzer:** Baue eine Python-Klasse, die Kundensupport-Tickets in Kategorien mit Claude klassifiziert, mit Prompt-Caching für die Kategorieliste und Streaming für die Erklärung.

**Erwartete Ausgabe:**
- `TicketClassifier` Klasse mit `ANTHROPIC_API_KEY` aus Umgebung
- System-Prompt mit allen Kategorien gecacht via `cache_control: ephemeral`
- `classify(ticket_text)` → gibt `{category: str, confidence: str}` aus strukturierter Ausgabe zurück
- `classify_and_explain(ticket_text)` → streamt die Erklärung zu stdout
- Nutzt `claude-haiku-4-5-20251001` für Klassifikation (kosteneffizient), `claude-sonnet-4-6` für Erklärung

---
