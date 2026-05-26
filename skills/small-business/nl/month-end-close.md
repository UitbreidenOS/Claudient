# Maandafsluitingssluiting

## Wanneer activeren
- Het zijn de laatste dagen van de maand en je moet de boeken sluiten
- Je hebt een afspraak met je accountant en wilt met georganiseerde nummers aankomen
- Je hebt een W&V nodig voor een banklening, investeerderupdate of leasingaanvraag
- Iets klopt niet tussen je QuickBooks totaal en je rekeningafschrift en je moet de gat vinden

## Wanneer NIET gebruiken
- Midden in de maand — wacht tot de maand compleet is zodat de getallen definitief zijn
- Je accountant voert de afsluiting volledig uit en je bent niet betrokken bij het proces
- Je zoekt belastingadvies — deze skill organiseert je getallen, vervangt geen CPA

## Instructies

### Wat voor het starten exporteren

Je hebt drie dingen nodig van je boekhoudkundig systeem. Alle drie kunnen in minder dan 5 minuten geëxporteerd worden:

1. QuickBooks: Winst & Verlies rapport voor de maand (Rapporten > Winst & Verlies > datumbereik instellen > Exporteren naar Excel of PDF)
2. QuickBooks: Transactiedetailrapport voor de maand — volledige lijst van elke transactie
3. PayPal of Stripe: Afrekeningsrapport voor de maand — downloadbaar van je dashboard onder Activiteit of Rapporten

Als je zowel PayPal als Stripe gebruikt, trek beide. Gebruik je er maar één, trek die.

### Stap 1: Controleer betalingsverwerkers tegen QuickBooks

Plak je totalen in Claude:

„QuickBooks toont $34,200 in inkomsten. PayPal bruto verkopen waren $31,800 voor kosten, netto $29,400. Stripe bruto was $4,800, netto $4,600. Help me deze af te stemmen."

Claude identificeert waar getallen aansluiten en waar niet. Veel voorkomende gaten die het vangt:

- PayPal- of Stripe-kosten die niet als uitgaven in QuickBooks werden geregistreerd
- Terugbetalingen verwerkt in het ene systeem maar niet weerspiegeld in het andere
- Transacties die in de ene maand plaatsvinden maar in een ander afrekenen (tijdsverschillen)
- Gesplitste transacties die als één blok in QuickBooks werden geregistreerd

Voor elke discrepantie legt Claude uit wat het waarschijnlijk is en wat te doen — of je het zelf moet corrigeren of je accountant moet vragen.

### Stap 2: Genereer het W&V-overzicht

Als de getallen zijn afgestemd, vraag Claude:

„Vat mijn W&V voor de maand samen. Inkomsten per categorie als ik categorieën heb, top 5 uitgavencategorieën, nettowinst of verlies, en vergelijk met vorige maand als ik je die getallen geef."

Plak je QuickBooks W&V export (als tekst of getallen) en Claude produceert een schoon overzicht:

- Totale inkomsten: $38,600 (omhoog $3,200 van vorige maand, +9%)
- Top uitgavencategorieën: Contractantloon $11,200 / Software $2,400 / Advertentie $1,800 / Kantoor $640 / Bankkosten $280
- Nettowinst: $22,280 (58% marge)
- Opvallende verandering van vorige maand: Advertentieuitgaven omhoog $600 — controleer of dit inkomsten dreef

### Stap 3: Vang ontbrekende bonnen

Zeg tegen Claude je drempel:

„Vermeld alle transacties boven $75 in mijn uitgavenbericht die geen notitie of bon hebben."

Plak je transactielijst. Claude markeert die zonder beschrijving en groepeert ze per categorie zodat je bonnen efficiënt kunt opvolgen. Het noteert ook welke waarschijnlijk aftrekbaar zijn (zakenmaaltijden, software, reizen) versus routine (salaris, huur) — je weet dus welke ontbrekende bonnen werkelijk belangrijk zijn voor belastingen.

### Stap 4: Schrijf de accountante-mail

Vraag Claude:

„Schrijf een 3-paragraaf email naar mijn accountant met een samenvatting van deze maand. Voeg sleutelgetallen in en vlag de 2-3 vragen die ik hen zou stellen."

Claude schrijft:

- Paragraaf 1: Maandsamenvatting — inkomsten, uitgaven, nettowinst, en één opvallende trend
- Paragraaf 2: Afstemningsnotities — wat je hebt gevonden, wat je hebt gecorrigeerd, wat je niet zeker bent
- Paragraaf 3: Je specifieke vragen — geformuleerd als „Ik merkte X op, zou ik Y moeten doen?" niet vage verzoeken

Dit bespaart je accountant tijd en geeft je sneller, nuttiger antwoorden.

### Veel voorkomende dingen die Claude vangt

- PayPal afwikkelingsfees geboekt als inkomsten in plaats van uitgave
- Eigenaarsissueringen die bankaldo reduceerden maar niet als uitgave tonen
- Dubbele transacties uit bankfeed-import
- Abonnementen die vernieuwden maar niet werden begroot
- Betalingen ontvangen vorige maand die QuickBooks deze maand registreerde (accrual vs. cash timing)

### Maandelijks ritme

Voer deze skill in de eerste 3 werkdagen na maandafsluiting uit. Zet 60-90 minuten opzij de eerste keer, 30-45 minuten eenmaal je een routine hebt. Gebruik de output rechtstreeks voor je accountantmeeting — geen verdere voorbereiding nodig.

## Voorbeeld

Je zegt: „QuickBooks toont $34,200 in inkomsten deze maand. PayPal toont $31,800 netto na kosten. Ik heb ook $2,100 in Stripe. Mijn QuickBooks-uitgaven tonen $18,400. Ik ben niet zeker waarom getallen niet kloppen en ik heb morgenochtend een accountantoproep."

Claude stemt alle drie bronnen af:

- QuickBooks inkomsten $34,200 + Stripe $2,100 zou $36,300 totaal moeten zijn — maar PayPal netto $31,800 past niet schoon in dit beeld.
- Gatanalyse: Claude vindt dat de $2,400 PayPal-kosten niet als uitgave in QuickBooks werden geregistreerd. Toevoegen sluit dit tot $300.
- De resterende $300 wordt gemarkeerd als waarschijnlijke ongecategoriseerde terugbetaling — Claude vraagt: „Heb je in de afgelopen 30 dagen terugbetalingen uitgegeven? Controleer je PayPal-activiteit voor terugbetalingen tussen de 18e en 25e."

Claude produceert dan:
- Schoon W&V-overzicht met correcte getallen voor je accountantoproep
- Eenparagraaf afstemningsnotitie met uitleg over ontbrekende PayPal-kostenpost
- Drie vragen om op te brengen bij je accountant: hoe de terugbetaling categoriseren, of de eigenaarstrekking van de 22e een post nodig heeft, en of de $640 apparatuuraankoop voor Section 179 kwalificeert

Je gaat naar je accountantmeeting met alles georganiseerd. Het gesprek duurt 20 minuten in plaats van een uur.
