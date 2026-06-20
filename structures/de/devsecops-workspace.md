# 📂 DevSecOps Workspace
> Der kanonische Arbeitsbereich für einen Security Engineer oder DevSecOps Lead, entwickelt, um Bedrohungsmodellierung zu automatisieren, Sicherheitslücken zu priorisieren und Zero-Trust-Richtlinien durchzusetzen, ohne die Engineering-Pipeline zu verlangsamen.

📄 `security-charter.md`       # Kanonisches Briefing: Zero-Trust-Prinzipien, Datenklassifizierungsmatrix und akzeptable Risikoschwellen
🧠 `active-audits-memory.md`   # Sitzungsgedächtnis: Dynamische Kontextverfolgung für laufende Penetrationstests und aktive CVE-Minderungen
🤖 `CLAUDE.md`                 # Betriebsregeln: Strikte Anweisungen, NIEMALS unverschlüsselte Geheimnisse, hardcodierte Anmeldedaten oder RBAC-Bypass auszugeben

## 📁 threat-modeling/ (4 Skills - Proaktive Verteidigung)
📄 `stride-analyzer.md`        # Framework für die Zuordnung von Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service und Elevation of Privilege
📄 `attack-tree-builder.md`    # Generiert visuelle Pfade, die ein Angreifer möglicherweise einschlägt, um einen bestimmten Microservice zu kompromittieren
📄 `secure-design-reviewer.md` # Analysiert PRDs und Architekturdiagramme, um Sicherheitsmängel zu erkennen, bevor Code überhaupt geschrieben wird
📄 `red-team-scenarios.md`     # Entwirft spezifische Sicherheitsverletzungssimulationen für Engineering-Tabletop-Übungen

## 📁 vulnerability-management/ (3 Skills - AppSec)
📄 `cve-triage-bot.md`         # Filtert rauschende Dependabot/Snyk-Warnungen und priorisiert Fixes basierend auf Ausnutzbarkeit (EPSS) und geschäftlichem Kontext
📄 `sast-dast-orchestrator.md` # CI/CD-Regeln für Static und Dynamic Application Security Testing (z.B. SonarQube, OWASP ZAP)
📄 `patch-management-sla.md`   # Verfolgt Mitigationsfristen (z.B. Kritisch = 24h, Hoch = 7 Tage) und eskaliert verletzte SLAs

## 📁 infrastructure-security/ (3 Skills - CloudSec)
📄 `iam-policy-generator.md`   # Gerüst für IAM-Richtlinien mit Mindestrechten für AWS/GCP, vollständig vermeidend `"*"` Ressourcenzugriff
📄 `cspm-auditor.md`           # Cloud Security Posture Management • kennzeichnet öffentliche S3-Buckets, offene Port 22 und unverschlüsselte RDS-Instanzen
📄 `secret-rotation-engine.md` # Workflows für sichere Rotation von API-Schlüsseln und Datenbankanmeldedaten über HashiCorp Vault oder AWS Secrets Manager

## 📁 incident-response/ (4 Skills - Brandbekämpfung & Forensik)
📄 `breach-playbook.md`        # Schritt-für-Schritt-Eindämmungsanweisungen für bestimmte Szenarien (z.B. Ransomware, Insider Threat, Credential Stuffing)
📄 `forensics-log-parser.md`   # Analysiert CloudTrail und VPC Flow Logs, um die genaue Seitenwärtsbewegung eines Angreifers nachzuverfolgung
📄 `ioc-extractor.md`          # Extrahiert Indikatoren für Kompromittierung (IPs, Datei-Hashes, Domains) aus Bedrohungsintelligenzberichten
📄 `post-mortem-generator.md`  # Entwirft die schuldlose Incident-Review und Root-Cause-Analyse nach einem Sicherheitsereignis

## 📁 compliance-and-audit/ (3 Skills - Governance)
📄 `soc2-evidence-collector.md`# Automatisiert die Erfassung von Hintergrundprüfungslogs, Zugriffsbewertungen und Penetrationstestzusammenfassungen für externe Prüfer
📄 `gdpr-anonymizer.md`        # Skripte zur Sicherstellung, dass PII (Persönlich identifizierbare Informationen) aus Staging-Datenbanken entfernt wird
📄 `github-final-sync.md`      # CI/CD-Aktion zum Commit von gehärteten Konfigurationsvorlagen und bereinigten Bedrohungsmodellen zu Github-Abschluss-Repositories

---
**Konfigurationsdateien**
⚙️ `semgrep-rules.yaml`        # Benutzerdefinierte statische Analyseregeln, speziell auf den Tech-Stack des Unternehmens zugeschnitten
📦 `opa-policies.rego`         # Open Policy Agent-Regeln, die Infrastruktur-Compliance auf Kubernetes/Terraform-Ebene durchsetzen
