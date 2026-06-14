---
description: Erstelle einen Datenbank-Sicherungs- und Wiederherstellungsplan, der auf den Tech-Stack und RTO/RPO-Anforderungen des Projekts zugeschnitten ist
argument-hint: "[Datenbanktyp, Hosting-Umgebung oder RTO/RPO-Anforderungen]"
---
Erstelle einen Datenbank-Sicherungs- und Wiederherstellungsplan für: $ARGUMENTS

Wenn $ARGUMENTS einen Datenbanktyp und/oder eine Umgebung angibt, verwende diesen. Andernfalls erkenne die Datenbank-Engine und den Hosting-Kontext aus Projektkonfigurationsdateien (docker-compose, .env, database.yml, usw.).

Erstelle einen umfassenden Sicherungsplan, der folgende Punkte abdeckt:

1. Sicherungsstrategie:
   - Häufigkeit und Zeitplan vollständiger Sicherungen (Cron-Ausdruck).
   - Inkrementelle oder WAL-basierte kontinuierliche Sicherung, falls von der Engine unterstützt (PostgreSQL WAL-Archivierung, MySQL Binlog, MSSQL Transaktionsprotokoll-Versand).
   - Abwägung zwischen logischen und physischen Sicherungen für diese Engine und Datengröße.
   - Empfohlene Tools: pg_dump / pg_basebackup, mysqldump / Percona XtraBackup, mongodump, sqlite3 .backup, Cloud-native Snapshots (RDS, Cloud SQL, Azure Database).

2. Aufbewahrungsrichtlinie:
   - Tägliche Sicherungen für N Tage aufbewahren, wöchentlich für N Wochen, monatlich für N Monate — geben Sie eine konkrete Empfehlung auf Basis der angedeuteten Compliance-Anforderungen.
   - Leitfaden zur Speicherkostenabschätzung (Komprimiertes Sicherungsgrößen- zu Roh-DB-Größen-Verhältnis).

3. Speicher und Sicherheit:
   - Anforderung für externe oder regionsübergreifende Speicherung.
   - Verschlüsselung im Ruhezustand (Sicherungsdateien müssen verschlüsselt sein — geben Sie das Flag/die Konfiguration für das gewählte Tool an).
   - Zugriffskontrolle: Sicherungsanmeldedaten müssen separat von Anwendungsanmeldedaten sein.

4. Wiederherstellungsverfahren:
   - Schritt-für-Schritt-Wiederherstellungsbefehle für die empfohlene Tooling.
   - Wiederherstellung zu einem bestimmten Zeitpunkt (PITR)-Anweisungen, falls WAL/Binlog-Archivierung konfiguriert ist.
   - Geschätztes RTO basierend auf Sicherungsgröße und Wiederherstellungsmethode.

5. Sicherungsvalidierung:
   - Wöchentliches Wiederherstellungstest-Verfahren in einer Staging-Umgebung.
   - Prüfsummen- oder Zeilenzahl-Verifizierungsschritt nach der Wiederherstellung.
   - Benachrichtigungen: was zu überwachen ist (Sicherungsauftrag-Exitcode, Sicherungsalter, Sicherungsgröße-Anomalien).

6. Runbook-Vorlage:
   - Ein kurzes Incident-Runbook: "Datenbank ist weg — was soll ich in den nächsten 15 Minuten tun?"

Geben Sie konkrete Befehle aus, nicht generische Ratschläge. Alle Befehle müssen unverändert ausführbar sein oder mit minimaler Variablenerstellung.
