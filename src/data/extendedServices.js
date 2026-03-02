/**
 * Servicios extendidos con metodología, por qué, y referencias a casos/testimonios.
 * Catálogo Completo: 14 Servicios en 4 Pilares Estratégicos.
 */
export const extendedServices = [
  // ==========================================
  // PILAR I: ESTRATEGIA DE PERSONAS
  // ==========================================
  {
    id: 1,
    pillarKey: 'estrategia',
    order: 1,
    slug: 'planificacion-estrategica-personas',
    title: 'Planificación Estratégica de Personas',
    subtitle: 'Strategic People Planning (SPP)',
    image: '/images/services/s1.jpg',
    why: [
      'La mayoría de las organizaciones planifican sus finanzas y su producción con años de anticipación, pero planifican a su gente con semanas de retraso. El resultado es predecible, vacantes críticas sin cubrir, estructuras que crecen sin dirección y decisiones de talento que se toman apagando incendios.',
      'La Planificación Estratégica de Personas conecta directamente la estrategia del negocio con la gestión de personas. A través de la Metodología 4A (Adquirir, Ampliar, Adaptar y Automatizar), modelamos la oferta y demanda futura de talento, proyectamos brechas y entregamos un People Plan accionable basado en evidencia estadística, no en intuición.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Diagnóstico con Gerencia', icon: 'Target', desc: 'Comprendemos la estrategia de negocio y sus conductores (drivers). Sesión con Gerencia General y RR.HH. para identificar prioridades críticas y consolidar el Strategic Master Plan.' },
      { step: 'Paso 2', name: 'Segmentación de Fuerza Laboral', icon: 'Users', desc: 'Procesamos los datos históricos de RR.HH. y segmentamos la fuerza laboral en agrupaciones de habilidades (Job Clusters) utilizando Python para modelado predictivo.' },
      { step: 'Paso 3', name: 'Mapa de Brechas Oferta/Demanda', icon: 'TrendingDown', desc: 'Proyectamos la curva de Oferta versus Demanda para los próximos 3-5 años, entregando un Mapa de Calor de Brechas por cargo y unidad de negocio.' },
      { step: 'Paso 4', name: 'Hoja de Ruta con Metodología 4A', icon: 'Map', desc: 'Entregamos una hoja de ruta con la Metodología 4A: qué talento adquirir, qué ampliar, qué adaptar y qué automatizar, con KPIs ejecutivos de seguimiento.' }
    ],
    relatedTestimonialId: 'rec-fabricio',
    relatedCaseId: 2
  },
  {
    id: 2,
    pillarKey: 'estrategia',
    order: 2,
    slug: 'alineamiento-estrategico-equipos',
    title: 'Alineamiento Estratégico para Equipos',
    subtitle: 'Strategy Cascade & KPIs',
    image: '/images/services/s2.jpg',
    why: [
      'Una estrategia brillante en papel puede fracasar completamente en la ejecución si los equipos no la entienden, no saben cómo contribuir a ella, o trabajan con KPIs desconectados de las prioridades reales del negocio.',
      'El Alineamiento Estratégico traduce el Plan Maestro Estratégico en lenguaje operativo, define qué deben hacer diferente cada área, cada equipo y cada jefatura para contribuir directamente a los objetivos del negocio, implementando indicadores de control que miden el avance en tiempo real.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Captura de Prioridades Clave', icon: 'Compass', desc: 'Identificamos las 3-5 prioridades clave del negocio que deben bajar a los equipos, definiendo objetivos críticos y resultados esperados.' },
      { step: 'Paso 2', name: 'Despliegue por Nivel Organizacional', icon: 'GitBranch', desc: 'Descomponemos las prioridades en niveles: estratégico, táctico y operativo. Cada nivel recibe sus propios conductores e indicadores clave.' },
      { step: 'Paso 3', name: 'Plan por Área con KPIs', icon: 'Layout', desc: 'Diseñamos el plan por área conectando prioridades, actividades de los equipos y frecuencias de revisión definidas.' },
      { step: 'Paso 4', name: 'Semáforo de Cumplimiento', icon: 'BarChart2', desc: 'Validamos el plan y entregamos un panel de seguimiento con semáforos de cumplimiento (Rojo/Amarillo/Verde) para revisión mensual.' }
    ],
    relatedTestimonialId: 'rec-rodrigo-batlle',
    relatedCaseId: 1
  },
  {
    id: 3,
    pillarKey: 'estrategia',
    order: 3,
    slug: 'planificacion-sucesion',
    title: 'Planificación de Sucesión y Fortaleza',
    subtitle: 'Succession Plan Strength Assessment',
    image: '/images/services/s3.jpg',
    why: [
      'La mayoría de los planes de sucesión se ven bien en papel, pero ocultan riesgos críticos, un mismo candidato aparece como sucesor de tres posiciones, o las posiciones más críticas tienen cobertura de una sola persona.',
      'Nuestro análisis cuantitativo destapa estos riesgos. Evaluamos cuán sólido es realmente el plan de sucesión, qué posiciones tienen riesgo de quedar vacantes, y cómo fortalecer el pipeline de talento de forma proactiva y con equilibrio de género.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Mapa de Posiciones de Alto Impacto', icon: 'MapPin', desc: 'Identificamos posiciones de alto impacto según criterios de reemplazabilidad y criticidad, construyendo el mapa base de sucesión.' },
      { step: 'Paso 2', name: 'Readiness y Talento Duplicado', icon: 'ShieldCheck', desc: 'Desagrupamos candidatos duplicados y evaluamos la preparación (readiness) mediante tiempo en posición y desempeño.' },
      { step: 'Paso 3', name: 'Cruce Desempeño-Potencial', icon: 'Grid', desc: 'Cruzamos desempeño y potencial para clasificar sucesores, identificando qué talento retener con urgencia y qué planes acelerar.' },
      { step: 'Paso 4', name: 'Plan de Acción por Posición', icon: 'Network', desc: 'Entregamos el mapa fortalecido con acciones por posición: perfiles a desarrollar, a contratar, y estrategias de mitigación de riesgo.' }
    ],
    relatedTestimonialId: 'rec-juvenal',
    relatedCaseId: 2
  },

  // ==========================================
  // PILAR II: ANALÍTICA Y DATOS
  // ==========================================
  {
    id: 4,
    pillarKey: 'analitica',
    order: 1,
    slug: 'paneles-kpi-analitica-rrhh',
    title: 'Paneles de Control KPI a la Medida',
    subtitle: 'People Analytics Dashboards',
    image: '/images/services/s4.jpg',
    why: [
      'Los datos de RR.HH. existen en casi todas las organizaciones, el problema es que están dispersos, sin limpiar, y nadie los está mirando de forma sistemática para tomar decisiones.',
      'Transformamos datos estáticos en visibilidad dinámica. Desarrollamos paneles ejecutivos que consolidan la información y la conectan directamente con los indicadores del negocio, entregando a sus líderes una visión clara y actualizada para decisiones oportunas.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'KPIs por Nivel Organizacional', icon: 'ClipboardList', desc: 'Definimos los indicadores clave (KPIs) por nivel organizacional: ejecutivo, táctico y operativo, diseñando el modelo de datos.' },
      { step: 'Paso 2', name: 'Limpieza e Integración de Datos', icon: 'Code2', desc: 'Limpiamos, validamos e integramos los datos históricos en un modelo estructurado, automatizando el proceso de actualización.' },
      { step: 'Paso 3', name: 'Visualización para Decisiones', icon: 'LayoutDashboard', desc: 'Construimos visualizaciones enfocadas en la toma de decisiones: dotación, equilibrio de género, capacitación e indicadores por unidad.' },
      { step: 'Paso 4', name: 'Validación y Acompañamiento', icon: 'Rocket', desc: 'Validamos el panel, entregamos documentación y ofrecemos acompañamiento mensual para ajuste de indicadores y evolución continua.' }
    ],
    relatedTestimonialId: 'rec-rodrigo-batlle',
    relatedCaseId: 1
  },
  {
    id: 5,
    pillarKey: 'analitica',
    order: 2,
    slug: 'analisis-predictivo-riesgo-fuga',
    title: 'Análisis Predictivo de Riesgo de Fuga',
    subtitle: 'Flight Risk & Retention Analysis',
    image: '/images/services/s5.jpg',
    why: [
      'El costo de perder talento clave rara vez aparece en los reportes financieros, pero impacta directamente en la curva de aprendizaje y productividad. Lo más costoso es que la mayoría de estas salidas se podían anticipar.',
      'Utilizamos Machine Learning para identificar, antes de que ocurra, qué colaboradores tienen mayor probabilidad de salida voluntaria. Transformamos la retención en una gestión proactiva, interviniendo con las personas y roles correctos basados en evidencia predictiva.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Variables Históricas de la Fuerza Laboral', icon: 'Database', desc: 'Integramos variables históricas de la fuerza laboral: antigüedad, compensación relativa, evaluaciones de desempeño y movimientos internos.' },
      { step: 'Paso 2', name: 'Algoritmos de Supervivencia en Python', icon: 'Brain', desc: 'Aplicamos Análisis de Supervivencia y algoritmos predictivos en Python para identificar los factores que más impulsan la salida voluntaria.' },
      { step: 'Paso 3', name: 'Score Individual de Riesgo', icon: 'CircuitBoard', desc: 'Generamos una puntuación de riesgo (Scoring) individual para la población activa, identificando alertas tempranas y patrones.' },
      { step: 'Paso 4', name: 'Palancas de Acción por Perfil', icon: 'Gauge', desc: 'Traducimos los hallazgos en palancas de acción concretas (desarrollo, compensación) priorizadas según criticidad del rol.' }
    ],
    relatedTestimonialId: 'rec-ralf',
    relatedCaseId: 1
  },
  {
    id: 6,
    pillarKey: 'analitica',
    order: 3,
    slug: 'equidad-salarial-genero',
    title: 'Análisis de Equidad Salarial de Género',
    subtitle: 'Equal Pay Analysis',
    image: '/images/services/s6.jpg',
    why: [
      'La brecha salarial de género ya no es solo reputacional, es un requisito legal en aumento. Una organización que paga de forma inequitativa pierde talento femenino y envía una señal negativa sobre sus valores.',
      'Nuestro análisis no se limita a comparar promedios. Controlamos estadísticamente los factores legítimos (cargo, grado, desempeño) para determinar si el género influye injustificadamente en la remuneración, separando lo que es brecha estructural de lo que es sesgo.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Variables Legítimas a Controlar', icon: 'SlidersHorizontal', desc: 'Acordamos qué variables legítimas controlar (desempeño, antigüedad, función) y definimos el alcance del análisis en la organización.' },
      { step: 'Paso 2', name: 'Regresión Estadística por Género', icon: 'Sigma', desc: 'Aplicamos modelos estadísticos en Python para aislar el efecto del género sobre el salario, cuantificando la brecha real.' },
      { step: 'Paso 3', name: 'Focos de Mayor Inequidad', icon: 'AlertCircle', desc: 'Generamos visualizaciones para identificar subgrupos con mayor inequidad y posiciones donde la brecha es estadísticamente pronunciada.' },
      { step: 'Paso 4', name: 'Ajustes con Impacto Presupuestario', icon: 'BadgeCheck', desc: 'Entregamos ajustes salariales recomendados, impacto presupuestario estimado y métricas para monitorear la equidad en el tiempo.' }
    ],
    relatedTestimonialId: 'rec-mohamed',
    relatedCaseId: null
  },
  {
    id: 7,
    pillarKey: 'analitica',
    order: 4,
    slug: 'ausentismo-focos-gestion',
    title: 'Análisis de Ausentismo e Identificación de Focos',
    subtitle: 'Absence & Focus Management',
    image: '/images/services/s7.jpg',
    why: [
      'El ausentismo es uno de los costos más invisibles. Rara vez tiene una línea en el presupuesto, pero impacta la productividad y el clima laboral. Sin datos, la gestión se enfoca donde hay más ruido, no donde hay más impacto.',
      'Combinamos el análisis detallado del ausentismo con la Matriz de Gestión Organizacional para priorizar intervenciones. Ayudamos a su equipo a dejar de apagar incendios y comenzar a enfocar su energía estratégica donde realmente se mueve la aguja.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Costo Real en Horas y Salarios', icon: 'Calendar', desc: 'Analizamos días perdidos, causas, y distribución demográfica, cuantificando el costo real en salarios y productividad afectada.' },
      { step: 'Paso 2', name: 'Focos por Urgencia e Impacto', icon: 'Search', desc: 'Clasificamos los focos de ausentismo por Urgencia/Importancia y Riesgo/Impacto para definir prioridades de intervención.' },
      { step: 'Paso 3', name: 'Patrones Predictivos con Python', icon: 'PieChart', desc: 'Modelamos tendencias históricas con Python para identificar patrones predictivos, estacionalidad y alertas tempranas por área.' },
      { step: 'Paso 4', name: 'Dashboard Semaforizado de Acción', icon: 'LineChart', desc: 'Entregamos un dashboard semaforizado y recomendaciones de acción diferenciadas entre gestión de crisis y gestión proactiva.' }
    ],
    relatedTestimonialId: 'rec-gonzalo',
    relatedCaseId: 2
  },
  {
    id: 8,
    pillarKey: 'analitica',
    order: 5,
    slug: 'proyeccion-equilibrio-genero',
    title: 'Proyección de Equilibrio de Género',
    subtitle: 'Gender Balance Evolution',
    image: '/images/services/s8.jpg',
    why: [
      'Fijar metas de equidad de género sin modelar cómo alcanzarlas es solo una declaración de intenciones. ¿Qué palanca tiene mayor impacto, reducir la salida de mujeres o aumentar la contratación?',
      'Nuestra herramienta de simulación proyecta la evolución del equilibrio de género bajo distintas tasas de ingreso, egreso y promoción. Transforma las conversaciones de diversidad en matemáticas accionables, "si hacemos X, en Y años llegaremos a Z".'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Composición por Nivel y Función', icon: 'ScanEye', desc: 'Analizamos la composición de género por nivel y función, calculando tasas históricas de ingreso, retención y ascenso.' },
      { step: 'Paso 2', name: 'Escenarios de Ingreso y Egreso', icon: 'FlaskConical', desc: 'Desarrollamos algoritmos en Python que proyectan el equilibrio futuro bajo múltiples escenarios y supuestos de gestión.' },
      { step: 'Paso 3', name: 'Acción de Mayor Impacto Matemático', icon: 'Zap', desc: 'Cuantificamos qué acción tiene el mayor impacto matemático sobre la meta aspiracional, priorizando las iniciativas de RR.HH.' },
      { step: 'Paso 4', name: 'Herramienta de Ajuste en Tiempo Real', icon: 'MonitorDot', desc: 'Entregamos una herramienta donde su equipo puede ajustar variables en tiempo real y presentar resultados respaldados a la gerencia.' }
    ],
    relatedTestimonialId: 'rec-mohamed',
    relatedCaseId: 1
  },

  // ==========================================
  // PILAR III: COMPENSACIONES Y ESTRUCTURA
  // ==========================================
  {
    id: 9,
    pillarKey: 'compensaciones',
    order: 1,
    slug: 'compensaciones-incentivos-presupuesto',
    title: 'Compensación Total, Incentivos y Presupuesto',
    subtitle: 'Total Rewards & Budgeting',
    image: '/images/services/s9.jpg',
    why: [
      'Decisiones de compensación sin respaldo generan dos riesgos, sobrepagar sin retener al talento correcto, o subpagar y perder a los mejores. Sin un modelo analítico, el presupuesto de personas pierde credibilidad.',
      'Diseñamos modelos de Total Rewards integrando datos de mercado, desempeño y estrategias de negocio. El resultado es una Matriz de Decisión que asigna recursos con equidad, competitividad y alineación total al cumplimiento de las metas organizacionales.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Diagnóstico Salarial y de Bonos', icon: 'Stethoscope', desc: 'Evaluamos la estructura salarial actual, esquemas de bonos y definimos criterios de equidad interna y competitividad externa.' },
      { step: 'Paso 2', name: 'Benchmark + Desempeño Interno', icon: 'TableProperties', desc: 'Cruzamos datos de mercado (benchmark) con desempeño interno mediante modelos estadísticos para proponer bandas salariales.' },
      { step: 'Paso 3', name: 'Bono Conectado a Drivers del Negocio', icon: 'Gift', desc: 'Conectamos el bono a los drivers reales del negocio, simulando matemáticamente el impacto presupuestario de distintos escenarios.' },
      { step: 'Paso 4', name: 'Estructura con Simulación Financiera', icon: 'FileCheck', desc: 'Entregamos la nueva estructura de compensaciones con simulación de impacto financiero y un plan de transición progresivo.' }
    ],
    relatedTestimonialId: 'rec-mohamed',
    relatedCaseId: null
  },
  {
    id: 10,
    pillarKey: 'compensaciones',
    order: 2,
    slug: 'diseno-estructura-organizacional',
    title: 'Diseño de Estructura Organizacional',
    subtitle: 'Organizational Design',
    image: '/images/services/s10.jpg',
    why: [
      'Capas de supervisión innecesarias y equipos fragmentados generan ineficiencia, lentitud de decisión y costos de dotación no justificados. Una estructura desalineada es uno de los mayores costos ocultos.',
      'Analizamos con datos si su estructura es la más eficiente para el volumen de operación. Evaluamos el Span of Control, modelamos alternativas y comparamos costos de mano de obra para que la gerencia decida con evidencia cuantitativa.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Variables Operacionales Críticas', icon: 'Ruler', desc: 'Mapeamos variables operacionales críticas: volumen, superficie, costo de mano de obra y ratios actuales de supervisión.' },
      { step: 'Paso 2', name: 'Escenarios con Span of Control', icon: 'Building2', desc: 'Construimos escenarios alternativos utilizando Python, aplicando mejores prácticas de alcance vertical y horizontal.' },
      { step: 'Paso 3', name: 'Eficiencia vs. Estructura Actual', icon: 'Scale', desc: 'Evaluamos la eficiencia de cada modelo versus la estructura actual, cuantificando las ineficiencias financieras y operativas.' },
      { step: 'Paso 4', name: 'Estructura Óptima con Hoja de Ruta', icon: 'ArrowRightLeft', desc: 'Recomendamos la estructura óptima por área con su respectivo impacto financiero y la hoja de ruta para la reorganización.' }
    ],
    relatedTestimonialId: 'rec-juvenal',
    relatedCaseId: 1
  },
  {
    id: 11,
    pillarKey: 'compensaciones',
    order: 3,
    slug: 'modelos-negociacion-sindical',
    title: 'Modelos para Negociación Sindical',
    subtitle: 'Labor Relations Analytics',
    image: '/images/services/s11.jpg',
    why: [
      'Una negociación sindical mal preparada cuesta millones. Llegar a la mesa sin estimaciones matemáticas precisas expone a la empresa a compromisos insostenibles en el tiempo.',
      'Construimos la base analítica que su gerencia necesita. Simulamos el impacto presupuestario plurianual de reajustes, bonos y beneficios, permitiendo anticipar el costo de cierre y definir concesiones de alto valor percibido pero bajo impacto financiero.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Estructura del Grupo Negociador', icon: 'Search', desc: 'Analizamos la estructura salarial del grupo negociador, incluyendo costos fijos, variables y beneficios adquiridos, versus el mercado.' },
      { step: 'Paso 2', name: 'Simulador de Costo a 3-5 años', icon: 'Code', desc: 'Construimos un simulador en Python que proyecta el costo a 3-5 años de cada propuesta sindical (reajustes, bonos por término).' },
      { step: 'Paso 3', name: 'Posición Empresa vs. Sindicato', icon: 'Calculator', desc: 'Cuantificamos la diferencia entre la posición empresa y sindicato, identificando las áreas de concesión más eficientes.' },
      { step: 'Paso 4', name: 'Actualización en Mesa en Tiempo Real', icon: 'GitCompare', desc: 'Entregamos el documento analítico de respaldo para la mesa y actualizamos el modelo en tiempo real durante la negociación.' }
    ],
    relatedTestimonialId: 'rec-gonzalo',
    relatedCaseId: 2
  },

  // ==========================================
  // PILAR IV: DESARROLLO Y AUTOMATIZACIÓN
  // ==========================================
  {
    id: 14,
    pillarKey: 'desarrollo',
    order: 1,
    slug: 'automatizacion-procesos-rrhh',
    title: 'Automatización de Procesos con Python',
    subtitle: 'Data Pipelines para RR.HH.',
    image: '/images/services/s14.jpg',
    why: [
      'El verdadero valor de RR.HH. reside en su capacidad estratégica, no en consolidar Excel manualmente. Tareas operativas de cálculo e integración de datos limitan el tiempo disponible para el desarrollo de talento.',
      'Liberamos el potencial de su equipo mediante pipelines automatizados en Python. Extraemos, transformamos y generamos reportes desde múltiples sistemas (ETL) a velocidad de código, reduciendo errores a cero y devolviéndole horas críticas a su organización.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Tareas Manuales de Mayor Costo', icon: 'ScanSearch', desc: 'Identificamos las tareas manuales (cálculo de nómina, consolidación de reportes) que más capacidad operativa consumen.' },
      { step: 'Paso 2', name: 'Flujos HRIS-ERP y Reglas de Negocio', icon: 'Workflow', desc: 'Diseñamos los flujos de integración conectando sistemas fuentes (HRIS, ERP) y definiendo las reglas de negocio.' },
      { step: 'Paso 3', name: 'Scripts ETL Automatizados', icon: 'Terminal', desc: 'Programamos los scripts automatizados (ETL) para procesamiento masivo de datos, reportes PDF y envío de alertas.' },
      { step: 'Paso 4', name: 'Capacitación al Equipo Técnico', icon: 'PackageCheck', desc: 'Implementamos la solución documentada y capacitamos al equipo técnico o funcional para su mantenimiento a largo plazo.' }
    ],
    relatedTestimonialId: 'rec-ralf',
    relatedCaseId: null
  },
  {
    id: 12,
    pillarKey: 'desarrollo',
    order: 2,
    slug: 'capacitacion-planificacion-estrategica',
    title: 'Capacitación en SPP para HRBPs',
    subtitle: 'SPP Training for HRBPs',
    image: '/images/services/s12.jpg',
    why: [
      'La Planificación Estratégica de Personas solo genera valor cuando el equipo interno puede ejecutarla de forma autónoma. Un proyecto de consultoría sin transferencia de conocimiento debe repetirse cada año.',
      'Formamos a sus Socios de Negocio (HRBPs) con herramientas prácticas para dominar el proceso. Desde la segmentación de datos hasta la interpretación de modelos de demanda, instalamos capacidad técnica real en su primera línea de Recursos Humanos.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Contenidos Adaptados a tu Industria', icon: 'Palette', desc: 'Adaptamos los contenidos y ejercicios al nivel analítico de su equipo y al contexto de su industria específica.' },
      { step: 'Paso 2', name: 'Metodología 4A y Oferta/Demanda', icon: 'BookOpen', desc: 'Entrenamos en los fundamentos: metodología 4A, lógica de oferta/demanda y rol del HRBP como puente estratégico.' },
      { step: 'Paso 3', name: 'Lectura de Heat Maps y Brechas', icon: 'BarChart', desc: 'Enseñamos a leer los Heat Maps de brechas y extraer hallazgos accionables para la construcción del Plan de Personas.' },
      { step: 'Paso 4', name: 'Simulación de Talleres con Líderes', icon: 'Presentation', desc: 'Practicamos la ejecución de talleres de alineamiento con líderes de negocio mediante simulación de casos reales.' }
    ],
    relatedTestimonialId: 'rec-fabricio',
    relatedCaseId: 2
  },
  {
    id: 13,
    pillarKey: 'desarrollo',
    order: 3,
    slug: 'compromiso-desempeno-equipos',
    title: 'Compromiso y Desempeño de Equipos',
    subtitle: 'Engagement & Team Performance',
    image: '/images/services/s13.jpg',
    why: [
      'Las encuestas anuales de clima llegan demasiado tarde, cuando se publican, el talento crítico ya ha renunciado. Los equipos de alto desempeño necesitan retroalimentación estructurada continua.',
      'Implementamos Engagement Check-ins y Team Performance Assessments. Capturamos señales de alerta tempranas mediante herramientas digitales ligeras, permitiendo a los líderes actuar sobre datos concretos antes de que los problemas afecten los resultados operativos.'
    ],
    methodology: [
      { step: 'Paso 1', name: 'Check-ins Adaptados al Contexto', icon: 'ClipboardEdit', desc: 'Adaptamos el protocolo de Conversaciones de Compromiso al contexto organizacional: frecuencia, instrumento y confidencialidad.' },
      { step: 'Paso 2', name: 'Cómo Conducir la Conversación', icon: 'GraduationCap', desc: 'Formamos a los líderes en cómo conducir la conversación de forma efectiva, registrar planes de acción y dar seguimiento.' },
      { step: 'Paso 3', name: '22 Ítems en 4 Dimensiones', icon: 'Activity', desc: 'Aplicamos el instrumento de 22 ítems en 4 dimensiones. Analizamos resultados con Python para identificar áreas de desarrollo.' },
      { step: 'Paso 4', name: 'Informe con Tendencias y Prioridades', icon: 'FileBarChart', desc: 'Entregamos el informe consolidado con tendencias emergentes y recomendaciones priorizadas para la gerencia.' }
    ],
    relatedTestimonialId: 'rec-milan',
    relatedCaseId: 1
  }
]
