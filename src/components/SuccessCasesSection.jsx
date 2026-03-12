/**
 * Sección de casos de éxito. Contenido y mensajes de interfaz en español.
 */
import { useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { successCases as content } from '../data/content'
import CasoSPPPanel from './CasoSPPPanel'
import CasoSPPRegionalPanel from './CasoSPPRegionalPanel'
import CasoAlineamientoPanel from './CasoAlineamientoPanel'
import CasoCapacitacionPanel from './CasoCapacitacionPanel'
import CasoIncentivosPanel from './CasoIncentivosPanel'
import CasoRotacionPanel from './CasoRotacionPanel'
import { IllustrationResults } from './CaseStudyIcons'

function DetailCasePanel({ expanded, expandByDefault = false }) {
  const { detail } = expanded
  const [showDetail, setShowDetail] = useState(expandByDefault)

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-white border border-gray-100/80 shadow-card">
      <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
        {expanded.service}
      </span>
      <h3 className="content-h3 text-xl mt-2 mb-4">{expanded.title}</h3>
      <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
        <p><strong className="text-gray-800">Contexto:</strong> {expanded.context}</p>
        <p><strong className="text-gray-800">Solución:</strong> {expanded.solution}</p>
      </div>
      <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100">
        {expanded.metrics.map((m) => (
          <div key={m.id}>
            <span className="text-2xl font-bold text-primary">{m.value}</span>
            <span className="text-gray-600 text-sm ml-1">{m.label}</span>
          </div>
        ))}
      </div>
      {detail && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          {!expandByDefault && (
            <button
              type="button"
              onClick={() => setShowDetail(!showDetail)}
              className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
            >
              {showDetail ? 'Cerrar detalle' : 'Ver detalle completo'}
              <svg className={`w-4 h-4 transition-transform ${showDetail ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          <AnimatePresence>
            {showDetail && (
              <m.div
                initial={expandByDefault ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className={`space-y-4 text-gray-600 text-sm leading-relaxed ${!expandByDefault ? 'mt-4' : ''}`}>
                  <p><strong className="text-gray-800">El desafío:</strong> {detail.challenge}</p>
                  <p><strong className="text-gray-800">Enfoque:</strong> {detail.approach}</p>
                  {detail.results?.length > 0 && (
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">Resultados:</p>
                      <ul className="list-disc pl-5 space-y-1.5">
                        {detail.results.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p><strong className="text-gray-800">Impacto:</strong> {detail.impact}</p>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

function EnhancedCasePanel({ expanded, expandByDefault = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const { progressBars = [], impactBullets = [] } = expanded.enhancedDetail ?? {}
  const [showImpact, setShowImpact] = useState(expandByDefault)

  return (
    <div ref={ref} className="max-w-4xl mx-auto overflow-hidden rounded-2xl bg-white border border-gray-100/80 shadow-card">
      <div className="grid lg:grid-cols-[1fr,minmax(280px,1fr)] gap-0">
        <div className="p-6 md:p-8 lg:border-r border-gray-100/80">
          <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
            {expanded.service}
          </span>
          <h3 className="content-h3 text-xl mt-2 mb-4">{expanded.title}</h3>
          <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
            <p><strong className="text-gray-800">Contexto:</strong> {expanded.context}</p>
            <p><strong className="text-gray-800">Solución:</strong> {expanded.solution}</p>
          </div>
          {progressBars.length > 0 && (
            <div className="mt-6">
              <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-3">Resultados clave</p>
              <div className="space-y-4">
                {progressBars.map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 font-medium">{bar.label}</span>
                      <span className={`font-bold ${bar.color === 'amber' ? 'text-amber-600' : 'text-primary'}`}>{bar.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <m.div
                        className={`h-full rounded-full ${bar.color === 'amber' ? 'bg-amber-500' : 'bg-primary'}`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${bar.value}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {impactBullets.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              {!expandByDefault && (
                <button
                  type="button"
                  onClick={() => setShowImpact(!showImpact)}
                  className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                >
                  {showImpact ? 'Cerrar' : 'Ver impacto detallado'}
                  <svg className={`w-4 h-4 transition-transform ${showImpact ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              <AnimatePresence>
                {showImpact && (
                  <m.ul
                    initial={expandByDefault ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`overflow-hidden space-y-2 list-none pl-0 ${!expandByDefault ? 'mt-3' : ''}`}
                  >
                    {impactBullets.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </m.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <div className="bg-gray-50/60 p-6 flex items-center justify-center">
          <IllustrationResults className="w-full max-w-[240px] h-auto max-h-[200px]" />
        </div>
      </div>
    </div>
  )
}

function CaseDetailPanel({ expanded, expandByDefault = false }) {
  if (expanded.enhancedDetail?.type === 'spp') {
    return <CasoSPPPanel expanded={expanded} />
  }
  if (expanded.enhancedDetail?.type === 'spp_regional') {
    return <CasoSPPRegionalPanel expanded={expanded} />
  }
  if (expanded.enhancedDetail?.type === 'alineamiento') {
    return <CasoAlineamientoPanel expanded={expanded} />
  }
  if (expanded.enhancedDetail?.type === 'capacitacion') {
    return <CasoCapacitacionPanel expanded={expanded} />
  }
  if (expanded.enhancedDetail?.type === 'incentivos') {
    return <CasoIncentivosPanel expanded={expanded} />
  }
  if (expanded.enhancedDetail?.type === 'rotacion') {
    return <CasoRotacionPanel expanded={expanded} />
  }
  if (expanded.enhancedDetail) {
    return <EnhancedCasePanel expanded={expanded} expandByDefault={expandByDefault} />
  }
  if (expanded.detail) {
    return <DetailCasePanel expanded={expanded} expandByDefault={expandByDefault} />
  }
  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-white border border-gray-100/80 shadow-card">
      <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
        {expanded.service}
      </span>
      <h3 className="content-h3 text-xl mt-2 mb-4">{expanded.title}</h3>
      <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
        <p><strong className="text-gray-800">Contexto:</strong> {expanded.context}</p>
        <p><strong className="text-gray-800">Solución:</strong> {expanded.solution}</p>
      </div>
      <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100">
        {expanded.metrics.map((m) => (
          <div key={m.id}>
            <span className="text-2xl font-bold text-primary">{m.value}</span>
            <span className="text-gray-600 text-sm ml-1">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SuccessCasesSection({ variant = 'compact' }) {
  const [expandedId, setExpandedId] = useState(null)
  const [filterId, setFilterId] = useState(null) // null = todos
  const expanded = content.items.find((c) => c.id === expandedId)

  const filteredItems = useMemo(() => {
    if (!filterId || !content.clientProblems) return content.items
    return content.items.filter((c) => c.clientProblemId === filterId)
  }, [filterId])

  const handlePillClick = (problemId) => {
    setFilterId(problemId)
    const firstMatch = problemId
      ? content.items.find((c) => c.clientProblemId === problemId)
      : content.items[0]
    if (firstMatch) setExpandedId(firstMatch.id)
  }

  const handleCaseClick = (id) => {
    setExpandedId(id)
  }

  const isFull = variant === 'full'

  return (
    <section id="casos" className="relative py-section lg:py-section-lg overflow-hidden bg-gray-50/40 z-[4]">
      <div className={`relative z-10 ${isFull ? 'mx-auto max-w-[72rem] w-full px-4 sm:px-6 lg:px-8' : 'container-premium'}`}>
        <div className="section-header">
          <p className="section-eyebrow text-primary">
            {content.heading}
          </p>
          <h2 className="section-title text-gray-900">
            {content.subheading}
          </h2>
          <div className="section-divider mt-6" />
          <p className="mt-6 text-gray-600 text-sm md:text-base max-w-wide mx-auto leading-relaxed">
            {content.subtitle}
          </p>
          {content.privacyNotice && (
            <p className="mt-4 text-gray-500 text-xs max-w-wide mx-auto leading-relaxed text-center">
              {content.privacyNotice}{' '}
              <Link to="/privacidad" className="text-primary hover:text-primary-dark font-medium underline underline-offset-2">
                política de privacidad
              </Link>
              {content.privacyNoticeLinkSuffix ?? ' para más información.'}
            </p>
          )}
          {!isFull && (
            <p className="mt-4 text-center">
              <Link
                to="/casos"
                className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
              >
                Ver todos los casos, análisis técnico y testimonios
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </p>
          )}
        </div>

        {isFull && content.clientProblems && (
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-6 mb-6">
            <button
              type="button"
              onClick={() => { setFilterId(null); setExpandedId(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterId === null
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/40 hover:text-primary'
              }`}
            >
              Todos
            </button>
            {content.clientProblems.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePillClick(p.id)}
                aria-pressed={filterId === p.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterId === p.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {isFull ? (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Lista izquierda - desktop */}
            <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0">
              <div className="space-y-2 max-h-[60vh] lg:max-h-[calc(100vh-18rem)] overflow-y-auto pr-2 -mr-2">
                {filteredItems.map((caso) => (
                  <button
                    key={caso.id}
                    type="button"
                    onClick={() => handleCaseClick(caso.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      expandedId === caso.id
                        ? 'bg-white border-primary shadow-md ring-2 ring-primary/20'
                        : 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-widest block truncate">
                      {caso.industryLabel || caso.industry}
                    </span>
                    <h3 className="content-h3 text-sm mt-1 line-clamp-2 leading-snug">
                      {caso.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {caso.metrics.slice(0, 2).map((m) => (
                        <span key={m.id} className="text-primary font-bold text-xs">
                          {m.value}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel derecho - contenido completo */}
            <div className="flex-1 min-w-0 lg:sticky lg:top-24 lg:self-start">
              <AnimatePresence mode="sync">
                {expanded ? (
                  <m.div
                    key={expanded.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <CaseDetailPanel expanded={expanded} expandByDefault />
                  </m.div>
                ) : (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/60 p-12 text-center"
                  >
                    <p className="text-gray-500 text-sm">
                      Selecciona un caso o un filtro para ver el impacto detallado
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <>
            {/* Grid compacto (homepage): teaser de 2 casos + CTA a /casos */}
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              {content.items.slice(0, 2).map((caso) => (
                <button
                  key={caso.id}
                  type="button"
                  onClick={() => setExpandedId(expandedId === caso.id ? null : caso.id)}
                  className={`text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                    expandedId === caso.id
                      ? 'bg-white border-primary shadow-card-hover ring-2 ring-primary/20'
                      : 'bg-white border-gray-100/80 shadow-elegant hover:border-primary/30 hover:shadow-card-hover'
                  }`}
                >
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
                    {caso.service}
                  </span>
                  <h3 className="content-h3 mt-2 line-clamp-2 leading-tight">
                    {caso.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {caso.metrics.map((m) => (
                      <span key={m.id} className="text-primary font-bold text-sm">
                        {m.value}{' '}
                        <span className="text-gray-600 font-normal text-xs">{m.label}</span>
                      </span>
                    ))}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-primary text-xs font-medium">
                    {expandedId === caso.id ? 'Cerrar' : 'Ver más'}
                    <svg className={`w-4 h-4 transition-transform ${expandedId === caso.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {expanded && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-8"
                >
                  <CaseDetailPanel expanded={expanded} expandByDefault={false} />
                </m.div>
              )}
            </AnimatePresence>
            <p className="mt-8 text-center">
              <Link
                to="/casos"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 hover:border-primary/50 transition-colors"
              >
                Ver todos los casos, análisis técnico y testimonios
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  )
}
