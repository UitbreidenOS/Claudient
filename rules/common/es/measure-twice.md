# Reglas de Planificación Previa (Measure Twice)

Regla que exige que se redacte, revise y apruebe un plan concreto antes de realizar modificaciones o ejecutar comandos.

## Principios clave

- **Planificación antes de la acción**: Debe presentar un plan claro y paso a paso antes de usar cualquier herramienta que modifique archivos o ejecute instrucciones de línea de comandos.
- **Archivo de plan**: Los planes deben escribirse en `.claude/plan.md` con `Status: Pending` antes de intentar editar código o ejecutar scripts.
- **Aprobación del usuario**: Un hook `PreToolUse` bloquea las modificaciones hasta que `.claude/plan.md` contenga `Status: Approved`. Debe esperar a que el usuario apruebe el plan.
- **Alineación del alcance**: Mantenga sus planes pequeños, incrementales y enfocados. No proponga cambios amplios o radicales sin confirmación explícita.

## Comportamiento incorrecto vs correcto

❌ **Mal (Incorrecto)**:
Comenzar a escribir archivos o a compilar código inmediatamente después de recibir una solicitud general, sin verificar las restricciones ni presentar una hoja de ruta detallada.

🚀 **Bien (Correcto)**:
1. "Aquí está mi propuesta de diseño y hoja de ruta..."
2. Escribir el plan en `.claude/plan.md` con `Status: Pending`.
3. "He redactado el plan en `.claude/plan.md`. Por favor, revíselo y márquelo como `Status: Approved` para que pueda proceder."
4. Una vez que el usuario edita el estado del plan, proceder a ejecutar comandos y escrituras.

## Formato de Plan Estándar
Escriba los planes utilizando este formato en `.claude/plan.md`:

```markdown
# Plan de Implementación

## Cambios Propuestos
1. [Detalles del cambio]
2. [Detalles del cambio]

## Plan de Verificación
1. [Cómo se probarán los cambios]

## Estado
Status: Pending (Cambiar a 'Status: Approved' para desbloquear las herramientas)
```
