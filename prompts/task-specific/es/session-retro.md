# Indicación: Retrospectiva de sesión

Use al final de una sesión de Claude Code para capturar el aprendizaje y convertirlo en mejoras duraderas — actualizar CLAUDE.md, crear nuevas reglas, identificar oportunidades de habilidades y escribir ADR.

## Indicación del sistema

```
Está realizando una retrospectiva de sesión. Revise el historial de conversación de esta sesión y categorice cada aprendizaje en el formato de salida correcto.

Categorías a verificar (incluir solo categorías con contenido real):

**1. ACTUALIZACIONES CLAUDE.md** — contexto de proyecto persistente que debe sobrevivir a esta sesión
Formato: "Agregar a CLAUDE.md: [texto exacto a agregar]"
Incluir: comandos descubiertos recientemente, información de arquitectura, convenciones establecidas, cosas que Claude siempre debe saber

**2. NUEVAS REGLAS** — estándares de codificación o patrones que merecen formalizarse
Formato: "Agregar a rules/[categoría].md: [enunciado de la regla]"
Incluir: convenciones establecidas, patrones que siempre deben seguirse, cosas que nunca deben hacerse

**3. IDEAS DE HABILIDADES** — flujos de trabajo repetitivos que merecen una /habilidad
Formato: "Crear habilidad: /[nombre] — [lo que hace en una oración]"
Incluir: cualquier flujo de trabajo que haya escrito 3+ veces, procesos de múltiples pasos con patrón consistente

**4. ADR** — decisiones arquitectónicas con compensaciones significativas
Formato: "Escribir ADR: [título corto] — Decisión: [lo que se decidió]"
Incluir: opciones tecnológicas, selecciones de enfoques, todo lo que los futuros ingenieros deben entender

**5. BUGS NO CORREGIDOS** — problemas encontrados que aún no se han resuelto
Formato: "Error: [descripción] — Ubicación: [archivo o área] — Impacto: [quién/qué afecta]"

**6. TODO SESIÓN SIGUIENTE** — tareas concretas para comenzar la próxima vez
Formato: "Siguiente: [tarea específica]"

Sea específico y accionable. No incluya observaciones vagas. Si una categoría no tiene nada digno de capturar, omítala completamente.
```

## Uso

Al final de cualquier sesión significativa, ejecute:

```
"Haga una retrospectiva de sesión sobre todo en lo que trabajamos hoy. 
Categorice todos los aprendizajes usando el formato retrospectivo."
```

## Automatización con el gancho session-retro

El gancho `session-retro` crea un archivo `.claude/retro-pending.md` automáticamente al final de la sesión. Al inicio de la sesión siguiente, pegue la indicación retrospectiva y procese el archivo.

## Actuar sobre la salida

Para cada salida:

| Categoría | Acción |
|---|---|
| Actualización CLAUDE.md | Editar CLAUDE.md directamente |
| Nueva regla | Crear o agregar a `rules/common/[tema].md` |
| Idea de habilidad | Agregar al backlog de desarrollo |
| ADR | Delegar al agente `adr-writer` |
| Bug | Agregar a `bugs.md` o crear un problema de GitHub |
| Sesión siguiente | Comenzar la próxima sesión con estas tareas |

## Salida de ejemplo

```
## Retrospectiva de sesión — 20 de mayo de 2026

**ACTUALIZACIONES CLAUDE.md:**
- Agregar a CLAUDE.md: "Usar `npx drizzle-kit generate` antes de cualquier migración de BD — siempre obtener una vista previa del SQL de migración antes de ejecutar"
- Agregar a CLAUDE.md: "El servicio de pagos usa claves de idempotencia en todas las llamadas de Stripe — pasar `idempotencyKey: requestId` en cada cargo"

**NUEVAS REGLAS:**
- Agregar a rules/common/error-handling.md: "Todos los manejadores de webhook de Stripe deben verificar la firma antes de procesar — usar `stripe.webhooks.constructEvent()`"

**IDEAS DE HABILIDADES:**
- Crear habilidad: /stripe-webhook — Configurar un manejador de webhook de Stripe completo con verificación de firma, enrutamiento de eventos e idempotencia

**ADR:**
- Escribir ADR: "Usar Stripe Connect en lugar de cargos directos para pagos de marketplace" — Decisión: Se eligió Stripe Connect para manejar pagos de múltiples partes sin construir lógica de libro mayor personalizada

**BUGS NO CORREGIDOS:**
- Error: El correo de confirmación de pago se envía dos veces en reintento — Ubicación: `src/webhooks/stripe.ts:87` — Impacto: Algunos usuarios reciben correos de confirmación duplicados

**SESIÓN SIGUIENTE:**
- Siguiente: Corregir el error de correo duplicado en el manejador de webhook de pago
- Siguiente: Escribir la habilidad de webhook de Stripe basada en los patrones establecidos hoy
```
