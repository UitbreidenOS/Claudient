---
name: rfp-responder
description: "RFP and security questionnaire response: analyse, score, and respond to enterprise RFPs, security questionnaires (SIG, CAIQ), and vendor assessments — efficiently and accurately"
---

# RFP Responder Vaardigheid

## Wanneer in te schakelen
- Reageren op een bedrijfsaanvraag (RFP) of inschrijvingsverzoek (ITT)
- Invullen van een beveiligingsvragenlijst (SIG Lite, SIG Core, CAIQ, aangepast)
- Reageren op een leveranciersevaluatie of due-diligence-vragenlijst
- Een herbruikbare bibliotheek opbouwen voor veelgestelde RFP-vragen
- Een binnenkomende RFP beoordelen om te bepalen of u moet bieden

## Wanneer niet te gebruiken
- Contractonderhandeling na het winnen van een RFP — gebruik de deal-desk vaardigheid
- Juridische nalevingscontrole van RFP-voorwaarden — gebruik de vendor-contract-review vaardigheid
- Marketing-positionering — gebruik de copywriting vaardigheid
- Eerste verkoopoproep of demonstratie — gebruik de sdr-agent vaardigheid

## Instructies

### RFP bieden/niet bieden scoring

```
Score this RFP to decide whether to bid.

RFP details:
- Issuer: [company name, size, industry]
- Estimated contract value: $[X]
- Submission deadline: [date] (time available: [X weeks])
- Contract length: [X months/years]
- Geographic restrictions: [jurisdiction or location requirements]
- Incumbent: [known / unknown / we are the incumbent]

Score on 5 criteria (1-5 each):

1. STRATEGIC FIT:
   - Is this customer in our ICP?
   - Would winning this deal advance our market position?
   - Is there a strong reference-customer opportunity?
   Score: [1-5]

2. WIN PROBABILITY:
   - Do we have an existing relationship or champion?
   - Is this a competitive replacement or greenfield?
   - Did we help shape the requirements (wired RFP)?
   Score: [1-5]

3. COMMERCIAL ATTRACTIVENESS:
   - Is the contract value worth the bid effort?
   - Are the payment terms acceptable?
   - Is the budget confirmed or exploratory?
   Score: [1-5]

4. DELIVERY FIT:
   - Can we fulfil the technical requirements as stated?
   - Are there onerous custom requirements?
   - Is the timeline achievable?
   Score: [1-5]

5. BID FEASIBILITY:
   - Do we have the capacity to respond by the deadline?
   - Who would own this response internally?
   - Do we have the collateral ready (case studies, security questionnaire, certifications)?
   Score: [1-5]

Total score = sum of 5 criteria (max 25)
- 20-25: BID — strong fit, invest fully
- 15-19: BID SELECTIVELY — bid only if champion exists or you have spare capacity
- 10-14: EVALUATE — consider a light bid or no-bid with relationship-building alternative
- < 10: NO BID — not worth the investment

Output: score + rationale + bid/no-bid recommendation.
HUMAN DECISION required — this is a recommendation, not an auto-decision.
```

### RFP-antwoordstructuur

```
Bouw een antwoord voor [RFP].

RFP-vereisten: [plak of beschrijf de sleutelgedeelten]
Evaluatiecriteria: [indien openbaargemaaki — gewichtingen of prioriteiten]
Inzendingsformaat: [document / portal / e-mail / persoonlijke presentatie]
Deadline: [datum]
Verschillen die we willen benadrukken: [3-5 opsommen]

RFP-antwoordstructuur (aanpassen aan het specifieke vereiste formaat):

LEIDINGGEVEND SAMENVATTING (1-2 pagina's):
- Probleemstelling: toon aan dat je begrijpt wat ze proberen op te lossen (niet alleen wat ze hebben gevraagd)
- Voorgestelde oplossing: hoe je het op hoog niveau oplost
- Waarom kiezen voor ons: 3 sleutelverschillen specifiek voor de aangegeven prioriteiten van deze klant
- Bewijs: één relevante casestudy met gekwantificeerd resultaat

BEDRIJFENOVERZICHT (1 pagina):
- Opgericht, hoofdkantoor, teamgrootte
- Opbrengsten of financiering (indien deelbaar)
- Klantenaantal en opvallende logo's in hun branche
- Certificaten (SOC 2, ISO 27001, AVG, enz.)

OPLOSSINGBESCHRIJVING (bulk van het antwoord):
- Wijs elk van hun vereisten toe aan een specifieke capaciteit
- Formaat: [Hun vereiste] → [Ons vermogen] → [Bewijs]
- Sla nooit een vereiste over: "niet van toepassing" is beter dan stilte
- Hun woordenschat gebruiken, niet de jouwe

IMPLEMENTATIE / ONBOARDING (indien van toepassing):
- Timeline: gefaseerde rollout met mijlpaaldatums
- Team: wie zal worden toegewezen, hun ervaring
- Training: wat je eindgebruikers en beheerders geeft
- Ondersteuning: SLA, kanalen, reactietijden

PRIJSSTELLING (volg hun formaat):
- Regelitem prijsstelling voor elke onderdeel die ze hebben gevraagd
- Indien aangepast: geef een bereik op of geef aan dat prijsstelling volgt op een ontdekkingsgesprek
- Totale eigendomskosten weergave als dit helpt (vermijd sticker schok)

REFERENTIES EN CASESTUDIES:
- 2-3 referenties in een vergelijkbare branche of use case
- Inclusief: bedrijfsnaam (indien toegestaan), uitdaging, oplossing, gekwantificeerd resultaat
- « Referenties beschikbaar op aanvraag » is zwak — geef specifieke informatie

BIJLAGEN (naar gelang vereist):
- Beveiligingsvragenlijst antwoorden
- Certificerings- en accreditatiedocumenten
- Standaard contract / MSA

Schrijf het antwoordframework voor mijn specifieke RFP.
```

### Beveiligingsvragenlijst antwoord

```
Maak deze beveiligingsvragenlijst af.

Vragenlijsttype: [SIG Lite / SIG Core / CAIQ / aangepast]
Uitgever: [bedrijfsnaam]
Deadline: [datum]
Onze certificaten: [SOC 2 Type II / ISO 27001 / HIPAA / PCI-DSS / geen]

Standaard antwoordprincipes:

1. Antwoord eerst van certificaten:
   - Voor SOC 2-controles: « Deze controle wordt behandeld in ons SOC 2 Type II-rapport (beschikbaar onder NDA). Controleverwijzing: CC6.1. »
   - Voor ISO 27001: « Dit wordt behandeld in onze ISMS onder controle A.9.2 (Beheersing van gebruikerstoegang). ISO 27001-certificaat beschikbaar op aanvraag. »
   - Beschrijf niet opnieuw wat het certificaat al bewijst — verwijs ernaar

2. Voor vragen die niet door certificering worden behandeld:
   - Antwoord specifiek en eerlijk
   - Inclusief bewijstype: « Gedocumenteerd in ons Access Control Policy (v2.1) »
   - Biedt aan om documentatie onder NDA te verstrekken als zij het beleid zelf nodig hebben

3. Voor gaten (waar je geen controle hebt):
   - « In uitvoering: we implementeren [X] als onderdeel van onze beveiligingsroutekaart Q[N]. Geraamde voltooiing: [datum]. »
   - OF bied een compenserende controle aan: « Hoewel we [X] niet hebben, verminderen we dit risico door [compenserende controle]. »
   - Laat nooit een gat leeg — dat ziet er ontwijkend uit; eerlijke gaten met beperkingen zijn beter

Veelgestelde vragen en aanbevolen antwoorden:

V: Hebt u SOC 2 Type II?
A (als ja): « Ja. Ons SOC 2 Type II-rapport (Beveiliging + Beschikbaarheid TSC) is beschikbaar onder NDA. Laatste auditperiode: [datums]. Auditor: [bedrijf]. »

V: Hoe gaat u met gegevensinbreuken om?
A: « We handhaven een gedocumenteerd incident response plan. Onder AVG stellen we toezichthoudende autoriteiten binnen 72 uur in kennis en betroffen klanten binnen [X] uur van bevestiging van een inbreuk. Onze laatste incidentreactietest was [datum]. »

V: Versleutelt u gegevens in rust en in transit?
A: « Alle gegevens in rust worden versleuteld met AES-256 (AWS KMS). Alle gegevens in transit gebruiken TLS 1.2+. Versleuteling wordt afgedwongen in alle productieomgevingen. »

V: Hoe vaak voert u penetratietests uit?
A: « Jaarlijkse penetratietests worden uitgevoerd door [derde partij bedrijf]. Laatste test: [datum]. Bevindingen worden hersteld volgens ons vulnerability management SLA (kritiek: 30 dagen, hoog: 60 dagen). »

V: Waar worden klantgegevens opgeslagen?
A: « Alle klantgegevens worden opgeslagen in [AWS us-east-1 / EU-West-1 / etc.]. We brengen geen gegevens buiten [rechtsmacht] over, behalve zoals vereist door [specifieke uitzondering — bijvoorbeeld ondersteuning tooling met geldige gegevensverwerkingsovereenkomsten]. »

Bouw de volledige vragenlijstantwoord voor mijn certificatieniveau en de specifieke gestelde vragen.
```

### Antwoordbibliotheek

```
Bouw een herbruikbare RFP-antwoordbibliotheek voor [bedrijf].

Bedrijf: [naam]
Producten: [beschrijf]
Certificaten: [opsommen]
Topklantsegmenten: [sectoren / bedrijfsgrootten]
Veelgestelde RFP-secties: [de categorieën opsommen die het meest voorkomen]

Bibliotheekstructuur:

BEDRIJFSBOILERPLATE (driemaandelijks bijwerken):
- Bedrijfoverzicht: [250 woorden, bijgewerkt met nieuwste personeelscount en ARR]
- Biografie van het leidingteam: [CEO, CTO, VP Sales — 3-4 zinnen elk]
- Investeringen en financiering: [Serie X, ondersteund door X — of « privé » indien niet openbaarmakable]
- Klantenverwijzingen: [5-7 verwijzingen vooraf goedgekeurd om te delen, met branche en resultaat]

MOGELIJKHEIDSBESCHRIJVINGEN (per productgebied):
[Product/functie]: [250-woord beschrijving klaar om in te plakken]

BEVEILIGING (standaardblok):
[Voorbereide antwoord voor elk van de 20 meest voorkomende beveiligingsvragen]
Bijwerken wanneer de certificatingstatus verandert.

CASESTUDIES (2-3 per verticaal):
[Branche]: [Bedrijfstype] + [Probleem] + [Oplossing] + [Resultaat met een getal]

CERTIFICATEN EN COMPLIANCE:
[SOC 2: datums, auditor, dekkingsveld]
[ISO 27001: certificaatnummer, vervaldatum, bereik]
[AVG: DPA-sjabloon beschikbaar, DPO-contact]
[HIPAA: BAA beschikbaar op aanvraag]

PRIJSSTELLING TAAL:
[Standaardantwoord: « Prijsstelling is aangepast op basis van volume en configuratie. Ons team zal een gedetailleerd voorstel binnen 3 werkdagen na ontvangst van uw vereisten verstrekken. »]
[Of: standaard prijstabel als uw prijsstelling is gepubliceerd]

Onderhoudscadence:
- Driemaandelijks: bedrijfsstatistieken bijwerken, klantenaantal, certificaten
- Na elke RFP: nieuw casestudy of goedgekeurde verwijzing toevoegen als een nieuw overwinnning
- Na elke beveiligingsvragenlijst: beveiligingsblok met nieuwe controles bijwerken

Genereer de antwoordbibliotheekstructuur voor mijn bedrijf.
```

## Voorbeeld

**Gebruiker:** We ontvingen een 200-vragen SIG Core van een financiële diensten onderneming. We hebben SOC 2 Type II maar geen ISO 27001. Deadline is 10 dagen. Hoe antwoorden we efficiënt?

**Claude's strategie:**

200 vragen in 10 dagen = niet elke vraag van nul afbeelden. Prioriteit eerst.

**Stap 1 — Categoriseer (Dag 1, 2 uur):**
Alle 200 vragen groeperen in:
- Gedekt door SOC 2: markeer met « SOC 2 ref: [controle] » — antwoord door rapport aan te halen
- Beleid gedocumenteerd: markeer met « Beleid: [naam] » — snelle specifieke antwoord
- Niet van toepassing: markeer als N/A met rechtvaardiging (bijv. fysieke controles indien alleen cloud)
- Gaten: eerlijk antwoord + compensatie controle of notitie in uitvoering

Verwachte breakdown voor SOC 2 Type II houder: ~70 vragen gedekt door SOC 2, ~60 door beleid, ~40 N/A, ~30 echte gaten.

**Stap 2 — Batch per eigenaar (Dag 1-2):**
Engineering eigenaar: versleuteling, toegangscontrole, vulnerability management, logging
Juridische eigenaar: gegevensverwerkings, privacy, regelgeving naleving
Financiën/ops eigenaar: bedrijfscontinuïteit, verzekering, derdeparty contracten

**Stap 3 — SOC 2-blok eenmaal schrijven, overal referenties (Dag 2):**
« Deze controle wordt behandeld in onze SOC 2 Type II audit (beschikbaar onder NDA). Controleverwijzing: [CC#]. Auditperiode: [datums]. Auditor: [bedrijf]. »
Dit sjabloon kopiëren over alle SOC 2-gedekte vragen — 10 minuten per controle, niet 10 vragen × 30 minuten elk.

**Stap 4 — Gaten (Dag 5-7):**
Voor elk echt gat: 2-3 zinnen — wat we niet hebben, wat we in plaats daarvan doen, wanneer we het adresseren.

**Stap 5 — Controleer en dien in (Dag 8-10):**
Juridische controle van het gegevens-/privacygedeelte. CEO spotcheck op de 10 meest gevoelige vragen. Indienen met een dekbrief met aanbod van virtueel beveiligingsgesprek met uw CTO.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
