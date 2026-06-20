# 📂 Multi-Agent SaaS Workspace

> L'espace de travail canonique pour un architecte de plateforme IA, conçu pour construire, mettre à l'échelle et monétiser une plateforme SaaS où des agents IA autonomes fonctionnent comme des employés virtuels.

📄 `platform-architecture-brief.md` # Brief canonique : Définit les personas des agents « employés », la stratégie de monétisation principale et l'isolement des données multi-locataires
🧠 `active-workforce-memory.md`     # Mémoire de session : suivi du contexte dynamique pour les files d'attente des tâches des agents actuels et les journaux de communication inter-agents
🤖 `CLAUDE.md`                      # Règles opérationnelles : instructions strictes pour appliquer l'acheminement déterministe des outils et prévenir les boucles infinies des agents

## 📁 agent-workforce/ (4 compétences - Employés virtuels)
📄 `employee-persona-router.md`     # Le nœud superviseur qui classe les intentions des utilisateurs et délègue les tâches aux agents départementaux spécialisés (p. ex. agent de vente, agent d'assistance)
📄 `zaltaclaw-autonomous-loop.md`   # Moteur d'exécution principal pour exécuter des opérations d'agents autonomes continues et nocturnes sans intervention humaine
📄 `inter-agent-protocols.md`       # Normes de transmission de messages permettant à l'« agent marketing » de transmettre en douceur le contexte à l'« agent des ventes »
📄 `hallucination-guardrails.md`    # Vérifications heuristiques pré-vol bloquant les entrées contradictoires ou les actions des agents hors limites

## 📁 infrastructure-and-compute/ (4 compétences - Mise à l'échelle et coûts)
📄 `aws-bedrock-allocator.md`       # Scripts Terraform provisionnant des fondations de modèles sécurisées et scalables et des bases de connaissances via AWS Bedrock
📄 `local-compute-fallback.md`      # Logique d'acheminement pour décharger les tâches d'inférence lourdes et non sensibles au temps vers un Mac mini dédié pour économiser les coûts cloud
📄 `context-window-manager.md`      # Résume et tronque les récupérations massives du pipeline RAG pour prévenir les pannes de limite de jetons
📄 `model-agnostic-wrapper.md`      # Permet à la plateforme de basculer en douceur entre Claude 3, GPT-4 et les modèles locaux selon la difficulté de la tâche

## 📁 monetization-and-billing/ (3 compétences - Chiffre d'affaires)
📄 `rapid-monetization-model.md`    # Structures de facturation Stripe optimisées pour les niveaux de tiers d'abonnement « pay-per-task » ou « agent-seat »
📄 `token-spend-tracker.md`         # Agrège les coûts d'API par locataire en temps réel, en appliquant des limites strictes pour prévenir les factures cloud exorbitantes
📄 `freemium-feature-flags.md`      # Mappe les outils autonomes spécifiques et les capacités de mémoire au niveau de facturation actif de l'utilisateur

## 📁 deployment-pipeline/ (3 compétences - CI/CD)
📄 `agent-eval-framework.md`        # Scripts automatisés LLM-as-a-judge testant les employés virtuels contre un ensemble de données doré de réponses parfaites
📄 `prompt-drift-detector.md`       # Alerte l'équipe si un système d'invite nouvellement déployé dégrade le taux de succès des agents de codage autonomes
📄 `github-final-sync.md`           # Flux de travail CI/CD pour fusionner proprement les comportements des agents approuvés et les mises à jour de la plateforme directement vers les dépôts GitHub finaux

---
**Configuration Files**
⚙️ `bedrock-agent-schema.json`      # Infrastructure-as-code définissant les groupes d'actions et les schémas OpenAPI pour les agents AWS Bedrock
📦 `redis-memory-cache.yaml`        # Configuration pour la récupération rapide de la mémoire à court terme dans le cluster d'agents
