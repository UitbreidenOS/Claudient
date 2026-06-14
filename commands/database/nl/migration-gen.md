---
description: Genereer een databasemigratie-bestand uit een schemawijzigingsbeschrijving of diff
argument-hint: "[beschrijving van schemawijziging]"
---
U genereert een databasemigratie. De gebruiker heeft het volgende opgegeven: $ARGUMENTS

Bepaal het doelmigratie-framework uit het project (Alembic, Flyway, Liquibase, Django-migraties, Rails ActiveRecord, Prisma, Knex, TypeORM, Sequelize, of rauwe SQL). Gebruik indien onduidelijk configuratiebestanden of bestaande migratiebestanden in de repository voordat u vragen stelt.

Stappen:
1. Onderzoek bestaande migraties om de naamgeving, tijdstempelformaat en bestandsstructuur te bepalen.
2. Bepaal de huidige schemastatus uit bestaande migraties of schemabestanden.
3. Genereer de migratie met:
   - Een `up`-pad (forward-migratie) dat waar mogelijk idempotent is (gebruik IF NOT EXISTS, IF EXISTS guards).
   - Een `down`-pad (terugdraaiing) dat het `up`-pad volledig omkeert.
   - Expliciete transactiebegrenzingen als het framework transactionele DDL ondersteunt.
   - Kolomconstraints (NOT NULL, DEFAULT, CHECK) die overeenkomen met het verzoek.
   - Het aanmaken van indexen naast nieuwe buitenlandse sleutels.
4. Als de wijziging het hernoemen van een kolom of tabel betreft, genereer dan een twee-fasemigratie: voeg toe, vul aan, verwijder oude — tenzij de gebruiker expliciet een enkele-fasehernoeming verzoekt.
5. Vlag alle destructieve bewerkingen (DROP COLUMN, DROP TABLE, type-versmalling) met een opmerking die begint met `-- DESTRUCTIVE:` en beveel een overeenkomstige implementatiestrategie aan (feature flag, dual-write, enz.).
6. Voer de inhoud van het migratiebestand uit met de juiste bestandsnaam volgens bestaande conventies.
7. Voor grote tabellen vlag bewerkingen die ACCESS EXCLUSIVE-vergrendelingen vereisen (ALTER TABLE op PostgreSQL) en stel CONCURRENTLY-alternatieven voor waar beschikbaar.

Genereer geen wijzigingen in ORM-modellen tenzij hierom wordt gevraagd. Richt u uitsluitend op het migratiebestand.
