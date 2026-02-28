# Setup: Formulario con Google Apps Script + MailApp

El formulario de contacto usa Apps Script. Ventajas: sin keys en frontend, emails por MailApp (Gmail/Workspace).

## Paso 1: Crear el script

1. Ve a [script.google.com](https://script.google.com)
2. **Nuevo proyecto**
3. **Renombra el proyecto** (clic en "Proyecto sin título", parte superior izquierda) a:
   > **Backend Formulario Contacto - HR Analytics**
4. Borra el código que viene por defecto
4. Abre el archivo `docs/apps-script-form-handler.gs` de este proyecto
5. Copia todo su contenido y pégalo en el editor
6. **Edita** `CONTACT_EMAIL` si usas otro correo (por defecto: cristian.cornejo@hranalytics.cl)
7. **Guarda** (Ctrl+S)

## Paso 2: Desplegar como aplicación web

1. **Implementar** → **Nueva implementación**
2. Tipo: **Aplicación web**
3. Configuración:
   - **Ejecutar como**: Yo (tu email)
   - **Quién tiene acceso**: Cualquier persona
4. **Implementar**
5. Copia la **URL del deployment** (termina en `/exec`)

## Paso 3: Configurar .env

En tu archivo `.env`:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

## Paso 4: Probar

1. Reinicia el servidor: `npm run dev`
2. Envía un mensaje de prueba desde el formulario
3. Revisa tu bandeja de entrada (y spam la primera vez)

## Verificación final del despliegue

- [ ] Nombre del proyecto en script.google.com: **Backend Formulario Contacto - HR Analytics**
- [ ] `VITE_APPS_SCRIPT_URL` configurado en `.env`
- [ ] Formulario de prueba enviado y recibido en correo

## Contrato PR-04 (frontend ↔ backend)

El frontend envía POST con `application/x-www-form-urlencoded`:

| Campo   | Validación         |
|---------|--------------------|
| name    | ≥ 2 caracteres     |
| email   | Formato válido     |
| message | ≥ 10 caracteres   |
| source  | Opcional           |
| website | Honeypot (debe ir vacío) |
| ts      | Timestamp del inicio del form (anti-bot) |

El backend responde JSON:
- **Éxito:** `{ success: true, message: "ok", requestId: "..." }`
- **Error validación:** `{ success: false, code: "VALIDATION_ERROR", message: "...", errors: {...} }`
- **Rate limit:** `{ success: false, code: "RATE_LIMITED", message: "..." }`
- **Error interno:** `{ success: false, code: "INTERNAL_ERROR", message: "..." }`

**PR-04:** Throttle 45s por email+source, honeypot, anti-bot por timing, guardado en Sheet (opcional).

## Opcional: guardar leads en Sheet

Si quieres además registrar en una hoja de cálculo:

1. Crea una Sheet "Leads Web" con columnas: `timestamp | name | email | message | source`
2. Añade al inicio del script: `const SPREADSHEET_ID = 'TU_ID'`
3. Justo **antes** del `return jsonResponse({ success: true })`, añade:

```javascript
const ss = SpreadsheetApp.openById(SPREADSHEET_ID)
ss.getSheets()[0].appendRow([new Date(), name, email, message, source])
```

## Notas

- **Primera vez**: al deployar, Google puede pedir autorización. Acepta los permisos (MailApp necesita enviar correos).
- **reCAPTCHA**: para anti-spam, puedes añadir reCAPTCHA en el formulario y validar el token en Apps Script.
- El email se envía con `replyTo: email` para que puedas responder directamente al lead.
