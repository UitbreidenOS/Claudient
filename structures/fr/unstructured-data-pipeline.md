# 📂 Pipeline de Données Non Structurées

> L'espace de travail canonique pour un moteur d'ingestion automatisé et multi-modal qui normalise les fichiers audio, vidéo et PDF complexes en texte et métadonnées propres, prêts pour la vectorisation.

📄 `pipeline-architecture-brief.md` # Brief canonique : Définit les limites de taille de fichier, les types MIME supportés et les stratégies de chunking
🧠 `memory.md`                      # Mémoire de session : Suivi du contexte dynamique pour les tâches actives de traitement par lots à long terme
🤖 `CLAUDE.md`                      # Règles de fonctionnement : Instructions strictes pour arrêter le traitement en cas de corruption de fichier détectée

## 📁 audio-processing/ (4 compétences - Conversion Vocale en Texte)
📄 `format-converter.md`            # Wrapper FFmpeg • normalise .m4a, .ogg et .wav à 16kHz mono .mp3
📄 `vad-silence-stripper.md`        # Détection d'Activité Vocale • supprime les silences pour économiser les coûts d'API de transcription
📄 `whisperx-transcriber.md`        # Transcription haute vitesse • gère les horodatages au niveau des mots et l'alignement
📄 `speaker-diarization.md`         # Intégration Pyannote • mappe "Speaker A" et "Speaker B" avec précision dans la transcription

## 📁 video-processing/ (3 compétences - Extraction de Cadres et Audio)
📄 `audio-extractor.md`             # Découple la piste audio et l'achemine vers le pipeline `audio-processing`
📄 `keyframe-sampler.md`            # Extrait 1 cadre par changement de scène (avec OpenCV) pour l'analyse de la mise en page visuelle
📄 `on-screen-ocr.md`               # Analyse le texte des diapositives ou des partages d'écran intégrés dans la vidéo

## 📁 pdf-processing/ (4 compétences - Analyse Documentaire Complexe)
📄 `layout-analyzer.md`             # Détecte les colonnes et l'ordre de lecture pour que le texte ne soit pas écrasé horizontalement
📄 `table-extractor.md`             # Préserve les structures en grille des rapports financiers en Markdown/JSON brut
📄 `ocr-fallback.md`                # Achemine automatiquement les PDF numérisés (non sélectionnables) vers Tesseract/AWS Textract
📄 `image-asset-saver.md`           # Isole les graphiques et diagrammes intégrés, les enregistre sur S3 avec des liens de référence

## 📁 unified-export/ (3 compétences - Normalisation en Aval)
📄 `schema-enforcer.md`             # Enveloppe tous les résultats (vidéo, audio ou PDF) dans une structure JSON unique et unifiée
📄 `metadata-tagger.md`             # Ajoute l'URL source, la durée/nombre de pages et l'horodatage du traitement
📄 `vector-db-router.md`            # Pousse les chunks normalisés vers Pinecone/Qdrant pour l'ingestion RAG

## 📁 infrastructure-ops/ (3 compétences - Mise à l'Échelle et Synchronisation)
📄 `s3-event-listener.md`           # Déclencheur AWS Lambda • démarre automatiquement le traitement quand un fichier arrive dans le bucket
📄 `gpu-queue-manager.md`           # Pool de travailleurs RabbitMQ/Celery acheminant les tâches lourdes vers les instances GPU Nvidia
📄 `github-final-sync.md`           # Commits automatisés des logs de traitement et des mises à jour du pipeline vers les repos finaux Github

---
**Fichiers de Configuration**
⚙️ `docker-compose.gpu.yml`         # Configuration pour les travailleurs de traitement locaux avec CUDA activé
📦 `requirements.txt`               # FFmpeg-python, PyMuPDF, WhisperX et dépendances OpenCV

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
