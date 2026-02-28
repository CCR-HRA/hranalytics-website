# Auditoría completa del proyecto HR Analytics React

**Fecha:** 20 de febrero de 2025  
**Alcance:** Todos los archivos, estructura, código, assets, configuración y documentación.

---

## 1. Resumen ejecutivo

| Aspecto | Estado | Notas |
|---------|--------|-------|
| **Stack** | ✅ Sólido | React 19, Vite 7, Tailwind, Framer Motion, Lucide React |
| **Estructura** | ✅ Clara | 52 archivos fuente, layout único, rutas anidadas |
| **Build** | ✅ OK | `npm run build` exitoso, 0 vulnerabilidades npm audit |
| **Imports** | ✅ Sin rotos | Todas las dependencias resueltas correctamente |
| **Assets** | ✅ Completos | Todas las imágenes referenciadas existen en public/ |
| **Accesibilidad** | ✅ Básica | Skip link (#main-content), ARIA en iconos sociales |
| **Config** | ⚠️ Parcial | Formulario requiere VITE_APPS_SCRIPT_URL en .env |
| **Fuentes de datos** | ⚠️ Obsoleto | services.json existe pero no se importa |

---

## 2. Inventario de archivos

### 2.1 Código fuente (src/)

| Ubicación | Archivos | Propósito |
|-----------|----------|-----------|
| `main.jsx` | 1 | Punto de entrada, BrowserRouter, initAnalytics |
| `App.jsx` | 1 | Rutas, ScrollToTop, ErrorBoundary, lazy pages |
| `config.js` | 1 | CALENDAR_BOOKING_URL, GTM_ID, GA_ID, CONTACT_EMAIL, WHATSAPP_*, LINKEDIN_* |
| `index.css` | 1 | Estilos globales, Tailwind |
| `components/` | 34 | UI: Header, Footer, Hero, ServicesSection, etc. |
| `components/header/` | 2 | MegaMenuPanel.jsx, constants.js |
| `pages/` | 7 | HomePage, PropuestaValorPage, NuestroEnfoquePage, ServiceDetailPage, PrivacidadPage, TerminosPage, NotFoundPage |
| `data/` | 3 | content.js, extendedServices.js, services.json |
| `hooks/` | 1 | useScrollSpy.js |
| `utils/` | 2 | analytics.js, scroll.js |

### 2.2 Configuración y raíz

| Archivo | Estado |
|---------|--------|
| `package.json` | engines.node >= 20.19.0 |
| `vite.config.js` | manualChunks (vendor-react, vendor-framer), GTM/verification inject |
| `tailwind.config.js` | Colores primary, navy, spacing |
| `vercel.json` | SPA rewrites, headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy) |
| `.env.example` | 4 variables documentadas |
| `eslint.config.js` | js recommended, react-hooks, react-refresh, sin jsx-a11y |
| `index.html` | preload hero_1.jpg, OG/Twitter metas, placeholders GTM |

### 2.3 Public (assets)

| Ruta | Uso |
|------|-----|
| `logo-teal.png`, `logo-white.png` | Header, Footer, PageLoader, favicon |
| `og-image.jpg`, `images/og-share.png` | OG/Twitter share |
| `images/hero_1.jpg` | Hero background |
| `images/profile.jpg` | AboutSection |
| `images/clients/*.png` | ClientsSection, RecommendationsSection (collahuasi, cmp, westfalia, tarragona) |
| `images/companies/nestle.png` | RecommendationsSection (4 testimonios Nestlé) |
| `images/recommendations/*.png` | 6 fotos (juvenal, milan, mohamed, fabricio, ralf, gonzalo) |
| `images/universities/*.png` | AboutSection (mit, upf, udp, uv, guelph, uchile) |
| `images/services/s1.jpg`–`s14.jpg` | extendedServices, ServiceDetailPage, ServicesSection |
| `images/s1-icon.svg`–`s6-icon.svg` | ServicesSection (iconos por servicio) |
| `images/calendar.svg`, `email.svg`, `whatsapp.svg`, `linkedin.svg` | SocialIcon / footer si se usan SVGs |
| `_redirects` | SPA para Vercel/Netlify |

**Assets no referenciados en código:**  
`images/clients/agrosuper.png`, `images/clients/bancoestado.png` — existen pero no se usan en content.js.

---

## 3. Rutas y páginas

| Ruta | Página | id="main-content" | document.title |
|------|--------|-------------------|-----------------|
| `/` | HomePage | ✅ | Heredado |
| `/propuesta-de-valor` | PropuestaValorPage | ✅ | Heredado |
| `/nuestro-enfoque` | NuestroEnfoquePage | ✅ | Heredado |
| `/servicios/:slug` | ServiceDetailPage | ✅ | Dinámico por servicio |
| `/privacidad` | PrivacidadPage | ✅ | useEffect |
| `/terminos` | TerminosPage | ✅ | useEffect |
| `*` | NotFoundPage | ✅ | Heredado |

**Slugs de servicios (14):**  
planificacion-estrategica-personas, alineamiento-estrategico-equipos, planificacion-sucesion, paneles-kpi-analitica-rrhh, analisis-predictivo-riesgo-fuga, equidad-salarial-genero, ausentismo-focos-gestion, proyeccion-equilibrio-genero, compensaciones-incentivos-presupuesto, diseno-estructura-organizacional, modelos-negociacion-sindical, automatizacion-procesos-rrhh, capacitacion-planificacion-estrategica, compromiso-desempeno-equipos.

---

## 4. Hallazgos por severidad

### 4.1 Críticos — ninguno

No se detectan bloqueantes. El proyecto construye y funciona correctamente.

### 4.2 Altos

| ID | Hallazgo | Archivos | Recomendación |
|----|----------|----------|---------------|
| A1 | **services.json obsoleto** | `src/data/services.json` | No se importa en ningún archivo. ServicesSection usa megaServices (constants) + extendedServices. Opciones: eliminar o documentar como backup; si se elimina, actualizar docs que lo referencian. |
| A2 | **Formulario de contacto sin backend** | `ContactForm.jsx`, `config.js` | Requiere `VITE_APPS_SCRIPT_URL` en .env. Si está vacío, el formulario muestra "El formulario no está configurado correctamente." Documentar en README/.env.example. |
| A3 | **Meta OG/Twitter hardcodeadas** | `index.html` | og:url y og:image usan `https://www.hranalytics.cl/` fijo. En staging o dominios alternativos, los enlaces compartidos apuntarían mal. Usar `import.meta.env.VITE_SITE_URL` si se necesita multi-entorno. |

### 4.3 Medios

| ID | Hallazgo | Archivos | Recomendación |
|----|----------|----------|---------------|
| M1 | **Contactos hardcodeados** | `config.js` | CONTACT_EMAIL, WHATSAPP_NUMBER, LINKEDIN_URL fijados. Para múltiples entornos, mover a VITE_CONTACT_EMAIL, etc. |
| M2 | **content.js grande** | `src/data/content.js` | ~275 líneas. Valorar split por sección (hero, clients, footer, etc.) si crece. |
| M3 | **Header.jsx extenso** | `src/components/Header.jsx` | ~360 líneas. Candidato a extraer hooks (useMegaMenu) o subcomponentes. |
| M4 | **Iconos s7–s14 inexistentes** | `public/images/` | Solo existen s1-icon.svg a s6-icon.svg. extendedServices no usa iconos en detalle; ServicesSection solo usa hasta s6. Si en el futuro se añaden iconos a s7–s14, crear los SVG. |
| M5 | **megaIndustries vacío** | `header/constants.js` | El nav tiene ítem "Industrias" que apunta a #industrias. megaIndustries = []. Documentar si se planea mega menú más adelante. |
| M6 | **recommendations en content** | `ServiceDetailPage.jsx` | Importa `recommendations` desde content; en content está como `recommendations.items`. Verificado: estructura correcta. |

### 4.4 Bajos

| ID | Hallazgo | Recomendación |
|----|----------|---------------|
| B1 | **ESLint sin jsx-a11y** | Añadir eslint-plugin-jsx-a11y para reforzar accesibilidad. |
| B2 | **Favicon** | Se usa logo-teal.png. Existe fav.svg; valorar si conviene SVG para flexibilidad. |
| B3 | **Assets no usados** | agrosuper.png, bancoestado.png en clients/ — conservar si son reserva o eliminar si no. |
| B4 | **ScrollManager + scroll.js** | Revisar posible consolidación. |
| B5 | **Content-Security-Policy** | vercel.json no incluye CSP; puede ser complejo de mantener. |

### 4.5 Informativa (sin acción prioritaria)

- ErrorBoundary instalado en rutas lazy. ✅  
- ServiceImage con fallback "Imagen no disponible". ✅  
- useScrollSpy con debounce en resize. ✅  
- analytics?.ctaClick en ServicesSection. ✅  
- scrollToSection valida elemento antes de scroll. ✅  
- Footer: route vs hash documentado en content.js. ✅  
- Todas las páginas con id="main-content". ✅  

---

## 5. Verificación de imports y referencias

| Origen | Destino | Estado |
|--------|---------|--------|
| main.jsx | App, index.css, initAnalytics | ✅ |
| App.jsx | AppLayout, ErrorBoundary, HomePage, lazy pages | ✅ |
| ServicesSection | megaServices, extendedServices, analytics, scroll, ServiceImage | ✅ |
| ContactForm | analytics, CALENDAR_BOOKING_URL, CONTACT_EMAIL, WHATSAPP | ✅ |
| Header | navLinks, socialLinks, megaServices, MegaMenuPanel, useScrollSpy | ✅ |
| Footer | SOCIAL_LINKS, footer (content), scrollToSection | ✅ |
| extendedServices | Solo usado por ServicesSection, ServiceDetailPage | ✅ |
| content.js | Hero, ClientsSection, RecommendationsSection, AboutSection, FAQ, etc. | ✅ |
| services.json | **Ningún import** | ⚠️ Obsoleto |

---

## 6. Checklist de verificación rápida

| Ítem | Estado |
|------|--------|
| npm install sin errores | ✓ |
| npm run build exitoso | ✓ |
| npm audit 0 vulnerabilidades | ✓ |
| Todas las rutas con id="main-content" | ✓ |
| Skip link → #main-content | ✓ |
| Imágenes de servicios s1–s14 presentes | ✓ |
| Imágenes clients, companies, recommendations, universities | ✓ |
| logo-white.png, logo-teal.png, hero_1.jpg, og-share.png | ✓ |
| VITE_APPS_SCRIPT_URL documentado | ✓ (.env.example) |
| Formulario con validación y mensajes claros | ✓ |
| ErrorBoundary en rutas lazy | ✓ |
| Headers de seguridad en vercel.json | ✓ |
| Meta OG configurables | ⚠️ Hardcodeadas |
| services.json en uso | ✗ No importado |

---

## 7. Recomendaciones priorizadas

### Inmediatas
1. Decidir qué hacer con `services.json`: eliminar o documentar como backup; actualizar ANALISIS_ESTRUCTURA.md, README y otros docs que lo mencionen.

### Esta semana
2. Configurar `VITE_APPS_SCRIPT_URL` en producción si el formulario debe enviar correos.
3. Revisar que .env.example esté completo y que README indique cómo configurar el formulario.

### Próximo sprint
4. Mover contactos (CONTACT_EMAIL, WHATSAPP) a variables de entorno si se planea multi-entorno.
5. Inyectar URL base (og:url, og:image) vía Vite para staging/producción.
6. Valorar añadir eslint-plugin-jsx-a11y.

### Backlog
7. Refactorizar Header.jsx (hooks/subcomponentes).
8. Split de content.js por sección si crece.
9. Valorar Content-Security-Policy en vercel.json.

---

## 8. Documentación existente

| Documento | Contenido |
|-----------|-----------|
| `ANALISIS_ESTRUCTURA.md` | Mapa del proyecto, carpetas, catálogo de servicios (menciona services.json) |
| `AUDITORIA_ENLACES.md` | Hash links, rutas, scroll-mt-24, #reconocimiento |
| `AUDITORIA_PROYECTO_2025-02.md` | Hallazgos previos, muchos ya resueltos |
| `INFORME_FALLAS_PROYECTO.md` | Fallas por severidad, acciones prioritarias |
| `QA_MEGAMENU_2025-02.md` | Fixes del mega menú (timer, AnimatePresence) |
| `ESPECIFICACIONES_IMAGENES_SERVICIOS.md` | Especificaciones s1–s14 |

---

*Auditoría generada el 20 de febrero de 2025.*
