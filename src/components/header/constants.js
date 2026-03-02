import { CONTACT_EMAIL, WHATSAPP_URL, LINKEDIN_URL } from '../../config'

// ==========================================
// ENLACES DEL MENÚ PRINCIPAL
// Orden lógico: Qué hacemos → Cómo → Para quién → Quiénes somos → Prueba → Contacto
// ==========================================
export const navLinks = [
  { href: '#inicio', label: 'Inicio', isHomeLink: true },
  { href: '#servicios', label: 'Servicios', mega: 'services' },
  { href: '#que-hacemos', label: 'Enfoque' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#quienes-somos', label: 'Liderazgo' },
  { href: '/casos', label: 'Casos y Testimonios' },
  { href: '#contacto', label: 'Contacto' },
]

// Mega menú de servicios: ver data/servicesCatalog.getMegaMenuData() (fuente única extendedServices)

const SOCIAL_ARIA_LABELS = {
  mail: 'Enviar correo electrónico',
  email: 'Enviar correo electrónico',
  message: 'Contactar por WhatsApp',
  whatsapp: 'Contactar por WhatsApp',
  linkedin: 'Ver perfil en LinkedIn',
}

export const socialLinks = [
  LINKEDIN_URL && { href: LINKEDIN_URL, label: 'LinkedIn', iconType: 'linkedin', ariaLabel: SOCIAL_ARIA_LABELS.linkedin },
  CONTACT_EMAIL && { href: `mailto:${CONTACT_EMAIL}`, label: 'Email', iconType: 'mail', ariaLabel: SOCIAL_ARIA_LABELS.mail },
  WHATSAPP_URL && { href: WHATSAPP_URL, label: 'WhatsApp', iconType: 'message', ariaLabel: SOCIAL_ARIA_LABELS.message },
].filter(Boolean)
