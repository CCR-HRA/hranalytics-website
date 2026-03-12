# Checklist para lanzar hranalytics.cl a producción

## ✅ Pre-lanzamiento (ya verificado)

- [x] Build exitoso (`npm run build`)
- [x] Corrección tipográfica "recomendaciones"
- [x] Mensaje profesional en fallback del formulario
- [x] Fix del flash al hacer clic en Testimonios
- [x] `vercel.json` configurado (SPA, headers de seguridad)

---

## 🚀 Pasos para desplegar en Vercel

### 1. Subir cambios a Git

```bash
git add .
git status   # Revisa qué se va a subir
git commit -m "Preparar para producción: correcciones finales"
git push origin main
```

### 2. Conectar con Vercel

1. Ve a **[vercel.com](https://vercel.com)** e inicia sesión
2. **Add New** → **Project**
3. Importa tu repositorio de GitHub
4. Si el repo tiene subcarpetas, configura **Root Directory** = `hranalytics-react`

### 3. Variables de entorno (en Vercel → Project → Settings → Environment Variables)

| Variable | Uso | Obligatorio |
|----------|-----|-------------|
| `VITE_APPS_SCRIPT_URL` | Formulario de contacto (Google Apps Script) | Recomendado |
| `VITE_GOOGLE_SITE_VERIFICATION` | Google Search Console | Opcional |
| `VITE_GTM_ID` | Google Tag Manager | Opcional |
| `VITE_GA_ID` | Google Analytics 4 | Opcional (si usas GTM, no hace falta) |

### 4. Deploy

- Haz clic en **Deploy** — Vercel detecta Vite automáticamente
- Tras el deploy, tendrás una URL tipo `tu-proyecto.vercel.app`

### 5. Dominio personalizado (hranalytics.cl)

1. En Vercel: **Project** → **Settings** → **Domains**
2. Añade `www.hranalytics.cl` y `hranalytics.cl`
3. Configura los registros DNS en tu proveedor de dominio:
   - **A** o **CNAME** según lo que indique Vercel
   - Suele ser: `CNAME www → cname.vercel-dns.com`

---

## 🔧 Alternativa: deploy desde la terminal

```bash
npm i -g vercel
vercel --prod
```

Sigue las preguntas. Las variables de entorno se añaden en el panel web después.

---

## 📋 Post-lanzamiento

- [ ] Verificar que el formulario de contacto funciona (si configuraste `VITE_APPS_SCRIPT_URL`)
- [ ] Probar en móvil
- [ ] Revisar Google Search Console (si usas `VITE_GOOGLE_SITE_VERIFICATION`)
- [ ] Confirmar que GTM/GA reciben datos (si los configuraste)
