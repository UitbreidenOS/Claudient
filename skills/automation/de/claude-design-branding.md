# Claude Design Brand-System-Setup

## Wann aktivieren

- Konfiguration von Claude Design zum ersten Mal für ein Projekt oder Unternehmen — kein vorheriges Designsystem existiert im Tool
- Starten eines neuen Client-Projekts in Claude Design, wenn der Client eine vorhandene Marke hat
- Design-Ausgaben aus Claude Design stimmen nicht mit der Unternehmensmarke überein (Farben sind daneben, Typografie ist falsch, Abstände fühlen sich inkonsistent an)
- Team-Mitglieder erhalten inkonsistente Ergebnisse in Sitzungen, weil es keinen gemeinsamen Ausgangspunkt gibt

## Wann NICHT verwenden

- One-Off Prototyp, der nicht wiederverwendet oder übergeben wird — die Setup-Kosten übersteigen den Wert
- Erkundung einer brandneuen visuellen Identität, wo keine vorhandene Marke existiert — Sie definieren die Marke, übersetzen sie nicht
- Schnelle Wegwerf-Mockup für einmalige Validierung — überspringen Sie Setup und Aufforderung direkt

## Anweisungen

### Schritt 1: Marken-Grundlage

Bevor Sie Farben oder Typografie berühren, geben Sie Claude den Kontext, der alle visuellen Entscheidungen regelt.

Zur Verfügung stellen:

- Unternehmensname und Branche
- Zielgruppe (seien Sie spezifisch — « Enterprise-Beschaffungsleiter im Alter von 35-55 Jahren » ist nützlicher als « B2B »)
- Drei Marken-Persönlichkeitsadjektive (z. B. « präzise, zugänglich, modern » oder « mutig, verspielt, energisch »)
- Ton-Deskriptor: professionell / beiläufig / spielerisch / autoritär
- Alle bestehenden Markenaussagen oder Positionierungslinien

Claude nutzt dies, um fundamentale visuelle Prinzipien zu generieren — die Reasoning-Schicht, die hinter jeder Farb- und Abstandsentscheidung sitzt. Wenn Sie später fragen « sieht das richtig aus », bewertet Claude dagegen diese Prinzipien, nicht raten.

Dokumentieren Sie die Ausgabe. Fügen Sie sie am Anfang jeder neuen Sitzung als Teil Ihrer Sitzungs-Grundlage ein.

### Schritt 2: Farbsystem

Definieren Sie alle Farbrollen explizit. Lassen Sie Claude die Palette nicht aus einer einzelnen Primärfarbe ableiten — nennen Sie alle Rollen.

**Primärpalette:**
- Primär: die dominante Aktionsfarbe (Schaltflächen, Links, wichtige Highlights)
- Primär-Hover: um 10-15% dunkler für Interaktionszustände
- Primär-Subtle: um 85-90% aufgehellt für Hintergründe und Töne

**Sekundärpalette:**
- Sekundär: unterstützende Akzentuierungsfarbe
- Sekundär-Hover
- Sekundär-Subtle

**Neutrale Palette:**
- Neutral 50 bis Neutral 950 (oder äquivalente Skala) — verwendet für Oberflächen, Grenzen, Text

**Semantische Farben** — geben Sie immer Hex-Werte an, verlassen Sie sich nicht auf Standards:
- Erfolg: normalerweise grün (#16A34A als Referenzpunkt)
- Warnung: normalerweise Bernstein (#D97706)
- Fehler: normalerweise rot (#DC2626)
- Info: normalerweise blau (#2563EB)

Jede semantische Farbe benötigt ein Vordergrund-Paar — die Textfarbe, die darauf sitzt und den WCAG AA-Kontrast (4.5:1 für Fließtext, 3:1 für großen Text) besteht.

**Oberflächenfarben:**
- Hintergrund: Seitenhintergrund
- Oberfläche: Karten- und Panel-Hintergrund
- Oberfläche erhöht: erhobene Komponenten (Modals, Dropdowns)
- Overlay: Scrim hinter Modals

**Textfarben:**
- Text primär: Fließtext auf hellen Oberflächen
- Text sekundär: unterstützender Text, Etiketten
- Text deaktiviert: gedämpfter, nicht interaktiver Text
- Text invers: Text auf dunklen oder farbigen Hintergründen

Includieren Sie explizite WCAG AA-Validierung für jede Text/Hintergrund-Kombination, die Sie definieren. Claude flaggt Fehler, wenn Sie fragen, aber es ist schneller, zum Definitionszeitpunkt zu validieren als Kontrastprobleme während der Komponentenerzeugung zu entdecken.

### Schritt 3: Typografie-Skala

Geben Sie Schriftpaarungen an, die der Marken-Persönlichkeit entsprechen — die Paarungswahl signalisiert mehr über Markencharakter als jede andere einzelne Entscheidung.

Häufige Paarungsmuster:

- Autoritär/Enterprise: geometrisches Sans für Überschriften (Inter, DM Sans) + humanistisches Sans für Body (Source Sans Pro)
- Editorial/Premium: Serif für Display (Playfair Display, Libre Baskerville) + Sans für Body (Inter)
- Technisch/Entwickler: Mono für Code-Akzent (JetBrains Mono) + neutrales Sans für alles andere (Inter)
- Spielerisch/Consumer: rundliches Sans für Überschriften (Nunito, Poppins) + neutrales Sans für Body

Definieren Sie die vollständige Skala mit semantischen Namen, nicht Zahlenwerten:

**Überschriften:**

| Token | Größe | Gewicht | Zeilenhöhe | Verwendung |
|---|---|---|---|---|
| display | 3rem | 700 | 1.1 | Hero-Überschriften, Splash-Screens |
| h1 | 2.25rem | 700 | 1.2 | Seitentitel |
| h2 | 1.875rem | 600 | 1.25 | Abschnittsüberschriften |
| h3 | 1.5rem | 600 | 1.3 | Unterabschnittsüberschriften |
| h4 | 1.25rem | 600 | 1.35 | Karten-Überschriften, Seitenleisten-Titel |

**Body:**

| Token | Größe | Gewicht | Zeilenhöhe | Verwendung |
|---|---|---|---|---|
| body-large | 1.125rem | 400 | 1.6 | Lead-Absätze, Einleitungen |
| body | 1rem | 400 | 1.6 | Standard-Absatztext |
| body-small | 0.875rem | 400 | 1.5 | Unterstützungstext, Metadaten |
| caption | 0.75rem | 400 | 1.4 | Bildunterschriften, Kleingedrucktes |

**Utility:**

| Token | Größe | Gewicht | Zeilenhöhe | Verwendung |
|---|---|---|---|---|
| label | 0.875rem | 500 | 1.2 | Formular-Etiketten, Tabellen-Header |
| overline | 0.75rem | 600 | 1.2 | Kategorie-Etiketten, Abschnitts-Marker — immer Großbuchstaben |
| code | 0.875rem | 400 | 1.6 | Inline-Code, Code-Blöcke |

Claude Design wendet diese Tokens automatisch auf jedes generierte Element an, sobald das System etabliert ist. Sie müssen Größen nicht pro Anfrage neu spezifizieren.

### Schritt 4: Logo-Richtlinien

Geben Sie Claude die Einschränkungen, die es in jeder Ausgabe respektieren muss. Dies verhindert, dass Claude mit Ihrem Logo auf Weise improvises, die gegen Markenstandards verstoßen.

Spezifizieren Sie:

- **Verfügbare Varianten:** primär (vollständiges Logo), umgekehrt (weiß/helle Version für dunkle Hintergründe), nur Symbol (Marke ohne Wortmarke)
- **Genehmigte Farbkombinationen:** primäres Logo auf Weiß, umgekehrtes Logo auf Primärfarben-Hintergrund, etc.
- **Clear Space Rule:** minimales Clear Space auf allen Seiten, ausgedrückt als Vielfaches einer Logo-Einheit (typischerweise die Höhe der x-Höhe oder Großbuchstabenhöhe der Marke)
- **Minimum Größen:** Mindestbreite in Pixeln für digitale Nutzung, Mindestbreite in Millimetern für Druck
- **Verbotene Änderungen:** keine Farbänderung, keine Rotation, kein Dehnen, keine Schlagschatten, keine Umriss-Striche

Wenn Sie ein Markenrichtlinien-PDF mit Logo-Spezifikationen haben, laden Sie es während Sitzung 0 hoch. Claude liest und respektiert diese Einschränkungen in nachfolgenden Ausgaben, ohne dass Sie diese pro Sitzung neu spezifizieren müssen.

### Schritt 5: Komponentenbibliothek — Beginnen Sie mit hochfrequenten Komponenten

Bauen Sie zuerst die Komponenten, die Claude am häufigsten verwenden wird. Hochfrequente Komponenten erscheinen in fast jedem Bildschirm; sie richtig zu machen eliminiert die größte Quelle für Marken-Drift.

Prioritätsreihenfolge:

**Schaltflächen** — definieren Sie vier Basis-Varianten:
- Primär: gefüllt, nutzt `color-primary`, weißer Text
- Sekundär: outlined, `color-primary` Grenze und Text, transparenter Hintergrund
- Ghost: keine Grenze, `color-primary` Text, transparenter Hintergrund
- Destruktiv: gefüllt, nutzt `color-error`, weißer Text

Geben Sie für jede Variante an: Höhe, horizontales Polster, Border Radius, Font Token, und alle Interaktionszustände (Standard, Hover, Aktiv, Focus-Visible, Deaktiviert). Der deaktivierte Zustand muss reduzierte Deckkraft oder eine spezifische muted Farbe verwenden — entfernen Sie das Element nie aus dem Layout.

**Formulareingaben** — definieren Sie: Texteingabe, Textarea, Auswahl, Checkbox, Radiobutton. Für jedes: Höhe (Eingaben), Grenzenfarbe (Standard, Focus, Fehler, Deaktiviert), Etikett-Position, Hilfetextes-Position, Fehlermeldungs-Styling.

**Karten** — definieren Sie Varianten nach Inhaltstyp:
- Inhalts-Karte: Bild + Titel + Body + optionale CTA
- List-Karte: Symbol oder Avatar + Titel + sekundärer Text + optionale Aktion
- Stat-Karte: Metrikwert + Etikett + optionaler Trend-Indikator

Includieren Sie Hover-Zustand (Erhöhungsänderung oder Grenze-Highlight) für interaktive Karten.

**Navigation** — definieren Sie: primärer Header (Logo + Nav-Links + CTA + mobiler Menu-Trigger), Seitenleisten-Nav (gruppierte Links + aktiver Zustand + verschachtelte Links), Breadcrumb.

Für jede Komponente: geben Sie exakten Abstand (verwenden Sie Ihre Spacing-Scale-Tokens, nicht Pixelwerte), Farben (verwenden Sie Ihre Farb-Tokens), Border Radius (konsistent mit Ihrem globalen Radius-Token), Typografie-Tokens, und alle Interaktionszustände an.

### Schritt 6: Dokumentations-Schicht

Schreiben Sie für jede Komponente in Ihrer Bibliothek einen kompakten Nutzungsvertrag. Dies ist die Schicht, die Missbrauch verhindert und das System selbst-unterrichtend für Team-Mitglieder macht.

Für jede Komponentendokumentation:

**Wann zu verwenden** — spezifische Szenarien, in denen diese Komponente die richtige Wahl ist. « Verwenden Sie eine primäre Schaltfläche für die höchste Prioritäts-Aktion auf einer Seite oder einem Modal. »

**Wann NICHT zu verwenden** — Antipatronen. « Verwenden Sie nicht primäre Schaltflächen für mehr als eine Aktion pro Bildschirm. Verwenden Sie sie nicht für Navigation — verwenden Sie stattdessen einen Link. »

**Verwandte Komponenten** — Navigations-Anleitung. « Wenn Sie eine sekundäre Aktion benötigen, verwenden Sie eine sekundäre Schaltfläche oder Ghost-Schaltfläche. Wenn Sie Inline-Navigation benötigen, verwenden Sie einen Text-Link. »

**Barrierefreiheits-Anmerkungen** — Mindestanforderungen:
- Fokus-Zustand: sichtbarer Fokus-Ring (2px Versatz, `color-primary` oder äquivalenter hochkontrast Ring)
- ARIA-Rolle: geben Sie für nicht-native Elemente an
- Farbunabhängigkeit: vermeiden Sie, dass Zustand durch Farbe allein vermittelt wird (fügen Sie Symbol oder Text-Label neben Farbe hinzu)
- Minimum Touch-Ziel: 44x44px für interaktive Elemente

### Schritt 7: Exportieren und Verwalten

Geben Sie Ihr komplettes Designsystem gleichzeitig in drei Formaten aus, damit es von jeder nachgelagerten Werkzeugkette verwendet werden kann.

```css
/* CSS Custom Properties — fügen Sie in :root in globales Stylesheet ein */
:root {
  /* Color — primary */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-subtle: #EFF6FF;

  /* Color — semantic */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-info: #2563EB;

  /* Color — surface */
  --color-background: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-surface-raised: #FFFFFF;

  /* Color — text */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #D1D5DB;
  --color-text-inverse: #FFFFFF;

  /* Typography */
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}
```

```json
{
  "color": {
    "primary": { "value": "#2563EB" },
    "primary-hover": { "value": "#1D4ED8" },
    "primary-subtle": { "value": "#EFF6FF" },
    "success": { "value": "#16A34A" },
    "warning": { "value": "#D97706" },
    "error": { "value": "#DC2626" },
    "info": { "value": "#2563EB" },
    "background": { "value": "#FFFFFF" },
    "surface": { "value": "#F9FAFB" },
    "text-primary": { "value": "#111827" },
    "text-secondary": { "value": "#6B7280" },
    "text-disabled": { "value": "#D1D5DB" },
    "text-inverse": { "value": "#FFFFFF" }
  },
  "spacing": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" }
  },
  "radius": {
    "sm": { "value": "0.25rem" },
    "md": { "value": "0.5rem" },
    "lg": { "value": "0.75rem" },
    "full": { "value": "9999px" }
  }
}
```

```js
// tailwind.config.js — extend theme with brand tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          subtle: '#EFF6FF',
        },
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#2563EB',
        surface: '#F9FAFB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-disabled': '#D1D5DB',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
    },
  },
}
```

Versionskontrolle die Tokens JSON-Datei. Behandeln Sie sie als Wahrheitsquelle — die CSS- und Tailwind-Configs stammen davon ab. Wenn die Marke sich entwickelt, aktualisieren Sie zuerst die Tokens JSON, dann regenerieren Sie die anderen Formate.

### Validierungsschritt

Bevor Sie das System auf einem echten Projekt verwenden, führen Sie eine Validierungsprüfung aus. Generieren Sie eine Test-Komponente — eine Schaltflächengruppe mit primären, sekundären, Ghost- und destruktiven Varianten — und verifizieren Sie:

- Farben stimmen genau mit Ihren definierten Hex-Werten überein
- Typografie-Tokens werden angewendet (nicht Claude-Standardwerte)
- Abstand und Border Radius stimmen mit Ihrer Skala überein
- Hover-Zustände sind vorhanden und korrekt

Wenn die Ausgabe in einer Dimension daneben aussieht, laden Sie Ihre fertiggestellten Produkt-Screenshots und die Sitzungs-Grundlage erneut hoch, dann regenerieren. Fehler der Ausrichtung zum Validierungszeitpunkt wird fast immer durch unvollständigen Kontext in Sitzung 0 verursacht, nicht Claude Design-Drift.

Reparieren Sie es vor dem Bau echter Screens. Marken-Drift über 12 generierte Screens korrigieren ist teuer. Korrigieren im Button-Group-Stufe kostet eine Anfrage.

## Beispiel

Eine Agentur setzt eine Client-E-Commerce-Marke auf — Sportbekleidung, Direct-to-Consumer, Zielgruppe 25-40 aktive urbane Profis.

**Session 0 Farbsystem-Prompt:**

```
Define the complete color system for Velo, a sportswear brand.
Personality: bold, energetic, precise.
Primary: #E11D48 (rose-600). Compute primary-hover at 15% darker, primary-subtle at 90% lighter.
Secondary: #0EA5E9 (sky-500). Same derivation.
Neutral scale: use slate (slate-50 through slate-950).
Semantic: success #16A34A, warning #D97706, error #DC2626, info #0EA5E9.
Surface: background white, surface slate-50, surface-raised white.
Text: primary slate-900, secondary slate-500, disabled slate-300, inverse white.
Output as CSS custom properties, design tokens JSON, and Tailwind config extension.
Validate WCAG AA contrast for all text/background pairs and flag failures.
```

**Erwartete Ausgabe:** komplette Token-Set in allen drei Formaten, mit einer Kontrast-Validierungs-Tabelle, die alle Ausfälle notiert (weißer Text auf primär-subtle wird fehlschlagen — Claude sollte es flaggen und slate-900 oder primary als korrekte Vordergrund-Farbe vorschlagen).

**Nachfolgende Sitzungs-Nutzung:** fügen Sie die 150-Wort-Sitzungs-Grundlage (Marken-Persönlichkeit, Primärfarbe, Typografie-Paar) am Anfang jeder neuen Sitzung ein. Claude wendet den kompletten Token-Set an, ohne Dateien neu hochzuladen. Produkt-Seite, Cart-Drawer, Checkout-Flow — alle generiert mit konsistenter Markenanwendung über Sitzungen.
