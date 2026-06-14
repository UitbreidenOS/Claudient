---
name: agent-sdk
updated: 2026-06-13
---

# Claude Agent SDK

## Wann aktivieren
Eine Python- oder TypeScript-Anwendung erstellen, die Claude Code-Funktionen programmgesteuert nutzt; Claude als autonomen Agent in ein Produkt einsetzen; Code schreiben, der die `claude` CLI im nicht-interaktiven Modus nutzt; agentenbasierte Workflows mit automatischer Verarbeitung von Tool-Aufrufen, Wiederholungen und Kontextmanagement.

## Wann NICHT nutzen
Claude Code interaktiv im Terminal nutzen — das ist die Standard-Nutzung, keine SDK-Anwendung; einen einfachen Chatbot oder einseitigen Q&A-Interface bauen (nutze stattdessen die Messages API direkt); wenn Anthropic Managed Agents eine bessere Lösung darstellt (gehostete Infrastruktur, automatische Skalierung, eingebaute Persistenz des Gedächtnisses).

## Anleitung

**Was das Agent SDK ist:**
Die gleiche Tool-Schleife, das Kontextmanagement und die Agent-Funktionen wie interaktives Claude Code — verpackt als Bibliothek, die du in deine eigene Anwendung einbindest. Du kontrollierst die Infrastruktur; Anthropic stellt das Modell und die Agent-Schleife bereit.

**SDK vs. Alternativen — wähle die richtige Ebene:**

| Anforderung | Nutze |
|---|---|
| Agentenbasiertes Claude in deiner App einbinden, eigene Infrastruktur | Agent SDK |
| Agentenbasiertes Claude von Anthropic gehostet, ohne Ops-Aufwand | Managed Agents |
| Einseitige Responses, keine Tool-Schleife nötig | Messages API |
| Interaktiver Terminal-Workflow | Claude Code CLI |

**Installation:**

Python:
```bash
pip install claude-code-sdk
```

TypeScript:
```bash
npm install @anthropic-ai/claude-code
```

**`--bare` Flag über Optionen:** Überspringt das Laden von `CLAUDE.md` und die MCP-Server-Erkennung. Nutze dies in CI und Scripting-Kontexten, wo die Startgeschwindigkeit wichtig ist — ungefähr 10× schnellere Initialisierung.

**Abrechnung (ab 15. Juni 2026):** Agent SDK-Sitzungen werden aus einem dedizierten Agent SDK-Guthaben-Pool abgezogen, getrennt von den Limits für interaktive Sitzungen.

**In-Process-Tools:** Tools werden in-process ausgeführt, anstatt Subprozesse zu spawnen. Nutze dies für häufige Aufrufe, bei denen der Subprocess-Overhead sich summiert.

**Cloud-Provider-Unterstützung:** AWS Bedrock, Google Vertex AI und Microsoft Azure AI Foundry werden alle unterstützt. Konfiguriere über Umgebungsvariablen — keine SDK-Codeänderungen erforderlich.

**Python-Beispiel:**
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

**TypeScript-Beispiel:**
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

**Agent SDK vs. Managed Agents — Entscheidungsleitfaden:**
- Agent SDK: vollständige Infrastrukturkontrolle, läuft in deiner CI/CD, latenzempfindliche Workloads, benutzerdefiniertes Logging und Observability
- Managed Agents: Anthropic kümmert sich um Abstürze, Skalierung und Persistenz des Gedächtnisses; keine Infrastruktur zum Verwalten; besser für nicht-technische Teams, die Agents als Produktmerkmal einsetzen

## Beispiel

Eine Code-Review-Pipeline in CI: Bei jedem PR-Open-Event ruft ein GitHub Actions-Job das Agent SDK mit dem PR-Diff als Eingabe auf. Der Agent überprüft den Diff, ruft interne Tools auf, um die Test-Coverage-Datenbank zu prüfen, und gibt einen strukturierten Review-Kommentar über die GitHub API an den PR zurück. Das `--bare` Flag hält die Cold-Start-Zeit unter 2 Sekunden.

---
