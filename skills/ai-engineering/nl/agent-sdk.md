---
name: agent-sdk
updated: 2026-06-13
---

# Claude Agent SDK

## When to activate
Een Python- of TypeScript-applicatie bouwen die Claude Code-mogelijkheden programmatisch gebruikt; Claude als autonoom agent in een product inzetten; code schrijven die de `claude` CLI in niet-interactieve modus aanstuurt; agentic workflows scriptograferen die automatisch tool calls, retries en contextbeheer afhandelen.

## When NOT to use
Claude Code interactief gebruiken in de terminal — dat is de standaard ervaring, geen SDK use case; een eenvoudige chatbot of single-turn Q&A-interface bouwen (gebruik direct de Messages API); wanneer Anthropic Managed Agents een beter alternatief is (gehoste infrastructuur, automatisch schalen, ingebouwde persistentie van geheugen).

## Instructions

**Wat de Agent SDK is:**
Dezelfde tool loop, contextbeheer en agentmogelijkheden als interactieve Claude Code — verpakt als bibliotheek die je in je eigen applicatie insluit. Jij beheert de infrastructuur; Anthropic levert het model en agent loop.

**SDK versus alternatieven — kies de juiste laag:**

| Behoefte | Gebruiken |
|---|---|
| Agentic Claude in je app insluiten, eigen infrastructuur | Agent SDK |
| Agentic Claude gehost door Anthropic, geen opslaglast | Managed Agents |
| Single-turn responses, geen tool loop nodig | Messages API |
| Interactieve terminalworkflow | Claude Code CLI |

**Installatie:**

Python:
```bash
pip install claude-code-sdk
```

TypeScript:
```bash
npm install @anthropic-ai/claude-code
```

**`--bare` vlag via opties:** Slaat `CLAUDE.md`-laden en MCP-serverdetectie over. Gebruik dit in CI- en scriptingcontexten waar opstartsnelheid belangrijk is — ongeveer 10× sneller initialiseren.

**Facturering (15 juni 2026+):** Agent SDK-sessies gebruiken een aparte Agent SDK-creditpool, gescheiden van limieten voor interactieve sessies.

**In-process tools:** Tools worden in-process uitgevoerd in plaats van subprocessen op te spawnen. Gebruik dit voor high-frequency calls waar subprocess-overhead oploopt.

**Cloud provider-ondersteuning:** AWS Bedrock, Google Vertex AI en Microsoft Azure AI Foundry worden allemaal ondersteund. Configureer via omgevingsvariabelen — geen SDK-codewijzigingen nodig.

**Python-voorbeeld:**
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

**TypeScript-voorbeeld:**
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

**Agent SDK versus Managed Agents — beslissingsrichtlijn:**
- Agent SDK: volledige controle over infrastructuur, draait in je CI/CD, latency-gevoelige workloads, aangepaste logging en observeerbaarheid
- Managed Agents: Anthropic beheerst crashes, schaling en geheugenpersistentie; geen infrastructuur om te beheren; beter voor niet-technische teams die agents als productfunctie inzetten

## Example

Een codebeoordeling-pipeline in CI: bij elke PR open-event roept een GitHub Actions-job de Agent SDK aan met het PR-diff als prompt. De agent beoordeelt het diff, roept interne tools aan om de testdekkingsdatabase te controleren en plaatst een gestructureerde beoordelingsopmerking terug in de PR via de GitHub API. De `--bare` vlag houdt de cold-start-tijd onder 2 seconden.

---
