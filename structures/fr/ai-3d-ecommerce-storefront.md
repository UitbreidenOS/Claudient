# 📂 Vitrine E-commerce IA 3D

> L'espace de travail canonique pour une architecture de backend de qualité production, conçue pour gérer une inférence LLM à haute concurrence, l'acheminement dynamique des tâches multi-agents et la monétisation rapide des SaaS.

📄 `backend-architecture-brief.md` # Mémento canonique : Définit les limites de l'API centrale, les SLA de latence des tokens et le modèle commercial multi-agents global
🧠 `active-agent-sessions.md`      # Mémoire de session : Suivi dynamique du contexte pour les charges de travail actuelles des employés virtuels et les connexions de base de données actives
🤖 `CLAUDE.md`                     # Règles opérationnelles : Instructions strictes pour appliquer la limitation de débit de l'API et imposer les configurations de serveur sans état

## 📁 api-gateway-and-routes/ (4 compétences - La Porte d'Entrée)
📄 `health-api-core.md`            # Le serveur FastAPI/Node central gérant toutes les requêtes clientes entrantes pour le référentiel health-api principal
📄 `streaming-response-handler.md` # Logique Server-Sent Events (SSE) pour diffuser instantanément les processus de réflexion multi-agents vers l'interface utilisateur
📄 `rate-limit-and-auth.md`        # Middleware soutenu par Redis garantissant que les utilisateurs ne peuvent pas lancer une attaque DDoS sur les coûteux points de terminaison d'inférence
📄 `rapid-monetization-webhooks.md`# Intégrations Stripe parfaitement mappées à l'utilisation des tokens pour assurer la monétisation rapide et efficace de votre SaaS

## 📁 multi-agent-orchestration/ (3 compétences - Employés Virtuels)
📄 `saas-employee-router.md`       # La machine à états superviseur qui classe les intentions des utilisateurs et confie les tâches aux "employés" IA spécialisés
📄 `inter-agent-pubsub.md`         # Canaux Kafka ou Redis Pub/Sub permettant à l'« Agent Recherche » de transmettre des données structurées à l'« Agent Codage » de manière asynchrone
📄 `hallucination-firewall.md`     # Validateurs de schéma Pydantic rejetant et relançant automatiquement les résultats d'agents qui cassent la structure JSON attendue

## 📁 compute-load-balancer/ (4 compétences - Coûts et Échelle)
📄 `bedrock-primary-allocator.md`  # Configurations Terraform acheminant les systèmes multi-agents lourds et les pipelines RAG directement vers AWS Bedrock
📄 `mac-mini-fallback.md`          # Logique d'acheminement dynamique détectant les tâches de fond non urgentes et les poussant vers un Mac mini dédié pour réduire drastiquement les coûts du cloud
📄 `dgx-spark-ml-runner.md`        # Points de terminaison personnalisés pour décharger les tâches d'apprentissage profond et l'affinement des modèles locaux sur du matériel lourd Nvidia DGX
📄 `token-budget-enforcer.md`      # Disjoncteurs qui mettent automatiquement en pause la boucle d'exécution d'un employé IA s'il dépasse son allocation de dépenses API

## 📁 memory-and-context/ (3 compétences - Gestion d'État)
📄 `vector-db-connector.md`        # Pools de connexion et couches de mise en cache sémantique pour Pinecone/pgvector
📄 `short-term-redis-memory.md`    # Gère la fenêtre de conversation active, en résumant automatiquement les anciens messages pour éviter le gonflement des tokens
📄 `long-term-s3-archives.md`      # Stockage froid pour les résultats finalisés des agents et les journaux système

## 📁 ci-cd-and-deployment/ (3 compétences - Livraison)
📄 `container-optimization.md`     # Dockerfiles multi-étapes supprimant complètement les dépendances ML lourdes du build de production
📄 `load-test-simulator.md`        # Scripts k6 imitant 1 000 appels API d'agents concurrents pour tester les goulots d'étranglement du système
📄 `github-final-sync.md`          # Actions automatisées pour linter, tester et pousser le code backend prêt pour la production directement vers vos repos Github finaux

---
**Fichiers de Configuration**
⚙️ `openapi-schema.yaml`           # La source unique de vérité pour les contrats health-api, assurant que l'interface utilisateur ne se casse jamais
📦 `celery-worker.conf`            # Configuration pour les files d'attente de tâches asynchrones gérant les travaux d'agent du jour au lendemain
