# Despliegue — HR Analytics

Guía para desplegar el sitio en Vercel, Netlify o **hosting propio** (cPanel, FTP).

**¿Tienes hosting comprado?** → Ver [HOSTING_PROPIO.md](HOSTING_PROPIO.md)

## Vercel (recomendado)

### Desde GitHub

1. **Sube el proyecto a GitHub** (si aún no lo has hecho)
   - `git remote add origin https://github.com/TU_USUARIO/hranalytics.git`
   - `git push -u origin main`

2. **Ve a [vercel.com](https://vercel.com)** e inicia sesión

3. **New Project** → Importa tu repositorio de GitHub

4. **Root Directory**
   - Si el repo tiene `hranalytics-react/` y `hranalytics/`, configura **Root Directory** = `hranalytics-react`
   - Si solo clonaste o el repo es solo el proyecto React, deja vacío

5. **Environment Variables**
   - Añade las mismas variables que tienes en `.env`
   - Ver [GUIA_CONFIGURACION.md](GUIA_CONFIGURACION.md) para la lista

6. **Deploy** — Vercel detecta Vite automáticamente

### Desde la CLI

```bash
cd hranalytics-react
npm i -g vercel
vercel
```

Sigue las instrucciones. Las variables de entorno se pueden añadir en el panel web después.

## Rutas SPA (subpáginas)

Para que rutas como `/propuesta-de-valor`, `/nuestro-enfoque`, `/privacidad` y `/terminos` funcionen al acceder directamente o al refrescar:

- **Vercel:** El `vercel.json` incluye `rewrites` que redirigen todas las rutas a `index.html`.
- **Netlify:** El archivo `public/_redirects` se copia a `dist/` y configura el fallback SPA.

## Netlify

1. New site from Git → Importa el repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Root directory: `hranalytics-react` (si aplica)
5. Añade las variables de entorno

## Variables requeridas para producción

Mínimo para que el formulario funcione:
- `VITE_APPS_SCRIPT_URL` — URL del Web App de Apps Script

Opcionales (SEO, analytics):
- `VITE_GOOGLE_SITE_VERIFICATION`
- `VITE_GTM_ID` o `VITE_GA_ID`
