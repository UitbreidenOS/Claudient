# Claude Design — Frontier-mogelijkheden

## Wanneer activeren

- Het bouwen van interactieve ervaringen die verder gaan dan standaard UI — 3D, audio, deeltjeseffecten of immersieve animatie
- Pitchdeck of productdemo heeft live interactieve elementen nodig in plaats van statische screenshots
- Voice-interfaces of WebGL-gebaseerde visualisaties prototypen voordat u zich aan volledige implementatie verbindt
- Marketing-landingspagina's bouwen waar visuele onderscheiding belangrijker is dan framework-compatibiliteit
- Stakeholder-demo vereist shareable URL met beweging en interactiviteit, niet alleen mockup-afbeelding

## Wanneer NIET gebruiken

- Standaard bedrijfsapplicatie-UI — gebruik de basisvaardigheden claude-design en exporteer naar Claude Code
- Production-grade 3D-ervaringen waar kwaliteit moet overeenkomen met commerciële standaarden — gebruik Three.js of Unity rechtstreeks
- Wanneer browser-compatibiliteit van client een vereiste is — frontier-mogelijkheden vereisen moderne browsers (Chrome 110+, Safari 16.4+, Firefox 115+) ; oudere enterprise-omgevingen hebben problemen
- Wanneer het te leveren item een downloadbare videobestand is — geanimeerde videoexport als shareable URL alleen ; MP4-download wordt niet ondersteund
- Wanneer het project al in Claude Code is en de designrichting is vergrendeld — herhaal in code, niet in Claude Design

## Instructies

### 3D interactieve elementen

Claude Design genereert interactieve 3D-elementen met WebGL. Deze zijn ingebed in de geëxporteerde HTML en werken zonder extra afhankelijkheden.

Ondersteunde patronen:
- Globusvisualisaties met sleepbare rotatie, scrollen zoom en zwevende tooltips voor gegevensverlaying
- Productshowcases met baancontrole en materiaal- of kleuromschakeling
- Abstracte 3D-vormen voor heldsecties (bollen, tori, morphing-blobs)
- Gegevensbeeldhouwwerken — 3D-staafdiagrammen, spreidingsdiagrammen, netwerkgrafische figuren in drie dimensies

Vraagpatroon:

```
"Generate an interactive 3D globe showing [data]. Include: rotation on drag,
zoom on scroll, tooltip on hover showing [data fields], [color scheme].
Export as interactive HTML."
```

Beperking: complexe aangepaste vormen met onregelmatige geometrie hebben ruwe randen. De mogelijkheid werkt het best voor veelvoorkomende 3D-primitieven en bekende visualisatietypes (globussen, productcilinders, abstracte bollen). Probeer geen zeer gedetailleerde meshes — geef die af aan een Three.js-implementatie in Claude Code.

### Stem-interfaces

Claude Design genereert voice interface wireframes en prototypes. Spraakverwerking wordt in het prototype gesimuleerd — golfvormanimpatie, staatstransities en responsrendering zijn echt ; echte audiocapture en verwerking moeten in Claude Code bedraden worden met behulp van de Web Audio API of een provider SDK.

Ondersteunde patronen:
- Ingedrukte microfoonknop met golfvormige animatie tijdens opnamestatus
- Spraak-naar-actiestromen: gesproken commando triggert UI-overgang of resultaatrendering
- Podcast- en interview-UI's met afspeelingscontroles en gesynchroniseerde transcriptweergave
- Voice-zoekinterfaces met geanimeerdde laadstatus en resultaatlijstrendering

Vraagpatroon:

```
"Design a voice interface for [use case]. Include: mic button with hold-to-talk
interaction, animated waveform during recording, processing/thinking state,
response display area for [result type]. Color: [palette]."
```

Beperking: alle spraaktoestanden in het prototype zijn aangeklikt gesimuleerde. Om echte stem te bedraden: exporteer de Claude Code-bundel, implementeer `getUserMedia()` of uw spraak-SDK in Claude Code, en wijs SDK-gebeurtenissen toe aan de statusklassen die al in de gegenereerde HTML voorkomen.

### WebGL-shaders en deeltjeseffecten

Voor visueel onderscheidende heldsecties en achtergrondbehandelingen. Deze exporteren als zelfstandige HTML met ingebouwde WebGL; geen bouwstap vereist.

Ondersteunde patronen:
- Deeltjessystemen: zwevende knooppunten, verbonden netwerkgrafiek, vloeibare beweging
- Gradiëntanimaties: meshgradiënten, auroraeffecten, geanimeerdde ruisvelden
- Interactieve deeltjesvelden die reageren op muislocatie en beweging
- Geometrische shader-achtergronden — laagpoly, voronoi, golfvervorming

Vraagpatroon:

```
"Create a hero background with a particle network effect. Approximately 150
particles, connected by lines when within 120px of each other, respond to
mouse movement with a gentle pull force. Color palette: [primary] on [background].
Subtle animation, not distracting."
```

Export: interactieve HTML. Geef over aan Claude Code voor productieopruiming — vervang inline `<script>` door een module, verplaats canvasinitialisatie naar een component-levenscyclushack en voeg een `prefers-reduced-motion` mediaquery-controle toe.

### Geanimeerdde videoscènes

Multi-scene geanimeerdde sequenties voor productdemo's, verklaarvideoanimaties en dataverhalen.

Ondersteunde patronen:
- Productwalkthrough: geannoteerde UI met spotlightanimaties en stap-voor-stap onthullingen
- Verklaarsequenties: pictogramanimaties, tekstonthullingen, slidetransities
- Gegevensverhaalanimaties: grafieken en diagrammen die in de tijd worden opgebouwd met gesynchroniseerde narrativetekst

Exportpad: alleen shareable URL. Gebruik een schermrecorder (QuickTime, OBS of Loom) die op de gedeelde URL wijst om als video vast te leggen. Gebruik een iframe van de gedeelde URL om in een website in te sluiten. MP4-download is niet beschikbaar — beloof dit niet aan klanten.

Vraagpatroon:

```
"Create a 4-scene animated walkthrough of [product]. Scene 1: [description].
Scene 2: [description]. Scene 3: [description]. Scene 4: [description].
Transitions: slide in from right. Duration: approximately 8 seconds per scene.
Brand colors: [hex values]."
```

### Volledig interactieve ervaringen

Combinaties van meerdere frontier-elementen in één prototype. Dit zijn experimenteel — verwacht meer herhalingscycli dan output met één mogelijkheid.

Leefbare combinaties:
- Sprakinvoer + 3D-visualisatierespons (spreek een query uit, 3D-diagram werkt bij)
- WebGL-achtergrond + live gegevensbinding (deeltjesdichtheid aangestuurd door getalaninvoer)
- Geanimeerdde videosecties + inline interactieve controles

Vraagstrategie voor combinatief ervaringen: bouw elke mogelijkheid afzonderlijk, valideer het, vraag dan om de combinatie. Het proberen van een volledig gecombineerde ervaring in één vraag verhoogt de kans op structurele fouten in de uitvoer.

### Exportstrategie voor Frontier-ontwerpen

| Leverable | Exportpad | Wanneer gebruiken |
|---|---|---|
| Interactieve HTML | Downloaden uit Claude Design | Browserdemo's, directe implementatie, iframe-insluiting |
| Claude Code-overdracht | Bundel exporteren | Productie-implementatie met echte API's |
| Schermopname | Opname-URL delen | Geanimeerdde videocapture, clientpresentatie |
| Gedeelde URL | Kopieer van Claude Design | Stakeholder-review, async feedback |

Geef het bestand bij het exporteren van interactieve HTML voor productieverbruik door aan Claude Code met deze vraag:

```
"Clean up this Claude Design HTML export for production. Extract inline styles
to a CSS file, move inline scripts to a module, add prefers-reduced-motion
support, and ensure it passes WCAG 2.1 AA contrast checks."
```

### Huidige rijpheid

Stabiel en betrouwbaar:
- Interactieve 3D globen en standaard productshowcase banen
- Deeltjesnetwerk- en zwevende-punteffecten
- Voice UI wireframes met gesimuleerde staatovergangen
- CSS en JS-gebaseerde geanimeerdde transities en reveals

Ruwe randen — verwacht herhaling:
- Complexe fysicasimulaties (stof, vloeistof, stijf lichaamsgestapel)
- Aangepaste GLSL shadercode buiten veelvoorkomende ruispatronen
- Real-time externe gegevensbinding in de geëxporteerde HTML

Niet ondersteund:
- Geanimeerdde sequenties downloaden als MP4 of GIF
- Complexe multiplayer of real-time collaboratieve interacties
- WebXR of AR/VR-ervaringen

## Voorbeeld

Solo-oprichter bouw SaaS-productdemo voor investeerdersmeeting. Behoeften: geanimeerdde held, productschermafbeelding carrousel met diepte en voice-zoekprototype — allemaal shareable als URL.

Stap 1 — Bouw elk element afzonderlijk:

```
Prompt 1 (hero):
"Create a hero section with a particle network background. ~120 particles,
connected within 100px, mouse-responsive. Headline: 'Search your codebase
with voice.' CTA button: 'Try the demo'. Primary: #5B21B6, background: #0F0A1E."

Prompt 2 (carousel):
"Build a product screenshot carousel with 3 slides. Each slide tilts in 3D
on hover (15deg X rotation, subtle shadow depth). Transition: fade + scale.
Use placeholder screenshots. Same brand colors as the hero."

Prompt 3 (voice prototype):
"Design a voice search interface. Hold-to-talk mic button centered on screen.
Animated waveform rings during recording state. 'Processing...' spinner.
Results list fades in below. Simulate: 3-second recording, 1-second processing,
then show 4 mock results."
```

Stap 2 — Combineer in één pagina:

```
"Combine the hero, carousel, and voice interface into a single-page layout.
Order: hero (full viewport), carousel section (centered, 80vw), voice interface
(full viewport, dark background). Add smooth scroll between sections."
```

Stap 3 — Exportbesluit:

De demo blijft in Claude Design als shareable URL voor de investeerdersvergadering. Na de vergadering exporteert u de Claude Code-bundel en bedraadt u het voice-prototype aan de echte zoekopdracht-API met de Web Speech API in Claude Design. De deeltjesheld en 3D-carrousel porteren rechtstreeks — geen echte API-afhankelijkheid.
