/**
 * Google Apps Script - Formulario de contacto web (PR-04)
 * Throttle, honeypot, anti-bot timing, Sheet backup.
 *
 * NOMBRE DEL PROYECTO: Backend Formulario Contacto - HR Analytics
 * SETUP: Ver docs/APPS_SCRIPT_SETUP.md
 */

const CONTACT_EMAIL = 'cristian.cornejo@hranalytics.cl'
const SHEET_NAME = '' // opcional: ej. 'Contactos'. Vacío = hoja activa.

const MAX_NAME = 120
const MAX_EMAIL = 160
const MAX_SOURCE = 80
const MAX_MESSAGE = 4000
const MIN_MESSAGE = 10

const THROTTLE_SECONDS = 45
const MIN_HUMAN_MS = 1200

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}

function okResponse(message, extra) {
  return jsonResponse(Object.assign({
    success: true,
    code: 'OK',
    message: message || 'ok'
  }, extra || {}))
}

function errorResponse(code, message, extra) {
  return jsonResponse(Object.assign({
    success: false,
    code: code || 'INTERNAL_ERROR',
    message: message || 'Error interno'
  }, extra || {}))
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')
}

function normalizeString(value, maxLen) {
  if (value == null) return ''
  let s = String(value).trim()
  if (maxLen && s.length > maxLen) s = s.slice(0, maxLen)
  return s
}

function getParams(e) {
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter
  }
  if (e.postData && e.postData.type === 'application/x-www-form-urlencoded') {
    return parseFormUrlEncoded(e.postData.contents)
  }
  if (e.postData && e.postData.type === 'application/json') {
    try {
      return JSON.parse(e.postData.contents)
    } catch (_) {
      return {}
    }
  }
  return {}
}

function getParam(e, key) {
  const p = getParams(e)
  return Object.prototype.hasOwnProperty.call(p, key) ? p[key] : ''
}

function parseFormUrlEncoded(contents) {
  const params = {}
  if (!contents) return params
  const parts = String(contents).split('&')
  for (const part of parts) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const key = decodeURIComponent(part.substring(0, eq).replace(/\+/g, ' '))
    const value = decodeURIComponent(part.substring(eq + 1).replace(/\+/g, ' '))
    if (key) params[key] = value
  }
  return params
}

function safeLog(eventName, meta) {
  try {
    Logger.log(eventName + ' ' + JSON.stringify(meta || {}))
  } catch (err) {
    Logger.log(eventName)
  }
}

function hashKey(value) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value || ''),
    Utilities.Charset.UTF_8
  )
  return Utilities.base64EncodeWebSafe(bytes).slice(0, 32)
}

function checkThrottle(email, source) {
  const cache = CacheService.getScriptCache()
  const key = 'contact:' + hashKey((email || '').toLowerCase() + '|' + (source || '').toLowerCase())

  if (cache.get(key)) return false

  cache.put(key, '1', THROTTLE_SECONDS)
  return true
}

function getTargetSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  if (!ss) throw new Error('No hay Spreadsheet activo vinculado al script.')

  if (SHEET_NAME) {
    const sh = ss.getSheetByName(SHEET_NAME)
    if (!sh) throw new Error('No existe la hoja configurada: ' + SHEET_NAME)
    return sh
  }

  const active = ss.getActiveSheet()
  if (!active) throw new Error('No hay hoja activa disponible.')
  return active
}

function validatePayload(p) {
  const errors = {}

  if (!p.name || p.name.length < 2) {
    errors.name = 'Nombre inválido.'
  }

  if (!p.email || !isValidEmail(p.email)) {
    errors.email = 'Email inválido.'
  }

  if (!p.message || p.message.length < MIN_MESSAGE) {
    errors.message = 'Mensaje demasiado corto.'
  }

  if (p.website) {
    errors.website = 'Spam detectado.'
  }

  const tsNum = Number(p.ts || 0)
  if (!tsNum || Number.isNaN(tsNum)) {
    errors.ts = 'Envío inválido.'
  } else {
    const elapsed = Date.now() - tsNum
    if (elapsed >= 0 && elapsed < MIN_HUMAN_MS) {
      errors.ts = 'Envío demasiado rápido.'
    }
  }

  return errors
}

function doPost(e) {
  const requestId = Utilities.getUuid()

  try {
    const lock = LockService.getScriptLock()
    lock.waitLock(3000)

    const payload = {
      name: normalizeString(getParam(e, 'name'), MAX_NAME),
      email: normalizeString(getParam(e, 'email'), MAX_EMAIL),
      message: normalizeString(getParam(e, 'message'), MAX_MESSAGE),
      source: normalizeString(getParam(e, 'source'), MAX_SOURCE) || 'web',
      website: normalizeString(getParam(e, 'website'), 100),
      ts: normalizeString(getParam(e, 'ts'), 20),
    }

    const errors = validatePayload(payload)
    if (Object.keys(errors).length > 0) {
      safeLog('contact.validation_error', {
        requestId: requestId,
        source: payload.source,
        emailDomain: (payload.email || '').split('@')[1] || '',
        fields: Object.keys(errors)
      })

      return errorResponse('VALIDATION_ERROR', 'Revisa los datos del formulario.', {
        requestId: requestId,
        errors: errors
      })
    }

    if (!checkThrottle(payload.email, payload.source)) {
      safeLog('contact.rate_limited', {
        requestId: requestId,
        source: payload.source,
        emailDomain: (payload.email || '').split('@')[1] || ''
      })

      return errorResponse('RATE_LIMITED', 'Espera un momento antes de enviar otro mensaje.', {
        requestId: requestId
      })
    }

    try {
      const sh = getTargetSheet()
      sh.appendRow([
        new Date(),
        requestId,
        payload.name,
        payload.email,
        payload.source,
        payload.message
      ])
    } catch (sheetErr) {
      safeLog('contact.sheet_error', { requestId: requestId, error: String(sheetErr) })
    }

    const subject = 'Nuevo contacto HR Analytics (' + payload.source + ')'
    const body = [
      'Nuevo mensaje desde formulario web',
      '',
      'Request ID: ' + requestId,
      'Nombre: ' + payload.name,
      'Email: ' + payload.email,
      'Origen: ' + payload.source,
      '',
      'Mensaje:',
      payload.message
    ].join('\n')

    MailApp.sendEmail({
      to: CONTACT_EMAIL,
      subject: subject,
      body: body,
      replyTo: payload.email,
      name: 'Formulario HR Analytics'
    })

    safeLog('contact.sent', {
      requestId: requestId,
      source: payload.source,
      emailDomain: (payload.email || '').split('@')[1] || ''
    })

    return okResponse('ok', { requestId: requestId })

  } catch (err) {
    safeLog('contact.internal_error', {
      requestId: requestId,
      error: String(err && err.message ? err.message : err)
    })

    return errorResponse('INTERNAL_ERROR', 'Error interno. Intenta nuevamente.', {
      requestId: requestId
    })
  }
}
