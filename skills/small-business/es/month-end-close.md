# Cierre de Fin de Mes

## Cuándo activar
- Son los últimos días del mes y necesitas cerrar los libros
- Tienes una reunión con tu contador y quieres llegar con los números ya organizados
- Necesitas un estado de resultados para un préstamo bancario, actualización de inversionista o solicitud de arrendamiento
- Algo no cuadra entre tu total de QuickBooks y tu estado de cuenta bancario y necesitas encontrar la brecha

## Cuándo NO usar
- A mediados de mes — espera a que el mes esté completo para que los números sean finales
- Tu contador gestiona completamente el cierre y no estás involucrado en el proceso
- Buscas asesoramiento fiscal — esta skill organiza tus números, no reemplaza a un CPA

## Instrucciones

### Qué exportar antes de comenzar

Necesitas tres cosas de tus herramientas contables. Los tres se pueden exportar en menos de 5 minutos:

1. QuickBooks: Informe de Ganancias y Pérdidas para el mes (Informes > Ganancias y Pérdidas > establecer rango de fechas > Exportar a Excel o PDF)
2. QuickBooks: Informe de Detalle de Transacciones del mes — lista completa de cada transacción
3. PayPal o Stripe: Informe de Liquidación del mes — descargable de tu panel bajo Actividad o Informes

Si usas PayPal y Stripe, obtén ambos. Si usas solo uno, obtén ese.

### Paso 1: Valida procesadores de pago contra QuickBooks

Pega tus totales en Claude:

„QuickBooks muestra $34,200 en ingresos. Las ventas brutas de PayPal fueron $31,800 antes de comisiones, neto $29,400. Stripe bruto fue $4,800, neto $4,600. Ayúdame a reconciliar estos."

Claude identifica dónde los números se alinean y dónde no. Brechas comunes que detecta:

- Comisiones de PayPal o Stripe que no se registraron como gastos en QuickBooks
- Reembolsos procesados en un sistema pero no reflejados en el otro
- Transacciones que ocurrieron en un mes pero se liquidaron en otro (diferencias de tiempo)
- Transacciones divididas que se registraron como un solo bloque en QuickBooks

Para cada discrepancia, Claude explica qué es probablemente y qué hacer — si necesitas corregirlo tú mismo o indicarlo a tu contador.

### Paso 2: Genera el resumen de estado de resultados

Una vez que los números están reconciliados, pídele a Claude:

„Resume mi estado de resultados para el mes. Ingresos por categoría si tengo categorías, las 5 principales categorías de gastos, ganancia o pérdida neta, y compara con el mes pasado si me das esos números."

Pega tu exportación de QuickBooks Estado de Resultados (como texto o números) y Claude produce un resumen limpio:

- Ingresos totales: $38,600 (arriba $3,200 del mes pasado, +9%)
- Principales categorías de gastos: Pago de contratistas $11,200 / Software $2,400 / Publicidad $1,800 / Oficina $640 / Comisiones bancarias $280
- Ganancia neta: $22,280 (margen del 58%)
- Cambio notable del mes pasado: Gasto en publicidad arriba $600 — verifica si impulsó el aumento de ingresos

### Paso 3: Captura recibos faltantes

Dile a Claude tu umbral:

„Enumera cualquier transacción sobre $75 en mi informe de gastos que no tenga un memo o recibo adjunto."

Pega tu lista de transacciones. Claude marca las sin descripción y las agrupa por categoría para que puedas perseguir recibos eficientemente. También nota cuáles son probablemente deducibles (comidas de negocios, software, viajes) versus rutinarias (nómina, renta) — para que sepas cuáles recibos faltantes importan realmente para impuestos.

### Paso 4: Redacta el email del contador

Pídele a Claude:

„Escribe un email de 3 párrafos a mi contador resumiendo este mes. Incluye los números clave e identifica las 2-3 preguntas que debería hacerle."

Claude redacta:

- Párrafo 1: Resumen del mes — ingresos, gastos, ganancia neta, y una tendencia notable
- Párrafo 2: Notas de reconciliación — qué encontraste, qué corregiste, qué no estás seguro
- Párrafo 3: Tus preguntas específicas — formuladas como „Noté X, ¿debería hacer Y?" no solicitudes vagas

Esto ahorra tiempo a tu contador y te consigue respuestas más rápidas y útiles.

### Cosas comunes que Claude detecta

- Comisiones de liquidación de PayPal contabilizadas como ingresos en lugar de gasto
- Retiros del propietario que redujeron el saldo bancario pero no se muestran como gastos
- Transacciones duplicadas de importación de alimentación bancaria
- Suscripciones que se renovaron pero no se presupuestaron
- Pagos recibidos el mes anterior que QuickBooks registró este mes (diferencia accrual vs. efectivo)

### Cadencia mensual

Ejecuta esta skill en los primeros 3 días hábiles después del cierre del mes. Asigna 60-90 minutos la primera vez, 30-45 minutos una vez que tengas una rutina. Usa la salida directamente para tu reunión de contador — no se necesita preparación adicional.

## Ejemplo

Dices: „QuickBooks muestra $34,200 en ingresos este mes. PayPal muestra $31,800 neto después de comisiones. También tengo $2,100 en Stripe. Mis gastos de QuickBooks muestran $18,400. No estoy seguro por qué los números no cuadran y tengo una llamada de contador mañana por la mañana."

Claude reconcilia las tres fuentes:

- Ingresos de QuickBooks $34,200 + Stripe $2,100 debería igualar $36,300 total — pero PayPal neto $31,800 no se ajusta limpiamente a este cuadro.
- Análisis de brechas: Claude encuentra que las $2,400 en comisiones de PayPal no se registraron como gasto en QuickBooks. Agregarlas cierra a $300.
- Los $300 restantes se marcan como probable reembolso sin categorizar — Claude pregunta: „¿Emitiste algún reembolso en los últimos 30 días? Verifica tu actividad de PayPal para reembolsos emitidos entre el 18 y 25."

Claude luego produce:
- Resumen limpio de estado de resultados con números correctos para tu llamada de contador
- Nota de reconciliación de un párrafo explicando la entrada de comisiones de PayPal que falta
- Tres preguntas para plantear con tu contador: cómo categorizar el reembolso, si el retiro del propietario del 22 necesita una entrada, y si la compra de equipo de $640 califica para Section 179

Llegas a tu reunión de contador con todo organizado. La llamada toma 20 minutos en lugar de una hora.
