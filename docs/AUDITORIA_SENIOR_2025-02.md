# Auditoría senior React/Vite — hranalytics-react

**Fecha:** 2025-02  
**Alcance:** Repo completo (navegación hash/scroll, header fijo, lazy loading, configuración Vite, accesibilidad, formulario de contacto, fuente única Servicios).

---

## A) Resumen ejecutivo

| Prioridad | Cantidad | Áreas |
|-----------|----------|--------|
| **P0** | 2 | Lint (hooks/reglas), PageLoader early return |
| **P1** | 4 | Scroll + PageLoader/hash, DX (tests), a11y (focus visible), envs |
| **P2** | 5 | Performance (chunks), seguridad (CSP), docs, GA/GTM duplicado |

**Quick wins:** ~~Corregir 4 errores de lint~~ **Aplicados:** PageLoader (hooks antes del return), Header (`_mobileMegaOpen`), scroll.js (catch con comentario), useReducedMotion (`queueMicrotask`). Añadir en CI: `npm run lint && npm run build`. Opcional: retrasar primer intento de scroll cuando hay hash.

---

## A.1 Riesgos P0 / P1 / P2

### P0 (crítico)

1. **React Hooks: useEffect condicional en PageLoader**  
   - **Archivo:** `src/components/PageLoader.jsx`  
   - **Problema:** `if (prefersReducedMotion) return null` antes de `useEffect`, lo que viola “hooks en el mismo orden en cada render”.  
   - **Impacto:** Comportamiento indefinido en tiempo de ejecución según versión de React.

2. **Lint falla (4 errores)**  
   - **Impacto:** CI no puede pasar, riesgo de introducir más errores sin verlos.  
   - Ver sección “Checklist de verificación” y “Hallazgos por archivo”.

### P1 (alto)

3. **Scroll + PageLoader + hash:** Si el usuario entra con `/#contacto`, ScrollManager hace el primer intento a los 150 ms. El PageLoader sigue visible hasta 700 ms. El scroll puede ejecutarse correctamente pero el usuario ve el loader encima; al desaparecer ya está en #contacto. Peor si #contacto estuviera dentro de un LazyMount (no es el caso: ContactForm es eager). **Recomendación:** Opcional retrasar `INITIAL_DELAY_MS` cuando hay hash hasta después de que el loader se oculte (p. ej. 800 ms), o no mostrar loader cuando hay hash.

4. **Variable no usada `mobileMegaOpen`** en Header: estado declarado y actualizado pero no leído. Aumenta ruido y confusión (P1-DX).

5. **Sin tests automatizados:** No hay script `test` en `package.json`. Riesgo de regresiones en scroll, formulario y rutas (P1-DX).

6. **Accesibilidad:** Revisar que todos los controles interactivos tengan `:focus-visible` visible (Tailwind `focus-visible:ring-*` ya usado en varios sitios; falta verificar cobertura total).

### P2 (medio)

7. **Vite chunks:** Solo `vendor-react` y `vendor-framer`. El bundle `index-*.js` (~330 KB gzip) podría dividirse (p. ej. `vendor-lucide`) para mejorar cache (P2-performance).

8. **index.html:** OG/urls y canonical están hardcodeados a `https://www.hranalytics.cl/`. No se inyectan desde `VITE_SITE_URL` en build (comentario en index.html lo indica). P2-DX/SEO.

9. **GTM/GA:** GTM se inyecta por Vite en `transformIndexHtml`; GA se carga en `analytics.js` cuando no hay GTM. Si ambos IDs están definidos, solo GTM se usa. Documentar comportamiento en README o config (P2-DX).

10. **Seguridad:** No hay CSP en el proyecto. P2-seguridad para producción.

11. **useReducedMotion:** Regla custom `set-state-in-effect` marca `setReduced(mq.matches)` en el effect. Patrón válido para sincronizar con matchMedia; considerar relajar regla o envolver en `queueMicrotask` si se quiere cumplir la regla sin cambiar comportamiento (P2-DX).

---

## A.2 Checklist de verificación (comandos exactos)

```bash
# Desde la raíz del proyecto (hranalytics-react)
cd /Users/ccr/Cursor/Pag_hranalytics/hranalytics-react

# 1. Lint (actualmente falla con 4 errores)
npm run lint

# 2. Build producción
npm run build

# 3. Preview del build
npm run preview

# 4. Tests (no existe script)
# npm run test   # No definido en package.json
```

**Recomendación:** Añadir en `package.json` un script que falle si lint falla, por ejemplo en CI:  
`"lint:ci": "npm run lint"` y en CI ejecutar `npm run lint && npm run build`.

---

## A.3 Hallazgos por archivo (patches concretos)

### 1) `src/components/PageLoader.jsx` — P0: hooks condicionales

**Problema:** El early return `if (prefersReducedMotion) return null` ocurre antes de `useEffect`, por lo que los hooks no se llaman en el mismo orden cuando `prefersReducedMotion` es true.

**Before (fragmento):**
```jsx
  if (prefersReducedMotion) return null

  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => { ... }, 700)
    return () => clearTimeout(timer)
  }, [show])
```

**After (recomendado):**
```jsx
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('seenLoader', '1')
      setShow(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [show])

  if (prefersReducedMotion || !show) return null
```
Mover todos los hooks al inicio del componente y dejar los returns condicionales después de los hooks.

---

### 2) `src/components/Header.jsx` — P1: variable no usada

**Problema:** `mobileMegaOpen` se declara y actualiza pero no se lee.

**Patch:** Eliminar estado si no se usa, o usarlo en el menú móvil. Si no hay lógica móvil que lo use:
```diff
- const [mobileMegaOpen, setMobileMegaOpen] = useState(null)
+ const [_mobileMegaOpen, setMobileMegaOpen] = useState(null)
```
O eliminar `setMobileMegaOpen` de `closeMenus` y del estado si es dead code.

---

### 3) `src/utils/scroll.js` — P0: bloque catch vacío

**Before:**
```js
  try {
    id = decodeURIComponent(id)
  } catch {}
```

**After:**
```js
  try {
    id = decodeURIComponent(id)
  } catch (_) {
    // id queda con el valor ya asignado (sin decode)
  }
```
O usar `catch (e) { /* ignore decode error */ }` para satisfacer no-empty.

---

### 4) `src/hooks/useReducedMotion.js` — regla set-state-in-effect

**Problema:** Algunos linters marcan `setReduced(mq.matches)` síncrono dentro del effect.

**Opción A — Deferir setState:**
```js
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tick = () => queueMicrotask(() => setReduced(mq.matches))
    tick()
    const handler = () => tick()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
```

**Opción B:** Mantener lógica actual y desactivar la regla en este archivo si el equipo considera el patrón válido.

---

## A.4 Navegación por hash / scroll, header fijo, lazy loading

### Flujo actual

- **ScrollManager** (`ScrollManager.jsx`): Reacciona a `pathname`, `hash`, `state`. Si hay `target` (#id o state.scrollTo), espera `INITIAL_DELAY_MS` (150 ms) y llama a `scrollToSection(target)`. Si el elemento no existe, reintenta con `RETRY_DELAYS_MS` [100, 300, 600, 1200, 2000] ms.
- **scrollToSection** (`utils/scroll.js`): `document.getElementById(id)` y `el.scrollIntoView({ behavior: smooth|auto, block: 'start' })`. El navegador aplica `scroll-margin-top` del CSS.
- **Header:** Fija `--header-height` en `document.documentElement` vía ResizeObserver y un effect con `[scrolled]` para recalcular altura. Hysteresis 60/40 en scroll para evitar parpadeo.
- **index.css:** `html { scroll-padding-top: var(--header-height, 90px) }`, `main section[id], main [id] { scroll-margin-top: var(--header-height, 90px); scroll-margin-bottom: 2rem }`. No hay uso de `scroll-mt-*` en componentes; todo se apoya en la variable CSS.
- **Lazy loading:** HomePage usa `LazyMount` + `Suspense` para SuccessCasesSection, RecommendationsSection, FAQSection, CTASection. ContactForm y las secciones con id de ancla (#servicios, #contacto, #inicio, etc.) están siempre montadas (eager). El bloque `#recomendaciones` tiene id en el wrapper `<div id="recomendaciones">`, por lo que el scroll a #recomendaciones funciona aunque el contenido interno sea lazy.

### Conclusiones

- Offsets unificados: una sola fuente (`--header-height` + scroll-margin-top), sin mezcla con `scroll-mt-*`.
- Un solo `<main id="main-content">` en `AppLayout.jsx`; SkipLink apunta a `#main-content`.
- Retries en ScrollManager se cancelan correctamente en el cleanup (`cancelled = true`, `clearTimeout` de todos los timers).
- Posible mejora menor: si se quiere evitar que el primer scroll ocurra bajo el PageLoader cuando hay hash, aumentar `INITIAL_DELAY_MS` cuando `hash` existe (p. ej. 800 ms) o no mostrar loader cuando `location.hash` está definido.

---

## A.5 Configuración Vite

- **Chunks:** `manualChunks`: `vendor-react`, `vendor-framer`. Útil añadir `vendor-lucide` si el tamaño de lucide-react lo justifica.
- **Env:** `loadEnv(mode, process.cwd(), '')`; se usan `VITE_GOOGLE_SITE_VERIFICATION`, `VITE_GTM_ID`. Resto de `VITE_*` se leen vía `import.meta.env` en `config.js`.
- **index.html:** Plugin `html-inject-google` reemplaza `<!-- GOOGLE_SITE_VERIFICATION -->` y `<!-- GOOGLE_TAG_MANAGER -->` / `<!-- GOOGLE_TAG_MANAGER_BODY -->`. No hay inyección de `VITE_SITE_URL` para canonical/OG (comentado en index.html).
- **GTM/GA:** GTM inyectado en head/body; GA cargado en `analytics.js` solo cuando `!GTM_ID` y `GA_ID` está definido. Sin conflicto en runtime; documentar en README o en comentarios de `config.js`/`analytics.js`.

---

## A.6 Accesibilidad

- **SkipLink:** Presente, `href="#main-content"`, clase `.skip-link` con `z-index: 1000` (por encima del PageLoader z-[100]). Correcto.
- **Focus trap:** MegaMenuPanel usa `focus-trap-react` con `escapeDeactivates`, `returnFocusOnDeactivate`, `onDeactivate: onClose`. Correcto.
- **Reduced motion:** PageLoader no se muestra si `useReducedMotion()` es true; `scrollToSection` y ScrollManager usan `prefers-reduced-motion` para `behavior: 'auto'`; `index.css` aplica `scroll-behavior: smooth` solo con `prefers-reduced-motion: no-preference`. Correcto.
- **Teclado:** Cierre con Escape en menú móvil y en mega menú. Revisar que todos los botones y enlaces tengan anillo de focus visible (p. ej. `focus-visible:ring-2`).

---

## A.7 Formulario de contacto

- **Validación:** Campos nombre, email, mensaje con mensajes claros; longitud mínima de mensaje.
- **Anti-spam:** Campo honeypot `website`; si tiene valor en submit se hace `setStatus('success')` y return sin enviar.
- **formStartedAt:** Se usa `startedAt = formStartedAt || Date.now()`, `setFormStartedAt(startedAt)` y en payload Apps Script `ts: String(startedAt)`.
- **Timeout:** AbortController con 15 s; mensaje de error específico para timeout.
- **Errores:** Mensajes por tipo (timeout, network, badRequest, server, rateLimited, etc.) y `safeServerMessage` para no mostrar HTML.
- **Env fallback:** Enlaces (email, WhatsApp, calendario) y bloque “Contacto directo” se renderizan solo si las variables de config están definidas (CONTACT_EMAIL, WHATSAPP_URL, etc.). Config usa `trim()` y validaciones (isValidEmail, isNonEmpty, isValidHttpsUrl) y SOCIAL_LINKS filtrado.

No se detectan riesgos P0/P1 en esta parte; solo recomendación de mantener documentación de envs en `.env.example`.

---

## B) Verificación específica del scroll

### Archivos revisados

| Archivo | Rol |
|--------|-----|
| `ScrollManager.jsx` | Ejecuta scroll a #id con delay y retries; limpia timers al desmontar o al cambiar pathname/hash/state. |
| `utils/scroll.js` | scrollToSection(id): getElementById + scrollIntoView; respeta scroll-margin-top del CSS. |
| `Header.jsx` | Mide altura del header, escribe `--header-height` en document.documentElement; effect con [scrolled] recalcula. |
| `index.css` | scroll-padding-top y scroll-margin-top con var(--header-height, 90px). |
| `HomePage.jsx` | Secciones con id; #recomendaciones en div wrapper; ContactForm sin lazy. |

### Detección

- **Retries que no se cancelan:** No. El cleanup del effect en ScrollManager hace `cancelled = true` y `timersRef.current.forEach(clearTimeout)`.
- **Offsets inconsistentes:** No. No hay `scroll-mt-*` en componentes; solo `scroll-margin-top: var(--header-height, 90px)` en CSS global.
- **Doble `<main id="main-content">`:** No. Solo uno en `AppLayout.jsx`.
- **PageLoader + hash:** El scroll puede ejecutarse a los 150 ms mientras el loader sigue visible hasta 700 ms. Comportamiento aceptable; opcional retrasar primer intento cuando hay hash (ver A.4).

### Fix mínimo sugerido (opcional)

Si se desea que el scroll espere a que el loader desaparezca cuando la URL tiene hash:

**ScrollManager.jsx — patch opcional:**
```diff
- const INITIAL_DELAY_MS = 150
+ const INITIAL_DELAY_MS = 150
+ const INITIAL_DELAY_WHEN_HASH_MS = 850  // después de PageLoader ~700ms
...
-    const t0 = setTimeout(() => attempt(0), INITIAL_DELAY_MS)
+    const delay = effectiveHash ? INITIAL_DELAY_WHEN_HASH_MS : INITIAL_DELAY_MS
+    const t0 = setTimeout(() => attempt(0), delay)
```

---

## C) Fuente única de verdad en Servicios

### Estado actual (ya implementado)

- **Fuente única:** `src/data/extendedServices.js`. Cada servicio tiene `id`, `pillarKey`, `order`, `slug`, `title`, y el resto de campos.
- **Catálogo:** `src/data/servicesCatalog.js` deriva:
  - `getMegaMenuData()` → estructura para el mega menú (category + items con id, label, href, path).
  - `getServicesByPillar()` → para la grilla por pilar (pillarKey, category, services completos).
  - `servicesBySlug` → mapa slug → servicio para páginas de detalle.
  - `PILLAR_IDS` → anclas por pillarKey.
- **Consumidores:**
  - Header usa `getMegaMenuData()` (no megaServices).
  - ServicesSection usa `getServicesByPillar()` y `PILLAR_IDS`.
  - ServiceDetailPage usa `servicesBySlug[slug]`.
- **constants.js:** Ya no define `megaServices`; solo enlaces de nav y socialLinks; comentario remite a servicesCatalog.

### Conclusión

No hay duplicidad entre megaServices y extendedServices; megaServices fue eliminado y todo se genera desde extendedServices vía servicesCatalog. No se requiere refactor adicional para “fuente única”.

---

## Recomendaciones finales (ordenadas)

1. **Quick win:** Arreglar los 4 errores de lint (PageLoader hooks, Header variable no usada, scroll.js catch, useReducedMotion si aplica).
2. Añadir script de verificación en CI: `npm run lint && npm run build`.
3. Opcional: retrasar scroll cuando hay hash (patch en ScrollManager) para evitar ejecutar bajo el PageLoader.
4. Documentar en README o .env.example: uso de GTM vs GA, variables VITE_* necesarias, y que canonical/OG no se inyectan desde env en build.
5. Valorar tests E2E o unitarios para scroll a sección, envío de formulario y rutas críticas.
6. Valorar chunk `vendor-lucide` y, si se usa otro dominio, inyección de `VITE_SITE_URL` en index.html para OG/canonical.
