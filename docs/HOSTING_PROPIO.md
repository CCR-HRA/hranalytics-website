# Guía: Desplegar en hosting propio (cPanel, FTP, etc.)

Si tienes un hosting comprado (Hostinger, GoDaddy, DonWeb, etc.), puedes subir el sitio manualmente. El proyecto genera archivos estáticos que funcionan en cualquier servidor web.

---

## Paso 1: Generar el build

En tu computador, dentro del proyecto:

```bash
cd hranalytics-react
npm install
npm run build
```

Esto crea la carpeta **`dist/`** con todo lo que necesitas subir.

---

## Paso 2: Configurar variables antes del build

Las variables de entorno (formulario, analytics) se "queman" en el build. Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID/exec
VITE_GOOGLE_SITE_VERIFICATION=tu_codigo_si_lo_tienes
VITE_GTM_ID=GTM-XXXXXX
```

Luego ejecuta `npm run build` de nuevo. Si cambias algo en `.env`, debes volver a hacer build.

---

## Paso 3: Subir los archivos

### Opción A: cPanel (File Manager)

1. Entra a tu **cPanel** (tu-proveedor.com/cpanel o similar)
2. Abre **Administrador de archivos** (File Manager)
3. Ve a la carpeta donde vive tu sitio:
   - Suele ser `public_html` (para el dominio principal)
   - O `public_html/hranalytics` si usas un subdominio
4. **Borra** el contenido anterior si había otro sitio
5. **Sube** todo el contenido de la carpeta `dist/`:
   - Selecciona todos los archivos y carpetas dentro de `dist/`
   - Sube (o arrastra) a `public_html`

**Importante:** Sube el *contenido* de `dist/`, no la carpeta `dist` misma. Es decir:
- `index.html` debe estar en la raíz de `public_html`
- La carpeta `assets/` debe estar dentro de `public_html`
- `sitemap.xml`, `robots.txt`, etc. en la raíz

### Opción B: FTP (FileZilla, Cyberduck, etc.)

1. Conecta con los datos que te dio tu proveedor (host, usuario, contraseña)
2. Navega a `public_html` (o la carpeta raíz de tu dominio)
3. Sube todo el contenido de `dist/` a esa carpeta

---

## Paso 4: Rutas SPA (subpáginas)

Para que `/servicios`, `/casos`, `/privacidad`, etc. funcionen al entrar directo o al refrescar, el servidor debe devolver `index.html` en esas rutas.

### Si usas Apache (cPanel, la mayoría de hostings)

El archivo **`.htaccess`** ya está en `public/` y se copia a `dist/` al hacer build. Si tu hosting usa Apache, debería funcionar solo.

Si no funciona, crea manualmente un archivo `.htaccess` en la raíz de `public_html` con:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

### Si usas Nginx

Pide a tu proveedor que añada esta configuración al bloque de tu sitio:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Paso 5: Verificar

1. Entra a **https://www.hranalytics.cl** (o tu dominio)
2. Prueba las subpáginas: `/servicios`, `/casos`, `/propuesta-de-valor`
3. Prueba el formulario de contacto (si configuraste `VITE_APPS_SCRIPT_URL`)

---

## Resumen rápido

| Qué | Dónde |
|-----|-------|
| Build | `npm run build` → genera `dist/` |
| Subir | Todo el contenido de `dist/` a `public_html` |
| SPA | `.htaccess` (Apache) o `try_files` (Nginx) |
| Variables | `.env` antes del build |

---

## Problemas frecuentes

**"404 al entrar a /servicios"**  
→ Falta el `.htaccess` o mod_rewrite no está activo. Revisa el Paso 4.

**"El formulario no envía"**  
→ Configura `VITE_APPS_SCRIPT_URL` en `.env` y vuelve a hacer `npm run build`.

**"Página en blanco"**  
→ Revisa que subiste el contenido de `dist/` correctamente (index.html y assets/ en la raíz).
