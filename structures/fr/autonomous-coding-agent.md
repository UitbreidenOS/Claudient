# 📂 Espace de travail autonome de l'agent de codage
> L'espace de travail canonique pour déployer et gérer des agents de codage autonomes de grade production, conçus pour exécuter des boucles de développement continu la nuit et mettre à jour sans problème le code validé dans vos référentiels finaux.

📄 `agent-architecture-brief.md` # Brief canonique : définit les permissions de l'agent, la pile technologique approuvée, et les seuils d'intervention humaine en boucle fermée (HITL)
🧠 `active-nightly-builds.md`    # Mémoire de session : suivi dynamique du contexte pour les tâches actuelles de refactorisation nocturne et les erreurs de compilation non résolues
🤖 `CLAUDE.md`                   # Règles d'exploitation : instructions strictes pour empêcher les boucles d'exécution infinies et mandater le routage d'API déterministe

## 📁 agent-orchestration/ (4 compétences - Le cerveau)
📄 `zaltaclaw-execution-loop.md` # Le moteur autonome principal permettant à l'agent ZaltaClaw d'écrire, tester et déboguer du code la nuit sans intervention humaine
📄 `claude-managed-agents.md`    # Configurations d'intégration pour utiliser les agents gérés en bêta public de Claude pour des tâches de raisonnement spécialisées
📄 `claude-code-integration.md`  # Wrappers CLI permettant à l'agent d'exécuter des commandes shell et modifier les fichiers locaux en toute sécurité
📄 `multi-agent-coordinator.md`  # Logique de superviseur pour router les tâches complexes sur des systèmes multi-agents hébergés sur AWS Bedrock

## 📁 compute-and-infrastructure/ (3 compétences - Environnement d'exécution)
📄 `mac-mini-host-config.md`     # Scripts de configuration pour déployer la boucle autonome principale sur un Mac mini dédié afin de minimiser les coûts d'inférence cloud
📄 `aws-bedrock-allocator.md`    # Configurations Terraform pour créer des clusters d'agents scalables à la demande pour les pipelines RAG lourds
📄 `sandbox-container-rules.md`  # Configurations Docker garantissant que l'agent ne peut pas accidentellement effacer les fichiers système locaux pendant une hallucination

## 📁 target-repositories/ (3 compétences - Sortie de code)
📄 `health-api-backend.md`       # Procédures d'exploitation standard pour l'agent lors de la contribution au référentiel Python/Node du backend
📄 `health-ui-frontend.md`       # Structures de composants et directives de style pour l'agent lors de la mise à jour du référentiel Next.js/React du frontend
📄 `github-final-sync.md`        # Déclencheurs CI/CD automatisés qui valident le travail nocturne de l'agent et le fusionnent proprement dans les référentiels finaux Github

## 📁 frontend-asset-pipeline/ (3 compétences - Garde-fous d'interface utilisateur et de conception)
📄 `texture-and-color-guardrails.md` # Règles strictes interceptant les outils de génération d'images de l'agent : doivent absolument préserver les couleurs de peinture originales lors de l'amélioration des images du site Web, et appliquer des textures hyper-réalistes (par exemple, correspondant à une noix de coco verte naturelle) tout en supprimant les logos de monstres tiers indésirables
📄 `responsive-layout-tester.md` # Scripts Playwright que l'agent exécute pour vérifier que les grilles CSS ne se cassent pas sur les viewports mobiles
📄 `component-storyboarder.md`   # Génère automatiquement des entrées Storybook pour tout nouvel élément d'interface utilisateur créé par l'agent

## 📁 evals-and-telemetry/ (3 compétences - Contrôle de la qualité)
📄 `compile-success-tracker.md`  # Surveille le ratio des builds nocturnes réussis par rapport aux erreurs de syntaxe générées par l'agent
📄 `token-burn-alerter.md`       # Limites strictes qui mettent instantanément en pause la boucle ZaltaClaw si l'utilisation des tokens d'API augmente anormalement
📄 `code-review-llm.md`          # Un agent secondaire isolé qui critique et note exclusivement les demandes de pull de l'agent principal

---
**Fichiers de configuration**
⚙️ `agent-permissions.json`      # Commandes CLI autorisées (par exemple, `npm run build`, `git commit`) que l'agent est légalement autorisé à exécuter
📦 `bedrock-models.yaml`         # Épinglage de version pour des modèles de fondation AWS Bedrock spécifiques pour éviter la dérive d'invite
