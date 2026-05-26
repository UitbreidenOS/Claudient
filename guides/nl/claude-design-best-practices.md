# Claude Design — Aanbevolen procedures in productie

Deze gids behandelt wat de officiële documentatie niet doet: beproefde patronen uit productiegebruik in de praktijk. Claude Design draait op Opus 4.7, het meest capabele en meest token-dure model in de Claude-familie. Dit verandert hoe je elke sessie zou moeten benaderen.

---

## Token-economie

### Het probleem

Claude Design implementeert Opus 4.7 voor elke generatie. Opus 4.7 is geen licht model — het is dezelfde modelklasse die wordt gebruikt voor complex redeneren en langdurend documentwerk. In de praktijk:

- 50-58% van het wekelijkse quotum van een Pro-plan verdwijnt na twee matig complexe sessies
- Een revisor die drie variaties van een landingspagina bouwt, bereikt 80% van zijn wekelijkse toewijzing in 25 minuten
- Een sessie met verkenning van vijf visuele richtingen kan net zoveel kosten als een volledige middag Claude Code-werk

Dit is geen klacht — Opus 4.7 produceert materieel betere eerste concepten dan kleinere modellen, en de tijdbesparingen zijn echt. Maar Claude Design als een gratis schetsblok behandelen vernietigt uw quotum voor het einde van de week.

### De vijf strategieën die echt werken

**Strategie 1: Bouw eenmaal een ontwerpsysteem, gebruik het op elk project.**

Dit is de actie met de hoogste leverage die u in Claude Design kunt uitvoeren. Een ontwerpsysteem-setup sessie is upfront duur — u betaalt ervoor dat Opus 4.7 uw codebase leest, uw tokens extraheert en uw component-conventies begrijpt. Maar elke volgende projectsessie omzeilt dit inferentiewerk volledig. Het model kent al uw kleurenpalet, uw typescale, uw spacing rhythme en uw componentvocabulaire. Zonder dit start elke sessie van nul af, en Claude Design valt terug op zijn standaards — die onmiddellijk herkenbaar zijn als generieke Claude-output.

De eenmalige kosten besparen tokens op elk toekomstig project. Als u meer dan twee projecten in Claude Design bouwt, betaalt deze investering zich terug tegen de derde sessie.

**Strategie 2: Gebruik het Tweaks-paneel voordat u prompts schrijft.**

Het Tweaks-paneel — typografieschuiven, kleurregelaars, spacing- en layout-toggles — verbruikt geen chat-tokens. Dit is de meest ondergebruikte mogelijkheid in Claude Design. Een veelgebruikte fout is het prompen van "maak de kop groter" of "vergroot de padding tussen secties" wanneer deze exacte aanpassingen als gratis panelregelaars beschikbaar zijn.

Voordat u een verfijningsprompt schrijft, put het Tweaks-paneel uit. Als de aanpassing daar is, gebruik deze. Reserveer chat-prompts voor structurele wijzigingen, inhoudswijzigingen en dingen die het paneel niet kan doen — nieuwe componenten, layout-reorganisatie, variant-verkenning.

**Strategie 3: Schrijf dichte, gebundelde prompts.**

Drie gerelateerde verzoeken in één alinea kosten ongeveer hetzelfde als één verzoek. Drie afzonderlijke berichten kosten driemaal zoveel en elk voegt contextoverhead toe aan volgende berichten.

In plaats van:
```
Maak het heldensection groter.
```
```
Verander ook de CTA naar onze primaire blauw.
```
```
En voeg een ondertitel onder de hoofdkop toe.
```

Schrijf:
```
Heldensection: verhoog de verticale padding om de kop meer ruimte te geven,
verander de CTA-knop naar primair merkblauw (#0057FF), en voeg een 16px ondertitellijn
toe onder de hoofd-H1 die het product in één zin beschrijft.
```

Deze aanpak vermindert ook de kans dat Claude Design een instructie die een vorige tegenstrijdig is, verkeerd interpreteert — wanneer de volledige bedoeling in één pass zichtbaar is, lost het model conflicten zelf op.

**Strategie 4: Zet sessies proactief opnieuw in.**

Een Claude Design-sessie verzamelt context terwijl deze wordt uitgevoerd. Vroege berichten, afgewezen variaties en correctiecycli blijven allemaal in het contextvenster. Bij sessiemelding 15 betaalt u ervoor om al deze context bij elke generatie opnieuw te verwerken — zelfs als de vroege iteraties niet relevant zijn voor uw huidige doel.

Wanneer u een richting hebt gevalideerd en een specifiek onderdeel of sectie verder wilt verfijnen, start u een frisse sessie. Breng een strak overzicht mee van wat u hebt ingesteld (uw ontwerpsysteembestand, een schermafbeelding van de goedgekeurde richting en een alinea lang briefing). De frisse sessie kost minder per generatie en produceert schoner output omdat het model niet rond een rommelige geschiedenis werkt.

**Strategie 5: Gebruik externe tools om te schetsen voordat u uploadt.**

Afbeeldingen uploaden zijn duur qua context. Een ruwe layoutschets van Google Stitch, een draadframe in elk willekeurig hulpmiddel, of zelfs een platte tekst ASCII-art layoutbeschrijving geeft Claude Design ruimtelijke intentie zonder de kosten van het verwerken van een afbeelding met hoge resolutie in het eerste bericht.

Beschrijf de structuur in tekst: "Driekoloms raster op desktop, enkele kolom op mobiel. Linkerkolom: logo + nav. Midden: heldenopschrift + CTA. Rechts: productschermafbeelding." Dit levert vaak een beter eerste concept op dan een onduidelijk geüpload beeld en kost een fractie van de context.

---

## De "Claude-esthetiek" vermijden

### Hoe het eruit ziet

Zonder ontwerpbeperkingen defaultt Opus 4.7, getraind op een groot corpus webdesign-standaards, naar een herkenbare visuele vingerafdruk: serieflanden gekoppeld aan voetekst zonder-serif, kaartengevoelige lay-outs met subtiele druppelschaduwen, gekleurde linkerzijaccentbalkjes op secties en een gedempte pastelkleurenpalet. Het is competent. Het is ook onmiddellijk herkenbaar als door AI gegenereerde output voor iedereen die deze tools langer dan een week heeft gebruikt.

Deze standaard-esthetiek is niet verkeerd — het is gewoon generiek. Als generiek voor uw project werkt, sla dit gedeelte over. Als u distinctieve output nodig hebt, vereist de standaard actieve onderdrukking.

### Technieken die werken

**Upload voltooide productschermafbeeldingen, niet merkspecificaties.**

Merkrichtlijnen beschrijven regels. Voltooide schermafbeeldingen tonen visuele resultaten. Claude Design leert meer van het zien hoe uw merk in productie werkelijk eruit ziet dan van het lezen van typografische hiërarchieregels. Upload een schermafbeelding van uw live homepage, uw meest gepolijste marketinge-mail of uw meest recente pitch-deckslide. Dit geeft het model concreet visueel bewijs waarvan uw merk in de praktijk afkomt.

**Verwijs naar culturele esthetica met specificiteit.**

Generieke esthetische verwijzingen ("modern", "schoon", "professioneel") produceren Claudes interpretatie van deze termen, wat teruggaat naar de standaard-esthetiek. Specifieke culturele esthetica geven het model een concreet visueel vocabulaire om mee te werken:

- "Zwitserse redactionele vormgeving — Neue Haas Grotesk, strakke leading, sterke raster, hoog contrast, geen decoratieve elementen"
- "1980s brutalistische print — dikke zwarte randen, industriële lettertypen, dichte informatiehiërarchie"
- "Solarpunk — warme aardetinten, organische curves, gemeenschapsgericht visueel taal"
- "Scandinavisch minimalisme — gedempte natuurlijke palet, royale witruimte, functioneel boven decoratief"

Deze verwijzingen dwingen het model naar een specifieke visuele traditie. De output heeft mogelijk verfijning nodig, maar het start ergens distinctiefs.

**Wijs standaarden in uw briefing expliciet af.**

Verklaar wat u niet wilt net zo duidelijk als wat u wilt. Voeg een beperkingsblok toe aan elke eerste prompt:

```
Gebruik niet: kaartlay-outs, gekleurde accentbalken, pastelachtergrondenserief/sans-serif-
koppelingen, of gecentreerde heldengedeelten met een enkele CTA. Maak keuzes
die zich specifiek voelen voor de context van dit product, niet standaard SaaS-startup-instellingen.
```

Negatiebeperkingen zijn niet defensief — ze dragen gewicht. Zonder deze vult het model onbeperkte beslissingen met standaarden.

**Vraag expliciet om onderscheidende, contextspecifieke keuzes.**

Instrueer het model om na te denken over de productcontext wanneer het visuele keuzes maakt. "Kies typografie die weerspiegelt wat dit product doet — een hulpmiddel voor ontwikkelaars, een financieel dashboard, een consumer-fitnessapp — niet wat generieke designsites aanbevelen." Dit promptpatroon produceert output die probeert contextmatig geschikt te zijn in plaats van esthetisch veilig.

---

## Promptingtechnieken

### Wat echt werkt

**Dichte prompts van één alinea produceren ongeveer 66% van de tijd een bruikbaar eerste concept.** De andere 34% vereist één gerichte verfijnincyclusie. Mehersalternatieven vage iteratie — "maak het beter", "probeer iets anders", "ik hou hier niet van" — produceert middelmatige output en dure context.

**Het drie-versiepatroon.** Vraag vooraf om variaties in plaats van sequentiële iteratie:

```
Genereer drie versies van dit landingspagina-heldensection. Elke versie moet
een betekenisvol verschillende visuele richting aannemen — verschillende layoutstructuur, niet
alleen verschillende kleuren. Label ze A, B en C.
```

Claude Design rendert alle drie in één pass. U identificeert vervolgens de beste elementen van elk en stelt een synthese samen:

```
Pas de typografie en kopaf-hiërarchie van versie A toe op de layoutstructuur van versie B.
Behoud de CTA-knopbehandeling van versie C.
```

Dit is sneller en goedkoper dan sequentiële iteratie, en het produceert betere resultaten omdat u van een reeks opties werkt in plaats van gradueel één richting te duwen.

**Inline-opmerkingen voor gerichte precisie.** Klik op een element, voeg een opmerking toe, beschrijf precies welke wijzigingen alleen voor dat element. Dit beperkt het generatiebereik — het model weet dat u niet om een volledige herontwerp vraagt. Gebruik dit voor typografieaanpassingen, kleurcorrecties, spacingcorrecties en kopiewijzigingen.

Bekend gedrag: inline-opmerkingen verdwijnen soms na generatie van de interface. Als dit gebeurt, plak dan de opmerking inhoud in de chat als een gerichte vervolgprompt in plaats van opnieuw te beginnen.

**Tekenmodus voor layoutherstructurering.** Wanneer u grote secties moet verplaatsen — verplaats de zijbalk van links naar rechts, verplaats de nav van boven naar beneden, maak een split-screen-lay-out — gebruik de Tekenmodus om ruimtelijke intentie direct aan te geven. Tekenen is sneller dan ruimtelijke relaties in tekst te beschrijven en produceert nauwkeurigere layoutwijzigingen dan chatprompts voor structurele bewegingen.

**Apparaatvoerview-toggle.** Schakel op elk moment tussen telefoon-, tablet- en desktopweergaven. Dit kost geen tokens. Voordat u responsieve fixes promtet, controleert u of het probleem daadwerkelijk zichtbaar is in het huidige onderbrekingspunt — veel responsieve problemen die op het bureaublad ernstig lijken, worden al op mobiel verwerkt, of omgekeerd.

### Wat u in uw eerste briefing moet opgeven

Elke sterke eerste prompt bevat:

- **Succescriteria**: hoe ziet "klaar" eruit? ("Het heldensection moet de productwaardepropositie communiceren zonder dat de gebruiker hoeft te schuiven")
- **Outputbeperkingen**: formaat, afmetingen, componentaantal, inhoudslengte
- **Wat blijft vast**: "Behoud de navigatiestructuur exact zoals beschreven — voeg geen navigatie-items toe of verwijder deze niet"
- **Wat kan veranderen**: "Kleurenpalet, typografie, spacing en sectievolgorde zijn allemaal open"
- **Een of twee onderhandelbaar**: "De primaire CTA moet op desktop boven de vouw zichtbaar zijn"

### Wat te vermijden

- Subjectieve bijvoeglijke naamwoorden zonder referenten: "vorstelijker", "voelt betrouwbaar", "ziet er modern uit" — allemaal geïnterpreteerd door de priors van het model
- Tegenstrijdige beperkingen zonder oplossing: "minimaal maar informatie-rijkelijk" — specificeer welke wint wanneer ze conflicteren
- Open-ended structuuraanvragen laat in een sessie: na 10 berichten verfijning een volledige layoutherstructurering aanvragen produceert dure en vaak inconsistente output
- Correctielussen zonder duidelijke richting: "ik hou hier niet van" zonder te specificeren wat er mis is verspilt een generatiepass

---

## Sessiebeheer

Behandel elke Claude Design-sessie als geplande productiewerkingen, niet als open-ended exploratie. De tokenkosten maken ongestructureerde sessies duur. Sessies met duidelijk bereik en voorbereiding produceren betere output tegen lagere kosten.

### Voor de sessie

Lijst elk onderdeel of elke sectie op die u in deze sessie moet produceren. Schrijf ze op. Batch gerelateerde onderdelen in één prompt waar mogelijk — een kaartonderdeel en de lege staat ervan zijn één prompt, niet twee.

Bepaal welke activa u uploadt. Ontwerpsysteembestand, referentieschermafbeeldingen, codebase-tokenbestand — verzamel deze voordat u begint. Uploaden halverwege de sessie voegt contextoverhead toe.

Bepaal de output die u moet valideren. U hebt geen pixel-perfecte output nodig om te bevestigen dat u in de juiste richting gaat. Ken het minimum dat u vertelt dat de aanpak werkt, en stop met verfijnen wanneer u dit bereikt.

### Tijdens de sessie

Gebruik eerst het Tweaks-paneel. Altijd. Controleer of de aanpassing die u wilt beschikbaar is als een gratis schuifregelaar voordat u een prompt schrijft.

Batchgerelateerde wijzigingen. Als u drie verfijningen in de wachtrij hebt, schrijf deze allemaal in één bericht.

Controleer uw sessilengte. Na 10-12 berichtuitwisselingen kunt u zich afvragen of een frisse sessie sneller zou zijn. Als u een fundamenteel nieuw onderdeel of richting genereert, zal het vrijwel zeker zijn.

### Wanneer exporteren

Exporteren wanneer:
- De visuele richting is gevalideerd (stakeholderreview of zelfbeoordeling heeft de aanpak bevestigd)
- Core layout en informatiehiërarchie zijn ingesteld
- De onderdeelstructuur is duidelijk genoeg voor Claude Code om over na te denken

Niet exporteren wanneer:
- U verkendt nog steeds fundamenteel verschillende richtingen
- Grote structurele wijzigingen blijven
- U maakt iteratieve verfijningen die goedkoper rechtstreeks in Claude Code kunnen worden gedaan

De overdracht pakket is geen pixel-perfect specificatie. Claude Code zal dit aanpassen aan responsive gedrag, onderdeelbibliotheekenconventies en productiebeperking. Enige afwijking van het visuele ontwerp wordt verwacht en is correct. Behandel de bundel als een sterke briefing, niet als een pixel-perfecte specificatie.

### Na export

Niet opnieuw exporteren nadat implementatie begint. Wijzigingen na overdracht gebeuren rechtstreeks in Claude Code — herexport creëert een tweede waarheidssbron en breekt de ontwerp-naar-code relatie. Als een groot ontwerperchange na overdracht nodig is, behandel het als een nieuwe ontwerpsessie voor dat specifieke onderdeel, niet een volledige her-export.

---

## Ontwerpsysteemsetup

Dit gedeelte verdient zijn eigen behandeling omdat het de enkele actie is die waarschijnlijk zowel outputkwaliteit als tokenefficasity voor teams die Claude Design over meerdere projecten gebruiken, zal verbeteren.

### Waarom het belangrijk is

Zonder een ontwerpsysteem in Claude Design produceert elke sessie output gekalibreerd op generieke webdesignconventies. Het model kent uw kleurenpalet, uw typescale, uw componentvocabulaire of uw spacingritme niet. Het standaard ingesteld op zijn getrainde esthetiek. U besteedt tokens om het op elke sessie naar uw merk te corrigeren.

Met een ontwerpsysteem begint elke sessie op-merk. Het model kent uw tokens en kan deze zonder correctie toepassen. Verfijningspassages richten zich op lay-out en inhoud in plaats van merkafstemminging.

### Wat te uploaden

Upload in deze prioriteitsvolgorde:

1. Uw `tokens.json` of CSS custom properties-bestand — direct machine-readable token-definities zijn de hoogste-trouweninvoer
2. Uw `tailwind.config.js` of equivalent themaconfiguratie — geeft Claude Design uw hulpprogrammaklassencartografering en onderbrekingspunten
3. Voltooide schermafbeeldingen van uw live product of meest recente release — visueel bewijs wat uw merk in de praktijk oplevert
4. Uw Storybook-URL of onderdeel-schermafbeeldingen — stelt vast welke onderdelen al bestaan en hoe zij eruit zien
5. Uw merkpdf of stijlgids — voor toon, loggebruik en typografische hiërarchieregels

### Wat Claude Design extraheert

Uit deze invoeren extraheert Claude Design:
- Kleurentokens met semantische naamgeving (primair, secundair, destructief, stompzinnig, enz.)
- Typografieschaal (grootteram, gewichtsconventies, regelhogtregels)
- Spacingsysteem (uw basiseenheid, gemeenschappelijke spacingwaarden)
- Onderdeelconventies (bestaande onderdeelnamen, varianten, staten)
- Raster- en lay-outpatronen (aantal kolommen, stroombreedtes, max-widthbeperkingen)

### De setup valideren

Voordat u het ontwerpsysteem in productiesessies gebruikt, genereert u één testonderdeel — iets eenvoudig en goed gedefinieerd, zoals een knop in alle staten of een kaartonderdeel. Controleer of de output uw merkentokens en onderdeelconventies nauwkeurig weerspiegelt. Indien niet, bepaal wat van uw uploads ontbreekt en verfijn de setup voordat u verdergaat.

Validatie kost tokens. Budget voor één testsessie per ontwerpsysteemsetup.

### Onderhoud

Wanneer uw ontwerpsysteem evolueert — nieuwe kleurentokens, nieuwe onderdeelpatronen, bijgewerkte typografie — werk uw Claude Design-setup-bestanden bij zodat deze overeenkomen. Een verouderde ontwerpsysteemsetup produceert output die in de loop van de tijd afwijkt van uw huidige productieontwerp.

---

## Variantverkenning

### Vraag vooraf om varianten

Om drie varianten aan te vragen in de eerste prompt kost ongeveer hetzelfde als één aanvraag — Claude Design rendert alle drie in één generatiepass. Sequentiële variantverkenning (genereer er één, wijs af, genereer een ander) kost driemaal zoveel en verzamelt contextoverhead.

### Varianten mengen

Na drie varianten beoordeeld, gebruik het Tweaks-paneel en gerichte chatprompts om functies van verschillende versies te mengen. Dit is gratis voor paneel-aanpasbare eigenschappen en goedkoop voor chat-aangedreven wijzigingen omdat het bereik smal en de bedoeling duidelijk is.

Documenteer wat u van elke versie neemt voordat u wijzigingen aanbrengt: "Kleurbehandeling van versie A, layoutstructuur van versie B, CTA-hiërarchie van versie C." Deze briefing is ook nuttig voor de aantekening van het overdrachtetpakket.

### Document voor sluiten

Voordat u een sessie beëindigt, noot:
- Welke richting werd geselecteerd en waarom
- Wat werd afgewezen en waarom
- Welke verfijningen blijven voor de volgende sessie
- Alle ontwerpbeslissingen die stakeholderreview nodig hebben

Deze documentatie leeft buiten Claude Design (een notitie, een projectbestand, een briefing). Claude Design-sessigeschiedenis is geen betrouwbare ontwerpverslagen.

---

## Echte productiviteitsgegevens

Communityonderzoek onder freelancers, agentschappen en productteams die Claude Design gebruiken in 2025-2026 produceerde deze benchmarks. Deze aantallen variëren per projectcomplexiteit en ontwerperervaring, maar de richtinggevallen patronen zijn consistent.

| Taak | Zonder Claude Design | Met Claude Design | Besparingen |
|------|----------------------|-------------------|---------|
| Productprototype (3-5 schermen) | 14 uur | 3,5 uur | 75% |
| Freelance projectlevering | Basislijn | 3,8x sneller | — |
| Agentschap client handoff voorbereiding | Basislijn | 62% sneller | — |
| Landingspagina (idee tot inzetbare HTML) | Meerdere dagen | 45 minuten | — |
| Pitch deck (volledige presentatie) | 4-6 uur | Minder dan 30 minuten | — |
| Mobiele app-flow (3-5 schermen) | 1-2 dagen | 1-2 uur | — |

Deze aantallen vertegenwoordigen tijdbesparingen, niet kwaliteitsgelikheid. Claude Design-output vereist typisch implementatiewerk in Claude Code voor productieparaatheid. De besparingen zijn in exploratie, afstemming en gevalideerde richting — niet voltooide productactiva.

---

## Wanneer Claude Design faalt

Het begrijpen van de uitvalmodi voordat u deze raakt bespaart tijd en quotum.

**Afwezigheid van een ontwerpsysteem.** Dit is de meest voorkomende uitvalmodus. Zonder een ontwerpsysteem kan Claude Design geen op-merkoutput produceren. Elke sessie vereist volledige restyle-correcties. Teams die ontwerpsysteemsetup overslaan, besteden hun sessie-tokens aan merkbepaling in plaats van ontwerpverkenning. Als u op-merkoutput nodig hebt en geen ontwerpsysteem kunt instellen, is Claude Design niet het juiste hulpmiddel voor dat project.

**Te complexe briefs met tegenstrijdige beperkingen.** Een brief met 10+ specifieke vereisten die elkaar tegenspreken, produceert output die geen enkele ervan vervult. Het model lost tegenstrijdigheden op volgens de training priors, niet uw bedoeling. Als uw brief meer dan 6-7 harde beperkingen heeft, prioritiseer deze expliciet en laat de laagste prioriteit uit de eerste prompt vallen.

**Datavisualisatie.** Claude Design prioriteert esthetische kwaliteit boven datagebruikbaarheid in grafiek- en grafiekoutput. Een staafgrafiek ziet er prachtig uit. De aslabels kunnen op schaal onleesbaar zijn, de kleurkeuzes kunnen ontoegankelijk zijn en de gegevens-naar-inkverhouding kan slecht zijn. Als u gegevenvisualisatie genereert, voeg u expliciete correctieprompts toe: "Prioritiseer leesbaarheid en toegankelijkheid boven esthetiek. Zorg ervoor dat alle labels bij deze resolutie leesbaar zijn."

**Aangepaste illustraties.** Claude Design is geen illustratietool. Het kan illustratieachtige elementen plaatsen en illustratieconcepten suggereren, maar nauwkeurig aangepast illustratiewerk — aangepaste pictogrammen, merkmascotte's, complexe infografics — vereist een echt ontwerptool. Gebruik Claude Design om de illustratiebriefing op te geven, voer vervolgens uit in Figma, Illustrator of een gespecialiseerd AI-illustratietool.

**Multiplayer- en team-beoordelingwerkstromen.** Claude Design heeft geen samenwerking in realtime. Eén persoon runt de sessie. Als uw team gelijktijdig bewerken, thread opmerking, versiegeschiedenis toegankelijk voor meerdere stakeholders of Dev Mode-metingen nodig heeft — gebruik Figma. Claude Design concurreert niet met Figma bij samenwerking.

---

## Overdracht naar Claude Code — het juiste moment

De overdachtbeslissing is waar het meeste tijd verloren gaat. Teams exporteren ofwel te vroeg (voordat de richting duidelijk is, veroorzaakt rework) of te laat (besteed tokens aan pixel-perfectionering in Claude Design wanneer Claude Code dit in minuten zou kunnen doen).

### Exporteren wanneer deze waarden waar zijn

- **Visuele richting gevalideerd**: ten minste een stakeholder (of u, voor solo-projecten) heeft bevestigd dat de aanpak correct is
- **Core layout ingesteld**: de informatiehiërarchie, sectiestructuur en primaire gebruikersstroom zijn duidelijk
- **Onderdeelstructuur duidelijk**: Claude Code kan bepalen welke onderdelen bestaan en hoe zij zich verhouden
- **Inhoud dicht genoeg**: plaatshoudersinhoud is prima; de structuur en relatieve grootte van inhoudsgebieden zijn ingesteld

### Niet exporteren wanneer

- U verkendt nog steeds of een fundamenteel ander approach beter is
- Het ontwerp heeft grote onopgeloste structuurvragen ("Zou dit een zijbalk of een top-nav moeten zijn?" is een structuurvraag — los op voordat u overdraagt)
- U maakt kleine iteratieve verfijningen die Claude Code rechtstreeks goedkoper afhandelt

### Wat gebeurt er bij overdracht

Het overdracht bundelpakket bevat layoutspecificaties, ontwerpentokens, onderdeelannnoaties en notities met responsief onderbrekingspunt. Claude Code gebruikt dit om het ontwerp te implementeren — maar het zal de lay-out aanpassen voor echte onderdeelbibliotheken, echt onderbrekingspuntgedrag en productiebeperking. Enige afwijking van het visuele ontwerp wordt verwacht en is correct. Behandel de bundel als een sterke briefing, niet als een pixel-perfecte specificatie.

Na overdacht begint, wijzigen in Claude Code. Niet opnieuw exporteren en overdragen voor incrementele wijzigingen — dit creëert twee waarheidssbronnen en maakt implementatie moeilijker te onderhouden.

---

## Checklisten

### Voor uw eerste sessie

- [ ] Ontwerpsysteembestanden samengevoegd: `tokens.json` of CSS-variabelen, `tailwind.config.js` of themaconfiguratie
- [ ] Referentieschermafbeeldingen verzameld: live product, meest recente ontwerpen, voorbeelden van sleutelmerk
- [ ] Ontwerpsysteemsetup sessie voltooid en gevalideerd met één testonderdeel
- [ ] Sessiebereik gedefinieerd: lijst van onderdelen of schermen die deze sessie zal produceren
- [ ] Briefing geschreven: succescriteria, outputbeperkingen, onderhandelbaar, wat kan veranderen
- [ ] Externe layoutschets voltooid (optioneel): ruwe structuur beschreven in tekst of schets in Google Stitch

### Per-sessielijst

- [ ] Tweaks-paneel gecontroleerd voordat verfijningsprompts schrijft
- [ ] Verzoeken gebundeld: gerelateerde wijzigingen gecombineerd in afzonderlijke berichten
- [ ] Drie-versie-verkenning gebruikt voor eerste concept van nieuwe onderdelen
- [ ] Sessilengte gecontroleerd: frisse sessie gestart als geschiedenis wordt verouderd
- [ ] Inline-opmerkingen gebruikt voor precisie op elementniveau in plaats van volledige generatieprompts
- [ ] Afgewezen richtingen gedocumenteerd (wat werd geprobeerd, waarom werd afgewezen)

### Voordat u naar Claude Code overdraagt

- [ ] Visuele richting gevalideerd (stakeholder sign-off of zelfbeoordeling voltooid)
- [ ] Core layout en informatiehiërarchie ingesteld
- [ ] Onderdeelstructuur duidelijk: wat bestaat, wat is genest, wat is zelfstandig element
- [ ] Overdracht bundel geëxporteerd en beoordeeld: bevestig dat `layout.json`, `tokens.json`, `components.md` en `preview.png` aanwezig zijn
- [ ] Implementatienotities aan bundel toegevoegd: alles wat Claude Code moet weten wat niet zichtbaar is in de layoutspecificatie
- [ ] Team geïnformeerd: iedereen die aan de codebase raakt, weet dat de overdracht aan de gang is en waar de bundel zich bevindt
