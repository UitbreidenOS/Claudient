---
description: Erkennung von N+1-Abfragemustern in ORM-Code und Produktion von Batch-Loading-Fixes
argument-hint: "[Dateipfad, Verzeichnis oder Route/Controller-Name]"
---
Scannen Sie auf N+1-Abfragemuster in: $ARGUMENTS

Wenn $ARGUMENTS ein Dateipfad ist, lesen Sie ihn. Wenn es sich um ein Verzeichnis handelt, scannen Sie alle relevanten Quelldateien darin. Wenn es sich um einen Controller- oder Route-Namen handelt, lokalisieren Sie die entsprechenden Codedateien.

Erkennungsansatz:

1. Identifizieren Sie die verwendete ORM oder Abfragebibliothek (ActiveRecord, SQLAlchemy, Django ORM, TypeORM, Prisma, Sequelize, GORM, Hibernate usw.).

2. Scannen Sie auf N+1-Muster:
   - Schleifen (for, forEach, map, each, .all.map usw.), die ORM-Aufrufe im Schleifenkörper enthalten.
   - Lazy-geladene Assoziationen, auf die in einer Schleife zugegriffen wird (z. B. `post.comments`, die pro Beitrag in einer Iteration aufgerufen werden).
   - Serialisierer oder View-Templates, die Assoziationslasten pro Datensatz auslösen.
   - `.find()`- oder `.get()`-Aufrufe in Schleifen, die batched werden könnten.
   - Fehlende Eager-Load-Direktiven (includes, eager_load, preload, joinedload, selectinload, with, include).

3. Geben Sie für jedes gefundene N+1-Muster folgendes aus:
   - Dateipfad und Zeilennummer(n) des fehlerhaften Codes.
   - Die Abfrage, die N Mal ausgeführt wird.
   - Die Lösung: exakter Code, der zeigt, wie die Assoziation gesammelt/eager-geladen wird.
   - Die zu verwendende ORM-spezifische Methode (z. B. `includes(:comments)` für ActiveRecord, `options(selectinload(Post.comments))` für SQLAlchemy, `include: { comments: true }` für Prisma).

4. Kennzeichnen Sie auch:
   - Fehlende `select`-Felder, die vollständige Zeilenlasten verursachen, wenn nur eine Teilmenge benötigt wird.
   - Fehlende `.distinct` bei Assoziationszählungen, die aufgeblähte Ergebnisse verursachen.
   - Wiederholte identische Abfragen innerhalb desselben Request-Zyklus, die memoized oder gecacht werden sollten.

5. Wenn die Codebasis Abfrage-Logging oder ein Abfragezahl-Assertations-Muster hat (z. B. `assert_queries`, `nplusone`-Bibliothek), schlagen Sie vor, Guards hinzuzufügen, um Rückfälle zu verhindern.

Geben Sie Ergebnisse als priorisierte Liste aus — HIGH (in einem heißen Pfad oder einer Schleife über unbegrenzte Sammlungen), MEDIUM, LOW — mit exaktem Code-Fix für jeden.
