---
name: claude-api
description: "API de Anthropic Claude: almacenamiento en caché de prompts, streaming, uso de herramientas, procesamiento por lotes, selección de modelo, optimización de costos"
updated: 2026-06-13
---

# Habilidad Claude API

## Cuándo activar
- Escribir código que llame a la API de Claude de Anthropic (SDK de Python o TypeScript)
- Implementar almacenamiento en caché de prompts, streaming o procesamiento por lotes
- Diseñar gestión de conversaciones multi-turno
- Seleccionar el modelo Claude correcto (Haiku, Sonnet, Opus) para una tarea
- Agregar uso de herramientas / llamadas de función a una integración de Claude
- Optimizar por costo o latencia en una aplicación Claude de producción

## Cuándo NO usar
- APIs de OpenAI u otros proveedores — SDK diferente, patrones diferentes
- Consejos genéricos de LLM no relacionados con la API de Anthropic
- Proyectos que ya utilizan abstracciones de LangChain o LlamaIndex — abordar la capa de abstracción en su lugar

## Instrucciones

### Guía de selección de modelo
| Modelo | Usar cuando | Evitar cuando |
|-------|----------|------------|
| `claude-haiku-4-5-20251001` | Clasificación, extracción, enrutamiento, preguntas simples, volumen alto bajo costo | Razonamiento complejo, generación de código multi-paso |
| `claude-sonnet-4-6` | Propósito general: código, análisis, escritura, flujos de trabajo agénticos | Presupuestos restringidos por tokens a escala masiva |
| `claude-opus-4-7` | Razonamiento de nivel experto, juicio matizado, documento largo complejo | La mayoría de tareas — generalmente Sonnet es suficiente |

### Llamada de mensaje básica (Python)
```python
import anthropic

client = anthropic.Anthropic()  # lee ANTHROPIC_API_KEY del entorno

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Eres un asistente útil especializado en Python.",
    messages=[
        {"role": "user", "content": "Explica el GIL de Python en 3 oraciones."}
    ]
)
print(message.content[0].text)
```

### Almacenamiento en caché de prompts (crítico para costos)
El almacenamiento en caché de prompts puede reducir costos hasta en un 90% para contextos repetidos. Almacena en caché contenido estable (prompts de sistema, documentos grandes, ejemplos few-shot).

```python
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "Eres un asistente de revisión de código. Aquí están nuestros estándares de codificación: ...",
            "cache_control": {"type": "ephemeral"}  # Almacena este bloque en caché
        }
    ],
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": large_document,
                    "cache_control": {"type": "ephemeral"}  # También almacena el documento en caché
                },
                {
                    "type": "text",
                    "text": "Resume los puntos clave."
                }
            ]
        }
    ]
)
# Verifica el uso de caché en la respuesta
print(message.usage.cache_read_input_tokens)   # tokens leídos del caché
print(message.usage.cache_creation_input_tokens)  # tokens escritos en caché
```

Reglas de caché:
- Bloque almacenable en caché mínimo: 1024 tokens (Sonnet/Opus), 2048 tokens (Haiku)
- TTL de caché: 5 minutos
- Solo el último bloque `cache_control` en una matriz de mensajes importa — los puntos de caché son acumulativos

### Streaming
```python
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": prompt}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# O con eventos:
with client.messages.stream(...) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            print(event.delta.text, end="")
        elif event.type == "message_stop":
            print()  # nueva línea cuando termina
```

### Uso de herramientas
```python
tools = [
    {
        "name": "get_weather",
        "description": "Obtener el clima actual para una ciudad",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "Nombre de la ciudad"},
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
    messages=[{"role": "user", "content": "¿Cuál es el clima en París?"}]
)

# Verifica si Claude quiere usar una herramienta
if response.stop_reason == "tool_use":
    tool_use = next(b for b in response.content if b.type == "tool_use")
    tool_result = call_tool(tool_use.name, tool_use.input)

    # Continúa la conversación con el resultado de la herramienta
    follow_up = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "¿Cuál es el clima en París?"},
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

### Conversación multi-turno
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

### Procesamiento por lotes
```python
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

requests = [
    Request(
        custom_id=f"review-{i}",
        params=MessageCreateParamsNonStreaming(
            model="claude-haiku-4-5-20251001",
            max_tokens=256,
            messages=[{"role": "user", "content": f"Clasificar: {review}"}],
        )
    )
    for i, review in enumerate(reviews)
]

batch = client.messages.batches.create(requests=requests)
print(f"ID de lote: {batch.id}")

# Sondea resultados (o usa webhooks)
import time
while True:
    batch = client.messages.batches.retrieve(batch.id)
    if batch.processing_status == "ended":
        break
    time.sleep(60)

for result in client.messages.batches.results(batch.id):
    print(result.custom_id, result.result.message.content[0].text)
```

### Manejo de errores y reintentos
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

### Lista de verificación de optimización de costos
- Usa Haiku para tareas de clasificación, enrutamiento y extracción simple
- Habilita almacenamiento en caché de prompts para cualquier prompt de sistema > 1024 tokens
- Usa API de lotes para cargas de trabajo sin conexión/asincrónicas — reducción de costos del 50%
- Establece `max_tokens` al mínimo necesario — pagas por tokens de salida generados
- Almacena documentos grandes en caché en el mensaje del usuario, no solo en el prompt del sistema
- Monitorea la relación `cache_read_input_tokens` vs `input_tokens` — objetivo >80% para contextos estables

## Ejemplo

**Usuario:** Construir una clase de Python que clasifique tickets de atención al cliente en categorías usando Claude, con almacenamiento en caché de prompts para la lista de categorías y streaming para la explicación.

**Salida esperada:**
- Clase `TicketClassifier` con `ANTHROPIC_API_KEY` del entorno
- Prompt de sistema con todas las categorías almacenadas en caché vía `cache_control: ephemeral`
- `classify(ticket_text)` → devuelve `{category: str, confidence: str}` analizado desde salida estructurada
- `classify_and_explain(ticket_text)` → transmite la explicación a stdout
- Usa `claude-haiku-4-5-20251001` para clasificación (eficiente en costo), `claude-sonnet-4-6` para explicación

---
