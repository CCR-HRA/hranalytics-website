import { useRef, useState, useEffect } from 'react'
import { m, useInView, AnimatePresence } from 'framer-motion'
import { recommendations as content } from '../data/content'

const recommendations = content.items
const filters = content.filters
const FLAGS = { CL: '🇨🇱', CA: '🇨🇦', BR: '🇧🇷', CH: '🇨🇭' }

function QuoteIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 32" fill="currentColor" aria-hidden>
      <path d="M8 8c-2.2 0-4 1.8-4 4v8h6V12H8c0-1.1.9-2 2-2V8zm14 0c-2.2 0-4 1.8-4 4v8h6V12h-4c0-1.1.9-2 2-2V8z" opacity="0.15" />
    </svg>
  )
}

const AUTO_ADVANCE_MS = 9000  // 12 s: tiempo para leer el testimonial completo (~200 palabras/min)

export default function RecommendationsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [currentIndex, setCurrentIndex] = useState(0)

  const visibleRecommendations =
    activeFilter === 'Todos'
      ? recommendations
      : recommendations.filter((rec) => rec.type === activeFilter)

  const rec = visibleRecommendations.length
    ? visibleRecommendations[currentIndex % visibleRecommendations.length]
    : null

  // Reset índice al cambiar filtro
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset carousel when filter changes
    setCurrentIndex(0)
  }, [activeFilter])

  // Auto-avance en secuencia
  useEffect(() => {
    if (!inView || visibleRecommendations.length <= 1) return
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % visibleRecommendations.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(t)
  }, [inView, visibleRecommendations.length])

  const goNext = () =>
    setCurrentIndex((i) => (i + 1) % visibleRecommendations.length)
  const goPrev = () =>
    setCurrentIndex((i) => (i - 1 + visibleRecommendations.length) % visibleRecommendations.length)

  return (
    <section ref={ref} className="relative py-section lg:py-section-lg overflow-hidden bg-white z-[6]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container-premium relative z-10">
        <div className="section-header">
          <p className="section-eyebrow text-primary">
            Recomendaciones
          </p>
          <h2 className="section-title text-gray-900">
            Testimonios de clientes sobre proyectos de People Analytics
          </h2>
          <div className="section-divider mt-6" />
          <p className="mt-6 text-gray-600 text-sm md:text-base max-w-wide mx-auto leading-relaxed">
            Testimonios de clientes, jefaturas regionales y referentes en People Analytics que avalan
            mi trabajo en proyectos estratégicos de RRHH, compensaciones y analítica de personas.
          </p>
        </div>

        {/* Carrusel - recomendaciones en secuencia */}
        <div className="max-w-2xl mx-auto relative">
          {visibleRecommendations.length === 0 ? (
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-12"
            >
              No hay recomendaciones en esta categoría.
            </m.p>
          ) : (
            <>
              {/* Carrusel elegante */}
              <div className="relative min-h-[320px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <m.article
                    key={rec?.id ?? `rec-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 bg-white flex flex-col overflow-hidden rounded-xl shadow-soft border border-gray-100 border-l-4 border-l-primary"
                  >
                    {/* Barra superior - color de marca */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-light to-primary" />

                    {/* Header: logo superior izquierdo + badge */}
                    <div className="pt-6 pb-1 px-6 md:px-8 flex items-center justify-between">
                      <div className="h-14 md:h-16 flex items-center min-w-0">
                        <img
                          src={rec.companyLogo}
                          alt={rec.company}
                          className="h-12 md:h-16 w-auto object-contain max-w-[180px] md:max-w-[220px] opacity-90"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/40 rounded-full px-3 py-1.5">
                        {rec.type}
                      </span>
                    </div>

                    {/* Cita elegante */}
                    <div className="px-6 md:px-8 pt-2 pb-5 flex flex-col">
                      <div className="flex gap-4">
                        <QuoteIcon className="flex-shrink-0 w-10 h-10 text-primary/35" />
                        <blockquote className="text-[15px] md:text-base text-gray-700 leading-[1.7] font-light tracking-wide">
                          "{rec.quote}"
                        </blockquote>
                      </div>
                    </div>

                    {/* Autor - diseño refinado */}
                    <div className="mt-auto px-6 md:px-8 py-5 flex items-center gap-4 border-t border-gray-100 relative">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden ring-1 ring-gray-200/80">
                        <img
                          src={rec.photo}
                          alt={rec.name}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm tracking-tight">{rec.name}</p>
                        <p className="text-xs text-primary font-medium mt-0.5 tracking-wide">{rec.role}</p>
                        <p className="text-xs font-semibold text-primary mt-1 tracking-wide">{rec.company}</p>
                      </div>
                      {rec.country && FLAGS[rec.country] && (
                        <span className={`text-lg flex-shrink-0 inline-flex items-center justify-center ${rec.country === 'CH' ? 'opacity-100 bg-gray-100/60 rounded px-1' : 'opacity-85'}`} title={rec.country === 'CL' ? 'Chile' : rec.country === 'CA' ? 'Canadá' : rec.country === 'BR' ? 'Brasil' : rec.country === 'CH' ? 'Suiza' : ''} aria-hidden>
                          {FLAGS[rec.country]}
                        </span>
                      )}
                    </div>
                  </m.article>
                </AnimatePresence>
              </div>

              {/* Controles elegantes */}
              <div className="flex items-center justify-center gap-8 mt-5">
                <button
                  onClick={goPrev}
                  aria-label="Anterior"
                  className="p-2 text-gray-400 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-full hover:bg-gray-100/80"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {visibleRecommendations.map((rec, i) => (
                    <button
                      key={rec.id}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Ir a recomendación ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${
                        i === currentIndex
                          ? 'w-8 bg-primary'
                          : 'w-1.5 bg-gray-300/80 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  aria-label="Siguiente"
                  className="p-2 text-gray-400 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-full hover:bg-gray-100/80"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Filtros debajo de las tarjetas */}
              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {filters.map((filter) => {
                  const count =
                    filter.id === 'Todos'
                      ? recommendations.length
                      : recommendations.filter((r) => r.type === filter.id).length
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${
                        activeFilter === filter.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white text-gray-600 border border-gray-200/80 hover:border-primary/30 hover:text-primary/90'
                      }`}
                    >
                      {filter.label}
                      <span
                        className={`ml-1.5 text-xs font-normal ${
                          activeFilter === filter.id ? 'text-white/90' : 'text-gray-400'
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Contador sutil */}
        <p className="text-center text-gray-400 text-xs tracking-wide mt-4 mb-8 font-medium">
          {visibleRecommendations.length > 0
            ? `${currentIndex + 1} de ${visibleRecommendations.length} ${visibleRecommendations.length !== 1 ? 'recomendaciones' : 'recomendación'}`
            : ''}
          {activeFilter !== 'Todos' && visibleRecommendations.length > 0 ? ` · Filtro: ${activeFilter}` : ''}
        </p>
      </div>
    </section>
  )
}
