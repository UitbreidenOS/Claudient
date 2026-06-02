# 📂 Laboratoire Matériel IA Edge
> L'espace de travail canonique pour un fondateur IA opérant à l'intersection du calcul matériel local (cluster Mac mini, Nvidia DGX), de la fabrication 3D physique (Bambu Lab), et du déploiement multi-agents SaaS.

📄 `lab-architecture-brief.md`      # Exposé canonique : topologie matériel, stratégie d'allocation de calcul, pipeline d'inférence et modèle de monétisation SaaS
🧠 `active-hardware-jobs.md`        # Mémoire de session : suivi en temps réel de l'utilisation du cluster, impressions 3D en cours, file d'attente d'inférence modèle et coût par requête
🤖 `CLAUDE.md`                      # Règles opérationnelles : isolation stricte des ressources entre inférence/fabrication, appliquer les décisions de conception matérielle, interdire la surallocation au-delà de 85 % d'utilisation de calcul

## 📁 local-compute-cluster/ (4 compétences - Calcul Physique)
📄 `mac-mini-m4-cluster-setup.md`   # Configuration d'un cluster à 4 nœuds Mac mini M4 exécutant des services d'inférence et la coordination des agents avec orchestration SSH unifiée
📄 `nvidia-dgx-spark-routing.md`    # Règles d'allocation de calcul, configuration CUDA/cuDNN et files d'attente de priorité des tâches pour le déchargement d'inférence LLM lourd et l'affinement
📄 `edge-inference-gateway.md`       # Équilibrage de charge, optimisation de latence et stratégies de secours lorsque le calcul sur site se sature ; routage vers les points de terminaison gérés
📄 `cluster-health-monitoring.md`    # Métriques Prometheus, alertes thermiques, suivi de la consommation électrique et déclencheurs d'arrêt automatisé pour prévenir les dommages matériels

## 📁 3d-fabrication-ops/ (4 compétences - Pipeline Fabrication)
📄 `bambu-x1c-slicer-automation.md` # Génération de code G, profils multi-matériaux, planification d'impression de nuit et suivi des coûts de filament par unité produite
📄 `hardware-design-validation.md`   # Vérifications CAO-à-gcode, validation de l'épaisseur des parois, analyse de suppression des supports et vérifications d'intégrité structurelle pour les boîtiers déployés edge
📄 `print-queue-dispatcher.md`       # Planificateur de tâches priorisant les passes d'impression, flux de travail de changement de matériau et récupération d'échec automatisée avec logique de retry prédite par ML
📄 `manufacturing-cost-ledger.md`    # Suivi des coûts matériel par unité, enregistrement de la consommation d'énergie, allocation des heures machine et analyse du seuil de rentabilité pour chaque variante de produit

## 📁 agent-deployment/ (4 compétences - Effectif SaaS)
📄 `multi-agent-orchestrator.md`    # Machine à états pour acheminer les tâches entre les agents Claude exécutés sur site, gestion des remises et coordination asynchrone
📄 `inference-service-deployment.md`# Runtimes d'agent conteneurisés sur cluster Mac, règles de mise à l'échelle, épinglage de version et flux de travail de test A/B pour les mises à jour de modèles
📄 `edge-api-gateway.md`             # Points de terminaison REST/WebSocket exposés aux clients, limitation de débit des requêtes, tokens d'authentification et mesure d'utilisation pour la facturation
📄 `managed-agent-integration.md`    # Pont de secours vers l'API Claude Managed Agents pour la capacité d'éclatement, suivi des coûts par token et logique de basculement automatique

## 📁 edge-inference/ (3 compétences - Opérations Modèles)
📄 `quantized-model-registry.md`     # Versioning et déploiement de modèles GGUF/ONNX, profils de quantification 4-bit/8-bit pour inférence Mac mini, benchmarks de latence
📄 `fine-tuning-pipeline.md`         # Flux de travail LoRA/QLoRA locaux sur DGX Spark, versioning des ensembles de données, suivi de la division de validation et test A/B pour les modèles personnalisés
📄 `inference-caching-strategy.md`   # Mise en cache au niveau des tokens, gestion du cache KV, optimisation de la fenêtre de contexte et suivi de la personnalisation du modèle par client

## 📁 cost-optimization/ (3 compétences - Économie & Efficacité)
📄 `unit-economics-dashboard.md`     # Coût d'inférence en temps réel, marges brutes par fonctionnalité, affectations des responsables et analyse du seuil de rentabilité par cohorte de clients
📄 `hardware-utilization-tuning.md`  # Optimisation de la taille des lots, planification de l'inférence pour minimiser le temps d'inactivité, récupération de throttling thermique et optimisation de la consommation électrique par charge de travail
📄 `capacity-planning-rules.md`      # Prévision de la demande, déclencheurs d'expansion de cluster lorsque l'utilisation soutenue dépasse 75 %, calendriers d'amortissement et modèles ROI pour les cycles de renouvellement matériel

---
**Fichiers de Configuration**
⚙️ `hardware-topology.yaml`         # Inventaire des nœuds (nombre Mac mini M4, spécifications DGX Spark), topologie réseau, mappages des points de terminaison d'inférence et règles de basculement
⚙️ `edge-agent-manifest.json`       # Liste des agents déployés, cœurs CPU alloués par agent, réservations de mémoire et affectations de modèles d'inférence par service
⚙️ `manufacturing-bill-of-materials.yaml` # Coûts des pièces, délais de livraison, fournisseurs et déclencheurs de réapprovisionnement pour filament et consommables matériel
📦 `requirements.txt`               # Dépendances Python (chargeurs GGUF, bibliothèques de quantification, SDK de surveillance, cadres d'inférence pour déploiement edge)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
