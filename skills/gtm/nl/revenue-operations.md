---
name: revenue-operations
description: "Revenue operations: pipeline analyse, forecast nauwkeurigheid, GTM metreken (CAC, LTV, NRR), sales process ontwerp, territoire planning en RevOps dashboard design"
---

# Revenue Operations Skill

## Wanneer activeren
- Bouwen van RevOps metreken raamwerk (CAC, LTV, NRR, pipeline dekking)
- Diagnose waarom de sales forecast onnauwkeurig is
- Ontwerpen van verkoopproces en stagedefinities
- Analyseren van pipeline gezondheid en identificeren van conversie knelpunten
- Opzetten of controleren van CRM gegevensmodel
- Bouwen van GTM metreken dashboard voor leiderschap

## Wanneer NIET gebruiken
- Individuele deal strategie — dat is sales, niet RevOps
- Marketing campagne uitvoering — gebruik email-automation of paid-ads skills
- Customer success playbooks — gebruik de customer-success skill
- Product prijs besluiten — gebruik de pricing-strategy skill

## Instructies

### GTM metreken raamwerk

```
Bouw een GTM metreken raamwerk voor [bedrijf].

Bedrijfstype: [B2B SaaS / marktplaats / services]
Sales beweging: [PLG / binnenverkoop / veldverkoop / partner-geleid]
Stadium: [pre-inkomsten / $0-1M ARR / $1-10M ARR / $10M+ ARR]
GTM team: [oprichters verkopen / SDR + AE / volledig GTM team]

Kern GTM metreken per trechter stadium:

ACQUISITIE:
- Gegenereerde MQL's: [marketing gekwalificeerde leads per maand]
- MQL→SQL conversie rate: [%] (benchmark: 10-25% afhankelijk van ICP scherpte)
- CAC (Klant Acquisitie Kosten): [totale sales + marketing spending / nieuwe klanten]
- CAC per kanaal: [betaald / organisch / partner / outbound]
- Tijd tot eerste contact: [uren van MQL tot SDR outreach]

CONVERSIE:
- SQL→Opportunity conversie: [%]
- Opportunity→Close-Won rate: [%] (benchmark: 15-25% binnenverkoop, 10-20% enterprise)
- Gemiddelde deal grootte: [ACV]
- Sales cyclus lengte: [dagen van opportunity creatie tot sluiting]
- Win rate per segment: [SMB / mid-market / enterprise]

RETENTIE EN EXPANSIE:
- NRR (Netto Revenue Retention): [%] (benchmark: >100% gezond, >120% uitstekend)
- GRR (Bruto Revenue Retention): [%]
- Expansie ARR: [nieuwe ARR van bestaande klanten per maand]
- Churn rate: [%] maandelijks of jaarlijks
- Logo churn vs. revenue churn: [verschillende verhalen]

EFFICIËNTIE:
- LTV:CAC ratio: [doel >3x, >5x is sterk]
- CAC terugbetaaltermijn: [maanden om acquisitiekosten terug te krijgen]
- Magic number: [ARR toegevoegd / sales + marketing spending]
- Sales efficiëntie: [nieuwe ARR / quota-dragende headcount]

Bouw het metreken raamwerk met huiden benchmarks voor mijn bedrijfstype en stadium.
```

### Forecast nauwkeurigheid

```
Diagnose en repareer sales forecast nauwkeurigheid voor [team].

Huiden forecast nauwkeurigheid: [X% nauwkeurig binnen [Y]% variantie]
Forecast methode: [bottoms-up van reps / top-down van manager / AI-ondersteund]
CRM: [Salesforce / HubSpot / Pipedrive / ander]
Sales cyclus: [X dagen gemiddeld]

Forecast nauwkeurigheid oorzaken:

STADIUM DEFINITIE PROBLEMEN (meest voorkomend):
- Stadiums zijn niet gebaseerd op koperacties, alleen op verkoopersacties
  Oplossing: herdefinieer stadiums als koper mijlpalen
- Ontbrekende uitgangscriteria — reps kunnen deals vooruitgang zonder bewijs
  Oplossing: voeg vereiste velden per stadium toe

REP OPTIMISME BIAS:
- Reps inflaten deal waarschijnlijkheid om manager controle te vermijden
  Oplossing: gebruik objectieve criteria om waarschijnlijkheid in te stellen
  Goed signaal: tijd in stadium vs. gemiddelde tijd in stadium
  Beter signaal: koper engagement score

ENKELE GETHREADE DEALS:
- Slechts één contact in de deal
  Oplossing: markeer enkele threads; meervoudig threading vereist als stadium uitgang

PIPELINE INSPECTIE HYGIËNE:
□ CRM data volledigheid: sluitingsdatum, bedrag, stadium, besluitvormer vereist op elke deal > $X
□ Wekelijkse pipeline review: deals die >14 dagen niet hebben bewogen
□ Deal stadium audit: deals in late stadiums zonder activiteit in 7 dagen
□ Oudste deals: >2x gemiddelde sales cyclus moet worden voortgestuwd of verloren

FORECAST CATEGORIEËN (Salesforce model):
- Beste zaak: deals waar rep hard aan werkt maar niet volledig toegezegd
- Commit: rep gelooft zal deze periode sluiten
- Gesloten: al gesloten
- Pipeline: te vroeg of onzeker voor deze periode

Benchmark: Commit categorie moet >80% sluiten.

Bouw het forecast nauwkeurigheid verbeteringsplan voor mijn team en CRM.
```

### Pipeline analyse

```
Analyseer pipeline gezondheid voor [periode].

Periode: [huiden kwartaal / volgende kwartaal]
Totale pipeline: $[X]
Quota: $[X]
Pipeline dekking ratio: [pipeline / quota]

Pipeline gezondheid raamwerk:

DEKKINGS RATIO BENCHMARKS:
- Binnenverkoop (30-60 dag cyclus): 3-4x quota in pipeline
- Enterprise (90-180 dag cyclus): 4-6x quota in pipeline
- PLG (kortere cyclus): 2-3x kan voldoende zijn

Je pipeline dekking: $[X pipeline] / $[X quota] = [Xx]
Interpretatie: [voldoende / ondergedekt / overgedekt]

PIPELINE KWALITEITS ANALYSE:

Stadium verdeling (gezonde pipeline heeft deals op elk stadium):
| Stadium | Deal aantal | Totale waarde | % van pipeline |
|---|---|---|---|

RODE VLAGGEN IN VERDELING:
- Te veel pipeline in vroege stadiums: huiden kwartaal forecast is gevaar
- Te veel pipeline in late stadiums: toekomstige kwartalen zijn dun
- Enkele grote deal >30% van pipeline: binaire uitkomstrisco

LEEFTIJD ANALYSE:
Deals ouder dan 1,5x gemiddelde sales cyclus in hun stadium = stilgestaan

AANBEVOLEN ACTIES:
□ Stilgestane deals: rep controleren en ofwel vooruit duwen ofwel op Closed-Lost zetten
□ Dekking lacune: [X] nieuwe opportunities in volgende 30 dagen genereren
□ Enkele gethreade deals: meervoudig thread of risico expliciet accepteren
□ Grote deal concentratie: kleinere deals versnellen

Genereer het pipeline gezondheidsrapport voor de pipeline gegevens van mijn team.
```

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
