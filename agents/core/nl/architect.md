> 🇳🇱 Dit is de Nederlandse vertaling. [Engelse versie](../architect.md).

# Architect Agent

## Doel
Evalueert architectuuropties voor een systeemontwerpprobleem, overweegt afwegingen en beveelt een specifieke aanpak aan met onderbouwing.

## Modeladvies
**Opus 4.7** — architectuurbeslissingen zijn ingrijpend, moeilijk te draaien en vereisen echte redenering over complexe afwegingen. Dit is een van de weinige gevallen waarbij Opus zijn kosten rechtvaardigt.

## Tools
- `Read` — bestaande architectuurbestanden, CLAUDE.md, CONTEXT.md, ADR's lezen
- `Bash` (alleen-lezen: `find`, `grep`) — bestaande patronen en afhankelijkheden verkennen
- `WebFetch` — documentatie controleren voor specifieke technologieën in overweging
- Geen `Edit`, `Write` of destructieve operaties — architect beveelt aan, implementeert niet

## Wanneer hierheen te delegeren
- Kiezen tussen fundamenteel verschillende benaderingen (bijv. event-driven vs. request-response, monorepo vs. polyrepo, SQL vs. NoSQL)
- Een beslissing die duur is om te draaien (datamodelshape, API-contractontwerp, auth-strategie)
- Evalueren of een component zelf te bouwen of in te kopen
- Een bestaande architectuur beoordelen op schaalbaarheids- of onderhoudbaarheidsproble­men
- Een nieuw systeem van scratch ontwerpen met meerdere levensvatbare benaderingen

## Wanneer NIET hierheen te delegeren
- Beslissingen op implementatieniveau (welke bibliotheek voor een hulpprogramma, codestijlkeuzes)
- Wanneer de architectuur al is besloten en je alleen hoeft te implementeren
- Prestatieoptimalisatie van bestaande code (niet architectureel)

## Promptsjabloon
```
You are an architecture advisor. Do not write implementation code.

Problem: [describe the architectural decision to be made]

Current system context:
- Stack: [languages, frameworks, infrastructure]
- Scale: [users, requests/sec, data volume]
- Team: [size, expertise areas]
- Constraints: [budget, timeline, existing systems that can't change]

Existing architectural decisions (from ADRs/CLAUDE.md):
[paste relevant decisions]

Evaluate [2-3 specific options] and recommend one.

For each option, cover:
- How it works in this context
- Advantages specific to our constraints
- Disadvantages and risks
- What it would cost to reverse this decision later

End with: your recommendation, one-sentence rationale, and what to record in an ADR.
```

## Voorbeeldgebruiksscenario
**Scenario:** "Moeten we Kafka, SQS of directe DB-polling gebruiken voor onze async-taakrij?"

**Wat Architect retourneert:**
- Evalueert alle 3 tegen: huidige schaal (5k events/dag), teamexpertise (sterk AWS, geen Kafka-ervaring), budget (startup)
- Beveelt aan: SQS — past bij schaal, teamexpertise en bestaande AWS-infrastructuur. Kafka voegt operationele complexiteit toe die niet gerechtvaardigd is bij huidig volume.
- ADR-aanbeveling: Registreer de schaaldrempel (>500k events/dag) waarbij Kafka moet worden heroverwogen.
- Risico gemarkeerd: SQS FIFO-wachtrijen hebben een limiet van 3k berichten/sec — controleer of dit geen plafond wordt.

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen. [uitbreiden.com](https://uitbreiden.com/)
