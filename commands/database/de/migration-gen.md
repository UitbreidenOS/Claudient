---
description: Generiert eine Datenbankmigrationen-Datei aus einer Schemaveränderungsbeschreibung oder einem Diff
argument-hint: "[Beschreibung der Schemaänderung]"
---
Sie generieren eine Datenbankmigration. Der Benutzer hat bereitgestellt: $ARGUMENTS

Schließen Sie auf das Ziel-Migrationsframework aus dem Projekt (Alembic, Flyway, Liquibase, Django-Migrationen, Rails ActiveRecord, Prisma, Knex, TypeORM, Sequelize oder Raw SQL). Bei Mehrdeutigkeit prüfen Sie auf Konfigurationsdateien oder vorhandene Migrationsdateien im Repository, bevor Sie fragen.

Schritte:
1. Überprüfen Sie vorhandene Migrationen, um die Namenskonvention, das Zeitstempelformat und die Dateistruktur zu bestimmen.
2. Identifizieren Sie den aktuellen Schemastatus aus vorhandenen Migrationen oder Schemadateien.
3. Generieren Sie die Migration mit:
   - Einem `up`-Pfad (Forward-Migration), der wo möglich idempotent ist (verwenden Sie IF NOT EXISTS, IF EXISTS-Schutzmaßnahmen).
   - Einem `down`-Pfad (Rollback), der den `up`-Pfad vollständig rückgängig macht.
   - Expliziten Transaktionsgrenzen, falls das Framework transaktionales DDL unterstützt.
   - Spaltenbeschränkungen (NOT NULL, DEFAULT, CHECK), die dem entsprechen, was angefordert wurde.
   - Indexerstellung zusammen mit allen neuen Fremdschlüsseln.
4. Wenn die Änderung das Umbenennen einer Spalte oder Tabelle beinhaltet, generieren Sie eine zweiphasige Migration: neue hinzufügen, rückfüllen, alte löschen — es sei denn, der Benutzer fordert explizit eine einstufige Umbenennung an.
5. Markieren Sie alle zerstörerischen Operationen (DROP COLUMN, DROP TABLE, Typverengung) mit einem Kommentarblock, der mit `-- DESTRUCTIVE:` beginnt, und empfehlen Sie eine entsprechende Bereitstellungsstrategie (Feature-Flag, Dual-Write, etc.).
6. Geben Sie den Migrationen-Dateiinhalt mit dem korrekten Dateinamen gemäß vorhandener Konventionen aus.
7. Bei großen Tabellen markieren Sie Operationen, die ACCESS EXCLUSIVE-Sperren erfordern (ALTER TABLE auf PostgreSQL), und schlagen Sie CONCURRENTLY-Alternativen vor, wo verfügbar.

Generieren Sie ORM-Modelländerungen nicht, es sei denn, Sie werden dazu aufgefordert. Konzentrieren Sie sich ausschließlich auf das Migrationsartefakt.
