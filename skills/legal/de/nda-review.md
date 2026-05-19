---
name: nda-review
description: "NDA triage and review: classify type, flag playbook deviations (GREEN/YELLOW/RED), identify scope issues, missing exclusions, hidden obligations — attorney review gate"
---

> 🇩🇪 Deutsche Version. [Englische Version](../nda-review.md).

# Skill: NDA-Prüfung

## Wann aktivieren
- Prüfung einer Geheimhaltungsvereinbarung (NDA) vor der Unterzeichnung
- Triage eines NDA-Stapels, um zu identifizieren, welche Anwaltsprüfung benötigen
- Verstehen, was eine bestimmte NDA-Klausel auf verständliche Weise bedeutet
- Überprüfen, ob ein NDA Standard-Ausnahmen und -Schutzklauseln enthält
- Vergleich von NDA-Bedingungen mit den Standard-Playbook-Positionen Ihres Unternehmens

## Wann NICHT verwenden
- Unterzeichnen im Namen Ihrer Organisation — das erfordert einen autorisierten Unterzeichner
- Interpretation von NDA-Bedingungen in einem aktiven Streit — Ihren Anwalt konsultieren
- Multilaterale NDAs mit komplexen grenzüberschreitenden Verpflichtungen — benötigt Spezialisten

## Wichtiger Hinweis

Claude kann Probleme identifizieren und Klauseln erklären. Es kann keine Rechtsberatung geben, jurisdiktionsspezifisches Recht interpretieren oder garantieren, dass es jedes Problem erkannt hat. **Lassen Sie jeden NDA vor der Unterzeichnung von einem Anwalt prüfen, wenn die Beziehung wesentlich ist.**

## Anweisungen

### Zuerst — NDA klassifizieren

```
Prüfen Sie diesen NDA und teilen Sie mir mit:
1. Ist er gegenseitig (beide Parteien geschützt) oder einseitig (nur eine Partei)?
2. Wer ist die offenlegende Partei und wer ist die empfangende Partei?
3. Was ist die Laufzeit?
4. Welche Rechtsordnung gilt?

NDA-Text: [einfügen]
```

### Vollständige Playbook-Prüfung

```
Prüfen Sie diesen NDA gegen unsere Standardpositionen:

Unsere Standardpositionen:
- Bevorzugung gegenseitiger NDAs; einseitig akzeptabel, wenn wir die empfangende Partei sind
- Maximale NDA-Laufzeit: 3 Jahre
- Definition von Vertraulichen Informationen: muss innerhalb von 30 Tagen markiert oder schriftlich bestätigt werden
- Erforderliche Standardausnahmen: öffentliche Domäne, Vorkenntnis, unabhängige Entwicklung, erzwungene Offenlegung
- Anwendbares Recht: [Ihre bevorzugte Rechtsordnung]
- Kein verstecktes Abwerbeverbot oder Wettbewerbsverbot im NDA

NDA-Text: [einfügen]

Kennzeichnen Sie jedes Problem als GRÜN (akzeptabel), GELB (verhandeln), oder ROT (blockierend).
```

### Prüfung auf Standardausnahmen

Jeder NDA sollte diese 4 Ausnahmen enthalten. Claude prüft sie:

```
Überprüfen Sie, ob dieser NDA alle 4 Standardausnahmen enthält:
1. Informationen, die bereits in der öffentlichen Domäne sind (nicht durch Verletzung)
2. Informationen, die die empfangende Partei bereits vor der Offenlegung kannte
3. Informationen, die unabhängig von der empfangenden Partei entwickelt wurden
4. Informationen, die gesetzlich oder durch Gerichtsbeschluss offengelegt werden müssen (erzwungene Offenlegung)

NDA-Text: [einfügen]

Falls eine fehlt, als GELB kennzeichnen und die fehlende Formulierung entwerfen.
```

### Scan auf versteckte Verpflichtungen

```
Scannen Sie diesen NDA nach Verpflichtungen, die über Standard-Vertraulichkeit hinausgehen:
- Abwerbeverbote (Einstellungsbeschränkungen)
- Wettbewerbsverbotsklauseln
- IP-Abtretungsformulierungen
- Exklusivitätsverpflichtungen
- Standstill-Bestimmungen (Einschränkungen für M&A-Aktivitäten)

NDA-Text: [einfügen]

Alles, was über Standard-Vertraulichkeit hinausgeht, als ROT kennzeichnen — diese gehören nicht in einen NDA.
```

### Erklärung in verständlicher Sprache

```
Erklären Sie diese NDA-Klausel in verständlicher Sprache:
"[Klausel einfügen]"

Sagen Sie mir: Was bedeutet das praktisch für mein Unternehmen? Was sind die praktischen Auswirkungen?
```

### Redline-Vorschläge

```
Dieser NDA hat folgende Probleme, bei denen ich zurückverhandeln möchte:
[Probleme aus der obigen Prüfung auflisten]

Entwerfen Sie Redline-Formulierungen für jedes Problem — was ich stattdessen haben möchte.
Format: Originaltext → Vorgeschlagene Überarbeitung → Begründung
```

## Beispiel

**Ein einseitiger NDA, bei dem Sie die empfangende Partei sind:**

```
ROT — Übermäßig breite Definition von Vertraulichen Informationen
Abschnitt 1: "Alle Informationen, die von der Offenlegenden Partei in jeglicher Form offenbart werden"
Problem: Keine Markierungsanforderung und keine Ausnahme für mündliche Mitteilungen.
         Sie könnten unabsichtlich durch alles gebunden sein, was in irgendeinem Meeting gesagt wurde.
Korrektur: Hinzufügen "...sofern mündliche Mitteilungen innerhalb von 30 Tagen nach der Offenlegung
     schriftlich als vertraulich bestätigt werden."

GELB — 5-jährige Laufzeit überschreitet Standard
Abschnitt 8: "Diese Vereinbarung bleibt fünf (5) Jahre in Kraft"
Problem: 5 Jahre ist länger als der 3-Jahres-Standard. Handhabbar, aber es lohnt sich zurückzuverhandeln.
Korrektur: Für die meisten kommerziellen NDAs 2-3 Jahre vorschlagen.

ROT — Ausnahme für "unabhängige Entwicklung" fehlt
Abschnitt 2 enthält nur 3 der 4 Standardausnahmen — unabhängige Entwicklung fehlt.
Korrektur: Hinzufügen: "(d) Informationen, die von der Empfangenden Partei unabhängig entwickelt wurden,
     ohne Verwendung oder Bezugnahme auf die Vertraulichen Informationen der Offenlegenden Partei."

GRÜN — Anwendbares Recht (Kalifornien): akzeptabel, wenn Sie dort tätig sind.
GRÜN — Gegenseitige Ausnahmen für erzwungene Offenlegung: vorhanden und standardgemäß.

EMPFEHLUNG: Nicht so unterzeichnen. ROTE Punkte müssen vor der Ausführung behoben werden.
Anwaltliche Überprüfung: Empfohlen, wenn dieser NDA eine wesentliche Geschäftsbeziehung begleitet.
```

---

> **Arbeiten Sie mit uns:** Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir entwickeln KI-Produkte und B2B-Lösungen mit Entwicklergemeinschaften.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
