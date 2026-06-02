# 📂 Edge AI Hardware Lab
> De canonieke werkplek voor een AI-oprichter die opereert op het snijvlak van lokale hardwarecompute (Mac mini-cluster, Nvidia DGX), fysieke 3D-fabricage (Bambu Lab), en multi-agent SaaS-implementatie.

📄 `lab-architecture-brief.md`      # Canonieke brief: Hardwaretopologie, computeallocatiestrategie, inferentiepijplijn, en SaaS-monetarisatiemodel
🧠 `active-hardware-jobs.md`        # Sessiegeheugen: Realtime tracking van clustergebruik, actieve 3D-afdrukken, modelinferentiewachtrij, en kosten per aanvraag
🤖 `CLAUDE.md`                      # Bedrijfsregels: Strikte resourceisolatie tussen inferentie/fabricage, hardwaregerichte ontwerpbeslissingen afdwingen, overallocatie boven 85% computegebruik verbieden

## 📁 local-compute-cluster/ (4 skills - Fysieke Compute)
📄 `mac-mini-m4-cluster-setup.md`   # Configuratie voor 4-knoops Mac mini M4-cluster met inferentieservices en agentcoördinatie met uniforme SSH-orkestatie
📄 `nvidia-dgx-spark-routing.md`    # Computeallocatieregels, CUDA/cuDNN-configuratie, en taakprioriteitslijsten voor offloading van zware LLM-inferentie en finetuning
📄 `edge-inference-gateway.md`       # Taakverdeling, latency-optimalisatie, en fallback-strategieën wanneer on-premise compute verzadigd raakt; routering naar beheerde endpoints
📄 `cluster-health-monitoring.md`    # Prometheus-metrieken, thermische waarschuwingen, stroomverbruiktracking, en geautomatiseerde afsluittriggers ter voorkoming van hardwareschade

## 📁 3d-fabrication-ops/ (4 skills - Fabricagepijplijn)
📄 `bambu-x1c-slicer-automation.md` # G-code-generering, multi-materialprofielen, nachtelijke afdrukplanning, en filamentkosten per geproduceerde eenheid
📄 `hardware-design-validation.md`   # CAD-naar-gcode-controles, wanddikteverificatie, ondersteuningsverwijdering-analyse, en structuraalintegriteitschecks voor aan de rand geïmplementeerde behuizingen
📄 `print-queue-dispatcher.md`       # Taakplanner die afdrukruns prioriseerd, materialwisselwerkstromen, en geautomatiseerd foutherstel met ML-voorspelde retrylogica
📄 `manufacturing-cost-ledger.md`    # Materialkosten per eenheid, stroomverbruikregistratie, machine-uurallocatie, en break-evenanalyse voor elke productvariante

## 📁 agent-deployment/ (4 skills - SaaS-werkforce)
📄 `multi-agent-orchestrator.md`    # Toestandsmachine voor routering van taken tussen Claude Agents op on-premise, beheer van handoffs en asynchrone coördinatie
📄 `inference-service-deployment.md`# Gecontaineriseerde agentruntimes op Mac-cluster, schalingsregels, versionvastlegging, en A/B-testrworkflows voor modelupgrades
📄 `edge-api-gateway.md`             # REST/WebSocket-eindpunten voor klanten, requestgascontrole, verificatietokens, en gebruiksmetering voor facturering
📄 `managed-agent-integration.md`    # Fallback-brug naar Claude Managed Agents API voor burstcapaciteit, kostentracking per token, en automatische switchover-logica

## 📁 edge-inference/ (3 skills - Modeloperaties)
📄 `quantized-model-registry.md`     # Versionering en implementatie van GGUF/ONNX-modellen, 4-bits/8-bits kwantiseringsprofielen voor Mac mini-inferentie, latency-benchmarks
📄 `fine-tuning-pipeline.md`         # Lokale LoRA/QLoRA-werkstromen op DGX Spark, datasetversioning, validatiesplitsing tracking, en A/B-test-rollout voor aangepaste modellen
📄 `inference-caching-strategy.md`   # Tokenleveling-caching, KV-cachebeheer, contextvensteroptimalisatie, en model-personalisatietracking per klant

## 📁 cost-optimization/ (3 skills - Economie & Efficiëntie)
📄 `unit-economics-dashboard.md`     # Realtime kostprijs per inferentie, brutominages per functie, DRI-toewijzingen voor kostenreductie, en break-evenanalyse per klantencohort
📄 `hardware-utilization-tuning.md`  # Batchgrootteoptimalisatie, inferentiescheduling ter minimalisering van inactiviteit, thermal throttling-herstel, en stroomverbruikoptimalisatie per workload
📄 `capacity-planning-rules.md`      # Vraagprognose, clustererweiteringstriggers wanneer blijvend gebruik 75% overschrijdt, afschrijvingsschema's, en ROI-modellen voor hardwarevernieuwingscycli

---
**Configuratiebestanden**
⚙️ `hardware-topology.yaml`         # Knoopinventaris (aantal Mac mini M4, DGX Spark-specs), netwerktopologie, inferentie-eindpuntmappings, en failover-regels
⚙️ `edge-agent-manifest.json`       # Geïmplementeerde agentlijst, toegewezen CPU-kernen per agent, geheugenreserveringen, en inferentiemodeltowijzingen per service
⚙️ `manufacturing-bill-of-materials.yaml` # Onderdeelkosten, levertijden, leveranciers, en herbestellingstriggers voor filament en hardwareconsumables
📦 `requirements.txt`               # Python-afhankelijkheden (GGUF-loaders, kwantiseringsbibliotheken, monitoring-SDK's, inferenceraamwerken voor edge-implementatie)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
