# Organizador de Impuestos

## Cuándo activar
- Fin de un trimestre — el pago de impuesto estimado vence y necesitas tus números juntos
- Tu contador te pide documentos y no estás seguro qué recopilar
- Te estás preparando para una reunión de revisión fiscal y quieres llegar organizado
- Compraste equipo significativo, comenzaste a trabajar desde casa o cambiaste cómo usas tu vehículo — y quieres asegurarte de que capturas las deducciones correctas

## Cuándo NO usar
- Necesitas asesoramiento fiscal — Claude organiza tus números y documentos, no da asesoramiento fiscal ni calcula tu pasivo fiscal
- El trimestre acaba de comenzar y tienes menos de 3 meses de transacciones para revisar — espera a tener un trimestre completo
- Tienes una situación compleja con múltiples entidades, socios o ingresos internacionales — trabaja directamente con un CPA desde el principio

## Instrucciones

### Paso 1: Cuéntale a Claude tu situación una vez

Comienza cada trimestre fiscal dándole a Claude tu perfil comercial. Lo haces una vez y lo actualizas cuando algo cambia:

„Soy un único propietario (Schedule C), con base en Texas, sin impuesto estatal sobre la renta. Dirijo un negocio de consultoría. Los ingresos son aproximadamente $180,000 por año. Uso mi auto alrededor del 40% para negocios, tengo una oficina en casa de 200 metros cuadrados de 1,500 en total, y compré una laptop de $2,800 en marzo. Mis principales categorías de gastos son contratistas, software, viajes y desarrollo profesional."

Claude confirmará tus categorías de deducciones y te dirá exactamente qué documentación necesitas para cada una. Guardas esta lista y la reutilizas cada trimestre.

### Paso 2: Genera tu lista de control de recibos personal

Pídele a Claude:

„Basado en mi situación, dame una lista de cada documento que necesito recopilar para los impuestos de este trimestre."

Claude produce una lista de verificación adaptada a tu situación específica — no una lista genérica. Para el ejemplo anterior, incluiría:

- Registro de millaje para viajes de negocios (fecha, destino, propósito, millas)
- Oficina en casa: sin acción requerida si el metraje es estable — solo confirma que nada cambió
- Laptop: localiza el recibo de compra de marzo — necesario para deducción Section 179
- Pagos a contratistas sobre $600: confirma que los W-9s están en el archivo para cada uno
- Suscripciones de software: extrae estados de cuenta para cualquiera que no haya sido contabilizado en QuickBooks
- Desarrollo profesional: recibos de cursos, libros, conferencias

### Paso 3: Categoriza tus transacciones

Exporta tu lista de transacciones de QuickBooks o tu banco y pégala en Claude. Pídele:

„Categoriza cada una de estas transacciones en categorías de gasto reconocidas por el IRS. Marca todo lo que podría ser deducible que aún no he categorizado."

Claude organiza transacciones en categorías: Publicidad, Honorarios de Contratistas, Educación, Equipo, Comidas (50% deducible), Suministros de Oficina, Servicios Profesionales, Software, Viajes, Servicios Públicos, Vehículo.

También marca artículos que podrías haber pasado por alto — por ejemplo, comisiones bancarias, comisiones de procesamiento de PayPal, LinkedIn Premium, renovaciones de software anuales pagadas en una suma.

### Paso 4: Resume cada categoría de deducción principal

Para cada categoría con gasto significativo, pídele a Claude que escriba un resumen de un párrafo:

„Escribe un resumen de mi deducción de vehículo para este trimestre."

Claude produce: „Uso del vehículo: 3,200 millas comerciales conducidas este trimestre según tu registro. Con la tarifa de millaje estándar 2025 de $0.70 por milla, eso es una deducción de $2,240. Alternativamente, si has rastreado gastos reales (gasolina, seguro, mantenimiento), puedes calcular la porción de 40% de negocios. El millaje estándar es más simple y probablemente más alto para ti — confirma con tu CPA qué método usar para todo el año."

Estos resúmenes van directamente en tu documento de entrega CPA.

### Paso 5: Construye el paquete de entrega CPA

Pídele a Claude:

„Compila un resumen fiscal trimestral de una página que pueda enviar a mi CPA. Incluye todos los números, categorías, preguntas que tengo, y una lista de recibos que aún necesito localizar."

Claude produce un documento estructurado:

- Resumen comercial (tipo de entidad, trimestre, ingreso total)
- Categorías de gastos con montos en dólares
- Notas de deducciones (vehículo, oficina en casa, equipo)
- Recibos confirmados en mano
- Recibos aún necesarios (con montos estimados)
- Preguntas para CPA (3-5 preguntas específicas, no vagas)

Envía esto a tu CPA antes de la reunión. La reunión se convierte en una revisión de 30 minutos en lugar de una sesión de recopilación de datos de 90 minutos.

### Cadencia trimestral

Ejecuta esta skill en la primera semana después de cada cierre trimestral:
- Q1 cierra 31 de marzo — ejecuta la primera semana de abril
- Q2 cierra 30 de junio — ejecuta la primera semana de julio
- Q3 cierra 30 de septiembre — ejecuta la primera semana de octubre
- Q4 cierra 31 de diciembre — ejecuta la primera semana de enero

Tiempo estimado: 45-60 minutos el primer trimestre, 20-30 minutos una vez que tengas un sistema. Compara con 8-15 horas de organización manual.

## Ejemplo

Dices: „Soy un único propietario, negocio de consultoría. Usé mi auto alrededor del 40% para negocios este trimestre — conduje aproximadamente 3,100 millas en total, entonces aproximadamente 1,240 millas comerciales. Oficina en casa es 200 de 1,500 metros cuadrados. Compré una laptop de $2,800 en marzo. Los ingresos este trimestre fueron $44,500. Los gastos principales fueron $12,000 en contratistas, $1,800 en software, $940 en viajes, y miscelánea de oficina alrededor de $400."

Claude produce tu lista de control de deducciones:

Vehículo (tarifa de millaje estándar): 1,240 millas x $0.70 = deducción de $868 este trimestre. Requerido: registro de millaje con fecha, destino y propósito para cada viaje. ¿Sin registro aún? Claude te guía a través de su reconstrucción desde tu calendario.

Oficina en casa: 200/1,500 = 13.3% de gastos del hogar. Aplica ese porcentaje a la renta o interés de hipoteca, servicios públicos e internet. Requerido: pago de renta o hipoteca mensual, facturas de servicios públicos, factura de internet para el trimestre.

Laptop ($2,800): califica para deducción completa Section 179 en el año de compra. Requerido: recibo de compra de marzo. Pregunta para CPA: ¿tomar todo en Q1 o distribuir durante el año?

Contratistas ($12,000): confirma que W-9s están en el archivo para cada uno. Cualquiera pagado más de $600 necesita un 1099-NEC antes del 31 de enero. Requerido: lista de contratistas con nombres, direcciones y SSN o EIN.

Claude luego redacta la entrega CPA: ingreso total trimestral $44,500, gastos categorizados totales $15,140, deducciones estimadas $16,008 (incluyendo oficina en casa y vehículo). Tres preguntas marcadas para tu CPA: timing de Section 179 para laptop, método de cálculo de oficina en casa, si un contratista que cruzó $600 este trimestre necesita un W-9 ahora o a fin de año.
