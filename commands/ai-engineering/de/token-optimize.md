---
description: Überwachen Sie einen Prompt oder eine LLM-Pipeline auf Token-Verschwendung und wenden Sie gezielt Reduktionen an
argument-hint: "[Prompt-Datei, Chain-Datei oder Code-Pfad]"
---
Überwachen Sie den Prompt oder die Pipeline unter $ARGUMENTS auf Token-Ineffizienz und erstellen Sie eine optimierte Version.

Lesen Sie alle bereitgestellten Dateipfade. Wenn das Argument ein Verzeichnis ist, suchen Sie nach `.py`, `.ts`, `.md` Dateien mit Prompt-Strings oder LLM-Aufrufen.

**Audit-Dimensionen — überprüfen Sie jede:**

**1. Prompt-Verbosität**
- Füllwörter, die Token hinzufügen, ohne eine Einschränkung zu setzen ("Als ein KI-Sprachmodell", "Selbstverständlich!", "Gerne")
- Wiederholte Anweisungen, die sowohl in der Systemmeldung als auch in der Benutzermeldung vorkommen
- Redundante Beispiele, die identische Fälle abdecken
- Prosa-Anweisungen, die eine aufgelistete Liste mit halben Token sein könnten

**2. Missbrauch des Kontextfensters**
- Vollständiges Dokument übergeben, wenn nur ein Abschnitt erforderlich ist — mit geschätzten Einsparungen kennzeichnen
- Chat-Verlauf wörtlich eingefügt, wenn eine Zusammenfassung ausreichen würde
- Doppelter Inhalt: derselbe Text, der unter verschiedenen Schlüsseln zweimal eingefügt ist

**3. Caching-Möglichkeiten**
- Statische Prompt-Segmente identifizieren (System-Prompt, statischer Kontext, Few-Shot-Beispiele), die `cache_control: {"type": "ephemeral"}` auf der Anthropic-API verwenden sollten
- Kennzeichnen, wenn das Cache-berechtigte Segment < 1024 Token ist (unter der Mindest-Cache-Schwelle — kein Nutzen)
- Zeigen Sie das umstrukturierte Meldungsarray mit korrekt platzierten Cache-Blöcken

**4. Ausgabelänge**
- Ist `max_tokens` gesetzt? Falls nicht, als unbegrenztes Kostenrisiko kennzeichnen
- Fordert der Prompt Erklärungen an, wenn nur strukturierte Daten erforderlich sind?
- Würde ein kürzeres Ausgabeformat (JSON vs. Prosa, nur Code vs. Code+Erklärung) die Generierungskosten senken?

**5. Modell-Tier-Passform**
- Verwendet die Aufgabe `claude-sonnet-4-6` oder `claude-opus-4-7` für Arbeiten, die `claude-haiku-4-5-20251001` mit 10-fach niedrigeren Kosten durchführen kann?
- Klassifizieren Sie die Aufgabenkomplexität: einfache Extraktion/Klassifizierung → Haiku; Argumentation/Generierung → Sonnet; komplexe mehrstufige → Opus

**Ausgabeformat:**

```
## Token-Audit-Zusammenfassung
| Problem | Standort | Geschätzter Token-Impact | Priorität |
|---------|----------|-------------------------|-----------|
| ...     | ...      | ...                     | H/M/L     |

## Optimierter Prompt / Chain
<vollständig umgeschriebene Version mit angewendeten Änderungen>

## Caching-Konfiguration
<Meldungsarray-Ausschnitt mit Cache_Control-Platzierung, falls zutreffend>

## Geschätzte Einsparungen
Davor: ~N Token/Anruf  →  Nachher: ~M Token/Anruf  (~X% Reduktion)
Bei 1000 Anrufen/Tag auf [Modell]: $Y/Monat Ersparnis
```

Wenden Sie alle Behebungen mit hoher Priorität direkt in der Ausgabe an. Erklären Sie Elemente mit mittlerer/niedriger Priorität, wenden Sie diese jedoch nicht ohne Nachfrage an.
