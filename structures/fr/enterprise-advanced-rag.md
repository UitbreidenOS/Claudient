# 📂 Enterprise Advanced RAG
> L'espace de travail canonique pour un pipeline de génération augmentée par la récupération (RAG) de niveau production utilisant la recherche hybride, le chunking parent-enfant et la reclassification par cross-encoder.

📄 `rag-architecture-brief.md`  # Brief canonique : Poids de recherche (mot-clé vs sémantique) et limites de chunking
🧠 `memory.md`                  # Mémoire de session : Suivi du contexte dynamique pour la session de récupération active
🤖 `CLAUDE.md`                  # Règles d'exploitation : Instructions strictes pour l'LLM afin de citer uniquement le contexte récupéré

## 📁 ingestion-pipeline/ (4 compétences - Prétraitement des données)
📄 `document-parser.md`         # Ingestion multi-formats • gère les PDF, Markdown et texte brut
📄 `metadata-extractor.md`      # Marque automatiquement les chunks avec l'auteur, la date et le domaine source pour le pré-filtrage
📄 `pii-scrubber.md`            # Supprime les informations sensibles avant d'envoyer au modèle d'embedding
📄 `vector-sync.md`             # Pousse les documents traités vers les bases de données Pinecone/Milvus

## 📁 chunking-strategies/ (3 compétences - Segmentation de contexte)
📄 `semantic-splitter.md`       # Divise les documents naturellement aux limites des paragraphes ou des en-têtes
📄 `parent-child-linker.md`     # Crée de petits chunks enfants pour une recherche précise, liés à des chunks parents plus grands pour le contexte LLM complet
📄 `table-preserver.md`         # Garantit que les tableaux markdown ne sont pas divisés horizontalement entre différents chunks

## 📁 retrieval-engine/ (4 compétences - Le cœur de la recherche)
📄 `query-expander.md`          # Étape de pré-traitement LLM • génère 3 variations de la requête de l'utilisateur pour améliorer les taux de réussite
📄 `hybrid-search.md`           # Combine la recherche vectorielle dense (embeddings) avec la recherche sparse (BM25 mot-clé)
📄 `cross-encoder-reranker.md`  # Passe les 20 premiers résultats via Cohere ReRank pour mettre en évidence les 5 premiers les plus pertinents
📄 `metadata-filter.md`         # Applique des contraintes dures (par exemple, « ne chercher que dans les documents de 2026 ») avant la correspondance vectorielle

## 📁 generation-layer/ (3 compétences - Synthèse)
📄 `context-injector.md`        # Formate les chunks récupérés au sommet proprement dans l'invite LLM
📄 `hallucination-guard.md`     # Invite d'auto-réflexion • force le modèle à vérifier sa réponse par rapport aux chunks fournis
📄 `citation-builder.md`        # Ajoute des liens source précis et des numéros de page à la sortie finale

## 📁 deployment-evals/ (3 compétences - Maintenance du pipeline)
📄 `ragas-evaluator.md`         # Métriques automatisées mesurant la précision du contexte et la pertinence des réponses
📄 `cache-invalidation.md`      # Efface les embeddings vectoriels obsolètes lorsque les documents source sont mis à jour
📄 `github-final-sync.md`       # Commit automatisé des configurations du pipeline et des scripts de test vers les dépôts finals de Github

---
**Fichiers de configuration**
⚙️ `docker-compose.yml`         # Déploiement local pour tester la base de données vectorielle et les microservices d'embedding
📦 `requirements.txt`           # Dépendances LangChain, LlamaIndex et modèle d'embedding
