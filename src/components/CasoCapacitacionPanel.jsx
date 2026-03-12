/**
 * Panel del caso Capacitación. Contenido y mensajes de interfaz en español.
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'
import { analytics } from '../utils/analytics'
import { IconCapacitacion } from './CaseStudyIcons'

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

function AnimBar({ value, max = 100, color = P, started, delay = 0, height = 6, lightBg = false }) {
  return (
    <div
      className="rounded-full overflow-hidden"
      style={{ height, background: lightBg ? '#e5e7eb' : 'rgba(255,255,255,0.2)' }}
    >
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
          <span className="absolute right-0 bottom-0.5 text-[9px] text-white/70 bg-white/10 px-0.5">mín. 4.0</span>
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
              <span className="text-[10px] text-white/70 mt-1">{p.name}</span>
              <span className="text-[9px] text-white/60">{p.n}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-3.5 p-2 bg-green-50 rounded-lg border border-green-200">
        <span className="text-xs font-bold text-primary">✓ 100% de los programas </span>
        <span className="text-xs text-gray-800">superó el umbral de satisfacción de 4.0/5.0</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: 'Facilitador', score: '4.8', color: SUCCESS },
          { label: 'Contenido', score: '4.6', color: P },
          { label: 'Infraestructura', score: '4.2', color: WARN },
        ].map((d, i) => (
          <div key={i} className="p-3 rounded-lg border" style={{ borderColor: `${d.color}33`, background: `${d.color}06` }}>
            <div className="text-xl font-extrabold" style={{ color: d.color }}>{d.score}<span className="text-[10px] text-white/60">/5</span></div>
            <div className="text-[11px] font-bold text-white mt-0.5">{d.label}</div>
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
      {groups.map((g, i) => {
        const isLightCard = !g.alert
        const textName = isLightCard ? 'text-gray-900' : 'text-white'
        const textAvg = isLightCard ? 'text-gray-600' : 'text-white/85'
        const textAvgStrong = isLightCard ? 'text-gray-900' : 'text-white'
        return (
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
            <span className={`text-xs font-semibold ${textName}`}>{g.name}</span>
            <div className="flex gap-2.5 items-center">
              <span className={`text-[10px] ${textAvg}`}>promedio: <strong className={textAvgStrong}>{g.avg}%</strong></span>
              <span className="text-base font-extrabold" style={{ color: g.color }}>{g.approval}%</span>
            </div>
          </div>
          <AnimBar value={g.approval} max={100} color={g.color} started={started} delay={i * 100 + 200} height={6} lightBg={isLightCard} />
          {g.alert && <p className="text-[11px] font-semibold mt-1" style={{ color: g.color }}>{g.alert}</p>}
        </div>
      )})}
      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
        <p className="text-[11px] font-bold text-red-700 mb-0.5">Hallazgo crítico detectado</p>
        <p className="text-xs text-red-900/90 leading-relaxed m-0">
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
            <span className="text-[11px] text-white/70">{x.l}</span>
          </div>
        ))}
      </div>
      {dimensions.map((d, i) => {
        const gap = (d.participante - d.instructor).toFixed(1)
        return (
          <div key={i} className="mb-3.5 transition-opacity duration-400" style={{ opacity: started ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-white/85 font-medium">{d.label}</span>
              <span className="text-[11px] font-bold text-amber-400">Δ {gap} pts</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="text-[10px] text-white font-bold w-7 text-right">{d.instructor}</span>
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 rounded-full bg-navy transition-all duration-1000" style={{ width: started ? `${(d.instructor / 5) * 100}%` : '0%', transitionDelay: `${i * 100}ms` }} />
                <div className="absolute left-0 top-0 bottom-0 rounded-full opacity-50 transition-all duration-1000" style={{ background: P, width: started ? `${(d.participante / 5) * 100}%` : '0%', transitionDelay: `${i * 100 + 200}ms` }} />
              </div>
              <span className="text-[10px] text-primary-light font-bold w-7">{d.participante}</span>
            </div>
          </div>
        )
      })}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
          <div className="text-xl font-extrabold text-white">4.6<span className="text-[10px] text-white/60">/5</span></div>
          <div className="text-[11px] text-white/70 mt-0.5">Transferencia promedio percibida por participantes</div>
        </div>
        <div className="p-3 bg-amber-900/30 rounded-lg border border-amber-500/30">
          <div className="text-xl font-extrabold text-white">0.3<span className="text-[10px] text-white/60"> pts</span></div>
          <div className="text-[11px] text-white/70 mt-0.5">Brecha promedio entre quienes imparten y participan</div>
        </div>
      </div>
      <div className="mt-2.5 p-2.5 bg-white/5 rounded-lg border border-white/10">
        <p className="text-[11px] text-white/70 m-0">
          <strong className="text-white/90">Limitación del análisis:</strong> La transferencia está basada en percepción (encuestas). Se recomienda avanzar hacia observación directa, listas de verificación supervisadas y bitácoras en terreno para validar el impacto real.
        </p>
      </div>
    </div>
  )
}

function RoadmapCap({ started }) {
  const recs = [
    {
      nivel: 'Nivel 1 — Satisfacción',
      color: SUCCESS,
      bg: '#f0fdf4',
      items: [
        'Rediseñar los instrumentos de satisfacción para que sean más breves y enfocados en los puntos que realmente diferencian la experiencia.',
        'Segmentar los resultados por unidad, turno o perfil de participante en lugar de mirar solo promedios globales.',
        'Establecer un cierre estándar de cada programa que incluya síntesis de aprendizajes y microencuesta aplicada en el momento.',
      ],
    },
    {
      nivel: 'Nivel 2 — Aprendizaje',
      color: P,
      bg: '#f0f9f9',
      items: [
        'Definir objetivos de aprendizaje observables por rol antes de calendarizar la oferta anual.',
        'Incorporar evaluaciones breves al inicio y al cierre de cada módulo para medir avance en lugar de hacerlo solo al final del curso.',
        'Construir un banco común de recursos (casos, guías y ejercicios) reutilizable entre programas con competencias similares.',
      ],
    },
    {
      nivel: 'Nivel 3 — Transferencia',
      color: WARN,
      bg: '#fffbeb',
      items: [
        'Acordar con las jefaturas, previo a cada programa, una acción concreta que cada participante deberá aplicar en su puesto durante el mes siguiente.',
        'Registrar ejemplos de aplicación en un formato simple (bitácora breve o formulario digital) para disponer de evidencias cualitativas.',
        'Utilizar esa información de campo para ajustar contenidos, duración y foco de la oferta formativa del año siguiente.',
      ],
    },
  ]
  return (
    <div className="flex flex-col gap-3">
      {recs.map((r, i) => (
        <div key={i} className="p-4 rounded-xl border transition-opacity duration-400" style={{ background: r.bg, borderColor: `${r.color}33`, opacity: started ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: r.color }}>{r.nivel}</p>
          {r.items.map((item, j) => (
            <div key={j} className="flex gap-2 items-start mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: r.color }} />
              <span className="text-xs text-navy leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
        <p className="text-[11px] font-bold text-white mb-1">Nivel 4 — Impacto organizacional (siguiente etapa)</p>
        <p className="text-[11px] text-white/70 leading-snug m-0">
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

  const navigate = useNavigate()
  const handleCTAClick = (e) => {
    e.preventDefault()
    analytics.ctaClick('Conversemos', 'caso_capacitacion_cta')
    if (!scrollToSection('#contacto')) navigate({ pathname: '/', hash: 'contacto' })
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden bg-[#0f2035] border border-white/10 shadow-card">
        <div className="bg-navy rounded-t-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1 opacity-90">
                <IconCapacitacion className="w-10 h-10 sm:w-12 sm:h-12" color="rgba(255,255,255,0.9)" />
              </div>
              <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-primary rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider">{expanded?.service || 'Evaluación de Capacitación'}</span>
                <span className="border border-white/20 rounded-md px-3 py-1.5 text-[11px] text-white/60">2023</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal leading-tight mb-2">
                {expanded?.title || 'Medición integral del impacto de la capacitación en 3 niveles'}
              </h3>
              <p className="text-white/85 text-sm mb-4">{expanded?.industryLabel || 'Organización con múltiples unidades · Chile · 2023'}</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-nowrap w-full">
              {[
                { val: n1, suf: ' Mil', label: 'registros analizados' },
                { val: n2, suf: '%', label: 'aprobación corporativa' },
                { val: n3, suf: '', label: 'informes consolidados' },
                { val: n4, suf: '%', label: 'programas sobre umbral 4.0/5' },
              ].map((s, i) => (
                <div key={i} className="flex-1 min-w-[4.5rem] text-center bg-white/5 rounded-lg py-2 px-2 sm:p-3">
                  {expanded?.service && <div className="text-[10px] sm:text-xs text-white/80 font-semibold uppercase tracking-wider mb-1 leading-tight">{expanded.service}</div>}
                  <div className="text-xl sm:text-2xl font-extrabold font-serif text-white leading-none">{s.val}{s.suf}</div>
                  <div className="text-[9px] sm:text-[10px] text-white/80 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {(expanded?.context || expanded?.solution) && (
          <div className="flex flex-wrap gap-8 p-6 border-b border-white/10 bg-white/5">
            {expanded?.context && (
              <div className="flex-1 min-w-[200px]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light mb-1.5">El desafío</p>
                <p className="text-sm text-white/90 leading-relaxed">{expanded.context}</p>
              </div>
            )}
            {expanded?.solution && (
              <div className="flex-1 min-w-[200px]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light mb-1.5">La metodología</p>
                <p className="text-sm text-white/90 leading-relaxed">{expanded.solution}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-1 p-1.5 bg-white/5 border-b border-white/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${tab === t.id ? 'bg-white/10 text-white border-b-2 border-primary-light' : 'text-white/70 hover:text-white/90'}`}
            >
              <span>{t.label}</span>
              <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <div className="p-6 bg-[#0f2035]">
          {tab === 'satisfaccion' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/80 mb-0.5">Nivel 1 · Reacción post-capacitación</p>
              <p className="text-sm font-bold text-white mb-1.5">Satisfacción por programa — escala 1 a 5</p>
              <p className="text-xs text-white/90 mb-4">40.000+ evaluaciones consolidadas en 4 grupos</p>
              <SatisfactionChart started={visible} />
            </>
          )}
          {tab === 'aprendizaje' && (
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/95 mb-0.5">Nivel 2 · Evaluaciones de conocimiento</p>
              <p className="text-sm font-bold text-white mb-1.5">Tasas de aprobación por grupo de capacitación</p>
              <p className="text-xs text-white/95 mb-4">Análisis con estadística descriptiva, inferencial y correlacional</p>
              <ApprovalChart started={visible} />
            </>
          )}
          {tab === 'transferencia' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/80 mb-0.5">Nivel 3 · Aplicación en el trabajo</p>
              <p className="text-sm font-bold text-white mb-1.5">Percepción de transferencia: quienes imparten vs. quienes participan</p>
              <p className="text-xs text-white/90 mb-4">Análisis comparativo con validación estadística</p>
              <TransferChart started={visible} />
            </>
          )}
          {tab === 'roadmap' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/80 mb-0.5">Entregable final del proyecto</p>
              <p className="text-sm font-bold text-white mb-4">Recomendaciones priorizadas por nivel del modelo</p>
              <RoadmapCap started={visible} />
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-t border-white/10 bg-primary/20 border border-primary/30 rounded-b-2xl">
          <p className="text-sm text-white/90 m-0">¿Necesitas medir el impacto de tu inversión en capacitación?</p>
          <a href="#contacto" onClick={handleCTAClick} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            Conversemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </m.div>
    </div>
  )
}
