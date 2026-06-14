---
description: Detecteer N+1-querypatronen in ORM-code en produceer batch-loading fixes
argument-hint: "[bestandspad, map, of route/controller naam]"
---
Scan op N+1 querypatronen in: $ARGUMENTS

Als $ARGUMENTS een bestandspad is, lees het. Als het een map is, scan alle relevante bronbestanden erin. Als het een controller of route naam is, zoek de bijbehorende codebestanden.

Detectiebenadering:

1. Identificeer de ORM of query bibliotheek in gebruik (ActiveRecord, SQLAlchemy, Django ORM, TypeORM, Prisma, Sequelize, GORM, Hibernate, enz.).

2. Scan op N+1 patronen:
   - Loops (for, forEach, map, each, .all.map, enz.) die ORM-aanroepen bevatten in de loop body.
   - Lazy-loaded associaties die binnen een loop worden benaderd (bijv. `post.comments` aangeroepen per post in een iteratie).
   - Serializers of view templates die associatie laadprogramma's per record triggeren.
   - `.find()` of `.get()` aanroepen binnen loops die kunnen worden gebatch.
   - Ontbrekende eager-load richtlijnen (includes, eager_load, preload, joinedload, selectinload, with, include).

3. Voor elke gevonden N+1, voer uit:
   - Bestandspad en regelnummer(s) van de aanstotende code.
   - De query die N keer wordt uitgevoerd.
   - De fix: exacte code die laat zien hoe de associatie te batchen/eager-loaden.
   - De ORM-specifieke methode om te gebruiken (bijv. `includes(:comments)` voor ActiveRecord, `options(selectinload(Post.comments))` voor SQLAlchemy, `include: { comments: true }` voor Prisma).

4. Markeer ook:
   - Ontbrekende `select` velden die volledige rijbelastingen veroorzaken wanneer slechts een subset nodig is.
   - Ontbrekende `.distinct` op associatie tellingen die opgeblazen resultaten veroorzaken.
   - Herhaalde identieke queries binnen dezelfde requestcyclus die moeten worden memoized of gecached.

5. Als de codebase query logging of een query count assertion patroon heeft (bijv. `assert_queries`, `nplusone` bibliotheek), suggereer het toevoegen van bewakers om regressies te voorkomen.

Output bevindingen als een geprioriteerde lijst — HIGH (in een hot path of loop over unbounded collections), MEDIUM, LOW — met exacte codefixes voor elk.
