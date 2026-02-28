/**
 * Configuración global y datos de contacto (fuente única).
 * Variables de entorno VITE_* con fallback para producción.
 */

const trim = (v) => (typeof v === 'string' ? v.trim() : '')
const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0

const isValidHttpsUrl = (value) => {
  const v = trim(value)
  if (!v) return false
  try {
    const u = new URL(v)
    return u.protocol === 'https:'
  } catch {
    return false
  }
}

const isValidEmail = (value) => {
  const v = trim(value)
  if (!v) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

const isValidFormspreeEndpoint = (value) => {
  const v = trim(value)
  if (!v) return false
  if (!v.startsWith('https://formspree.io/f/')) return false
  // Evita placeholder tipo "REEMPLAZAR"
  if (/reemplazar/i.test(v)) return false
  // IDs de Formspree suelen ser cortos pero no vacíos
  return v.length > 'https://formspree.io/f/'.length + 3
}

/** URL base del sitio (OG, canonical, schema). */
export const SITE_URL = trim(import.meta.env.VITE_SITE_URL) || 'https://www.hranalytics.cl'

// Agendar reunión
const DEFAULT_CALENDAR_URL =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1tbFTjj45U1H-aZpJmNHzp8crnmTA4QJA9OlBsGuMzrR5KkOuXna8VmJHHgID5ayvE1ZBilVkQ'
export const CALENDAR_BOOKING_URL =
  trim(import.meta.env.VITE_CALENDAR_BOOKING_URL) || DEFAULT_CALENDAR_URL

export const GTM_ID = trim(import.meta.env.VITE_GTM_ID) || ''
export const GA_ID = trim(import.meta.env.VITE_GA_ID) || ''

// Contacto
export const CONTACT_EMAIL = trim(import.meta.env.VITE_CONTACT_EMAIL) || 'cristian.cornejo@hranalytics.cl'
export const WHATSAPP_NUMBER = trim(import.meta.env.VITE_WHATSAPP_NUMBER) || '56940232911'
export const COMPANY_ADDRESS = trim(import.meta.env.VITE_COMPANY_ADDRESS) || 'Serrano 63, Of. 66, Santiago, Chile'
export const WHATSAPP_DISPLAY = trim(import.meta.env.VITE_WHATSAPP_DISPLAY) || '+56 940232911'

const WHATSAPP_DEFAULT_MESSAGE =
  'Hola, llegué desde hranalytics.cl y me interesaría conversar sobre consultoría en People Analytics.'

export const WHATSAPP_URL =
  isNonEmpty(WHATSAPP_NUMBER)
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`
    : ''

// LinkedIn
export const LINKEDIN_URL = trim(import.meta.env.VITE_LINKEDIN_URL) || 'https://www.linkedin.com/in/cristianhranalytics/'
export const LINKEDIN_HANDLE = trim(import.meta.env.VITE_LINKEDIN_HANDLE) || 'cristianhranalytics'

// LinkedIn empresa
export const LINKEDIN_COMPANY_URL =
  trim(import.meta.env.VITE_LINKEDIN_COMPANY_URL) || 'https://linkedin.com/company/hr-analytics-consulting'

// Formspree y Apps Script
const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/REEMPLAZAR'
export const FORMSPREE_ENDPOINT = trim(import.meta.env.VITE_FORMSPREE_ENDPOINT) || DEFAULT_FORMSPREE_ENDPOINT
export const APPS_SCRIPT_URL = trim(import.meta.env.VITE_APPS_SCRIPT_URL) || ''

const FORMSPREE_OK = isValidFormspreeEndpoint(FORMSPREE_ENDPOINT)
const APPS_SCRIPT_OK = isValidHttpsUrl(APPS_SCRIPT_URL)

/** true si el formulario de contacto tiene backend (Formspree o Apps Script) */
export const CONTACT_FORM_READY = FORMSPREE_OK || APPS_SCRIPT_OK

/** true si se debe usar Formspree (Formspree válido y Apps Script no configurado) */
export const CONTACT_FORM_USE_FORMSPREE = FORMSPREE_OK && !APPS_SCRIPT_OK

/** Links sociales del Footer (filtrados para no renderizar href inválidos) */
export const SOCIAL_LINKS = [
  isValidEmail(CONTACT_EMAIL) && { href: `mailto:${CONTACT_EMAIL}`, iconType: 'mail', label: 'Email', sub: CONTACT_EMAIL },
  isNonEmpty(WHATSAPP_URL) && { href: WHATSAPP_URL, iconType: 'message', label: 'WhatsApp', sub: WHATSAPP_DISPLAY || 'WhatsApp' },
  isValidHttpsUrl(LINKEDIN_URL) && { href: LINKEDIN_URL, iconType: 'linkedin', label: 'LinkedIn', sub: LINKEDIN_HANDLE || 'LinkedIn' },
].filter(Boolean)
