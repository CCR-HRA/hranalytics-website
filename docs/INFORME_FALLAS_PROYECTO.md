# Informe de fallas del proyecto – HR Analytics React

**Fecha:** Febrero 2025  
**Alcance:** Revisión exhaustiva de imports, datos, assets, lógica y configuración.

---

## Resumen ejecutivo

| Severidad | Cantidad | Acción |
| --- | --- | --- |
| **Crítica** | 4 | Corregir de inmediato |
| **Alta** | 6 | Corregir esta semana |
| **Media** | 10 | Planificar próximo sprint |
| **Baja** | 5 | Backlog |

---

## 1. CRÍTICAS

### 1.1 Imágenes de servicios faltantes — ✅ RESUELTO

**Archivos:** `src/data/extendedServices.js`  
**Problema original:** Los servicios 7–14 referenciaban imágenes inexistentes.

**Estado actual:** s1.jpg–s14.jpg existen en `/public/images/services/`. `ServiceImage` tiene fallback visual explícito ante error ("Imagen no disponible").

---

### 1.2 Testimonial.photo sin guarda — ✅ RESUELTO

**Archivo:** `src/pages/ServiceDetailPage.jsx`  
**Estado:** Se usa `testimonial?.photo &&` antes de renderizar la imagen.

---

### 1.3 MegaMenuPanel: item.path vs item.href (condición invertida)

**Archivo:** `src/components/header/MegaMenuPanel.jsx:69`  
**Problema:** La condición usa `item.path` para decidir si es ruta. En `constants.js`, los items tienen `path` y `href`; cuando son rutas internas, ambos existen. Si un item solo tiene `href` (ancla), `path` será undefined. La lógica actual parece correcta, pero conviene validar con datos reales.

**Estado:** Verificado – items con `path` usan `Link`, sin `path` usan `<a>`. Correcto.

---

### 1.4 flatMap sin guarda — ✅ RESUELTO

**Archivo:** `src/components/header/MegaMenuPanel.jsx`  
**Estado:** Se usa `cat.items ?? []` en el flatMap.

---

## 2. ALTA

### 2.1 Inconsistencia services.json vs extendedServices.js

**Archivos:** `src/data/services.json`, `src/data/extendedServices.js`  
**Problema:**

- `services.json`: 6 servicios con IDs 1, 4, 5, 9, 14, 2 (orden de tarjetas en home).
- `extendedServices.js`: 14 servicios con IDs 1–14.
- `SERVICE_DETAIL_SLUGS` en ServicesSection mapea por `extendedServices`, así que el “Ver metodología completa” puede apuntar al slug correcto aunque el ID venga de `services.json`.

**Estado:** El mapeo `extendedServices.map(s => [s.id, s.slug])` incluye los 14 IDs. Los 6 de `services.json` están contenidos en ese rango. Solo servicios con página extendida tienen slug; los que no tienen página redirigen a `/#servicios`. Correcto.

---

### 2.2 Preload hero_1.jpg (index.html)

**Archivo:** `index.html:10`  
**Problema:** Preload de `/images/hero_1.jpg` sin comprobar existencia.

**Estado:** El archivo existe en `public/images/hero_1.jpg`.

---

### 2.3 RecommendationsSection: visibleRecommendations vacío

**Archivo:** `src/components/RecommendationsSection.jsx:32`  
**Problema:** `currentIndex % (visibleRecommendations.length || 1)` – si `visibleRecommendations` es array vacío, `length` es 0, el `|| 1` evita división por cero.  
Si `recommendations.filter(...)` devuelve `[]`, `rec` sería `undefined` y habría error al acceder a `rec.quote`, etc.

**Recomendación:** Añadir guarda antes de renderizar:

```jsx
if (visibleRecommendations.length === 0) return null
// o
const rec = visibleRecommendations[currentIndex % (visibleRecommendations.length || 1)]
if (!rec) return null
```

---

### 2.4 Lazy sin ErrorBoundary (App.jsx)

**Archivo:** `src/App.jsx`  
**Problema:** Los componentes lazy (`ServiceDetailPage`, etc.) no tienen ErrorBoundary. Si falla la carga del chunk (red, 404), se muestra un error no controlado.

**Recomendación:** Envolver rutas con un ErrorBoundary que muestre mensaje y botón de reintentar.

---

### 2.5 scrollToSection sin validación — ✅ YA RESUELTO

**Archivo:** `src/utils/scroll.js`  
**Estado:** La función ya comprueba `if (!el) return false` antes de hacer scroll. No se producen errores.

---

### 2.6 Analytics sin guarda — ✅ RESUELTO

**Archivo:** `src/components/ServicesSection.jsx`  
**Estado:** Se usa `analytics?.ctaClick?.(...)` para evitar errores si el módulo no está cargado.

---

## 3. MEDIA

### 3.1 Logo favicon

**Archivo:** `index.html:5-6`  
**Problema:** Favicon apunta a `/logo-teal.png` (existe). Sin problema.

---

### 3.2 Rutas de universidades (content.js)

**Archivo:** `src/data/content.js:169-174`  
**Problema:** Se referencian `.png` para mit, uv, guelph, uchile. Existen tanto `.png` como `.svg` en `public/images/universities/`. Sin problema.

---

### 3.3 ServiceImage: variant desconocido

**Archivo:** `src/components/ServiceImage.jsx:14`  
**Problema:** `DIMENSIONS[variant]` puede ser undefined.

**Estado:** Ya hay fallback `|| DIMENSIONS.thumb`.

---

### 3.4 useScrollSpy: recálculo en resize

**Archivo:** `src/hooks/useScrollSpy.js`  
**Problema:** `calculateOffsets` se ejecuta en cada resize sin debounce.

**Recomendación:** Añadir debounce de 100–150 ms.

---

### 3.5 Contraste y accesibilidad

**Archivo:** Varios componentes  
**Problema:** Revisar contraste de `text-gray-400` sobre fondos claros (WCAG AA).

---

### 3.6 Imágenes sin width/height

**Archivo:** Varios componentes  
**Problema:** Algunas imágenes sin `width`/`height` pueden contribuir a CLS.

---

### 3.7 Headers de seguridad (vercel.json)

**Archivo:** `vercel.json`  
**Problema:** Solo se usan algunos headers. Faltan `Content-Security-Policy`, `X-XSS-Protection`, `Referrer-Policy`.

---

### 3.8 ContactForm: validación de URL

**Archivo:** `src/components/ContactForm.jsx`  
**Problema:** Validación de URL del formulario de Apps Script: considerar whitelist de dominios permitidos.

---

### 3.9 Overflow en Header

**Archivo:** `src/components/Header.jsx`  
**Problema:** En pantallas pequeñas (xl) el menú puede producir overflow horizontal. Verificar con `xl:hidden` y menú móvil.

---

### 3.10 Grid responsive en ServicesSection

**Archivo:** `src/components/ServicesSection.jsx:58`  
**Problema:** `grid-cols-2 md:grid-cols-3` puede ser ajustado en móviles muy pequeños.

**Recomendación:** Probar `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`.

---

## 4. BAJA

### 4.1 Bundle size

**Archivo:** `vite.config.js`  
**Problema:** `manualChunks` definido pero sin análisis sistemático de tamaño.

**Recomendación:** Añadir script o plugin de análisis (`rollup-plugin-visualizer`).

---

### 4.2 Variables de entorno

**Archivo:** `src/config.js`  
**Problema:** Variables expuestas al cliente. Solo se usan IDs de GTM/GA; es esperado en SPA.

---

### 4.3 Documentación de datos

**Problema:** Falta documentar la estructura de `services.json`, `extendedServices.js` y `content.js` para facilitar mantenimiento.

---

### 4.4 Tests

**Problema:** No hay tests unitarios ni de integración.

---

### 4.5 TypeScript

**Problema:** Proyecto en JS; TypeScript ayudaría a detectar errores de tipos.

---

## 5. Assets verificados

| Ruta referenciada | Existe |
| --- | --- |
| `/logo-white.png` | Sí |
| `/logo-teal.png` | Sí |
| `/images/hero_1.jpg` | Sí |
| `/images/og-share.png` | Sí |
| `/images/profile.jpg` | Sí |
| `/images/services/s1.jpg`–`s6.jpg` | Sí |
| `/images/services/s7.jpg`–`s14.jpg` | Sí |
| `/images/universities/*.png` | Sí |
| `/images/clients/*.png` | Sí |
| `/images/recommendations/*.png` | Sí |
| `/images/companies/nestle.png` | Sí |
| `/images/s1-icon.svg`–`s6-icon.svg` | Sí |

---

## 6. Acciones prioritarias

### Inmediato — ✅ Completadas

1. ~~Crear o reasignar imágenes para s7–s14~~ — Imágenes creadas.
2. ~~Añadir guarda `testimonial?.photo` en ServiceDetailPage.jsx~~ — Aplicado.
3. ~~Proteger `flatMap` en MegaMenuPanel: `cat.items ?? []`~~ — Aplicado.

### Esta semana — ✅ Completadas

1. ~~Añadir ErrorBoundary para rutas lazy~~ — ErrorBoundary.jsx creado y aplicado en App.jsx.
2. ~~Validar elemento en `scrollToSection`~~ — Ya retorna false si !el (scroll.js).
3. ~~Guarda de `rec` en RecommendationsSection~~ — Caso length === 0 manejado con mensaje; rec siempre definido cuando length > 0.

### Próximo sprint — Parcialmente completadas

1. ~~Debounce en `useScrollSpy` para resize~~ — Aplicado (120ms).
2. Revisar contraste (WCAG AA).
3. ~~Ampliar headers de seguridad en `vercel.json`~~ — X-XSS-Protection y Referrer-Policy añadidos.
4. Añadir `width`/`height` a imágenes críticas.

---

## 7. Notas

- El build actual termina sin errores.
- No hay imports rotos detectados.
- Las rutas y la navegación funcionan correctamente.
- El principal foco es la coherencia de datos (imágenes, testimonios) y el manejo defensivo de casos límite.
