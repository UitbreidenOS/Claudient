# Claude Design — End-to-End Workflows

## Wann aktivieren

- Starten eines neuen Projekts und benötigen eines wiederholbaren Design-zu-Produktion-Prozesses statt ad hoc Aufforderungen
- Ein Teamkollege ist neu bei Claude Design und benötigt einen strukturierten Ansatz, um verschwendete Sitzungen zu vermeiden
- Wechsel zwischen Design-Kontexten — Startup-Geschwindigkeit, Produkt-Team-Konsistenz, Design-geführte Erkundung oder Marketing-Start
- Bestehende Claude Design-Sitzungen verbrauchen übermäßige Tokens ohne gegen eine Richtung zu konvergieren

## Wann NICHT verwenden

- Einmalige Wegwerf-Prototypen ohne nachgelagerte Implementierung — überspringen Sie den Workflow, fordern Sie direkt an
- Projekte, bei denen Figma die Wahrheitsquelle ist und das Team Figma-Dateien genehmigen muss, bevor das Development startet — verwenden Sie Figmas KI-Tools und importieren Sie manuell zu Claude Code
- Wenn pixelgenaue Client-Genehmigungsmockups vor dem Development erforderlich sind — Claude Design ist kein Figma-Ersatz für dieses Gate
- Wenn eine Design-Richtung bereits in Claude Code gesperrt ist — kehren Sie nicht zu Claude Design zurück; iterieren Sie in Code

## Anweisungen

Vier Workflows abdecken die vier häufigsten Nutzungskontexte. Jeder ist darauf ausgelegt, Token-Verschwendung und Zeit bis zur Produktion zu minimieren.

---

### Workflow 1: Schnelle Validierung (Startup / MVP)

Ziel: validierte UI-Richtung von Spezifikation zu arbeitscodem in unter sechs Stunden, gleichentags.

**Phase 1 — Konzept (30 Minuten, eine Sitzung)**

Öffnen Sie eine frische Claude Design-Sitzung. Zur Verfügung stellen:
- Zielgruppe (ein Satz)
- Kernfunktionen zu zeigen (3–5 Maximum)
- Marken-Einschränkungen: zwei Hex-Farben und eine Font-Referenz (ein Google Font-Name oder ein Style-Deskriptor wie « geometrisches Sans »)

Aufforderung:

```
"Show 3 layout directions for [product type] targeting [audience]. Core features:
[feature 1], [feature 2], [feature 3]. Brand: primary [hex], accent [hex],
[font name or descriptor]. Show all 3 side by side."
```

Ausgabe: drei verschiedene Layout-Richtungen. Entscheidung: wählen Sie die Gewinner-Richtung und notieren Sie ein oder zwei spezifische Elemente von den anderen, die wert sind (Farbe von A, Karten-Behandlung von B).

**Phase 2 — Verfeinerung (30 Minuten, gleiche oder neue Sitzung)**

Wenden Sie die querschnittlichen Richtungsentscheidungen mit spezifischer Anweisung an:

```
"Apply [element from version A] to [layout of version B]. Keep [specific element].
Change [specific element] to [target state]."
```

Verwenden Sie das Tweaks-Panel für Abstands-, Typografie-Gewicht und Farbintensitäts-Anpassungen. Dies kostet keine Tokens. Fordern Sie nur strukturelle Änderungen an, die Tweaks nicht verwalten kann.

Ausgabe: einzelne verfeinerte Richtung. Nicht über eine Verfeinerungs-Durchgang hinaus iterieren — Perfektionismus in dieser Phase verzögert die Produktion ohne das Endprodukt zu verbessern.

**Phase 3 — Handoff zu Claude Code (unmittelbar nach dem Sperren der Richtung)**

Exportieren Sie das Claude Code-Bundle. Übergeben Sie es an Claude Code mit dem Implementierungs-Ziel:

```
"Implement this Claude Design bundle as [React with Tailwind / plain HTML+CSS /
Vue with shadcn]. Match the token values exactly. Use the layout as a reference,
not a pixel-perfect spec. Flag any deviations from the design."
```

Kehren Sie nach diesem Punkt nicht zu Claude Design zurück. Alle UI-Iteration geschieht in Claude Code gegen den echten Komponenten-Baum.

Resultat: validierte Richtung zu Production-Code, gleicher Tag, unter sechs Stunden.

---

### Workflow 2: Design System Grundlage (Produkt-Teams)

Ziel: ein wiederverwendbarer Design-System-Kontext, der jede zukünftige Claude Design-Sitzung konsistent und token-effizient macht.

**Sitzung 0 — System Setup (2–3 Stunden, läuft einmal)**

Diese Sitzung ist hoher Token-Verwendung und läuft einmal. Behandeln Sie sie als Investition — sie reduziert Pro-Funktions-Session-Kosten nachher um 60–70%.

Zur Verfügung stellen:
- Codebase (oder ein Zusammenfassung der verwendeten Komponenten-Bibliothek — shadcn/ui, MUI, Radix, usw.)
- 5–10 Screenshots von fertigen Produkt-Screens die bestehende visuelle Sprache zeigen
- Markenrichtlinien-Dokument oder Schreib-Zusammenfassung (Farben, Typografie, Abstands-Prinzipien, Nein-Nein)

Aufforderung:

```
"Extract the design system from these product screenshots and brand guidelines.
Identify: color tokens (primary, secondary, surface, border, text hierarchy),
typography scale (size, weight, line-height per level), spacing scale,
border radius values, and shadow tokens. Output as a JSON token file and a
summary of the component conventions (card style, button variants, input style).
Then generate a test component — a feature card — using the extracted system."
```

Validieren Sie die Test-Komponente gegen einen echten Produkt-Screenshot. Korrigieren Sie alle Extraktions-Fehler, bevor Sie fortfahren. Sobald das System korrekt ist, exportieren Sie die Token-Datei (JSON-Format) und speichern Sie diese unter:

```
project-root/
└── design-system/
    └── tokens.json       ← from Claude Design extraction
    └── system-notes.md   ← component conventions in plain text
```

Speichern Sie diese Sitzung als Claude Project, damit der Design-System-Kontext über alle zukünftigen Design-Sitzungen ohne Neuhochladen persists.

**Pro-Funktions-Sitzungen (nach System-Setup)**

Öffnen Sie eine Sitzung im Claude Project mit dem Design-System. Marke und Tokens sind bereits im Kontext — nicht neuhochen.

Fordern Sie für eine neue Funktion an:

```
"Design the [feature name] screen. Users need to [primary task]. Key elements:
[list]. Follow the established design system. Use existing component patterns
where they apply."
```

Token-Verbrauch ist 60–70% niedriger als eine system-naive Sitzung, da Korrekturzyklen eliminiert sind. Die Ausgabe wird zum bestehenden Produkt passen ohne explizites Marken-Enforcement in jeder Aufforderung.

**Integration mit Entwicklung**

Exportieren Sie das Claude Code-Bundle pro Funktion. Die Token-Werte im Bundle stimmen mit der Token-Datei in `design-system/tokens.json` überein. Wenn die Codebase diese Tokens bereits importiert (über CSS-Variablen oder Tailwind-Erweiterung), erben generierte Komponenten korrekte Werte ohne manuales Mapping.

---

### Workflow 3: Erforschungs-erster (Design-geführte Teams)

Ziel: Team-Alignment auf Design-Richtung, bevor irgendwelche Engineering-Zeit gebunden wird.

**Phase 1 — Breite Erforschung (1–2 Stunden)**

Generieren Sie eine Reihe von Richtungen statt einer einzelnen Antwort:

```
"Show 5 directions for the [page or feature] homepage hero. Each should have a
distinct visual personality — vary layout, typography weight, and color treatment.
Label them 1–5."
```

Verwenden Sie das Tweaks-Panel um über Richtungen zu mischen: « Wenden Sie die Typografie von Richtung 3 auf das Layout von Richtung 1 an. » Dokumentieren Sie Befunde während — Screenshot und kurze Notiz, die beschreiben, was in jedem funktioniert (nicht « ich mag das » sondern « der große Type auf dunklem Hintergrund liest sich als autoritär, was zum Enterprise-Käufer passt »).

Nicht in dieser Phase wiederholt Anforderung versuchen, eine endgültige Antwort zu erreichen. Erforschung ist die Ausgabe.

**Phase 2 — Richtungs-Validierung (30 Minuten)**

Wählen Sie die Top 2–3 Richtungen. Teilen Sie jede als URL von Claude Design. Sammeln Sie Stakeholder-Feedback in einer einzelnen Runde — nicht einer Reihe von async Threads. Feedback muss spezifisch sein:

Akzeptables Feedback: « Die Karten-Abstände fühlen sich auf Mobile eng an » / « Die Sekundärfarbe ist zu ähnlich der primären — sie unterscheiden sich nicht. »

Feedback zum Ablehnen (mit Klarstellungsfrage zurück): « Machen Sie es premium » / « Es sollte mehr pop. »

Wenden Sie strukturelles Feedback über Aufforderungen an. Wenden Sie visuelles Tuning-Feedback über das Tweaks-Panel an. Vervollständigen Sie diese Phase in einem Sitz.

**Phase 3 — Produktions-Pfad**

Nach Richtungs-Validierung, wählen Sie einen Pfad und mischen Sie sie nicht:

| Team-Tooling | Pfad |
|---|---|
| Figma als Wahrheitsquelle | Screenshot validierte Richtung, manuell in Figma neuerstellen (oder Canva als Brücke für Nicht-Figma-Teams verwenden) |
| Claude Code als Implementations-Schicht | Claude Code-Bundle exportieren, implementieren |
| Direkte Veröffentlichung (Marketing-Seiten) | Standalone HTML exportieren, deployen |

Nicht zusätzliche Zeit in Claude Design nach Richtungs-Validierung verbringen. Der Wert dieses Workflows ist das Alignment, das er erzeugt — nicht die Pixel-Qualität der Claude Design-Ausgabe.

---

### Workflow 4: Landing Page Generierung (Marketing-Teams / Solo-Erbauer)

Ziel: production-ready Landing Page in unter einer Stunde ohne Design-Hintergrund.

**Schritt 1 — Vorbereitung eines Input-Pakets (5 Minuten)**

Versammeln Sie, bevor Sie Claude Design öffnen:
- Kopfzeile und Unterschrift (endgültige Kopie, nicht Platzhalter)
- Drei Wertpropositionen (ein Satz jede)
- Ein CTA-Etikett
- Zwei Hex-Farbcodes (wenn keine, verwenden Sie einen Style-Deskriptor: « tiefes Marine und elektrisches Cyan » oder « warmes Off-Weiß und Waldgrün »)
- Schrift-Vorliebe oder Style-Deskriptor (« moderne Geometrie » / « humanist Serif » / « neutrale SaaS »)
- Zielgruppen-Beschreibung (ein Satz: wer sie sind, was ihnen wichtig ist)

**Schritt 2 — Einzelne dichte Aufforderung**

Liefern Sie alle Eingaben in einer Aufforderung. Teilen Sie sich nicht in mehrfache Austausche — eine einzelne dichte Aufforderung erzeugt eine zusammenhängendere erste Ausgabe als iterative Klarstellungen.

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

Die ästhetische Referenz am Ende ist high-leverage. Eine konkrete Referenz erzeugt verschiedenere Ausgabe als abstrakte Adjektive.

**Schritt 3 — Tweaks-Review (10–15 Minuten)**

Bevor Sie wieder auffordern, verwenden Sie das Tweaks-Panel um anzupassen:
- Typografie-Gewicht (fettere Überschriften verbessern Hierarchie oft ohne kompletten Neuprompt)
- Leerraum und Abschnitt-Auffüllung
- Farb-Intensität und Kontrast
- Abschnitt-Reihenfolge (zum Reorganisieren ohne Token-Kosten ziehen)

Dieser Schritt ist kostenlos — er kostet keine Tokens und behebt oft 40–60% visueller Probleme, die sonst eine Aufforderung erfordern würden.

**Schritt 4 — Eine gezielte Aufforderungs-Runde (5 Minuten)**

Adressieren Sie nur strukturelle Probleme, die Tweaks nicht reparieren kann. Seien Sie spezifisch:

```
"The hero CTA button is too small relative to the headline. Make it full-width
on mobile and 240px wide on desktop. Keep all other elements unchanged."
```

Akzeptieren Sie 80–90% perfekte Ausgabe. Verfolgen Sie nicht Perfektion in Claude Design — die letzten 10% sind schneller zu reparieren in Claude Code oder direkt in exportiertem HTML.

**Schritt 5 — Exportieren und bereitstellen**

Wählen Sie einen Export-Pfad:

| Deployment-Ziel | Export | Anmerkungen |
|---|---|---|
| Shopify / WordPress / ClickFunnels | Standalone HTML | Selbstenthaltendes CSS, kein Build-Schritt, direkt in Seitenerbauer HTML-Block ablegen |
| Benutzerdefinierte CMS oder dynamische Inhalte | Claude Code-Bundle | In Claude Code implementieren; verdrahten Sie dynamische Felder mit CMS-Daten |
| Kooperatives Polieren vor Veröffentlichung | Canva-Export | Für Teams, die Nicht-Entwickler-Bearbeitung vor Start benötigen |
| Direktes Datei-Deployment (S3, Netlify Drop) | Standalone HTML | Funktioniert ohne irgendwelche Build-Tools |

Resultat: Production-Landing-Page, 45–60 Minuten, keine Design-Hintergrund erforderlich.

## Beispiel

Ein Solo SaaS-Gründer startet eine Waitlist-Seite für ein KI-Codereview-Tool. Sie haben endgültige Kopie, keinen Designer und eine Conference-Demo in vier Stunden.

**Input-Paket:**

- Kopfzeile: « Codereview, der wie ein Senior-Engineer denkt »
- Unterschrift: « KI-angetriebener Review, der Logikfehler erfasst, nicht nur Style. »
- Wertpropositionen: « Integrates mit GitHub in 60 Sekunden » / « Erklärt warum, nicht nur was » / « Null-Konfiguration, funktioniert auf jedem Stack »
- CTA: « Der Waitlist beitreten »
- Marke: primär #1C1C2E, Akzent #6EE7B7, Schrift: « sauberes geometrisches Sans »
- Audience: « Mid-Level Engineers bei Startups frustriert von oberflächlichem PR-Review von Teammates »

**Schritt 2-Aufforderung:**

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

**Schritt 3 — Tweaks-Entscheidungen:**

- Überschriften-Schrift-Gewicht von normal zu fett erhöht (Hierarchie unmittelbar verbessert)
- Abschnitt-Auffüllung reduziert — Standard hatte zu viel Luft zwischen Hero und Features
- Akzent-Farb-Intensität um 10% reduziert — Standard #6EE7B7 war gegen dunklen Hintergrund zu saturiert

**Schritt 4 — Eine Aufforderung:**

```
"The waitlist form section needs a subtle divider from the features section above it.
Add a thin horizontal rule in #2E2E42. Keep everything else as-is."
```

**Export-Entscheidung:** Standalone HTML. Der Gründer nutzt Netlify Drop — Datei ziehen, Live in 30 Sekunden. Kein CMS erforderlich; die Waitlist-Formular-Aktion zeigt auf eine Mailchimp-Embed-URL, die nach Export manuell zum HTML hinzugefügt wird.
