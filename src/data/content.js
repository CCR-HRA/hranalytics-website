/**
 * Contenido centralizado por sección.
 * Editar aquí los textos sin tocar la lógica de los componentes.
 * Todos los textos y mensajes de la interfaz están en español.
 */

export const hero = {
  title: 'Estrategia basada en datos para tomar mejores decisiones',
  subtitle: 'Combinamos más de 18 años de experiencia corporativa con ciencia de datos avanzada. Transformamos la complejidad de RR.HH. en estrategias claras, medibles y ejecutables.',
  tagline: 'Consultoría boutique especializada en People Analytics, Compensaciones y Planificación Estratégica de Personas.',
  ctaPrimary: 'Solicitar conversación',
  ctaSecondary: 'Ver servicios',
  scrollLabel: 'SCROLL',
}

export const trustBar = {
  heading: 'Nos respaldan',
  items: [
    { id: 'trust-years', value: '18+', label: 'Años de experiencia del equipo en RR.HH.' },
    { id: 'trust-clients', value: '4', label: 'Empresas líderes que confían en nosotros' },
    { id: 'trust-industries', value: '5', label: 'Industrias con experiencia comprobada' },
    { id: 'trust-mit', value: 'MIT', label: 'Certificación en Data Analytics' },
  ],
}

// ==========================================
// SECCIÓN: QUÉ HACEMOS (HRAnalyticsSection)
// ==========================================
export const hranalytics = {
  eyebrow: 'Cómo ayudamos a los clientes',
  heading: 'People Analytics que impulsa el negocio',
  body: 'Los líderes de RR.HH. están llamados a tomar decisiones que impacten directamente los resultados del negocio. Para lograrlo, los datos deben traducirse en conocimiento accionable: una guía clara que conecte cada decisión de personas con los objetivos estratégicos de la organización.',
  cta: 'Conocer nuestros servicios',
  cascadeLinks: [
    { to: '/propuesta-de-valor', label: 'Propuesta de valor' },
    { to: '/nuestro-enfoque', label: 'Nuestro enfoque' },
  ],
}

// ==========================================
// SECCIÓN: SERVICIOS (ServicesSection)
// ==========================================
export const servicesSection = {
  eyebrow: 'Lo que hacemos',
  heading: 'Servicios y metodologías',
  intro: 'Metodologías probadas para decisiones estratégicas en RR.HH.',
}

// ==========================================
// SECCIÓN: INDUSTRIAS
// ==========================================
export const industries = {
  heading: 'Industrias',
  subheading: 'Experiencia en tu sector',
  intro: 'Acompañamos a organizaciones de distintos sectores en su transición hacia decisiones de personas basadas en datos.',
  items: [
    {
      id: 'mineria',
      name: 'Minería',
      desc: 'Retención de segmentos críticos, planificación de dotación y análisis de span of control.',
      casePreview: 'Reducción de rotación en supervisores',
    },
    {
      id: 'agro',
      name: 'Agroindustria',
      desc: 'Diagnóstico organizacional, eficiencia estructural y People Analytics para operaciones complejas.',
      casePreview: 'Optimización de estructura y costos',
    },
    {
      id: 'consumo',
      name: 'Consumo masivo',
      desc: 'Planificación estratégica de fuerza laboral regional, compensaciones y planificación estratégica LATAM.',
      casePreview: 'Planificación multi-país',
    },
    {
      id: 'banca',
      name: 'Banca y servicios',
      desc: 'Modelos de retención, dashboards ejecutivos y gobierno de datos de personas.',
      casePreview: 'Decisiones de talento basadas en datos',
    },
    {
      id: 'retail',
      name: 'Retail',
      desc: 'Análisis de productividad, ausentismo y diseño de estructuras comerciales.',
      casePreview: 'Eficiencia y métricas de gestión',
    },
  ],
}

export const insights = {
  heading: 'Nuestra perspectiva',
  subheading: 'Insights sobre People Analytics',
  intro: 'Puntos de vista sobre tendencias, datos y toma de decisiones en Recursos Humanos.',
  items: [
    {
      id: 'insight-estrategia',
      title: 'Datos + juicio humano',
      excerpt: 'La tecnología amplifica lo que ya hacemos bien. El valor diferencial sigue siendo la empatía, la ética y el juicio estratégico.',
      tag: 'Estrategia',
    },
    {
      id: 'insight-ia',
      title: 'People Analytics en la era de la IA',
      excerpt: 'Los modelos predictivos y la analítica avanzada permiten anticipar, no solo describir. El reto está en conectar hallazgos con acciones concretas.',
      tag: 'Tendencias',
    },
    {
      id: 'insight-metodologia',
      title: 'De reportes a decisiones',
      excerpt: 'El salto no es tener más dashboards, sino responder preguntas de negocio que impulsen cambios reales en la gestión de personas.',
      tag: 'Metodología',
    },
  ],
}

export const valueProposition = {
  heading: 'Propuesta de valor',
  subheading: '¿Por qué HR Analytics?',
  items: [
    {
      title: 'Estrategia basada en evidencia',
      description: 'Conectamos los datos con los objetivos del negocio para tomar decisiones más informadas y oportunas.',
    },
    {
      title: 'Modelos a la medida',
      description: 'Diseñamos soluciones adaptadas a la realidad, madurez y necesidades de cada organización.',
    },
    {
      title: 'Experiencia multiindustria',
      description: 'Minería, banca, retail, agroindustria, alimentos y consumo masivo. Conocemos los desafíos de tu industria.',
    },
    {
      title: 'Impacto en el negocio',
      description: 'Desde modelos predictivos en Python hasta dashboards ejecutivos, cada entregable está diseñado para generar impacto medible en retención, compensaciones y planificación estratégica.',
    },
  ],
}

export const enfoque = {
  heading: 'Metodología',
  subheading: 'Nuestro enfoque',
  quote: 'Crear impacto en el negocio a través de decisiones de personas mejor fundamentadas.',
  items: [
    {
      title: 'Diagnóstico a medida',
      tag: 'Paso 1',
      description: 'Cada proyecto parte por entender la realidad, la cultura y el nivel de madurez analítica de tu organización. No aplicamos soluciones genéricas.',
    },
    {
      title: 'Metodología iterativa',
      tag: 'Paso 2',
      description: 'Trabajamos en ciclos de diagnóstico, modelado y validación, ajustando el enfoque según los hallazgos y las prioridades del negocio.',
    },
    {
      title: 'Impacto accionable',
      tag: 'Paso 3',
      description: 'El resultado no es un informe: es una decisión mejor fundamentada. Cada entregable se conecta directamente con una acción de gestión de personas.',
    },
  ],
}

export const clients = {
  heading: 'Reconocimiento',
  title: 'Han confiado en nosotros',
  subtitle: 'Empresas líderes que avalan nuestra experiencia en People Analytics',
  items: [
    { name: 'Collahuasi', logo: '/images/clients/collahuasi.png', darkBg: false },
    { name: 'CMP', logo: '/images/clients/cmp.png', darkBg: false },
    { name: 'Westfalia Fruit', logo: '/images/clients/westfalia.png', darkBg: false },
    { name: 'Tarragona', logo: '/images/clients/tarragona.png', darkBg: false },
  ],
}

export const successCases = {
  heading: 'Casos de impacto',
  subheading: 'Resultados en proyectos de People Analytics',
  subtitle: 'Proyectos realizados con metodologías probadas. Clientes bajo confidencialidad.',
  privacyNotice: 'Casos basados en proyectos reales. Nombres, datos y cifras fueron modificados para proteger la confidencialidad. Los resultados fueron cambiados; la metodología aplicada se mantiene intacta. Consulta nuestra',
  privacyNoticeLinkSuffix: ' para más información.',
  /** Pills de filtro: preguntas del cliente (problemas que enfrentan), no técnico */
  clientProblems: [
    { id: 'rotacion', label: '¿Cómo reducir la rotación en personal clave?' },
    { id: 'planificacion', label: '¿Cómo planificar la dotación a futuro?' },
    { id: 'capacitacion', label: '¿La capacitación genera impacto real?' },
    { id: 'estrategia', label: '¿Cómo hacer que la estrategia se ejecute?' },
    { id: 'decisiones', label: '¿Cómo decidir con respaldo de datos?' },
    { id: 'incentivos', label: '¿Cómo alinear incentivos con el desempeño?' },
  ],
  items: [
    {
      id: 1,
      clientProblemId: 'rotacion',
      title: 'Reducción de rotación en segmento crítico',
      industry: 'Minería',
      industryLabel: 'Empresa minera',
      service: 'Retención de Talento',
      serviceId: 2,
      context: 'Alta rotación en supervisores de operaciones generaba inestabilidad en los turnos y sobrecarga en los equipos, con impacto directo en continuidad operacional y clima laboral.',
      solution: 'Modelo predictivo de riesgo de rotación y plan de retención diferenciado por segmento.',
      metrics: [
        { id: 'm1-rotacion', value: '-18%', label: 'Rotación en 12 meses' },
        { id: 'm1-ahorro', value: '23%', label: 'Ahorro vs costo de reemplazo' },
      ],
      enhancedDetail: { type: 'rotacion' },
    },
    {
      id: 2,
      clientProblemId: 'planificacion',
      title: 'Planificación estratégica regional LATAM',
      industry: 'Consumo masivo',
      industryLabel: 'Organización con presencia en múltiples mercados de la región · 2025',
      service: 'Planificación Estratégica',
      serviceId: 1,
      context: 'Necesidad de proyectar dotación y capacidades clave en la región para los próximos 4 años, con visibilidad comparable entre países y áreas funcionales.',
      solution: 'Strategic Workforce Planning con análisis histórico de rotación por área, proyección de dotación disponible vs. demanda en tres escenarios (sin acción, plan parcial, plan completo), mapa de riesgo competencias y recomendaciones priorizadas por urgencia e impacto.',
      metrics: [
        { id: 'm2-rotacion', value: '24%', label: 'Rotación promedio global' },
        { id: 'm2-lideres', value: '8', label: 'Líderes entrevistados' },
        { id: 'm2-areas', value: '4', label: 'Áreas evaluadas' },
        { id: 'm2-proyeccion', value: '4', label: 'Años de proyección' },
      ],
      enhancedDetail: { type: 'spp_regional' },
    },
    {
      id: 4,
      clientProblemId: 'capacitacion',
      title: 'Medición integral del impacto de la capacitación',
      industry: 'People Analytics',
      industryLabel: 'Empresa con +2.500 colaboradores · Chile',
      service: 'Analítica y Medición de Personas',
      serviceId: 5,
      context: 'La organización contaba con más de 15 informes de capacitación independientes sin visión consolidada. No podían responder con evidencia si la inversión en formación estaba generando aprendizaje real ni cambio de conducta en el trabajo.',
      solution: 'Consolidación y análisis de más de 40.000 registros de evaluación en tres niveles (satisfacción, aprendizaje y transferencia) con estadística descriptiva, inferencial y análisis correlacional para validar cada hallazgo.',
      metrics: [
        { id: 'm4-aprobacion', value: '90%', label: 'Tasa de satisfacción' },
        { id: 'm4-registros', value: '40 Mil', label: 'Registros analizados' },
        { id: 'm4-niveles', value: '3', label: 'Niveles de medición' },
      ],
      enhancedDetail: { type: 'capacitacion' },
    },
    {
      id: 6,
      clientProblemId: 'estrategia',
      industry: 'Alineamiento Estratégico',
      title: 'Plan estratégico 2026 definido junto al equipo ejecutivo',
      metrics: [
        { id: 'm6-actividades', value: '30', label: 'actividades claves definidas' },
        { id: 'm6-objetivos', value: '10', label: 'objetivos estratégicos' },
      ],
      industryLabel: 'Empresa de servicios con presencia nacional · Chile',
      service: 'Alineamiento Estrategico para Equipos',
      serviceId: 6,
      context: 'El equipo ejecutivo disponía de una estrategia formulada a nivel macro, pero sin mecanismos concretos de ejecución: las prioridades no estaban traducidas en actividades medibles, los responsables no tenían accountability explícita y no existía un sistema de seguimiento que conectara la visión con la operación diaria.',
      solution: 'Diseño y facilitación de taller ejecutivo de dos jornadas con metodología estructurada en cuatro etapas: (1) revisión y cierre del plan anterior mediante análisis de avances y brechas; (2) mapeo de comportamientos habilitadores y bloqueadores culturales usando dinámica grupal con matriz de Impacto/Alto-Bajo; (3) construcción colaborativa del RoadMap 2026 con 89 iniciativas brutas procesadas en tres equipos de trabajo; (4) consolidación plenaria con matriz Impacto/Viabilidad/Urgencia para priorizar y validar. Entregable final: plan estratégico operacionalizado con 4 pilares, 10 objetivos estratégicos, 30 actividades claves distribuidas en 3 niveles de decisión (estratégico, unidad de negocio y proyectos transversales), con metas, KPIs, unidad líder, unidad de apoyo y frecuencia de seguimiento por cada actividad.',
      solutionIntro: 'Diseño y facilitación de taller ejecutivo de dos jornadas con metodología estructurada en cuatro etapas:',
      solutionPoints: [
        'Revisión y cierre del plan anterior mediante análisis de avances y brechas.',
        'Mapeo de comportamientos habilitadores y bloqueadores culturales usando dinámica grupal con matriz de Impacto/Alto-Bajo.',
        'Construcción colaborativa del RoadMap 2026 con 89 iniciativas brutas procesadas en tres equipos de trabajo.',
        'Consolidación plenaria con matriz Impacto/Viabilidad/Urgencia para priorizar y validar.',
        'Entregable final: plan estratégico operacionalizado con 4 pilares, 10 objetivos estratégicos, 30 actividades claves distribuidas en 3 niveles de decisión (estratégico, unidad de negocio y proyectos transversales), con metas, KPIs, unidad líder, unidad de apoyo y frecuencia de seguimiento por cada actividad.',
      ],
      enhancedDetail: { type: 'alineamiento' },
      detail: {
        challenge: 'La organización enfrentaba una brecha clásica entre estrategia y ejecución: existía claridad sobre el destino, pero no sobre cómo llegar. Sin actividades claves priorizadas ni KPIs asignados a responsables concretos, cada unidad operaba con su propia interpretación de las prioridades, generando esfuerzos dispersos y dificultad para rendir cuenta de avances ante el directorio.',
        approach: 'Se diseñó una jornada de dos días orientada a resultados concretos — no a reflexión abstracta. El primer día combinó un bloque de liderazgo y cultura con una dinámica de mapeo de comportamientos: cada equipo identificó qué conductas del liderazgo actual aceleran la ejecución (habilitadores de alto impacto: enfoque en resultados, empoderamiento, resiliencia) y cuáles la frenan (bloqueadores: resistencia al cambio, falta de foco en reuniones, accountability difusa). El segundo día fue de trabajo puro sobre el plan: 89 post-its generados en tres equipos fueron procesados, agrupados y priorizados usando una matriz de Impacto/Viabilidad/Urgencia, hasta consolidar un RoadMap ejecutable.',
        results: [
          '4 pilares estratégicos definidos: Rentabilidad & Eficiencia Operacional, Cliente & Marca, Personas & Cultura, Sostenibilidad & Compliance.',
          '10 objetivos estratégicos con metas claras y medibles para el período.',
          '30 actividades claves distribuidas en 3 niveles: 12 estratégicas (equipo de conducción), 12 tácticas (unidades de negocio) y 6 proyectos transversales multidisciplinarios.',
          'Cada actividad con KPI, meta numérica, unidad líder, unidad de apoyo y frecuencia de revisión (semanal, quincenal o mensual).',
          'Sistema de seguimiento diseñado con dos ciclos: revisión de equipo (operativa) y revisión ejecutiva (estratégica).',
          'Mapa de comportamientos habilitadores y bloqueadores integrado al plan como insumo para el plan de acción cultural.',
        ],
        impact: 'El equipo ejecutivo cerró el taller con un plan completamente operacionalizado — no un documento de intenciones, sino una hoja de ruta con responsables, métricas y fechas. La metodología permitió que las actividades claves emergieran del propio equipo, lo que aumentó el nivel de compromiso y apropiación del plan. El RoadMap resultante cubre el período 2026-2028 y tiene trazabilidad directa desde cada KPI operacional hasta los pilares estratégicos de la compañía.',
      },
    },
    {
      id: 7,
      clientProblemId: 'decisiones',
      industry: 'Workforce Planning',
      title: 'Diagnóstico estratégico de personas para gerencia en transformación',
      industryLabel: 'Empresa con foco en crecimiento organizacional · Chile',
      service: 'Planificacion Estrategica de Personas',
      serviceId: 7,
      relatedServiceId: 1,
      badgeLabels: {
        primary: { es: 'Planificación Estratégica de Personas', en: 'Strategic People Planning (SPP)' },
        secondary: { es: 'Analítica de Personas', en: 'People Analytics' },
      },
      context: 'Organización en etapa de cambio con foco estratégico difuso: equipos sin claridad de prioridades, decisiones lentas y sin respaldo de datos, y roles internos poco definidos.',
      solution: 'Diagnóstico integrado con metodología estructurada: levantamiento cualitativo (entrevistas en profundidad), cuantitativo (cuestionarios estandarizados) y análisis de brechas actuales y futuras por perfil de cargo.',
      metrics: [
        { id: 'm7-lideres', value: '10', label: 'líderes participantes' },
        { id: 'm7-horas', value: '20h', label: 'horas de levantamiento' },
        { id: 'm7-perfiles', value: '24', label: 'perfiles analizados' },
        { id: 'm7-coincidencia', value: '68%', label: 'coincidencia en brechas clave' },
      ],
      enhancedDetail: { type: 'spp' },
    },
    {
      id: 8,
      clientProblemId: 'incentivos',
      industry: 'Compensaciones & Incentivos',
      title: 'Rediseño del modelo de incentivos variable para líderes de punto de venta',
      industryLabel: 'Organización con múltiples puntos de venta a nivel nacional · Chile · 2024',
      service: 'Compensación Total, Incentivos y Presupuesto',
      serviceId: 9,
      context: 'El modelo vigente aplicaba un 5% lineal sobre la utilidad mensual de cada punto de venta, generando pagos desproporcionados en tramos altos sin mejora equivalente en desempeño. Los costos de incentivos crecían de forma insostenible y no existía diferenciación por variables de desempeño.',
      solution: 'Auditoría sobre 610+ registros mensuales, diseño de escala escalonada decreciente con 4 variables de desempeño (ventas, calidad, costos y servicio), simulación de impacto en dotación y benchmarking vs. mercado.',
      metrics: [
        { id: 'm8-registros', value: '610+', label: 'registros analizados' },
        { id: 'm8-dotacion', value: '62%', label: 'dotación beneficiada' },
        { id: 'm8-ahorro', value: '9%', label: 'ahorro estimado' },
        { id: 'm8-variables', value: '5', label: 'variables de desempeño' },
      ],
      enhancedDetail: { type: 'incentivos' },
    },
  ],
}

export const recommendations = {
  filters: [
    { id: 'Todos', label: 'Todos' },
    { id: 'Cliente', label: 'Clientes' },
    { id: 'Jefatura', label: 'Jefaturas' },
    { id: 'Colega senior', label: 'Colegas senior' },
  ],
  items: [
    {
      id: 'rec-juvenal',
      name: 'Juvenal Soto Gamboa',
      role: 'Gerente de Personas y Cultura Chile',
      type: 'Cliente',
      company: 'Westfalia Fruit',
      companyLogo: '/images/clients/westfalia.png',
      photo: '/images/recommendations/juvenal.png',
      quote: 'Gracias a su capacidad de análisis, metodología de trabajo, dedicación y compromiso, Cristian nos entregó un diagnóstico certero y detallado del negocio, facilitando el rol de RR.HH. para la implementación de los siguientes pasos.',
      country: 'CL',
    },
    {
      id: 'rec-milan',
      name: 'Milan Marinovic Watson',
      role: 'Superintendente de Organización Digital y Talento',
      type: 'Cliente',
      company: 'Compañía Minera del Pacífico',
      companyLogo: '/images/clients/cmp.png',
      photo: '/images/recommendations/milan.png',
      quote: 'Cristian tiene una mirada transversal de los procesos de gestión de personas, lo que le permite conectar la estrategia E2E de RR.HH. con acciones tácticas y operativas. Como consultor es un partner comprometido, flexible y con mucho empuje.',
      country: 'CL',
    },
    {
      id: 'rec-mohamed',
      name: 'Mohamed Bolteya',
      role: 'Regional Head of Total Rewards COE – Zone LATAM',
      type: 'Jefatura',
      company: 'Nestlé',
      companyLogo: '/images/companies/nestle.png',
      photo: '/images/recommendations/mohamed.png',
      quote: 'Cristian entrega consistentemente resultados de alta calidad e impulsa nuevas iniciativas de alto impacto. Su experiencia en People Analytics fue clave para decisiones de compensaciones basadas en datos y políticas de total rewards más sólidas.',
      country: 'CA',
    },
    {
      id: 'rec-fabricio',
      name: 'Fabricio Pavarin',
      role: 'Director Total Rewards and People Analytics',
      type: 'Jefatura',
      company: 'Nestlé',
      companyLogo: '/images/companies/nestle.png',
      photo: '/images/recommendations/fabricio.png',
      quote: 'Es una persona muy dedicada, responsable y confiable, con foco pragmático y orientación al negocio. Lideró Strategic Workforce Planning para varios países de Latinoamérica con excelentes resultados.',
      country: 'BR',
    },
    {
      id: 'rec-ralf',
      name: 'Ralf Buechsenschuss',
      role: 'Global HR Manager – Corporate People Analytics & Projects',
      type: 'Colega senior',
      company: 'Nestlé',
      companyLogo: '/images/companies/nestle.png',
      photo: '/images/recommendations/ralf.png',
      quote: 'Cristian ejecuta proyectos al más alto nivel, cumpliendo expectativas a nivel país y regional. Es un experto y referente en People Analytics y planificación estratégica, un recurso muy valioso para la función de RR.HH.',
      country: 'CH',
    },
    {
      id: 'rec-gonzalo',
      name: 'Gonzalo Zeiss Valderrama',
      role: 'Talent Manager / Senior HR Business Partner',
      type: 'Jefatura',
      company: 'Nestlé',
      companyLogo: '/images/companies/nestle.png',
      photo: '/images/recommendations/gonzalo.png',
      quote: 'Cristian entiende cómo la data de RR.HH. agrega valor al negocio. Es capaz de influir y movilizar sin autoridad formal, liderando mejoras en procesos de gestión de personas.',
      country: 'CL',
    },
    {
      id: 'rec-ingrid',
      name: 'Ingrid Godoy Salgado',
      role: 'Asesor de Capacitación y Competencias',
      type: 'Cliente',
      company: 'Compañía Minera Doña Inés de Collahuasi',
      companyLogo: '/images/clients/collahuasi.png',
      photo: '/images/recommendations/Ingrid.jpeg',
      quote: 'El análisis fue riguroso y nos entregó información clara y útil para mejorar el diseño de nuestros programas y la estrategia para implementarlos. Recomendaría plenamente su trabajo.',
      country: 'CL',
    },
    {
      id: 'rec-rodrigo-batlle',
      name: 'Rodrigo Batlle',
      role: 'Gerente General',
      type: 'Cliente',
      company: 'Tarragona',
      companyLogo: '/images/clients/tarragona.png',
      photo: '/images/recommendations/rodrigo.jpeg',
      quote: 'HR Analytics logró simplificar y ordenar todos nuestros índices, uniendo a las distintas gerencias para ser eficientes en la creación de nuestro plan estratégico 2025.',
      country: 'CL',
    },
  ],
}

export const about = {
  heading: 'Consultora Boutique',
  subheading: 'Liderazgo',
  leadershipSubtitle: 'La persona detrás del método',
  profileName: 'Cristian Cornejo R.',
  profileRole: 'Fundador y consultor',
  profileCompany: 'HR Analytics',
  profileLocation: 'Chile · 18+ años en RR.HH.',
  aboutTitle: 'Sobre la firma',
  aboutText: 'Consultora boutique especializada en People Analytics, con más de 3 años en el mercado y 18 años de experiencia acumulada en gestión de personas.',
  quote: 'En la era de la IA y la analítica avanzada, el valor diferencial de RR.HH. sigue siendo humano: empatía, ética y juicio estratégico. La tecnología amplifica lo que ya hacemos bien; esa es la esencia de una estrategia basada en datos al servicio de la toma de decisiones.',
  experienceTitle: 'Experiencia',
  experienceText1: 'Más de 18 años liderando analítica de personas, compensaciones y planificación estratégica en AGROSUPER, BANCOESTADO y NESTLÉ. En Nestlé me desempeñé como Gerente de Compensaciones y Beneficios y People Analytics Regional LATAM, gestionando modelos de compensación, bonos, revisiones salariales y movilidad internacional para Chile y la región.',
  experienceText2: 'Como consultor independiente he desarrollado asesorías de People Analytics en minería, alimentos, banca, retail y agroexportación, acompañando a equipos de RR.HH. y Finanzas en el diseño de modelos predictivos, tableros ejecutivos y gobierno de datos de personas. Trabajo con Python para proyecciones de dotación, predicción de rotación, segmentación de talento y simulaciones de escenarios, apoyando a empresas como CMP, Tarragona, Westfalia Fruit y Collahuasi.',
  formationTitle: 'Formación',
  specialities: [
    'People Analytics',
    'Compensaciones',
    'Strategic Workforce Planning',
    'Modelos Predictivos',
    'Python & Data',
    'Planificación Estratégica',
    'Negociación Sindical',
  ],
  industriesWithLevel: [
    { name: 'Minería', level: 'Alta', width: 92 },
    { name: 'Agroindustria', level: 'Media-Alta', width: 75 },
    { name: 'Consumo masivo', level: 'Media-Alta', width: 75 },
    { name: 'Banca / Finanzas', level: 'Media', width: 58 },
    { name: 'Retail', level: 'Media', width: 42 },
  ],
  timeline: [
    { year: '2007', company: 'AGROSUPER', role: 'Analista Estudios RR.HH.' },
    { year: '2009', company: 'BANCOESTADO', role: 'Líder Control de Gestión' },
    { year: '2015', company: 'NESTLÉ', role: 'People Analytics LATAM' },
    { year: '2023', company: 'HR Analytics SpA', role: 'Consultor independiente' },
  ],
  timelineDetailed: [
    {
      yearFrom: '2023',
      yearTo: 'HOY',
      company: 'HR Analytics SpA',
      role: 'Consultor independiente',
      description: 'People Analytics en minería, alimentos, banca, retail y agroexportación. Modelos predictivos en Python, dashboards ejecutivos y gobierno de datos.',
    },
    {
      yearFrom: '2015',
      yearTo: '2023',
      company: 'NESTLÉ',
      role: 'Gerente Compensaciones & People Analytics LATAM',
      description: 'Modelos de compensación, bonos, revisiones salariales y movilidad internacional para Chile y la región.',
    },
    {
      yearFrom: '2009',
      yearTo: '2015',
      company: 'BANCOESTADO',
      role: 'Líder Control de Gestión RRHH',
      description: 'Analítica de personas, gobierno de datos y reportería ejecutiva del área.',
    },
    {
      yearFrom: '2007',
      yearTo: '2009',
      company: 'AGROSUPER',
      role: 'Analista Estudios RR.HH.',
      description: 'Inicio de carrera en analítica de compensaciones y estudios de dotación.',
    },
  ],
  consultingCallout: 'Empresas con las que he trabajado como consultor: CMP · Tarragona · Westfalia Fruit · Collahuasi',
  estudios: [
    { id: 'estudio-mit', title: 'Data Analytics Certificate', place: 'Massachusetts Institute of Technology (MIT)', location: 'Boston, USA', years: '2019', logo: '/images/universities/mit.png', featured: true },
    { id: 'estudio-upf', title: 'Magíster en Administración de Empresas (MBA)', place: 'Universidad Pompeu Fabra', location: 'Barcelona, España', years: '2015–2017', logo: '/images/universities/upf.png', featured: true },
    { id: 'estudio-udp', title: 'Magíster en Desarrollo Organizacional', place: 'Universidad Diego Portales', location: 'Santiago, Chile', years: '2012–2014', logo: '/images/universities/udp.png', featured: true },
    { id: 'estudio-uv', title: 'Ingeniero Comercial', place: 'Universidad de Valparaíso', location: 'Valparaíso, Chile', years: '2002–2006', logo: '/images/universities/uv.png', featured: false },
    { id: 'estudio-guelph', title: 'English Language Certificate', place: 'University of Guelph', location: 'Ontario, Canadá', years: '2014', logo: '/images/universities/guelph.png', featured: false },
    { id: 'estudio-uchile', title: 'Beca de Intercambio · Ingeniería Comercial FEN', place: 'Universidad de Chile', location: 'Santiago · Premio Consorcio Universidades Estatales', years: '2005–2006', logo: '/images/universities/uchile.png', featured: false },
  ],
  statsBar: [
    { id: 'stat-exp', value: '18+', label: 'Años en RR.HH.' },
    { id: 'stat-multi', value: '3', label: 'Multinacionales' },
    { id: 'stat-industries', value: '5', label: 'Industrias', labelDetail: 'Minería, alimentos, banca, retail, agroexportación' },
    { id: 'stat-mit', value: 'MIT', label: 'Data Analytics' },
  ],
  ctaAgendar: 'Agendar conversación',
  ctaCalendar: 'Agendar en calendario',
}

export const cta = {
  title: 'Tu próximo proyecto de People Analytics comienza con una conversación',
  subtitle: 'Cuéntanos el desafío. Diseñamos una solución a la medida de tu organización.',
  buttonLabel: 'Agendar conversación',
  calendarLinkText: 'Agenda directamente en el calendario',
  secondaryCta: 'Ver propuesta de valor',
}

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  heading: 'Preguntas frecuentes sobre People Analytics',
  intro: 'Qué puedes esperar de un proyecto de People Analytics, cómo trabajamos y qué necesitas tener listo para comenzar.',
  ctaTitle: '¿Aún tienes preguntas?',
  ctaText: 'Si no encuentras tu respuesta aquí, conversemos y revisamos tu caso específico.',
  ctaWhatsApp: 'Escribir por WhatsApp',
  ctaCalendar: 'Agendar una reunión',
  items: [
    {
      id: 'faq-que-es',
      q: '¿Qué es People Analytics (HR Analytics) y en qué se diferencia de un reporte tradicional de RR.HH.?',
      a: 'People Analytics combina datos, estadística y conocimiento de negocio para responder preguntas clave sobre personas: rotación, desempeño, planificación de dotación. No se trata solo de mostrar indicadores, sino de explicar por qué ocurren las cosas y qué decisiones concretas puedes tomar a partir de esa información.',
    },
    {
      id: 'faq-problemas',
      q: '¿Qué tipo de problemas se pueden abordar con un proyecto de People Analytics?',
      a: 'Abordamos temas como rotación y retención de talento, planificación de dotación, ausentismo, productividad, diseño organizacional, compensaciones, focalización de incentivos y experiencia del colaborador, siempre conectando los resultados con impacto en el negocio.',
    },
    {
      id: 'faq-datos',
      q: '¿Necesito tener mis datos en perfecto estado para comenzar?',
      a: 'No. Partimos con un diagnóstico de las fuentes actuales (Excel, ERP, sistemas de RR.HH., encuestas) y definimos un roadmap realista. Muchas veces el primer valor viene de ordenar, limpiar y conectar los datos que ya existen en tu organización.',
    },
    {
      id: 'faq-proceso',
      q: '¿Cómo es el proceso de trabajo típico?',
      a: 'Comenzamos con un diagnóstico y la definición de preguntas de negocio. Luego construimos modelos y dashboards de forma iterativa, validamos hallazgos con tu equipo y dejamos capacidades instaladas para que puedas operar las soluciones sin depender permanentemente de consultoría.',
    },
    {
      id: 'faq-herramientas',
      q: '¿Con qué herramientas y tecnologías trabajan?',
      a: 'Nos adaptamos al ecosistema de tu organización: Excel, Power BI, SQL y plataformas de RR.HH. como SAP, SuccessFactors u otras. El foco está en soluciones que tu equipo pueda usar y mantener, sin depender de herramientas que después nadie utiliza.',
    },
    {
      id: 'faq-organizaciones',
      q: '¿En qué tipo de organizaciones tienen experiencia?',
      a: 'Hemos trabajado con empresas de minería, retail, agroindustria, sector financiero, alimentos y bebidas, entre otras. Ajustamos la metodología al contexto cultural y tecnológico de cada organización, tanto en Chile como en otros países de Latinoamérica.',
    },
    {
      id: 'faq-tamano',
      q: '¿Qué tamaño de empresa atienden y cuánto dura un proyecto?',
      a: 'Acompañamos tanto a empresas grandes como a organizaciones medianas que quieren dar sus primeros pasos en People Analytics. Un proyecto típico puede ir desde algunas semanas (diagnóstico y quick wins) hasta varios meses cuando se requiere un modelo más integral o acompañamiento continuo.',
    },
    {
      id: 'faq-exito',
      q: '¿Cómo se mide el éxito de un proyecto de People Analytics?',
      a: 'Definimos indicadores de éxito desde el inicio: por ejemplo, reducción de rotación en segmentos críticos, mejora en tiempos de contratación, precisión en la planificación de dotación o mejor focalización de acciones de desarrollo. Cada entregable se conecta con decisiones concretas que tu equipo puede tomar.',
    },
  ],
}

export const footer = {
  tagline: 'Estrategia basada en datos para la toma de decisiones en Recursos Humanos',
  region: 'Chile · Latinoamérica',
  newsletterTitle: 'Recibe insights sobre People Analytics',
  legal: [
    { href: '/privacidad', label: 'Privacidad' },
    { href: '/terminos', label: 'Términos de uso' },
  ],
  copyright: 'HR Analytics. Todos los derechos reservados.',
  // Footer columns: cada item con href. Solo usar route: true para rutas internas (path /...).
  // Si route === true → Footer renderiza <Link to={href}>; si no → <a href={href} onClick={handleHashClick}>.
  // No usar route en enlaces #hash (inicio, servicios, industrias, etc.).
  columns: {
    industries: {
      title: 'Industrias',
      items: [
        { label: 'Minería', href: '#industrias' },
        { label: 'Agroindustria', href: '#industrias' },
        { label: 'Consumo masivo', href: '#industrias' },
        { label: 'Banca y servicios', href: '#industrias' },
        { label: 'Retail', href: '#industrias' },
      ],
    },
    services: {
      title: 'Servicios',
      items: [
        { label: 'I. Estrategia de Personas', href: '#pilar-estrategia-personas' },
        { label: 'II. Analítica y Datos', href: '#pilar-analitica-datos' },
        { label: 'III. Compensaciones y Estructura', href: '#pilar-compensaciones-estructura' },
        { label: 'IV. Desarrollo y Automatización', href: '#pilar-desarrollo-automatizacion' },
      ],
    },
    laFirma: {
      title: 'Consultora Boutique',
      items: [
        { href: '#quienes-somos', label: 'Liderazgo' },
        { href: '#reconocimiento', label: 'Reconocimiento' },
        { href: '#recomendaciones', label: 'Testimonios' },
        { href: '/propuesta-de-valor', label: 'Propuesta de valor', route: true },
        { href: '/nuestro-enfoque', label: 'Nuestro enfoque', route: true },
        { href: '#insights', label: 'Insights' },
        { href: '#contacto', label: 'Contacto' },
      ],
    },
  },
}
