# HRAnalytics Consulting - Sitio React

Sitio web profesional de HRAnalytics Consulting, construido con React + Vite.

## 🚀 Cómo ejecutar

```bash
npm install   # Solo la primera vez
npm run dev   # Inicia el servidor de desarrollo
```

Abre **http://localhost:5173/** (o el puerto que indique la terminal).

## ⚙️ Configuración completa

**Analytics:** Si defines ambos `VITE_GTM_ID` y `VITE_GA_ID`, el proyecto usa solo GTM (el script de GA no se carga). Canonical y meta OG en `index.html` están fijados a la URL de producción; para otros entornos, edita `index.html` o usa un plugin de build que inyecte `VITE_SITE_URL`.

**Guías:**
- Configuración (formulario, SEO, analytics): [`docs/GUIA_CONFIGURACION.md`](docs/GUIA_CONFIGURACION.md)
- Despliegue (Vercel, Netlify): [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- Análisis de estructura: [`docs/ANALISIS_ESTRUCTURA.md`](docs/ANALISIS_ESTRUCTURA.md)

```bash
cp .env.example .env   # Luego edita .env con tus valores
```

**Variables de entorno (`.env`):**

| Variable | Uso | Obligatorio |
|---------|-----|-------------|
| `VITE_APPS_SCRIPT_URL` | Formulario de contacto (Apps Script) | Recomendado |
| `VITE_GOOGLE_SITE_VERIFICATION` | Search Console | Opcional |
| `VITE_GTM_ID` | Google Tag Manager | Opcional |
| `VITE_GA_ID` | Google Analytics 4 | Opcional (si `VITE_GTM_ID` está definido, solo se usa GTM; GA se ignora) |
| `VITE_CALENDAR_BOOKING_URL` | Enlace a calendario de citas | Opcional |

## 🚀 Desplegar en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. "New Project" → Importa tu repositorio
4. **Root Directory:** Si el repo tiene `hranalytics-react/` y `hranalytics/`, configura **Root Directory** = `hranalytics-react`
5. En "Environment Variables" agrega las variables de `.env` (ver [guía](docs/GUIA_CONFIGURACION.md))
6. ¡Deploy! Vercel detectará Vite automáticamente

O con la CLI (desde `hranalytics-react/`):

```bash
cd hranalytics-react
npm i -g vercel
vercel
```

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx (navegación), Hero.jsx, Footer.jsx
│   ├── TrustBarSection, ServicesSection, IndustriesSection
│   ├── HRAnalyticsSection, ValuePropCompact, SuccessCasesSection
│   ├── ClientsSection, RecommendationsSection, AboutSection
│   ├── CTASection, ContactForm, FAQSection
│   └── header/ (MegaMenuPanel, constants)
├── pages/ (HomePage, PropuestaValorPage, NuestroEnfoquePage, etc.)
├── data/content.js, services.json
└── utils/ (scroll, analytics)
```

## 🛠 Tecnologías

- React 19 + Vite
- Tailwind CSS
- Framer Motion
- Google Apps Script (formulario)
