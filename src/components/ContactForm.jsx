import { useState } from 'react'
import { analytics } from '../utils/analytics'
import SocialIcon from './SocialIcon'
import {
  CALENDAR_BOOKING_URL,
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  FORMSPREE_ENDPOINT,
  APPS_SCRIPT_URL,
  CONTACT_FORM_READY,
  CONTACT_FORM_USE_FORMSPREE,
} from '../config'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 10
const FETCH_TIMEOUT_MS = 15000
const MAX_SAFE_ERROR_LENGTH = 200

const ERROR_MESSAGES = {
  timeout: 'La solicitud tardó demasiado. Inténtalo nuevamente.',
  network: 'No pudimos conectarnos. Revisa tu conexión e inténtalo otra vez.',
  badRequest: 'Revisa los datos ingresados.',
  server: 'Tenemos un problema temporal. Inténtalo en unos minutos.',
  generic: 'Error al enviar. Intenta de nuevo o contáctanos directamente.',
  misconfigured: 'El formulario no está configurado correctamente.',
  invalidResponse: 'Recibimos una respuesta inválida del servidor.',
  rateLimited: 'Espera un momento antes de enviar otro mensaje.',
}

const safeServerMessage = (data) => {
  if (!data || typeof data !== 'object') return null
  const msg = data.message ?? data.error ?? data.msg
  if (typeof msg !== 'string') return null
  const trimmed = msg.trim().slice(0, MAX_SAFE_ERROR_LENGTH)
  return trimmed && !/<[a-z]/i.test(trimmed) ? trimmed : null
}

const normalizeTextResponse = (text) => {
  if (typeof text !== 'string') return ''
  return text.trim().toLowerCase().slice(0, 200)
}

export default function ContactForm() {
  const [formStartedAt, setFormStartedAt] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('') // 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })

  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Ingresa tu nombre'
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres'
        return ''
      case 'email':
        if (!value.trim()) return 'Ingresa tu correo electrónico'
        if (!emailRegex.test(value)) return 'Ingresa un email válido (ej: nombre@empresa.com)'
        return ''
      case 'message':
        if (!value.trim()) return 'Escribe tu mensaje'
        if (value.trim().length < MIN_MESSAGE_LENGTH) return `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres`
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    if (!formStartedAt) setFormStartedAt(Date.now())
    const { name, value } = e.target
    if (name === 'website') {
      setWebsite(value)
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (website.trim()) {
      setStatus('success')
      return
    }

    const startedAt = formStartedAt || Date.now()
    setFormStartedAt(startedAt)

    const newTouched = { name: true, email: true, message: true }
    setTouched(newTouched)

    const normalized = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      message: formData.message.trim(),
    }

    const newErrors = {
      name: validate('name', normalized.name),
      email: validate('email', normalized.email),
      message: validate('message', normalized.message),
    }

    setErrors(newErrors)
    if (newErrors.name || newErrors.email || newErrors.message) return

    if (!CONTACT_FORM_READY) {
      setStatus('error')
      setErrorMessage(ERROR_MESSAGES.misconfigured)
      return
    }

    setStatus('sending')
    setErrorMessage('')

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      if (CONTACT_FORM_USE_FORMSPREE) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: normalized.name,
            email: normalized.email,
            company: normalized.company || undefined,
            message: normalized.message,
            _replyto: normalized.email,
          }),
          signal: controller.signal,
        })

        const data = await res.json().catch(() => null)
        if (res.ok && (data?.ok === true || res.status === 200)) {
          setStatus('success')
          setFormData({ name: '', email: '', company: '', message: '' })
          setWebsite('')
          setFormStartedAt(null)
          setErrors({ name: '', email: '', message: '' })
          setTouched({ name: false, email: false, message: false })
          analytics.contactFormSubmit()
          return
        }
        const serverMsg = safeServerMessage(data) || data?.errors?.[0]?.message
        if (res.status === 429) {
          setErrorMessage(serverMsg ?? ERROR_MESSAGES.rateLimited)
        } else if (res.status >= 400 && res.status < 500) {
          setErrorMessage(serverMsg ?? ERROR_MESSAGES.badRequest)
        } else {
          setErrorMessage(serverMsg ?? ERROR_MESSAGES.generic)
        }
        setStatus('error')
        return
      }

      const body = new URLSearchParams({
        name: normalized.name,
        email: normalized.email,
        message: normalized.message,
        source: 'hranalytics.cl',
        website,
        ts: String(startedAt),
      })

      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain;q=0.9, */*;q=0.8',
        },
        body: body.toString(),
        signal: controller.signal,
      })

      const contentType = (res.headers.get('content-type') || '').toLowerCase()
      const isJson = contentType.includes('application/json')

      let data = null
      let rawText = ''

      if (isJson) {
        try {
          data = await res.json()
        } catch (parseErr) {
          if (import.meta.env.DEV) console.error('ContactForm: JSON parse error', parseErr)
          setErrorMessage(ERROR_MESSAGES.invalidResponse)
          setStatus('error')
          return
        }
      } else {
        try {
          rawText = await res.text()
        } catch {
          rawText = ''
        }
      }

      // Apps Script muchas veces responde 200 siempre; el payload manda
      const successFromJson =
        data?.success === true ||
        data?.ok === true ||
        data?.status === 'success'

      const textSignal = normalizeTextResponse(rawText)
      const successFromText =
        !!textSignal && (/^ok\b/.test(textSignal) || textSignal.includes('success') || textSignal.includes('enviado'))

      if (res.ok && (successFromJson || successFromText)) {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
        setWebsite('')
        setFormStartedAt(null)
        setErrors({ name: '', email: '', message: '' })
        setTouched({ name: false, email: false, message: false })
        analytics.contactFormSubmit()
        return
      }

      // Error lógico del backend con HTTP 200 (típico en Apps Script)
      if (res.ok && data?.success === false) {
        const serverMsg = safeServerMessage(data)
        const code = data?.code || ''
        if (code === 'VALIDATION_ERROR') {
          setErrorMessage(serverMsg ?? ERROR_MESSAGES.badRequest)
        } else if (code === 'RATE_LIMITED') {
          setErrorMessage(serverMsg ?? ERROR_MESSAGES.rateLimited)
        } else {
          setErrorMessage(serverMsg ?? ERROR_MESSAGES.generic)
        }
        setStatus('error')
        return
      }

      const serverMsg = safeServerMessage(data)
      if (res.status >= 400 && res.status < 500) {
        setErrorMessage(serverMsg ?? ERROR_MESSAGES.badRequest)
      } else if (res.status >= 500) {
        setErrorMessage(serverMsg ?? ERROR_MESSAGES.server)
      } else {
        setErrorMessage(serverMsg ?? ERROR_MESSAGES.generic)
      }
      setStatus('error')
    } catch (err) {
      if (err?.name === 'AbortError') {
        setErrorMessage(ERROR_MESSAGES.timeout)
      } else {
        if (import.meta.env.DEV) console.error('ContactForm: fetch error', err)
        setErrorMessage(ERROR_MESSAGES.network)
      }
      setStatus('error')
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return (
    <section id="contacto" className="py-section lg:py-section-lg bg-gray-50/50 z-[8]">
      <div className="container-premium max-w-wide">
        <div className="section-header">
          <p className="section-eyebrow text-primary">Contacto</p>
          <h2 className="section-title text-gray-900">Contáctanos</h2>
          <div className="section-divider mt-6" />
          <p className="mt-6 text-gray-600 text-sm">
            Escríbenos y te responderemos a la brevedad
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100/80 bg-white p-6 md:p-8 shadow-card">
          {CONTACT_FORM_READY ? (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Formulario de contacto">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary focus-visible:outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.name && <p id="name-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary focus-visible:outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p id="email-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">Empresa <span className="text-gray-400 font-normal">(opcional)</span></label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary focus-visible:outline-none transition-colors"
                  placeholder="Tu empresa"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary focus-visible:outline-none resize-none transition-colors ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="¿En qué podemos ayudarte?"
                />
                {errors.message && <p id="message-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.message}</p>}
              </div>

              {status === 'success' && (
                <div className="p-5 rounded-xl bg-green-50 border border-green-200/80" role="status">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-800">Gracias por tu mensaje</p>
                      <p className="text-green-700 text-sm mt-1">Te contactaremos en 24 a 48 horas hábiles.</p>
                    </div>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm font-medium" role="alert">{errorMessage || ERROR_MESSAGES.generic}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          ) : (
            <div className="text-center py-2">
              <p className="text-gray-700 text-sm mb-5">
                Estamos aquí para responder sus consultas. Puede contactarnos directamente por WhatsApp o correo electrónico.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap">
                {WHATSAPP_URL && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.whatsappClick('contact_form_fallback')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <SocialIcon type="message" className="w-5 h-5 text-current" />
                    Escribir por WhatsApp
                  </a>
                )}
                {CONTACT_EMAIL && (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => analytics.emailClick('contact_form_fallback')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 text-primary font-semibold text-sm rounded-lg hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <SocialIcon type="mail" className="w-5 h-5 text-current" />
                    Enviar correo
                  </a>
                )}
                {CALENDAR_BOOKING_URL && (
                  <a
                    href={CALENDAR_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.ctaClick('Agendar reunión', 'contact_form_fallback')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 text-primary font-semibold text-sm rounded-lg hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <SocialIcon type="calendar" className="w-5 h-5 text-current" />
                    Agendar una reunión
                  </a>
                )}
              </div>
            </div>
          )}

          {(COMPANY_ADDRESS || CONTACT_EMAIL || WHATSAPP_URL || CALENDAR_BOOKING_URL) && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Contacto directo</p>
              {COMPANY_ADDRESS && (
                <p className="text-sm text-gray-600 mb-3">{COMPANY_ADDRESS}</p>
              )}
              <div className="flex flex-wrap gap-6 text-sm">
                {CONTACT_EMAIL && (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => analytics.emailClick('contact_form')}
                    className="flex items-center gap-2 link-primary text-gray-700 hover:text-primary"
                  >
                    <SocialIcon type="mail" className="w-4 h-4 text-current" />
                    {CONTACT_EMAIL}
                  </a>
                )}
                {WHATSAPP_URL && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.whatsappClick('contact_form')}
                    className="flex items-center gap-2 link-primary text-gray-700 hover:text-primary"
                  >
                    <SocialIcon type="message" className="w-4 h-4 text-current" />
                    {WHATSAPP_DISPLAY}
                  </a>
                )}
                {CALENDAR_BOOKING_URL && (
                  <a
                    href={CALENDAR_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.ctaClick('Agendar reunión', 'contact_form')}
                    className="flex items-center gap-2 link-primary text-gray-700 hover:text-primary"
                  >
                    <SocialIcon type="calendar" className="w-4 h-4 text-current" />
                    Agendar reunión
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
