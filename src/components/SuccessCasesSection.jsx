import { useState, useRef } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { successCases as content } from '../data/content'

function IllustrationCapacitacion() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[280px]">
      <defs>
        <pattern id="grid-cap" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        </pattern>
        <linearGradient id="barGrad-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#216a69" />
          <stop offset="100%" stopColor="#2d8a88" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="#f0f9f9" />
      <rect width="480" height="320" fill="url(#grid-cap)" opacity="0.4" className="text-primary" />
      <rect x="40" y="30" width="260" height="180" rx="16" fill="white" className="shadow-soft" />
      <text x="60" y="62" fontSize="11" fill="#9ca3af" fontFamily="sans-serif" letterSpacing="1" fontWeight="600">NIVEL DE SATISFACCIÓN</text>
      {[
        { x: 72, h: 80, val: '4.7', label: 'Prog. A' },
        { x: 122, h: 65, val: '4.5', label: 'Prog. B' },
        { x: 172, h: 70, val: '4.3', label: 'Prog. C' },
        { x: 222, h: 75, val: '4.4', label: 'Prog. D' },
      ].map((bar, i) => (
        <g key={i}>
          <rect x={bar.x} y={190 - bar.h} width={32} height={bar.h} rx="5" fill="url(#barGrad-cap)" opacity="0.9" />
          <text x={bar.x + 16} y={182 - bar.h} fontSize="10" fill="#216a69" textAnchor="middle" fontWeight="700">{bar.val}</text>
          <text x={bar.x + 16} y={202} fontSize="9" fill="#9ca3af" textAnchor="middle">{bar.label}</text>
        </g>
      ))}
      <line x1="60" y1="190" x2="280" y2="190" stroke="#e5e7eb" strokeWidth="1.5" />
      <rect x="320" y="30" width="130" height="80" rx="12" fill="#0a1628" />
      <text x="335" y="60" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="sans-serif" letterSpacing="0.5">APROBACIÓN</text>
      <text x="335" y="88" fontSize="28" fill="white" fontFamily="Georgia, serif" fontWeight="700">94%</text>
      <rect x="335" y="98" width="50" height="3" rx="2" fill="#2d8a88" />
      <rect x="320" y="126" width="130" height="80" rx="12" fill="#216a69" />
      <text x="335" y="156" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif" letterSpacing="0.5">REGISTROS</text>
      <text x="335" y="182" fontSize="24" fill="white" fontFamily="Georgia, serif" fontWeight="700">45K+</text>
      <circle cx="450" cy="20" r="40" fill="#216a69" opacity="0.06" />
      <circle cx="460" cy="300" r="30" fill="#216a69" opacity="0.05" />
    </svg>
  )
}

function EnhancedCasePanel({ expanded }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const { progressBars = [], impactBullets = [] } = expanded.enhancedDetail ?? {}
  const [showImpact, setShowImpact] = useState(false)

  return (
    <div ref={ref} className="max-w-4xl mx-auto overflow-hidden rounded-2xl bg-white border border-gray-100/80 shadow-card">
      <div className="grid lg:grid-cols-[1fr,minmax(280px,1fr)] gap-0">
        <div className="p-6 md:p-8 lg:border-r border-gray-100/80">
          <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
            {expanded.industryLabel} · {expanded.service}
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
              <AnimatePresence>
                {showImpact && (
                  <m.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mt-3 space-y-2 list-none pl-0"
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
          <IllustrationCapacitacion />
        </div>
      </div>
    </div>
  )
}

export default function SuccessCasesSection() {
  const [expandedId, setExpandedId] = useState(null)
  const expanded = content.items.find((c) => c.id === expandedId)

  return (
    <section id="casos" className="relative py-section lg:py-section-lg overflow-hidden bg-gray-50/40 z-[4]">
      <div className="container-premium relative z-10">
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
        </div>

        {/* Grid de casos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
          {content.items.map((caso) => (
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
                {caso.industry}
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

        {/* Panel detalle expandido */}
        <AnimatePresence>
          {expanded && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-8"
            >
              {expanded.enhancedDetail ? (
                <EnhancedCasePanel expanded={expanded} />
              ) : (
                <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-white border border-gray-100/80 shadow-card">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
                    {expanded.industryLabel} · {expanded.service}
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
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
