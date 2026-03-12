/**
 * Panel del caso Rotación. Contenido y mensajes de interfaz en español.
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'
import { analytics } from '../utils/analytics'
import { IconCheck, IconChart, IconTrendUp, IconTrophy, IconScale } from './CaseStudyIcons'
import { IllustrationResults } from './CaseStudyIcons'

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
    const n = parseFloat(String(target).replace(/[^0-9.-]/g, ''))
    if (Number.isNaN(n)) { setV(target); return }
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
    <div className="rounded-full overflow-hidden bg-white/10" style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-[1100ms]"
        style={{
          background: color,
          width: started ? `${Math.min(100, (value / max) * 100)}%` : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

// ——— TAB 1: DIAGNÓSTICO ———
function TabDiagnostico({ started }) {
  const factores = [
    { label: 'Antigüedad < 2 años', pct: 78, color: DANGER, ref: 'Mayor probabilidad de salida' },
    { label: 'Turno nocturno', pct: 65, color: WARN, ref: 'Fatiga y ofertas externas' },
    { label: 'Área con alta demanda externa', pct: 58, color: WARN, ref: 'Minería, construcción' },
    { label: 'Sin movilidad interna en 18 meses', pct: 52, color: P, ref: 'Estancamiento percibido' },
    { label: 'Carga de equipos > 12 personas', pct: 44, color: P, ref: 'Sobrecarga operativa' },
  ]
  const segmentos = [
    { label: 'Supervisores turno A (mañana)', pct: 28, rotacion: 22, color: DANGER },
    { label: 'Supervisores turno B (tarde)', pct: 25, rotacion: 19, color: WARN },
    { label: 'Supervisores turno C (noche)', pct: 22, rotacion: 31, color: DANGER },
    { label: 'Supervisores área mantenimiento', pct: 15, rotacion: 18, color: P },
    { label: 'Otros segmentos', pct: 10, rotacion: 12, color: PL },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-xs font-bold text-white mb-1">Factores de riesgo asociados a la rotación</p>
        <p className="text-[11px] text-white/70 mb-3">Análisis sobre datos históricos de salidas y características del cargo</p>
        {factores.map((v, i) => (
          <div key={i} className="mb-3.5" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 80}ms` }}>
            <div className="flex justify-between mb-1">
              <span className="text-[11px] text-white/80 font-medium">{v.label}</span>
              <span className="text-[13px] font-extrabold" style={{ color: v.color }}>{v.pct}%</span>
            </div>
            <AnimBar value={v.pct} max={100} color={v.color} started={started} delay={i * 80} height={7} />
            <p className="text-[10px] text-white/85 mt-0.5">{v.ref}</p>
          </div>
        ))}
        <div className="mt-3 p-3 bg-red-900/20 rounded-lg border border-red-400/30 text-[11px] text-white/90 leading-relaxed">
          <strong>Problema central:</strong> La alta rotación en supervisores de turno generaba sobrecarga en los equipos restantes, pérdida de conocimiento operacional y costos elevados de reemplazo y onboarding en operaciones 24/7.
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-white mb-1">Distribución de la dotación y rotación por segmento</p>
        <p className="text-[11px] text-white/70 mb-3">% de dotación y tasa de rotación anual por segmento (línea base)</p>
        {segmentos.map((s, i) => (
          <div key={i} className="mb-2.5" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 60 + 200}ms` }}>
            <div className="grid grid-cols-[1fr_80px_50px] gap-2 items-center">
              <span className="text-[10px] font-semibold text-white/80 truncate">{s.label}</span>
              <AnimBar value={s.pct} max={35} color={s.color} started={started} delay={i * 60 + 200} height={6} />
              <div className="text-right">
                <div className="text-[10px] font-bold" style={{ color: s.color }}>{s.rotacion}%</div>
                <div className="text-[9px] text-white/60">rotación</div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-2.5 p-3 bg-primary/20 rounded-lg border border-primary/30 text-[11px] text-white/90 leading-relaxed">
          <strong className="text-primary-light">Hallazgo clave:</strong> Se identificaron 4 segmentos de riesgo prioritarios (turno A, B, C y mantenimiento) donde concentrar el plan de retención diferenciado.
        </div>
      </div>
    </div>
  )
}

// ——— TAB 2: MODELO PREDICTIVO ———
function TabModeloPredictivo({ started }) {
  const variables = [
    { label: 'Antigüedad en el cargo', peso: 28, color: P },
    { label: 'Turno asignado', peso: 22, color: PL },
    { label: 'Historial de evaluaciones', peso: 20, color: WARN },
    { label: 'Movilidad interna (últimos 24 meses)', peso: 18, color: SUCCESS },
    { label: 'Tamaño del equipo a cargo', peso: 12, color: P },
  ]
  const metricasModelo = [
    { label: 'Precisión del modelo (validación)', val: 89, color: SUCCESS },
    { label: 'Recall en riesgo alto', val: 85, color: P },
    { label: 'Anticipación promedio (semanas)', val: 6, color: PL },
  ]
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-white mb-2">Importancia de las variables en el modelo predictivo</p>
        <p className="text-[11px] text-white/70 mb-3">Peso relativo de cada factor en la predicción de riesgo de rotación</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {variables.map((v, i) => (
            <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 80}ms` }}>
              <div className="flex justify-between mb-1.5">
                <span className="text-[11px] font-medium text-white/80">{v.label}</span>
                <span className="text-sm font-bold" style={{ color: v.color }}>{v.peso}%</span>
              </div>
              <AnimBar value={v.peso} max={30} color={v.color} started={started} delay={i * 80} height={8} />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {metricasModelo.map((m, i) => (
          <div key={i} className="p-4 rounded-xl text-center" style={{ background: `${m.color}08`, border: `1px solid ${m.color}33`, opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 100 + 300}ms` }}>
            <div className="text-2xl font-extrabold" style={{ color: m.color }}>{m.val}{m.val > 10 ? '%' : ' sem'}</div>
            <div className="text-[10px] text-white/60 mt-1">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-amber-900/20 rounded-lg border border-amber-400/30 text-[11px] text-white/80 leading-relaxed">
        <strong className="text-amber-400">Metodología:</strong> Modelo de clasificación entrenado con datos históricos de salidas y características del cargo. Las predicciones se actualizan mensualmente y permiten anticipar con varias semanas de margen a los supervisores con mayor probabilidad de salida por turno y área.
      </div>
    </div>
  )
}

// ——— TAB 3: ANÁLISIS DE IMPACTO ———
function TabAnalisisImpacto({ started }) {
  const impactos = [
    { label: 'Reducción de rotación en 12 meses', valor: 18, color: SUCCESS, tipo: 'reduccion' },
    { label: 'Ahorro vs. costo de reemplazo', valor: 23, color: P, tipo: 'porcentaje' },
    { label: 'Cobertura del plan en dotación crítica', valor: 94, color: PL, tipo: 'porcentaje' },
    { label: 'Segmentos con acciones diferenciadas', valor: 4, color: WARN, tipo: 'numero' },
  ]
  const hallazgos = [
    { titulo: 'Anticipación operativa', desc: 'El modelo permitió actuar con semanas de margen sobre los supervisores en riesgo, sin esperar la renuncia.', Icon: IconTrendUp, color: SUCCESS },
    { titulo: 'Acciones por segmento', desc: 'Plan de retención diferenciado por turno y área redujo la rotación donde era más crítica.', Icon: IconChart, color: P },
    { titulo: 'Continuidad operacional', desc: 'Menor dependencia de reemplazos externos y sobretiempos en los frentes más sensibles.', Icon: IconCheck, color: PL },
  ]
  return (
    <div className="space-y-6">
      <p className="text-xs font-bold text-white mb-2">Resultados medibles a 12 meses de implementación</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {impactos.map((imp, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 80}ms` }}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[11px] text-white/80 font-medium">{imp.label}</span>
              <span className="text-xl font-extrabold" style={{ color: imp.color }}>
                {imp.tipo === 'reduccion' ? `-${imp.valor}%` : imp.tipo === 'porcentaje' ? `${imp.valor}%` : imp.valor}
              </span>
            </div>
            <AnimBar
              value={imp.tipo === 'numero' ? Math.min(imp.valor * 25, 100) : imp.valor}
              max={imp.tipo === 'numero' ? 100 : 100}
              color={imp.color}
              started={started}
              delay={i * 80}
              height={8}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-4">
        {hallazgos.map((h, i) => {
          const HIcon = h.Icon
          return (
            <div key={i} className="p-3 rounded-lg" style={{ background: `${h.color}08`, border: `1px solid ${h.color}33`, opacity: started ? 1 : 0, transition: `opacity 0.5s ease ${i * 100 + 200}ms` }}>
              <div className="flex justify-center mb-1"><HIcon className="w-5 h-5" color={h.color} /></div>
              <p className="text-[11px] font-bold mb-0.5" style={{ color: h.color }}>{h.titulo}</p>
              <p className="text-[10px] text-white/60 m-0 leading-snug">{h.desc}</p>
            </div>
          )
        })}
      </div>
      <div className="p-3 bg-primary/20 rounded-lg border border-primary/30 text-[11px] text-white/90 leading-relaxed">
        <strong className="text-primary-light">Impacto en el negocio:</strong> Se logró mantener continuidad operacional con menor dependencia de reemplazos externos y sobretiempos. El plan de acciones diferenciadas estabilizó la dotación en los frentes más sensibles.
      </div>
    </div>
  )
}

// ——— TAB 4: LOGROS ———
function TabLogros({ started }) {
  const logros = [
    { n: '01', Icon: IconTrendUp, color: P, titulo: 'Modelo predictivo en producción', desc: 'Sistema de riesgo de rotación actualizado mensualmente por turno y área, con precisión del 89%.' },
    { n: '02', Icon: IconScale, color: PL, titulo: 'Plan de retención diferenciado', desc: 'Acciones por segmento de riesgo (4 segmentos priorizados) en lugar de un plan único para toda la dotación.' },
    { n: '03', Icon: IconCheck, color: SUCCESS, titulo: 'Reducción de rotación y costos', desc: '-18% de rotación en 12 meses y 23% de ahorro versus costo de reemplazo en el segmento crítico.' },
    { n: '04', Icon: IconTrophy, color: WARN, titulo: 'Continuidad operacional', desc: 'Menor dependencia de reemplazos externos y sobretiempos en operaciones 24/7.' },
  ]
  const metricas = [
    { label: 'Rotación en 12 meses', val: '-18%', color: SUCCESS },
    { label: 'Ahorro vs. costo reemplazo', val: '23%', color: P },
    { label: 'Segmentos de riesgo identificados', val: '4', color: WARN },
    { label: 'Precisión del modelo', val: '89%', color: PL },
  ]
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {logros.map((l, i) => {
          const LogroIcon = l.Icon
          return (
            <div key={i} className="p-4 rounded-xl" style={{ background: `${l.color}08`, border: `1px solid ${l.color}33`, opacity: started ? 1 : 0, transform: started ? 'none' : 'translateY(10px)', transition: `all 0.45s ease ${i * 100}ms` }}>
              <div className="flex gap-2 items-center mb-2">
                <LogroIcon className="w-5 h-5 flex-shrink-0" color={l.color} />
                <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: l.color }}>{l.n}. {l.titulo}</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed m-0">{l.desc}</p>
            </div>
          )
        })}
      </div>
      <p className="text-xs font-bold text-white mb-2">Métricas clave del proyecto</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {metricas.map((m, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 70 + 400}ms` }}>
            <span className="text-[11px] text-white/70">{m.label}</span>
            <span className="text-sm font-extrabold" style={{ color: m.color }}>{m.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CasoRotacionPanel({ expanded }) {
  const [tab, setTab] = useState('diagnostico')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const n1 = useCount(18, visible)
  const n2 = useCount(23, visible)
  const n3 = useCount(4, visible)
  const n4 = useCount(89, visible)

  const tabs = [
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'modelo', label: 'Modelo Predictivo' },
    { id: 'impacto', label: 'Análisis de Impacto' },
    { id: 'logros', label: 'Logros' },
  ]

  const navigate = useNavigate()
  const handleCTAClick = (e) => {
    e.preventDefault()
    analytics.ctaClick?.('Conversemos', 'caso_rotacion_cta')
    if (!scrollToSection('#contacto')) navigate({ pathname: '/', hash: 'contacto' })
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden bg-[#0f2035] border border-white/10 shadow-card">
        <div className="bg-navy rounded-t-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1 opacity-90">
                <IllustrationResults className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-primary">{expanded?.service || 'Retención de Talento'}</span>
                  <span className="border border-white/20 rounded-md px-3 py-1.5 text-[11px] text-white/60">2024</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-normal leading-tight mb-2">
                  {expanded?.title || 'Reducción de rotación en personal clave de operaciones'}
                </h3>
                <p className="text-white/55 text-sm mb-4">{expanded?.industryLabel || 'Empresa industrial con operaciones continuas · Chile'}</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-nowrap w-full">
              {[
                { val: `-${n1}`, suf: '%', label: 'Rotación en 12 meses' },
                { val: n2, suf: '%', label: 'Ahorro vs costo de reemplazo' },
                { val: n3, suf: '', label: 'Segmentos de riesgo' },
                { val: n4, suf: '%', label: 'Precisión del modelo' },
              ].map((s, i) => (
                <div key={i} className="flex-1 min-w-[4.5rem] text-center bg-white/5 rounded-lg py-2 px-2 sm:p-3">
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
          {tab === 'diagnostico' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 1 — Levantamiento y análisis</p>
              <p className="text-sm font-bold text-white mb-4">Diagnóstico de rotación en supervisores de turno</p>
              <p className="text-xs text-white/70 mb-4">Análisis de factores de riesgo y distribución por segmento operativo</p>
              <TabDiagnostico started={visible} />
            </>
          )}
          {tab === 'modelo' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 2 — Construcción del modelo</p>
              <p className="text-sm font-bold text-white mb-4">Modelo predictivo de riesgo de rotación</p>
              <TabModeloPredictivo started={visible} />
            </>
          )}
          {tab === 'impacto' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 3 — Resultados a 12 meses</p>
              <p className="text-sm font-bold text-white mb-4">Análisis de impacto en rotación y costos</p>
              <TabAnalisisImpacto started={visible} />
            </>
          )}
          {tab === 'logros' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 4 — Entregables y valor generado</p>
              <p className="text-sm font-bold text-white mb-4">Logros del proyecto y métricas clave</p>
              <TabLogros started={visible} />
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-t border-white/10 bg-primary/20 border border-primary/30 rounded-b-2xl">
          <p className="text-sm text-white/90 m-0">¿Tienes alta rotación en personal clave?</p>
          <a href="#contacto" onClick={handleCTAClick} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            Conversemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </m.div>
    </div>
  )
}
