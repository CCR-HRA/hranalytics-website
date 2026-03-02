import { useState, useEffect, useRef } from 'react'
import { m } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'
import { analytics } from '../utils/analytics'

const P = '#216a69'
const NAVY = '#0a1628'
const PL = '#2d8a88'
const WARN = '#f59e0b'
const DANGER = '#ef4444'
const SUCCESS = '#10b981'

function useCount(target, started, duration = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!started) return
    const n = parseFloat(target)
    if (Number.isNaN(n)) return
    let t0 = null
    const tick = (ts) => {
      if (!t0) t0 = ts
      const prog = Math.min((ts - t0) / duration, 1)
      const ease = 1 - Math.pow(1 - prog, 3)
      setV(Math.floor(ease * n))
      if (prog < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target])
  return v
}

function AnimBar({ value, max = 100, color = P, started, delay = 0, height = 6 }) {
  return (
    <div className="rounded-full overflow-hidden bg-gray-100" style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-[1100ms]"
        style={{
          background: color,
          width: started ? `${Math.round((value / max) * 100)}%` : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

function SatisfactionChart({ started }) {
  const programs = [
    { name: 'Prog. A', score: 4.6, n: '1,1K evaluaciones', color: P },
    { name: 'Prog. B', score: 4.5, n: '7,8K evaluaciones', color: PL },
    { name: 'Prog. C', score: 4.3, n: '11,4K evaluaciones', color: P },
    { name: 'Prog. D', score: 4.1, n: '9,2K evaluaciones', color: PL },
  ]
  const minScore = 3.5
  const maxScore = 5.0
  const toH = (s) => ((s - minScore) / (maxScore - minScore)) * 100
  const threshPct = toH(4.0)
  return (
    <div>
      <div className="relative flex items-end gap-3 h-[150px]">
        <div className="absolute left-0 right-0 z-10 border-t-2 border-dashed border-gray-400" style={{ bottom: `${threshPct}%` }}>
          <span className="absolute right-0 bottom-0.5 text-[9px] text-gray-400 bg-white px-0.5">mín. 4.0</span>
        </div>
        {programs.map((p, i) => {
          const pct = toH(p.score)
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-xs font-extrabold mb-0.5" style={{ color: p.color }}>{p.score}</span>
              <div
                className="w-full rounded-t transition-all duration-1000 min-h-[4px]"
                style={{
                  background: p.color,
                  height: started ? `${pct}%` : '0%',
                  transitionDelay: `${i * 120}ms`,
                }}
              />
              <span className="text-[10px] text-gray-500 mt-1">{p.name}</span>
              <span className="text-[9px] text-gray-400">{p.n}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-3.5 p-2 bg-green-50 rounded-lg border border-green-200">
        <span className="text-xs font-bold text-emerald-600">✓ 100% de los programas </span>
        <span className="text-xs text-gray-700">superó el umbral de satisfacción de 4.0/5.0</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: 'Facilitador', score: '4.8', color: SUCCESS },
          { label: 'Contenido', score: '4.6', color: P },
          { label: 'Infraestructura', score: '4.2', color: WARN },
        ].map((d, i) => (
          <div key={i} className="p-3 rounded-lg border" style={{ borderColor: `${d.color}33`, background: `${d.color}06` }}>
            <div className="text-xl font-extrabold" style={{ color: d.color }}>{d.score}<span className="text-[10px] text-gray-400">/5</span></div>
            <div className="text-[11px] font-bold text-navy mt-0.5">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ApprovalChart({ started }) {
  const groups = [
    { name: 'Inducción y Onboarding', approval: 91.4, avg: 88.7, color: P },
    { name: 'Formación Técnica Base', approval: 86.2, avg: 83.5, color: PL },
    { name: 'Formación de Líderes', approval: 73.8, avg: 71.4, color: WARN, alert: '⚠ Bajo la meta — diagnóstico y plan de mejora activados' },
    { name: 'Habilitación Avanzada', approval: 60.5, avg: 58.3, color: DANGER, alert: '⚠ Brecha prioritaria — requiere intervención estructural' },
  ]
  return (
    <div className="flex flex-col gap-3">
      {groups.map((g, i) => (
        <div
          key={i}
          className="p-3 rounded-lg border transition-all duration-500"
          style={{
            borderColor: g.alert ? `${g.color}44` : '#e5e7eb',
            background: g.alert ? `${g.color}08` : 'white',
            opacity: started ? 1 : 0,
            transform: started ? 'none' : 'translateX(-12px)',
            transitionDelay: `${i * 100}ms`,
          }}
        >
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-navy">{g.name}</span>
            <div className="flex gap-2.5 items-center">
              <span className="text-[10px] text-gray-400">promedio: <strong className="text-gray-700">{g.avg}%</strong></span>
              <span className="text-base font-extrabold" style={{ color: g.color }}>{g.approval}%</span>
            </div>
          </div>
          <AnimBar value={g.approval} max={100} color={g.color} started={started} delay={i * 100 + 200} height={6} />
          {g.alert && <p className="text-[11px] font-semibold mt-1" style={{ color: g.color }}>{g.alert}</p>}
        </div>
      ))}
      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
        <p className="text-[11px] font-bold text-red-600 mb-0.5">Hallazgo crítico detectado</p>
        <p className="text-xs text-gray-700 leading-relaxed m-0">
          Un programa del portafolio registró una reprobación significativamente por encima del promedio esperado. La anomalía fue validada estadísticamente con correlación alta y diferencias significativas entre grupos (p &lt; 0.05).
        </p>
      </div>
    </div>
  )
}

function TransferChart({ started }) {
  const dimensions = [
    { label: 'Aplicación en el puesto de trabajo', instructor: 4.2, participante: 4.6 },
    { label: 'Cambios observados en el desempeño', instructor: 4.3, participante: 4.7 },
    { label: 'Calidad de retroalimentación recibida', instructor: 4.4, participante: 4.5 },
    { label: 'Acompañamiento y soporte posterior', instructor: 4.1, participante: 4.5 },
  ]
  return (
    <div>
      <div className="flex gap-4 mb-3.5">
        {[{ c: NAVY, l: 'Quienes imparten (más conservadores)' }, { c: P, l: 'Quienes participan (más optimistas)' }].map((x) => (
          <div key={x.l} className="flex gap-1.5 items-center">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: x.c }} />
            <span className="text-[11px] text-gray-500">{x.l}</span>
          </div>
        ))}
      </div>
      {dimensions.map((d, i) => {
        const gap = (d.participante - d.instructor).toFixed(1)
        return (
          <div key={i} className="mb-3.5 transition-opacity duration-400" style={{ opacity: started ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-700 font-medium">{d.label}</span>
              <span className="text-[11px] font-bold text-amber-600">Δ {gap} pts</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="text-[10px] text-navy font-bold w-7 text-right">{d.instructor}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 rounded-full bg-navy transition-all duration-1000" style={{ width: started ? `${(d.instructor / 5) * 100}%` : '0%', transitionDelay: `${i * 100}ms` }} />
                <div className="absolute left-0 top-0 bottom-0 rounded-full opacity-50 transition-all duration-1000" style={{ background: P, width: started ? `${(d.participante / 5) * 100}%` : '0%', transitionDelay: `${i * 100 + 200}ms` }} />
              </div>
              <span className="text-[10px] text-primary font-bold w-7">{d.participante}</span>
            </div>
          </div>
        )
      })}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="text-xl font-extrabold text-navy">4.6<span className="text-[10px] text-gray-400">/5</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Transferencia promedio percibida por participantes</div>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="text-xl font-extrabold text-navy">0.3<span className="text-[10px] text-gray-400"> pts</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Brecha promedio entre quienes imparten y participan</div>
        </div>
      </div>
      <div className="mt-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-[11px] text-gray-400 m-0">
          <strong className="text-gray-700">Limitación del análisis:</strong> La transferencia está basada en percepción (encuestas). Se recomienda avanzar hacia observación directa, listas de verificación supervisadas y bitácoras en terreno para validar el impacto real.
        </p>
      </div>
    </div>
  )
}

function RoadmapCap({ started }) {
  const recs = [
    { nivel: 'Nivel 1 — Satisfacción', color: SUCCESS, bg: '#f0fdf4', items: ['Mantener los estándares actuales: todos los programas sobre el umbral mínimo.', 'Revisar logística y comunicación en programas de alto volumen de participantes.', 'Mejorar condiciones de infraestructura y soporte digital en modalidad presencial.'] },
    { nivel: 'Nivel 2 — Aprendizaje', color: P, bg: '#f0f9f9', items: ['Documentar y replicar las buenas prácticas del programa con mayor tasa de aprobación.', 'Intervención focalizada en el programa con mayor brecha de aprendizaje (meta ≥85%).', 'Diagnóstico de causas raíz en la habilitación avanzada y rediseño curricular.'] },
    { nivel: 'Nivel 3 — Transferencia', color: WARN, bg: '#fffbeb', items: ['Alinear criterios de evaluación entre quienes imparten y quienes reciben la formación.', 'Implementar seguimiento post-capacitación: listas de verificación, bitácoras y observación estructurada.', 'Diseñar pilotos de medición de impacto organizacional vinculados a indicadores de negocio.'] },
  ]
  return (
    <div className="flex flex-col gap-3">
      {recs.map((r, i) => (
        <div key={i} className="p-4 rounded-xl border transition-opacity duration-400" style={{ background: r.bg, borderColor: `${r.color}33`, opacity: started ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: r.color }}>{r.nivel}</p>
          {r.items.map((item, j) => (
            <div key={j} className="flex gap-2 items-start mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: r.color }} />
              <span className="text-xs text-gray-700 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-[11px] font-bold text-gray-700 mb-1">Nivel 4 — Impacto organizacional (siguiente etapa)</p>
        <p className="text-[11px] text-gray-400 leading-snug m-0">
          No evaluado en este ciclo. La organización ya cuenta con las bases metodológicas para avanzar hacia medición de impacto en indicadores de negocio: productividad, calidad y reducción de errores.
        </p>
      </div>
    </div>
  )
}

export default function CasoCapacitacionPanel({ expanded }) {
  const [tab, setTab] = useState('satisfaccion')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const n1 = useCount(40, visible)
  const n2 = useCount(91, visible)
  const n3 = useCount(8, visible)
  const n4 = useCount(100, visible)

  const tabs = [
    { id: 'satisfaccion', label: 'Nivel 1 · Satisfacción' },
    { id: 'aprendizaje', label: 'Nivel 2 · Aprendizaje' },
    { id: 'transferencia', label: 'Nivel 3 · Transferencia' },
    { id: 'roadmap', label: 'Plan de Acción' },
  ]

  const handleCTAClick = (e) => {
    e.preventDefault()
    analytics.ctaClick('Conversemos', 'caso_capacitacion_cta')
    scrollToSection('#contacto')
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden bg-white border border-gray-100/80 shadow-card">
        <div className="bg-navy rounded-t-2xl p-6 md:p-7 text-white">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex gap-1.5 mb-2.5">
                <span className="bg-primary rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Evaluación de Capacitación</span>
                <span className="border border-white/20 rounded-md px-2.5 py-1 text-[10px] text-white/55">2023</span>
              </div>
              <h3 className="font-serif text-lg md:text-xl font-normal leading-tight mb-1.5">
                {expanded?.title || 'Medición integral del impacto de la capacitación en 3 niveles'}
              </h3>
              <p className="text-white/50 text-xs">{expanded?.industryLabel || 'Organización con múltiples unidades · Chile · 2023'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { val: n1, suf: 'K+', label: 'registros analizados' },
                { val: n2, suf: '%', label: 'aprobación corporativa' },
                { val: n3, suf: '', label: 'informes consolidados' },
                { val: n4, suf: '%', label: 'programas sobre umbral 4.0/5' },
              ].map((s, i) => (
                <div key={i} className="text-center bg-white/5 rounded-lg py-2.5 px-3">
                  <div className="text-xl font-extrabold font-serif text-white leading-none">{s.val}{s.suf}</div>
                  <div className="text-[9px] text-white/45 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 mb-4 px-4 pt-4">
          {[
            { n: '1', label: 'Satisfacción', id: 'satisfaccion', c: SUCCESS },
            { n: '2', label: 'Aprendizaje', id: 'aprendizaje', c: P },
            { n: '3', label: 'Transferencia', id: 'transferencia', c: WARN },
            { n: '4', label: 'Impacto (pendiente)', id: null, c: '#9ca3af' },
          ].map((l, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-all ${tab === l.id ? 'text-white' : ''}`} style={{ background: tab === l.id ? l.c : `${l.c}33`, color: tab === l.id ? 'white' : l.c }}>
                {l.n}
              </div>
              <span className={`text-[9px] text-center leading-tight ${tab === l.id ? 'font-bold' : 'font-normal'}`} style={{ color: tab === l.id ? l.c : '#9ca3af' }}>{l.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-1 p-1.5 bg-gray-50 border-y border-gray-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-1 rounded-lg text-[10px] font-semibold transition-colors ${tab === t.id ? 'bg-navy text-white' : 'text-gray-500'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5 md:p-6">
          {tab === 'satisfaccion' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Nivel 1 · Reacción post-capacitación</p>
              <p className="text-sm font-bold text-navy mb-1.5">Satisfacción por programa — escala 1 a 5</p>
              <p className="text-xs text-gray-500 mb-4">40.000+ evaluaciones consolidadas en 4 grupos</p>
              <SatisfactionChart started={visible} />
            </>
          )}
          {tab === 'aprendizaje' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Nivel 2 · Evaluaciones de conocimiento</p>
              <p className="text-sm font-bold text-navy mb-1.5">Tasas de aprobación por grupo de capacitación</p>
              <p className="text-xs text-gray-500 mb-4">Análisis con estadística descriptiva, inferencial y correlacional</p>
              <ApprovalChart started={visible} />
            </>
          )}
          {tab === 'transferencia' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Nivel 3 · Aplicación en el trabajo</p>
              <p className="text-sm font-bold text-navy mb-1.5">Percepción de transferencia: quienes imparten vs. quienes participan</p>
              <p className="text-xs text-gray-500 mb-4">Análisis comparativo con validación estadística</p>
              <TransferChart started={visible} />
            </>
          )}
          {tab === 'roadmap' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Entregable final del proyecto</p>
              <p className="text-sm font-bold text-navy mb-4">Recomendaciones priorizadas por nivel del modelo</p>
              <RoadmapCap started={visible} />
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-sm text-gray-500 m-0">¿Necesitas medir el impacto de tu inversión en capacitación?</p>
          <a href="#contacto" onClick={handleCTAClick} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            Conversemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </m.div>
    </div>
  )
}
