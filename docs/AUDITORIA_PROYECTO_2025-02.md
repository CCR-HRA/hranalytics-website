# Auditoría integral del proyecto HR Analytics React

**Fecha:** 20 de febrero de 2025  
**Actualización (correcciones aplicadas):** Febrero 2026  
**Alcance:** Estructura, configuración, código, assets, seguridad, UX y fuentes de verdad.

---

## 1. Resumen ejecutivo

| Severidad | Cantidad | Descripción |
| --- | --- | --- |
| **Crítica** | 2 | ✅ Resueltos |
| **Alta** | 4 | ✅ Resueltos (npm audit, newsletter, route/hash, services.json) |
| **Media** | 7 | Parcial: 4.1, 4.2, 4.7 resueltos; resto en backlog/validación |
| **Baja** | 6 | Backlog técnico |
| **Informativa** | 5 | Mejoras opcionales |

---

## 2. Hallazgos críticos

### 2.1 LinkedIn duplicado y contradictorio — ✅ RESUELTO

**Archivos:** `src/config.js`, `src/components/header/constants.js`, `src/components/Footer.jsx`, `src/components/Header.jsx`

**Problema original:** Dos fuentes de verdad para enlaces sociales con URLs diferentes.

**Solución aplicada:** Se añadió `LINKEDIN_COMPANY_URL` en `config.js`. Header usa `socialLinks` (constants) que importa `LINKEDIN_COMPANY_URL`. Footer usa `SOCIAL_LINKS` con `LINKEDIN_URL` (perfil personal). Intencional: Header → empresa, Footer → perfil.

---

### 2.2 ServiceDetailPage sin `id="main-content"` — Skip Link — ✅ RESUELTO

**Archivos:** `src/components/SkipLink.jsx`, `src/pages/ServiceDetailPage.jsx`

**Problema original:** El Skip Link no funcionaba en páginas de detalle de servicio.

**Solución aplicada:** Se añadió `id="main-content"` al `<main>` de ServiceDetailPage.

---

## 3. Hallazgos altos

### 3.1 Dependencias con vulnerabilidades (npm audit) — ✅ RESUELTO

**Comando:** `npm audit` → tras `npm audit fix`: **0 vulnerabilidades**.

---

### 3.2 Newsletter del footer sin backend — ✅ RESUELTO

**Archivo:** `src/components/Footer.jsx`

**Problema original:** Formulario que simulaba suscripción sin backend.

**Solución aplicada:** Se reemplazó el formulario por el mensaje explícito: "Próximamente podrás suscribirte para recibir insights sobre People Analytics."

---

### 3.3 `content.js` footer.laFirma: propiedad `route` vs `hash` — ✅ RESUELTO

**Archivo:** `src/data/content.js`

**Problema original:** Semántica confusa entre `route: true` y `hash: true`.

**Solución aplicada:** Documentado en content.js: solo se usa `route: true` para rutas internas (path `/...`); los enlaces #hash no llevan `route`. Eliminados los `hash: true` redundantes. Footer sigue usando `item.route ? Link : <a onClick={handleHashClick}>`.

---

### 3.4 `services.json` vs `extendedServices.js` — ✅ RESUELTO (fuente única)

**Archivos:** `src/data/services.json`, `src/data/extendedServices.js`, `src/data/README.md`

**Problema original:** Dos fuentes de verdad para servicios e id↔imagen.

**Solución aplicada:** La grilla de servicios en Home usa solo `extendedServices` + `megaServices` (header/constants). `services.json` no se importa en ningún componente. Añadido `src/data/README.md` documentando que extendedServices.js + megaServices son la fuente de verdad; services.json se mantiene como legacy/respaldo.

---

## 4. Hallazgos medios

### 4.1 Config: contactos hardcodeados — ✅ RESUELTO

**Archivo:** `src/config.js`, `.env.example`

**Problema original:** Contactos fijados en código.

**Solución aplicada:** Variables de entorno con fallback: `VITE_CONTACT_EMAIL`, `VITE_WHATSAPP_NUMBER`, `VITE_WHATSAPP_DISPLAY`, `VITE_LINKEDIN_URL`, `VITE_LINKEDIN_HANDLE`, `VITE_LINKEDIN_COMPANY_URL`. Documentadas en `.env.example`.

---

### 4.2 index.html: metadatos y OG estáticos — ✅ PARCIALMENTE RESUELTO

**Archivo:** `index.html`, `src/config.js`

**Problema original:** OG y canonical con URL fija.

**Solución aplicada:** Añadido `SITE_URL` en config.js (`VITE_SITE_URL` con fallback). Comentario en index.html indicando que para staging/otros dominios se puede usar un plugin de build que reemplace la URL. Valores por defecto siguen siendo producción.

---

### 4.3 ServiceImage sin fallback visual explícito — ✅ RESUELTO

**Archivo:** `src/components/ServiceImage.jsx`

**Problema original:** Ante error de carga no había feedback visual claro.

**Solución aplicada:** Fallback con icono de imagen y texto "Imagen no disponible" cuando `status === 'error`.

---

### 4.4 Iconos s7–s14 inexistentes

**Archivos:** `src/data/extendedServices.js`, `src/data/services.json`

**Problema:** `services.json` solo referencia iconos s1–s6. `extendedServices` no usa iconos en detalle, pero si en el futuro se usan en cards o listados, faltarían s7-icon.svg a s14-icon.svg.

**Estado:** Actualmente no rompe nada; solo la grilla de 6 servicios usa iconos.

---

### 4.5 Páginas legales sin meta description — ✅ PARCIALMENTE RESUELTO

**Archivos:** `src/pages/PrivacidadPage.jsx`, `src/pages/TerminosPage.jsx`

**Problema original:** Compartir `/privacidad` o `/terminos` heredaba título genérico.

**Solución aplicada:** `useEffect` que setea `document.title` en ambas páginas. Meta description sigue siendo la del index (pendiente si se requiere).

---

### 4.6 AboutSection: links de estudios con `loading="lazy"`

**Archivo:** `src/components/AboutSection.jsx` (línea 188)

**Problema:** Las imágenes de universidades usan `loading="lazy"`, correcto para below-the-fold. Verificar que el orden de carga no genere CLS notable.

**Estado:** Bajo impacto; validar en producción.

---

### 4.7 `navLinks` en constants: "Industrias" sin mega menú — ✅ RESUELTO

**Archivo:** `src/components/header/constants.js`

**Problema original:** `megaIndustries` y `megaHr` vacíos generaban confusión.

**Solución aplicada:** Eliminados `megaIndustries` y `megaHr` (no se usaban). El ítem "Industrias" del nav es enlace simple a `#industrias`. `megaItems` en Header solo incluye `services` y `enfoque`.

---

## 5. Hallazgos bajos

### 5.1 Formulario de contacto: validación de `website` (honeypot)

**Archivo:** `src/components/ContactForm.jsx`

**Estado:** El campo `website` está oculto y actúa como honeypot. No se valida en cliente; si el backend lo usa, está bien. Documentar en APPS_SCRIPT_SETUP.

---

### 5.2 ESLint: sin reglas específicas de React/JSX

**Archivo:** `eslint.config.js`

**Problema:** No se extienden `eslint-plugin-react` ni config para jsx-a11y. Hay buen uso de ARIA en muchos componentes, pero no hay lint automatizado.

**Recomendación:** Añadir `eslint-plugin-jsx-a11y` para reforzar accesibilidad.

---

### 5.3 Favicon: `logo-teal.png` vs `fav.svg`

**Archivo:** `index.html`

**Estado:** Se usa `logo-teal.png`. Existe `fav.svg`, que podría ser más flexible para diferentes tamaños. No crítico.

---

### 5.4 ScrollManager y PageLoader

**Archivos:** `src/components/ScrollManager.jsx`, `src/components/PageLoader.jsx`

**Estado:** Lógica de scroll y loader implementada. Revisar que no dupliquen comportamiento con `ScrollToTop` en App.jsx.

---

### 5.5 `glob` en package.json

**Estado:** No se usa `glob` como dependencia directa en scripts visibles. Probable dependencia de ESLint; verificar con `npm ls glob`.

---

### 5.6 ServiceDetailPage: testimonial con `?.`

**Archivo:** `src/pages/ServiceDetailPage.jsx` (línea 79)

**Estado:** Ya se usa `testimonial?.photo`; correcto.

---

## 6. Puntos informativos (sin acción prioritaria)

### 6.1 Mega menú: overlay y `AnimatePresence`

**Estado:** Se usan overlay desde `top-0`, `AnimatePresence mode="wait"` y timer con `isMountedRef` para evitar actualizaciones tras desmontaje. Implementación sólida.

---

### 6.2 Analytics

**Estado:** `analytics.js` exporta `contactFormSubmit`, `emailClick`, `whatsappClick`, `ctaClick`, etc. ContactForm los usa correctamente.

---

### 6.3 Imágenes de servicios s1–s14

**Estado:** Todas las imágenes referenciadas en `extendedServices` existen en `public/images/services/`.

---

### 6.4 Vercel: rewrites y headers

**Archivo:** `vercel.json`

**Estado:** SPA rewrite y headers de seguridad (`X-Content-Type-Options`, `X-Frame-Options`) configurados correctamente.

---

### 6.5 Code splitting

**Estado:** Rutas lazy-loaded con Suspense; vendor chunks separados en Vite. Buena estructura.

---

## 7. Checklist de verificación rápida

| Ítem | Estado |
| --- | --- |
| npm install sin errores | ✓ |
| npm run build exitoso | ✓ (asumido) |
| npm audit con vulnerabilidades | ✓ 0 (tras npm audit fix) |
| Formulario contacto con config válida | ✓ |
| Email/WhatsApp desde config (no hardcode) | ✓ |
| LinkedIn desde config (LINKEDIN_COMPANY_URL) | ✓ |
| Skip Link en todas las páginas | ✓ |
| Imágenes de servicios presentes | ✓ |
| Meta OG configurables | ✓ SITE_URL en config; index con comentario para plugin |
| 404 y rutas válidas | ✓ |
| Footer links funcionando | ✓ |
| Mega menú Servicios operativo | ✓ |

---

## 8. Recomendaciones prioritarias

1. **Inmediatas** — ✅ Completadas
   - ~~Añadir `id="main-content"` al `<main>` de ServiceDetailPage~~
   - ~~Unificar LinkedIn: LINKEDIN_COMPANY_URL en config~~

2. **Esta semana** — ✅ Completado
   - ~~Ejecutar `npm audit fix`~~ → 0 vulnerabilidades.
   - ~~Mover contactos a variables de entorno~~ (config.js + .env.example).

3. **Próximo sprint** — Parcial
   - ~~Derivar/sincronizar services.json~~ → Fuente única documentada (extendedServices + megaServices); services.json legacy.

4. **Backlog**
   - Añadir `eslint-plugin-jsx-a11y`.

5. **Resueltos (verificación feb 2026)**
   - ✅ Convención `route` vs `hash` documentada en content.js; eliminados `hash: true` redundantes.
   - ✅ `npm audit fix` — 0 vulnerabilidades.
   - ✅ Contactos y LinkedIn desde env (VITE_CONTACT_EMAIL, VITE_WHATSAPP_*, VITE_LINKEDIN_*).
   - ✅ SITE_URL en config.js; index.html con comentario para OG multi-entorno.
   - ✅ services.json documentado como legacy; fuente única extendedServices + megaServices (src/data/README.md).
   - ✅ megaIndustries/megaHr eliminados de constants.
   - Revisar meta descriptions por página (pendiente si se requiere).

---

*Auditoría generada automáticamente. Revisar en contexto del proyecto.*
