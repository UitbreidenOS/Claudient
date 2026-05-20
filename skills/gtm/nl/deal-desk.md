---
name: deal-desk
description: "Deal desk: structure enterprise deals, review contract terms, set discount approval thresholds, analyse deal economics, and create commercial policy — for B2B sales operations"
---

# Deal Desk Vaardigheid

## Wanneer in te schakelen
- Structureren van een complexe bedrijfsdeal (multi-jaar, aangepaste voorwaarden, bundels)
- Controleer de door de klant voorgestelde contractvoorwaarden op commerciële rode vlaggen
- Drempels voor kortingsgoedkeuring en escalatiebeleid instellen
- Analyse van dealeconomie (marge, terugsaldo, LTV) vóór goedkeuring
- Maken of bijwerken van commercieel beleid (prijsgardrails, bundelingregels)

## Wanneer niet te gebruiken
- Juridische contractbeoordeling voor nalevingsrisico — gebruik de vendor-contract-review of diligence-review vaardigheid
- Prijsstrategie en tier-ontwerp — gebruik de pricing-strategy vaardigheid
- Omzetprognose — gebruik de revenue-operations vaardigheid
- Klantensucces en vernieuwingsspelplannen — gebruik de customer-success vaardigheid

## Instructies

### Deal structurering

```
Structureer een deal voor [klant].

Klant: [naam, bedrijfsgrootte, industrie]
Dealtype: [nieuw logo / uitbreiding / vernieuwing / multi-jaar]
Aangevraagde ARR: $[X]
Aangevraagde producten / niveaus: [lijst]
Contractduur: [12 / 24 / 36 maanden]
Aangevraagde startdatum: [datum]
Speciale vereisten: [aangepaste SLA / toegewijde ondersteuning / aangepaste integratie / gegevenslocatie]

Dealstructuur revisie:

1. PRIJSINTEGRITEIT:
   Wat is de lijstprijs voor deze configuratie?
   Klant vraagt om: $[X] ([X]% korting op lijst)
   Valt dit binnen standaard kortingsautoriteit? [rep / manager / VP / CRO-niveau]
   Wat is de rechtvaardiging? [volume / strategisch / competitief / vernieuwingsbehoud]

2. DEAL ECONOMIE:
   ACV: $[X]
   Geschatte CAC voor deze deal: $[X] (verkoopssalaris + commissie + SE-tijd + juridische tijd)
   Brutomarge op deze prijs: [X]%
   CAC-terugbetaling op deze prijs: [X] maanden
   Is deze deal economisch haalbaar? [ja / grensgebied / nee — eskaleer]

3. TERMIJNSTRUCTUUR:
   Betalingsvoorwaarden: [netto 30 / jaarlijks vooraf / driemaandelijks]
   Multi-jaar lock-in: [jaar 2 en 3 prijzen gebonden aan lijst / KPI + X%]
   Verlenging auto-renew: [ja / 90-daagse kennisgeving]
   Clause voor vervroegde beëindiging: [ja — risico / nee — standaard]

4. NIET-STANDAARDVOORWAARDEN OM VAN VLAG TE VOORZIEN:
   Onbeperkte aansprakelijkheid — weigeren of naar juridische diensten eskaleer
   Onbeperkte schadevergoedingsreikwijdte — eskaleer
   SLA-straffen als enig rechtsmiddel — aanvaarden als straffen begrensd zijn
   Meestbegunstigde-natie-prijsclausule — markeer ; kan toekomstige prijsvorming beperken
   Vereisten voor gegevensoverdraagbaarheid bij beëindiging — markeer ; bevestig dat engineering kan voldoen
   Restricties onderaannemer — markeer ; bevestig dat huidige lijst van onderaannemers aanvaardbaar is

5. DEALGOEDKEURING:
   Goedkeurder op dit kortingsniveau: [naam/rol]
   Vereiste documenten vóór goedkeuring: [SOW / beveiligingsvragenlijst / juridische controle]
   Verwachte sluitingsdatum: [datum]

Uitvoer: dealgoedkeuringsaanbeveling met specifieke voorwaarden.
MENSELIJKE GOEDKEURING VEREIST voor alle kortingen > standaard rep-autoriteit.
```

### Kortingsgoedkeuringsbeleid

```
Ontwerp een kortingsgoedkeuringsbeleid voor [bedrijf].

Verkoopteamgrootte: [X reps]
Dealgroottes: [$X typische ACV, $X max ACV]
Huidig kortingsprobleem: [te veel / inconsistent / geen beleid / marginecompressie]

Standaard kortingsautoriteitmatrix:

| Kortingsniveau | Goedgekeurd door | Max ACV | Voorwaarden |
|---|---|---|---|
| 0-10% korting op lijst | AE (geen goedkeuring nodig) | Alle | Alleen standaardvoorwaarden |
| 11-20% korting op lijst | Verkoopsmanager | Alle | Schriftelijke rechtvaardiging vereist |
| 21-30% korting op lijst | VP Verkoop | Alle | Dealbeoordelingsmeeting vereist |
| 31-40% korting op lijst | CRO | > $100K ACV alleen | CEO-bewustzijn + dealeconomie revisie |
| > 40% korting op lijst | CEO + Raad | Alleen strategische deals | Volledige deal-desk-controle |

Rechtvaardigingscategorieën korting:
- Volume: > X zetels / > X gebruiksvolume
- Strategisch: referentieklant / casestudy / partnerschapswaarde
- Competitief: gedocumenteerde concurrentiële verplaatsing
- Retentie: gevaarbevorderde vernieuwing, competitore-evaluatie in afloop
- Snelheid: onderteken voor [datum] voor huidige kwartaalsluit

Kortingsgardrails (niet onderhandelbaar):
- Geen korting onder minimumbruto margedrempel ([X]% — ingesteld door financiën)
- Multi-jaar deals: jaar 2+ prijzen moeten op lijst staan of CPI-aangepast zijn — nooit vergrendeld op gereduceerd tarief
- Geen terugwerkende kortingen op reeds gesloten deals
- Korting geldt alleen voor ARR — professionele diensten altijd tegen lijst

Genereer het goedkeuringsbeleid voor mijn bedrijfs- en verkoopsteamstructuur.
MENSELIJKE GOEDKEURING VEREIST voor elke deal boven rep-autoriteit-niveau.
```

### Contractvoorwaardencontrole

```
Controleer deze contractvoorwaarden op commerciële risico's.

Contracttype: [MSA / Inkooporder / SaaS-abonnementsakkoord]
Onze rol: [leverancier / klant]
Contractwaarde: $[X] / [term]

Commerciële waarschuwingssignalen om te controleren (markeer als ROOD/GEEL/GROEN):

AANSPRAKELIJKHEID:
Onbeperkte aansprakelijkheid — moet een grenswaarde onderhandelen (standaard: 12 maanden kosten)
Aansprakelijkheidslimiet < 3 maanden kosten — te laag ; onderhandelen naar minimum 12 maanden
Geen uitzondering voor grove schuld of opzettelijk wangedrag — verifieer dat limiet van toepassing is

PRIJSSTELLING EN BETALING:
Audit recht met onbeperkte reikwijdte — beperken tot relevante records, redelijke kennisgeving
Prijsstijging limiet niet gespecificeerd — CPI of [X]% jaarlijkse limiet toevoegen
Netto 30 betalingsvoorwaarden — standaard

INTELLECTUEEL EIGENDOM:
Brede work-for-hire clausule die alle IP vordert — beperken tot specifieke leverables
IP gemaakt tijdens ondersteuning of implementatie geclaimd door klant — uitsluiten
Licentiereikwijdte is « wereldwijd, eeuwig, onherroepelijk » — standaard voor SaaS

BEËINDIGING:
Geen beëindiging om redenen van gemak — moet 30-90 dagen opzegrecht hebben
Beëindigingstrigers zijn te breed (« elke schending ») — zou genezingsperiode moeten vereisen
Effect van beëindiging: verwijderings Timeline klantgegevens niet gespecificeerd — 30-daagse genadetermijn toevoegen

GEGEVENS:
Geen DPA bijgevoegd (indien persoonlijke gegevens worden verwerkt) — vereist DPA
Gegevenszeggenschap dubbelzinnig — we geven klantgegevens ; klant bezit hun inhoud
Audits voor gegevensbeveiliging — beperken tot rapporten van derden auditages (SOC 2) ; geen directe toegang

Produceer: redline aanbevelingen voor elk ROOD/GEEL item.
JURIDISCHE CONTROLE VEREIST voordat u een overeenkomst ondertekent.
```

### Dealeconomie analyse

```
Analyseer de economie van [deal].

ACV: $[X]
Termijn: [X maanden]
TCV (totale contractwaarde): $[X]
Brutomarge op deze prijs: [X]%
CAC geïnvesteerd: $[X] (verkoopssalaris + commissie + SE-tijd + juridische tijd)
Implementatiekosten (indien van toepassing): $[X]

Deal economie:

CAC terugslaperiode:
= CAC / (ACV × brutomarge %)
= $[X] / ($[X] × [X]%)
= [X] maanden

Bij brutomarge [X]%, betaalt deze deal zijn verwervingskosten terug in [X] maanden.
Benchmark: < 12 maanden = uitstekend ; 12-18 maanden = aanvaardbaar ; > 24 maanden = marginaal

LTV berekening (ervan uitgaande [X]% jaarlijks churn):
Gemiddelde klantlevensduur = 1 / churn tarief = [X] jaar
LTV = ACV × brutomarge % × levensduur
= $[X] × [X]% × [X] jaar = $[X]

LTV:CAC verhouding = $[X] / $[X] = [X]x
Benchmark: > 3x = gezond ; > 5x = uitstekend ; < 2x = zorg

Omzetherkenning:
- Jaarlijks vooraf: volledige TCV erkend over de termijn (ASC 606 ratable)
- Maandelijks: maandelijks erkend als geleverd

Multi-jaar implicaties:
- Klant vergrendelen op [gereduceerd] tarief voor 3 jaar: omzetvoorspelbaarheid
- Risico: prijskracht verloren ; als lijstprijs 20% stijgt, blijft deze klant op oud tarief

Beslissing: [goedkeuren / met voorwaarden goedkeuren / eskaleer]
Voorwaarden: [indien van toepassing — bijv. « goedkeuren tegen deze prijs als de termijn 24 maanden vooraf is »]
MENSELIJKE HANDTEKENING VEREIST voor dealsluit.
```

## Voorbeeld

**Gebruiker:** Een Fortune 500-klant wil onze $85K/jaar enterprise-abonnement voor $55K/jaar (35% korting op lijst), 3-jaardeal, met data-exportrecht bij beëindiging, netto 90 betalingsvoorwaarden, en MFN-clausule. Deal of geen deal?

**Claude's analyse:**

**Korting (35% korting op lijst):** Vereist CRO-goedkeuring onder standaardbeleid. Rechtvaardiging vereist: strategisch logo, concurrentiedruk of volumetoezegging. Bij $55K × 3 = $165K TCV — waard de escalatie als de klant een echte referentie is.

**Voorwaarde voor voorwaarde:**

- Netto 90 betalingsvoorwaarden → Terugduwen. Netto 30 is standaard. Netto 60 maximum voor bedrijven. Netto 90 = 3-maanden werkkapitaalimpact bij deze dealgrootte. Tegenvoorstel: bied 2% vroegtijdige betaalingskorting op netto 10, of houd netto 30 zonder korting.

- Data-exportrecht bij beëindiging → Standaard en redelijk. Bevestig dat uw technisch team een machine-leesbare export binnen 30 dagen kan leveren — dit is gebruikelijk en waard om toe te zeggen.

- MFN-clausule → Weigeren of strikt omgrenzen. Een onbeperkte MFN (« we krijgen uw beste prijs voor elke klant ») betekent dat als u ooit een soortgelijke deal tegen een lagere prijs verkoopt, krijgt deze klant automatisch die lagere prijs. Tegenvoorstel: « MFN geldt alleen voor deals met gelijkaardige of hogere ACV, dezelfde termijn, binnen 12 maanden ondertekend. »

**Algemene aanbeveling:**
Goedkeuren met twee voorwaarden: (1) betalingsvoorwaarden onderhandeld naar netto 30 of 60 (niet 90), en (2) MFN beperkt tot vergelijkbare deals alleen. CRO-handtekening vereist voordat de eindtermen worden verzonden.

MENSELIJKE GOEDKEURING VEREIST. Stuur herziene voorwaarden niet zonder CRO-handtekening op het dealsamenvatting.

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
