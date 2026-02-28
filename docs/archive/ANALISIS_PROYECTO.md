# Análisis Profundo del Proyecto — HR Analytics React

> Documento de auditoría del estado actual del proyecto. Actualizado a febrero 2026.

---

## 1. Resumen Ejecutivo

| Aspecto | Estado | Notas |
| --- | --- | --- |
| **Stack** | ✅ Sólido | React 19, Vite 7, Tailwind, Framer Motion, Lucide React |
| **Arquitectura** | ✅ Clara | Layout único, rutas anidadas, lazy loading páginas y secciones |
| **Rutas** | ✅ Completas | Home, Propuesta, Enfoque, Servicios/:slug (14), Privacidad, Términos, 404 |
| **Navegación** | ✅ Refactorizada | Mega menú 4 pilares/14 servicios, Enfoque dropdown, hash links |
| **Build** | ✅ Optimizado | manualChunks (vendor-react, vendor-framer), chunkSizeWarningLimit |
| **Config** | ✅ | Formulario: `VITE_APPS_SCRIPT_URL` o `VITE_FORMSPREE_ENDPOINT` (config central en `config.js`) |
| **Accesibilidad** | ✅ Buena | Skip link, ARIA, focus visible, SocialIcon con ariaLabel |
| **Despliegue** | ✅ | Vercel, .npmrc legacy-peer-deps, engines node >=20.19.0 |

---

## 2. Archivos por Área

### 2.1 Entrada y Configuración

#### `main.jsx`

- **Rol:** Punto de entrada, providers (Router, StrictMode), initAnalytics
- **Estado:** ✅ Correcto

#### `App.jsx`

- **Rol:** Rutas, lazy loading, ScrollToTop
- **Estado:** ✅ Correcto
- **Rutas:** `/`, `/propuesta-de-valor`, `/nuestro-enfoque`, `/servicios/:slug`, `/privacidad`, `/terminos`, `*` (NotFoundPage)
- **ScrollToTop:** `window.scrollTo(0,0)` en cada cambio de pathname

#### `vite.config.js`

- **Rol:** Build, plugins (GTM, metas), manualChunks
- **Estado:** ✅ Correcto
- **Build:** vendor-react, vendor-framer; chunkSizeWarningLimit: 600

#### `index.html`

- **Estado:** ✅ Correcto
- **Meta:** OG/Twitter apuntan a `/images/og-share.png`

#### `config.js`

- **Estado:** ✅ Correcto
- **Exporta:** CALENDAR_BOOKING_URL, GTM_ID, GA_ID, CONTACT_EMAIL, WHATSAPP_*, LINKEDIN_URL, LINKEDIN_COMPANY_URL, SOCIAL_LINKS, FORMSPREE_ENDPOINT, APPS_SCRIPT_URL, CONTACT_FORM_READY, CONTACT_FORM_USE_FORMSPREE

#### `package.json`

- **engines.node:** `>=20.19.0`
- **Estado:** ✅

#### `.npmrc`

- **legacy-peer-deps:** true (ESLint 10 vs eslint-plugin-react-hooks)
- **Estado:** ✅

---

### 2.2 Layout y Navegación

#### `AppLayout.jsx`

- **Estado:** ✅ Clara
- **Orden:** SkipLink, ScrollManager, PageLoader, ScrollProgress, Header, PageView, Footer, WhatsAppButton, BackToTop

#### `Header.jsx` (~400 líneas)

- **Estado:** ✅ Refactorizado
- **Estructura:** MegaMenuPanel, constants en `header/`
- **Navegación:** Inicio, Servicios (mega 4 pilares), Industrias, Casos y Testimonios, Enfoque (dropdown), Contacto
- **headerSolid:** `scrolled || isDropdownActive || !isHome` — header sólido en páginas internas
- **Hash click:** En Home → scrollToSection; fuera de Home → `navigate({ pathname: '/', hash })`
- **Scroll spy:** useScrollSpy para activeSection en Home

#### `header/constants.js`

- **navLinks:** Inicio, Servicios (mega), Industrias, Casos y Testimonios, Enfoque (children), Contacto
- **megaServices:** 4 pilares (Estrategia, Analítica, Compensaciones, Desarrollo) con 14 servicios → `/servicios/:slug`
- **socialLinks:** LinkedIn, Email, WhatsApp con ariaLabel

#### `header/MegaMenuPanel.jsx`

- **Estado:** ✅ Actualizado
- **Estructura:** Items categorizados (Pilares) o array plano (Enfoque)
- **UI:** top-[3.25rem], pt-2 (menor gap), delay cierre 300ms
- **Estilo:** Dark (bg-navy) cuando dropdown activo

---

### 2.3 Scroll y Utilidades

#### `utils/scroll.js`

- **Estado:** ✅ Bien
- **Función:** scrollToSection(hashOrId, options) con offset, prefers-reduced-motion

#### `ScrollManager.jsx`

- **Estado:** ✅ Correcto
- **Lógica:** Si hash → scroll a sección; si no → scroll a top

#### `hooks/useScrollSpy.js`

- **Estado:** ✅ En uso
- **Rol:** Detecta sección visible para indicador activo en Header

---

### 2.4 Páginas

| Archivo | Estado | Notas |
| --- | --- | --- |
| `HomePage.jsx` | ✅ | Hero → Clientes → TrustBar → Servicios → Industrias → Recomendaciones (LazyMount) → HRAnalytics → ValueProp → About → Insights → FAQ+CTA (LazyMount) → ContactForm |
| `PropuestaValorPage.jsx` | ✅ | container-premium, TrustBar, grid 4 columnas |
| `NuestroEnfoquePage.jsx` | ✅ | container-premium, 3 pasos metodológicos |
| `ServiceDetailPage.jsx` | ✅ | Dinámica por slug. Hero, Por qué, Metodología, Testimonial, CTA. Redirect a /#servicios si slug desconocido |
| `PrivacidadPage.jsx` | ✅ | Legal |
| `TerminosPage.jsx` | ✅ | Legal |
| `NotFoundPage.jsx` | ✅ | 404 con link a Home |

**Lazy-load en Home:** SuccessCasesSection, RecommendationsSection, FAQSection, CTASection (LazyMount + React.lazy, minHeight 600/520).

---

### 2.5 Componentes de Sección

#### `LazyMount.jsx`

- **Estado:** ✅ Nuevo
- **Rol:** Monta children cuando el marcador entra en viewport (IntersectionObserver, rootMargin 700px)

#### `Hero.jsx`

- **Estado:** ✅ Completo
- **Contenido:** content desde content.js

#### `ServicesSection.jsx`

- **Estado:** ✅ Actualizado
- **Datos:** services.json (6 servicios)
- **SERVICE_DETAIL_SLUGS:** Derivado de extendedServices (14 servicios)
- **CTA:** CTAButton; "Ver metodología completa" para todos los ids en extendedServices
- **Iconos:** /images/s1-icon.svg … s6-icon.svg

#### `CTAButton.jsx`

- **Estado:** ✅ En uso
- **Rol:** Botón CTA reutilizable (primary teal, flecha)

#### `SocialIcon.jsx`

- **Estado:** ✅ En uso (Lucide)
- **Rol:** Iconos Mail, MessageCircle, Linkedin, Calendar

#### `PageLoader.jsx`

- **Estado:** ✅ Optimizado
- **Lógica:** sessionStorage `seenLoader` — solo primera visita; 700ms, luego null inmediato

#### Resto de secciones

- **ClientsSection, TrustBarSection, IndustriesSection, SuccessCasesSection, RecommendationsSection**
- **HRAnalyticsSection, ValuePropCompact, AboutSection, InsightsSection, FAQSection, CTASection, ContactForm**
- **Estado:** ✅ En uso

---

### 2.6 Datos

#### `content.js`

- **Estado:** ✅ Centralizado
- **Secciones:** hero, trustBar, industries, insights, valueProposition, enfoque, clients, successCases, recommendations, about, cta, faq, footer

#### `services.json`

- **Estado:** ✅ Actualizado
- **6 servicios:** ids 1, 2, 4, 5, 9, 14
- **Iconos:** /images/s1-icon.svg … s6-icon.svg (rutas corregidas)

#### `extendedServices.js`

- **Estado:** ✅ Catálogo completo
- **14 servicios** en 4 pilares: Estrategia (3), Analítica (5), Compensaciones (3), Desarrollo (3)
- **Campos:** id, slug, title, subtitle, image, why[], methodology[], relatedTestimonialId, relatedCaseId
- **Uso:** ServiceDetailPage, ServicesSection (mapeo id→slug)

---

### 2.7 Analytics

#### `utils/analytics.js`

- **Estado:** ✅ Flexible (GTM o GA4)
- **Eventos:** pageView, ctaClick, generate_lead

---

## 3. Estructura de Archivos (Actual)

```text
src/
├── main.jsx
├── App.jsx
├── index.css
├── config.js
├── components/
│   ├── AppLayout.jsx
│   ├── PageView.jsx
│   ├── Header.jsx
│   ├── header/
│   │   ├── constants.js
│   │   └── MegaMenuPanel.jsx
│   ├── CTAButton.jsx
│   ├── LazyMount.jsx
│   ├── SocialIcon.jsx
│   ├── Hero.jsx, HeroWordReveal.jsx, HeroParticles.jsx
│   ├── ScrollManager.jsx, ScrollProgress.jsx, PageLoader.jsx
│   ├── SkipLink.jsx, WhatsAppButton.jsx, BackToTop.jsx
│   ├── SectionReveal.jsx, TiltCard.jsx, MagneticButton.jsx
│   ├── AnimatedCounter.jsx, ServiceImage.jsx
│   └── [Secciones Home + ContactForm]
├── pages/
│   ├── HomePage.jsx
│   ├── PropuestaValorPage.jsx
│   ├── NuestroEnfoquePage.jsx
│   ├── ServiceDetailPage.jsx
│   ├── PrivacidadPage.jsx
│   ├── TerminosPage.jsx
│   └── NotFoundPage.jsx
├── hooks/
│   └── useScrollSpy.js
├── data/
│   ├── content.js
│   ├── services.json
│   └── extendedServices.js
└── utils/
    ├── scroll.js
    └── analytics.js
```

---

## 4. Checklist de Mejora (Estado)

- [x] og-share.png referenciado
- [x] Formulario de contacto: Apps Script o Formspree documentados en .env.example; lógica en config.js (CONTACT_FORM_READY, CONTACT_FORM_USE_FORMSPREE)
- [x] ScrollToTop en App.jsx
- [x] Header refactorizado (MegaMenuPanel, constants)
- [x] Ruta 404 (NotFoundPage)
- [x] Páginas de detalle por servicio (14 slugs en extendedServices)
- [x] Mega menú por categorías (4 pilares, 14 servicios)
- [x] useScrollSpy
- [x] Iconos servicios (/images/s1-icon.svg … s6-icon.svg)
- [x] Lazy-load below-the-fold en Home (LazyMount + React.lazy)
- [x] PageLoader optimizado (sessionStorage, 700ms)
- [x] Header sólido en páginas internas
- [x] Mega menú: posición, delay cierre, estilo dark cuando abierto
- [x] .npmrc legacy-peer-deps para build Vercel
- [x] engines.node >= 20.19.0

---

*Documento actualizado a febrero 2026.*
