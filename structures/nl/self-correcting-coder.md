# 📂 Zelf-Corrigerende Coder
> De canonieke werkruimte voor een autonome codegeneratielus die schrijft, test en iteratief zijn eigen code corrigeert voordat deze naar productie wordt gesynchroniseerd.

📄 `loop-architecture-brief.md` # Canonieke brief: Definieert de aanvaardbare mislukkingsdrempel en maximale iteratiediepte
🧠 `memory.md`                  # Sessiegeheugen: Dynamisch contexttracking voor de actieve compilatielus
🤖 `CLAUDE.md`                  # Exploitatieregels: Strikte instructies voor het interpreteren van stack traces in plaats van gokken

## 📁 generation-engine/ (4 skills - Initiële Code Creatie)
📄 `spec-analyzer.md`           # Parseert PR-vereisten • identificeert noodzakelijke afhankelijkheden
📄 `scaffolding-builder.md`     # Creëert de boilerplate-structuur op basis van de tech stack
📄 `logic-writer.md`            # Kernuitvoering • concepten de initiële functionaallogica
📄 `docstring-generator.md`     # Documenteert automatisch inline logica en parametertypen

## 📁 execution-sandbox/ (3 skills - Geïsoleerde Tests)
📄 `local-runner.md`            # Veilige uitvoeringsomgeving • voorkomt destructieve host-commando's
📄 `test-matrix.md`             # Kaart gegenereerde code naar vereiste unit- en integratietests
📄 `timeout-guard.md`           # Beëindigt oneindige lussen of hangende uitvoeringsthreads

## 📁 feedback-evaluator/ (4 skills - De "Zelf-Correctie")
📄 `linter-parser.md`           # Verwerkt ESLint/Ruff-outputs • kaart syntaxfouten aan specifieke regels
📄 `stack-trace-analyzer.md`    # Leest runtime-mislukkingslogboeken • isoleert het exacte mislukkingspunt
📄 `diff-proposer.md`           # Genereert atomaire, chirurgische codewijzigingen in plaats van volledig herschrijven
📄 `iteration-limiter.md`       # Harde limiet op herhaalpogingen (bijv. max 5 lussen) voordat menselijke escalatie

## 📁 deployment-sync/ (3 skills - Handoff)
📄 `format-enforcer.md`         # Definitieve Prettier/Black opmaakdoorlating
📄 `coverage-validator.md`      # Zorgt ervoor dat de eindcode aan de drempel van 85%+ testdekking voldoet
📄 `github-final-sync.md`       # Geautomatiseerde commit en PR-creatie naar uw eindrepository's op Github

---
**Configuratiebestanden**
⚙️ `tox.ini`                    # Gestandaardiseerde configuraties van testomgeving
📦 `pyproject.toml`             # Kernprojectafhankelijkheden en bouwsysteemvereisten
