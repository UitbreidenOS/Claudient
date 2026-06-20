# 📂 Agente de Visión Multimodal
> El espacio de trabajo de producción canónico para un agente de visión autónomo capaz de analizar PDFs densos, extraer tablas complejas y razonar sobre diseños no estructurados.

📄 `vision-pipeline-brief.md` # Resumen canónico: Reglas de análisis de diseño, lógica de OCR de respaldo y estrategias de fragmentación
🧠 `memory.md`                # Memoria de sesión: Contexto dinámico para seguimiento de documentos multipágina
🤖 `CLAUDE.md`                # Reglas de operación: Instrucciones estrictas para preservar relaciones espaciales en texto extraído

## 📁 ingestion-engine/ (5 habilidades - Preprocesamiento de Documentos)
📄 `format-normalizer.md`     # Convierte diversas entradas (PDF, TIFF, HEIC) a PNGs de resolución estándar
📄 `layout-analyzer.md`       # Detección de cuadro delimitador • separa bloques de texto, tablas e imágenes
📄 `image-enhancer.md`        # Ajuste de contraste • preserva los colores originales de activos críticos (gráficos/pinturas)
📄 `pii-redactor.md`          # Lista negra visual • desenfoca campos sensibles antes de la transmisión de API de LLM
📄 `chunking-router.md`       # Divide PDFs de 100 páginas en lotes de procesamiento paralelo

## 📁 vision-workers/ (4 personas agente - Los Extractores)
📄 `ocr-specialist.md`        # Extracción de texto de alta precisión para escaneos densos y de baja calidad
📄 `table-parser.md`          # Reconstrucción de cuadrículas • genera Markdown o JSON estructural sin procesar
📄 `chart-reasoner.md`        # QA visual • extrae tendencias y puntos de datos de gráficos
📄 `signature-verifier.md`    # Detecta presencia y alineación espacial de firmas humanas

## 📁 data-normalization/ (3 habilidades - Estructuración de Salida)
📄 `json-schema-enforcer.md`  # Valida datos extraídos contra modelos Pydantic estrictos
📄 `confidence-scorer.md`     # Marca extracciones de baja confianza para revisión de humano en el bucle
📄 `spatial-reconstructor.md` # Fusiona fragmentos independientes en un orden de lectura cohesivo

## 📁 export-pipeline/ (3 habilidades - Sincronización Descendente)
📄 `database-commit.md`       # Inserta JSON estructurado en Postgres/MongoDB
📄 `vector-embedding.md`      # Envía texto procesado al almacén de vectores de canalización RAG
📄 `github-final-sync.md`     # Commits automatizados de conjuntos de datos validados en repositorios finales de GitHub

## 📁 evals/ (3 habilidades - Benchmarking de Canalización)
📄 `extraction-accuracy.md`   # Comparación de verdad fundamental con documentos de prueba conocidos
📄 `cost-optimizer.md`        # Seguimiento de gastos de tokens e imagenación por documento
📄 `hallucination-check.md`   # Garantiza que el agente no "inventó" datos no presentes en la imagen

---
**Archivos de Configuración**
⚙️ `docker-compose.yml`       # Configuraciones de nodos trabajadores y colas Redis
📦 `requirements.txt`         # Dependencias (PyMuPDF, OpenCV, Anthropic SDK)
