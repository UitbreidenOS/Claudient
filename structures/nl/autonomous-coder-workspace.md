# 📂 Autonomous Coder Workspace
> De canonieke werkruimte voor het uitvoeren van een autonoom coderingagent overnight in een strikt geïsoleerde uitvoeringsomgeving.

📄 `project-brief.md`      # Canonieke briefing: Huidige sprint-tickets en overnight PR-doelstellingen
🧠 `memory.md`             # Sessigeheugen: Dynamische context voor de actieve coderingssessie
🤖 `CLAUDE.md`             # Bedrijfsregels: Strikte instructies voor de overnight-uitvoering (YOLO-modus toegestaan binnen sandbox)

## 📁 .docker-sandbox/ (5 skills - Isolatie & Beveiliging)
📄 `sandbox-config.yaml`   # MicroVM-definitie • CPU/RAM-limieten voor de container
📄 `network-policy.md`     # Egress-regels • expliciete allowlist voor pakketbeheerders (npm, pip)
📄 `credential-proxy.md`   # Geheime injectie • MITM-proxy om host-sleutels van de agent-VM af te houden
📄 `mounts.yaml`           # Volume-bindingen • strikt beperkt tot het `target-repo/`-pad
📄 `lifecycle-hooks.sh`    # Vergankelijke afbraak • automatisch vernietiging van container bij fout

## 📁 target-repo/ (De Doelbronbase)
📄 `docker-compose.yml`    # De applicatieomgeving die de agent gebruikt voor het testen van zijn eigen code
📄 `package.json`          # Agent mag afhankelijkheden beheren via de geïsoleerde daemon

## 📁 validation-suite/ (4 skills - Onbewaakt testen)
📄 `matrix-runner.md`      # E2E-testitvoering instructies
📄 `lint-fixer.md`         # Auto-opmaakregels voor committen
📄 `coverage-check.sh`     # Minimale dekkingsdrempels (bijv. 80%) vereist voor PR-goedkeuring
📄 `sandbox-tests.md`      # Valideert dat de agent niet aan de container kan ontsnappen tijdens uitvoering

## 📁 ops-automation/ (4 skills - CI/CD & Overdracht)
📄 `git-manager.md`        # Scoped-credential git pushes via veilige proxy
📄 `commit-validator.md`   # Afdwinging van semantische commits (feat:, fix:, chore:)
📄 `pr-generator.md`       # Geautomatiseerde GitHub PR-beschrijving schrijven
📄 `slack-webhook.md`      # Samenvatting van morgenochtend melding bij pipelinesuces of -storing

## 📁 audit-logs/ (Onveranderbare Records)
📄 `shell-history.log`     # Onveranderbare registratie van elke bash-opdracht die de agent uitvoerde
📄 `network-events.log`    # Alle externe API-aanroepen geïntercepteerd door de proxy

---
**Configuratiebestanden**
⚙️ `Makefile`              # `make run-overnight` (triggert sandbox-build en agent-kickoff)
📦 `agent-config.toml`     # LLM-routering en token-limietconfiguraties
