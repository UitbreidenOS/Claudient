---
description: Genereer een testarnas om een LLM-prompt of keten tegen een dataset te evalueren
argument-hint: "[promptbestand of beschrijving van de taak die wordt geëvalueerd]"
---
Je bouwt een LLM-evaluatieharnas voor de taak die is beschreven in $ARGUMENTS.

Lees eventuele gegeven bestandspaden. Als een losse beschrijving is gegeven, stel de taak in.

**Stap 1 — Identificeer evaluatievereisten**

Bepaal:
- Taaktype: classificatie, extractie, generatie, RAG, toolgebruik, multi-turn, of ander
- Hoe "correct" eruitziet: exacte match, semantische match, rubricascore, validatie van gestructureerd schema, of menselijk tussenkomst
- Failuremodes die het waard zijn om op te vangen: hallucinatie, weigering, formatschending, latentie, tokenoverschrijding

**Stap 2 — Ontwerp het testdatasetschema**

Voer een JSONL-schema voor testgevallen uit. Elk record moet bevatten:
- `id`: unieke tekenreeks
- `input`: het gebruikersbericht of volledige promptcontext (neem systeemprompt op indien relevant)
- `expected`: waarheid of rubrica (pas vorm aan aan taaktype)
- `tags`: array van tekenreeksen voor filtering (bijv. `["edge-case", "language:fr"]`)

Toon 3–5 representatieve voorbeeldrecords die het volgende dekken: happy path, randgeval, adversarial input.

**Stap 3 — Genereer het harnesscript**

Schrijf een zelfstandig Python-script met behulp van de Anthropic SDK (`anthropic`-pakket). Vereisten:
- Testgevallen laden uit `evals.jsonl`
- Roep het model aan voor elk geval (standaard: `claude-sonnet-4-6`, overschrijfbaar via `--model`)
- Score elk resultaat met behulp van de juiste evaluator:
  - Exacte/regex-match voor gestructureerde outputs
  - Cosinus-gelijkenis inbedding voor semantische taken (gebruik `sentence-transformers` indien beschikbaar, anders overslaan)
  - LLM-as-judge rubricascore voor open-ended generatie (zelfstandig, gebruik `claude-haiku-4-5-20251001`)
- Voer een resultaten-JSONL en een samenvattingstabel uit naar stdout
- Ondersteun `--sample N`-vlag om op N willekeurige gevallen uit te voeren
- Gebruik `asyncio` + `AsyncAnthropic` voor parallelle uitvoering met een configureerbare gelijktijdigheidslimiet

**Stap 4 — CI-integratiecodefragment**

Toon een GitHub Actions-stap die:
- Het harnas op elke PR uitvoert
- De controle mislukt als de slagingssnelheid onder een configureerbare drempel daalt (standaard 90%)
- Plaatst een samenvattingscommentaar met uitsplitsingen per tag

**Uitvoerformaat:**
1. Datasetschema + voorbeeldrecords (JSONL)
2. Volledig Python-harnas (`eval_harness.py`)
3. GitHub Actions YAML-codefragment
4. Eénregels `README`-gebruiksblok

Geen placeholder-opmerkingen. Elke functie moet worden geïmplementeerd.
