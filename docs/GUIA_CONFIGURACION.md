# Guía de configuración - HR Analytics

Guía paso a paso para poner en marcha todo el sitio. Sigue el orden indicado.

---

## Antes de empezar

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Abre `.env` en tu editor — allí irás pegando cada valor.

---

## ✅ Checklist rápida

| # | Qué | Dónde | Obligatorio |
|---|-----|-------|-------------|
| 1 | WhatsApp | `src/config.js` | ✅ Ya está |
| 2 | Formulario de contacto | Apps Script + `.env` | Recomendado |
| 3 | Search Console | `.env` | Recomendado (SEO) |
| 4 | Google Tag Manager | `.env` | Opcional |
| 5 | Google Calendar | `.env` | Opcional |

---

## 1. WhatsApp — Sin configuración

**Estado:** Ya configurado en `src/config.js`

- Número: +56 940232911  
- Mensaje: "Hola, llegué desde hranalytics.cl y me interesaría conversar sobre consultoría en People Analytics."

**Para cambiar:** Edita `src/config.js` → `WHATSAPP_NUMBER` y/o `WHATSAPP_DEFAULT_MESSAGE`

---

## 2. Formulario de contacto (Apps Script + MailApp)

Recibe los mensajes en tu correo. Guía detallada: [`docs/APPS_SCRIPT_SETUP.md`](APPS_SCRIPT_SETUP.md).

### Paso 2.1 — Crear el script

1. Ve a [script.google.com](https://script.google.com) → **Nuevo proyecto**
2. Borra el código por defecto
3. Copia el contenido de `docs/apps-script-form-handler.gs` y pégalo
4. Edita `CONTACT_EMAIL` si usas otro correo
5. Guarda (Ctrl+S)

### Paso 2.2 — Desplegar

1. **Implementar** → **Nueva implementación** → **Aplicación web**
2. **Ejecutar como:** Yo
3. **Quién tiene acceso:** Cualquier persona
4. **Implementar** y copia la URL (termina en `/exec`)

### Paso 2.3 — Pegar la URL en .env

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXXX/exec
```

### Paso 2.4 — Probar

1. `npm run dev`
2. Envía un mensaje de prueba
3. Revisa tu bandeja (y spam la primera vez)

**Nota:** La primera vez, Google puede pedir autorizar la app. Entra a la URL del deployment, acepta los permisos y vuelve a probar.

---

## 3. Google Search Console

Para verificar que hranalytics.cl es tu sitio y ver estadísticas de búsqueda.

### Pasos

1. Entra a [Google Search Console](https://search.google.com/search-console)
2. **Añadir propiedad** → URL: `https://hranalytics.cl`
3. Método: **Etiqueta HTML**
4. Copia el valor de `content=`, por ejemplo:
   ```html
   <meta name="google-site-verification" content="abc123XYZ..." />
   ```
   Solo necesitas: `abc123XYZ...` (lo que va dentro de `content="..."`)

En `.env`:

```env
VITE_GOOGLE_SITE_VERIFICATION=abc123XYZ...
```

---

## 4. Google Tag Manager (Analytics)

Para medir visitas, clics y conversiones. GTM te permite añadir GA4, anuncios, etc. sin tocar código.

### Opción A — Usar Google Tag Manager (recomendado)

1. Entra a [Google Tag Manager](https://tagmanager.google.com)
2. Crea un **contenedor** para el sitio (tipo: Web)
3. Copia el **ID del contenedor** (formato: `GTM-XXXXXX`)
4. Dentro de GTM, crea una etiqueta de **Google Analytics: GA4** y configura tu Measurement ID
5. Publica el contenedor

En `.env`:

```env
VITE_GTM_ID=GTM-XXXXXX
```

### Opción B — Solo Google Analytics 4

Si no quieres usar GTM, usa directamente GA4:

1. Entra a [Google Analytics](https://analytics.google.com)
2. Crea una propiedad y una vista web
3. Copia el **Measurement ID** (formato: `G-XXXXXXXXXX`)

En `.env`:

```env
VITE_GA_ID=G-XXXXXXXXXX
```

**Nota:** Solo usa uno: GTM o GA_ID. Si ambos están configurados, GTM tiene prioridad.

---

## 5. Google Calendar (reserva de citas)

Para que los visitantes agenden reuniones contigo.

### Pasos

1. Entra a [Google Calendar](https://calendar.google.com)
2. Clic en tu foto/cuenta → **Configuración**
3. Menú lateral: **Horarios de citas** (Appointment schedules)
4. **Crear horario** → define horarios y duración
5. Copia el **enlace de programación** (p. ej. `https://calendar.app.google/...`)

En `.env`:

```env
VITE_CALENDAR_BOOKING_URL=https://calendar.app.google/XXXXXXXX
```

---

## Resumen del archivo .env final

```env
# Formulario de contacto (Apps Script)
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec

# Search Console
VITE_GOOGLE_SITE_VERIFICATION=tu_codigo_verificacion

# Analytics (elige uno)
VITE_GTM_ID=GTM-XXXXXX
# VITE_GA_ID=G-XXXXXXXXXX

# Reserva de citas
VITE_CALENDAR_BOOKING_URL=https://calendar.app.google/XXXXXXXX
```

---

## Despliegue (Vercel, Netlify, etc.)

Añade las mismas variables de `.env` en el panel de tu hosting:

- **Variables de entorno** / **Environment Variables**
- Nombre y valor igual que en `.env`
- Para producción, repite en cada variable si hay entornos separados (Production, Preview, etc.)

---

## Comandos útiles

```bash
npm install      # Instalar dependencias
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run preview  # Previsualizar build
```

---

## Imagen para redes sociales (Open Graph)

Para que al compartir el sitio en redes se vea una imagen atractiva, añade en `public/images/` un archivo **og-share.png** de **1200×630 px** (logo + claim o foto de cabecera). Si no existe, algunas redes mostrarán la URL sin imagen o una por defecto.

---

## Ayuda

- **Formulario no envía:** Revisa que `VITE_APPS_SCRIPT_URL` esté bien en `.env` y que hayas aceptado permisos en la primera ejecución de la Web App.
- **Search Console no verifica:** Espera a que el sitio esté publicado. La etiqueta meta se inyecta en build.
- **GTM/GA no registra:** Comprueba que el ID esté correcto y que el sitio esté desplegado (o usa `npm run preview` para probar el build).
