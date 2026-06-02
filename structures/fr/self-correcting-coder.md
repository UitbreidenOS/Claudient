# 📂 Développeur Auto-Correcteur
> L'espace de travail canonique pour une boucle de génération de code autonome qui écrit, teste et corrige itérativement son propre code avant synchronisation en production.

📄 `loop-architecture-brief.md` # Brève canonique : Définit le seuil d'échec acceptable et la profondeur d'itération maximale
🧠 `memory.md`                  # Mémoire de session : Suivi du contexte dynamique pour la boucle de compilation active
🤖 `CLAUDE.md`                  # Règles d'exploitation : Instructions strictes pour interpréter les traces de pile au lieu de deviner

## 📁 generation-engine/ (4 compétences - Création de Code Initial)
📄 `spec-analyzer.md`           # Analyse les exigences des PR • identifie les dépendances nécessaires
📄 `scaffolding-builder.md`     # Crée la structure d'échafaudage basée sur la pile technologique
📄 `logic-writer.md`            # Exécution principale • rédige la logique fonctionnelle initiale
📄 `docstring-generator.md`     # Documente automatiquement la logique inline et les types de paramètres

## 📁 execution-sandbox/ (3 compétences - Tests Isolés)
📄 `local-runner.md`            # Environnement d'exécution sécurisé • prévient les commandes d'hôte destructrices
📄 `test-matrix.md`             # Mappe le code généré aux tests unitaires et d'intégration requis
📄 `timeout-guard.md`           # Tue les boucles infinies ou les threads d'exécution suspendus

## 📁 feedback-evaluator/ (4 compétences - L'« Auto-Correction »)
📄 `linter-parser.md`           # Consomme les sorties ESLint/Ruff • mappe les erreurs de syntaxe aux lignes spécifiques
📄 `stack-trace-analyzer.md`    # Lit les journaux d'échecs d'exécution • isole le point exact d'échec
📄 `diff-proposer.md`           # Génère des modifications de code atomiques et chirurgicales au lieu de réécrire l'ensemble du fichier
📄 `iteration-limiter.md`       # Limite ferme sur les tentatives de nouvelle tentative (par exemple, max 5 boucles) avant escalade humaine

## 📁 deployment-sync/ (3 compétences - Remise)
📄 `format-enforcer.md`         # Passage de formatage final Prettier/Black
📄 `coverage-validator.md`      # Assure que le code final répond au seuil de couverture de test 85%+
📄 `github-final-sync.md`       # Commit automatisé et création de PR dans vos repos finaux Github

---
**Fichiers de Configuration**
⚙️ `tox.ini`                    # Configurations d'environnement de test standardisées
📦 `pyproject.toml`             # Dépendances de projet principales et exigences du système de compilation

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
