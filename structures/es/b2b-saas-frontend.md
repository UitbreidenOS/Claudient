# 📂 Frontend de B2B SaaS
> El espacio de trabajo canónico para un Frontend de B2B SaaS en nivel de producción (Next.js / React), diseñado para manejar estado complejo, Control de Acceso Basado en Roles (RBAC) y tablas de datos de alto rendimiento.

📄 `frontend-architecture-brief.md` # Resumen canónico: Estrategias de renderizado (SSR vs SSG), opciones de biblioteca de componentes y paradigmas de enrutamiento
🧠 `active-ui-bugs.md`              # Memoria de sesión: Seguimiento de contexto dinámico para desajustes de estado actuales y problemas de diseño responsivo
🤖 `CLAUDE.md`                      # Reglas de operación: Instrucciones estrictas para obligar componentes de servidor por defecto y evitar cascadas del lado del cliente

## 📁 state-and-data/ (4 habilidades - El Cerebro del Cliente)
📄 `auth-session-store.md`          # Lógica de Zustand/Redux para gestionar JWT, tokens de actualización y permisos del usuario actual
📄 `health-api-query-client.md`     # Configuración de TanStack/React Query para almacenamiento en caché, deduplicación y sincronización de solicitudes a tu health-api central
📄 `optimistic-ui-updates.md`       # Lógica de mutación que actualiza instantáneamente la interfaz de usuario antes de que el servidor responda para que la aplicación se sienta rápida
📄 `websocket-listeners.md`         # Suscripciones para notificaciones de panel dinámico en tiempo real y presencia de usuario activo

## 📁 ui-components/ (3 habilidades - La Vista)
📄 `design-system-tokens.md`        # La fuente única de verdad para espaciado, tipografía y colores de marca (Tailwind/CSS Modules)
📄 `complex-data-tables.md`         # Componentes de cuadrícula virtualizados capaces de renderizar 10,000+ filas con ordenamiento y paginación sin retrasos
📄 `rbac-visibility-wrappers.md`    # Componentes de utilidad que automáticamente ocultan botones o pestañas si el usuario carece del permiso IAM específico

## 📁 routing-and-middleware/ (3 habilidades - Navegación)
📄 `tenant-subdomain-router.md`     # Lógica para manejar URLs multi-inquilino (por ejemplo, `clientA.health-ui.com` vs `clientB.health-ui.com`)
📄 `edge-auth-guards.md`            # Middleware de Next.js que intercepta solicitudes no autenticadas en el perímetro y redirige a `/login`
📄 `dynamic-breadcrumbs.md`         # Genera automáticamente rutas de navegación basadas en la estructura de URL con vínculos profundos actual

## 📁 testing-and-qa/ (3 habilidades - Estabilidad)
📄 `component-storybook.md`         # Espacio de juego aislado para pruebas visuales de estados de interfaz de usuario antes de integrarlos en páginas principales
📄 `accessibility-auditor.md`       # Integraciones de Axe-core que garantizan que todos los formularios y modales sean compatibles con lectores de pantalla (WCAG)
📄 `e2e-critical-paths.md`          # Scripts de Playwright que prueban el viaje de usuario principal (por ejemplo, registrarse, crear una organización y facturación)

## 📁 build-and-deploy/ (3 habilidades - CI/CD)
📄 `bundle-size-analyzer.md`        # Falla la compilación si una PR accidentalmente importa bibliotecas masivas (como lodash) que inflaman el tiempo de carga inicial
📄 `env-variable-validator.md`      # Esquema de Zod que falla la compilación inmediatamente si una clave API requerida falta del entorno
📄 `github-final-sync.md`           # Acciones automatizadas de GitHub para enviar el frontend compilado y minificado finalizado a tus repositorios final de Github

---
**Archivos de Configuración**
⚙️ `next.config.mjs` / `vite.config.ts` # Configuraciones centrales del empaquetador, aplicación de modo estricto y listas blancas de dominio de imagen
📦 `tailwind.config.ts`                 # Definiciones de clases de utilidad asignadas directamente a tokens de diseño de Figma
