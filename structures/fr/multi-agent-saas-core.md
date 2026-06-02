# 📂 Cœur SaaS Multi-Agents
> La hiérarchie multi-locataire canonique pour héberger des instances d'agents IA isolées et concurrentes en tant qu'employés d'entreprise scalables.

📄 `saas-architecture-brief.md` # Brief canonique : Cartes multi-locataires, règles de routage et limites inter-comptes
🧠 `tenant-state-memory.md`    # Mémoire de session : Suivi de contexte dynamique pour le pool de workers actif du locataire
🤖 `CLAUDE.md`                 # Règles d'exploitation : Instructions strictes pour maintenir les limites de sécurité des locataires

## 📁 tenant-router/ (6 compétences - Passerelle et Contrôle de Contexte)
📄 `tenant-authenticator.md`   # Décode les jetons JWT • mappe les requêtes entrantes aux ID de locataire isolés
📄 `quota-guardrail.md`        # Suivi des jetons en temps réel • vérifications de limite de taux API par niveau
📄 `dynamic-context-loader.md` # Injecte dynamiquement les règles métier spécifiques au locataire dans l'invite de l'agent
📄 `isolation-verifier.md`     # Couche de sécurité • garantit l'absence de contamination croisée des chemins de mémoire multi-agents
📄 `billing-hook-router.md`    # Événements d'utilisation Stripe • suspend les processus worker si l'abonnement expire
📄 `model-tier-allocator.md`   # Route le niveau gratuit vers Claude 3.5 Haiku et le niveau entreprise vers Claude 3.5 Sonnet

## 📁 agent-marketplace/ (Archétypes d'Employés Principaux)
📄 `hr-onboarding-agent.md`   # Flux de travail automatisés pour la configuration des employés du locataire
📄 `finance-auditor-agent.md`  # Vérification des transactions et vérification du grand livre
📄 `support-dispatcher.md`     # Triage des tickets d'assistance client et routage de résolution

## 📁 shared-state-engine/ (4 compétences - Coordination Multi-Agents)
📄 `state-store-sync.md`       # Verrou d'état distribué soutenu par Redis pour prévenir les conditions de course
📄 `message-bus.md`            # Couche Pub/Sub permettant aux agents de se transmettre des messages structurés
📄 `human-approval-gate.md`    # Mécaniques d'interruption • arrête le flux de travail de l'agent en attente de confirmation du tableau de bord du locataire
📄 `event-history-logger.md`   # Piste d'audit immuable des décisions d'agent rendue à l'interface utilisateur du locataire

## 📁 enterprise-connectors/ (3 compétences - Intégration de Données)
📄 `stripe-webhook.md`         # Écoute les mises à niveau, rétrogradations et annulations d'abonnement directes
📄 `database-pool-manager.md`  # Sécurité au niveau des lignes (RLS) Mappage PostgreSQL pour l'isolation multi-locataire
📄 `external-crm-bridge.md`    # Gestion de connexion dynamique pour les instances Salesforce/HubSpot détenues par le locataire

## 📁 telemetry-evals/ (3 compétences - Métriques d'Utilisation Nocturnes)
📄 `tenant-cost-analyzer.md]   # Agrège les coûts précis en jetons LLM par jour pour chaque espace de travail de locataire individuel
📄 `efficiency-tracker.md`     # Surveille les comptages d'étapes et les latences d'exécution sur les cohortes d'agents actifs
📄 `security-compliance.md]    # Analyse automatisée pour les fuites PII sur les limites des workers du locataire

---
**Fichiers de Configuration**
⚙️ `pnpm-workspace.yaml`       # Gestionnaire d'architecture monorepo (tableau de bord Next.js + cœur d'agent FastAPI)
⚙️ `prisma.schema`              # Schéma de base de données appliquant des relations TenantId strictes
📦 `poetry.lock`                # Fichier verrouillé de dépendances Python rapide et déterministe

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
