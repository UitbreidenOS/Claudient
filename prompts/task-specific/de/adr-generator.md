# Prompt: ADR-Generator

Generieren Sie einen richtig strukturierten Architecture Decision Record aus einer Beschreibung einer getroffenen Entscheidung. Verwenden Sie, wenn Sie eine Entscheidung dokumentieren möchten, ohne an den adr-writer-Agent zu delegieren.

## Prompt-Vorlage

```
Schreiben Sie einen Architecture Decision Record für diese Entscheidung.

**Getroffene Entscheidung:** [Was wurde entschieden — seien Sie spezifisch]
**Kontext:** [Welches Problem oder welche Situation hat diese Entscheidung provoziert?]
**Betrachtete Alternativen:** [Was sonst wurde evaluiert?]
**Warum diese Option:** [Die Schlüsselgründe]
**Trade-offs:** [Was geben Sie auf? Welche neue Komplexität führt dies ein?]
**Wer entschied:** [Rolle oder Team, keine persönlichen Namen]
**Datum:** [Heute]

Formatieren Sie es als angemessenes ADR mit dem Nygard-Format:
- Titel (ADR-NNN: Kurztitel)
- Status (Akzeptiert)
- Kontextabschnitt
- Entscheidungsabschnitt (ein Satz, aktive Stimme)
- Begründungsabschnitt
- Betrachtete Alternativen Tabelle
- Konsequenzen (positiv, negativ, neutral)
- Überprüfungsdatum

Speichern unter: docs/decisions/ADR-[nächste-Nummer]-[kebab-case-Titel].md
```

## Schnellversion (aus Gesprächskontext)

```
Schreiben Sie einen ADR für die Entscheidung, die wir gerade getroffen haben.
Extrahieren Sie den Kontext, die Entscheidung und die Begründung aus unserem Gespräch.
Speichern unter docs/decisions/ mit der nächsten sequenziellen Nummer.
```

## Wann diesen Prompt vs. den adr-writer-Agent verwenden

- **Dieser Prompt:** Sie möchten eine spezifische Entscheidung, die Sie beschreiben, schnell dokumentieren
- **`/agents/roles/adr-writer`:** Sie möchten, dass Claude den Sitzungskontext liest und Entscheidungen automatisch extrahiert

## Häufige Entscheidungstypen zur Dokumentation

- Datenbank- oder ORM-Auswahl
- Authentifizierungsansatz
- API-Design (REST vs GraphQL vs tRPC)
- State Management (Zustand vs Redux vs Jotai)
- Hosting- und Bereitstellungswahl
- Caching-Strategie
- Testansatz (Unit vs Integration vs E2E Verhältnis)
- Monolith vs Microservices Grenzbeschreibungen
- Service-Auswahl von Drittanbietern (Stripe, Resend, Clerk, etc.)
