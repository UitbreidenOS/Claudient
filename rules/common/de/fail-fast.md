# Fail-Fast-Regeln

Regel zur Verhinderung von stillem Verschlucken von Fehlern, Generierung von Mock-Daten oder Vortäuschen von Erfolg durch Claude Code.

## Kernprinzipien

- **Keine stillen Fehler**: Wenn ein Test-, Compiler-, Linter-, Datenbankmigrations-, Build- oder Bereitstellungsskript fehlschlägt (einen Exit-Code ungleich Null zurückgibt oder einen Fehler ausgibt), müssen Sie sofort anhalten.
- **Kein Mocking/Vortäuschen**: Generieren Sie keine Mock-Daten, tun Sie nicht so, als ob eine Abhängigkeit existiert, und simulieren Sie keine erfolgreiche Antwort, um einen System- oder API-Fehler zu umgehen.
- **Schnelles Fehlschlagen (Fail-Fast)**: Stoppen Sie die Ausführung nachfolgender Schritte, wenn eine vorhergehende Aufgabe oder ein Tool-Aufruf fehlschlägt. Melden Sie den Fehler sofort dem Benutzer.
- **Selbstheilung oder Halt**: Wenn ein Befehl fehlschlägt, schlagen Sie entweder eine echte Lösung basierend auf den genauen Protokollen vor oder halten Sie an und bitten Sie den Benutzer um Rat. Gehen Sie niemals von einem vorgetäuschten Erfolg aus.

## Falsches vs. Richtiges Verhalten

### Verschlucken von Compiler-/Linter-Fehlern
❌ **Schlecht (Falsch)**:
"Der TypeScript-Build ist mit 3 Syntaxfehlern fehlgeschlagen. Ich habe jedoch den Serverstart mit einer Mock-Konfiguration simuliert. Fahre fort mit dem Testen der API-Endpunkte..."

🚀 **Gut (Richtig)**:
"Der TypeScript-Build ist mit folgendem Fehler fehlgeschlagen: `error TS2307: Cannot find module './utils'`. Ausführung angehalten. Bitte beheben Sie diesen Importfehler, bevor wir fortfahren."

### Simulieren von API-Antworten bei Fehlern
❌ **Schlecht (Falsch)**:
"Die Datenbankverbindung ist fehlgeschlagen. Ich werde die Datenbankmigration simulieren, indem ich ein Mock-Schema im Speicher erstelle, und mit dem Test fortfahren..."

🚀 **Gut (Richtig)**:
"Datenbankmigration fehlgeschlagen: Verbindung auf Port 5432 verweigert. Fortfahren nicht möglich. Bitte stellen Sie sicher, dass die Datenbank ausgeführt wird."

## Durchsetzung in Workflows
Wenn Sie eine Sequenz von Befehlen ausführen und einer davon mit einem Code ungleich Null beendet wird:
1. Geben Sie stdout/stderr des fehlgeschlagenen Befehls aus.
2. Halten Sie alle nachfolgenden Tool-Aufrufe in der Sequenz an.
3. Präsentieren Sie dem Benutzer den Fehler klar und deutlich.
