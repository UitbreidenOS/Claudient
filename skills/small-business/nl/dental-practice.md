# Tandheelkundige Praktijk

## Wanneer activeren
- U runt een solo of klein tandheelkundige praktijk en de receptie wordt overweldigd door operationeel vervolgwerk
- Herinnerings planning is achtergelopen — patiënten die op 6-maand ritme zouden moeten zijn zijn op 9+ maanden zonder boeking
- Behandelplan acceptatie is onder 50% en u wilt een gestructureerde vervolgsequence voor niet-geaccepteerde plannen
- Verzekering verificatie eet 4-8 uur per week receptie tijd op
- U lanceert een nieuw service (clear aligners, slaap tandheelkunde, cosmetisch) en hebt patiënt educatie en outreach copy nodig

## Wanneer niet gebruiken
- U hebt een dedicated office manager of practice administrator die deze workflows al efficiënt bezit
- Uw PMS (Dentrix, Eaglesoft, Open Dental) runt al een robuust automated herinnerings- en vervolgingsysteem waarop u vertrouwt
- Het werk raakt klinische beslissingen — Claude is voor administratieve wrapper rond behandeling, niet voor behandeling zelf

## Instructies

### Stap 1: Stel uw praktijkcontext in

Zeg:

„Ik run een [solo / klein] tandheelkundige praktijk in [stad]. We hebben [N] operatoires en [N] hygiënisten. Onze patiënt mix is [verzekering-zwaar / fee-for-service / gemengd]. Onze merkuitstraling is [warm-en-klinisch / gezins-vriendelijk / premium / no-nonsense]. Onze meest voorkomende servicemix is [routine recall, restauratief, cosmetisch, ortho, etc. — met grove percentages]. Ons grootste service dat we proberen te groeien is [naam]. »

### Stap 2: Run recall outreach op de backlog

De enkel hoogste-ROI tandheelkundige skill workflow is recall recovery. De meeste praktijken hebben 80-200 patiënten die te laat zijn op hun 6-maand recall maar niet actief zijn nagelopen.

Zeg:

„Hier zijn 50 patiënten te laat op recall. Voor elk, concept een gepersonaliseerde outreach bericht die hun laatste bezoekdatum, het service dat ze hadden, aanbevolen volgende bezoek referenceert en twee specifieke appointment slots aangebiedt. »

Claude produceert 50 gepersonaliseerde berichten. Uw receptie verstuurt ze in batches, runt een 3-touch sequence (initiële outreach, 1-week vervolgacties, 3-week eindschuif), en traceert reserveringen. Typische recovery: 25-40% van te laat patiënten plannen binnen 30 dagen.

### Stap 3: Behandelplan vervolgacties

Behandelplannen niet geaccepteerd in de stoel zijn meestal voorgoed verloren zonder vervolgacties. De meeste praktijken hebben geen gestructureerde vervolgflow.

Zeg:

„Deze patiënt kreeg een $2.400 behandelplan voor [kroon / implantaat / kwadrant restauratie] op [datum] gepresenteerd maar plantte niet. Ze uitte bezorgdheid over [kosten / tijd / tandangst]. Concept een vervolgbericht dat bezorgdheid addresseert, financiering opties aanbiedt als relevant, en next stap voorstelt. »

De skill werkt het beste samen met een geschreven behandelplan dat dokter notities over patiënt bezwaar bevat. Gepersonaliseerde vervolgacties converteren met 2-4x het tarief van generieke „laten we dit behandelen plannen" herinneringen.

### Stap 4: Verzekering verificatie triage

Verzekering verificatie is mechanisch maar verbruikt receptie uren. Claude structureert het werk:

Zeg:

„Voor morgens 8 nieuwe patiënten, hier zijn verzekering details. Genereer een gestructureerde verificatie checklist voor elk — wat met drager bevestigen, verwachte benefit categorieën, deductible status en common pitfalls voor deze drager. »

Verificatie gesprekken vinden nog steeds met drager plaats (verzekering API's zijn zwak in tandheelkunde). Maar uw receptie arriveert bij elk gesprek met gestructureerde checklist en schrijft antwoord terug in Claude voor downstream gebruik in behandelplan gesprekken.

### Stap 5: Nieuw service lancering

Wanneer praktijk nieuw service lanceert (clear aligners, slaapapneu, in-house lidmaatschap plan):

Zeg:

„Ik lancer [service] in [maand]. Het service is voor patiënten die [persona / use case]. Prijsstelling is [$X]. Concept: (1) patiënt educatie sheet, (2) in-office aankondiging email naar bestaande patiënten, (3) website service-page copy, (4) consult script voor dokter en consult coordinator. »

U krijgt gecoördineerd package. Beoordeel, run door compliance review (alle claims over resultaten nodig dokter lees), en deploy.

### Stap 6: No-show en annulering recovery

Zelfde patroon als salon recovery sequence, gekalibreerd naar tandheelkundige context. De economie is verschillend — zelfde dag no-show in tandheelkunde kan $200-500 in verloren inkomsten zijn, en praktijk stoel tijd kan niet zoals haarknip opnieuw verkocht. Recovery sequence is directer:

Touch 1 (zelfde dag): warm check-in.
Touch 2 (48 uur): specifieke rebook offer met twee open slots.
Touch 3 (7 dagen): directe vraag plus rationale voor op recall ritme blijven.

## Voorbeeld

U runt 3-operatory familie praktijk. U hebt 1.400 actieve patiënten. Ongeveer 220 zijn te laat op hun 6-maand recall — wat betekent ze zijn op 9+ maanden sinds laatste hygiëne bezoek, en uw receptie heeft hen niet actief in 60+ dagen benaderd.

U vraagt Claude om gepersonaliseerde outreach voor eerste 50 te concepten (gesorteerd op last-visit recency — meest recent eerst). Elk bericht referenceert patiënt laatste bezoekdatum en biedt twee slots.

U verstuurt eerste batch dinsdag ochtend. Tegen vrijdag 18 patiënten hebben gereageerd. 12 plannen. Dat is $1.800-2.400 in hersteld hygiëne inkomsten (en downstream behandeling dat voort uit stoel tijd dat u anders niet gehad).

U run tweede batch volgende dinsdag. Zelfde patroon. Over vier weken u herstelt ongeveer 35% van te laat backlog — 78 patiënten geplaan dat anders verder zou drijven.

Herstelde inkomsten in maand één: $11-15K. Tijdinvestering: ongeveer 2 uur receptie review en outreach tijd verspreid over maand. Claude skill betaalde zich veel keer terug in eerste 30 dagen.

U stelt dit dan in als permanent maandelijks ritme. Backlog groeit nooit weer boven 40-50 patiënten.
