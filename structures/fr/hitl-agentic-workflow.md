# 📂 Flux de travail agent HITL

> L'espace de travail canonique pour un moteur d'orchestration Human-in-the-Loop (HITL), conçu pour interrompre l'exécution autonome et permettre l'approbation manuelle humaine sur les actions à enjeux élevés.

📄 `workflow-brief.md`        # Mémrandum canonique : définit les actions spécifiques nécessitant une approbation humaine (par exemple, paiements, e-mails sortants)
🧠 `memory.md`                # Mémoire de session : contexte dynamique du flux de travail menant à l'état de pause
🤖 `CLAUDE.md`                # Règles de fonctionnement : instructions strictes sur la façon de formater les charges utiles pour examen humain

## 📁 workflow-orchestrator/ (4 compétences - Moteur d'exécution)
📄 `task-router.md`           # Chemins d'exécution autonome standard
📄 `pause-handler.md`         # Logique de mise en checkpoint • suspend l'état de l'agent en toute sécurité sans perdre de données
📄 `resume-trigger.md`        # Crochet de réactivation • réveille l'agent une fois le webhook d'approbation humaine reçu
📄 `timeout-abort.md`         # Dégradation élégante si l'humain ne répond pas dans les 24 heures

## 📁 human-approval-gateway/ (3 compétences - L'interface)
📄 `approval-queue.md`        # Gère la liste des tâches en attente pour l'opérateur humain
📄 `payload-formatter.md`     # Résume l'action prévue de l'agent en une différence lisible et propre pour l'humain
📄 `override-protocols.md`    # Permet à l'humain de modifier l'action proposée par l'agent avant d'approuver

## 📁 notification-engine/ (3 compétences - Alertes)
📄 `slack-alerts.md`          # Ping d'un canal dédié #agent-approvals avec un bloc interactif
📄 `websocket-broadcaster.md` # Envoie les alertes en temps réel à un tableau de bord frontal Next.js/React
📄 `escalation-router.md`     # Ping des opérateurs secondaires si l'humain principal est hors ligne

## 📁 state-resumption/ (3 compétences - Synchronisation de mémoire)
📄 `memory-rehydration.md`    # Recharge le contexte de l'agent parfaitement à la réactivation
📄 `redis-state-lock.md`      # Verrou distribué empêchant les approbations en double sur la même tâche
📄 `context-pruner.md`        # Nettoie les tokens inutiles avant de redémarrer l'exécution

## 📁 audit-logs/ (Enregistrements immuables)
📄 `decision-ledger.log`      # Suive précisément quel humain a approuvé quelle action d'agent et quand
📄 `rejection-analyzer.md`    # Collecte des données sur la *raison* pour laquelle les humains rejettent les actions pour améliorer l'agent ultérieurement

---
**Fichiers de configuration**
⚙️ `temporal-config.yaml`     # Configuration pour Temporal.io ou moteurs de flux de travail avec état similaire
📦 `package.json`             # Écouteurs webhook et dépendances du SDK Slack
