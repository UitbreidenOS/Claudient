---
description: Construire un pipeline RAG prêt pour la production pour une source de données et une stack donnée
argument-hint: "[description de la source de données et stack préférée]"
---
Vous concevez un pipeline de génération augmentée par récupération basé sur: $ARGUMENTS

Si aucune préférence de stack n'est donnée, utiliser par défaut: Python, LangChain, pgvector (PostgreSQL), `claude-sonnet-4-6` pour la génération, `text-embedding-3-small` via OpenAI pour les embeddings (remplacer par Voyage AI si l'utilisateur spécifie Anthropic uniquement).

**Étape 1 — Comprendre les données**

Identifier à partir de $ARGUMENTS:
- Type de source: PDFs, pages web, lignes de base de données, fichiers de code, Notion/Confluence, e-mails, ou mixte
- Fréquence de mise à jour: corpus statique, ajout seul, ou fréquemment modifié
- Estimation de taille: <1 k documents, 1 k–100 k, ou 100 k+
- Sensibilité: PII présent? Isolation air-gapped requise?

Énoncer explicitement vos hypothèses si elles ne sont pas données.

**Étape 2 — Choisir une stratégie de chunking**

Sélectionner et justifier une:
- Taille fixe avec chevauchement (rapide, baseline)
- Sémantique / fenêtre de phrases (meilleure cohérence pour la prose)
- Fractionnement récursif par caractère selon la structure du document (code, markdown)
- Extracteur de document parent (récupérer petit chunk, retourner contexte parent)

Montrer la configuration exacte du chunker: `chunk_size`, `chunk_overlap`, liste de séparateurs.

**Étape 3 — Générer le pipeline d'ingestion**

Écrire un script Python (`ingest.py`) qui:
- Charge les documents à partir du type de source identifié ci-dessus
- Nettoie et normalise le texte (supprime les éléments répétitifs, normalise l'espace blanc, gère l'encodage)
- Divise les documents avec la stratégie choisie
- Incorpore les chunks par lots (max 512 par appel API)
- Effectue un upsert dans le magasin vectoriel avec métadonnées: `source`, `chunk_index`, `ingested_at`
- Est idempotent — réexécuter sur des documents inchangés ne réintègre pas

**Étape 4 — Générer la chaîne de récupération + génération**

Écrire un module Python (`rag_chain.py`) qui:
- Accepte une chaîne de requête utilisateur
- Incorpore la requête et récupère les chunks top-K (K=5 par défaut) avec reclassement MMR
- Construit un invite système qui instruit le modèle à répondre uniquement à partir du contexte récupéré et à citer les sources par le champ de métadonnées `source`
- Appelle `claude-sonnet-4-6` avec mise en cache des prompts sur le bloc de contexte (utiliser `cache_control: {"type": "ephemeral"}` sur les messages de contexte)
- Retourne: `{"answer": str, "sources": list[str], "tokens_used": int}`

**Étape 5 — Liste de contrôle opérationnelle**

Énumérer comme des cases à cocher:
- [ ] Stratégie de fraîcheur d'index (réingestion programmée vs. déclencheur webhook)
- [ ] Épinglage de version du modèle d'embedding
- [ ] Métriques de qualité de récupération à suivre (MRR, recall@K)
- [ ] Secours lorsque la confiance de récupération est faible
- [ ] Suppression PII si applicable

Sortie: `ingest.py`, `rag_chain.py`, liste de contrôle opérationnelle. Pas de stubs.
