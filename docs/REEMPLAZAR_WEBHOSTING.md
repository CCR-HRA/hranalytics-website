# Reemplazar www.hranalytics.cl en webhosting.cl

Guía para sustituir tu sitio actual por la nueva versión React.

---

## Antes de empezar

1. **Genera el build** en tu computador:
   ```bash
   cd hranalytics-react
   npm run build
   ```
   La carpeta `dist/` contendrá todo lo que subirás.

2. **Variables de entorno** (formulario, analytics): si usas `.env`, configúralo antes del build. Luego vuelve a ejecutar `npm run build`.

---

## Paso 1: Hacer backup del sitio actual

1. Entra a **webhosting.cl** → inicia sesión en tu cuenta
2. Abre **cPanel** (o el panel que te den)
3. Ve a **Administrador de archivos** (File Manager)
4. Entra a **`public_html`** (ahí está tu sitio actual)
5. **Selecciona todo** (archivos y carpetas)
6. Clic en **Comprimir** → elige ZIP → guarda como `backup-hranalytics-2025.zip`
7. **Descarga** ese ZIP a tu computador (por si necesitas volver atrás)

---

## Paso 2: Borrar el contenido actual

1. Dentro de `public_html`, **selecciona todos** los archivos y carpetas
2. Clic en **Eliminar** (o **Delete**)
3. Confirma — la carpeta `public_html` debe quedar vacía

---

## Paso 3: Subir la nueva versión

1. Sigue en `public_html` (vacía)
2. Clic en **Cargar** (Upload)
3. Arrastra o selecciona **todo el contenido** de la carpeta `dist/` de tu proyecto:
   - `index.html`
   - carpeta `assets/`
   - carpeta `images/`
   - `sitemap.xml`
   - `robots.txt`
   - `logo-teal.png`, `logo-white.png`
   - `og-image.jpg`
   - `.htaccess` (¡importante! si no lo ves, activa "Mostrar archivos ocultos" en la configuración del administrador)

4. Espera a que termine la subida

---

## Paso 4: Verificar que .htaccess está

El archivo `.htaccess` es necesario para que funcionen las subpáginas (`/servicios`, `/casos`, etc.).

- En cPanel, clic en **Configuración** (arriba a la derecha)
- Activa **"Mostrar archivos ocultos"** (Show hidden files)
- Comprueba que `.htaccess` está en la raíz de `public_html`
- Si no está, súbelo manualmente (está en `dist/.htaccess` de tu build)

---

## Paso 5: Probar

1. Abre **https://www.hranalytics.cl**
2. Revisa que carga la nueva página
3. Prueba subpáginas: `/servicios`, `/casos`, `/propuesta-de-valor`, `/privacidad`
4. Prueba el formulario de contacto

---

## Si algo sale mal

- **404 en subpáginas:** Falta `.htaccess` o mod_rewrite no está activo. Contacta a webhosting.cl para activar mod_rewrite.
- **Página en blanco:** Revisa que `index.html` y la carpeta `assets/` estén en la raíz de `public_html`.
- **Volver atrás:** Restaura el backup: sube el contenido del ZIP que descargaste en el Paso 1.
