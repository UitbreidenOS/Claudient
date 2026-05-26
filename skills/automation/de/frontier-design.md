# Claude Design — Frontier-Fähigkeiten

## Wann aktivieren

- Bauen von interaktiven Erlebnissen, die über Standard-UI hinausgehen — 3D, Audio, Partikeleffekte oder immersive Animation
- Pitch Deck oder Produktdemo benötigt Live-Interaktive Elemente statt statischer Screenshots
- Prototyping von Voice-Interfaces oder WebGL-basierten Visualisierungen vor Engagement in vollständiger Implementierung
- Bauen von Marketing-Landingpages, wo visuelle Unterscheidung wichtiger ist als Framework-Kompatibilität
- Stakeholder-Demo benötigt shareable URL mit Motion und Interaktivität, nicht nur Mockup-Image

## Wann NICHT verwenden

- Standard-Geschäftsanwendungs-UI — verwenden Sie die Basis-claude-design-Fähigkeit und exportieren zu Claude Code
- Production-Grade 3D-Erlebnisse, bei denen Qualität kommerziellen Standards entsprechen muss — nutzen Sie Three.js oder Unity direkt
- Wenn Client-Browserkompatibilität eine Anforderung ist — Frontier-Fähigkeiten erfordern moderne Browser (Chrome 110+, Safari 16.4+, Firefox 115+) ; ältere Enterprise-Umgebungen werden Probleme haben
- Wenn das Lieferbare eine herunterladbare Videodatei ist — animierte Video-Export als shareable URL nur ; MP4-Download wird nicht unterstützt
- Wenn das Projekt bereits in Claude Code ist und die Design-Richtung gesperrt ist — iterieren in Code, nicht in Claude Design

## Anweisungen

### 3D Interaktive Elemente

Claude Design generiert interaktive 3D-Elemente mit WebGL. Diese sind in den exportierten HTML eingebettet und funktionieren ohne zusätzliche Abhängigkeiten.

Unterstützte Muster:
- Globus-Visualisierungen mit Drag-Rotation, Scroll-Zoom und Hover-Tooltips für Daten-Overlays
- Produkt-Showcases mit Orbit-Kontrollen und Material- oder Farbwechsel
- Abstrakte 3D-Formen für Hero-Abschnitte (Kugeln, Tori, morphing Blobs)
- Daten-Skulpturen — 3D-Balkendiagramme, Streudiagramme, Netzwerk-Graphen in drei Dimensionen

Aufforderungs-Muster:

```
"Generate an interactive 3D globe showing [data]. Include: rotation on drag,
zoom on scroll, tooltip on hover showing [data fields], [color scheme].
Export as interactive HTML."
```

Einschränkung: komplexe benutzerdefinierte Formen mit unregelmäßiger Geometrie haben raue Kanten. Die Fähigkeit funktioniert am besten für häufige 3D-Primitive und bekannte Visualisierungstypen (Globen, Produkt-Zylinder, abstrakte Sphären). Versuchen Sie nicht hochdetaillierte Meshes — übergeben Sie diese an eine Three.js-Implementierung in Claude Code.

### Voice-Interfaces

Claude Design generiert Voice-Interface Wireframes und Prototypen. Voice-Verarbeitung wird im Prototyp simuliert — Wellenform-Animation, Zustandsübergänge und Response-Rendering sind echt ; echte Audio-Erfassung und -Verarbeitung müssen in Claude Code mithilfe der Web Audio API oder eines Provider SDK verdrahtet werden.

Unterstützte Muster:
- Halten-zum-Sprechen Mikrofon-Button mit animierter Wellenform während Recording-Zustand
- Sprache-zu-Aktion Flows: gesprochene Befehle lösen UI-Übergang oder Result-Rendering
- Podcast- und Interview-UIs mit Playback-Kontrollen und synchronisierter Transkript-Anzeige
- Voice-Such-Interfaces mit animiertem Lade-Zustand und Result-Listen-Rendering

Aufforderungs-Muster:

```
"Design a voice interface for [use case]. Include: mic button with hold-to-talk
interaction, animated waveform during recording, processing/thinking state,
response display area for [result type]. Color: [palette]."
```

Einschränkung: alle Voice-Zustände im Prototyp sind Click-ausgelöste Simulationen. Um echte Voice zu verdrahten: exportieren Sie das Claude Code Bundle, implementieren Sie `getUserMedia()` oder Ihren Voice SDK in Claude Code, und mappen Sie SDK-Events zu den State-Klassen bereits im generierten HTML.

### WebGL Shaders und Partikel-Effekte

Für visuell unterscheidbare Hero-Abschnitte und Background-Treatments. Diese exportieren als Selbst-enthaltendes HTML mit eingebettetem WebGL; kein Build-Schritt erforderlich.

Unterstützte Muster:
- Partikelsysteme: schwebende Knoten, verbundene Netzwerk-Graph, flüssig-ähnliche Bewegung
- Gradient-Animationen: Mesh-Gradienten, Aurora-Effekte, animierte Noise-Felder
- Interaktive Partikel-Felder, die auf Mausposition und Bewegung reagieren
- Geometrische Shader-Hintergründe — Low-Poly, Voronoi, Wellen-Verzerrung

Aufforderungs-Muster:

```
"Create a hero background with a particle network effect. Approximately 150
particles, connected by lines when within 120px of each other, respond to
mouse movement with a gentle pull force. Color palette: [primary] on [background].
Subtle animation, not distracting."
```

Export: interaktives HTML. An Claude Code übergeben für Production Cleanup — ersetzen Sie inline `<script>` mit einem Modul, verschieben Sie Canvas-Initialisierung zu einem Component-Lifecycle-Hook, und fügen Sie eine `prefers-reduced-motion` Media Query-Prüfung hinzu.

### Animierte Video-Szenen

Multi-Szenen animierte Sequenzen für Produkt-Walkthroughs, Erklärer-Animationen und Daten-Stories.

Unterstützte Muster:
- Produkt-Walkthrough: annotierte UI mit Spotlight-Animationen und Step-by-Step-Reveals
- Erklärer-Sequenzen: Icon-Animationen, Text-Reveals, Slide-Übergänge
- Daten-Story-Animationen: Charts und Graphen, die mit synchronisiertem Narrations-Text über die Zeit aufbauen

Export-Pfad: nur shareable URL. Zum Erfassen als Video verwenden Sie einen Screen-Recorder (QuickTime, OBS oder Loom), der auf die Shared URL zeigt. Zum Einbetten in Website verwenden Sie ein iframe von der Shared URL. MP4-Download ist nicht verfügbar — versprechen Sie das Clients nicht.

Aufforderungs-Muster:

```
"Create a 4-scene animated walkthrough of [product]. Scene 1: [description].
Scene 2: [description]. Scene 3: [description]. Scene 4: [description].
Transitions: slide in from right. Duration: approximately 8 seconds per scene.
Brand colors: [hex values]."
```

### Vollständige interaktive Erlebnisse

Kombinationen mehrerer Frontier-Elemente in einem einzelnen Prototyp. Diese sind experimentell — erwarten Sie mehr Iterations-Zyklen als Single-Capability-Ausgaben.

Viable Kombinationen:
- Voice Input + 3D Visualisierungs-Response (sprechen Sie eine Abfrage, 3D-Chart aktualisiert sich)
- WebGL-Hintergrund + Live-Datenbindung (Partikel-Dichte angetrieben durch Zahlen-Input)
- Animierte Video-Abschnitte + inline interaktive Kontrollen

Aufforderungs-Strategie für kombinierte Erlebnisse: bauen Sie jede Fähigkeit separat, validieren Sie sie, dann fordern Sie die Kombination an. Das Versuch einer kompletten kombinierten Erlebnis in einer einzelnen Aufforderung erhöht die Chance von strukturellen Fehlern in der Ausgabe.

### Export-Strategie für Frontier Designs

| Lieferbar | Export-Pfad | Wann verwenden |
|---|---|---|
| Interaktives HTML | Aus Claude Design herunterladen | Browser-Demos, direktes Deployment, iframe Einbetten |
| Claude Code Handoff | Export Bundle | Production-Implementierung mit echten APIs |
| Screen-Recording | Shared URL aufnehmen | Animierter Video-Erfassung, Client-Präsentation |
| Shared URL | Aus Claude Design kopieren | Stakeholder-Review, async Feedback |

Bei Export von interaktivem HTML für Production-Use geben Sie die Datei mit dieser Aufforderung an Claude Code:

```
"Clean up this Claude Design HTML export for production. Extract inline styles
to a CSS file, move inline scripts to a module, add prefers-reduced-motion
support, and ensure it passes WCAG 2.1 AA contrast checks."
```

### Aktuelle Reife

Stabil und zuverlässig:
- Interaktive 3D Globen und Standard-Produkt-Showcase Orbits
- Partikel-Netzwerk und schwebende-Punkt Effekte
- Voice UI Wireframes mit simulierten State-Übergängen
- CSS und JS-basierte animierte Übergänge und Reveals

Raue Kanten — erwarten Sie Iteration:
- Komplexe Physik-Simulationen (Stoff, Flüssigkeit, starrer Körper Stacking)
- Benutzerdefinierter GLSL Shader-Code über häufige Noise-Muster hinaus
- Echtzeitliche externe Datenbindung im exportierten HTML

Nicht unterstützt:
- Herunterladen animierter Sequenzen als MP4 oder GIF
- Komplexe multiplayer oder echtzeitliche collaborative Interaktionen
- WebXR oder AR/VR Erlebnisse

## Beispiel

Solo Gründer, der eine SaaS Produktdemo für eine Investor Meeting baut. Anforderungen: animierter Hero, Produkt-Screenshot Carousel mit Tiefe und Voice-Such-Prototyp — alle als shareable URL.

Schritt 1 — Bauen Sie jeden Element separat:

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

Schritt 2 — Kombinieren in eine einzige Seite:

```
"Combine the hero, carousel, and voice interface into a single-page layout.
Order: hero (full viewport), carousel section (centered, 80vw), voice interface
(full viewport, dark background). Add smooth scroll between sections."
```

Schritt 3 — Export-Entscheidung:

Die Demo bleibt in Claude Design als shareable URL für das Investor-Meeting. Nach dem Meeting, exportieren Sie das Claude Code Bundle und verdrahten Sie den Voice-Prototyp mit der echten Such-API mit der Web Speech API in Claude Code. Die Partikel-Hero und 3D-Carousel portieren direkt — keine echte-API Abhängigkeit.
