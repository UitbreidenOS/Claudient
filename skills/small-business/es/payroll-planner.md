# Planificador de Nómina

## Cuándo activar
- Estás 1-2 semanas antes de nómina y quieres confirmar que el dinero está ahí antes de que se transfiera
- El efectivo se está apretando y no estás seguro de poder cubrir tanto facturas como nómina este ciclo
- Se está uniendo un nuevo empleado y necesitas recalcular tu runway con el monto de nómina más alto
- Planificación de fin de trimestre — quieres una vista de 90 días de flujo de caja, no solo 30 días

## Cuándo NO usar
- Tienes un CFO o contador a tiempo completo que maneja el flujo de caja — ese es su trabajo, no el de Claude
- El monto de nómina cambia cada ciclo de formas complejas (comisiones, pago variable) y aún no has estabilizado los números — obtén números reales primero, luego usa esta skill
- Necesitas tomar decisiones de procesamiento de nómina (retención fiscal, deducciones de beneficios) — usa tu proveedor de nómina (Gusto, ADP, Paychex), no Claude

## Instrucciones

### Qué debes darle a Claude

Necesitas cinco cosas. Deberías saber todas de memoria o en menos de 5 minutos de tu banco y QuickBooks:

1. Saldo bancario actual (cuenta corriente de la que se tira tu nómina)
2. Próxima fecha de nómina y monto exacto de nómina
3. Facturas abiertas: quién te debe dinero, cuánto, y cuándo realisticamente esperas que cada una llegue
4. Facturas recurrentes vencidas en los próximos 30 días: renta, suscripciones de software, pagos a proveedores — montos y fechas de vencimiento
5. Gastos irregulares conocidos: compra de equipo, renovación de seguro, pago de impuestos

### Paso 1: Construye la línea de tiempo de flujo de caja de 30 días

Dile a Claude los cinco números. Pregunta:

„Construye una vista de flujo de caja de 30 días a partir de hoy. Muestra el saldo subiendo cuando llegan facturas y bajando cuando golpean facturas y nómina. Muéstrame el punto más bajo."

Claude produce una imagen de flujo de caja día a día y marca el día más apretado:

„El día 11 es tu punto más bajo — $3,800 en el banco antes de que llegue la factura de Peterson el día 13. Nómina el día 15 es $18,500. Tienes $2,200 de colchón si Peterson paga a tiempo. Si están 3 días atrasados, tienes una brecha de $14,300."

### Paso 2: Clasifica facturas vencidas por urgencia

Si tienes facturas vencidas o en riesgo de atraso, pídele a Claude que las clasifique. Di:

„Tengo tres facturas vencidas. Dime el orden en que debo perseguirlas y qué debo decir."

Claude las clasifica por impacto en dólares en la brecha de nómina, no solo por días vencidos. Una factura de $9,000 con 5 días de atraso importa más que una factura de $400 con 45 días de atraso si la nómina vence en 2 semanas.

Claude también redacta el alcance: un script de llamada de cobro directo para tu factura de mayor prioridad, y seguimientos por correo electrónico más cortos para el resto.

### Paso 3: Genera la lista de verificación de nómina

Pregunta a Claude: „¿Qué necesito hacer antes de que la nómina se procese el 15?"

Claude genera una lista de verificación adaptada a tu proveedor de nómina (Gusto, ADP, Paychex, QuickBooks Payroll). Elementos típicos:

- Confirma que las horas de empleados han sido enviadas y aprobadas
- Verifica que la información del nuevo empleado haya sido ingresada (si aplica)
- Confirma que la cuenta bancaria registrada tiene fondos suficientes antes de la fecha límite de procesamiento
- Envía nómina antes de la fecha límite del proveedor (generalmente 2 días hábiles antes de la fecha de pago)
- Descarga el resumen de nómina para tus registros

### Paso 4: Maneja un déficit

Si la línea de tiempo muestra una brecha, no adivines soluciones. Dile a Claude exactamente cuál es el déficit y solicita opciones. Claude sugerirá acciones específicas clasificadas por velocidad y costo:

- Qué factura específica llamar primero y qué decir para que la paguen esta semana
- Qué facturas se pueden retrasar sin penalización (la mayoría de proveedores permiten 5-7 días con una llamada)
- Si una línea de crédito comercial tiene sentido para esta brecha y monto específicos
- Qué gastos discrecionales retener hasta después de que se procese nómina

Claude no te dirá „explora opciones de financiamiento" en abstracto — dirá „retén la renovación de software de $1,400 hasta el 16 y llama a Peterson hoy. Eso cierra tu brecha."

### Cadencia mensual

Ejecuta esta skill una vez al mes, el primer lunes después del cierre del mes anterior. Toma 10 minutos y elimina sorpresas de flujo de caja. Combina con la skill Month-End Close para la imagen completa.

## Ejemplo

Dices: „Nómina es $18,500 el 15. Saldo bancario hoy es $22,000. Tengo tres facturas: $8,000 de Atlas Group vencida el 10, $4,500 de Reyes Construction vencida el 20, $6,000 de Johnson que está 30 días vencida y no han respondido. Facturas este mes: $2,200 renta el 1 (ya pagada), $800 software vencida el 8, $1,100 seguro vencida el 18."

Claude produce:

Línea de tiempo de flujo de caja:
- Hoy: $22,000
- Día 8: -$800 software → $21,200
- Día 10: +$8,000 Atlas Group → $29,200 (si es a tiempo)
- Día 15: -$18,500 nómina → $10,700
- Día 18: -$1,100 seguro → $9,600
- Día 20: +$4,500 Reyes → $14,100

Punto más apretado: Día 14, el día antes de nómina. Si Atlas Group paga a tiempo, tienes $21,200 entrando en nómina — cómodo. Si Atlas se retrasa 5+ días, caes a $13,200 antes de que golpee nómina, que aún se aclara pero deja $5,300 después de nómina antes de otro ingreso. Vigila a Atlas de cerca.

Johnson ($6,000 vencida): llama hoy. Claude redacta un script de llamada de 3 oraciones: „Hola, soy [nombre] de [empresa]. Estoy llamando sobre la factura de $6,000 de [fecha] que está 30 días vencida. ¿Puedes confirmar el estado y darme una fecha de pago que pueda registrar en mis expedientes?"

La nómina es segura mientras Atlas pague antes del 13. Sin riesgo de déficit hoy — pero Johnson es el colchón. Recauda Johnson antes del 13 y tienes $27,200 entrando en nómina.
