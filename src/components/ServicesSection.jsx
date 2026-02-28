import { m } from 'framer-motion'
import { getServicesByPillar, PILAR_IDS } from '../data/servicesCatalog'
import { analytics } from '../utils/analytics'
import { scrollToSection } from '../utils/scroll'
import { Link } from 'react-router-dom'
import ServiceImage from './ServiceImage'
import { servicesSection as content } from '../data/content'

// Iconos: 1–6 tienen icono propio; 7–14 usan icono genérico
const getServiceIcon = (id) => {
  if (id >= 1 && id <= 6) return `/images/s${id}-icon.svg`
  if (id >= 7 && id <= 14) return '/images/service-icon.svg'
  return null
}

const pillars = getServicesByPillar()

export default function ServicesSection() {
  const handleServiceClick = (service) => {
    analytics?.ctaClick?.(`Servicio: ${service.title}`, 'services')
  }

  const handlePilarClick = (e, pilarId) => {
    e.preventDefault()
    scrollToSection(`#${pilarId}`)
  }

  return (
    <section
      id="servicios"
      className="relative py-section lg:py-section-lg bg-white z-[3]"
    >
      <div className="container-premium relative z-10">
        <div className="section-header">
          <p className="section-eyebrow text-primary">{content.eyebrow}</p>
          <h2 className="section-title text-gray-900">{content.heading}</h2>
          <div className="section-divider mt-6" />
          <p className="mt-6 text-gray-600 max-w-wide mx-auto text-sm md:text-base leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/* Navegación horizontal: 4 pilares con enlaces directos */}
        <nav className="mt-10 mb-8 flex flex-wrap justify-center gap-0" aria-label="Pilares de servicios">
          {pillars.map((pilar, idx) => {
            const pilarId = PILAR_IDS[pilar.pillarKey]
            if (!pilarId) return null
            return (
              <span key={pilarId} className="flex items-center">
                <a
                  href={`#${pilarId}`}
                  onClick={(e) => handlePilarClick(e, pilarId)}
                  className="px-4 py-2 text-sm font-bold text-navy/70 hover:text-navy uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
                >
                  {pilar.category}
                </a>
                {idx < pillars.length - 1 && (
                  <span className="w-px h-5 bg-primary/50" aria-hidden />
                )}
              </span>
            )
          })}
        </nav>

        {/* 4 Pilares, cada uno con sus servicios */}
        <div className="space-y-12 lg:space-y-16">
          {pillars.map((pilar) => {
            const { services } = pilar
            const pilarId = PILAR_IDS[pilar.pillarKey]
            if (!services?.length || !pilarId) return null

            return (
              <m.div
                key={pilar.pillarKey}
                id={pilarId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <p className="section-pillar-label border-l-4 border-primary pl-4 mb-6">
                  <a
                    href={`#${pilarId}`}
                    onClick={(e) => handlePilarClick(e, pilarId)}
                    className="hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                  >
                    {pilar.category}
                  </a>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {services.map((service, itemIndex) => {
                    const icon = getServiceIcon(service.id)
                    const number = String(itemIndex + 1).padStart(2, '0')

                    return (
                      <Link
                        key={service.id}
                        to={`/servicios/${service.slug}`}
                        onClick={() => handleServiceClick(service)}
                        className="group text-left flex flex-col overflow-hidden rounded-sm border border-gray-200/80 transition-all duration-300 bg-white hover:bg-gray-50/50 hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <m.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col h-full"
                        >
                          <div className="relative w-full h-[120px] sm:h-[140px] md:h-[150px] flex-shrink-0 overflow-hidden">
                            <ServiceImage src={service.image} alt={service.title} variant="thumb" />
                            <div className="absolute bottom-2 right-2 flex items-center gap-2 z-10 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm border border-white/80">
                              <span className="text-primary font-bold text-sm tabular-nums min-w-[1.25rem]">{number}</span>
                              {icon && (
                                <img src={icon} alt="" aria-hidden className="w-4 h-4 opacity-95 object-contain" />
                              )}
                            </div>
                          </div>
                          <div className="p-3 md:p-4 min-h-[76px] flex flex-col justify-center">
                            <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                              {service.title}
                            </h4>
                            <p className="text-primary text-xs font-medium mt-0.5 tracking-wide truncate">
                              {service.subtitle}
                            </p>
                            <span className="mt-2 inline-flex" aria-hidden>
                              <svg className="w-4 h-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                            </span>
                          </div>
                        </m.div>
                      </Link>
                    )
                  })}
                </div>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
