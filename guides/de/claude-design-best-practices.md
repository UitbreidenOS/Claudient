# Claude Design — Best Practices in der Produktion

Diese Anleitung behandelt das, was die offizielle Dokumentation nicht abdeckt: bewährte Muster aus realer Produktionsnutzung. Claude Design läuft auf Opus 4.7, dem fähigsten und teuersten Modell der Claude-Familie. Das verändert, wie Sie jede Session angehen sollten.

---

## Token-Ökonomie

### Das Problem

Claude Design setzt Opus 4.7 für jede Generierung ein. Opus 4.7 ist kein leichtes Modell — es ist dieselbe Modellklasse, die für komplexes Reasoning und langfristige Dokumentenarbeit verwendet wird. In der Praxis:

- 50-58% des wöchentlichen Kontingents eines Pro-Plans verbraucht sich nach zwei moderat komplexen Sessions
- Ein Reviewer, der drei Variations einer Landing Page erstellt, hat 80% seiner wöchentlichen Zuteilung in 25 Minuten aufgebraucht
- Eine Session, die fünf visuelle Richtungen erkundet, kann so viel kosten wie ein ganzer Nachmittag Claude Code Arbeit

Das ist keine Beschwerde — Opus 4.7 produziert materielle bessere erste Entwürfe als kleinere Modelle, und die Zeiteinsparungen sind real. Aber Claude Design wie einen kostenlosen Skizzierblock zu behandeln wird Ihr Kontingent vor Wochenende aufbrauchen.

### Die fünf Strategien, die tatsächlich funktionieren

**Strategie 1: Bauen Sie ein Design System einmal auf, erben Sie es auf jedem Projekt.**

Das ist die Aktion mit dem höchsten Leverage, die Sie in Claude Design tun können. Eine Design System Setup-Session ist anfangs teuer — Sie zahlen dafür, dass Opus 4.7 Ihre Codebase liest, Ihre Tokens extrahiert und Ihre Component-Konventionen versteht. Aber jede nachfolgende Projektsession umgeht diese Inferenz-Arbeit vollständig. Das Modell kennt bereits Ihre Farbpalette, Ihre Type Scale, Ihren Spacing Rhythmus und Ihr Component Vokabular. Ohne dies startet jede Session bei Null, und Claude Design fällt auf seine Defaults zurück — die sofort als generischer Claude Output erkennbar sind.

Die einmalige Ausgabe spart Tokens auf jedem zukünftigen Projekt. Wenn Sie mehr als zwei Projekte in Claude Design bauen, amortisiert sich diese Investition bis zur dritten Session.

**Strategie 2: Verwenden Sie das Tweaks Panel vor dem Prompting.**

Das Tweaks Panel — Typografie-Schieberegler, Farbregler, Spacing- und Layout-Toggles — verbraucht keine Chat-Tokens. Das ist die am wenigsten genutzte Fähigkeit in Claude Design. Ein häufiger Fehler ist, zu prompen „machen Sie den Heading größer" oder „erhöhen Sie den Padding zwischen Abschnitten" wenn diese exakten Anpassungen als kostenlose Panel-Kontrollen verfügbar sind.

Bevor Sie einen Refinement Prompt schreiben, nutzen Sie das Tweaks Panel aus. Wenn die Anpassung dort ist, verwenden Sie sie. Reservieren Sie Chat Prompts für strukturelle Änderungen, Inhaltsänderungen und alles, was das Panel nicht kann — neue Components, Layout-Umorganisation, Variant Erkundung.

**Strategie 3: Schreiben Sie dichte, gebündelte Prompts.**

Drei verwandte Anfragen in einem Absatz kosten ungefähr gleich viel wie eine Anfrage. Drei separate Nachrichten kosten dreimal mehr und jede fügt Kontext-Overhead zu nachfolgenden Nachrichten hinzu.

Anstatt:
```
Machen Sie den Hero Section größer.
```
```
Ändern Sie auch den CTA zu unserem Primary Blue.
```
```
Und fügen Sie einen Subtitle unter dem Main Heading ein.
```

Schreiben:
```
Hero Section: erhöhen Sie das vertikale Padding um der Überschrift mehr Raum zu geben,
ändern Sie den CTA Button zu Primary Brand Blue (#0057FF), und fügen Sie ein 16px
Subtitle Line unter dem Main H1 ein, das das Produkt in einem Satz beschreibt.
```

Dieser Ansatz reduziert auch die Wahrscheinlichkeit, dass Claude Design eine Anweisung, die einer vorherigen widerspricht, fehlinterpretiert — wenn die volle Absicht in einem Pass sichtbar ist, löst das Modell Konflikte selbst.

**Strategie 4: Sessions proaktiv zurücksetzen.**

Eine Claude Design Session sammelt Kontext, wenn sie läuft. Frühe Nachrichten, abgelehnte Variationen und Korrektur-Zyklen bleiben alle im Kontext-Fenster. Ab Session-Nachricht 15 zahlen Sie dafür, diesen gesamten Kontext bei jeder Generierung zu reprocessen — auch wenn die frühen Iterationen nicht relevant für Ihr aktuelles Ziel sind.

Wenn Sie eine Richtung validiert haben und ein spezifisches Component oder einen Abschnitt weiter verfeinern möchten, starten Sie eine frische Session. Bringen Sie eine straffe Zusammenfassung dessen, was Sie etabliert haben (Ihre Design System Datei, ein Screenshot der genehmigten Richtung und ein einseitiger Briefing). Die frische Session kostet weniger pro Generierung und produziert sauberere Ausgabe weil das Modell nicht um eine durcheinanderbrachte Historie herumarbeitet.

**Strategie 5: Verwenden Sie externe Tools zum Skizzieren vor dem Upload.**

Image Uploads sind Kontext-teuer. Eine grobe Layout-Skizze von Google Stitch, ein Wireframe in jedem Tool oder sogar eine Plaintext ASCII-Art Layout-Beschreibung gibt Claude Design räumliche Absicht ohne die Kosten einer hochauflösenden Bildverarbeitung in der ersten Nachricht.

Beschreiben Sie die Struktur im Text: „Dreispalten-Grid auf Desktop, einzelne Spalte auf Mobile. Linke Spalte: Logo + Nav. Mitte: Hero Headline + CTA. Rechts: Product Screenshot." Das produziert oft einen besseren ersten Entwurf als ein unklar hochgeladenes Bild und kostet einen Bruchteil des Kontexts.

---

## Vermeiden der „Claude Ästhetik"

### Wie sie aussieht

Ohne Design Constraints standardisiert Opus 4.7, trainiert auf einem großen Corpus von Web Design Defaults, auf einen erkennbaren visuellen Fingerabdruck: Serif Headings gepaart mit Sans-Serif Body Text, Card-schwere Layouts mit subtilen Drop Shadows, farbige Left-Side Accent Bars auf Abschnitten und eine gedämpfte Pastel-Farbpalette. Es ist kompetent. Es ist auch sofort als KI-generierter Output erkennbar für jeden, der diese Tools länger als eine Woche nutzt.

Diese Standard-Ästhetik ist nicht falsch — sie ist nur generisch. Wenn Generik für Ihr Projekt funktioniert, überspringen Sie diesen Abschnitt. Wenn Sie distinctive Ausgabe brauchen, erfordert der Standard aktive Unterdrückung.

### Techniken, die funktionieren

**Laden Sie fertige Product Screenshots hoch, nicht Brand Specs.**

Brand Guidelines beschreiben Regeln. Fertige Screenshots zeigen visuelle Ergebnisse. Claude Design lernt mehr von der Anschauung, wie Ihre Marke in Produktion tatsächlich aussieht als vom Lesen typographischer Hierarchie-Regeln. Laden Sie einen Screenshot Ihrer Live Homepage, Ihrer poliert Marketing E-Mail oder Ihrer neuesten Pitch Deck Folie hoch. Das gibt dem Modell konkrete visuelle Evidenz, worauf Ihre Marke in der Praxis hinausläuft.

**Referenzieren Sie kulturelle Ästhetiken mit Spezifität.**

Generische ästhetische Referenzen („modern", „clean", „professional") produzieren Claudes Interpretation dieser Begriffe, was zur Standard-Ästhetik zurückschleift. Spezifische kulturelle Ästhetiken geben dem Modell ein konkretes visuelles Vokabular zum Arbeiten:

- „Swiss Editorial Design — Neue Haas Grotesk, enger Leading, starke Grid, hoher Kontrast, keine dekorativen Elemente"
- „1980er Brutalism Print — dicke schwarze Borders, industrielle Typefaces, dichte Information Hierarchy"
- „Solarpunk — warme Erdtöne, organische Curves, gemeinschaftszentrierte visuelle Sprache"
- „Scandinavian Minimalism — gedämpfte natürliche Palette, großzügiger Whitespace, funktional über dekorativ"

Diese Referenzen zwingen das Modell zu einer spezifischen visuellen Tradition. Die Ausgabe braucht vielleicht Verfeinern, aber es startet irgendwo Distinctives.

**Sagen Sie Defaults in Ihrem Briefing explizit ab.**

Erklären Sie, was Sie nicht wollen, so deutlich wie das, was Sie wollen. Fügen Sie einen Constraint Block zu jedem Initial Prompt hinzu:

```
Nicht verwenden: Card Layouts, farbige Accent Bars, Pastel Hintergründe, Serif/Sans-Serif
Heading Paarungen oder zentrierte Hero Sections mit einzelnem CTA. Treffen Sie Entscheidungen, die sich
spezifisch für diesen Produktkontext anfühlen, nicht generische SaaS Startup Defaults.
```

Negation Constraints sind nicht defensiv — sie sind load-bearing. Ohne sie füllt das Modell unkonstrained Entscheidungen mit Defaults.

**Fragen Sie explizit nach distinctive, kontextspezifischen Entscheidungen.**

Instruieren Sie das Modell, über den Produktkontext nachzudenken wenn es visuelle Entscheidungen trifft. „Wählen Sie Typographie, die widerspiegelt, was dieses Produkt tut — ein Developer Tool, ein Financial Dashboard, eine Consumer Fitness App — nicht was generische Design Sites empfehlen." Dieses Prompt Pattern produziert Ausgabe, die versucht, kontextuell angemessen zu sein, nicht ästhetisch sicher.

---

## Prompting Techniken

### Was tatsächlich funktioniert

**Dichte einseitige Prompts produzieren einen nutzbaren ersten Entwurf etwa 66% der Zeit.** Die anderen 34% brauchen einen fokussierten Refinement Pass. Mehrseitige vague Iteration — „mach es besser", „versuch etwas anderes", „mir gefällt das nicht" — produziert mittelmäßige Ausgabe und teuren Kontext.

**Das Drei-Versionen Pattern.** Fordern Sie Variationen upfront an anstelle sequenzieller Iteration:

```
Generiere drei Versionen dieser Landing Page Hero Section. Jede Version sollte eine
bedeutungsvoll unterschiedliche visuelle Richtung nehmen — unterschiedliche Layout Struktur, nicht
nur unterschiedliche Farben. Bezeichne sie A, B und C.
```

Claude Design rendert alle drei in einem Pass. Sie identifizieren dann die besten Elemente von jedem und komponieren eine Synthese:

```
Wende die Typographie und Headline Hierarchy von Version A auf Version Bs Layout Struktur an.
Halte die CTA Button Treatment von Version C.
```

Das ist schneller und billiger als sequenzielle Iteration und produziert bessere Ergebnisse weil Sie von einer Range von Optionen arbeiten anstelle von graduellem Pushing einer Richtung.

**Inline Comments für gezielte Präzision.** Klicken Sie auf ein Element, fügen Sie einen Kommentar hinzu, beschreiben Sie exakt welche Änderungen nur für dieses Element. Das schränkt den Generation Scope ein — das Modell weiß, dass Sie nicht um einen kompletten Redesign fragen. Benutzen Sie das für Typographie Tweaks, Farbanpassungen, Spacing Korrektionen und Copy Änderungen.

Bekanntes Verhalten: Inline Comments verschwinden manchmal nach Generierung von der Oberfläche. Wenn das passiert, kopieren Sie den Comment Inhalt in den Chat als fokussierten Follow-up Prompt anstelle von vorne anzufangen.

**Draw Mode für Layout Umstrukturierung.** Wenn Sie Major Sections repositionieren brauchen — verschiebe die Sidebar von links nach rechts, verschiebe die Nav von oben nach unten, erstelle ein Split-Screen Layout — benutze Draw Mode um räumliche Absicht direkt anzuzeigen. Zeichnen ist schneller als räumliche Beziehungen im Text zu beschreiben und produziert genauere Layout Änderungen als Chat Prompts für strukturelle Moves.

**Device Preview Toggle.** Schalte zwischen Phone, Tablet und Desktop Views jederzeit um. Das kostet keine Tokens. Bevor du responsive Fixes promtest, überprüfe ob das Issue tatsächlich im aktuellen Breakpoint sichtbar ist — viele responsive Problems die auf Desktop ernst aussehen werden auf Mobile schon gehandhabt oder umgekehrt.

### Was du in deinem Initial Brief spezifizieren solltest

Jeder starke Initial Prompt beinhaltet:

- **Erfolgs-Kriterien**: wie sieht „fertig" aus? („Die Hero Section sollte den Product Value Prop kommunizieren ohne dass der Nutzer scrollen muss")
- **Output Constraints**: Format, Dimensionen, Component Count, Content Länge
- **Was bleibt fixed**: „Halte die Navigation Struktur exakt wie beschrieben — füge keine Nav Items hinzu oder entferne sie nicht"
- **Was kann sich ändern**: „Color Palette, Typographie, Spacing und Section Ordering sind alle offen"
- **Ein oder zwei Non-Negotiables**: „Der Primary CTA muss auf Desktop Above the Fold sichtbar sein"

### Was zu vermeiden ist

- Subjektive Adjektive ohne Referenten: „mehr premium", „fühlt sich vertrauenswürdig an", „sieht modern aus" — alle vom Modell-Prior interpretiert
- Widersprüchliche Constraints ohne Lösung: „minimal aber information-reich" — spezifiziere welche gewinnt wenn sie konfligieren
- Open-ended Structure Prompts spät in der Session: das Fragen nach vollständiger Layout Umstrukturierung nach 10 Messages von Refinement produziert teure und oft inkonsistente Ausgabe
- Correction Loops ohne klare Richtung: „mir gefällt das nicht" ohne zu spezifizieren was falsch ist verschwendet einen Generation Pass

---

## Session Management

Behandele jede Claude Design Session als geplante Produktionsarbeit, nicht als offene Erkundung. Die Token Kosten machen unstrukturierte Sessions teuer. Sessions mit klarem Scope und Vorbereitung produzieren bessere Ausgabe bei niedrigeren Kosten.

### Vor der Session

Liste jeden Component oder Abschnitt, den du in dieser Session produzieren musst, auf. Schreib sie auf. Batch verwandte Components in einen einzelnen Prompt wo möglich — eine Card Component und sein Empty State sind ein Prompt, nicht zwei.

Entscheide, welche Assets du uploadest. Design System Datei, Referenz Screenshots, Codebase Token Datei — montiere diese bevor du startest. Mid-Session Upload hinzufügen fügt Kontext Overhead hinzu.

Definiere die Ausgabe, die du brauchst um Richtung zu validieren. Du brauchst keine Pixel-Perfect Ausgabe um zu bestätigen, dass du in die richtige Richtung gehst. Kenne das Minimum das dir sagt dass der Approach funktioniert und höre auf zu verfeinern wenn du es erreichst.

### Während der Session

Benutze zuerst das Tweaks Panel. Immer. Überprüfe ob die Anpassung die du willst als kostenlos Schieberegler verfügbar ist, bevor du einen Prompt schreibst.

Batch verwandte Änderungen. Wenn du drei Refinements in der Queue hast, schreib sie alle in eine Nachricht.

Beobachte deine Session Länge. Nach 10-12 Message Austauschen, überdenke ob eine frische Session schneller wäre. Wenn du eine fundamental neue Component oder Richtung generierst, wird es fast sicher sein.

### Wann exportieren

Exportiere wenn:
- Die visuelle Richtung validiert ist (Stakeholder oder Self-Review hat den Approach bestätigt)
- Core Layout und Information Hierarchy sind etabliert
- Die Component Struktur ist klar genug dass Claude Code darüber nachdenken kann

Nicht exportieren wenn:
- Du explorerst noch fundamental unterschiedliche Richtungen
- Große strukturelle Änderungen bleiben
- Du iterativ Refinements machst die billiger in Claude Code direkter könnten

Das Handoff Bundle ist keine Pixel-Perfect Spezifikation. Claude Code wird es für responsive Verhalten, Component Library Konventionen und Production Constraints anpassen. Pixel-Perfect Ausgabe von Claude Design vor Handoff zu erwarten fügt Kosten ohne proportionalen Wert hinzu.

### Nach dem Export

Nicht re-exportieren nachdem Implementierung anfängt. Modifikationen nach Handoff passieren in Claude Code direkter — Re-Export erstellt eine zweite Wahrheitsquelle und bricht die Design-to-Code Beziehung. Wenn eine große Design Änderung nach Handoff nötig ist, behandle es als eine neue Design Session für diesen spezifischen Component, nicht ein vollständiger Re-Export.

---

## Design System Setup

Dieser Abschnitt verdient seine eigene Behandlung weil es die einzelne Aktion ist die am ehesten sowohl Output Qualität als auch Token Effizienz für Teams die Claude Design über multiple Projekte nutzen verbessert.

### Warum es wichtig ist

Ohne ein Design System in Claude Design produziert jede Session Output kalibriert auf generische Web Design Konventionen. Das Modell kennt nicht deine Farbpalette, deine Type Scale, dein Component Vokabular oder deinen Spacing Rhythmus. Es defaulted auf seine trainierte Ästhetik. Du spendest Tokens um es auf jeder Session zu deiner Marke zu korrigieren.

Mit einem Design System startet jede Session on-brand. Das Modell kennt deine Tokens und kann sie ohne Korrektur anwenden. Refinement Passes fokussiert sich auf Layout und Content statt Brand Alignment.

### Was zu uploaden ist

Lade in dieser Prioritätsreihenfolge:

1. Deine `tokens.json` oder CSS Custom Properties Datei — direkte maschinen-lesbare Token Definitionen sind die höchste-Treue Input
2. Deine `tailwind.config.js` oder äquivalente Theme Konfiguration — gibt Claude Design deine Utility Class Mappings und Breakpoints
3. Fertige Screenshots von deinem Live Product oder letztem Release — visuelle Evidenz was deine Marke in der Praxis aufgelöst ist
4. Deine Storybook URL oder Component Screenshots — etabliert welche Components schon existieren und wie sie aussehen
5. Dein Brand PDF oder Style Guide — für Ton, Logo Usage und Typografische Hierarchie Regeln

### Was Claude Design extrahiert

Von diesen Inputs extrahiert Claude Design:
- Color Tokens mit semantischer Namensgebung (primary, secondary, destructive, muted, usw.)
- Typographie Scale (Size Ramp, Weight Konventionen, Line-Height Regeln)
- Spacing System (deine Base Unit, gemeinsame Spacing Values)
- Component Konventionen (existierende Component Namen, Varianten, States)
- Grid und Layout Patterns (Column Counts, Gutter Widths, Max-Width Constraints)

### Das Setup validieren

Bevor du das Design System in Production Sessions benutzt, generiere einen Test Component — etwas Einfaches und Well-Defined, wie einen Button in allen States oder eine Card Component. Überprüfe ob die Ausgabe deine Brand Tokens und Component Konventionen akkurat widerspiegelt. Wenn nicht, identifiziere was von deinen Uploads fehlt und verfeinere das Setup bevor du fortfährst.

Validierung kostet Tokens. Budget für eine Test Session pro Design System Setup.

### Instandhaltung

Wenn dein Design System evolvet — neue Color Tokens, neue Component Patterns, aktualisierte Typographie — update deine Claude Design Setup Dateien um zu entsprechen. Ein Stale Design System Setup produziert Ausgabe die von deinem aktuellen Production Design mit der Zeit divergiert.

---

## Varianten Erkundung

### Bitte um Varianten Upfront

Das Anfordern von drei Varianten im Initial Prompt kostet ungefähr gleich viel wie eins anzufordern — Claude Design rendert alle drei in einem Generation Pass. Sequenzielle Varianten Erkundung (generiere eine, lehne ab, generiere eine weitere) kostet dreimal mehr und sammelt Kontext Overhead.

### Varianten mischen

Nach drei Varianten überprüft, benutze das Tweaks Panel und fokussierte Chat Prompts um Features von unterschiedlichen Versionen zu vermischen. Das ist kostenlos für Panel-adjustable Properties und günstig für Chat-driven Changes weil der Scope eng und die Absicht klar ist.

Dokumentiere was du von jeder Version nimmst bevor du Änderungen machst: „Color Treatment von Version A, Layout Struktur von Version B, CTA Hierarchy von Version C." Dieser Brief ist auch nützlich für die Handoff Bundle Annotation.

### Dokumentiere vor dem Schließen

Vor dem Ende einer Session, beachte:
- Welche Richtung wurde gewählt und warum
- Was wurde abgelehnt und warum
- Welche Refinements bleiben für die nächste Session
- Alle Design Entscheidungen, die Stakeholder Review brauchen

Diese Dokumentation lebt außerhalb von Claude Design (eine Note, eine Project Datei, ein Brief). Claude Design Session History ist kein zuverlässiger Design Record.

---

## Reale Produktivitätsdaten

Community Forschung über Freelancer, Agenturen und Product Teams, die Claude Design in 2025-2026 nutzen, produzierte diese Benchmarks. Diese Nummern variieren durch Project Complexity und Designer Erfahrung, aber die direktionalen Patterns sind konsistent.

| Aufgabe | Ohne Claude Design | Mit Claude Design | Einsparungen |
|------|----------------------|-------------------|---------|
| Product Prototype (3-5 Screens) | 14 Stunden | 3,5 Stunden | 75% |
| Freelance Project Delivery | Baseline | 3,8x schneller | — |
| Agency Client Handoff Vorbereitung | Baseline | 62% schneller | — |
| Landing Page (Idee zu deploybarem HTML) | Multiple Tage | 45 Minuten | — |
| Pitch Deck (volle Präsentation) | 4-6 Stunden | Unter 30 Minuten | — |
| Mobile App Flow (3-5 Screens) | 1-2 Tage | 1-2 Stunden | — |

Diese Nummern repräsentieren Zeiteinsparungen, nicht Qualitätsäquivalenz. Claude Design Ausgabe braucht typisch Implementierungsarbeit in Claude Code für Production Bereitschaft. Die Einsparungen sind in Erkundung, Ausrichtung und validierter Richtung — nicht fertige Production Assets.

---

## Wenn Claude Design fehlschlägt

Das Verstehen der Fehlermodi bevor du sie triffst spart Zeit und Kontingent.

**Abwesenheit eines Design Systems.** Das ist der häufigste Fehlermodus. Ohne ein Design System kann Claude Design keine On-Brand Ausgabe produzieren. Jede Session braucht komplette Restyle Korrektionen. Teams die Design System Setup überspringen geben ihre Session Tokens für Brand Korrektur aus anstelle von Design Erkundung. Wenn du On-Brand Ausgabe brauchst und nicht ein Design System setup können, ist Claude Design nicht das richtige Tool für dieses Projekt.

**Übermäßig komplexe Briefs mit widersprüchlichen Constraints.** Ein Brief mit 10+ spezifischen Anforderungen die untereinander in Konflikt sind produziert Ausgabe die keine erfüllt. Das Modell löst Widersprüche nach seinen Training Priors auf, nicht deiner Absicht. Wenn dein Brief mehr als 6-7 Hard Constraints hat, priorisiere sie explizit und drop die niedrigsten-Priorität von den Initial Prompt.

**Datenvisualisierung.** Claude Design priorisiert ästhetische Qualität über Data Usability in Chart und Graph Ausgabe. Ein Bar Chart wird schön aussehen. Die Axis Labels können bei Scale unlesbar sein, die Farb Optionen können inaccessible sein und das Data-to-Ink Ratio kann schlecht sein. Wenn du Data Visualization generierst, add explizite Korrektur Prompts: „Priorisiere Lesbarkeit und Accessibility über Ästhetik. Stelle sicher alle Labels sind bei dieser Auflösung lesbar."

**Benutzerdefinierte Illustrationen.** Claude Design ist nicht ein Illustration Tool. Es kann Illustration-Style Elemente platzieren und Illustration Konzepte suggerieren, aber präzise benutzerdefinierte Illustration Arbeit — benutzerdefinierte Icons, Brand Maskottchen, komplexe Infografiken — braucht ein echtes Design Tool. Benutze Claude Design um die Illustration Brief zu spezifizieren, dann exekutiere in Figma, Illustrator oder ein spezialisiertes AI Illustration Tool.

**Multiplayer und Team Review Workflows.** Claude Design hat keine Real-Time Collaboration. Eine Person fährt die Session. Wenn dein Team simultanes Editing, Comment Threads, Version History zugänglich für Multiple Stakeholders oder Dev Mode Messungen braucht — benutze Figma. Claude Design konkurriert nicht mit Figma bei Collaboration.

---

## Handoff zu Claude Code — Der richtige Moment

Die Handoff Entscheidung ist wo die meisten Zeit verloren geht. Teams exportieren entweder zu früh (bevor Richtung klar ist, verursacht Rework) oder zu spät (ausgeben Tokens um Pixel in Claude Design zu perfektionieren wenn Claude Code es in Minuten handhabt).

### Exportiere wenn das wahr ist

- **Visuelle Richtung validiert**: mindestens eine Stakeholder (oder du für Solo Projects) hat bestätigt der Approach ist richtig
- **Core Layout etabliert**: die Information Hierarchy, Section Struktur und Primary User Flow sind klar
- **Component Struktur klar**: Claude Code kann darüber nachdenken was Components existieren und wie sie sich beziehen
- **Content nah genug**: Placeholder Content ist gut; die Struktur und relative Sizing von Content Areas sind etabliert

### Nicht exportieren wenn

- Du explorerst noch ob ein fundamental unterschiedlicher Approach besser ist
- Das Design hat große ungelöste strukturelle Fragen („sollte das eine Sidebar oder eine Top Nav sein?" ist eine strukturelle Frage — löse es vor Handoff)
- Du kleine iterative Refinements machst die Claude Code billiger direkter handhabt

### Was beim Handoff passiert

Das Handoff Bundle enthält Layout Specs, Design Tokens, Component Annotationen und Responsive Breakpoint Notizen. Claude Code nutzt das um die Design zu implementieren — aber es wird das Layout für echte Component Libraries, echtes Breakpoint Verhalten und Production Constraints anpassen. Einige Deviation vom visuellen Design ist erwartet und korrekt. Behandle das Bundle als einen starken Brief, nicht eine Pixel-Perfect Spezifikation.

Nach Handoff anfängt, modifiziere in Claude Code. Nicht re-exportieren und re-handoff für inkrementelle Änderungen — das erstellt zwei Quellen der Wahrheit und macht die Implementierung schwerer zu maintainan.

---

## Checklisten

### Vor deiner ersten Session

- [ ] Design System Dateien montiert: `tokens.json` oder CSS Variables, `tailwind.config.js` oder Theme Config
- [ ] Referenz Screenshots gesammelt: Live Product, neueste Designs, Key Brand Beispiele
- [ ] Design System Setup Session abgeschlossen und validiert mit einen Test Component
- [ ] Session Scope definiert: Liste von Components oder Screens diese Session produziert
- [ ] Brief geschrieben: Erfolgs-Kriterien, Output Constraints, Non-Negotiables, was ändern kann
- [ ] Externe Layout Skizze fertig (optional): grobe Struktur beschrieben im Text oder gerough in Google Stitch

### Per-Session Checklist

- [ ] Tweaks Panel überprüft bevor Refinement Prompts schreiben
- [ ] Anfragen gebündelt: verwandte Änderungen kombiniert zu einzelnen Messages
- [ ] Drei-Versionen Erkundung benutzt für First Draft von neuem Components
- [ ] Session Länge monitored: frische Session gestartet wenn History wird stale
- [ ] Inline Comments benutzt für Element-Level Präzision anstelle von Full-Generation Prompts
- [ ] Abgelehnte Richtungen dokumentiert (was wurde versucht, warum wurde abgelehnt)

### Vor Handoff zu Claude Code

- [ ] Visuelle Richtung validiert (Stakeholder Sign-off oder Self-Review fertig)
- [ ] Core Layout und Information Hierarchy etabliert
- [ ] Component Struktur klar: was existiert, was ist genested, was ist Standalone Element
- [ ] Handoff Bundle exportiert und überprüft: bestätigen `layout.json`, `tokens.json`, `components.md` und `preview.png` sind vorhanden
- [ ] Implementierungs Noten hinzugefügt zu Bundle: alles Claude Code wissen sollte das nicht sichtbar in der Layout Spec ist
- [ ] Team informiert: jeder der Codebase trifft weiß der Handoff ist in Progress und wo das Bundle lebt
