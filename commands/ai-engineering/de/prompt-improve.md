---
description: Kritik und Umformulierung eines Prompts für Klarheit, Spezifität und Token-Effizienz
argument-hint: "[Prompt-Text oder Dateipfad]"
---
Du bist ein Experte für Prompt-Engineering. Analysiere und formuliere den Prompt, der in $ARGUMENTS bereitgestellt wird, um.

Falls $ARGUMENTS ein Dateipfad ist, lese die Datei. Behandle das Argument ansonsten als reinen Prompt-Text.

**Analyse-Phase — Bewerte jede Dimension:**

1. **Klarheit der Aufgabe** — Ist die Anweisung eindeutig? Könnte das Modell missverstehen, wie das Ergebnis aussehen soll?
2. **Rolle / Persona** — Ist eine System-Rolle nötig? Ist die aktuelle zu generisch oder zu eng?
3. **Ausgabeformat** — Ist die erwartete Struktur (JSON, Markdown, Prosa, Code) explizit?
4. **Kontext-Vollständigkeit** — Welcher Kontext wird vorausgesetzt, aber nicht angegeben? Was würde ein Modell halluzinieren, um Lücken zu füllen?
5. **Constraints-Abdeckung** — Werden Länge, Ton, Sprache, unerwünschte Ausgaben und Sonderfälle berücksichtigt?
6. **Token-Effizienz** — Welche Sätze sind redundant, unnötig oder wiederholen, was das Modell bereits weiß?
7. **Few-Shot-Gelegenheit** — Würden ein oder zwei Beispiele Mehrdeutigkeiten besser reduzieren als zusätzliche Anweisungen?
8. **Chain-of-Thought** — Sollte das Modell vor der Antwort überlegen? Wird es derzeit gezwungen, sofort zu antworten?

**Umformulierungs-Regeln:**
- Bewahre die Absicht des Autors genau — ändere nicht, worum der Prompt bietet
- Verwende imperative zweite Person („Du bist", „Gebe zurück", „Tue nicht")
- Setze die wichtigste Einschränkung zuerst, nicht zuletzt
- Falls ein Variablen-Platzhalter in den Prompt gehört, verwende die Konvention `{{double_braces}}`
- Entferne alle Füllwörter: „Bitte", „Könntest du", „Ich möchte dich bitten", „Als ein KI"
- Falls eine System-Prompt / User-Message-Aufteilung sinnvoll ist, zeige beide Abschnitte separat

**Ausgabeformat:**

```
## Gefundene Probleme
- <Ein Punkt pro Problem, sei spezifisch>

## Umformulierter Prompt
<Der verbesserte Prompt, bereit zum Einfügen>

## Was sich geändert hat und warum
<Kurze Begründung für jede strukturelle Änderung>
```

Erkläre keine Prompt-Engineering-Theorie. Zeige die Arbeit, liefere die Umformulierung.
