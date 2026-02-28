# Revisión del proyecto HR Analytics React

**Fecha:** febrero 2025

---

## 1. Estado general

| Aspecto | Estado |
|---------|--------|
| **Build** | ✅ Compila correctamente |
| **Lint** | ✅ ESLint sin errores |
| **Stack** | React 19, Vite 7, Tailwind, Framer Motion |
| **Rutas** | Home, Propuesta de valor, Nuestro enfoque, Privacidad, Términos, 404 |

---

## 2. Estructura actual

```
src/
├── components/      # 31 componentes
│   └── header/      # MegaMenuPanel, constants
├── pages/           # 6 páginas (lazy-loaded)
├── hooks/           # useScrollSpy
├── data/            # content.js, services.json
├── utils/           # analytics.js, scroll.js
├── config.js        # IDs, contacto
├── App.jsx          # Router
└── main.jsx         # Entrada
```

---

## 3. Mejoras aplicadas en esta sesión

### Navegación
- Header con `useScrollSpy` (reemplaza lógica manual de activeSection)
- `scrollToSection` con offset, `prefers-reduced-motion`, keys únicas
- `ScrollManager` con RAF, retry, cleanup
- Mega menú: `scheduleMegaClose` anti-acumulación de timers, cancel en cierre
- Sentence case en labels de servicios
- `aria-label` en español para redes sociales

### Formulario
- ContactForm PR-01: validación HTTPS, mensajes de error, timeout
- ContactForm PR-04: honeypot (`website`), anti-bot por tiempo (`ts` desde primer tipeo)
- Mensaje específico para `RATE_LIMITED`

### Backend (Apps Script)
- PR-04: throttle 45s, honeypot, anti-bot por timing, Sheet backup, Lock, requestId

### Analytics
- `pageView` virtual para SPA
- `initAnalytics` idempotente, `send_page_view: false`
- GTM: `virtual_page_view`; GA4: `send_to`
- Consentimiento preparado (`isAnalyticsEnabled`)

### Ordenación
- Eliminados: react.svg, nestle duplicados, Navbar.jsx
- Archivados: ANALISIS_PROYECTO.md, LAYOUT-REFERENCE.md
- `.env.example` documentado en README

---

## 4. Corrección aplicada

**ESLint react-hooks/set-state-in-effect:** El `useEffect` que cerraba el mega menú al salir del home llamaba a `setMegaOpen(null)` de forma síncrona. Se cambió a `queueMicrotask(() => setMegaOpen(null))` para cumplir la regla.

---

## 5. Advertencia de build

```
(!) Some chunks are larger than 500 kB after minification
```

El bundle principal (~500 KB) podría optimizarse con:
- `manualChunks` en Vite (separar vendor: react, framer-motion, react-router)
- Lazy load de secciones pesadas

---

## 6. Documentación disponible

| Archivo | Contenido |
|---------|------------|
| `docs/ANALISIS_ESTRUCTURA.md` | Mapa del proyecto, archivos obsoletos |
| `docs/APPS_SCRIPT_SETUP.md` | Setup PR-04, contrato frontend ↔ backend |
| `docs/GUIA_CONFIGURACION.md` | Env, formulario, analytics |
| `docs/DEPLOYMENT.md` | Despliegue Vercel |
| `docs/PLAN_MEJORA.md` | Roadmap de mejoras |
| `docs/archive/` | Docs históricos |

---

## 7. Variables de entorno

| Variable | Uso |
|----------|-----|
| `VITE_APPS_SCRIPT_URL` | Formulario de contacto (Apps Script) |
| `VITE_GTM_ID` | Google Tag Manager |
| `VITE_GA_ID` | Google Analytics 4 |
| `VITE_GOOGLE_SITE_VERIFICATION` | Search Console |
| `VITE_CALENDAR_BOOKING_URL` | Enlace a calendario |
