---
description: Audit een prompt of LLM-pipeline op tokenverspilling en pas gerichte reducties toe
argument-hint: "[promptbestand, chainbestand, of codeppad]"
---
Audit het prompt of pipeline bij $ARGUMENTS op tokeninefficiëntie en produceer een geoptimaliseerde versie.

Lees alle meegeleverde bestandspaden. Als het argument een directory is, scan dan naar `.py`, `.ts`, `.md` bestanden met promptstrings of LLM-oproepsites.

**Audit-dimensies — controleer elk:**

**1. Promptverbositeit**
- Vulwoorden die tokens toevoegen zonder constraints toe te voegen ("As an AI language model", "Of course!", "Certainly")
- Herhaalde instructies die in zowel systeem- als gebruikersbericht voorkomen
- Redundante voorbeelden die identieke gevallen dekken
- Proza-instructies die een opsommingslijst met halve tokens zouden kunnen zijn

**2. Contextvenster-misbruik**
- Volledig document doorgegeven wanneer alleen een gedeelte nodig is — vlag met geschatte besparing
- Chatgeschiedenis opgenomen in letterlijke vorm wanneer een samenvatting volstaat
- Dubbele inhoud: dezelfde tekst twee keer opgenomen onder verschillende sleutels

**3. Cachingmogelijkheden**
- Identificeer statische promptsegmenten (systeemprompt, statische context, few-shot-voorbeelden) die `cache_control: {"type": "ephemeral"}` op de Anthropic API moeten gebruiken
- Vlag als het cachegeschikt segment < 1024 tokens is (onder de minimale cachegrens — geen voordeel)
- Toon de geherstructureerde berichtarray met cacheblokken correct geplaatst

**4. Uitvoerlengte**
- Is `max_tokens` ingesteld? Zoniet, markeren als onbegrensd kostenrisico
- Vraagt de prompt om uitleg wanneer alleen gestructureerde gegevens nodig zijn?
- Zou een korter uitvoerformat (JSON versus proza, alleen code versus code+uitleg) de generatiekosten verminderen?

**5. Modeltierpassendheid**
- Gebruikt de taak `claude-sonnet-4-6` of `claude-opus-4-7` voor werk dat `claude-haiku-4-5-20251001` 10x goedkoper kan uitvoeren?
- Classificeer taakcomplexiteit: eenvoudige extractie/classificatie → Haiku; redenering/generatie → Sonnet; complexe multi-stap → Opus

**Uitvoerformat:**

```
## Token audit samenvatting
| Probleem | Locatie | Geschatte tokenimpact | Prioriteit |
|----------|---------|------------------------|------------|
| ...      | ...     | ...                    | H/M/L      |

## Geoptimaliseerde prompt / chain
<volledige herschreven versie met toegepaste wijzigingen>

## Cacheconfiguratie
<berichtarray-fragment met cache_control-plaatsing, indien van toepassing>

## Geschatte besparingen
Voor: ~N tokens/aanroep  →  Na: ~M tokens/aanroep  (~X% reductie)
Bij 1000 aanroepen/dag op [model]: $Y/maand besparing
```

Pas alle hoogprioriteitsoplossingen rechtstreeks toe in de uitvoer. Verklaar medium/lage prioriteitspunten maar pas deze niet toe zonder te vragen.
