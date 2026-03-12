# Guía de Branding HR Analytics — Textos y Colores para PPTX

Documento de referencia para desarrollar presentaciones (PowerPoint, Google Slides, etc.) en concordancia con el sitio web **www.hranalytics.cl**.

---

## 0. Archivos que debes entregar a Cloude

Para que Cloude (o quien desarrolle tus PPTX) tenga toda la información, entrega estos archivos:

| Archivo | Ruta en el proyecto | Contenido |
|---------|-------------------|-----------|
| **Guía completa** | `docs/GUIA_BRANDING_PPTX.md` | Este documento (textos, colores, tipografías, casos, servicios) |
| **Contenido central** | `src/data/content.js` | Hero, trust bar, industrias, casos, testimonios, FAQ, footer, about |
| **Servicios detallados** | `src/data/extendedServices.js` | 14 servicios con why y metodología en 4 pasos |
| **Colores** | `tailwind.config.js` | Paleta exacta (primary #216a69, navy #0a1628, etc.) |
| **Logo teal** | `public/logo-teal.png` | Logo para fondos claros |
| **Logo blanco** | `public/logo-white.png` | Logo para fondos oscuros (header, slides navy) |
| **Imagen OG** | `public/images/og-share.png` | Imagen 1200×630 para compartir en redes |

**Lista de archivos para el ZIP (rutas relativas al proyecto):**
```
docs/GUIA_BRANDING_PPTX.md
src/data/content.js
src/data/extendedServices.js
tailwind.config.js
public/logo-teal.png
public/logo-white.png
public/images/og-share.png
```

**URL de referencia:** https://www.hranalytics.cl

---

## 1. Colores corporativos

### Paleta principal

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Primary** | `#216a69` | Color principal de marca, botones, acentos, títulos destacados |
| **Primary Light** | `#2d8a88` | Variante clara, hover, elementos secundarios |
| **Primary Dark** | `#174D4D` | Botones hover, énfasis oscuro |

### Paleta secundaria

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Navy** | `#0a1628` | Header, fondos oscuros, texto sobre claro |
| **Navy Light** | `#132238` | Variante de navy para gradientes |

### Neutros

| Nombre | Hex | Uso |
|--------|-----|-----|
| **Gray 850** | `#1a1a1a` | Texto principal |
| **Gray 950** | `#0a0a0a` | Texto muy oscuro |
| **Blanco** | `#ffffff` | Fondos, texto sobre oscuro |

### Colores de estado (opcionales)

| Uso | Hex |
|-----|-----|
| Éxito / Positivo | `#10b981` |
| Advertencia | `#f59e0b` (amber) |
| Error / Peligro | `#ef4444` (red) |

### Para PowerPoint / Google Slides

- **Color de acento principal:** `#216a69`
- **Color de acento secundario:** `#2d8a88`
- **Fondo oscuro (header/slides de título):** `#0a1628`
- **Texto sobre fondo oscuro:** blanco `#ffffff`

---

## 2. Tipografías

| Uso | Fuente | Alternativa |
|-----|--------|-------------|
| **Títulos / Serif** | Libre Baskerville | Georgia |
| **Cuerpo / Sans** | DM Sans | System UI, Arial |

- **Google Fonts:** `Libre Baskerville`, `DM Sans`
- En PPTX: usar **Georgia** para títulos si Libre Baskerville no está disponible; **Arial** o **Calibri** para cuerpo.

---

## 3. Textos completos del sitio

### 3.1 Hero (Página de inicio)

- **Título:** Estrategia basada en datos para tomar mejores decisiones
- **Subtítulo:** Combinamos más de 18 años de experiencia corporativa con ciencia de datos avanzada. Transformamos la complejidad de RR.HH. en estrategias claras, medibles y ejecutables.
- **Tagline:** Consultoría boutique especializada en People Analytics, Compensaciones y Planificación Estratégica de Personas.
- **CTA principal:** Solicitar conversación
- **CTA secundario:** Ver servicios
- **Scroll:** SCROLL

### 3.2 Barra de confianza

- **Encabezado:** Nos respaldan
- **Items:**
  - 18+ — Años de experiencia del equipo en RR.HH.
  - 4 — Empresas líderes que confían en nosotros
  - 5 — Industrias con experiencia comprobada
  - MIT — Certificación en Data Analytics

### 3.3 Sección People Analytics

- **Eyebrow:** Cómo ayudamos a los clientes
- **Título:** People Analytics que impulsa el negocio
- **Cuerpo:** Los líderes de RR.HH. están llamados a tomar decisiones que impacten directamente los resultados del negocio. Para lograrlo, los datos deben traducirse en conocimiento accionable: una guía clara que conecte cada decisión de personas con los objetivos estratégicos de la organización.
- **CTA:** Conocer nuestros servicios
- **Enlaces:** Propuesta de valor | Nuestro enfoque

### 3.4 Servicios

- **Eyebrow:** Lo que hacemos
- **Título:** Servicios y metodologías
- **Intro:** Metodologías probadas para decisiones estratégicas en RR.HH.

#### Pilares y servicios (14 en total)

**I. ESTRATEGIA DE PERSONAS**
1. Planificación Estratégica de Personas — Strategic People Planning (SPP)
2. Alineamiento Estratégico para Equipos — Strategy Cascade & KPIs
3. Planificación de Sucesión y Fortaleza — Succession Plan Strength Assessment

**II. ANALÍTICA Y DATOS**
4. Paneles de Control KPI a la Medida — People Analytics Dashboards
5. Análisis Predictivo de Riesgo de Fuga — Flight Risk & Retention Analysis
6. Análisis de Equidad Salarial de Género — Equal Pay Analysis
7. Análisis de Ausentismo e Identificación de Focos — Absence & Focus Management
8. Proyección de Equilibrio de Género — Gender Balance Evolution

**III. COMPENSACIONES Y ESTRUCTURA**
9. Compensación Total, Incentivos y Presupuesto — Total Rewards & Budgeting
10. Diseño de Estructura Organizacional — Organizational Design
11. Modelos para Negociación Sindical — Labor Relations Analytics

**IV. DESARROLLO Y AUTOMATIZACIÓN**
12. Capacitación en SPP para HRBPs — SPP Training for HRBPs
13. Compromiso y Desempeño de Equipos — Engagement & Team Performance
14. Automatización de Procesos con Python — Data Pipelines para RR.HH.

#### Detalle completo por servicio (Why + Metodología 4 pasos)

**Servicio 1 — Planificación Estratégica de Personas**
- Why 1: La mayoría de las organizaciones planifican sus finanzas y su producción con años de anticipación, pero planifican a su gente con semanas de retraso. El resultado es predecible: vacantes críticas sin cubrir, estructuras que crecen sin dirección y decisiones de talento que se toman apagando incendios.
- Why 2: La Planificación Estratégica de Personas conecta directamente la estrategia del negocio con la gestión de personas. A través de la Metodología 4A (Adquirir, Ampliar, Adaptar y Automatizar), modelamos la oferta y demanda futura de talento, proyectamos brechas y entregamos un People Plan accionable basado en evidencia estadística, no en intuición.
- Pasos: 1) Diagnóstico con Gerencia — Comprendemos la estrategia de negocio y sus conductores. Sesión con Gerencia General y RR.HH. para identificar prioridades críticas y consolidar el Strategic Master Plan. 2) Segmentación de Fuerza Laboral — Procesamos datos históricos y segmentamos en Job Clusters con Python. 3) Mapa de Brechas Oferta/Demanda — Proyectamos curva 3-5 años, Mapa de Calor por cargo y unidad. 4) Hoja de Ruta con Metodología 4A — Qué talento adquirir, ampliar, adaptar y automatizar, con KPIs ejecutivos.

**Servicio 2 — Alineamiento Estratégico para Equipos**
- Why 1: Una estrategia brillante en papel puede fracasar en la ejecución si los equipos no la entienden, no saben cómo contribuir, o trabajan con KPIs desconectados de las prioridades reales del negocio.
- Why 2: El Alineamiento Estratégico traduce el Plan Maestro en lenguaje operativo, define qué deben hacer diferente cada área, equipo y jefatura, implementando indicadores de control que miden el avance en tiempo real.
- Pasos: 1) Captura de Prioridades Clave — 3-5 prioridades que deben bajar a los equipos. 2) Despliegue por Nivel Organizacional — Estratégico, táctico y operativo. 3) Plan por Área con KPIs — Prioridades, actividades y frecuencias de revisión. 4) Semáforo de Cumplimiento — Panel Rojo/Amarillo/Verde para revisión mensual.

**Servicio 3 — Planificación de Sucesión y Fortaleza**
- Why 1: La mayoría de los planes de sucesión ocultan riesgos: un mismo candidato como sucesor de tres posiciones, o posiciones críticas con cobertura de una sola persona.
- Why 2: Nuestro análisis cuantitativo destapa estos riesgos. Evaluamos cuán sólido es el plan, qué posiciones tienen riesgo de quedar vacantes, y cómo fortalecer el pipeline con equilibrio de género.
- Pasos: 1) Mapa de Posiciones de Alto Impacto. 2) Readiness y Talento Duplicado. 3) Cruce Desempeño-Potencial. 4) Plan de Acción por Posición.

**Servicio 4 — Paneles de Control KPI a la Medida**
- Why: Los datos de RR.HH. existen pero están dispersos y nadie los mira sistemáticamente. Transformamos datos estáticos en visibilidad dinámica con paneles ejecutivos.
- Pasos: 1) KPIs por nivel (ejecutivo, táctico, operativo). 2) Limpieza e integración de datos. 3) Visualización para decisiones. 4) Validación y acompañamiento mensual.

**Servicio 5 — Análisis Predictivo de Riesgo de Fuga**
- Why: El costo de perder talento clave rara vez aparece en reportes. La mayoría de salidas se podían anticipar. Usamos Machine Learning para identificar quiénes tienen mayor probabilidad de salida voluntaria.
- Pasos: 1) Variables históricas (antigüedad, compensación, desempeño). 2) Algoritmos de Supervivencia en Python. 3) Score individual de riesgo. 4) Palancas de acción por perfil.

**Servicio 6 — Análisis de Equidad Salarial de Género**
- Why: La brecha salarial ya no es solo reputacional, es requisito legal. Controlamos estadísticamente factores legítimos para determinar si el género influye injustificadamente.
- Pasos: 1) Variables legítimas a controlar. 2) Regresión estadística por género. 3) Focos de mayor inequidad. 4) Ajustes con impacto presupuestario.

**Servicio 7 — Análisis de Ausentismo e Identificación de Focos**
- Why: El ausentismo es uno de los costos más invisibles. Combinamos análisis detallado con Matriz de Gestión Organizacional para priorizar intervenciones.
- Pasos: 1) Costo real en horas y salarios. 2) Focos por urgencia e impacto. 3) Patrones predictivos con Python. 4) Dashboard semaforizado de acción.

**Servicio 8 — Proyección de Equilibrio de Género**
- Why: Fijar metas sin modelar cómo alcanzarlas es solo declaración de intenciones. Nuestra herramienta proyecta la evolución bajo distintas tasas de ingreso, egreso y promoción.
- Pasos: 1) Composición por nivel y función. 2) Escenarios de ingreso y egreso. 3) Acción de mayor impacto matemático. 4) Herramienta de ajuste en tiempo real.

**Servicio 9 — Compensación Total, Incentivos y Presupuesto**
- Why: Decisiones sin respaldo generan sobrepagar sin retener o subpagar y perder talento. Diseñamos modelos de Total Rewards con Matriz de Decisión.
- Pasos: 1) Diagnóstico salarial y de bonos. 2) Benchmark + desempeño interno. 3) Bono conectado a drivers del negocio. 4) Estructura con simulación financiera.

**Servicio 10 — Diseño de Estructura Organizacional**
- Why: Capas innecesarias y equipos fragmentados generan ineficiencia. Analizamos con datos si la estructura es la más eficiente para el volumen de operación.
- Pasos: 1) Variables operacionales críticas. 2) Escenarios con Span of Control. 3) Eficiencia vs. estructura actual. 4) Estructura óptima con hoja de ruta.

**Servicio 11 — Modelos para Negociación Sindical**
- Why: Una negociación mal preparada cuesta millones. Simulamos impacto presupuestario plurianual de reajustes, bonos y beneficios.
- Pasos: 1) Estructura del grupo negociador. 2) Simulador de costo a 3-5 años. 3) Posición empresa vs. sindicato. 4) Actualización en mesa en tiempo real.

**Servicio 12 — Capacitación en SPP para HRBPs**
- Why: La SPP solo genera valor cuando el equipo puede ejecutarla de forma autónoma. Formamos a HRBPs con herramientas prácticas.
- Pasos: 1) Contenidos adaptados a tu industria. 2) Metodología 4A y oferta/demanda. 3) Lectura de Heat Maps y brechas. 4) Simulación de talleres con líderes.

**Servicio 13 — Compromiso y Desempeño de Equipos**
- Why: Las encuestas anuales llegan demasiado tarde. Implementamos Engagement Check-ins y Team Performance Assessments para señales de alerta tempranas.
- Pasos: 1) Check-ins adaptados al contexto. 2) Cómo conducir la conversación. 3) 22 ítems en 4 dimensiones. 4) Informe con tendencias y prioridades.

**Servicio 14 — Automatización de Procesos con Python**
- Why: El valor de RR.HH. está en su capacidad estratégica, no en consolidar Excel. Pipelines automatizados (ETL) reducen errores a cero.
- Pasos: 1) Tareas manuales de mayor costo. 2) Flujos HRIS-ERP y reglas de negocio. 3) Scripts ETL automatizados. 4) Capacitación al equipo técnico.

### 3.5 Industrias

- **Título:** Industrias
- **Subtítulo:** Experiencia en tu sector
- **Intro:** Acompañamos a organizaciones de distintos sectores en su transición hacia decisiones de personas basadas en datos.

| Industria | Descripción | Caso preview |
|-----------|-------------|--------------|
| Minería | Retención de segmentos críticos, planificación de dotación y análisis de span of control. | Reducción de rotación en supervisores |
| Agroindustria | Diagnóstico organizacional, eficiencia estructural y People Analytics para operaciones complejas. | Optimización de estructura y costos |
| Consumo masivo | Planificación estratégica de fuerza laboral regional, compensaciones y planificación estratégica LATAM. | Planificación multi-país |
| Banca y servicios | Modelos de retención, dashboards ejecutivos y gobierno de datos de personas. | Decisiones de talento basadas en datos |
| Retail | Análisis de productividad, ausentismo y diseño de estructuras comerciales. | Eficiencia y métricas de gestión |

### 3.6 Reconocimiento (Clientes)

- **Título:** Reconocimiento
- **Subtítulo:** Han confiado en nosotros
- **Descripción:** Empresas líderes que avalan nuestra experiencia en People Analytics
- **Clientes:** Collahuasi, CMP, Westfalia Fruit, Tarragona

### 3.7 Casos de impacto

- **Título:** Casos de impacto
- **Subtítulo:** Resultados en proyectos de People Analytics
- **Descripción:** Proyectos realizados con metodologías probadas. Clientes bajo confidencialidad.
- **Aviso confidencialidad:** Casos basados en proyectos reales. Nombres, datos y cifras fueron modificados para proteger la confidencialidad. Los resultados fueron cambiados; la metodología aplicada se mantiene intacta.
- **CTA:** Ver todos los casos, análisis técnico y testimonios

**Casos completos (contexto + solución + métricas):**

**Caso 1 — Reducción de rotación en segmento crítico** (Minería)
- Contexto: Alta rotación en supervisores de operaciones generaba inestabilidad en turnos y sobrecarga en equipos, con impacto en continuidad operacional y clima laboral.
- Solución: Modelo predictivo de riesgo de rotación y plan de retención diferenciado por segmento.
- Métricas: -18% rotación en 12 meses | 23% ahorro vs costo de reemplazo

**Caso 2 — Planificación estratégica regional LATAM** (Consumo masivo)
- Contexto: Necesidad de proyectar dotación y capacidades clave en la región para los próximos 4 años, con visibilidad comparable entre países y áreas.
- Solución: Strategic Workforce Planning con análisis histórico de rotación, proyección en tres escenarios (sin acción, plan parcial, plan completo), mapa de riesgo competencias y recomendaciones priorizadas.
- Métricas: 24% rotación promedio global | 8 líderes entrevistados | 4 áreas evaluadas | 4 años de proyección

**Caso 3 — Medición integral del impacto de la capacitación** (People Analytics)
- Contexto: Más de 15 informes de capacitación independientes sin visión consolidada. No podían responder si la inversión generaba aprendizaje real ni cambio de conducta.
- Solución: Consolidación y análisis de más de 40.000 registros en tres niveles (satisfacción, aprendizaje, transferencia) con estadística descriptiva, inferencial y correlacional.
- Métricas: 90% tasa de satisfacción | 40 Mil registros analizados | 3 niveles de medición

**Caso 4 — Plan estratégico 2026 definido junto al equipo ejecutivo** (Alineamiento Estratégico)
- Contexto: Estrategia a nivel macro sin mecanismos de ejecución: prioridades no traducidas en actividades medibles, sin accountability ni sistema de seguimiento.
- Solución: Taller ejecutivo de dos jornadas: (1) revisión y cierre del plan anterior, (2) mapeo de comportamientos habilitadores/bloqueadores, (3) RoadMap 2026 con 89 iniciativas en tres equipos, (4) consolidación con matriz Impacto/Viabilidad/Urgencia.
- Entregable: 4 pilares, 10 objetivos estratégicos, 30 actividades claves en 3 niveles (estratégico, unidad de negocio, transversales), con metas, KPIs, unidad líder y frecuencia de seguimiento.
- Métricas: 30 actividades claves definidas | 10 objetivos estratégicos
- Resultados detallados: 4 pilares (Rentabilidad & Eficiencia, Cliente & Marca, Personas & Cultura, Sostenibilidad & Compliance); 12 actividades estratégicas, 12 tácticas, 6 transversales; sistema de seguimiento con dos ciclos (operativo y ejecutivo).

**Caso 5 — Diagnóstico estratégico de personas para gerencia en transformación** (Workforce Planning)
- Contexto: Organización en cambio con foco estratégico difuso: equipos sin claridad, decisiones lentas sin respaldo de datos, roles poco definidos.
- Solución: Diagnóstico integrado: levantamiento cualitativo (entrevistas), cuantitativo (cuestionarios) y análisis de brechas por perfil de cargo.
- Métricas: 10 líderes participantes | 20h horas de levantamiento | 24 perfiles analizados | 68% coincidencia en brechas clave

**Caso 6 — Rediseño del modelo de incentivos variable para líderes de punto de venta** (Compensaciones)
- Contexto: Modelo vigente con 5% lineal sobre utilidad mensual generaba pagos desproporcionados sin mejora en desempeño. Costos insostenibles, sin diferenciación.
- Solución: Auditoría sobre 610+ registros mensuales, escala escalonada decreciente con 4 variables de desempeño (ventas, calidad, costos, servicio), simulación de impacto y benchmarking.
- Métricas: 610+ registros analizados | 62% dotación beneficiada | 9% ahorro estimado | 5 variables de desempeño

**Preguntas del cliente (filtros):**
- ¿Cómo reducir la rotación en personal clave?
- ¿Cómo planificar la dotación a futuro?
- ¿La capacitación genera impacto real?
- ¿Cómo hacer que la estrategia se ejecute?
- ¿Cómo decidir con respaldo de datos?
- ¿Cómo alinear incentivos con el desempeño?

### 3.8 Testimonios / Recomendaciones

- **Eyebrow:** Recomendaciones
- **Título:** Testimonios de clientes sobre proyectos de People Analytics
- **Descripción:** Testimonios de clientes, jefaturas regionales y referentes en People Analytics que avalan mi trabajo en proyectos estratégicos de RRHH, compensaciones y analítica de personas.
- **Filtros:** Todos | Clientes | Jefaturas | Colegas senior

**Testimonios (citas):**
- Juvenal Soto (Westfalia Fruit): *"Gracias a su capacidad de análisis, metodología de trabajo, dedicación y compromiso, Cristian nos entregó un diagnóstico certero y detallado del negocio, facilitando el rol de RR.HH. para la implementación de los siguientes pasos."*
- Milan Marinovic (CMP): *"Cristian tiene una mirada transversal de los procesos de gestión de personas, lo que le permite conectar la estrategia E2E de RR.HH. con acciones tácticas y operativas. Como consultor es un partner comprometido, flexible y con mucho empuje."*
- Mohamed Bolteya (Nestlé): *"Cristian entrega consistentemente resultados de alta calidad e impulsa nuevas iniciativas de alto impacto. Su experiencia en People Analytics fue clave para decisiones de compensaciones basadas en datos."*
- Fabricio Pavarin (Nestlé): *"Es una persona muy dedicada, responsable y confiable, con foco pragmático y orientación al negocio. Lideró Strategic Workforce Planning para varios países de Latinoamérica con excelentes resultados."*
- Ralf Buechsenschuss (Nestlé): *"Cristian ejecuta proyectos al más alto nivel, cumpliendo expectativas a nivel país y regional. Es un experto y referente en People Analytics y planificación estratégica."*
- Rodrigo Batlle (Tarragona): *"HR Analytics logró simplificar y ordenar todos nuestros índices, uniendo a las distintas gerencias para ser eficientes en la creación de nuestro plan estratégico 2025."*
- Gonzalo Zeiss (Nestlé): *"Cristian entiende cómo la data de RR.HH. agrega valor al negocio. Es capaz de influir y movilizar sin autoridad formal, liderando mejoras en procesos de gestión de personas."*
- Ingrid Godoy (Collahuasi): *"El análisis fue riguroso y nos entregó información clara y útil para mejorar el diseño de nuestros programas y la estrategia para implementarlos. Recomendaría plenamente su trabajo."*

### 3.9 Propuesta de valor

- **Título:** Propuesta de valor
- **Subtítulo:** ¿Por qué HR Analytics?
- **Items:**
  1. **Estrategia basada en evidencia** — Conectamos los datos con los objetivos del negocio para tomar decisiones más informadas y oportunas.
  2. **Modelos a la medida** — Diseñamos soluciones adaptadas a la realidad, madurez y necesidades de cada organización.
  3. **Experiencia multiindustria** — Minería, banca, retail, agroindustria, alimentos y consumo masivo. Conocemos los desafíos de tu industria.
  4. **Impacto en el negocio** — Desde modelos predictivos en Python hasta dashboards ejecutivos, cada entregable está diseñado para generar impacto medible en retención, compensaciones y planificación estratégica.

### 3.10 Metodología / Enfoque

- **Título:** Metodología
- **Subtítulo:** Nuestro enfoque
- **Cita:** Crear impacto en el negocio a través de decisiones de personas mejor fundamentadas.
- **Pasos:**
  1. **Diagnóstico a medida** — Cada proyecto parte por entender la realidad, la cultura y el nivel de madurez analítica de tu organización.
  2. **Metodología iterativa** — Trabajamos en ciclos de diagnóstico, modelado y validación.
  3. **Impacto accionable** — El resultado no es un informe: es una decisión mejor fundamentada.

### 3.11 Insights

- **Título:** Nuestra perspectiva
- **Subtítulo:** Insights sobre People Analytics
- **Intro:** Puntos de vista sobre tendencias, datos y toma de decisiones en Recursos Humanos.
- **Items:**
  - **Datos + juicio humano** (Estrategia) — La tecnología amplifica lo que ya hacemos bien. El valor diferencial sigue siendo la empatía, la ética y el juicio estratégico.
  - **People Analytics en la era de la IA** (Tendencias) — Los modelos predictivos permiten anticipar, no solo describir. El reto está en conectar hallazgos con acciones concretas.
  - **De reportes a decisiones** (Metodología) — El salto no es tener más dashboards, sino responder preguntas de negocio que impulsen cambios reales.

### 3.12 Liderazgo / Sobre nosotros

- **Título:** Consultora Boutique
- **Subtítulo:** Liderazgo
- **Subtítulo 2:** La persona detrás del método
- **Nombre:** Cristian Cornejo R.
- **Rol:** Fundador y consultor
- **Empresa:** HR Analytics
- **Ubicación:** Chile · 18+ años en RR.HH.
- **Sobre la firma:** Consultora boutique especializada en People Analytics, con más de 3 años en el mercado y 18 años de experiencia acumulada en gestión de personas.
- **Cita:** En la era de la IA y la analítica avanzada, el valor diferencial de RR.HH. sigue siendo humano: empatía, ética y juicio estratégico. La tecnología amplifica lo que ya hacemos bien; esa es la esencia de una estrategia basada en datos al servicio de la toma de decisiones.
- **Especialidades:** People Analytics, Compensaciones, Strategic Workforce Planning, Modelos Predictivos, Python & Data, Planificación Estratégica, Negociación Sindical.
- **Empresas consultor:** CMP · Tarragona · Westfalia Fruit · Collahuasi

**Experiencia (texto completo):**
- Más de 18 años liderando analítica de personas, compensaciones y planificación estratégica en AGROSUPER, BANCOESTADO y NESTLÉ. En Nestlé como Gerente de Compensaciones y Beneficios y People Analytics Regional LATAM, gestionando modelos de compensación, bonos, revisiones salariales y movilidad internacional para Chile y la región.
- Como consultor independiente: asesorías en minería, alimentos, banca, retail y agroexportación. Modelos predictivos, tableros ejecutivos y gobierno de datos. Python para proyecciones de dotación, predicción de rotación, segmentación de talento y simulaciones. Empresas: CMP, Tarragona, Westfalia Fruit, Collahuasi.

**Timeline:**
- 2023–HOY: HR Analytics SpA — Consultor independiente. People Analytics en minería, alimentos, banca, retail, agroexportación.
- 2015–2023: NESTLÉ — Gerente Compensaciones & People Analytics LATAM.
- 2009–2015: BANCOESTADO — Líder Control de Gestión RRHH.
- 2007–2009: AGROSUPER — Analista Estudios RR.HH.

**Formación:**
- Data Analytics Certificate — MIT, Boston, 2019
- Magíster en Administración de Empresas (MBA) — Universidad Pompeu Fabra, Barcelona, 2015–2017
- Magíster en Desarrollo Organizacional — Universidad Diego Portales, Santiago, 2012–2014
- Ingeniero Comercial — Universidad de Valparaíso, 2002–2006
- English Language Certificate — University of Guelph, Ontario, 2014
- Beca de Intercambio Ingeniería Comercial FEN — Universidad de Chile, Santiago, 2005–2006

**Industrias con nivel de experiencia:** Minería (Alta) | Agroindustria (Media-Alta) | Consumo masivo (Media-Alta) | Banca/Finanzas (Media) | Retail (Media)

### 3.13 CTA final

- **Título:** Tu próximo proyecto de People Analytics comienza con una conversación
- **Subtítulo:** Cuéntanos el desafío. Diseñamos una solución a la medida de tu organización.
- **Botón:** Agendar conversación
- **Enlace:** Agenda directamente en el calendario
- **Secundario:** Ver propuesta de valor

### 3.14 Contacto

- **Eyebrow:** Contacto
- **Título:** Contáctanos
- **Descripción:** Escríbenos y te responderemos a la brevedad
- **Formulario:** Nombre, Email, Empresa (opcional), Mensaje
- **Placeholders:** Tu nombre | tu@email.com | Tu empresa | ¿En qué podemos ayudarte?
- **Botón:** Enviar
- **Éxito:** Gracias por tu mensaje — Te contactaremos en 24 a 48 horas hábiles.
- **Fallback:** Estamos aquí para responder sus consultas. Puede contactarnos directamente por WhatsApp o correo electrónico.
- **Acciones:** Escribir por WhatsApp | Enviar correo | Agendar una reunión

### 3.15 FAQ

- **Eyebrow:** Preguntas frecuentes
- **Título:** Preguntas frecuentes sobre People Analytics
- **Intro:** Qué puedes esperar de un proyecto de People Analytics, cómo trabajamos y qué necesitas tener listo para comenzar.
- **CTA:** ¿Aún tienes preguntas? — Si no encuentras tu respuesta aquí, conversemos y revisamos tu caso específico.

**Preguntas y respuestas (texto completo):**

1. **¿Qué es People Analytics (HR Analytics) y en qué se diferencia de un reporte tradicional de RR.HH.?**  
   People Analytics combina datos, estadística y conocimiento de negocio para responder preguntas clave sobre personas: rotación, desempeño, planificación de dotación. No se trata solo de mostrar indicadores, sino de explicar por qué ocurren las cosas y qué decisiones concretas puedes tomar a partir de esa información.

2. **¿Qué tipo de problemas se pueden abordar con un proyecto de People Analytics?**  
   Abordamos temas como rotación y retención de talento, planificación de dotación, ausentismo, productividad, diseño organizacional, compensaciones, focalización de incentivos y experiencia del colaborador, siempre conectando los resultados con impacto en el negocio.

3. **¿Necesito tener mis datos en perfecto estado para comenzar?**  
   No. Partimos con un diagnóstico de las fuentes actuales (Excel, ERP, sistemas de RR.HH., encuestas) y definimos un roadmap realista. Muchas veces el primer valor viene de ordenar, limpiar y conectar los datos que ya existen en tu organización.

4. **¿Cómo es el proceso de trabajo típico?**  
   Comenzamos con un diagnóstico y la definición de preguntas de negocio. Luego construimos modelos y dashboards de forma iterativa, validamos hallazgos con tu equipo y dejamos capacidades instaladas para que puedas operar las soluciones sin depender permanentemente de consultoría.

5. **¿Con qué herramientas y tecnologías trabajan?**  
   Nos adaptamos al ecosistema de tu organización: Excel, Power BI, SQL y plataformas de RR.HH. como SAP, SuccessFactors u otras. El foco está en soluciones que tu equipo pueda usar y mantener, sin depender de herramientas que después nadie utiliza.

6. **¿En qué tipo de organizaciones tienen experiencia?**  
   Hemos trabajado con empresas de minería, retail, agroindustria, sector financiero, alimentos y bebidas, entre otras. Ajustamos la metodología al contexto cultural y tecnológico de cada organización, tanto en Chile como en otros países de Latinoamérica.

7. **¿Qué tamaño de empresa atienden y cuánto dura un proyecto?**  
   Acompañamos tanto a empresas grandes como a organizaciones medianas que quieren dar sus primeros pasos en People Analytics. Un proyecto típico puede ir desde algunas semanas (diagnóstico y quick wins) hasta varios meses cuando se requiere un modelo más integral o acompañamiento continuo.

8. **¿Cómo se mide el éxito de un proyecto de People Analytics?**  
   Definimos indicadores de éxito desde el inicio: por ejemplo, reducción de rotación en segmentos críticos, mejora en tiempos de contratación, precisión en la planificación de dotación o mejor focalización de acciones de desarrollo. Cada entregable se conecta con decisiones concretas que tu equipo puede tomar.

### 3.16 Footer

- **Tagline:** Estrategia basada en datos para la toma de decisiones en Recursos Humanos
- **Región:** Chile · Latinoamérica
- **Newsletter:** Recibe insights sobre People Analytics
- **Legal:** Privacidad | Términos de uso
- **Copyright:** HR Analytics. Todos los derechos reservados.

### 3.17 Navegación principal

- Inicio | Servicios | Enfoque | Clientes | Industrias | Liderazgo | Casos | Testimonios | Contacto

---

## 4. Datos de contacto (para slides)

- **Sitio:** www.hranalytics.cl
- **Email:** cristian.cornejo@hranalytics.cl
- **Teléfono:** +56 9 4023 2911
- **Dirección:** Serrano 63, Oficina 66, Santiago, Chile
- **LinkedIn:** linkedin.com/in/cristianhranalytics/

---

## 5. Recomendaciones para PPTX

1. **Fondo de portada:** Navy `#0a1628` con logo en blanco.
2. **Títulos de slide:** Primary `#216a69` o Navy `#0a1628`.
3. **Acentos:** Usar Primary para viñetas, iconos y CTAs.
4. **Consistencia:** Mantener la misma paleta en todas las diapositivas.
5. **Tipografía:** Títulos en serif (Georgia/Libre Baskerville), cuerpo en sans (Arial/DM Sans).
6. **Espaciado:** Generoso, estilo consultoría (similar al sitio).

---

*Documento generado para uso con herramientas de diseño (Cloude, Canva, PowerPoint, etc.) en concordancia con www.hranalytics.cl*
