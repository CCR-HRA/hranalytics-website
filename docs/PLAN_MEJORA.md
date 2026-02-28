# Plan de Mejora — HR Analytics

Documento maestro para priorizar y ejecutar mejoras en el sitio. Actualizado según el estado actual del proyecto.

---

## Estado actual (completado)

| Área | Acción | Estado |
|------|--------|--------|
| Assets | Eliminación de 18 imágenes no usadas (~8.5 MB) | ✅ Hecho |
| Contacto | Centralización en `src/config.js` (CONTACT_EMAIL, SOCIAL_LINKS, etc.) | ✅ Hecho |
| Componentes | Footer, AboutSection, ContactForm, Header, Privacidad, Términos usan config | ✅ Hecho |

---

## Fase 1: Corto plazo (1–2 semanas)

### 1.1 SEO y compartir en redes sociales

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 1 | Crear `og-share.png` (1200×630 px) para Open Graph y Twitter | Bajo | Alto |
| 2 | Actualizar `index.html`: usar `og-share.png` en meta og:image si existe | Bajo | Medio |
| 3 | Inyectar CONTACT_EMAIL en JSON-LD vía plugin Vite (evitar duplicación con config) | Medio | Mantenibilidad |

**Nota:** Hoy se usa `hero_1.jpg` como fallback para OG. Una imagen específica 1200×630 mejora la vista en redes.

---

### 1.2 Imágenes restantes

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 4 | Unificar logo Nestlé: decidir una sola ruta (`clients/` o `companies/`) y actualizar referencias | Bajo | Mantenibilidad |
| 5 | Evaluar migración de logos universidades a SVG (mit, uv, guelph, uchile ya tienen .svg) para menor peso | Medio | Performance |
| 6 | ~~Validar si `images/clients/nestle.png` se usa; si no, eliminarlo~~ | Bajo | ✅ Hecho (eliminado, no referenciado) |

---

### 1.3 Documentación y configuración

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 7 | Añadir comentario en `config.js`: si cambias CONTACT_EMAIL, actualizar `index.html` (JSON-LD) | Muy bajo | Mantenibilidad |
| 8 | ~~Revisar `ANALISIS_PROYECTO.md` y `LAYOUT-REFERENCE.md`~~: archivados en `docs/archive/` | Bajo | ✅ Hecho |
| 9 | Añadir `SITE_URL` en config o env para canonical, og:url y JSON-LD dinámicos | Medio | Escalabilidad |

---

## Fase 2: Mediano plazo (1–2 meses)

### 2.1 Performance

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 10 | Lazy load de secciones pesadas (ej. SuccessCasesSection, RecommendationsSection) con `React.lazy` | Medio | Carga inicial |
| 11 | Optimizar hero_1.jpg: comprimir y/o ofrecer WebP con `<picture>` | Medio | LCP |
| 12 | Añadir `loading="lazy"` donde falte en imágenes below-the-fold | Bajo | Performance |
| 13 | Evaluar code splitting por ruta (páginas PropuestaValor, NuestroEnfoque, etc.) | Medio | Bundle size |

---

### 2.2 Accesibilidad

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 14 | Auditoría con Lighthouse y axe-core; corregir issues críticos | Medio | A11y |
| 15 | Revisar orden de tabulación en Header/MegaMenu (focus trap en menú desplegable) | Medio | Navegación por teclado |
| 16 | Asegurar que todos los botones e íconos tengan `aria-label` o texto visible | Bajo | Screen readers |

---

### 2.3 UX y contenido

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 17 | Newsletter del Footer: conectar con servicio real (Mailchimp, ConvertKit, etc.) o desactivar temporalmente | Medio | Funcionalidad |
| 18 | Revisar consistencia de títulos/eyebrows entre secciones y páginas internas | Bajo | Branding |
| 19 | Añadir breadcrumbs en páginas internas (PropuestaValor, NuestroEnfoque, etc.) | Bajo | SEO y navegación |

---

## Fase 3: Largo plazo (3+ meses)

### 3.1 Arquitectura y mantenibilidad

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 20 | Migrar `content.js` a JSON o CMS headless si el contenido crece o se edita frecuentemente | Alto | Escalabilidad |
| 21 | Considerar variables de entorno para CONTACT_EMAIL y WHATSAPP (multi-tenant o staging) | Medio | Flexibilidad |
| 22 | Tests E2E (Playwright/Cypress) para flujos críticos: navegación, formulario, CTA | Alto | Calidad |
| 23 | Tests unitarios para utilidades (scroll, analytics) | Medio | Robustez |

---

### 3.2 SEO avanzado

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 24 | Meta tags dinámicos por ruta (título, descripción) con React Helmet o similar | Medio | SEO por página |
| 25 | Sitemap.xml y robots.txt generados en build | Bajo | Indexación |
| 26 | Revisar Core Web Vitals (LCP, FID, CLS) y optimizar si es necesario | Medio | Rankings |

---

### 3.3 Infraestructura

| # | Acción | Esfuerzo | Impacto |
|---|--------|----------|----------|
| 27 | CI/CD: tests automáticos en PR, bloqueo de merge si falla lint/build | Medio | Calidad |
| 28 | Monitoreo post-deploy: uptime, errores JS (Sentry u otro) | Medio | Operación |
| 29 | CDN para assets estáticos si el tráfico crece | Medio | Performance global |

---

## Resumen por prioridad

```
Alta    → 1 (og-share), 4–6 (imágenes), 14 (Lighthouse)
Media   → 10–13 (performance), 15–16 (a11y), 17 (newsletter)
Baja    → 7–9 (docs/config), 18–19 (UX), 24–26 (SEO avanzado)
```

---

## Checklist rápido antes de cada deploy

- [ ] `npm run lint` sin errores
- [ ] `npm run build` exitoso
- [ ] Variables de entorno configuradas en Vercel/host
- [ ] Formulario de contacto probado (VITE_APPS_SCRIPT_URL)
- [ ] GTM/GA verificados si aplica

---

## Referencias

- [GUIA_CONFIGURACION.md](GUIA_CONFIGURACION.md) — Variables de entorno, Apps Script, GTM
- [DEPLOYMENT.md](DEPLOYMENT.md) — Vercel, Netlify
- [ANALISIS_PROYECTO.md](../ANALISIS_PROYECTO.md) — Análisis detallado por archivo
