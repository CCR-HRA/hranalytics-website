/**
 * Panel de detalle de caso. Contenido y mensajes de interfaz en español.
 */
import { successCases } from '../data/content'
import CasoSPPPanel from './CasoSPPPanel'
import CasoSPPRegionalPanel from './CasoSPPRegionalPanel'
import CasoAlineamientoPanel from './CasoAlineamientoPanel'
import CasoCapacitacionPanel from './CasoCapacitacionPanel'
import CasoIncentivosPanel from './CasoIncentivosPanel'
import CasoRotacionPanel from './CasoRotacionPanel'
import { IllustrationResults } from './CaseStudyIcons'

function EnhancedCasePanel({ expanded }) {
  const { progressBars = [], impactBullets = [] } = expanded.enhancedDetail ?? {}
  return (
    <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl bg-[#0f2035] border border-white/10 shadow-card">
      <div className="grid lg:grid-cols-[1fr,minmax(280px,1fr)] gap-0">
        <div className="p-6 md:p-8 lg:border-r border-white/10">
          <span className="text-[10px] font-semibold text-primary-light uppercase tracking-widest">
            {expanded.service}
          </span>
          <h3 className="content-h3 text-xl mt-2 mb-4 text-white">{expanded.title}</h3>
          <div className="space-y-3 text-white/90 text-sm leading-relaxed">
            <p><strong className="text-white">Contexto:</strong> {expanded.context}</p>
            <p><strong className="text-white">Solución:</strong> {expanded.solution}</p>
          </div>
          {progressBars.length > 0 && (
            <div className="mt-6">
              <p className="text-[10px] font-semibold text-primary-light uppercase tracking-widest mb-3">Resultados clave</p>
              <div className="space-y-4">
                {progressBars.map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90 font-medium">{bar.label}</span>
                      <span className={`font-bold ${bar.color === 'amber' ? 'text-amber-400' : 'text-primary-light'}`}>{bar.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-400'}`}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {impactBullets.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-3">Impacto detallado</p>
              <ul className="space-y-2 list-none pl-0">
                {impactBullets.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="bg-white/[0.06] p-6 flex items-center justify-center min-h-[200px]">
        <IllustrationResults className="w-full max-w-[240px] h-auto max-h-[200px]" />
      </div>
      </div>
    </div>
  )
}

function DetailCasePanel({ expanded }) {
  const { detail } = expanded
  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-[#0f2035] border border-white/10 shadow-card">
      <span className="text-[10px] font-semibold text-primary-light uppercase tracking-widest">
        {expanded.service}
      </span>
      <h3 className="content-h3 text-xl mt-2 mb-4 text-white">{expanded.title}</h3>
      <div className="space-y-3 text-white/90 text-sm leading-relaxed">
        <p><strong className="text-white">Contexto:</strong> {expanded.context}</p>
        <p><strong className="text-white">Solución:</strong> {expanded.solution}</p>
      </div>
      <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/10">
        {expanded.metrics.map((m) => (
          <div key={m.id}>
            <span className="text-2xl font-bold text-primary-light">{m.value}</span>
            <span className="text-white/90 text-sm ml-1">{m.label}</span>
          </div>
        ))}
      </div>
      {detail && (
        <div className="mt-6 pt-6 border-t border-white/10 space-y-4 text-white/90 text-sm leading-relaxed">
          <p><strong className="text-white">El desafío:</strong> {detail.challenge}</p>
          <p><strong className="text-white">Enfoque:</strong> {detail.approach}</p>
          {detail.results?.length > 0 && (
            <div>
              <p className="font-semibold text-white mb-2">Resultados:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {detail.results.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
          <p><strong className="text-white/90">Impacto:</strong> {detail.impact}</p>
        </div>
      )}
    </div>
  )
}

export default function CasoDetalleSection({ contentId }) {
  const expanded = successCases.items.find((c) => c.id === contentId)
  if (!expanded) return null

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
    return <EnhancedCasePanel expanded={expanded} />
  }
  if (expanded.detail) {
    return <DetailCasePanel expanded={expanded} />
  }
  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-[#0f2035] border border-white/10 shadow-card">
      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">
        {expanded.service}
      </span>
      <h3 className="content-h3 text-xl mt-2 mb-4 text-white">{expanded.title}</h3>
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p><strong className="text-white/90">Contexto:</strong> {expanded.context}</p>
        <p><strong className="text-white/90">Solución:</strong> {expanded.solution}</p>
      </div>
      <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/10">
        {expanded.metrics.map((m) => (
          <div key={m.id}>
            <span className="text-2xl font-bold text-emerald-400">{m.value}</span>
            <span className="text-white/70 text-sm ml-1">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
