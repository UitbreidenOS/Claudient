# 📂 Agent Vision Multimodal
> L'espace de travail en production canonique pour un agent vision autonome capable d'analyser des PDFs denses, d'extraire des tableaux complexes et de raisonner sur des mises en page non structurées.

📄 `vision-pipeline-brief.md` # Synthèse canonique : Règles d'analyse de mise en page, logique OCR de secours et stratégies de segmentation
🧠 `memory.md`                # Mémoire de session : Contexte dynamique pour le suivi de documents multi-pages
🤖 `CLAUDE.md`                # Règles d'exploitation : Instructions strictes pour préserver les relations spatiales dans le texte extrait

## 📁 ingestion-engine/ (5 compétences - Prétraitement de documents)
📄 `format-normalizer.md`     # Convertit diverses entrées (PDF, TIFF, HEIC) en PNGs de résolution standard
📄 `layout-analyzer.md`       # Détection de boîtes englobantes • sépare les blocs de texte, tableaux et images
📄 `image-enhancer.md`        # Ajustement du contraste • préserve les couleurs d'origine des actifs critiques (graphiques/peintures)
📄 `pii-redactor.md`          # Liste de blocage visuelle • floute les champs sensibles avant la transmission de l'API LLM
📄 `chunking-router.md`       # Divise les PDFs de 100 pages en lots de traitement parallèle

## 📁 vision-workers/ (4 personas d'agent - Les Extracteurs)
📄 `ocr-specialist.md`        # Extraction de texte haute précision pour les scans denses et de faible qualité
📄 `table-parser.md`          # Reconstruction de grille • produit Markdown ou JSON structurel brut
📄 `chart-reasoner.md`        # QA visuel • extrait les tendances et points de données des graphiques
📄 `signature-verifier.md`    # Détecte la présence et l'alignement spatial des signatures manuscrites

## 📁 data-normalization/ (3 compétences - Structuration de sortie)
📄 `json-schema-enforcer.md`  # Valide les données extraites par rapport aux modèles Pydantic stricts
📄 `confidence-scorer.md`     # Signale les extractions à faible confiance pour l'examen humain en boucle
📄 `spatial-reconstructor.md` # Fusionne les chunks indépendants en un ordre de lecture cohésif

## 📁 export-pipeline/ (3 compétences - Synchronisation en aval)
📄 `database-commit.md`       # Insère JSON structuré dans Postgres/MongoDB
📄 `vector-embedding.md`      # Envoie le texte traité au magasin vectoriel du pipeline RAG
📄 `github-final-sync.md`     # Commits automatisés des ensembles de données validés dans les dépôts finaux GitHub

## 📁 evals/ (3 compétences - Benchmarking du pipeline)
📄 `extraction-accuracy.md`   # Comparaison à la vérité terrain par rapport aux documents de test connus
📄 `cost-optimizer.md`        # Suivi des dépenses de tokens et de tuiles d'images par document
📄 `hallucination-check.md`   # Vérifie que l'agent n'a pas « inventé » de données non présentes dans l'image

---
**Fichiers de configuration**
⚙️ `docker-compose.yml`       # Configuration des nœuds worker et de la file d'attente Redis
📦 `requirements.txt`         # Dépendances (PyMuPDF, OpenCV, Anthropic SDK)
