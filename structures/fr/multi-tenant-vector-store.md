# 📂 Magasin de Vecteurs Multi-Locataires
> L'espace de travail canonique pour une base de données de vecteurs RAG hautement sécurisée et multi-locataire, où l'isolement des données d'entreprise est mathématiquement garanti au niveau des requêtes.

📄 `tenant-architecture-brief.md` # Résumé canonique : Définit le routage des espaces de noms, les schémas de métadonnées et la sécurité au niveau des lignes (RLS) pour les vecteurs
🧠 `memory.md`                    # Mémoire de session : Suivi du contexte pour les pipelines d'ingestion de locataires actifs
🤖 `CLAUDE.md`                    # Règles de fonctionnement : Instructions strictes pour NE JAMAIS écrire de requêtes sans un filtre `tenant_id` codé en dur

## 📁 identity-gateway/ (4 compétences - Authentification et routage)
📄 `jwt-decoder.md`               # Analyse les demandes entrantes pour extraire l'immuable `tenant_id` et le `user_role`
📄 `namespace-allocator.md`       # Mappe les grands clients d'entreprise aux espaces de noms d'index physiques dédiés (par exemple, espaces de noms Pinecone)
📄 `rate-limiter.md`              # Prévient les problèmes de voisin bruyant • plafonner le débit de l'API par locataire
📄 `zero-trust-middleware.md`     # Rejette toute charge de vecteurs manquant des métadonnées de propriété explicites du locataire

## 📁 ingestion-api/ (3 compétences - Téléchargements sécurisés de données)
📄 `tenant-aware-chunker.md`      # Divise les documents tout en ajoutant de force le `tenant_id` aux métadonnées de chaque morceau
📄 `embedding-proxy.md`           # Regroupe les textes vers OpenAI/Cohere tout en suivant les coûts des jetons jusqu'au locataire spécifique
📄 `data-retention-manager.md`    # Travail cron automatisé pour supprimer définitivement les morceaux de vecteurs lorsqu'un locataire annule son abonnement (conformité RGPD)

## 📁 search-gateway/ (4 compétences - Récupération isolée)
📄 `query-rewriter.md`            # Prend la question en langage naturel de l'utilisateur et la formate pour la recherche de vecteurs
📄 `filter-enforcer.md`           # CRITIQUE : Injecte automatiquement `{ "tenant_id": { "$eq": current_tenant } }` dans CHAQUE filtre de recherche avant l'exécution
📄 `hybrid-search-router.md`      # Fusionne la recherche de vecteurs denses avec la recherche par mots-clés BM25, strictement délimitée aux données du locataire
📄 `cross-encoder-reranker.md`    # Réévalue les 20 meilleurs résultats isolés pour assurer la plus haute précision pour l'LLM

## 📁 compliance-auditing/ (3 compétences - Journalisation de sécurité)
📄 `access-ledger.md`             # Journalisation immuable de précisément quel utilisateur a interrogé quels vecteurs
📄 `breach-detector.md`           # Scan heuristique nocturne garantissant qu'aucun morceau dans l'espace de noms du locataire A n'a les métadonnées du locataire B
📄 `soc2-report-generator.md`     # Compile les preuves automatisées de la ségrégation des données pour les examens de sécurité d'entreprise

## 📁 infrastructure/ (3 compétences - Déploiement)
📄 `vector-db-connector.md`       # Groupement de connexions pour Qdrant/Pinecone/Milvus
📄 `disaster-recovery.md`         # Capture instantanée de la base de données de vecteurs à un moment précis
📄 `github-final-sync.md`         # Engagements automatisés des définitions de schéma mises à jour vers les référentiels final Github

---
**Fichiers de configuration**
⚙️ `qdrant-schema.json`           # Définit la structure de charge exacte, garantissant que `tenant_id` est un index requis
📦 `package.json`                 # Dépendances Node/TypeScript (LangChain, SDK de base de données de vecteurs, utilitaires JWT)
