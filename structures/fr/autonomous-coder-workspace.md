# 📂 Espace de Travail du Codeur Autonome
> L'espace de travail canonique pour exécuter un agent de codage autonome la nuit dans un environnement d'exécution strictement isolé.

📄 `project-brief.md`      # Brief canonique : Tickets de sprint actuels et objectifs de PR pour la nuit
🧠 `memory.md`             # Mémoire de session : Contexte dynamique pour la session de codage active
🤖 `CLAUDE.md`             # Règles d'exploitation : Instructions strictes pour l'exécution nocturne (mode YOLO autorisé dans le sandbox)

## 📁 .docker-sandbox/ (5 compétences - Isolation et Sécurité)
📄 `sandbox-config.yaml`   # Définition MicroVM • Limites CPU/RAM pour le conteneur
📄 `network-policy.md`     # Règles de sortie • liste d'autorisation explicite pour les gestionnaires de paquets (npm, pip)
📄 `credential-proxy.md`   # Injection de secrets • proxy MITM pour garder les clés hôtes en dehors de la VM agent
📄 `mounts.yaml`           # Montages de volumes • strictement limités au chemin `target-repo/`
📄 `lifecycle-hooks.sh`    # Démantèlement éphémère • destruction automatique du conteneur en cas d'échec

## 📁 target-repo/ (La Base de Code Cible)
📄 `docker-compose.yml`    # L'environnement d'application que l'agent utilise pour tester son propre code
📄 `package.json`          # L'agent est autorisé à gérer les dépendances via son daemon isolé

## 📁 validation-suite/ (4 compétences - Tests sans surveillance)
📄 `matrix-runner.md`      # Instructions d'exécution des tests E2E
📄 `lint-fixer.md`         # Règles de formatage automatique avant commit
📄 `coverage-check.sh`     # Seuils de couverture minimale (par exemple, 80 %) requis pour l'approbation de PR
📄 `sandbox-tests.md`      # Valide que l'agent ne peut pas s'échapper du conteneur pendant l'exécution

## 📁 ops-automation/ (4 compétences - CI/CD et Transmission)
📄 `git-manager.md`        # Poussées git avec des identifiants limités via proxy sécurisé
📄 `commit-validator.md`   # Application de commits sémantiques (feat:, fix:, chore:)
📄 `pr-generator.md`       # Génération automatique de description de PR sur GitHub
📄 `slack-webhook.md`      # Notification de résumé du matin en cas de succès ou d'échec du pipeline

## 📁 audit-logs/ (Enregistrements Immuables)
📄 `shell-history.log`     # Enregistrement immuable de chaque commande bash exécutée par l'agent
📄 `network-events.log`    # Tous les appels API externes interceptés par le proxy

---
**Fichiers de Configuration**
⚙️ `Makefile`              # `make run-overnight` (déclenche la création du sandbox et le démarrage de l'agent)
📦 `agent-config.toml`     # Routage LLM et configurations de limite de tokens
