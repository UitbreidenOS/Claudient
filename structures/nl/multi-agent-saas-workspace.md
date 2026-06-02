# 📂 Multi-Agent SaaS Workspace

> De canonieke werkruimte voor een AI Platform Architect, ontworpen om een SaaS-platform te bouwen, te schalen en te monetiseren waar autonome AI-agenten als virtuele werknemers functioneren.

📄 `platform-architecture-brief.md` # Canonieke brief: Bepaalt de agent "werknemers"-persona's, kernmonetarisatingstrategie en multi-tenant gegevensisolatie
🧠 `active-workforce-memory.md`     # Sessiegeheugen: Dynamisch contextbeheer voor huidige agent taakwachtrijen en inter-agent communicatielogboeken
🤖 `CLAUDE.md`                      # Bedrijfsregels: Strikte instructies om deterministische toolrouting af te dwingen en oneindige agent-lussen te voorkomen

## 📁 agent-workforce/ (4 vaardigheden - Virtuele Werknemers)
📄 `employee-persona-router.md`     # De supervisiorknoopunt die gebruikersintenties classificeert en taken delegeert aan gespecialiseerde afdelingen-agenten (bijv. Sales Agent, Support Agent)
📄 `zaltaclaw-autonomous-loop.md`   # Kernuitvoeringsmotor voor het uitvoeren van continue autonome agentbewerkingen 's nachts zonder menselijke tussenkomst
📄 `inter-agent-protocols.md`       # Message-passing standaarden waarmee de "Marketing Agent" naadloos context kan doorgeven aan de "Sales Agent"
📄 `hallucination-guardrails.md`    # Pre-flight heuristische controles die antagonistische invoer of out-of-bounds agent-acties blokkeren

## 📁 infrastructure-and-compute/ (4 vaardigheden - Schaal & Kosten)
📄 `aws-bedrock-allocator.md`       # Terraform-scripts die veilige, schaalbare stichtingsmodellen en kennisbases via AWS Bedrock inrichten
📄 `local-compute-fallback.md`      # Routeringslogica om zware, niet-tijdgevoelige inferentietaken naar een toegewijde Mac mini te verplaatsen om cloudkosten te besparen
📄 `context-window-manager.md`      # Vat enorme RAG-pipelineophaaloperaties samen en trunceert deze om token-limietcrashes te voorkomen
📄 `model-agnostic-wrapper.md`      # Stelt het platform in staat om naadloos tussen Claude 3, GPT-4 en lokale modellen te wisselen afhankelijk van de taakmoeilijkheidsgraad

## 📁 monetization-and-billing/ (3 vaardigheden - Inkomsten)
📄 `rapid-monetization-model.md`    # Stripe-factureringsstructuren geoptimaliseerd voor "pay-per-task" of "agent-seat" abonnementtiers
📄 `token-spend-tracker.md`         # Aggregeert API-kosten per tenant in realtime en dwingt harde limieten af om ongeremd cloudrekeningen te voorkomen
📄 `freemium-feature-flags.md`      # Brengt specifieke autonome tools en geheugenmaatregelen in kaart op de actieve factureringsstier van de gebruiker

## 📁 deployment-pipeline/ (3 vaardigheden - CI/CD)
📄 `agent-eval-framework.md`        # Geautomatiseerde LLM-as-a-judge scripts die de virtuele werknemers testen tegen een gouden gegevensset van perfecte antwoorden
📄 `prompt-drift-detector.md`       # Waarschuwt het team als een nieuw geïmplementeerde systeemaanwijzing de succespercentage van autonome codeersagenten degradeert
📄 `github-final-sync.md`           # CI/CD-workflows om goedgekeurde agentgedragingen en platformupdates schoon rechtstreeks naar Github finale repos samen te voegen

---
**Configuratiebestanden**
⚙️ `bedrock-agent-schema.json`      # Infrastructure-as-code die de actiegroepen en OpenAPI-schema's voor AWS Bedrock-agenten definieert
📦 `redis-memory-cache.yaml`        # Configuratie voor snelle, korte-termijn geheugen ophalen in de agent-cluster

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
