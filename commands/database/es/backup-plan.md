---
description: Generar un plan de copia de seguridad y recuperación de base de datos adaptado a la pila del proyecto y los requisitos de RTO/RPO
argument-hint: "[tipo de base de datos, entorno de alojamiento o requisitos de RTO/RPO]"
---
Generar un plan de copia de seguridad de base de datos para: $ARGUMENTS

Si $ARGUMENTS especifica un tipo de base de datos y/o entorno, utiliza eso. De lo contrario, detecta el motor de base de datos y el contexto de alojamiento a partir de los archivos de configuración del proyecto (docker-compose, .env, database.yml, etc.).

Produce un plan de copia de seguridad completo que cubra:

1. Estrategia de copia de seguridad:
   - Frecuencia y horario de copia de seguridad completa (expresión cron).
   - Copia de seguridad continua incremental o basada en WAL si el motor lo admite (archivado WAL de PostgreSQL, binlog de MySQL, envío de registro de transacciones de MSSQL).
   - Compensaciones de copia de seguridad lógica vs. física para este motor y tamaño de conjunto de datos.
   - Herramientas recomendadas: pg_dump / pg_basebackup, mysqldump / Percona XtraBackup, mongodump, sqlite3 .backup, instantáneas nativas en la nube (RDS, Cloud SQL, Azure Database).

2. Política de retención:
   - Copias de seguridad diarias retenidas durante N días, semanales durante N semanas, mensuales durante N meses — proporciona una recomendación concreta basada en necesidades de cumplimiento implícitas.
   - Orientación sobre estimación de costos de almacenamiento (relación de tamaño de copia de seguridad comprimida versus tamaño de base de datos bruto).

3. Almacenamiento y seguridad:
   - Requisito de almacenamiento fuera del sitio o entre regiones.
   - Cifrado en reposo (los archivos de copia de seguridad deben estar cifrados — proporciona la bandera/configuración para la herramienta elegida).
   - Control de acceso: las credenciales de copia de seguridad deben ser independientes de las credenciales de la aplicación.

4. Procedimientos de recuperación:
   - Comandos de restauración paso a paso para las herramientas recomendadas.
   - Instrucciones de recuperación a un momento específico (PITR) si el archivado de WAL/binlog está configurado.
   - RTO estimado basado en el tamaño de la copia de seguridad y el método de restauración.

5. Validación de copia de seguridad:
   - Procedimiento de prueba de restauración semanal en un entorno de almacenamiento provisional.
   - Paso de verificación de suma de comprobación o recuento de filas posterior a la restauración.
   - Alertas: qué monitorear (código de salida del trabajo de copia de seguridad, antigüedad de la copia de seguridad, anomalía de tamaño de la copia de seguridad).

6. Plantilla de runbook:
   - Un runbook de incidente corto: "La base de datos ha desaparecido — ¿qué hago en los próximos 15 minutos?"

Resultado con comandos concretos, no consejos genéricos. Todos los comandos deben ser ejecutables tal cual o con una sustitución de variable mínima.
