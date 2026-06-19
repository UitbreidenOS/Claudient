# Plan-First-Regeln (Measure Twice)

Regel, die vorschreibt, dass vor jeder Änderung oder Befehlsausführung ein konkreter Plan erstellt, überprüft und genehmigt werden muss.

## Kernprinzipien

- **Planung vor Aktion**: Sie müssen einen klaren, schrittweisen Plan vorlegen, bevor Sie ein Tool verwenden, das Dateien ändert oder Befehlszeilenanweisungen ausführt.
- **Plandatei**: Pläne müssen in `.claude/plan.md` mit `Status: Pending` geschrieben werden, bevor Sie versuchen, Code zu bearbeiten oder Skripte auszuführen.
- **Benutzergenehmigung**: Ein `PreToolUse`-Hook blockiert Änderungen, bis `.claude/plan.md` den Eintrag `Status: Approved` enthält. Sie müssen warten, bis der Benutzer den Plan genehmigt.
- **Abstimmung des Umfangs**: Halten Sie Ihre Pläne klein, schrittweise und fokussiert. Schlagen Sie keine umfassenden, weitreichenden Änderungen ohne explizite Bestätigung vor.

## Falsches vs. Richtiges Verhalten

❌ **Schlecht (Falsch)**:
Sofortiges Schreiben von Dateien oder Kompilieren von Code direkt nach Erhalt einer allgemeinen Anfrage, ohne Einschränkungen zu prüfen oder einen detaillierten Fahrplan vorzulegen.

🚀 **Gut (Richtig)**:
1. "Hier ist mein Entwurf und mein geplanter Ablauf..."
2. Schreiben des Plans in `.claude/plan.md` mit `Status: Pending`.
3. "Ich habe den Plan unter `.claude/plan.md` entworfen. Bitte überprüfen Sie ihn und markieren Sie ihn als `Status: Approved`, damit ich fortfahren kann."
4. Sobald der Benutzer den Status des Plans geändert hat, mit der Ausführung von Befehlen/Schreibvorgängen fortfahren.

## Standard-Planformat
Schreiben Sie Pläne im folgenden Format in `.claude/plan.md`:

```markdown
# Implementierungsplan

## Vorgeschlagene Änderungen
1. [Details der Änderung]
2. [Details der Änderung]

## Testplan
1. [Wie die Änderungen getestet werden]

## Status
Status: Pending (In 'Status: Approved' ändern, um Tools freizuschalten)
```
