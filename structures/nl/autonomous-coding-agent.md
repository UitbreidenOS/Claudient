# 📂 Autonomous Coding Agent Workspace
> De canonieke werkruimte voor het implementeren en beheren van productie-grade autonome code-agents, ontworpen om continue nacht-ontwikkelingslussen uit te voeren en gevalideerde code naadloos naar uw definitieve repositories te pushen.

📄 `agent-architecture-brief.md` # Canonieke briefing: Definieert de agent-machtigingen, goedgekeurde tech stack en drempels voor mens-in-de-lus (HITL) interventie
🧠 `active-nightly-builds.md`    # Sessiegeheugen: Dynamische contextvolgering voor huidige nacht-refactoring-taken en onopgeloste compilatiefouten
🤖 `CLAUDE.md`                   # Bedrijfsregels: Strikte instructies om oneindige uitvoeringslussen te voorkomen en deterministische API-routering verplicht te stellen

## 📁 agent-orchestration/ (4 skills - The Brain)
📄 `zaltaclaw-execution-loop.md` # De kern-autonome engine die de ZaltaClaw-agent toestaat om code 's nachts zonder menselijke tussenkomst te schrijven, testen en debuggen
📄 `claude-managed-agents.md`    # Integratieconfiguaties voor het gebruik van Claude's openbare bètaversie beheerde agents voor gespecialiseerde redeneertaken
📄 `claude-code-integration.md`  # CLI-wrappers die de agent in staat stellen shell-commando's veilig uit te voeren en lokale bestanden aan te passen
📄 `multi-agent-coordinator.md`  # Supervisielogica voor het routeren van complexe taken in multi-agent-systemen gehost op AWS Bedrock

## 📁 compute-and-infrastructure/ (3 skills - Execution Environment)
📄 `mac-mini-host-config.md`     # Setup-scripts voor het implementeren van de primaire autonome lus op een toegewijde Mac mini om cloud-inferentiekosten te minimaliseren
📄 `aws-bedrock-allocator.md`    # Terraform-configuraties voor het opzetten van schaalbare, on-demand agent-clusters voor zware RAG-pijplijnen
📄 `sandbox-container-rules.md`  # Docker-configuraties die ervoor zorgen dat de agent niet per ongeluk lokale systeembestanden wist tijdens een hallucinatie

## 📁 target-repositories/ (3 skills - Code Output)
📄 `health-api-backend.md`       # Standaardprocedures voor de agent bij bijdrages aan de backend Python/Node repository
📄 `health-ui-frontend.md`       # Componentstructuren en style guidelines voor de agent bij het updaten van de frontend Next.js/React repository
📄 `github-final-sync.md`        # Geautomatiseerde CI/CD-triggers die het nachtwerk van de agent valideren en dit schoon samenvoegen in de Github definitieve repositories

## 📁 frontend-asset-pipeline/ (3 skills - UI & Design Guardrails)
📄 `texture-and-color-guardrails.md` # Strikte regels die de afbeeldingsgeneratietools van de agent onderscheppen: moeten absoluut originele schilderij kleuren behouden tijdens website-afbeeldingsverbeteringen en hyperrealistische texturen afdwingen (bijv. passend aan een natuurlijke groene kokosnoot) terwijl ongewenste derde-partij-monsterflogo's worden verwijderd
📄 `responsive-layout-tester.md` # Playwright-scripts die de agent uitvoert om te verifiëren dat CSS-rasters niet breken op mobiele viewports
📄 `component-storyboarder.md`   # Genereert automatisch Storybook-items voor elk nieuw UI-element dat de agent maakt

## 📁 evals-and-telemetry/ (3 skills - Quality Control)
📄 `compile-success-tracker.md`  # Controleert de verhouding van succesvolle nachtelijke builds versus syntaxisfouten gegenereerd door de agent
📄 `token-burn-alerter.md`       # Harde limieten die de ZaltaClaw-lus onmiddellijk onderbreken als API-tokengebruik abnormaal stijgt
📄 `code-review-llm.md`          # Een secundaire, geïsoleerde agent die uitsluitend de pull-aanvragen van de primaire agent critiseert en beoordeelt

---
**Configuratiebestanden**
⚙️ `agent-permissions.json`      # In whitelist opgenomen CLI-commando's (bijv. `npm run build`, `git commit`) die de agent juridisch mag uitvoeren
📦 `bedrock-models.yaml`         # Versiepinning voor specifieke AWS Bedrock-foundationmodellen om promptdrift te voorkomen
