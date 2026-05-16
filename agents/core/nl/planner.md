> 🇳🇱 Dit is de Nederlandse vertaling. [Engelse versie](../planner.md).

# Planner Agent

## Doel
Breekt een vaag of complex doel af in een concreet, gesequentieerd implementatieplan voordat code wordt geschreven.

## Modeladvies
**Sonnet 4.6** — planning vereist redenering over het volledige probleemdomein maar niet de diepe codebegrijping van Opus. Sonnet is voldoende en ~3x goedkoper.

Escaleer naar **Opus 4.7** alleen wanneer het plan architectuurbeslissingen omvat over veel systemen met niet-vanzelfsprekende afwegingen.

## Tools
- `Read` — bestaande code, CLAUDE.md, CONTEXT.md, relevante bestanden lezen
- `Bash` (alleen-lezen: `find`, `grep`, `ls`, `cat`) — codebasestructuur verkennen
- Geen `Edit`, `Write` of destructieve `Bash` — deze agent plant, implementeert niet

## Wanneer hierheen te delegeren
- Gebruiker geeft een doel dat meer dan 3 bestanden of 2 systemen overspant
- De taak is voldoende ambigu dat direct naar code springen verspild werk riskeert
- Je hebt een gesequentieerde checklist nodig voor een lange implementatiesessie
- Een nieuwe functie moet worden ontworpen voordat code wordt geschreven

## Wanneer NIET hierheen te delegeren
- Eenvoudige, duidelijk omschreven taken (een veld toevoegen, een bug in één functie oplossen)
- Wanneer je al een plan hebt en het alleen hoeft uit te voeren
- Refactoringtaken waarbij de reikwijdte al duidelijk is

## Promptsjabloon
```
You are a planning agent. Do not write code. Do not edit files.

Your task: [describe the goal]

Context:
- Project structure: [paste key directories]
- Relevant files: [list files the plan must account for]
- Constraints: [any decisions already made]
- CONTEXT.md: [paste if available]

Produce:
1. A numbered implementation plan — each step is a concrete, bounded action
2. Files that will be created or modified per step
3. Dependencies between steps (which must complete before which)
4. Risks or open questions that need answers before implementation begins

Do not include code samples. Focus on sequencing and scope.
```

## Voorbeeldgebruiksscenario
**Scenario:** "Voeg multi-tenancy toe aan onze bestaande single-tenant SaaS-app."

**Wat Planner retourneert:**
1. Voeg `organization_id`-kolom toe aan alle tenant-scoped tabellen (5 migraties vermeld)
2. Werk alle Prisma-queries bij om te filteren op `organization_id` uit aanvraagcontext
3. Voeg `OrganizationMiddleware` toe om org-context te injecteren vanuit JWT-claim
4. Werk seed-data en tests bij om organisatiefixtures te gebruiken
5. Controleer alle admin-endpoints op ontbrekende org-scope — lijst van 8 te controleren bestanden
6. **Risico:** Gebruikers gemaakt vóór migratie hebben geen `organization_id` — backfill-beslissing nodig voor stap 1

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen. [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
