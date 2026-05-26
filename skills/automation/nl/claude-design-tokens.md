# Claude Design Token-beheer

## Wanneer activeren

- U staat op het punt een Claude Design-sessie op Claude Pro of Max te starten en wilt het tokengebruik vóór het openen van de tool plannen
- U hebt tokenlimieten halverwege een sessie bereikt en heeft herstelstrategieën nodig om het werk voort te zetten
- U bouwt voor een team en moet het collectieve gebruik over meerdere leden optimaliseren die een plan delen
- U plant een reeks gerelateerde ontwerpprojecten (dashboard + landingspagina + pitchdeck) en moet deze efficiënt sequenceren

## Wanneer NIET gebruiken

- U hebt Claude Max 20× — tokendruk is minimaal op dit niveau; concentreer u in plaats daarvan op outputkwaliteit
- U voert een eenmalige verkenning uit die u niet hoeft te bewaren of aan iemand anders door te geven
- U hebt uw ontwerpsysteem al gebouwd en gestabiliseerd — de meeste onderstaande strategieën gelden tijdens setup en actieve productie, niet onderhoud

## Instructies

### Strategie 1: Design System ROI — Bouw voordat u bouwt

De investering met het grootste hefboomeffect is Sessie 0: bouw het volledige ontwerpsysteem voordat u reeel projectwerk aanraakt.

Kosten: aanzienlijke upfront tokenausgave, meestal een volledige sessie.

Opbrengst: elke volgende sessie erft automatisch merk. Geen correctiecycli. Geen hersteming halverwege sessie. Geen tokens verspild om Claude vertrouwd te maken met kleuren, typografie of afstanden die u al hebt gedefinieerd.

Sessie 0 setup protocol:

1. Upload de codebase (of een representatieve componentsnapsho) samen met afgewerkte productschermafbeeldingen en merkbestanden (logo, merkrichtlijnen PDF indien beschikbaar).
2. Vraag Claude kleurtokens, typografieschaal, afstandssysteem, randjournaalafspraken en componentpatronen uit wat het ziet te extraheren.
3. Vraag Claude elke token semantisch te noemen, niet beschrijvend — `color-primary` niet `color-blue`, `spacing-section` niet `spacing-48px`.
4. Exporteer het resultaat als een tokendocument dat u aan het begin van elke toekomstige sessie plakt. Dit is uw sessieprimer — twee alinea's die Claude volledige visuele context zonder hernieuwd uploaden geven.

Zonder Sessie 0 begint elke projectsessie met een belasting: Claude raadt de merkintentie, u corrigeert deze, tokens worden besteed aan herstel in plaats van output.

### Strategie 2: Het Tweaks-panel — Uw gratis laag

De minst gebruikte functie in Claude Design. Typografie-, kleur-, afstands- en layoutaanpassingen in het Tweaks-panel verbruiken nul chattokens. Nul.

Werkstroom:

1. Genereer een basisontwerp met een prompt.
2. Voordat u nog een prompt verzendt, besteed 15-20 minuten in het Tweaks-panel — pas lettergroottes aan, verkort afstanden, verschuif kleuren naar het merk.
3. Keer alleen naar chat terug als Tweaks niet kan bereiken wat u nodig hebt (structurele layoutwijzigingen, nieuwe componenten, inhoudsherzieningen).

Geschatte impact: 30-40% minder prompts per sessie, wat zich rechtstreeks vertaalt in minder zware tokenturnen.

De val om te vermijden: prompts voor kleine visuele aanpassingen (« maak de kop iets groter », « verklein de vulling op de kaart ») die het Tweaks-panel onmiddellijk afhandelt. Elke vage aanpassingsprompt die u vermijdt, is een correctiecyclus waarin u nooit terechtkomt.

### Strategie 3: Dichte batchprompts

Vage prompts genereren correctieketens. Een enkele vage aanvraag wordt vijf aanvragen: eerste output, uw correctie, Claudes poging, nog een correctie, uiteindelijke output. Vijf aanvragen kosten vijf tot tien keer de tokens van één dichte aanvraag.

Structuur voor een dichte batchprompt:

- Wat verandert: noem 3-5 specifieke wijzigingen in één alinea op
- Wat blijft vast: verankert expliciet alles wat niet mag bewegen (« zijbalk nav behouden, hero-hoogte behouden, alle typografie ongewijzigd behouden »)
- Succescriteria: beschrijf hoe het resultaat eruit moet zien wanneer het correct is
- Expliciete vermijdingen: noem antipatronen waar Claude naar toe zou kunnen drijven (« niet kaartenzwaar, geen serifkoppen, geen verloopachtergronden »)

Dichte eerste concepten slagen ongeveer 66% van de tijd bij de eerste poging. Vage prompts splitsen in 5 of meer correctieaanvragen met hoge frequentie.

Schrijf uw prompt in een teksteditor voordat u deze plakt. Als het minder dan 30 seconden duurt om te schrijven, is het waarschijnlijk te vaag.

### Strategie 4: Sessieresetstartgrens

Lange sessies stapelen contextoverhead op. Bij elke aanvraag leest Claude de volledige gespreksgeschiedenis opnieuw. Bij aanvraag 15 betaalt u een groeiende contextbelasting voor elke prompt, en de outputkwaliteit verslechtert zich meestal naarmate de sessie aan coherentie verliest.

Herinitialiseren wanneer een van deze voorwaarden waar is:

- U schakelt van de ene onverwante taak naar een ander (dashboard voltooid, landingspagina wordt gestart)
- De sessie heeft 10-12 prompts voorbijgegaan
- Outputkwaliteit verslechtert zichtbaar — componenten gaan van merk af, Claude negeert beperkingen die u eerder hebt ingesteld

Resetprocedure:

1. Schrijf een 2-zins sessieprimer: wat is het ontwerpsysteem (kleuren, typografie, sleutelbeperkingen) en wat bouwt u nu.
2. Open een verse sessie. Plak de primer als uw eerste bericht.
3. Ga verder waar u bent gebleven.

Dezelfde outputkwaliteit. Aanzienlijk lagere tokenkosten per aanvraag. Geen contextoverhead.

### Strategie 5: Afbeeldingsuploadeconomie

Afbeeldingsuploads zijn het duurste invoertype in Claude Design-sessies. Gebruik ze opzettelijk.

Wanneer afbeeldingen uploaden:

- Afgewerkte productschermafbeeldingen tijdens Sessie 0 setup — niet onderhandelbaar. Claude leert meer van het zien van een echt product dan van het lezen van specificatiedocumenten. Dit is de ene plek waar uploadkosten duidelijk ROI hebben.
- Referentieschermafbeeldingen wanneer u Claude nodig hebt om een specifieke visuele behandeling aan te passen die deze niet uit beschrijving kan afleiden.

Wanneer in plaats daarvan tekst te gebruiken:

- Ruwe schetsen en wireframes — beschrijf de indeling in tekst. « Drie-kolommengrid, pictogram links, kop- en tekst rechts, geen afbeeldingen » is net zo effectief als een schetsupload en kost een fractie van de tokens.
- Layoutconcepten — ruimtelijke relaties zijn beschrijfbaar. Reserveer uploads voor visuele behandelingen (kleur, textuur, illustratiestijl) die tekst niet kan vastleggen.

Als u een schets uploadt om een indeling uit te leggen, schrijft u in plaats daarvan de indelingsbeschrijving.

### Strategie voor abonnementsniveau

**Pro-gebruikers** — behandel Claude Design als geplande productiebewerkingen, niet als sandbox. Elke sessie moet een gedefinieerd outputdoel hebben voordat u het gereedschap opent. Ontwerpsysteemsetup in Sessie 0 is verplicht voordat u een echt project start. Gebruik het Tweaks-panel aggressief. Budgetprompts per sessie voordat u start.

**Max 5×** — matige zorgvuldigheid is nog steeds gerechtvaardigd. Gebruik het Tweaks-panel eerst voordat u een prompt maakt. Batch gerelateerde wijzigingen. Sessies herstellen bij schakelen van grote taken. U hebt meer ruimte dan Pro, maar niet onbeperkt.

**Max 20×** — tokendruk is minimaal. Concentreer u volledig op outputkwaliteit: langere prompts met meer detail, meer iteraties om de juiste visuele behandeling te krijgen. De bovenstaande strategieën produceren nog steeds betere outputs, maar u wordt niet gestraft voor het overslaan.

## Voorbeeld

Een Pro-gebruiker plant drie gerelateerde projecten: een productdashboard, een marketinglandingspagina en een pitchdeck. Alle drie moeten merkenconsistentie delen.

**Verkeerde volgorde** — start het dashboard rechtstreeks, krijg merkdrift, besteed 30% van de sessie aan het corrigeren van kleuren en typografie, exporteer, start de landingspagina, herhaal dezelfde correcties.

**Juiste volgorde:**

Sessie 0 — Ontwerpsysteemsetup. Upload productschermafbeeldingen + merkbestanden. Extraheer volledige tokenset. Exporteer een 200-woord sessieprimer (kleuren, typografie, afstanden, componentafspraken). Geschatte tokenkosten: één volledige sessie.

Sessie 1 — Dashboard. Plak sessieprimer als eerste bericht. Schrijf één dichte prompt voor volledige indeling: zijbalk nav, gegevenstabel, statkaarten, koptekst. Besteed 20 minuten aan Tweaks om afstanden en typografie aan te passen voordat u opnieuw prompt. Gebruik 2-3 chttprompts totaal. Sessie herstellen bij overgang naar volgende sectie.

Sessie 2 — Landingspagina. Dezelfde primer. Één dichte prompt voor hero, functiesectie en CTA. Tweaks voor fijnafstemming. Maximum 3-4 chttprompts.

Sessie 3 — Pitchdeck. Dezelfde primer. Één dichte prompt per diapositiviagroep (introdyia's, productdia's, financiën, sluiting). Geen afbeeldingladen — beschrijf diapositivlay-outs in tekst.

Totale tokenkosten met deze volgorde: aanzienlijk lager dan drie niet-sequenceerde sessies, met consistente merkoutput over alle drie projecten.
