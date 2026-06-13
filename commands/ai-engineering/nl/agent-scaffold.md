---
description: Steiger een multi-stap Claude-agent met tool use, geheugen en een gedefinieerde stoppingsvoorwaarde
argument-hint: "[agent doel of taakbeschrijving]"
---
Steiger een productie Claude-agent die realiseert: $ARGUMENTS

**Stap 1 — Agent-ontwerpspecificatie**

Voordat je code schrijft, definieer je:

- **Doel** — de eindtoestand waarin succes wordt bereikt (geen proces, maar een staat)
- **Invoer** — wat de agent ontvangt bij lancering (strings, bestandspaden, gestructureerde gegevens)
- **Uitvoer** — wat het produceert wanneer klaar (bestanden geschreven, API-oproepen gedaan, gestructureerd resultaat geretourneerd)
- **Benodigde tools** — noem alle tools op: naam, doel, invoerschema, retourformaat
- **Geheugenmodel** — kies één:
  - Stateless (alleen contextvenster, geschikt voor <20 tool-oproepen)
  - Summary memory (comprimeer geschiedenis met Haiku na elke N stappen)
  - Extern geheugen (schrijf belangrijke feiten naar een scratchpad-bestand of sleutel-waarde-winkel)
- **Stoppingsvoorwaarden** — wat triggert de agent om uiteindelijke uitvoer terug te geven versus verder looping:
  - Succes: doeltoestand bereikt
  - Misluking: foutentelling overschreden, tegenstrijdige staat gedetecteerd
  - Plafond: max_iterations bereikt (altijd includeren)

**Stap 2 — De agent genereren**

Schrijf `agent.py` met de Anthropic Python SDK. Vereisten:

- Model: `claude-sonnet-4-6` (configureerbaar via `AGENT_MODEL` omgevingsvariabele)
- Implementeer de agentische lus:
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
- Definieer elke tool als een dict met `name`, `description`, `input_schema` (JSON Schema)
- Tool dispatch: een `dispatch(tool_name, tool_input)` functie die naar Python-callables stuurt
- Gebruik `cache_control: {"type": "ephemeral"}` op het systeem-prompt bericht
- Gestructureerde einduitvoer: agent retourneert een getypeerde dataclass, geen ruwe tekst
- Log elke iteratie: tool aangeroepen, invoersamenvatting, resultatensamenvatting (niet volledige inhoud)

**Stap 3 — Foutafhandeling**

- Wrap elke tool-oproep in try/except; retourneer `{"error": str(e)}` als tool-resultaat — nooit opheffen in de lus
- Op `max_iterations` overschreden: retourneer gedeeltelijke resultaten met een `status: "incomplete"` vlag
- Op API-fouten (`anthropic.APIStatusError`): probeer opnieuw tot 3 keer met exponentiële backoff

**Stap 4 — CLI-ingangspunt**

Blootstellen via `argparse`:
- `--goal` (of positioneel): overschrijf het hardcoded doel
- `--max-iterations`: standaard 25
- `--dry-run`: druk het plan af (systeemprompt + tools) zonder uit te voeren

**Uitvoer:** `agent.py` met alle tools geïmplementeerd, geen stubs. Voeg een gebruiksvoorbeeld toe in een opmerking blok aan de bovenkant van het bestand.
