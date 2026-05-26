# Salarisbeheer Planner

## Wanneer activeren
- Je bent 1-2 weken verwijderd van de salarisbetaling en wilt bevestigen dat het geld er is voordat het wordt overgemaakt
- Geld wordt krap en je bent niet zeker of je deze cyclus zowel rekeningen als loonlijst kunt dekken
- Een nieuwe medewerker begint en je moet je runway opnieuw berekenen met het hogere loonbedrag
- Kwartaalplanning — je wilt een 90-daags kasstroomoverzicht, niet alleen 30 dagen

## Wanneer NIET gebruiken
- Je hebt een voltijdse CFO of boekhouder die de kasstroom beheert — dat is hun taak, niet die van Claude
- Je salarisbedrag verandert elke cyclus op complexe manieren (commissies, variabel loon) en je hebt de getallen nog niet gestabiliseerd — krijg eerst werkelijke getallen, gebruik dan deze skill
- Je moet salarisbewerkingsbeslissingen nemen (belastingkeuring, voordaafttrekking) — gebruik je salarisleverancier (Gusto, ADP, Paychex), niet Claude

## Instructies

### Wat je Claude moet geven

Je hebt vijf dingen nodig. Je moet ze allemaal uit je hoofd kennen of in minder dan 5 minuten van je bank en QuickBooks:

1. Huidige rekeningsaldo (betaalrekening van waaruit je salaris wordt afgetrokken)
2. Volgende salarisdatum en exact salarisbedrag
3. Openstaande facturen: wie je geld schuldig is, hoeveel, en wanneer je realistisch verwacht dat elk aankomt
4. Terugkerende rekeningen verschuldigd in de volgende 30 dagen: huur, softwareabonnementen, leveranciersbetalingen — bedragen en vervaldatums
5. Bekende onregelmatige uitgaven: apparatuuraankoop, verzekeringvernieuwing, belastingbetaling

### Stap 1: Maak de 30-daagse kasstroomtijdlijn

Vertel Claude alle vijf getallen. Vraag:

„Maak een 30-daags kasstroomoverzicht vanaf vandaag. Toon het saldo stijgen wanneer facturen aankomen en dalen wanneer rekeningen en salarissen worden afgetrokken. Toon me het laagste punt."

Claude produceert een dagelijks kasstroomoverzicht en markeert de strakste dag:

„Dag 11 is je laagste punt — $ 3.800 in de bank voordat de Peterson-factuur op dag 13 aankomt. Salaris op dag 15 is $ 18.500. Je hebt $ 2.200 marge als Peterson op tijd betaalt. Als ze 3 dagen te laat zijn, heb je een gat van $ 14.300."

### Stap 2: Rangschik achterstallige facturen naar urgentie

Hebt achterstallige of vertraagde facturen, vraag Claude om ze in te delen. Zeg:

„Ik heb drie achterstallige facturen. Zeg me in welke volgorde ik ze moet achtervolen en wat ik moet zeggen."

Claude ordent ze op dollarimpact op de salarisgat, niet alleen op dagen achterstallig. Een $ 9.000 factuur 5 dagen achterstallig is belangrijker dan een $ 400 factuur 45 dagen achterstallig als salaris in 2 weken verschuldigd is.

Claude schrijft ook de benadering: een direct incassobellescript voor je hoogste prioriteit en kortere e-mailvervolging voor de rest.

### Stap 3: Genereer de salarischecklist

Vraag Claude: „Wat moet ik doen voordat salaris op de 15e wordt betaald?"

Claude genereert een checklist afgestemd op je salarisleverancier (Gusto, ADP, Paychex, QuickBooks Payroll). Typische items:

- Bevestig dat werknemeruren zijn ingediend en goedgekeurd
- Controleer dat nieuwe medewerkergegevens zijn ingevoerd (indien van toepassing)
- Bevestig dat de registreerde bankrekening voor de verwerkingsdeadline voldoende saldo heeft
- Dien salaris in voor de deadline van de leverancier (meestal 2 werkdagen voor salarisdatum)
- Download de salarissamenvatting voor je dossiers

### Stap 4: Behandel een tekort

Zo de tijdlijn een gat toont, raad niet naar oplossingen. Zeg Claude precies wat het tekort is en vraag om opties. Claude suggereert specifieke acties geordend op snelheid en kosten:

- Welke specifieke factuur eerst bellen en wat zeggen om deze week betaald te krijgen
- Welke rekeningen zonder boete kunnen worden vertraagd (de meeste leveranciers staan 5-7 dagen toe met een telefoontje)
- Of een bedrijfskredietlijn redelijk is voor dit specifieke gat en bedrag
- Welke discretionaire uitgaven tot na salarisbetaling moet aanhouden

Claude zal je niet zeggen „financieringsopties verkennen" abstract — het zegt „zet de $ 1.400 softwarevernieuwing tot de 16e en bel Peterson vandaag. Dat sluit je gat."

### Maandelijks ritme

Voer deze skill maandelijks uit op de eerste maandag na maandafsluiting. Kost 10 minuten en elimineert kasstroomverrassing. Combineer met de Month-End Close skill voor het volledige beeld.

## Voorbeeld

Je zegt: „Salaris is $ 18.500 op de 15e. Rekeningsaldo vandaag is $ 22.000. Ik heb drie facturen: $ 8.000 van Atlas Group verschuldigd op de 10e, $ 4.500 van Reyes Construction verschuldigd op de 20e, $ 6.000 van Johnson die 30 dagen achterstallig is en niet hebben gereageerd. Rekeningen deze maand: $ 2.200 huur op de 1e (al betaald), $ 800 software verschuldigd op de 8e, $ 1.100 verzekering verschuldigd op de 18e."

Claude produceert:

Kasstroomtijdlijn:
- Vandaag: $ 22.000
- Dag 8: -$ 800 software → $ 21.200
- Dag 10: +$ 8.000 Atlas Group → $ 29.200 (indien op tijd)
- Dag 15: -$ 18.500 salaris → $ 10.700
- Dag 18: -$ 1.100 verzekering → $ 9.600
- Dag 20: +$ 4.500 Reyes → $ 14.100

Strakste punt: Dag 14, de dag voor salaris. Als Atlas Group op tijd betaalt, heb je $ 21.200 als salaris binnenkomt — comfortabel. Als Atlas 5+ dagen vertraagd is, zak je naar $ 13.200 voordat salaris binnenkomt, wat nog steeds kleedt maar $ 5.300 achterlaat na salaris voordat ander inkomen binnenkomt. Volg Atlas nauwlettend.

Johnson ($ 6.000 achterstallig): bel vandaag. Claude schrijft een 3-zins belbericht: „Hallo, dit is [naam] van [bedrijf]. Ik bel over de $ 6.000 factuur van [datum] die 30 dagen achterstallig is. Kunt u de status bevestigen en me een betaaldatum geven die ik in mijn onderlagen kan zetten?"

Salaris is veilig zolang Atlas voor de 13e betaalt. Geen tekortrisco vandaag — maar Johnson is de buffer. Verzamel Johnson voor de 13e en je hebt $ 27.200 als salaris binnenkomt.
