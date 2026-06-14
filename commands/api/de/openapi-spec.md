---
description: OpenAPI 3.1 Spezifikation aus vorhandenen Routen oder einer Beschreibung generieren oder aktualisieren
argument-hint: "[Quelldatei-oder-Beschreibung]"
---
Generieren oder aktualisieren Sie eine OpenAPI 3.1 Spezifikation basierend auf: $ARGUMENTS

Wenn $ARGUMENTS ein Dateipfad ist, lesen Sie die Routendefinitionen aus dieser Datei. Wenn es eine Beschreibung ist, erstellen Sie eine Spezifikation von Grund auf. Wenn leer, scannen Sie die Codebasis nach allen Routendefinitionen und generieren Sie eine vollständige Spezifikation.

Anforderungen:
- Verwenden Sie OpenAPI 3.1.0 (nicht 3.0.x — verwenden Sie `type: "null"` anstelle von `nullable: true`)
- Jeder Pfad muss haben: summary, operationId (camelCase, eindeutig), tags, parameters, requestBody (falls zutreffend) und responses
- Definieren Sie alle Schemas unter `components/schemas` — Inline-Schemas in Path-Elementen sind verboten
- Verwenden Sie `$ref` für alle Schemas, auf die mehr als einmal verwiesen wird
- Dokumentieren Sie jeden möglichen Response-Statuscode, den der Code tatsächlich zurückgibt — erfinden Sie keine zusätzlichen
- Erforderliche Felder müssen in `required` Arrays stehen — keine stillen Optionale
- Enum-Werte müssen dem entsprechen, was der Code erzwingt
- Fügen Sie Sicherheitsschemadefinitionen hinzu, falls die API Authentifizierung verwendet (Bearer JWT, API-Schlüssel, OAuth2, etc.)
- Fügen Sie `description` Felder für alle nicht offensichtlichen Eigenschaften hinzu
- Markieren Sie veraltete Endpunkte mit `deprecated: true`, falls vorhanden

Formatierungsregeln:
- YAML-Ausgabe, 2-Leerzeichen Einzug
- Halten Sie `paths` alphabetisch nach Route sortiert
- Halten Sie `components/schemas` alphabetisch sortiert

Geben Sie die vollständige `openapi.yaml` Datei aus. Wenn Sie eine vorhandene Spezifikation aktualisieren, zeigen Sie nur die geänderten Abschnitte mit ausreichend Kontext, um sie zu platzieren, und schreiben Sie dann die vollständige aktualisierte Datei.

Falls die Route-Quelle mehrdeutig ist oder Framework-spezifische Dekorateure nicht erkannt werden, listen Sie auf, welche Routen übersprungen wurden und warum.
