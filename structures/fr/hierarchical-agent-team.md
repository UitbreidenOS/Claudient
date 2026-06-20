# 📂 Équipe d'Agents Hiérarchisée
> L'espace de travail canonique pour une architecture d'agent Superviseur-Travailleur, où un gestionnaire LLM délègue des sous-tâches à des nœuds de travail spécialisés et synthétise leurs résultats.

📄 `team-charter-brief.md`    # Dossier canonique : Objectif global de l'équipe et définition de la réussite
🧠 `global-memory.md`         # Mémoire de session : Tableau blanc partagé pour que le superviseur suive la progression globale
🤖 `CLAUDE.md`                # Règles de fonctionnement : Instructions strictes pour le superviseur afin d'éviter de faire le travail lui-même

## 📁 supervisor-node/ (5 compétences - Le Gestionnaire)
📄 `task-decomposer.md`       # Décompose les demandes complexes des utilisateurs en sous-tâches atomiques et indépendantes
📄 `worker-router.md`         # Mappe les sous-tâches au persona de travailleur spécialisé correct
📄 `dependency-grapher.md`    # Détermine l'ordre d'exécution (par exemple, l'analyste de données doit terminer avant que le rédacteur de rapport ne commence)
📄 `quality-reviewer.md`      # Évalue les résultats des travailleurs par rapport aux critères de la requête initiale
📄 `synthesis-engine.md`      # Combine les résultats des travailleurs approuvés en une seule réponse finale cohérente

## 📁 specialized-workers/ (4 personas d'agents - L'Équipe)
📄 `researcher-agent.md`      # Capacité de recherche approfondie • scraping web et requêtes RAG
📄 `analyst-agent.md`         # Traitement des données • sandbox d'exécution Python/Pandas
📄 `writer-agent.md`          # Formatage du contenu • applique les directives de ton et de marque
📄 `qa-tester-agent.md`       # Validation du code ou de la logique • tente de casser les résultats des autres travailleurs

## 📁 communication-bus/ (3 compétences - Passage de Messages)
📄 `message-broker.md`        # Gère les charges utiles JSON asynchrones entre le superviseur et les travailleurs
📄 `context-culling.md`       # Évite d'envoyer la mémoire globale entière à un travailleur • n'envoie que la portée pertinente
📄 `escalation-protocol.md`   # Comment un travailleur signale le superviseur si une tâche est impossible ou bloquée

## 📁 state-management/ (3 compétences - Points de Contrôle)
📄 `redis-task-queue.md`      # Suit les sous-tâches en attente, en cours et terminées
📄 `dead-letter-queue.md`     # Capture les exécutions de travailleur échouées pour examen humain ou relance par le superviseur
📄 `github-final-sync.md`     # Commits automatisés de la sortie finale synthétisée vers les dépôts finaux de Github

## 📁 team-evals/ (3 compétences - Métriques de Performance)
📄 `delegation-accuracy.md`   # Le superviseur a-t-il choisi le bon travailleur pour le travail ?
📄 `worker-latency.md`        # Suit combien de temps chaque persona met à retourner une charge utile
📄 `token-spend-tracker.md`   # Agrège les coûts des API LLM dans toute la hiérarchie

---
**Fichiers de Configuration**
⚙️ `langgraph-config.yaml`    # Définition de l'état du graphique mappant les nœuds (superviseur) et les arêtes (travailleurs)
📦 `pyproject.toml`           # Dépendances Python et exigences de construction
