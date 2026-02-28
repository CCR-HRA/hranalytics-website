# Conexión Servicios ↔ Recomendaciones

Cada servicio (página de detalle) muestra un testimonial. El vínculo se define con `relatedTestimonialId` en `src/data/extendedServices.js`; los ítems de recomendación están en `src/data/content.js` bajo `recommendations.items`.

---

## 1. Por servicio: qué recomendación muestra

| # | Servicio | Slug | Recomendación actual |
|---|----------|------|----------------------|
| 1 | Planificación Estratégica de Personas | `planificacion-estrategica-personas` | **Fabricio Pavarin** (Nestlé, Jefatura) |
| 2 | Alineamiento Estratégico para Equipos | `alineamiento-estrategico-equipos` | **Rodrigo Batlle** (Tarragona, Cliente) |
| 3 | Planificación de Sucesión y Fortaleza | `planificacion-sucesion` | **Juvenal Soto Gamboa** (Westfalia Fruit, Cliente) |
| 4 | Paneles de Control KPI a la Medida | `paneles-kpi-analitica-rrhh` | **Rodrigo Batlle** (Tarragona, Cliente) |
| 5 | Análisis Predictivo de Riesgo de Fuga | `analisis-predictivo-riesgo-fuga` | **Ralf Buechsenschuss** (Nestlé, Colega senior) |
| 6 | Análisis de Equidad Salarial de Género | `equidad-salarial-genero` | **Mohamed Bolteya** (Nestlé, Jefatura) |
| 7 | Análisis de Ausentismo e Identificación de Focos | `ausentismo-focos-gestion` | **Gonzalo Zeiss Valderrama** (Nestlé, Jefatura) |
| 8 | Proyección de Equilibrio de Género | `proyeccion-equilibrio-genero` | **Mohamed Bolteya** (Nestlé, Jefatura) |
| 9 | Compensación Total, Incentivos y Presupuesto | `compensaciones-incentivos-presupuesto` | **Mohamed Bolteya** (Nestlé, Jefatura) |
| 10 | Diseño de Estructura Organizacional | `diseno-estructura-organizacional` | **Juvenal Soto Gamboa** (Westfalia Fruit, Cliente) |
| 11 | Modelos para Negociación Sindical | `modelos-negociacion-sindical` | **Gonzalo Zeiss Valderrama** (Nestlé, Jefatura) |
| 12 | Capacitación en SPP para HRBPs | `capacitacion-planificacion-estrategica` | **Fabricio Pavarin** (Nestlé, Jefatura) |
| 13 | Compromiso y Desempeño de Equipos | `compromiso-desempeno-equipos` | **Milan Marinovic Watson** (CMP, Cliente) |
| 14 | Automatización de Procesos con Python | `automatizacion-procesos-rrhh` | **Ralf Buechsenschuss** (Nestlé, Colega senior) |

---

## 2. Por recomendación: en qué servicios aparece

| ID recomendación | Nombre | Empresa | Tipo | Servicios que la usan |
|------------------|--------|---------|------|------------------------|
| `rec-juvenal` | Juvenal Soto Gamboa | Westfalia Fruit | Cliente | 3, 10 **(2)** |
| `rec-milan` | Milan Marinovic Watson | CMP | Cliente | 13 **(1)** |
| `rec-mohamed` | Mohamed Bolteya | Nestlé | Jefatura | 6, 8, 9 **(3)** |
| `rec-fabricio` | Fabricio Pavarin | Nestlé | Jefatura | 1, 12 **(2)** |
| `rec-ralf` | Ralf Buechsenschuss | Nestlé | Colega senior | 5, 14 **(2)** |
| `rec-gonzalo` | Gonzalo Zeiss Valderrama | Nestlé | Jefatura | 7, 11 **(2)** |
| `rec-rodrigo-batlle` | Rodrigo Batlle | Tarragona | Cliente | 2, 4 **(2)** |
| `rec-ingrid` | Ingrid Godoy Salgado | Collahuasi | Cliente | — **(ninguno)** |

---

## 3. Cómo cambiar la recomendación de un servicio

En **`src/data/extendedServices.js`**, localiza el objeto del servicio y cambia `relatedTestimonialId` por uno de estos valores:

- `rec-juvenal`
- `rec-milan`
- `rec-mohamed`
- `rec-fabricio`
- `rec-ralf`
- `rec-gonzalo`
- `rec-ingrid`
- `rec-rodrigo-batlle`

**Ejemplo:** para que “Planificación Estratégica de Personas” muestre a Fabricio en lugar de Milan:

```js
{
  id: 1,
  slug: 'planificacion-estrategica-personas',
  title: 'Planificación Estratégica de Personas',
  // ...
  relatedTestimonialId: 'rec-fabricio',  // antes: 'rec-milan'
}
```

Si quieres asignar recomendaciones a servicios que hoy no las usan en la lista (p. ej. Ingrid o Rodrigo para un servicio concreto), usa el mismo campo con el `id` correspondiente de la tabla de arriba.
