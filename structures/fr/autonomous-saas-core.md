# 📂 Autonomous SaaS Core
> L'espace de travail canonique pour un moteur de routage multi-agent SaaS en production sur AWS Bedrock.

📄 `router-brief.md`      # Brief canonique : Architecture système et règles d'isolation des locataires
🧠 `memory.md`            # Mémoire de session : Contexte dynamique pour la session de routage active
🤖 `CLAUDE.md`            # Règles opérationnelles : Instructions strictes pour l'agent de routage

## 📁 core-routing/ (7 compétences - Logique de supervision)
📄 `tenant-isolation.md`  # Limites de données • suppression inter-locataires stricte
📄 `task-analyzer.md`     # Extraction d'intention • mappage des capacités requises
📄 `worker-handoff.md`    # Structuration des charges utiles • déclencheurs d'événements asynchrones
📄 `state-manager.md`     # Points de contrôle • états de pause avec implication humaine
📄 `fallback-handler.md`  # Protocoles de délai d'expiration d'API • dégradation gracieuse
📄 `context-pruner.md`    # Gestion des jetons • compression sémantique
📄 `bedrock-selector.md`  # Routage dynamique des modèles basé sur la complexité de la tâche

## 📁 worker-nodes/ (4 personas d'agent - Les « Employés »)
📄 `coder-agent.md`       # Exécution de repo autonome • politiques d'exécution nocturne
📄 `qa-agent.md`          # Génération de tests • validation matricielle
📄 `data-analyst.md`      # Génération SQL • exploration de schéma
📄 `ops-agent.md`         # Vérifications d'infrastructure • analyse des journaux

## 📁 memory-sync/ (3 compétences - État persistant)
📄 `redis-caching.md`     # Récupération de session à court terme
📄 `vector-commit.md`     # Mappage de stockage pgvector à long terme
📄 `memory-cleanup.md`    # Conformité RGPD • nettoyage des informations personnelles avant stockage

## 📁 infrastructure/ (4 compétences - AWS Bedrock et déploiement)
📄 `bedrock-auth.md`      # Assomption du rôle IAM • accès inter-comptes
📄 `api-gateway.md`       # Limitation de débit • suivi des quotas API des locataires
📄 `docker-sandbox.md`    # Environnements d'exécution isolés pour les agents de code
📄 `deployment-sync.md`   # Remise CI/CD • règles de stage vs production

## 📁 evals/ (3 compétences - Benchmarks nocturnes)
📄 `routing-accuracy.md`  # Le superviseur a-t-il choisi le bon agent ?
📄 `cost-analyzer.md`     # Dépenses en jetons par locataire • seuils d'alerte
📄 `hallucination-check.md` # Ancrage des sorties • cohérence factuelle

---
**Fichiers de configuration**
⚙️ `config.yaml`          # Variables d'environnement globales et points de terminaison des modèles
📦 `pyproject.toml`       # Dépendances Python (LangGraph, Boto3, etc.)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
