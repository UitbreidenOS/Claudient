---
description: Genera un archivo de migración de base de datos a partir de una descripción o diferencia de cambio de esquema
argument-hint: "[descripción del cambio de esquema]"
---
Estás generando una migración de base de datos. El usuario ha proporcionado: $ARGUMENTS

Infiere el marco de migración objetivo del proyecto (Alembic, Flyway, Liquibase, migraciones de Django, Rails ActiveRecord, Prisma, Knex, TypeORM, Sequelize, o SQL sin procesar). Si es ambiguo, verifica los archivos de configuración o las migraciones existentes en el repositorio antes de preguntar.

Pasos:
1. Examina las migraciones existentes para determinar la convención de nomenclatura, el formato de marca de tiempo y la estructura de archivos.
2. Identifica el estado del esquema actual a partir de migraciones existentes o archivos de esquema.
3. Genera la migración con:
   - Una ruta `up` (migración hacia adelante) que sea idempotente donde sea posible (usa guardias IF NOT EXISTS, IF EXISTS).
   - Una ruta `down` (reversión) que revierta completamente la ruta `up`.
   - Límites de transacción explícitos si el marco soporta DDL transaccional.
   - Restricciones de columna (NOT NULL, DEFAULT, CHECK) que coincidan con lo solicitado.
   - Creación de índices junto con cualquier clave externa nueva.
4. Si el cambio implica renombrar una columna o tabla, genera una migración de dos fases: agregar nueva, rellenar, eliminar antigua — a menos que el usuario solicite explícitamente un renombrado de fase única.
5. Marca cualquier operación destructiva (DROP COLUMN, DROP TABLE, estrechamiento de tipo) con un bloque de comentario que comience con `-- DESTRUCTIVE:` y recomienda una estrategia de despliegue correspondiente (bandera de características, escritura dual, etc.).
6. Genera el contenido del archivo de migración con el nombre de archivo correcto siguiendo las convenciones existentes.
7. Para tablas grandes, marca operaciones que requieren bloqueos ACCESS EXCLUSIVE (ALTER TABLE en PostgreSQL) y sugiere alternativas CONCURRENTLY donde estén disponibles.

No generes cambios de modelo ORM a menos que se solicite. Enfócate únicamente en el artefacto de migración.
