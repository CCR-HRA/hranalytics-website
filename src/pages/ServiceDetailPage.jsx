import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { m } from 'framer-motion'
import SectionReveal, { RevealItem } from '../components/SectionReveal'
import { servicesBySlug } from '../data/servicesCatalog'
import { CALENDAR_BOOKING_URL } from '../config'
import { recommendations } from '../data/content'
import { analytics } from '../utils/analytics'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? servicesBySlug[slug] : null

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | HR Analytics`
      return () => { document.title = 'HR Analytics | Consultoría en People Analytics' }
    }
  }, [service])

  if (!service) {
    return <Navigate to="/#servicios" replace />
  }

  const testimonial = service.relatedTestimonialId
    ? recommendations.items.find((t) => t.id === service.relatedTestimonialId)
    : null

  return (
    <div className="flex flex-col bg-gray-50/50 pb-page-bottom">
      {/* 1. HERO DEL SERVICIO — cuadro verde menos alto */}
      <section className="bg-primary text-white pt-20 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:48px_48px]" aria-hidden="true" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <Link
            to="/#servicios"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Servicios
          </Link>

          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/80 font-bold tracking-widest text-sm uppercase mb-3">
              {service.subtitle}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6">
              {service.title}
            </h1>
          </m.div>
        </div>
      </section>

      {/* 2. CONTENIDO PRINCIPAL */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <SectionReveal className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start" staggerDelay={0.06}>
          {/* Columna Izquierda: El Por Qué */}
          <RevealItem className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">La perspectiva estratégica</h2>
            {service.why.map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-lg leading-relaxed text-justify hyphens-none">
                {paragraph}
              </p>
            ))}

            {testimonial && (
              <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-800 italic mb-6 text-justify hyphens-none">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-4 flex-wrap">
                  {testimonial?.photo && (
                    <img src={testimonial.photo} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" loading="lazy" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-primary text-xs font-medium">{testimonial.role} · {testimonial.company}</p>
                  </div>
                  {testimonial?.companyLogo && (
                    <img src={testimonial.companyLogo} alt={testimonial.company} className="h-8 w-auto max-w-[120px] object-contain object-right flex-shrink-0 opacity-90" loading="lazy" />
                  )}
                </div>
              </div>
            )}
          </RevealItem>

          {/* Columna Derecha: Metodología */}
          <RevealItem className="lg:col-span-5 relative">
            <div className="sticky top-32 bg-white rounded-2xl shadow-professional border border-gray-100 p-8">
              <h3 className="content-h3 text-lg mb-8 border-b border-gray-100 pb-4">Nuestra Metodología</h3>

              <div className="space-y-8">
                {service.methodology.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    {index !== service.methodology.length - 1 && (
                      <div className="absolute left-[11px] top-8 bottom-[-40px] w-px bg-gray-200" />
                    )}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold border border-primary/20">
                      {index + 1}
                    </div>

                    <h4 className="font-bold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify hyphens-none">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                <a
                  href={CALENDAR_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.ctaClick('Agendar reunión', 'service_detail')}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Agendar reunión
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </RevealItem>
        </SectionReveal>
      </section>
    </div>
  )
}
