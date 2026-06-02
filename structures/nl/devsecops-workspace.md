# 📂 DevSecOps-werkruimte
> De canonieke werkruimte voor een Beveiligingsingenieur of DevSecOps-leider, ontworpen om bedreigingsmodellering te automatiseren, kwetsbaarheden te triëren en zero-trust-beleid af te dwingen zonder de engineeringpijplijn te vertragen.

📄 `security-charter.md`       # Canonieke briefing: Zero-trust-principes, gegevensclassificatiematrix en aanvaardbare risicodrempels
🧠 `active-audits-memory.md`   # Sessigeheugen: Dynamisch contexttracking voor lopende penetratietests en actieve CVE-mitigaties
🤖 `CLAUDE.md`                 # Bedrijfsregels: Strikte instructies om NOOIT ongecodeerde geheimen, hardcoded-inloggegevens of omzeiling van RBAC-controles uit te voeren

## 📁 threat-modeling/ (4 vaardigheden - Proactieve verdediging)
📄 `stride-analyzer.md`        # Raamwerk voor het toewijzen van Spoofing, Tampering, Repudiation, Info Disclosure, Denial of Service en Elevation of Privilege
📄 `attack-tree-builder.md`    # Genereert visuele paden die een tegenstander zou kunnen nemen om een specifieke microservice in gevaar te brengen
📄 `secure-design-reviewer.md` # Parseert PRD's en architectuurdiagrammen om beveiligingsgebreken op te sporen voordat code zelfs maar geschreven is
📄 `red-team-scenarios.md`     # Stelt specifieke schendingssimulaties op voor engineeringtafelenoefeningen

## 📁 vulnerability-management/ (3 vaardigheden - AppSec)
📄 `cve-triage-bot.md`         # Filtert ruizende Dependabot/Snyk-waarschuwingen, prioriteert fixes op basis van exploiteerbaarheid (EPSS) en bedrijfscontext
📄 `sast-dast-orchestrator.md` # CI/CD-regels voor Static and Dynamic Application Security Testing (bijv. SonarQube, OWASP ZAP)
📄 `patch-management-sla.md`   # Volgt mitigatiedeadlines (bijv. Kritiek = 24u, Hoog = 7 dagen) en escalateert schendingen van SLA's

## 📁 infrastructure-security/ (3 vaardigheden - CloudSec)
📄 `iam-policy-generator.md`   # Bouwt least-privilege AWS IAM/GCP-beleidsregels op, vermijdt volledig `"*"` resourcetoegang
📄 `cspm-auditor.md`           # Cloud Security Posture Management • markeert openbare S3-buckets, open poort 22 en ongecodeerde RDS-instanties
📄 `secret-rotation-engine.md` # Workflows voor het veilig roteren van API-sleutels en databaseinloggegevens via HashiCorp Vault of AWS Secrets Manager

## 📁 incident-response/ (4 vaardigheden - Brandbestrijding & Forensische analyse)
📄 `breach-playbook.md`        # Stap-voor-stap restrictieve instructies voor specifieke scenario's (bijv. Ransomware, Insider Threat, Credential Stuffing)
📄 `forensics-log-parser.md`   # Analyzeert CloudTrail- en VPC Flow-logboeken om de exacte laterale beweging van een aanvaller na te gaan
📄 `ioc-extractor.md`          # Extraheert Indicators of Compromise (IP's, bestandshashes, domeinen) uit dreigingsintelligentrapporten
📄 `post-mortem-generator.md`  # Stelt de schuldloze incidentenreview en root-cause-analyse op na een beveiligingsgebeurtenis

## 📁 compliance-and-audit/ (3 vaardigheden - Bestuur)
📄 `soc2-evidence-collector.md`# Automatiseert het verzamelen van achtergrondgebruikslogboeken, toegangsbeoordelingen en samenvattingen van penetratietests voor externe auditors
📄 `gdpr-anonymizer.md`        # Scripts om ervoor te zorgen dat PII (Persoonlijk Identificeerbare Informatie) uit stagingdatabases wordt verwijderd
📄 `github-final-sync.md`      # CI/CD-actie om versterkte configuratiesjablonen en geanonimiseerde bedreigingsmodellen door te voeren in Github final-repo's

---
**Configuratiebestanden**
⚙️ `semgrep-rules.yaml`        # Aangepaste statische analyseregels die specifiek zijn afgestemd op de technologiestapel van het bedrijf
📦 `opa-policies.rego`         # Open Policy Agent-regels die infrastructuurnalevingsregels afdwingen op de Kubernetes/Terraform-laag

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
