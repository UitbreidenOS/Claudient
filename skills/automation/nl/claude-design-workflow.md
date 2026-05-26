# Claude Design — End-to-End Workflows

## Wanneer activeren

- Een nieuw project starten en behoefte hebben aan een herhaalbaar ontwerp-naar-productieprocedureus in plaats van ad hoc prompts
- Een teamlid is nieuw voor Claude Design en heeft een gestructureerde aanpak nodig om verspilde sessies te vermijden
- Schakelen tussen design contexten — opstart snelheid, productteamconsistentie, design-geleid onderzoek of marketing lancering
- Bestaande Claude Design-sessies verbruiken buitensporig veel tokens zonder naar een richting te convergeren

## Wanneer NIET gebruiken

- Eenmalige wegwerp prototypes zonder downstream implementatie — sla werkstroom over, direct prompen
- Projecten waarbij Figma de bron van waarheid is en het team Figma-bestanden moet goedkeuren voordat development start — gebruik Figmas AI tools en handmatig importeren naar Claude Code
- Als pixel-perfect client-goedkeuringmockups vereist zijn voordat enige entwickling begint — Claude Design is geen Figma-vervanger voor die gate
- Wanneer een design richting al in Claude Code is vergrendeld — keer niet naar Claude Design terug; herhaal in code

## Instructies

Vier workflows omvatten de vier meest voorkomende gebruikscontexten. Elk is ontworpen om token verspilling en tijd tot productie te minimaliseren.

---

### Workflow 1: Snelle validatie (Startup / MVP)

Doel: geverifieerde UI-richting van spec tot werkingscode in minder dan zes uur, dezelfde dag.

**Fase 1 — Concept (30 minuten, één sessie)**

Open een verse Claude Design-sessie. Verstrek:
- Doelgroep (één zin)
- Kernfunctionaliteiten om te tonen (3–5 maximaal)
- Merkbeperkingen: twee hexkleuren en een lettertypehenwijzing (een Google Font naam of style descriptor zoals « geometrische sans »)

Prompt:

```
"Show 3 layout directions for [product type] targeting [audience]. Core features:
[feature 1], [feature 2], [feature 3]. Brand: primary [hex], accent [hex],
[font name or descriptor]. Show all 3 side by side."
```

Uitvoer: drie verschillende indelingsrichtingen. Besluit: kies de winrichting en noteer één of twee specifieke elementen van de anderen die het waard zijn (kleur van A, kaartbehandeling van B).

**Fase 2 — Verfijning (30 minuten, dezelfde of nieuwe sessie)**

Pas de kruisrichtingsbeslissingen toe met een specifieke instructie:

```
"Apply [element from version A] to [layout of version B]. Keep [specific element].
Change [specific element] to [target state]."
```

Gebruik het Tweaks-paneel voor spatiëring, typografiegewicht en kleurintensiteitsaanpassingen. Dit kost geen tokens. Vraag alleen om structurele wijzigingen die Tweaks niet kan verwerken.

Uitvoer: enkele verfijnde richting. Herhaal niet voorbij één verfijningsdoorvoer — perfectionism in dit stadium vertraagt productie zonder het eindproduct te verbeteren.

**Fase 3 — Overdracht naar Claude Code (onmiddellijk na richtingvergrendeling)**

Export de Claude Code bundel. Geef het aan Claude Code met het implementatiedoel:

```
"Implement this Claude Design bundle as [React with Tailwind / plain HTML+CSS /
Vue with shadcn]. Match the token values exactly. Use the layout as a reference,
not a pixel-perfect spec. Flag any deviations from the design."
```

Keer na dit moment niet naar Claude Design terug. Alle UI-herhalingen gebeuren in Claude Code tegen de werkelijke componentboom.

Resultaat: geverifieerde richting tot productiecode, dezelfde dag, minder dan zes uur.

---

### Workflow 2: Design System Foundation (Product Teams)

Doel: een herbruikbare ontwerpsysteemcontext die elke toekomstige Claude Design-sessie consistent en token-efficiënt maakt.

**Sessie 0 — System Setup (2–3 uur, voert eenmaal uit)**

Deze sessie is hoger tokengebruik en voert eenmaal uit. Behandel het als investering — het vermindert de kostenperfunctiesessie daarna met 60–70%.

Verstrek:
- Codebasis (of samenvatting van bibliotheek in gebruik — shadcn/ui, MUI, Radix, enz.)
- 5–10 schermafbeeldingen van afgewerkte productschermen met bestaande visuele taal
- Merkrichtlijndocument of schriftelijke samenvatting (kleuren, typografie, afstandprincipes, niet-do's)

Prompt:

```
"Extract the design system from these product screenshots and brand guidelines.
Identify: color tokens (primary, secondary, surface, border, text hierarchy),
typography scale (size, weight, line-height per level), spacing scale,
border radius values, and shadow tokens. Output as a JSON token file and a
summary of the component conventions (card style, button variants, input style).
Then generate a test component — a feature card — using the extracted system."
```

Valideer de testcomponent tegen een werkelijke schermafbeelding van het product. Corrigeer extractiefouten voordat u doorgaat. Zodra het systeem correct is, exporteer het tokenbestand (JSON-indeling) en sla het op:

```
project-root/
└── design-system/
    └── tokens.json       ← from Claude Design extraction
    └── system-notes.md   ← component conventions in plain text
```

Sla deze sessie op als Claude Project, zodat de ontwerpsysteemcontext in alle toekomstige ontwerpsessies aanwezig blijft zonder opnieuw uploaden.

**Per-functiesessies (na systeeminstallatie)**

Open een sessie in het Claude Project met het ontwerpsysteem. Merk en tokens zijn al in context — niet opnieuw uploaden.

Prompt voor een nieuwe functie:

```
"Design the [feature name] screen. Users need to [primary task]. Key elements:
[list]. Follow the established design system. Use existing component patterns
where they apply."
```

Tokengebruik is 60–70% lager dan een systeemonkundige sessie omdat correctiecycli worden geëlimineerd. Output zal met het bestaande product aansluiten zonder expliciete merktoepassing in elke prompt.

**Integratie met Development**

Export de Claude Code bundel per functie. De tokenwaarden in de bundel komen overeen met het tokenbestand in `design-system/tokens.json`. Als de codebase deze tokens al importeert (via CSS-variabelen of Tailwind extensie), krijgen gegenereerde componenten automatisch correcte waarden zonder handmatige mapping.

---

### Workflow 3: Exploration-First (Design-Led Teams)

Doel: teamuitlijning op designrichting voordat enige engineeringtijd wordt vastgelegd.

**Fase 1 — Brede verkenning (1–2 uur)**

Genereer een reeks richtingen in plaats van één antwoord:

```
"Show 5 directions for the [page or feature] homepage hero. Each should have a
distinct visual personality — vary layout, typography weight, and color treatment.
Label them 1–5."
```

Gebruik het Tweaks-paneel om over richtingen te mengen: « Typografie van richting 3 toepassen op lay-out van richting 1. » Documenteerbevindingen — schermafbeelding en korte notitie beschrijft wat in elk werkt (niet « ik hou hiervan » maar « groot type op donkere achtergrond leest als gezaghebbend, wat aansluit bij zakelijke koper »).

Niet herhaaldelijk in deze fase vragen om een eindantwoord te bereiken. Verkenning is de output.

**Fase 2 — Richtingsvalidatie (30 minuten)**

Selecteer de top 2–3 richtingen. Deel elk als URL van Claude Design. Verzamel stakeholder feedback in één ronde — niet een reeks asyncthread. Feedback moet specifiek zijn:

Acceptabele feedback: « Kaartafstand voelt strak op mobiel » / « Secundaire kleur lijkt op primair — ze differentiëren niet. »

Feedback om af te slaan (terug met ophelderingsvraag): « Maak het meer premium » / « Het moet meer pop. »

Pas structurele feedback via prompts toe. Pas visuele tuningfeedback via Tweaks-paneel toe. Voltooi deze fase in één zit.

**Fase 3 — Productieppad**

Na richtingsvalidatie kiest u één pad en mengt u ze niet:

| Team tooling | Pad |
|---|---|
| Figma als bron van waarheid | Screenshot geverifieerde richting, handmatig in Figma opnieuw maken (of Canva als brug voor niet-Figma teams) |
| Claude Code als implementatielaag | Claude Code bundel exporteren, implementeren |
| Direct publiceren (marketingpagina's) | Standalone HTML exporteren, implementeren |

Besteed geen extra tijd aan Claude Design na richtingsvalidatie. De waarde van deze workflow is de uitlijning die het oplevert — niet de pixelkwaliteit van Claude Design output.

---

### Workflow 4: Landing Page Generation (Marketing Teams / Solo Builders)

Doel: production-ready landingspagina in minder dan één uur zonder design achtergrond.

**Stap 1 — Een invoerpakket voorbereiden (5 minuten)**

Verzamel vóór het openen van Claude Design:
- Koptekst en subkoptekst (eindkopie, geen placeholders)
- Drie waardeproposities (één zin elk)
- Een CTA-label
- Twee hexkleurcodes (als geen, gebruik style descriptor: « diep marineblauw en elektrisch cyaan » of « warm off-white en bosgroen »)
- Lettertypevoorkeur of style descriptor (« moderne geometrische » / « humanist serif » / « neutrale SaaS »)
- Doelgroepbeschrijving (één zin: wie ze zijn, wat ze interesseert)

**Stap 2 — Enkel dichte Prompt**

Leverde alle input in één prompt. Niet splitsen in meerdere uitwisselingen — één dichte prompt levert meer coherente eerste output dan iteratieve verduidelijkingen.

```
"Build a landing page for [company]. Audience: [description — who they are,
what they care about]. Headline: '[headline]'. Subheadline: '[subheadline]'.
Value props: [prop 1] / [prop 2] / [prop 3]. CTA: '[label]'. Brand: primary
[hex or descriptor], secondary [hex or descriptor], [font style].

Section order: hero (headline + subheadline + CTA), features (3-column, value props),
social proof (logo strip or testimonial), final CTA (full-width, high contrast).

Aesthetic: [one concrete reference — e.g., 'Linear.app's dark precision' or
'Stripe's clean density' or 'Notion's approachable minimalism']. Not generic SaaS,
not card-heavy, not stock-photo hero."
```

De esthetische verwijzing aan het einde is high-leverage. Een concrete verwijzing levert onderscheidendere output op dan abstracte adjectieven.

**Stap 3 — Tweaks-review (10–15 minuten)**

Vóór opnieuw invragen gebruikt u het Tweaks-paneel om aan te passen:
- Typografiegewicht (vettere kopkoppen verbeteren hiërarchie vaak zonder volledig opnieuw prompt)
- Witruimte en sectieopvulling
- Kleurintensiteit en contrast
- Sectievolgorde (sleepen om opnieuw in te stellen zonder tokenkosten)

Deze stap is gratis — het kost geen tokens en lost vaak 40–60% visuele problemen op die anders een prompt zouden vereisen.

**Stap 4 — Eén gericht promptronde (5 minuten)**

Pak alleen structurele problemen aan die Tweaks niet kan repareren. Wees specifiek:

```
"The hero CTA button is too small relative to the headline. Make it full-width
on mobile and 240px wide on desktop. Keep all other elements unchanged."
```

Accepteer 80–90% perfecte output. Vervolg niet perfectie in Claude Design — de laatste 10% is sneller om in Claude Code of rechtstreeks in geëxporteerde HTML te repareren.

**Stap 5 — Exporteren en implementeren**

Kies één exportpad:

| Implementatiedoel | Export | Opmerkingen |
|---|---|---|
| Shopify / WordPress / ClickFunnels | Standalone HTML | Zelfstandige CSS, geen bouwstap, rechtstreeks in paginabuilder HTML-blok neerzetten |
| Aangepaste CMS of dynamische inhoud | Claude Code bundel | Implementeer in Claude Code; dynamische velden aan CMS-gegevens koppelen |
| Collaboratief polijsten vóór publiceren | Canva export | Voor teams die niet-developer bewerking vóór lancering nodig hebben |
| Directe bestandsimplementatie (S3, Netlify Drop) | Standalone HTML | Werkt zonder enig gereedschapsketting |

Resultaat: productie landingspagina, 45–60 minuten, geen design achtergrond vereist.

## Voorbeeld

Eenling SaaS-oprichter lanceert wachtlijstpagina voor AI-codebeoordelingstool. Ze hebben eindkopie, geen ontwerper en conferentiedemo in vier uur.

**Invoerpakket:**

- Koptekst: « Codeuitbeoordeling die als senioreningenieur denkt »
- Subkoptekst: « AI-aangedreven beoordeling die logicafouten vangt, niet alleen stijl. »
- Waardepropositiesavedagina: « Integreert met GitHub in 60 seconden » / « Legt uit waarom, niet alleen wat » / « Nul configuratie, werkt op elk stapel »
- CTA: « Sluit je aan bij de wachtlij »
- Merk: primair #1C1C2E, accent #6EE7B7, lettertype: « schoon geometrisch sans »
- Doelgroep: « Mid-level engineers bij startups gefrustreerd door oppervlakkige PR-beoordeling van teamgenoten »

**Stap 2-prompt:**

```
"Build a landing page for Revue, an AI code review tool. Audience: mid-level
engineers at startups frustrated by shallow PR review. Headline: 'Code review
that thinks like a senior engineer'. Subheadline: 'AI-powered review that catches
logic errors, not just style.' Value props: 'Integrates with GitHub in 60 seconds'
/ 'Explains why, not just what' / 'Zero configuration, works on any stack'.
CTA: 'Join the waitlist'. Brand: primary #1C1C2E, accent #6EE7B7, geometric sans.

Section order: hero, features (3-column), waitlist form (email input + CTA),
minimal footer.

Aesthetic: Linear.app's dark precision. Not card-heavy, not stock-photo hero,
not generic SaaS purple."
```

**Stap 3 — Tweaks-beslissingen:**

- Kopschriftgewicht van normaal naar vet verhoogd (hiërarchie onmiddellijk verbeterd)
- Sectieopvulling verminderd — standaard had te veel lucht tussen held en functies
- Accentkleurintensiteit met 10% verlaagd — standaard #6EE7B7 was te verzadigd tegen donkere achtergrond

**Stap 4 — Eén prompt:**

```
"The waitlist form section needs a subtle divider from the features section above it.
Add a thin horizontal rule in #2E2E42. Keep everything else as-is."
```

**Exportbeslissing:** Standalone HTML. Oprichter gebruikt Netlify Drop — sleep bestand, live in 30 seconden. Geen CMS nodig; wachtlijstformulieractie wijst naar Mailchimp-insluit URL handmatig toegevoegd aan HTML na export.
