# 📂 Ingestion Vectorielle en Temps Réel
> L'espace de travail canonique pour un pipeline d'ingestion RAG en temps réel, utilisant Kafka et Pinecone pour traiter et intégrer les mises à jour de documents en continu avec une latence inférieure à la seconde.

📄 `streaming-architecture-brief.md` # Résumé canonique : partitionnement des sujets Kafka, mise à l'échelle des groupes de consommateurs et dimensions vectorielles
🧠 `memory.md`                       # Mémoire de session : contexte dynamique pour le suivi actif du décalage des consommateurs
🤖 `CLAUDE.md`                       # Règles de fonctionnement : instructions strictes pour traiter avec grâce les charges JSON malformées

## 📁 stream-consumers/ (4 compétences - Ingestion Kafka)
📄 `topic-subscriber.md`             # Gère les connexions aux sujets Kafka/Redpanda à haut débit
📄 `offset-committer.md`             # Assure un traitement exactement une fois • évite de réintégrer le même document au redémarrage
📄 `dead-letter-router.md`           # Capture les messages corrompus et les achemine vers un compartiment sécurisé pour examen humain
📄 `schema-validator.md`             # Applique les schémas Protobuf/Avro stricts avant d'autoriser les données dans le pipeline

## 📁 transformation-layer/ (3 compétences - Traitement en Temps Réel)
📄 `streaming-chunker.md`            # Divise les flux de texte entrants en segments prêts pour les vecteurs à la volée
📄 `metadata-enricher.md`            # Ajoute l'horodatage, l'ID source et l'auteur à chaque segment pour le filtrage en aval
📄 `embedding-generator.md`          # Appelant asynchrone par lots pour les API d'intégration OpenAI/Cohere • maximise le débit

## 📁 vector-sync/ (3 compétences - Écritures dans la Base de Données)
📄 `pinecone-upserter.md`            # Traite les upserts en masse vers la base de données vectorielle • optimise les appels réseau
📄 `collision-handler.md`            # Déduplication sauvegardée par Redis • réécrit les segments obsolètes si un document a été mis à jour
📄 `index-optimizer.md`              # Déclenche des fusions de fond périodiques pour maintenir une faible latence de recherche vectorielle

## 📁 fallback-mechanisms/ (3 compétences - Tolérance aux Pannes)
📄 `retry-jitter.md`                 # Backoff exponentiel pour les limites de débit des API d'intégration (erreurs 429)
📄 `circuit-breaker.md`              # Pause la consommation de Kafka si la base de données vectorielle tombe en panne
📄 `spooling-cache.md`               # Écrit temporairement sur le disque local si la sortie réseau échoue complètement

## 📁 observability/ (3 compétences - Santé du Pipeline)
📄 `throughput-monitor.md`           # Suit les messages par seconde (MPS) et la latence d'intégration
📄 `lag-detector.md`                 # Alerte Slack si les groupes de consommateurs prennent du retard sur le producteur Kafka
📄 `github-final-sync.md`            # Commits automatisés des mises à jour de schéma et des configurations de pipeline vers les repos final Github

---
**Fichiers de Configuration**
⚙️ `docker-compose.yml`              # Cluster local Kafka, Zookeeper et Redis
📦 `go.mod`                          # Dépendances Go (la concurrence est critique pour le débit de la diffusion)
