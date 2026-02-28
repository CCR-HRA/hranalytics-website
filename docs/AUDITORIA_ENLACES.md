# Auditoría de hipervínculos e interconexiones

**Fecha:** 20 febrero 2025

---

## Resumen

Todos los enlaces han sido revisados y corregidos. Las secciones de destino tienen `scroll-mt-24` para que el scroll respete el header fijo.

---

## Enlaces internos (secciones #hash)

| Destino | Componente | Origen |
| --- | --- | --- |
| `#inicio` | Hero | Header, nav |
| `#servicios` | ServicesSection | Header, Hero, HRAnalyticsSection, Footer columns |
| `#pilar-estrategia-personas` | Pilar I (ServicesSection) | Nav horizontal pilares |
| `#pilar-analitica-datos` | Pilar II (ServicesSection) | Nav horizontal pilares |
| `#pilar-compensaciones-estructura` | Pilar III (ServicesSection) | Nav horizontal pilares |
| `#pilar-desarrollo-automatizacion` | Pilar IV (ServicesSection) | Nav horizontal pilares |
| `#industrias` | IndustriesSection | Header, Footer columns |
| `#recomendaciones` | div (SuccessCases + Recommendations) | Header |
| `#que-hacemos` | HRAnalyticsSection | Header (Enfoque) |
| `#quienes-somos` | AboutSection | Header, Footer laFirma |
| `#reconocimiento` | ClientsSection | Footer laFirma |
| `#insights` | InsightsSection | Footer laFirma |
| `#contacto` | ContactForm | Header, Hero, AboutSection, CTASection, Footer |
| `#faq` | FAQSection | Footer links |
| `#main-content` | main (todas las páginas) | SkipLink |

**Comportamiento:** En la home, los clics hacen scroll suave. Desde otras páginas (p. ej. `/privacidad`), se navega a `/#hash` y ScrollManager scrollea al destino.

---

## Rutas de página

| Ruta | Página |
| --- | --- |
| `/` | HomePage |
| `/propuesta-de-valor` | PropuestaValorPage |
| `/nuestro-enfoque` | NuestroEnfoquePage |
| `/servicios/:slug` | ServiceDetailPage (14 slugs) |
| `/privacidad` | PrivacidadPage |
| `/terminos` | TerminosPage |
| `*` | NotFoundPage → redirige a `/` |

---

## Enlaces a páginas de detalle de servicios

- **ServicesSection:** Cada tarjeta → `Link to={/servicios/${service.slug}}`
- **MegaMenuPanel / Header:** Items de megaServices con `path` → `Link to={item.href}` (ej. `/servicios/planificacion-estrategica-personas`)
- **ServiceDetailPage:** "Volver a Servicios" → `Link to="/#servicios"`

---

## Enlaces externos (config.js)

| Variable | Uso |
| --- | --- |
| `WHATSAPP_URL` | ContactForm, Footer, WhatsAppButton, FAQSection, AboutSection |
| `CONTACT_EMAIL` | mailto: en ContactForm, Footer, PrivacidadPage, TerminosPage |
| `CALENDAR_BOOKING_URL` | ContactForm, FAQSection, CTASection, AboutSection (solo si está configurada) |
| `LINKEDIN_URL` | Footer SOCIAL_LINKS |
| `LINKEDIN_COMPANY_URL` | Header socialLinks (constants) |

---

## Correcciones aplicadas

1. **Footer handleHashClick:** `navigate({ pathname: '/', hash: href })` para alinearse con Header cuando el scroll falla (usuario en otra página).
2. **scroll-mt-24:** Añadido a secciones destino (#inicio, #servicios, #industrias, #recomendaciones, #que-hacemos, #quienes-somos, #insights, #contacto, #faq) para compensar el header fijo.

---

## Checklist de verificación

- [x] Hash links funcionan en Home
- [x] Hash links desde otras páginas navegan a /#hash
- [x] Rutas /propuesta-de-valor y /nuestro-enfoque válidas
- [x] 14 slugs de servicios en extendedServices
- [x] mailto: y WhatsApp desde config
- [x] CALENDAR_BOOKING_URL condicional (no enlace vacío)
- [x] SkipLink → #main-content en todas las páginas

---

## Verificación en código (feb 2026)

Comprobado en el código actual:

- **Header** y **Footer**: `handleHashClick` llama a `scrollToSection(href)` y, si no hay elemento (p. ej. en otra página), `navigate({ pathname: '/', hash: href.replace(/^#/, '') })`.
- **ScrollManager**: ante `location.hash` o `window.location.hash` en `/`, hace scroll al destino con reintentos (INITIAL_DELAY_MS + RETRY_DELAYS_MS).
- **Secciones con scroll-mt-24**: Hero (#inicio), ServicesSection (#servicios + pilares), IndustriesSection (#industrias), ClientsSection (#reconocimiento), HRAnalyticsSection (#que-hacemos), AboutSection (#quienes-somos), InsightsSection (#insights), ContactForm (#contacto), FAQSection (#faq), bloque #recomendaciones en HomePage.
- **Pilares**: ServicesSection asigna `id={pilarId}` (PILAR_IDS) a cada bloque; content.js footer.columns.services enlaza a #pilar-*.
- **main-content**: Todas las páginas (HomePage, ServiceDetailPage, PrivacidadPage, TerminosPage, NuestroEnfoquePage, PropuestaValorPage, NotFoundPage) tienen `<main id="main-content">`.
- **CALENDAR_BOOKING_URL**: En ContactForm, AboutSection, FAQSection y CTASection se usa condicional (`{CALENDAR_BOOKING_URL && ...}`). config.js define valor por defecto; en ServiceDetailPage el enlace “Agendar reunión” usa siempre la URL (nunca vacía).
