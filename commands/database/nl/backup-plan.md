---
description: Genereer een databaseback-up- en herstelplan afgestemd op de stack van het project en RTO/RPO-vereisten
argument-hint: "[databasetype, hostingomgeving, of RTO/RPO-vereisten]"
---
Genereer een databaseback-up- en herstelplan voor: $ARGUMENTS

Als $ARGUMENTS een databasetype en/of omgeving aangeeft, gebruik dat. Gebruik anders de database-engine en hosting-context van projectconfiguratiebestanden (docker-compose, .env, database.yml, enz.).

Produceer een volledig back-upplan met betrekking tot:

1. Back-upstrategie:
   - Frequentie en schema van volledige back-ups (cron-expressie).
   - Incrementele of WAL-gebaseerde continue back-up indien de engine dit ondersteunt (PostgreSQL WAL-archivering, MySQL binlog, MSSQL transaction log shipping).
   - Logische versus fysieke back-upafwegingen voor deze engine en gegevenssetgrootte.
   - Aanbevolen tools: pg_dump / pg_basebackup, mysqldump / Percona XtraBackup, mongodump, sqlite3 .backup, cloud-native snapshots (RDS, Cloud SQL, Azure Database).

2. Retentiebeleid:
   - Dagelijkse back-ups gedurende N dagen, wekelijks voor N weken, maandelijks voor N maanden — geef een concrete aanbeveling op basis van impliciete compliancevereisten.
   - Richtlijnen voor schatting van opslagkosten (verhouding gecomprimeerde back-upgrootte versus onbewerkte databasegrootte).

3. Opslag en beveiliging:
   - Vereiste voor off-site of cross-region opslag.
   - Encryptie in rust (back-upbestanden moeten worden versleuteld — geef de vlag/config voor het gekozen hulpmiddel).
   - Toegangsbeheer: back-up-aanmeldingsgegevens moeten gescheiden zijn van toepassingsgegevens.

4. Herstelprocedures:
   - Stap-voor-stap herstellingsopdrachten voor de aanbevolen tools.
   - Herstel naar een bepaald moment (PITR) instructies als WAL/binlog-archivering is geconfigureerd.
   - Geschatte RTO op basis van back-upgrootte en herstelmethode.

5. Back-upvalidatie:
   - Wekelijkse procedure voor hersteltest in een faseringsomgeving.
   - Checksum- of rijtellingverificatiestap na herstel.
   - Waarschuwingen: wat u moet controleren (back-upjob-afsluitcode, back-upouderdom, afwijking in back-upgrootte).

6. Runbook-sjabloon:
   - Een korte incident-runbook: "Database is weg — wat doe ik in de volgende 15 minuten?"

Voer concrete opdrachten uit, geen generieke adviezen. Alle opdrachten moeten as-is uitvoerbaar zijn of met minimale variabelesubstitutie.
