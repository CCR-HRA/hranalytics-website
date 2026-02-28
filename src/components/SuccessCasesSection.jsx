import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { successCases as content } from '../data/content'

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
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
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
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
