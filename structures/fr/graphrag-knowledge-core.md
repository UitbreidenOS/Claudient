# 📂 GraphRAG Knowledge Core

> L'espace de travail canonique pour un pipeline GraphRAG, extrayant les entités et les relations pour construire un graphe de connaissances Neo4j pour un raisonnement complexe et multi-sauts.

📄 `graph-architecture-brief.md` # Mémoire canonique : Définit les règles d'ontologie, les étiquettes de nœud et les types de relations
🧠 `memory.md`                   # Mémoire de session : Suivi du contexte dynamique pour la session active d'extraction d'entités
🤖 `CLAUDE.md`                   # Règles d'exploitation : Instructions strictes pour générer des requêtes Cypher valides

## 📁 ingestion-pipeline/ (4 compétences - Non structuré vers Graphe)
📄 `document-chunker.md`         # Segmentation de texte optimisée pour l'extraction d'entités plutôt que la recherche vectorielle
📄 `entity-extractor.md`         # Pipeline LLM • identifie les noms, organisations et personnes essentiels
📄 `relationship-mapper.md`      # Définit les arêtes sémantiques entre les entités extraites (par exemple, "WORKS_FOR", "OWNS")
📄 `ontology-enforcer.md`        # Prévient les nœuds en double • mappe "Anthropic" et "Anthropic PBC" vers le même ID d'entité

## 📁 graph-database/ (3 compétences - Synchronisation Neo4j)
📄 `neo4j-connector.md`          # Authentification sécurisée et mise en pool des connexions pour la base de données graphe
📄 `batch-committer.md`          # Regroupe les mutations graphe en transactions en bloc pour éviter les verrous de base de données
📄 `index-manager.md`            # Génère automatiquement des indices texte intégral et vectoriels sur les propriétés de nœud pour une récupération rapide

## 📁 retrieval-engine/ (4 compétences - Génération de Requêtes)
📄 `intent-classifier.md`        # Détermine si la question de l'utilisateur nécessite une recherche vectorielle ou une traversée graphe multi-sauts
📄 `cypher-generator.md`         # Traduit les questions en langage naturel en requêtes Cypher Neo4j hautement optimisées
📄 `schema-injector.md`          # Transmet le schéma du graphe au LLM afin qu'il sache exactement quelles relations sont disponibles
📄 `fallback-vector-search.md`   # Déclenche la RAG standard si la requête Cypher ne retourne rien

## 📁 synthesis-layer/ (3 compétences - Formatage des Réponses)
📄 `graph-context-formatter.md`  # Traduit les chemins graphe JSON bruts en contexte lisible pour le LLM
📄 `multi-hop-reasoner.md`       # Synthétise les réponses qui s'étendent sur 3+ degrés de séparation dans le graphe
📄 `github-final-sync.md`        # Commits automatisés des définitions d'ontologie mises à jour vers les dépôts Github finaux

## 📁 telemetry-evals/ (3 compétences - Santé du Graphe)
📄 `orphan-node-detector.md`     # Trouve et nettoie les entités qui n'ont aucune relation connectée
📄 `extraction-cost-tracker.md`  # Surveille la consommation de jetons des pipelines d'extraction d'entités lourds
📄 `cypher-error-logger.md`      # Suit les échecs de syntaxe dans les requêtes graphe générées par LLM pour l'ajustement fin

---
**Fichiers de Configuration**
⚙️ `docker-compose.yml`          # Instance APOC Neo4j locale et déploiements de nœuds de travail
📦 `requirements.txt`            # Dépendances du pilote Neo4j, LangChain Graph et Anthropic SDK
