# 📂 Sandbox Agentique Local-First

> L'espace de travail canonique pour exécuter un agent autonome entièrement hors ligne, cloisonné, utilisant des modèles open-weights locaux (Ollama/Qwen/Llama 3).

📄 `offline-brief.md`         # Brief canonique : Architecture système pour une exécution entièrement locale à latence zéro
🧠 `memory.md`                # Mémoire de session : Suivi dynamique du contexte pour la session de l'agent local actif
🤖 `CLAUDE.md`                # Règles opérationnelles : Instructions strictes pour contourner les mécanismes de secours API externes

## 📁 model-orchestration/ (4 compétences - Moteur LLM Local)
📄 `ollama-router.md`         # Multiplexeur de modèles • route la logique complexe vers Qwen-72B et les tâches simples vers Llama-3-8B
📄 `modelfile-manager.md`     # Injection dynamique de prompt système pour les modèles GGUF locaux
📄 `vram-allocator.md`        # Surveillance de la mémoire GPU • prévient les crashes de mémoire insuffisante (OOM) sur le matériel local
📄 `fallback-handler.md`      # Dégradations de quantification de modèle (ex. Q8 vers Q4) en cas de pics de mémoire

## 📁 local-tools/ (5 compétences - Exécution Hors Ligne)
📄 `file-system-editor.md`    # Opérations CRUD avec portée pour les répertoires locaux
📄 `local-bash-runner.md`     # Moteur d'exécution shell isolé au sein du système d'exploitation hôte
📄 `sqlite-manager.md`        # Requêtes directes aux bases de données légères locales sans surcharge réseau
📄 `offline-linter.md`        # Validation de code utilisant uniquement des outils d'analyse statique purement locaux
📄 `local-rag-search.md`      # Recherche BM25 par mots-clés + recherche vectorielle dense locale

## 📁 memory-store/ (3 compétences - État Persistant)
📄 `chromadb-manager.md`      # Stockage vectoriel éphémère et persistant s'exécutant strictement sur localhost
📄 `sqlite-state-tracker.md`  # Journal transactionnel de toutes les étapes de l'agent pour les capacités de pause/reprise
📄 `context-pruner.md`        # Gestion des jetons par fenêtre glissante adaptée aux limites de contexte du modèle local (ex. contexte 8k)

## 📁 security-boundaries/ (3 compétences - Protection de l'Hôte)
📄 `chroot-jail.md`           # Confinement du répertoire garantissant que l'agent ne peut pas accéder à `~/.ssh` ou aux racines système
📄 `network-blocker.md`       # Règles de pare-feu imposant une politique stricte de zéro-sortie réseau
📄 `resource-limits.md`       # Configuration cgroups pour limiter l'utilisation maximale du CPU/RAM par le processus de l'agent

## 📁 evals/ (3 compétences - Benchmarking Local)
📄 `inference-speed.md`       # Suit les tokens par seconde (TPS) sur le matériel local
📄 `tool-accuracy.md`         # Comparaison à la vérité du terrain pour les sorties bash et SQLite locales
📄 `hardware-thermals.md`     # Surveille les températures système pour suspendre l'inférence si le matériel surchauffe

---
**Fichiers de Configuration**
⚙️ `Modelfile`                # Instructions Ollama personnalisées et paramètres (température, top_k)
⚙️ `docker-compose.local.yml` # Pile locale autonome pour ChromaDB, UI et service de modèle

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
