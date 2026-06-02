# 📂 Edge AI Hardware Lab
> Der kanonische Arbeitsbereich für einen KI-Gründer, der an der Schnittstelle zwischen lokalem Hardware-Computing (Mac mini Cluster, Nvidia DGX), physischer 3D-Fertigung (Bambu Lab) und Multi-Agent-SaaS-Bereitstellung tätig ist.

📄 `lab-architecture-brief.md`      # Kanonische Beschreibung: Hardware-Topologie, Compute-Allokationsstrategie, Inferenz-Pipeline und SaaS-Monetarisierungsmodell
🧠 `active-hardware-jobs.md`        # Sitzungsspeicher: Echtzeit-Tracking der Cluster-Auslastung, laufende 3D-Drucke, Modell-Inferenz-Warteschlange und Kosten pro Anfrage
🤖 `CLAUDE.md`                      # Betriebsregeln: Strikte Ressourcenauflösung zwischen Inferenz und Fertigung, Durchsetzung hardware-erster Entwurfsentscheidungen, Verbot der Überallokation über 85 % Compute-Auslastung

## 📁 local-compute-cluster/ (4 Fähigkeiten - Physische Berechnung)
📄 `mac-mini-m4-cluster-setup.md`   # Konfiguration für 4-Knoten-Mac-mini-M4-Cluster mit Inferenzdiensten und Agent-Koordination mit einheitlicher SSH-Orchestrierung
📄 `nvidia-dgx-spark-routing.md`    # Compute-Allokationsregeln, CUDA/cuDNN-Konfiguration und Task-Prioritätswarteschlangen für das Auslagern von schwerer LLM-Inferenz und Feinabstimmung
📄 `edge-inference-gateway.md`       # Lastverteilung, Latenzoptimierung und Fallback-Strategien bei Auslastung des On-Premise-Computings; Routing zu verwalteten Endpoints
📄 `cluster-health-monitoring.md`    # Prometheus-Metriken, Thermal-Alerts, Power-Draw-Tracking und automatisierte Shutdown-Auslöser zur Vermeidung von Hardware-Schäden

## 📁 3d-fabrication-ops/ (4 Fähigkeiten - Fertigungspipeline)
📄 `bambu-x1c-slicer-automation.md` # G-Code-Generierung, Multi-Material-Profile, nächtliche Druckplanung und Filament-Kostenverfolgung pro hergestellter Einheit
📄 `hardware-design-validation.md`   # CAD-zu-Gcode-Prüfungen, Wandstärkenvalidierung, Support-Entfernungsanalyse und Integritätsprüfungen für Edge-bereitgestellte Gehäuse
📄 `print-queue-dispatcher.md`       # Job-Scheduler mit Priorisierung von Druckläufen, Material-Umschalt-Workflows und automatisierte Fehlerbehebung mit ML-vorhergesagter Wiederholungslogik
📄 `manufacturing-cost-ledger.md`    # Pro-Einheit-Materialkostenverfolgung, Energieverbrauchsprotokollierung, Maschinenzeit-Allokation und Break-Even-Analyse für jede Produktvariante

## 📁 agent-deployment/ (4 Fähigkeiten - SaaS-Belegschaft)
📄 `multi-agent-orchestrator.md`    # Zustandsmaschine zum Routing von Aufgaben zwischen Claude Agents, die lokal laufen, mit Übergängen und asynchroner Koordination
📄 `inference-service-deployment.md`# Containerisierte Agent-Laufzeiten auf Mac-Cluster, Skalierungsregeln, Versions-Pinning und A/B-Test-Workflows für Modell-Upgrades
📄 `edge-api-gateway.md`             # REST/WebSocket-Endpoints für Kunden, Request-Drosselung, Authentifizierungstoken und Nutzungsmessung für Abrechnung
📄 `managed-agent-integration.md`    # Fallback-Bridge zu Claude Managed Agents API für Burst-Kapazität, Kostenverfolgung pro Token und automatisierte Switchover-Logik

## 📁 edge-inference/ (3 Fähigkeiten - Modellbetrieb)
📄 `quantized-model-registry.md`     # Versionierung und Bereitstellung von GGUF/ONNX-Modellen, 4-Bit/8-Bit-Quantisierungsprofile für Mac-mini-Inferenz, Latenz-Benchmarks
📄 `fine-tuning-pipeline.md`         # Lokale LoRA/QLoRA-Workflows auf DGX Spark, Dataset-Versionierung, Validierungs-Split-Tracking und A/B-Test-Rollout für benutzerdefinierte Modelle
📄 `inference-caching-strategy.md`   # Token-Level-Caching, KV-Cache-Verwaltung, Context-Window-Optimierung und Pro-Kunden-Modellpersonalisierungs-Tracking

## 📁 cost-optimization/ (3 Fähigkeiten - Wirtschaft und Effizienz)
📄 `unit-economics-dashboard.md`     # Echtzeit-Kosten pro Inferenz, Bruttomarge nach Feature, DRI-Zuweisungen für Kostenreduktion und Break-Even-Analyse pro Kundenkohort
📄 `hardware-utilization-tuning.md`  # Batch-Größen-Optimierung, Inferenzplanung zur Minimierung von Ausfallzeiten, Thermal-Throttling-Wiederherstellung und Power-Draw-Optimierung pro Workload
📄 `capacity-planning-rules.md`      # Nachfrageprognose, Cluster-Erweiterungsauslöser bei Auslastung über 75 %, Abschreibungspläne und ROI-Modelle für Hardware-Aktualisierungszyklen

---
**Konfigurationsdateien**
⚙️ `hardware-topology.yaml`         # Knoten-Inventar (Mac-mini-M4-Anzahl, DGX-Spark-Spezifikationen), Netzwerk-Topologie, Inferenz-Endpoint-Zuordnungen und Failover-Regeln
⚙️ `edge-agent-manifest.json`       # Bereitgestellte Agent-Liste, zugeordnete CPU-Kerne pro Agent, Speicherreservierungen und Inferenzmodell-Zuweisungen pro Service
⚙️ `manufacturing-bill-of-materials.yaml` # Teilkosten, Lieferzeiten, Lieferanten und Nachbestellungsauslöser für Filament und Hardware-Verbrauchsmaterialien
📦 `requirements.txt`               # Python-Abhängigkeiten (GGUF-Loader, Quantisierungsbibliotheken, Monitoring-SDKs, Inferenz-Frameworks für Edge-Bereitstellung)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
