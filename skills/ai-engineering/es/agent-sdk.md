---
name: agent-sdk
updated: 2026-06-13
---

# Claude Agent SDK

## When to activate
Construir una aplicación en Python o TypeScript que utiliza las capacidades de Claude Code de forma programática; desplegar Claude como un agente autónomo dentro de un producto; escribir código que impulse la CLI `claude` en modo no interactivo; crear scripts con flujos de trabajo de agentes que necesitan que las llamadas a herramientas, reintentos y gestión de contexto se manejen automáticamente.

## When NOT to use
Usar Claude Code de forma interactiva en la terminal — esa es la experiencia predeterminada, no un caso de uso de SDK; crear un chatbot simple o una interfaz de pregunta y respuesta de una sola vuelta (usa la API de Messages directamente); cuando Anthropic Managed Agents es una mejor opción (infraestructura alojada, escalado automático, persistencia de memoria integrada).

## Instructions

**Lo que es el Agent SDK:**
El mismo bucle de herramientas, gestión de contexto y capacidades de agentes que Claude Code interactivo, empaquetado como una biblioteca que integras en tu propia aplicación. Tú controlas la infraestructura; Anthropic proporciona el modelo y el bucle de agentes.

**SDK vs alternativas — elige la capa correcta:**

| Necesidad | Usar |
|---|---|
| Integrar Claude agéntico en tu aplicación, controlar la infraestructura | Agent SDK |
| Claude agéntico alojado por Anthropic, operaciones sin complicaciones | Managed Agents |
| Respuestas de una sola vuelta, no se necesita bucle de herramientas | Messages API |
| Flujo de trabajo interactivo en terminal | Claude Code CLI |

**Instalación:**

Python:
```bash
pip install claude-code-sdk
```

TypeScript:
```bash
npm install @anthropic-ai/claude-code
```

**Flag `--bare` mediante opciones:** Omite la carga de `CLAUDE.md` y el descubrimiento de servidores MCP. Usa esto en contextos de CI y scripting donde la velocidad de inicio es importante — aproximadamente 10× más rápida la inicialización.

**Facturación (15 de junio de 2026+):** Las sesiones del Agent SDK se extraen de un grupo de créditos dedicados a Agent SDK, separado de los límites de sesiones interactivas.

**Herramientas en proceso:** Las herramientas se ejecutan en proceso en lugar de generar subprocesos. Usa esto para llamadas de alta frecuencia donde la sobrecarga de subprocesos se suma.

**Soporte de proveedores de nube:** AWS Bedrock, Google Vertex AI y Microsoft Azure AI Foundry son todos compatibles. Configura mediante variables de entorno — no se requieren cambios de código en SDK.

**Ejemplo de Python:**
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

**Ejemplo de TypeScript:**
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

**Agent SDK vs Managed Agents — guía de decisión:**
- Agent SDK: control total de infraestructura, se ejecuta en tu CI/CD, cargas de trabajo sensibles a latencia, logging y observabilidad personalizados
- Managed Agents: Anthropic maneja fallos, escalado y persistencia de memoria; sin infraestructura que gestionar; mejor para equipos no técnicos que despliegan agentes como una característica de producto

## Example

Un pipeline de revisión de código en CI: en cada evento de apertura de PR, un trabajo de GitHub Actions llama al Agent SDK con el diff del PR como el prompt. El agente revisa el diff, llama a herramientas internas para verificar la base de datos de cobertura de pruebas, y publica un comentario de revisión estructurado en el PR a través de la API de GitHub. El flag `--bare` mantiene el tiempo de inicio en frío por debajo de 2 segundos.

---
