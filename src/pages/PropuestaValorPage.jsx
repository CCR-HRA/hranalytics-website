import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { valueProposition as content } from '../data/content'
import TrustBarSection from '../components/TrustBarSection'
import { CALENDAR_BOOKING_URL } from '../config'
import { analytics } from '../utils/analytics'

const icons = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
]

export default function PropuestaValorPage() {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Propuesta de valor | HR Analytics'
    return () => { document.title = 'HR Analytics | Consultoría en People Analytics' }
  }, [])
  return (
    <div className="flex flex-col pt-header pb-page-bottom">
      <div className="container-premium relative z-10">
        <div className="w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary-dark mb-10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a HR Analytics
          </Link>

          <div className="text-center mb-10">
            <p className="section-eyebrow text-primary mb-4">
              {content.heading}
            </p>
            <h1 className="section-title text-3xl md:text-4xl text-gray-900">
              {content.subheading}
            </h1>
            <div className="w-16 h-px bg-primary mx-auto mt-6" />
          </div>
        </div>

        {/* TrustBar fuera del contenedor principal para que ocupe el ancho */}
        <TrustBarSection />

        <div className="w-full mt-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {content.items.map((item, i) => (
                <article
                  key={item.title}
                  className="p-6 md:p-8 rounded-xl bg-white shadow-card hover:shadow-professional border border-gray-100/80 hover:border-primary/15 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5">
                    {icons[i]}
                  </div>
                  <h2 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* CTA al final */}
        <div className="mt-16 text-center p-8 md:p-10 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-gray-700 font-medium mb-4">¿Listo para conversar sobre tu próximo proyecto?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                analytics.ctaClick('Solicitar conversación', 'propuesta_valor_cta')
                navigate({ pathname: '/', hash: 'contacto' })
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Solicitar conversación
            </a>
            {CALENDAR_BOOKING_URL && (
              <a
                href={CALENDAR_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.ctaClick('Agendar reunión', 'propuesta_valor_cta')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-primary/30 text-primary font-semibold text-sm rounded-lg hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Agendar reunión
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
