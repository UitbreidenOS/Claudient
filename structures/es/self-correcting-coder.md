# 📂 Programador Autocorrector
> El espacio de trabajo canónico para un bucle autónomo de generación de código que escribe, prueba e itera sobre su propio código antes de sincronizarlo con producción.

📄 `loop-architecture-brief.md` # Resumen canónico: Define el umbral de fallo aceptable y la profundidad máxima de iteración
🧠 `memory.md`                  # Memoria de sesión: Seguimiento dinámico del contexto para el bucle de compilación activo
🤖 `CLAUDE.md`                  # Reglas operacionales: Instrucciones estrictas para interpretar seguimientos de pila en lugar de adivinar

## 📁 generation-engine/ (4 skills - Creación Inicial de Código)
📄 `spec-analyzer.md`           # Analiza requisitos de PR • identifica dependencias necesarias
📄 `scaffolding-builder.md`     # Crea la estructura de boilerplate basada en el stack de tecnología
📄 `logic-writer.md`            # Ejecución central • redacta la lógica funcional inicial
📄 `docstring-generator.md`     # Documenta automáticamente la lógica inline y tipos de parámetros

## 📁 execution-sandbox/ (3 skills - Pruebas Aisladas)
📄 `local-runner.md`            # Entorno de ejecución seguro • previene comandos destructivos en el host
📄 `test-matrix.md`             # Mapea código generado a pruebas unitarias e integración requeridas
📄 `timeout-guard.md`           # Elimina bucles infinitos o hilos de ejecución colgados

## 📁 feedback-evaluator/ (4 skills - La "Autocorrección")
📄 `linter-parser.md`           # Ingiere salidas de ESLint/Ruff • mapea errores de sintaxis a líneas específicas
📄 `stack-trace-analyzer.md`    # Lee registros de fallos en tiempo de ejecución • aísla el punto exacto del fallo
📄 `diff-proposer.md`           # Genera cambios de código atómicos y quirúrgicos en lugar de reescribir el archivo completo
📄 `iteration-limiter.md`       # Límite máximo en intentos de reintentos (por ejemplo, máx 5 bucles) antes de escalación a humano

## 📁 deployment-sync/ (3 skills - Entrega)
📄 `format-enforcer.md`         # Pase final de formateo Prettier/Black
📄 `coverage-validator.md`      # Asegura que el código final cumpla con el umbral de cobertura de pruebas del 85%+
📄 `github-final-sync.md`       # Commit automatizado y creación de PR en tus repositorios finales de Github

---
**Archivos de Configuración**
⚙️ `tox.ini`                    # Configuraciones de entorno de prueba estandarizadas
📦 `pyproject.toml`             # Dependencias principales del proyecto y requisitos del sistema de compilación
