---
name: customer-success
description: "Customer success management: health scoring, churn prediction signals, expansion playbooks, QBR structure, onboarding plans, and customer lifecycle management for SaaS"
---

# Klantensucces Vaardigheid

## Wanneer in te schakelen
- Een gezondheidsscorescore model bouwen
- Risicovolle klanten identificeren voor ze weggaan
- Expansie- en upsell-spelplannen ontwerpen
- Een kwartaallijks zakelijk beoordelingskesprek (QBR) met een klant voeren
- Een klant onboarding-plan creëren
- De klantenbasis segmenteren voor CS-dekkingsmodellen

## Wanneer niet te gebruiken
- Verkoopprospectie — gebruik de sdr-agent of lead-enrichment vaardigheden
- Productanalytics voor interne beslissingen — gebruik de product-analytics vaardigheid
- Marketingcampagnes naar bestaande klanten — gebruik de email-sequence vaardigheid
- Technische ondersteuning of bugbeheer — andere functie

## Instructies

### Klantengezondheidscore

```
Bouw een gezondheidsscoremodel voor [product].

Product: [beschrijf — SaaS / platform / beheerde service]
Klanttype: [KMB / midden-markt / ondernemings]
Sleutelsuccessmetrick: [wat aangeeft dat een klant waarde krijgt]
Beschikbare gegevens: [productgebruik / supporttickets / NPS / betalingsgeschiedenis / betrokkenheid]

Gezondheidsscoreframework (gewogen samengesteld):

GEBRUIKSIGNALEN (40% gewicht):
- Aanmeldfrequentie: [dagelijks/wekelijks/maandelijks] versus verwacht voor plan
- Kernfunctie-adoptie: % van aankocht functies daadwerkelijk gebruikt
- Stroomgebruikers: aantal gebruikers met > X sessies/week
- Breedte: % gereserveerde stoelen actief gebruikt
- Trend: groeit het gebruik, is plat of daalt het MoM?

RELATIE SIGNALEN (25% gewicht):
- NPS-score: laatste enquêtereactie en trend
- Supportticketvolume: stijgende tickets = wrijving ; nul tickets = disengagement risico
- Betrokkenheid van leidinggevenden: laatste contact met beslissingsnemer
- Champions: geïdentificeerde interne pleitbezorgers voor uw product?

COMMERCIËLE SIGNALEN (20% gewicht):
- Dagen achterstallig op facturen: >30 dagen is een churn signaal
- Vernieuwingsdatum: <90 dagen tot vernieuwing = hoge prioriteit
- Contractgroei: uitbreiding (gezond) versus contractie (churn risico)
- Discountniveau: sterk gedisconteerde accounts = lagere switchkosten

RESULTATEN SIGNALEN (15% gewicht):
- Verklaard succescriteria van de klant: worden ze bereikt?
- Bereikt bedrijfsresultaten: ROI gedocumenteerd?
- Casestudy / referentie bereid: sterk succesteken

Scoring:
Elk signaal beoordeeld 1-10 → gewogen gemiddelde → gezondheidslaag:

Gezond (score 7-10): maandelijks controleren, expansiemogelijkheden zoeken
Risico (score 4-6): maandelijkse check-ins, blokkades identificeren en opheffen
Kritiek (score 1-3): wekelijkse betrokkenheid, uitvoerend escalatie indien nodig

Bouw het gezondheidsscoremodel voor mijn product met specifieke metrieken definities.
```

### Churn voorspellingssignalen

```
Identificeer risicovolle klanten voordat ze weggaan.

Producttype: [SaaS]
Contracttype: [maandelijks / jaarlijks / multi-jaar]
Historisch churn tarief: [X%]
Beschikbare gegevens: [beschrijf wat je volgt]

Vroege waarschuwingssignalen per timeframe:

90+ DAGEN VOOR CHURN (strategische signalen):
- Leidinggevende verliet het bedrijf (direct met opvolger werken)
- Bedrijf ondergaat overname of herstructurering
- Budgetbevriezing of personeelsreductie aangekondigd (LinkedIn/nieuws)
- Champion promoten uw product is stil geworden of vertrokken

60-90 DAGEN VOOR CHURN (engagement signalen):
- Aanmeldfrequentie daalde > 30% versus 3-maands gemiddelde
- Kernfunctie gebruik daalt 2+ opeenvolgende maanden
- Supporttickets geopend over gegevensexport of API-toegang (migratieprep)
- NPS-score daalde ≥ 2 categorieën (Promotor → Passief / Passief → Detractor)
- Supportticket vragen over contractvoorwaarden, vernieuwingsdatum of annuleringsprocedure

30-60 DAGEN VOOR CHURN (commerciële signalen):
- Factuur achterstallig > 15 dagen zonder voorafgaande communicatie
- Klant vroeg om prijsvergelijking of RFP
- CS-team heeft geen contactpunt met primaire contactpersoon in > 45 dagen
- Functieaanvragen ingediend maar geen antwoord gegeven

<30 DAGEN VOOR CHURN (laatste kansensignalen):
- Gebruikersaantal aanzienlijk gedaald (gebruikers offboarden)
- Integratie verwijderd of API-sleutels gedeactiveerd
- Klant neemt niet deel aan QBR of slaat geplande oproepen over
- Directe communicatie over ontevredenheid of concurrentiebeoordeling

Reactiespelplan per risicoviveau:
90+ dagsignaal: onmiddellijke CSM-contact, leiderschaps introductie
60-90 dagsignaal: gezondheidsreview oproep, succesblokkades identificeren, escaleren naar CS-leider
30-60 dagsignaal: uitvoerend uitlijningskesprek, reddingsaanbod indien commercieel, snelle reactie op klachten
<30 dagsignaal: redding oproep met beslissingsnemer, oorzaak begrijpen, laatste kansaanbod

Bouw het churn signaal detectie spel voor mijn product en contractvoorwaarden.
```

### QBR structuur

```
Ontwerp een kwartaallijks zakelijk beoordelingskesprek voor [klant].

Klant: [bedrijfsnaam, niveau, contractwaarde]
Duur: [30 min / 60 min / 90 min]
Deelnemers: [klantuitvoerder + gebruikers / CS + AE / uitvoerend uitlijning]
Doel: [behoud / expansie / casestudy / relatieopbouw]

QBR agenda:

[10 min] OPENING: Relatie en agenda
- Bedank hen voor de tijd
- Bevestig agenda en gewenste resultaten voor deze sessie
- « Wat zou deze 60 minuten het waardevol voor uw team maken? »

[15 min] HUN ZAKELIJK: Wat is er sinds vorig kwartaal veranderd?
- Vraag voordat je spreekt: « Wat zijn uw top 3 prioriteiten voor volgende kwartaal? »
- Welke uitdagingen tegemoet u?
- Zijn er wijzigingen in team, budget of strategische richting?
[Dit gedeelte onthult vaak expansiemogelijkheden of churn-risico's]

[20 min] WAARDE GELEVERD: Wat ze uit uw product hebben gekregen
- Gebruiksmetreken versus vorig kwartaal (groei of stabiliteit tonen)
- Succes tegen hun verklaard doelstellingen van vorige QBR
- Specifieke resultaten: [X uren bespaard / $Y omzet beïnvloed / Z% efficiëntiewinst]
- Uw productimpact toewijzen aan bedrijfsprioriteiten

[10 min] ROADMAP PREVIEW: Wat er aan komt dat relevant voor hen is
- 1-3 komende functies die hun use cases rechtstreeks aanpakken
- Feedback krijgen: « Zou dit het probleem dat u noemde oplossen? »
- Vermijden: « Hier is alles wat we bouwen » — keur tot hun context

[15 min] OPEN KWESTIES EN VOLGENDE STAPPEN:
- Alle openstaande supporttickets of onopgeloste pijnpunten
- Expansiediscussie indien van toepassing (niet forceren als vertrouwen niet daar is)
- Bevestig succescriteria voor volgende kwartaal
- Actieposten met eigenaren en datums

[10 min] SLUITING:
- « Wat is het ene wat we volgende kwartaal anders moeten doen? »
- Vernieuwingstijdlijn en volgende contactpunten
- Verwijzing / casestudy / verwijzing vragen als relatie sterk is

QBR-regels:
- Agenda 5 dagen van tevoren verzenden
- Besteed > 50% van de tijd aan luisteren, < 50% presentatie
- Begin nooit met een productdemo — begin met hun zakelijk
- Eindig altijd met gedocumenteerde volgende stappen

Genereer de QBR-dek schets en talking points voor mijn specifieke klant.
```

### Klant onboarding plan

```
Bouw een onboarding plan voor [nieuwe klant].

Klant: [grootte, technische verfijning, use case]
Contract: [$X ARR, [X] stoelen, [Y] sleutel use cases gekocht]
Successeigenaar: [CSM-naam]
Tijdlijn: [30/60/90-dag onboarding]
Aha moment: [het specifieke resultaat dat snel waarde toont]

30-60-90-dag onboardingplan:

DAGEN 1-7 — Setup en oriëntatie:
□ Kickoff-gesprek: intros, succescriteria bevestigen, communicatiecadence vaststellen
□ Technische setup: accountinrichting, integraties, gebruikersinvitaties
□ Beheerdersscholing: de koper / admingebruiker kan het gereedschap onafhankelijk configureren
□ Snelle winst: de enkele meest impactvolle use case identificeren — zorg dat het deze week werkt

DAGEN 8-30 — Eerste waarde geleverd:
□ Kampioenscholing: 1-2 interne machtgebruikers getraind en actief
□ Eerste core workflow volledig werkend
□ Check-in oproep (week 2): blokkades? Wat werkt?
□ Activeringsmijlpaal bevestigd: [specifiek aha-moment bereikt]
□ Introduceer aanvullende teamleden die het product zouden moeten gebruiken

DAGEN 31-60 — Verdieping van adoptie:
□ Uitbreiden naar aanvullende use cases of afdelingen
□ Train resterende gebruikers op kernworkflows
□ Documenteer vroege overwinningen en ROI-signalen (voorbereiding bewijs voor interne belanghebbenden)
□ Halftime onboarding review: gezondheidsscorecheck, churn-signalen geïdentificeerd

DAGEN 61-90 — Bedrijfsresultaatfocus:
□ Resultatenreview: tegen succescriteria gesteld bij kickoff
□ ROI-documentatie: kan de klant waarde aan hun leiderschap articuleren?
□ Interne kampioen geïdentificeerd en onderhouden
□ Pad naar expansie besproken (als gebruik ondersteunt)
□ Casestudy / verwijzingsverzoek als relatie sterk is

Escalatietriggers tijdens onboarding (onmiddellijk vlag):
- Technische setup niet tegen dag 7 voltooid
- Geen aanmeldingen van niet-admin gebruikers tegen dag 14
- CSM kan primaire contactpersoon niet > 5 dagen bereiken
- Klant uit ontevredenheid of onvervulde verwachting in eerste 30 dagen

Genereer het onboardingplan voor mijn specifieke klant en product.
```

## Voorbeeld

**Gebruiker:** We hebben 50 klanten betaald $2K-$10K/maand. Geen formeel CS-proces. 3 churn vorig kwartaal zonder waarschuwing. Hoe bouw ik een basale gezondheidscore met wat ik heb?

**Claude's quick-start model:**

Zonder formale CS-gegevens bouw je uit wat je hebt — productlogs + CRM + supporttickets. Dit duurt 1 week om in te stellen.

**3-signaal gezondheidscore (hier beginnen, later uitbouwen):**

| Signaal | Gegevensbron | Groen | Geel | Rood | Gewicht |
|---|---|---|---|---|---|
| Maandelijks actieve gebruikers | Product DB | >60% stoelen actief | 30-60% | <30% | 40% |
| Supporttickets | Helpdesk | 0-2/maand | 3-5/maand | >5 of 0 voor 60+ dagen | 30% |
| Dagen sinds laatste CS-contact | CRM | <30 dagen | 31-60 dagen | >60 dagen | 30% |

**Score = gewogen gemiddelde van signaalscores (1-10 per signaal)**

**In uw CRM nu:** maak een gezondheidsveld op elke rekening (Groen/Geel/Rood). Handmatig controleren en deze week elke rekening instellen. Maandelijks controleren.

**De 3 churns hadden geen waarschuwing omdat:** je had geen score en geen contactcadence. Fix contactcadence eerst — een maandelijks 30-minuten gesprek met elke klant is meer waard dan een perfect gezondheidsscoremodel dat je in 3 maanden bouwt.

**Onmiddellijke acties:**
1. Bel deze week elke klant met wie je niet in >60 dagen hebt gesproken (waarschijnlijk 15-20 van 50)
2. Vraag hen: « Wat zou je doen om zonder aarzeling te verlengen? » — je leert meer van 10 oproepen dan van 3 maanden analyse
3. Regel stellen: geen rekening gaat > 45 dagen zonder contactpunt

---

> **Work with us:** Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
