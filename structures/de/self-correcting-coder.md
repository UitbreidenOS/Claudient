# 📂 Self-Correcting Coder
> Der kanonische Arbeitsbereich für eine autonome Code-Generierungsschleife, die ihren eigenen Code schreibt, testet und iterativ korrigiert, bevor sie in die Produktion synchronisiert wird.

📄 `loop-architecture-brief.md` # Kanonische Übersicht: Definiert die akzeptable Fehlerquote und maximale Iterationstiefe
🧠 `memory.md`                  # Sitzungsspeicher: Dynamische Kontextverfolgung für die aktive Kompilierungsschleife
🤖 `CLAUDE.md`                  # Betriebsregeln: Strenge Anweisungen zur Interpretation von Stack Traces statt Vermutungen

## 📁 generation-engine/ (4 Skills - Anfängliche Code-Erstellung)
📄 `spec-analyzer.md`           # Analysiert PR-Anforderungen • identifiziert notwendige Abhängigkeiten
📄 `scaffolding-builder.md`     # Erstellt die Boilerplate-Struktur basierend auf dem Tech Stack
📄 `logic-writer.md`            # Kernausführung • entwerft die anfängliche Funktionslogik
📄 `docstring-generator.md`     # Dokumentiert automatisch Inline-Logik und Parametertypen

## 📁 execution-sandbox/ (3 Skills - Isoliertes Testen)
📄 `local-runner.md`            # Sichere Ausführungsumgebung • verhindert destruktive Host-Befehle
📄 `test-matrix.md`             # Bildet generierten Code auf erforderliche Unit- und Integrationstests ab
📄 `timeout-guard.md`           # Beendet Endlosschleifen oder hängende Ausführungsthreads

## 📁 feedback-evaluator/ (4 Skills - Die "Selbstkorrektur")
📄 `linter-parser.md`           # Nimmt ESLint/Ruff-Ausgaben auf • bildet Syntaxfehler auf spezifische Zeilen ab
📄 `stack-trace-analyzer.md`    # Liest Runtime-Fehlerprotokolle • isoliert den genauen Fehlerpunkt
📄 `diff-proposer.md`           # Generiert atomare, chirurgische Codeänderungen statt Umschreiben der gesamten Datei
📄 `iteration-limiter.md`       # Hard-Cap für Wiederholungsversuche (z.B. max. 5 Schleifen) vor menschlicher Eskalation

## 📁 deployment-sync/ (3 Skills - Übergabe)
📄 `format-enforcer.md`         # Endgültiger Prettier/Black-Formatierungsdurchgang
📄 `coverage-validator.md`      # Stellt sicher, dass der endgültige Code die Schwelle von 85%+ Testabdeckung erfüllt
📄 `github-final-sync.md`       # Automatisiertes Commit und PR-Erstellung in Ihre endgültigen Github-Repositories

---
**Konfigurationsdateien**
⚙️ `tox.ini`                    # Standardisierte Test-Umgebungskonfigurationen
📦 `pyproject.toml`             # Kermprojektabhängigkeiten und Build-System-Anforderungen

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
