/**
 * Dashboard de casos de impacto. Contenido y mensajes de interfaz en español.
 */
import { useState, useEffect, useRef } from 'react'
import { casos, filtros } from '../data/buildCasosFromContent'

const BG_MAIN = '#0a1628'
const BG_PANEL = '#0d1e35'

function scrollToDetalle() {
  const el = document.getElementById('caso-detalle')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function CasosImpactoDashboard({ onCasoChange }) {
  const [filtroActivo, setFiltroActivo] = useState('todos')
  const [casoActivo, setCasoActivo] = useState(casos[0])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [casoAbierto, setCasoAbierto] = useState(null)
  const panelRef = useRef(null)

  const casosFiltrados =
    filtroActivo === 'todos'
      ? casos
      : casos.filter((c) => c.filtro === filtroActivo)

  const handleCasoClick = (caso) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCasoActivo(caso)
      onCasoChange?.(caso.contentId)
      setIsTransitioning(false)
    }, 150)
  }

  const handleFiltroClick = (id) => {
    setFiltroActivo(id)
    const firstMatch = id === 'todos' ? casos[0] : casos.find((c) => c.filtro === id)
    if (firstMatch) handleCasoClick(firstMatch)
  }

  useEffect(() => {
    onCasoChange?.(casoActivo?.contentId)
  }, [casoActivo?.contentId])

  return (
    <section
      id="casos"
      className="w-full py-6 lg:py-8"
      style={{ backgroundColor: BG_MAIN }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Filtros: una línea para que la lista quede visible de inmediato */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <p className="text-white/90 text-sm font-medium shrink-0">
            Selecciona el desafío que más se parece al tuyo
          </p>
          <div className="flex flex-wrap gap-2">
            {filtros.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFiltroClick(f.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all ${
                  filtroActivo === f.id
                    ? 'bg-primary/20 text-primary-light border border-primary/40'
                    : 'bg-white/[0.08] border border-white/25 text-white/90 hover:bg-white/[0.1]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: grid 2 columnas */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr] lg:gap-0 lg:min-h-[480px] rounded-xl overflow-hidden border border-white/[0.06]">
          {/* Columna izquierda */}
          <div
            className="border-r border-white/5 py-6 overflow-y-auto"
            style={{ backgroundColor: BG_PANEL }}
          >
            {casosFiltrados.map((caso) => {
              const isActive = casoActivo?.id === caso.id
              return (
                <button
                  key={caso.id}
                  type="button"
                  onClick={() => handleCasoClick(caso)}
                  className={`w-full text-left px-5 py-4 cursor-pointer transition-all duration-150 border-l-2 border-b border-white/[0.08] flex items-center justify-between last:border-b-0 ${
                    isActive
                      ? 'bg-white/[0.07] border-l-primary-light'
                      : 'border-l-transparent hover:bg-white/[0.03] hover:border-l-white/20'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-light text-xs font-mono font-semibold shrink-0">
                        {caso.numero}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-white/90 font-semibold truncate">
                        {caso.categoria}
                      </span>
                    </div>
                    <h3
                      className={`text-sm font-medium leading-snug line-clamp-2 mt-1 ${
                        isActive ? 'text-white' : 'text-white/95'
                      }`}
                    >
                      {caso.titulo}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-primary-light font-bold text-xl">
                        {caso.metricaPrincipal?.valor}
                      </span>
                      <span className="text-white/80 text-[10px] ml-1">
                        {caso.metricaPrincipal?.etiqueta}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <svg
                      className="w-5 h-5 text-primary-light shrink-0 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          {/* Columna derecha - Panel de detalle */}
          <div
            ref={panelRef}
            className="p-8 lg:p-12 overflow-y-auto"
            style={{ backgroundColor: BG_MAIN }}
          >
            <div
              className={`transition-opacity duration-200 ease-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {casoActivo && (
                <>
                  {/* Header del caso */}
                  <span className="inline-block bg-primary/20 text-primary-light text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full">
                    {casoActivo.categoriaPill ? (
                      <span className="block leading-tight">
                        {casoActivo.categoriaPill.split('\n').map((line, i) => (
                          <span key={i} className={i === 1 ? 'block text-[9px] normal-case tracking-normal mt-0.5 opacity-95' : 'block'}>
                            {line}
                          </span>
                        ))}
                      </span>
                    ) : (
                      casoActivo.categoria
                    )}
                  </span>
                  <h3 className="text-white text-2xl sm:text-3xl font-bold mt-4 leading-tight">
                    {casoActivo.titulo}
                  </h3>
                  <p className="text-white/90 text-sm mt-3 leading-relaxed max-w-xl">
                    {casoActivo.contexto}
                  </p>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                    {casoActivo.metricas.map((m, i) => (
                      <div
                        key={i}
                        className="bg-white/[0.08] border border-white/[0.15] rounded-xl p-4"
                      >
                        <div className="text-primary-light font-bold text-3xl sm:text-4xl tracking-tight">
                          {m.valor}
                        </div>
                        <div className="text-white/85 text-xs mt-1 leading-snug">
                          {m.etiqueta}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desafío y Solución */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-primary-light font-semibold mb-2">
                        EL DESAFÍO
                      </p>
                      <p className="text-white/90 text-sm leading-relaxed border-l-2 border-red-400/50 pl-4 text-justify">
                        {casoActivo.desafio}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-primary-light font-semibold mb-2">
                        LA SOLUCIÓN
                      </p>
                      <div className="text-white/90 text-sm leading-relaxed border-l-2 border-primary-light/60 pl-4 text-justify">
                        {casoActivo.solucionPoints?.length ? (
                          <>
                            <p className="mb-2">{casoActivo.solucionIntro}</p>
                            <ul className="list-disc pl-4 space-y-1.5 m-0">
                              {casoActivo.solucionPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <p className="m-0">{casoActivo.solucion}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="border-t border-white/[0.12] mt-8 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <p className="text-white/90 text-sm">
                      ¿Este desafío se parece al tuyo?
                    </p>
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition shrink-0"
                    >
                      Conversemos
                      <span aria-hidden>→</span>
                    </a>
                  </div>

                  {/* Link a análisis técnico */}
                  <button
                    type="button"
                    onClick={scrollToDetalle}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary-light/50 bg-primary/10 text-primary-light text-sm font-medium hover:bg-primary/20 hover:border-primary-light/70 transition-colors"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Ver análisis técnico completo</span>
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: acordeón */}
        <div className="lg:hidden space-y-0">
          {casosFiltrados.map((caso) => {
            const isOpen = casoAbierto === caso.id
            return (
              <div
                key={caso.id}
                className="border-b border-white/[0.08]"
                style={{ backgroundColor: BG_MAIN }}
              >
                <button
                  type="button"
                  onClick={() => setCasoAbierto(isOpen ? null : caso.id)}
                  className="w-full flex justify-between items-center px-5 py-4 cursor-pointer text-left"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <span className="text-primary-light text-[9px] uppercase tracking-widest font-semibold block">
                      {caso.categoria}
                    </span>
                    <span className="text-white/95 text-sm font-medium block mt-0.5 line-clamp-2">
                      {caso.titulo}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-primary-light font-bold text-lg">
                      {caso.metricaPrincipal?.valor}
                    </span>
                    <svg
                      className={`w-5 h-5 text-white/80 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div
                    className="px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ animation: 'fadeIn 0.2s ease-out' }}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {caso.metricas.map((m, i) => (
                        <div
                          key={i}
                          className="bg-white/[0.08] border border-white/[0.15] rounded-xl p-4"
                        >
                          <div className="text-primary-light font-bold text-2xl">
                            {m.valor}
                          </div>
                          <div className="text-white/85 text-xs mt-1">
                            {m.etiqueta}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-primary-light font-semibold mb-2">
                          EL DESAFÍO
                        </p>
                        <p className="text-white/90 text-sm leading-relaxed border-l-2 border-red-400/50 pl-4 text-justify">
                          {caso.desafio}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-primary-light font-semibold mb-2">
                          LA SOLUCIÓN
                        </p>
                        <div className="text-white/90 text-sm leading-relaxed border-l-2 border-primary-light/60 pl-4 text-justify">
                          {caso.solucionPoints?.length ? (
                            <>
                              <p className="mb-2">{caso.solucionIntro}</p>
                              <ul className="list-disc pl-4 space-y-1.5 m-0">
                                {caso.solucionPoints.map((point, i) => (
                                  <li key={i}>{point}</li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <p className="m-0">{caso.solucion}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href="#contacto"
                        className="inline-flex justify-center items-center bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                      >
                        Conversemos →
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setCasoActivo(caso)
                          onCasoChange?.(caso.contentId)
                          scrollToDetalle()
                        }}
                        className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-primary-light/50 bg-primary/10 text-primary-light text-sm font-medium hover:bg-primary/20 hover:border-primary-light/70 transition-colors"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Ver análisis técnico completo</span>
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
