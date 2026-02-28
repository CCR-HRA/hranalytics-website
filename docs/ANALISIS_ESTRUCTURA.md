# Análisis de estructura del proyecto HR Analytics React

Documento de auditoría: carpetas, archivos en uso, obsoletos y recomendaciones de organización.

**Última actualización:** Febrero 2026

---

## 1. Mapa del proyecto

```
hranalytics-react/
├── public/                 # Assets estáticos servidos directamente
│   ├── images/             # Imágenes del sitio
│   │   ├── clients/        # Logos de clientes
│   │   ├── companies/      # Logos de empresas (recomendaciones)
│   │   ├── universities/   # Logos universidades (UV, UChile, MIT, Guelph, UPF, UDP)
│   │   ├── recommendations/# Fotos de quienes recomiendan
│   │   ├── services/       # s1.jpg–s14.jpg, iconos s1-icon.svg … s6-icon.svg, service-icon.svg
│   │   └── og-share.png    # OG para redes sociales
│   ├── logo-teal.png       # Logo Header (modo claro)
│   ├── logo-white.png      # Logo Header oscuro, PageLoader
│   └── _redirects          # Reglas SPA para Vercel/Netlify
│
├── src/
│   ├── components/         # Componentes React
│   │   ├── header/         # MegaMenuPanel, constants (4 pilares, 14 servicios)
│   │   ├── AppLayout.jsx   # SkipLink, ScrollManager, PageLoader, ScrollProgress, Header, PageView, Footer, WhatsAppButton, BackToTop
│   │   ├── ScrollManager.jsx   # Orquestador único: hash → scrollToSection con reintentos; sin hash → scroll top (auto)
│   │   ├── CTAButton.jsx, LazyMount.jsx, SocialIcon.jsx, ServiceImage.jsx, ErrorBoundary.jsx
│   │   ├── Hero.jsx, HeroWordReveal.jsx, HeroParticles.jsx, SectionReveal.jsx, TiltCard.jsx, MagneticButton.jsx
│   │   ├── ScrollProgress.jsx, PageLoader.jsx, SkipLink.jsx, WhatsAppButton.jsx, BackToTop.jsx
│   │   └── [Secciones Home + ContactForm]
│   ├── hooks/              # useScrollSpy.js (scroll spy para menú activo en Home)
│   ├── pages/              # HomePage + rutas lazy-loaded (PropuestaValor, NuestroEnfoque, ServiceDetailPage, Privacidad, Terminos, NotFoundPage)
│   ├── data/               # Contenido y datos
│   │   ├── content.js      # Hero, trustBar, industries, insights, footer columns, etc.
│   │   ├── extendedServices.js   # 14 servicios con metodología (fuente de verdad para detalle y grilla)
│   │   ├── services.json   # Legacy; no se importa (ver data/README.md)
│   │   └── README.md       # Documentación: content.js, extendedServices, megaServices, services.json
│   ├── utils/              # scroll.js (scrollToSection), analytics.js
│   ├── config.js           # SITE_URL, contacto/env, formulario (CONTACT_FORM_READY, APPS_SCRIPT_URL, FORMSPREE)
│   ├── App.jsx             # Router, rutas, ErrorBoundary + Suspense en lazy
│   └── main.jsx            # Punto de entrada
│
├── docs/                   # Documentación (auditorías, QA, guías)
│   └── archive/            # ANALISIS_PROYECTO, etc.
├── dist/                   # Build de producción (gitignored)
├── .npmrc                  # legacy-peer-deps (ESLint 10)
└── [raíz]                  # package.json, vercel.json, vite.config.js, tailwind.config.js, index.html
```

---

## 2. Carpetas y su propósito

| Carpeta | Propósito | Estado |
| --- | --- | --- |
| `public/` | Assets estáticos: imágenes, logos, favicon, _redirects | ✅ En uso |
| `public/images/clients/` | Logos de clientes | ✅ En uso |
| `public/images/companies/` | Logos de empresas en recomendaciones | ✅ En uso |
| `public/images/universities/` | Logos UV, UChile, MIT, Guelph, UPF, UDP | ✅ En uso |
| `public/images/recommendations/` | Fotos de recomendadores | ✅ En uso |
| `public/images/services/` | s1.jpg–s14.jpg de servicios | ✅ En uso |
| `src/components/` | Componentes UI | ✅ En uso |
| `src/components/header/` | MegaMenuPanel, constants (4 pilares, 14 servicios) | ✅ En uso |
| `src/hooks/` | useScrollSpy para scroll spy en Home | ✅ En uso |
| `src/pages/` | Home, PropuestaValor, NuestroEnfoque, ServiceDetailPage, Privacidad, Terminos, 404 | ✅ En uso |
| `src/data/` | content.js, extendedServices.js, data/README.md; services.json legacy (no importado) | ✅ En uso |
| `src/utils/` | analytics.js, scroll.js | ✅ En uso |
| `docs/` | Documentación | ✅ En uso |
| `docs/archive/` | Documentos archivados | ✅ En uso |
| `dist/` | Build generado por Vite | 🔄 Generado, no versionar |

---

## 3. Rutas y páginas

| Ruta | Página | Carga |
| --- | --- | --- |
| `/` | HomePage | Eager |
| `/propuesta-de-valor` | PropuestaValorPage | Lazy |
| `/nuestro-enfoque` | NuestroEnfoquePage | Lazy |
| `/servicios/:slug` | ServiceDetailPage | Lazy (14 slugs) |
| `/privacidad` | PrivacidadPage | Lazy |
| `/terminos` | TerminosPage | Lazy |
| `*` | NotFoundPage | Lazy |

**Lazy-load en Home (below-the-fold):** SuccessCasesSection, RecommendationsSection, FAQSection, CTASection (LazyMount + React.lazy).

---

## 4. Catálogo de servicios

| Fuente | Contenido |
| --- | --- |
| `header/constants.js` (megaServices) | 14 servicios en 4 pilares; Header y ServicesSection (grilla por pilar) |
| `extendedServices.js` | 14 servicios con metodología, why, testimonios; ServiceDetailPage y mapeo id→slug |

**Pilares:** I. Estrategia (3) · II. Analítica (5) · III. Compensaciones (3) · IV. Desarrollo (3).  
**services.json:** Legacy; no se importa. Ver `src/data/README.md`.

---

## 5. Flujo principal

```
main.jsx
  └── App.jsx (Router; ErrorBoundary + Suspense en rutas lazy)
        └── AppLayout
              ├── SkipLink (#main-content)
              ├── ScrollManager     ← Orquestador único: hash → scrollToSection (reintentos); sin hash → scroll top (auto)
              ├── PageLoader        (sessionStorage: solo primera visita)
              ├── ScrollProgress    (barra superior; rAF + umbral para reducir destello)
              ├── Header            (mega menú Servicios/Enfoque; delay 250ms; navigate para hash)
              ├── PageView (Outlet)
              │     └── [HomePage | ServiceDetailPage | ...]
              ├── Footer
              ├── WhatsAppButton
              └── BackToTop
```

**Nota:** No existe `ScrollToTop.jsx`; el scroll al cambiar de ruta lo gestiona `ScrollManager` con `behavior: 'auto'`.

**Componentes más referenciados:**
- `SocialIcon` → Header, Footer, WhatsAppButton, ContactForm, AboutSection, CTASection
- `CTAButton` → ServicesSection, Hero, ServiceDetailPage, HRAnalyticsSection
- `SectionReveal` → ServicesSection, InsightsSection, ValuePropCompact, IndustriesSection
- `scrollToSection` (utils) → ScrollManager, Hero, AboutSection, CTASection, HRAnalyticsSection, Footer, etc.
- `analytics` (utils) → Hero, ContactForm, AboutSection, FAQSection, CTASection

---

## 6. Variables de entorno

| Variable | Uso |
| --- | --- |
| `VITE_GTM_ID` | Google Tag Manager |
| `VITE_GA_ID` | Google Analytics 4 |
| `VITE_GOOGLE_SITE_VERIFICATION` | Search Console |
| `VITE_CALENDAR_BOOKING_URL` | Enlace a calendario de reuniones |
| `VITE_APPS_SCRIPT_URL` | Formulario de contacto (Apps Script) |
| `VITE_FORMSPREE_ENDPOINT` | Formulario de contacto (alternativa a Apps Script) |
| `VITE_SITE_URL` | URL base del sitio (OG, canonical); inyectar en index.html requiere plugin |
| `VITE_CONTACT_EMAIL`, `VITE_WHATSAPP_NUMBER`, `VITE_WHATSAPP_DISPLAY` | Contacto (opcional) |
| `VITE_LINKEDIN_URL`, `VITE_LINKEDIN_HANDLE`, `VITE_LINKEDIN_COMPANY_URL` | Redes (opcional) |
| `VITE_COMPANY_ADDRESS` | Dirección empresa (Footer, contacto) |

---

## 7. Configuración de despliegue

| Archivo | Propósito |
|---------|-----------|
| `package.json` | `engines.node`: `>=20.19.0` |
| `.npmrc` | `legacy-peer-deps=true` (ESLint 10 vs eslint-plugin-react-hooks) |
| `vercel.json` | buildCommand, outputDirectory: dist, rewrites SPA, headers |

**Vercel:** Configurar Node.js Version 20.x en Project Settings → General.

---

## 8. Archivos obsoletos o eliminados

| Archivo | Estado |
| --- | --- |
| `ScrollToTop.jsx` | ✅ Eliminado; ScrollManager hace scroll top en cambio de ruta |
| `src/assets/react.svg` | ✅ Eliminado |
| `Navbar.jsx` | ✅ No existe; AppLayout usa Header |
| `services.json` | Legacy: no se importa; grilla Home usa extendedServices + megaServices (ver data/README.md) |
| `ANALISIS_PROYECTO.md` | ✅ En docs/archive/ |

---

## 9. Auditoría pendiente (opcional)

| Tema | Observación |
| --- | --- |
| `content.js` | Valorar split por sección si crece. |
| `Header.jsx` | Candidato a extraer hooks/subcomponentes si crece. |
| ScrollManager + scroll.js | ScrollManager orquesta; scroll.js es la utilidad de scrollToSection. Consolidación no prioritaria. |
| Imágenes servicios | s1.jpg–s14.jpg en `public/images/services/`; iconos s1–s6 + service-icon.svg. |
| CSS scroll | `html`: scroll-behavior smooth, scroll-padding-top 90px; secciones: scroll-margin-top 90px (index.css). |

---

*Última actualización: Febrero 2026*
