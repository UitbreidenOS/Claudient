# Churn-preventie

## Wanneer activeren
- U runt een abonnementsbedrijf (SaaS, lidmaatschap, terugkerende service, inhoudsabonnement) en wilt klantenverlies verminderen
- Uw churn-tarief stijgt en u kunt niet zeggen welk segment dit veroorzaakt
- U ziet dezelfde geannuleerde klanten drie maanden later naar uw concurrenten terugkeren — de relatie was redbaar
- U start een nieuwe functie, prijsniveau of programma en wilt de introductie zodanig ontwerpen dat het churn-risico minimaal wordt
- U wilt de identificatie en benadering van risicoclanten systematiseren in plaats van op annuleringen te reageren

## Wanneer NIET gebruiken
- U runt een transactioneel bedrijf (eenmalige aankopen, ad-hoc services) — churn is niet het juiste raamwerk
- Uw churn is al uitstekend (onder 1% maandelijks voor B2B SaaS, onder 3% voor B2C-abonnementen) — afnemende opbrengsten treden snel in
- De annuleringen die u ziet zijn structureel (product is verkeerd, prijsstelling is verkeerd) — benadering zal het niet oplossen; product- of prijsveranderingen zullen dat doen

## Instructies

### Stap 1: Stel uw abonnementscontext in

Zeg:

„Ik exploit een [abonnementstype — SaaS, lidmaatschap, inhoud, terugkerende service]-bedrijf. Gemiddelde klant-LTV is [$X]. Maandelijks churn-tarief is [Y%]. Mijn typische klanttraject van aanmelding tot annulering is [patroon beschrijven]. Mijn grootste churn-driver naar mijn inzicht is [reden]. Mijn merkgeluid is [adjectievenlijst]."

### Stap 2: Identificatie van risicoclanten

De meeste churn vindt plaats na een periode van afnemende betrokkenheid die zichtbaar is in uw gegevens. Haal de betrokkenheidssignalen op.

Zeg:

„Dit zijn signalen uit mijn klantenbasis in de afgelopen 30 dagen: [plak gegevens — inlogfrequentie, functiegebruik, ondersteuningstickets, plandowngrades, enz.]. Identificeer de klanten die de komende 30 dagen het meeste risico op churn hebben. Voor elk, leg uit welk specifieke signaalpatroon de vlag heeft geactiveerd en stel een gepersonaliseerde benaderingsaanpak voor."

Claude is goed in patroondetectie op gestructureerde betrokkenheidgegevens. Geef de onbewerkte getallen, niet uw interpretatie, en laat het patronen ontdekken die u mogelijk hebt gemist.

### Stap 3: Benadering van risicoclanten

Voor elke risicoclant:

Zeg:

„Klant [naam] bij [bedrijf] toont churn-signalen: [specifiek patroon]. Ze zijn [X maanden] klant. Hun gebruiksscenario is [gebruiksscenario]. Schrijf een gepersonaliseerde herhaalde benadering: (1) een warm check-in dat hun specifieke gebruiksscenario referenceert, (2) een gestructureerd aanbod om hen waarde te helpen krijgen (aangepaste training, accountbeoordeling, functie-walkthrough), (3) een zacht luistersignaal dat hun ruimte geeft om te delen als iets niet werkt."

De personalisatie is wat het verschil maakt. Generieke benadering „we hebben gemerkt dat u niet bent ingelogd" wordt genegeerd. Gepersonaliseerde „ik merkte dat u na onze v3-release stopte met het uitvoeren van het wekelijkse rapport — dat patroon deed zich voor bij enkele klanten en we hebben twee weken geleden een fix uitgebracht, wil je een 10-minuten rondleiding?" krijgt reacties.

### Stap 4: Annulering save flow

Wanneer een klant een annulering indient:

Zeg:

„Klant [naam] heeft zojuist een annuleringsverzoek ingediend. Ze zijn [X maanden] bij ons, betalen [$Y/maand]. Hun vermelde reden is [reden]. Hun gebruikspatroon in de afgelopen 90 dagen was [patroon]. Schrijf een annuleringssave-reeks: (1) een onmiddellijke reactie op de annulering en het aanbieden van een 15-minuten-oproep voordat deze wordt verwerkt, (2) gespreksonderwerpen voor de oproep die de vermelde reden en waargenomen patronen behandelen, (3) drie save-aanbiedingen gerangschikt naar waarschijnlijkheid — pauze, downgrade, gratis maand + aangepaste training."

De annuleringssave-oproep haalt 20-40% van annuleringsverzoeken in goed geleide abonnementsbedrijven op. De meeste kleine bedrijven voeren de oproep helemaal niet; ze verwerken gewoon de annulering.

### Stap 5: Winback na annulering

Voor klanten die wel annuleren:

Zeg:

„Klant [naam] annuleerde [X dagen] geleden. Hun vermelde reden was [reden]. Hun LTV bij ons was [$Y]. Schrijf een winback-reeks: (1) een 30-dagen post-annulerings „check-in" e-mail die niets pusht, (2) een 90-dagen „we hebben dat ding verscheept waar u naar vroeg" e-mail als er iets specifiek is dat ze noemden en nu is opgelost, (3) een 6-maanden „overweeg ons opnieuw" e-mail met een zacht aanbod."

De 90-dagen „we hebben het opgelost" e-mail is de best converterende winback-touch. De meeste abonnementsbedrijven annuleren klanten en vergeten hen voor altijd.

### Stap 6: Cohort-niveau churn-analyse

Eens per kwartaal:

Zeg:

„Dit zijn mijn churn-gegevens van de afgelopen 12 maanden per aanmeldingscohort: [plak]. Identificeer patronen op cohort-niveau: welke maanden hadden ongewoon hoge of lage retentie, welke acquisitiekanalen produceren hogere LTV, welk prijsniveau heeft de meeste churn, welk functiegebruik correleert met retentie. Stel 3-5 testbare hypothesen voor voor het verbeteren van retentie."

De cohortweergave geeft patronen die het maandelijkse churn-tarief verbergt. De meeste abonnementsoperators zien churn als een enkel getal en missen dat de nieuwe-klantencohorten met een tarief van 2x de legacy-tarief churn.

## Voorbeeld

U runt een klein SaaS — een marketing automatiseringshulpmiddel voor zelfstandige consultants en kleine agentschappen. 280 betalende klanten, gemiddeld $89/maand. Het maandelijkse churn-tarief is de afgelopen 4 maanden gestegen van 4% naar 6,5%. Bij uw klantenaantal verliest u 7-12 klanten per maand versus de 11 die u toevoegt — netto groei is gestagneerd.

U stelt de workflow voor identificatie van risicoclanten in. U haalt de betrokkenheidgegevens van de afgelopen 30 dagen op: inlogfrequentie, functiegebruik, ondersteuningstickets, plandowngrades. U gooit de onbewerkte gegevens met de klantlijst in Claude.

Claude markeert 18 risicoclanten. De grootste cluster — 9 van de 18 — delen een specifiek patroon: ze stopten met het gebruik van de e-mail automatiseringsfunctie in de afgelopen 30 dagen, ondanks intensief gebruik daarvoor. Het patroon wijst op een UI-wijziging die u 6 weken geleden hebt uitgebracht.

U had het niet opgemerkt omdat ondersteuningstickets langzaam binnenkwamen, één of twee tegelijk, geformuleerd als verschillende problemen. Het patroon in samenhang is duidelijk.

U keert de UI-wijziging voor deze 9 klanten terug, stuurt ze een gepersonaliseerde e-mail met verwijzing naar de specifieke functie en legt uit wat u hebt opgelost, en biedt een 30-minuten-rondleiding. 6 van de 9 reageren en herenageren. 2 annuleren toch (het onderliggende probleem was anders). 1 reageert niet.

Vervolgens verstuurt u een verfijnde versie van de UI-wijziging met expliciete migratieondersteuning. Het maandelijkse churn daalt binnen twee maanden naar 4,2%. Netto groei hervat.

De enkele Claude-workflow onthulde een structureel productprobleem dat zich in geaggregeerde statistieken verborg. De contact per klant met klant redde ongeveer $35-45K jaarlijkse terugkerende inkomsten. De productiereparatie redde naar schatting $100K+ over de volgende 12 maanden.

U maakt risicoclantidentificatie tot een maandelijks ritme. In maand 6 stabiliseert uw churn-tarief zich op 3,7% — lager dan waar het begon. Het samengestelde effect op groei is significant.
