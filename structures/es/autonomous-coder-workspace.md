# 📂 Área de Trabajo del Codificador Autónomo
> El espacio de trabajo canónico para ejecutar un agente de codificación autónoma nocturna en un entorno de ejecución estrictamente aislado.

📄 `project-brief.md`      # Brief canónico: Tickets de sprint actuales y objetivos de PR nocturnos
🧠 `memory.md`             # Memoria de sesión: Contexto dinámico para la sesión de codificación activa
🤖 `CLAUDE.md`             # Reglas operacionales: Instrucciones estrictas para la ejecución nocturna (modo YOLO permitido dentro del sandbox)

## 📁 .docker-sandbox/ (5 habilidades - Aislamiento y Seguridad)
📄 `sandbox-config.yaml`   # Definición de MicroVM • Límites de CPU/RAM para el contenedor
📄 `network-policy.md`     # Reglas de egreso • lista de permitidos explícita para gestores de paquetes (npm, pip)
📄 `credential-proxy.md`   # Inyección de secretos • proxy MITM para mantener las claves del host fuera de la VM del agente
📄 `mounts.yaml`           # Vinculaciones de volumen • estrictamente limitado a la ruta `target-repo/`
📄 `lifecycle-hooks.sh`    # Teardown efímero • destruir contenedor automáticamente en caso de fallo

## 📁 target-repo/ (La Base de Código Objetivo)
📄 `docker-compose.yml`    # El entorno de aplicación que el agente usa para probar su propio código
📄 `package.json`          # El agente está autorizado a gestionar dependencias a través de su daemon aislado

## 📁 validation-suite/ (4 habilidades - Pruebas Desatendidas)
📄 `matrix-runner.md`      # Instrucciones de ejecución de pruebas E2E
📄 `lint-fixer.md`         # Reglas de formato automático antes de confirmar
📄 `coverage-check.sh`     # Umbrales de cobertura mínima (p. ej., 80%) requeridos para la aprobación de PR
📄 `sandbox-tests.md`      # Valida que el agente no pueda escapar del contenedor durante la ejecución

## 📁 ops-automation/ (4 habilidades - CI/CD y Entrega)
📄 `git-manager.md`        # Pushes git de credenciales limitadas a través de proxy seguro
📄 `commit-validator.md`   # Cumplimiento de commits semánticos (feat:, fix:, chore:)
📄 `pr-generator.md`       # Escritura automática de descripciones de GitHub PR
📄 `slack-webhook.md`      # Notificación de resumen matutino en caso de éxito o fallo de la canalización

## 📁 audit-logs/ (Registros Inmutables)
📄 `shell-history.log`     # Registro inmutable de todos los comandos bash ejecutados por el agente
📄 `network-events.log`    # Todas las llamadas a API externas interceptadas por el proxy

---
**Archivos de Configuración**
⚙️ `Makefile`              # `make run-overnight` (activa la construcción del sandbox y el inicio del agente)
📦 `agent-config.toml`     # Configuraciones de enrutamiento de LLM y límites de tokens
