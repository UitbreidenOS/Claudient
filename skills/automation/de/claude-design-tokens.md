# Claude Design Token-Management

## Wann aktivieren

- Sie möchten eine Claude Design-Sitzung auf Claude Pro oder Max starten und den Token-Verbrauch vor dem Öffnen des Tools planen
- Sie haben Token-Limits in der Mitte einer Sitzung erreicht und benötigen Wiederherstellungsstrategien, um die Arbeit fortzusetzen
- Sie bauen für ein Team und müssen die kollektive Nutzung über mehrere Mitglieder optimieren, die einen Plan teilen
- Sie planen eine Reihe zusammenhängender Designprojekte (Dashboard + Landing Page + Pitch Deck) und müssen diese effizient sequenzieren

## Wann NICHT verwenden

- Sie haben Claude Max 20× — der Token-Druck ist auf dieser Stufe minimal; konzentrieren Sie sich stattdessen auf die Ausgabequalität
- Sie führen eine einmalige Exploration durch, die Sie nicht speichern oder an jemand anderen übergeben müssen
- Sie haben bereits Ihr Designsystem gebaut und stabilisiert — die meisten Strategien unten gelten während des Setups und der aktiven Produktion, nicht der Wartung

## Anweisungen

### Strategie 1: Design System ROI — Bauen Sie, bevor Sie bauen

Die Investition mit dem höchsten Hebeleffekt ist Session 0: Bauen Sie das komplette Designsystem, bevor Sie reale Projektarbeiten anfassen.

Kosten: signifikante vorgelagerte Token-Ausgaben, typischerweise eine vollständige Sitzung.

Auszahlung: jede nachfolgende Sitzung erbt automatisch die Marke. Keine Korrekturzyklen. Keine Umgestaltung in der Mitte der Sitzung. Keine Token verschwendet, um Claude mit Farben, Typografie oder Abstände vertraut zu machen, die Sie bereits definiert haben.

Session 0 Setup-Protokoll:

1. Laden Sie die Codebasis (oder einen repräsentativen Komponenten-Snapshot) zusammen mit fertiggestellten Produktscreenshots und Markendateien (Logo, Markenrichtlinie PDF falls verfügbar) hoch.
2. Bitten Sie Claude, Farb-Tokens, Typografie-Skala, Abstands-System, Border-Radius-Konventionen und Komponenten-Muster aus dem zu extrahieren, was es sieht.
3. Bitten Sie Claude, jeden Token semantisch zu benennen, nicht deskriptiv — `color-primary` nicht `color-blue`, `spacing-section` nicht `spacing-48px`.
4. Exportieren Sie das Ergebnis als Token-Dokument, das Sie zu Beginn jeder zukünftigen Sitzung einfügen. Dies ist Ihre Sitzungs-Grundlage — zwei Absätze, die Claude vollständigen visuellen Kontext ohne Neuupload geben.

Ohne Session 0 beginnt jede Projektsitzung mit einer Steuer: Claude rät die Markenabsicht, Sie korrigieren sie, Token werden für Wiederherstellung statt für Ausgabe ausgegeben.

### Strategie 2: Das Tweaks-Panel — Ihre kostenlose Schicht

Die am wenigsten genutzte Funktion in Claude Design. Typografie-, Farb-, Abstands- und Layout-Anpassungen im Tweaks-Panel verbrauchen null Chat-Tokens. Null.

Arbeitsablauf:

1. Generieren Sie ein Design mit einer Eingabeaufforderung.
2. Bevor Sie eine weitere Eingabeaufforderung senden, verbringen Sie 15-20 Minuten im Tweaks-Panel — passen Sie Schriftgrößen an, straffen Sie Abstände, verschieben Sie Farben zur Marke.
3. Kehren Sie zum Chat nur zurück, wenn Tweaks nicht erreichen kann, was Sie benötigen (strukturelle Layout-Änderungen, neue Komponenten, Inhaltsumschreibungen).

Geschätzter Effekt: 30-40% weniger Eingabeaufforderungen pro Sitzung, was sich direkt in weniger Token-intensiven Durchläufen übersetzt.

Die Falle zu vermeiden: Eingabeaufforderungen für kleine visuelle Anpassungen (« Machen Sie die Überschrift etwas größer », « Reduzieren Sie die Polsterung auf der Karte »), die das Tweaks-Panel sofort verwaltet. Jede vage Anpassungsaufforderung, die Sie vermeiden, ist ein Korrekturzyklus, in den Sie nie eintreten.

### Strategie 3: Dichte gebündelte Eingabeaufforderungen

Vage Eingabeaufforderungen erzeugen Korrekturketten. Eine einzelne vage Anfrage wird zu fünf Durchläufen: erste Ausgabe, Ihre Korrektur, Claudes Versuch, eine weitere Korrektur, endgültige Ausgabe. Fünf Durchläufe kosten fünf bis zehnmal die Tokens eines dichten Durchlaufs.

Struktur für eine dichte gebündelte Eingabeaufforderung:

- Was ändert sich: Listen Sie 3-5 spezifische Änderungen in einem Absatz auf
- Was bleibt fest: verankern Sie explizit alles, das sich nicht bewegen sollte (« behalten Sie die Seitenleisten-Nav, behalten Sie die Hero-Höhe, behalten Sie die gesamte Typografie unverändert »)
- Erfolgskriterien: beschreiben Sie, wie das Ergebnis aussehen sollte, wenn es richtig ist
- Explizite Vermeidungen: nennen Sie Antimuster, zu denen Claude abdriften könnte (« nicht kartenreich, keine Serif-Header, keine Gradienten-Hintergründe »)

Dichte erste Entwürfe sind erfolgreich etwa 66% der Zeit beim ersten Versuch. Vage Eingabeaufforderungen teilen sich in 5 oder mehr Korrektur-Durchläufe mit hoher Häufigkeit.

Schreiben Sie Ihre Eingabeaufforderung in einem Texteditor, bevor Sie sie einfügen. Wenn es weniger als 30 Sekunden zum Schreiben dauert, ist es wahrscheinlich zu vage.

### Strategie 4: Sitzungs-Reset-Auslöser

Lange Sitzungen sammeln Kontextaufwand an. Bei jedem Durchlauf liest Claude die vollständige Gesprächshistorie erneut. Bei Durchlauf 15 zahlen Sie eine wachsende Kontextsteuer für jede Eingabeaufforderung, und die Ausgabequalität verschlechtert sich oft, wenn die Sitzung an Kohärenz verliert.

Zurücksetzen, wenn eine dieser Bedingungen wahr ist:

- Sie wechseln von einer unzusammenhängenden Aufgabe zu einer anderen (Dashboard fertig, Landing Page wird gestartet)
- Die Sitzung hat 10-12 Eingabeaufforderungen überschritten
- Die Ausgabequalität verschlechtert sich sichtbar — Komponenten weichen von der Marke ab, Claude ignoriert Einschränkungen, die Sie früher festgelegt haben

Reset-Prozedur:

1. Schreiben Sie eine 2-Satz-Sitzungs-Grundlage: Was ist das Designsystem (Farben, Typografie, wichtige Einschränkungen) und was bauen Sie jetzt.
2. Öffnen Sie eine neue Sitzung. Fügen Sie die Grundlage als Ihre erste Nachricht ein.
3. Setzen Sie fort, wo Sie aufgehört haben.

Gleiche Ausgabequalität. Bedeutend niedrigere Token-Kosten pro Durchlauf. Kein Kontextaufwand.

### Strategie 5: Economics der Bild-Uploads

Bild-Uploads sind der teuerste Input-Typ in Claude Design-Sitzungen. Verwenden Sie sie absichtlich.

Wann Bilder hochladen:

- Fertige Produkt-Screenshots während Session 0 Setup — nicht verhandelbar. Claude lernt mehr von einem echten Produkt als vom Lesen von Spezifikationsdokumenten. Dies ist der eine Ort, an dem Upload-Kosten klares ROI haben.
- Referenz-Screenshots, wenn Sie Claude zur Entsprechung eines spezifischen visuellen Treatments benötigen, das er aus der Beschreibung nicht ableiten kann.

Wann stattdessen Text verwenden:

- Rohe Skizzen und Wireframes — beschreiben Sie das Layout in Text. « Drei-Spalten-Raster, Symbol links, Überschrift und Body rechts, keine Bilder » ist so effektiv wie ein Skizzen-Upload und kostet einen Bruchteil der Tokens.
- Layout-Konzepte — räumliche Beziehungen sind beschreibbar. Reservieren Sie Uploads für visuelle Treatments (Farbe, Textur, Illustrationsstil), die Text nicht erfassen kann.

Wenn Sie eine Skizze hochladen, um ein Layout zu erklären, schreiben Sie stattdessen die Layout-Beschreibung.

### Strategie für Abonnement-Ebene

**Pro-Benutzer** — behandeln Sie Claude Design als geplante Produktionsläufe, nicht als Sandbox. Jede Sitzung sollte ein definiertes Ausgabeziel haben, bevor Sie das Tool öffnen. Design System Setup in Session 0 ist obligatorisch, bevor Sie ein echtes Projekt starten. Verwenden Sie das Tweaks-Panel aggressiv. Budgetieren Sie Eingabeaufforderungen pro Sitzung vor dem Start.

**Max 5×** — moderat Sorgfalt ist immer noch angebracht. Verwenden Sie das Tweaks-Panel zuerst, bevor Sie auffordern. Batch zusammenhängende Änderungen. Setzen Sie Sitzungen zurück, wenn Sie zu Hauptaufgaben wechseln. Sie haben mehr Spielraum als Pro, aber nicht unbegrenzt.

**Max 20×** — Token-Druck ist minimal. Konzentrieren Sie sich ganz auf Ausgabequalität: längere Eingabeaufforderungen mit mehr Detail, mehr Iterationen, um das richtige visuelle Treatment zu erreichen. Die Strategien oben erzeugen immer noch bessere Ausgaben, aber Sie werden nicht für das Überspringen bestraft.

## Beispiel

Ein Pro-Benutzer plant drei zusammenhängende Projekte: ein Produkt-Dashboard, eine Marketing-Landing Page und ein Pitch Deck. Alle drei müssen Marken-Konsistenz teilen.

**Falsche Sequenz** — starten Sie das Dashboard direkt, erhalten Sie Marken-Drift, verbringen Sie 30% der Sitzung mit Farbkorrektionen und Typografie, exportieren, starten Sie die Landing Page, wiederholen Sie die gleichen Korrektionen.

**Richtige Sequenz:**

Session 0 — Design System Setup. Laden Sie Produkt-Screenshots + Markendateien hoch. Extrahieren Sie den vollständigen Token-Satz. Exportieren Sie eine 200-Wort-Sitzungs-Grundlage (Farben, Typografie, Abstände, Komponenten-Konventionen). Geschätzter Token-Verbrauch: eine vollständige Sitzung.

Session 1 — Dashboard. Fügen Sie die Sitzungs-Grundlage als erste Nachricht ein. Schreiben Sie eine dichte Eingabeaufforderung für das vollständige Layout: Seitenleisten-Nav, Datentabelle, Stat-Karten, Header. Verbringen Sie 20 Minuten in Tweaks, um Abstände und Typografie anzupassen, bevor Sie erneut auffordern. Verwenden Sie insgesamt 2-3 Chat-Eingabeaufforderungen. Setzen Sie die Sitzung beim Übergang zum nächsten Abschnitt zurück.

Session 2 — Landing Page. Gleiche Grundlage. Eine dichte Eingabeaufforderung für Hero, Features-Abschnitt und CTA. Tweaks zum Feintuning. Maximum 3-4 Chat-Eingabeaufforderungen.

Session 3 — Pitch Deck. Gleiche Grundlage. Eine dichte Eingabeaufforderung pro Foliengruppe (Intro-Folien, Produkt-Folien, Finanzen, Abschluss). Keine Bild-Uploads — beschreiben Sie Folien-Layouts in Text.

Gesamter Token-Verbrauch mit dieser Sequenz: deutlich niedriger als drei nicht-sequenzierte Sitzungen, mit konsistenter Markenausgabe über alle drei Projekte.
