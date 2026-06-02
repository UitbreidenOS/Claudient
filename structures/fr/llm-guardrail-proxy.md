# 📂 LLM Guardrail Proxy
> L'espace de travail canonique pour un proxy LLM de niveau entreprise qui intercepte, met en cache et audite tous les appels d'API AI sortants pour prévenir les coûts de tokens incontrôlés et appliquer la sécurité.

📄 `proxy-architecture-brief.md` # Brief canonique : Définit les limites globales de tokens, les seuils du cache sémantique et les règles de routage
🧠 `memory.md`                   # Mémoire de session : Suivi dynamique du contexte pour la latence actuelle du proxy et les pics actifs
🤖 `CLAUDE.md`                   # Règles opérationnelles : Instructions strictes sur la gestion des délais d'attente des API et la logique de secours

## 📁 traffic-interceptor/ (4 compétences - La Passerelle)
📄 `request-validator.md`        # Rejette les charges utiles mal formées avant qu'elles n'atteignent l'API LLM
📄 `rate-limiter.md`             # Applique les limites de tokens par minute (TPM) par utilisateur ou ID de locataire
📄 `pii-redactor.md`             # Supprime les données sensibles (numéros de sécurité sociale, e-mails) des invites avant la sortie
📄 `prompt-injection-guard.md`   # Vérifications heuristiques pour bloquer les tentatives adversariales de jailbreak

## 📁 cost-optimization/ (3 compétences - Gestion des Tokens)
📄 `semantic-cache.md`           # Recherche vectorielle soutenue par Redis • sert les réponses mises en cache pour des requêtes similaires sans frapper l'LLM
📄 `context-compressor.md`       # Résume ou tronque automatiquement les historiques de messages excessivement longs
📄 `model-downgrader.md`         # Route dynamiquement les requêtes simples vers Claude 3.5 Haiku pour économiser les coûts, réservant Sonnet pour le raisonnement complexe

## 📁 observability-engine/ (4 compétences - Analytiques)
📄 `token-ledger.md`             # Comptabilité de haute précision des tokens d'invites par rapport aux tokens de complétions par locataire
📄 `latency-tracker.md`          # Surveille le Temps-au-Premier-Token (TTFT) et le temps de génération total
📄 `error-classifier.md`         # Regroupe les défaillances d'API (ex : 429 Trop de Requêtes vs 500 Erreur Serveur Interne)
📄 `github-final-sync.md`        # Commits automatisés des journaux de conformité quotidiens et des configurations de proxy vers les repos final de Github

## 📁 fallback-orchestrator/ (3 compétences - Haute Disponibilité)
📄 `circuit-breaker.md`          # Arrête temporairement le trafic vers un fournisseur LLM spécifique si les taux d'échec augmentent
📄 `cross-region-router.md`      # Bascule vers différentes régions AWS Bedrock pour contourner les pannes locales
📄 `retry-jitter.md`             # Algorithmes de backoff exponentiel pour gérer les limites de débit en douceur

## 📁 evals/ (3 compétences - Benchmarking du Proxy)
📄 `cache-hit-ratio.md`          # Évalue le montant d'argent que le cache sémantique économise réellement
📄 `redaction-accuracy.md`       # Audite le rédacteur PII par rapport aux charges utiles sensibles fictives
📄 `overhead-latency.md`         # Assure que le proxy lui-même n'ajoute pas plus de 50ms de délai

---
**Fichiers de Configuration**
⚙️ `envoy.yaml`                  # Configurations du proxy de périphérie pour router le trafic haut débit
📦 `go.mod`                      # Dépendances Go pour la gestion concurrente des requêtes ultra-rapide

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
