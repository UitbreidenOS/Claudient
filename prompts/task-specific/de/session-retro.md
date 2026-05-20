# Prompt: Sitzungsrückblick

Verwenden Sie am Ende einer Claude Code-Sitzung, um Erkenntnisse zu erfassen und in dauerhafte Verbesserungen umzuwandeln — aktualisieren Sie CLAUDE.md, erstellen Sie neue Regeln, identifizieren Sie Skill-Möglichkeiten und schreiben Sie ADRs.

## Systemprompt

```
Sie führen einen Sitzungsrückblick durch. Überprüfen Sie die Gesprächsverlauf dieser Sitzung und kategorisieren Sie jede Erkenntnis in das richtige Ausgabeformat.

Kategorien zur Überprüfung (nur Kategorien mit tatsächlichem Inhalt einbeziehen):

**1. CLAUDE.md-AKTUALISIERUNGEN** — persistenter Projektkontext, der diese Sitzung überstehen sollte
Format: "Zu CLAUDE.md hinzufügen: [exakter Text zum Hinzufügen]"
Einbeziehen: neu entdeckte Befehle, Architektur-Erkenntnisse, etablierte Konventionen, Dinge, die Claude immer wissen sollte

**2. NEUE REGELN** — Codierungsstandards oder Muster, die es wert sind, formalisiert zu werden
Format: "Zu rules/[Kategorie].md hinzufügen: [Regelaussage]"
Einbeziehen: etablierte Konventionen, Muster, die immer befolgt werden sollten, Dinge, die nie getan werden sollten

**3. SKILL-IDEEN** — wiederholte Workflows, die einen /Skill verdienen
Format: "Skill erstellen: /[Name] — [Was es in einem Satz tut]"
Einbeziehen: alle Workflows, die Sie 3+ Mal typisiert haben, mehrstufige Prozesse mit konsistentem Muster

**4. ADRs** — Architekturentscheidungen mit bedeutsamen Trade-offs
Format: "Schreibe ADR: [kurzer Titel] — Entscheidung: [was entschieden wurde]"
Einbeziehen: Technologiewahl, Ansatzwahl, alles, was zukünftige Ingenieure verstehen sollten

**5. UNBEHOBENENE BUGS** — aufgetretene Probleme, die noch nicht behoben sind
Format: "Bug: [Beschreibung] — Standort: [Datei oder Bereich] — Auswirkung: [wer/was es betrifft]"

**6. NÄCHSTE SITZUNG TODO** — konkrete Aufgaben für den nächsten Start
Format: "Nächstes: [spezifische Aufgabe]"

Seien Sie spezifisch und handlungsfähig. Vaag Beobachtungen nicht einbeziehen. Wenn eine Kategorie nichts zu erfassend hat, lassen Sie es weg.
```

## Verwendung

Am Ende einer wichtigen Sitzung ausführen:

```
"Führe einen Sitzungsrückblick über alles durch, was wir heute gemacht haben. 
Kategorisieren Sie alle Erkenntnisse mit dem Rückblick-Format."
```

## Automatisierung mit dem session-retro-Hook

Der `session-retro` Hook erstellt eine `.claude/retro-pending.md`-Datei automatisch am Ende der Sitzung. Zu Beginn der nächsten Sitzung fügen Sie den Rückblick-Prompt ein und bearbeiten Sie die Datei.

## Auf der Ausgabe handeln

Für jede Ausgabe:

| Kategorie | Aktion |
|---|---|
| CLAUDE.md-Aktualisierung | CLAUDE.md direkt bearbeiten |
| Neue Regel | Erstellen oder an `rules/common/[Thema].md` anhängen |
| Skill-Idee | Zu Entwicklungs-Backlog hinzufügen |
| ADR | An `adr-writer`-Agent delegieren |
| Bug | Zu `bugs.md` hinzufügen oder GitHub-Ticket erstellen |
| Nächste Sitzung | Nächste Sitzung mit diesen Aufgaben starten |

## Beispielausgabe

```
## Sitzungsrückblick — 20. Mai 2026

**CLAUDE.md-AKTUALISIERUNGEN:**
- Zu CLAUDE.md hinzufügen: "Verwenden Sie `npx drizzle-kit generate` vor einer DB-Migration — zeigen Sie immer eine Vorschau des Migrations-SQL vor der Ausführung"
- Zu CLAUDE.md hinzufügen: "Der Zahlungsservice verwendet Idempotenz-Schlüssel bei allen Stripe-Aufrufen — geben Sie `idempotencyKey: requestId` bei jedem Ladung durch"

**NEUE REGELN:**
- Zu rules/common/error-handling.md hinzufügen: "Alle Stripe-Webhook-Handler müssen die Signatur vor der Verarbeitung überprüfen — verwenden Sie `stripe.webhooks.constructEvent()`"

**SKILL-IDEEN:**
- Skill erstellen: /stripe-webhook — Richten Sie einen kompletten Stripe-Webhook-Handler mit Signaturüberprüfung, Ereignis-Routing und Idempotenz ein

**ADRS:**
- Schreibe ADR: "Verwenden Sie Stripe Connect statt direkter Ladungen für Marketplace-Zahlungen" — Entscheidung: Stripe Connect gewählt, um Multi-Party-Auszahlungen ohne benutzerdefinierte Ledger-Logik zu handhaben

**UNBEHOBENENE BUGS:**
- Bug: Zahlungsbestätigungsemail wird zweimal bei Wiederholung gesendet — Standort: `src/webhooks/stripe.ts:87` — Auswirkung: Einige Benutzer erhalten doppelte Bestätigungsmails

**NÄCHSTE SITZUNG:**
- Nächstes: Doppelte Email-Bug im Zahlungs-Webhook-Handler beheben
- Nächstes: Stripe-Webhook-Skill basierend auf heute etablierten Mustern schreiben
```
