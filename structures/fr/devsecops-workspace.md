# 📂 Espace de travail DevSecOps
> L'espace de travail canonique pour un Ingénieur Sécurité ou responsable DevSecOps, conçu pour automatiser la modélisation des menaces, le tri des vulnérabilités et l'application de politiques zéro-confiance sans ralentir le pipeline d'ingénierie.

📄 `security-charter.md`       # Résumé canonique : principes zéro-confiance, matrice de classification des données et seuils de risque acceptables
🧠 `active-audits-memory.md`   # Mémoire de session : suivi du contexte dynamique pour les tests de pénétration actifs et les atténuations CVE
🤖 `CLAUDE.md`                 # Règles de fonctionnement : instructions strictes pour JAMAIS sortir de secrets non chiffrés, identifiants en dur ou contourner les contrôles RBAC

## 📁 threat-modeling/ (4 compétences - Défense Proactive)
📄 `stride-analyzer.md`        # Framework pour mapper Spoofing, Tampering, Repudiation, Divulgation d'Informations, Déni de Service et Élévation de Privilèges
📄 `attack-tree-builder.md`    # Génère les chemins visuels qu'un adversaire pourrait emprunter pour compromettre un microservice spécifique
📄 `secure-design-reviewer.md` # Analyse les PRD et diagrammes d'architecture pour signaler les failles de sécurité avant même que le code soit écrit
📄 `red-team-scenarios.md`     # Élabore des simulations de brèche spécifiques pour les exercices de table ronde d'ingénierie

## 📁 vulnerability-management/ (3 compétences - AppSec)
📄 `cve-triage-bot.md`         # Filtre les alertes bruyantes Dependabot/Snyk, priorise les corrections en fonction de l'exploitabilité (EPSS) et du contexte métier
📄 `sast-dast-orchestrator.md` # Règles CI/CD pour les tests de sécurité statiques et dynamiques (ex : SonarQube, OWASP ZAP)
📄 `patch-management-sla.md`   # Suit les délais de mitigation (ex : Critique = 24h, Élevé = 7 jours) et remonte les SLA dépassés

## 📁 infrastructure-security/ (3 compétences - CloudSec)
📄 `iam-policy-generator.md`   # Scaffolds les politiques AWS IAM/GCP avec le minimum de privilèges, évitant complètement l'accès aux ressources `"*"`
📄 `cspm-auditor.md`           # Cloud Security Posture Management • signale les buckets S3 publics, le port 22 ouvert et les instances RDS non chiffrées
📄 `secret-rotation-engine.md` # Workflows pour faire pivoter de façon sécurisée les clés API et identifiants de base de données via HashiCorp Vault ou AWS Secrets Manager

## 📁 incident-response/ (4 compétences - Lutte contre les incendies & Forensique)
📄 `breach-playbook.md`        # Instructions d'isolement étape par étape pour des scénarios spécifiques (ex : Ransomware, Menace Interne, Credential Stuffing)
📄 `forensics-log-parser.md`   # Analyse CloudTrail et VPC Flow Logs pour tracer le mouvement latéral exact d'un attaquant
📄 `ioc-extractor.md`          # Extrait les Indicateurs de Compromission (IP, hachés de fichiers, domaines) à partir de rapports de renseignement sur les menaces
📄 `post-mortem-generator.md`  # Élabore l'examen d'incident sans culpabilité et l'analyse des causes racines après un événement de sécurité

## 📁 compliance-and-audit/ (3 compétences - Gouvernance)
📄 `soc2-evidence-collector.md`# Automatise la collecte des journaux de vérification antécédents, révisions d'accès et résumés de tests de pénétration pour les auditeurs externes
📄 `gdpr-anonymizer.md`        # Scripts pour assurer que les PII (Informations d'Identification Personnelle) sont supprimées des bases de données de staging
📄 `github-final-sync.md`      # Action CI/CD pour commit les modèles de configuration renforcée et les modèles de menace assainis aux dépôts finaux Github

---
**Fichiers de Configuration**
⚙️ `semgrep-rules.yaml`        # Règles d'analyse statique personnalisées spécifiquement adaptées à la pile technologique de l'entreprise
📦 `opa-policies.rego`         # Règles Open Policy Agent appliquant la conformité de l'infrastructure au niveau Kubernetes/Terraform

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
