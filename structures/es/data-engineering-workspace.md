# 📂 Data Engineering Workspace

> El área de trabajo canónica para un Ingeniero de Datos, diseñada para construir pipelines idempotentes, orquestar Gráficos Acíclicos Dirigidos (DAGs) complejos e implementar verificaciones rigurosas de calidad de datos a escala.

📄 `pipeline-architecture-brief.md` # Documento estratégico canónico: Define el almacén de datos objetivo (Snowflake/BigQuery), SLAs de latencia (batch vs. streaming) y convenciones de nomenclatura
🧠 `active-backfills.md`            # Memoria de sesión: Seguimiento de contexto dinámico para rellenos de datos históricos actualmente en ejecución y recuperación de DAGs rotos
🤖 `CLAUDE.md`                      # Reglas operativas: Instrucciones estrictas para garantizar idempotencia—asegurar que un pipeline pueda ejecutarse varias veces sin duplicar datos

## 📁 ingestion-and-extract/ (4 skills - Movimiento de Datos)
📄 `api-paginator.md`               # Scripts para extraer confiablemente datos de APIs REST paginadas de terceros con retroceso exponencial
📄 `cdc-configurator.md`            # Configuraciones de Cambio de Datos Capturados (Debezium/Kafka) para transmitir cambios de filas a nivel de base de datos en tiempo real
📄 `batch-job-scheduler.md`         # Lógica para trabajos cron nocturnos que extraen CSVs masivos de servidores SFTP o buckets S3
📄 `local-ingest-sandbox.md`        # Configuraciones para ejecutar pruebas de extracción pesadas localmente en una Mac mini dedicada antes de llevar a la nube

## 📁 transformation-dbt/ (4 skills - Modelado)
📄 `dbt-model-generator.md`         # Genera modelos SQL de capas de staging, intermedias y marts siguiendo la metodología Kimball
📄 `incremental-load-logic.md`      # Macros complejas en Jinja para procesar solo registros nuevos, reduciendo drásticamente costos de cómputo
📄 `dag-optimizer.md`               # Analiza el gráfico de dependencias para identificar cuellos de botella y paralelizar transformaciones independientes
📄 `slow-query-refactor.md`         # Sugerencias automatizadas para reemplazar JOINs pesados o funciones de ventana con claves de agrupamiento más eficientes

## 📁 orchestration-airflow/ (3 skills - Programación)
📄 `dag-scaffolder.md`              # Genera DAGs de Apache Airflow (o flujos de Prefect/Dagster) con lógica de reintentos estandarizada
📄 `sensor-and-hook-config.md`      # Espera eventos ascendentes (p. ej., "archivo S3 descargado") antes de activar procesamiento descendente
📄 `sla-miss-alerter.md`            # Lógica de enrutamiento de PagerDuty para cuando un pipeline de dashboard crítico no cumple su ventana de entrega de 8:00 AM

## 📁 data-quality-and-ops/ (3 skills - Confianza)
📄 `great-expectations-suite.md`    # Genera pruebas rigurosas que afirmen unicidad de columnas, restricciones de no nulidad y tipos de datos esperados
📄 `dead-letter-queue-handler.md`   # Enruta de forma segura payloads JSON malformados a una zona de cuarentena para inspección en lugar de bloquear el pipeline
📄 `anomaly-detector.md`            # Verificaciones estadísticas para señalar si la suma de ingresos de hoy está fuera de los límites en comparación con el promedio móvil de 30 días

## 📁 infrastructure-and-sync/ (3 skills - Despliegue)
📄 `warehouse-sizer.md`             # Lógica de Terraform para escalar dinámicamente almacenes de cómputo de Snowflake durante horas de ELT pesado y suspenderlos después
📄 `role-based-access.md`           # Scripts para aprovisionar vistas enmascaradas, asegurando que los datos personales (como correos electrónicos) estén ocultos de roles de analista estándar
📄 `github-final-sync.md`           # Acción automatizada de CI/CD para probar cambios de pipeline en staging y sincronizar código aprobado con repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `dbt_project.yml`                # Define materializaciones de modelos (tabla vs. vista) y agrupaciones de etiquetas
📦 `airflow.cfg`                    # Configuraciones principales del programador y límites de concurrencia del trabajador

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
