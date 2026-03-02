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

function PillarMap({ started }) {
  const pillars = [
    { label: 'Rentabilidad\nSostenible', color: NAVY, objectives: 3, activities: 9, size: 32 },
    { label: 'Clientes &\nMercado', color: P, objectives: 3, activities: 8, size: 28 },
    { label: 'Excelencia\nOperacional', color: PL, objectives: 2, activities: 7, size: 23 },
    { label: 'Personas &\nCapacidades', color: WARN, objectives: 2, activities: 6, size: 17 },
  ]
  return (
    <div className="flex gap-2 h-[170px]">
      {pillars.map((p, i) => (
        <div
          key={i}
          className="flex flex-col justify-between rounded-xl p-3.5 text-white transition-all duration-500"
          style={{
            flex: p.size,
            background: p.color,
            opacity: started ? 1 : 0,
            transform: started ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: `${i * 100}ms`,
          }}
        >
          <div className="text-[11px] font-bold leading-tight whitespace-pre-line">{p.label}</div>
          <div>
            <div className="text-xl font-extrabold leading-none">{p.objectives}</div>
            <div className="text-[9px] opacity-75 mt-0.5">objetivos</div>
            <div className="mt-1.5 text-[10px] opacity-85">{p.activities} actividades</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BehaviorMap({ started }) {
  const items = {
    habAlto: ['Foco en metas y resultados medibles', 'Liderazgo que delega con claridad', 'Disposición a cambiar procesos'],
    habBajo: ['Trabajo colaborativo entre áreas', 'Agilidad para priorizar tareas'],
    bloAlto: ['Resistencia a nuevas formas de trabajo', 'Baja cultura de accountability', 'Reuniones sin acuerdos claros'],
    bloBajo: ['Tendencia a resolver antes que prevenir', 'Comunicación reactiva'],
  }
  const Cell = ({ items: its, color, bg, delay }) => (
    <div
      className="rounded-lg p-3 transition-opacity duration-500"
      style={{ background: bg, opacity: started ? 1 : 0, transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col gap-1.5">
        {its.map((it, i) => (
          <div key={i} className="flex items-start gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: color }} />
            <span className="text-xs text-gray-700 leading-snug">{it}</span>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div>
      <div className="grid gap-2" style={{ gridTemplateColumns: 'auto 1fr 1fr', alignItems: 'center' }}>
        <div />
        <div className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-400">Alto impacto</div>
        <div className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-400">Bajo impacto</div>
        <div className="text-[10px] font-bold uppercase text-emerald-500" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Habilitadores</div>
        <Cell items={items.habAlto} color={SUCCESS} bg="#f0fdf4" delay={100} />
        <Cell items={items.habBajo} color={SUCCESS} bg="#f0fdf4" delay={200} />
        <div className="text-[10px] font-bold uppercase text-red-500" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Bloqueadores</div>
        <Cell items={items.bloAlto} color={DANGER} bg="#fef2f2" delay={300} />
        <Cell items={items.bloBajo} color={WARN} bg="#fffbeb" delay={400} />
      </div>
      <p className="text-[11px] text-gray-400 mt-2.5">Resultado de dinámica grupal con equipo directivo — comportamientos que aceleran o frenan la ejecución estratégica.</p>
    </div>
  )
}

function ActivitiesChart({ started }) {
  const total = 30
  const levels = [
    { label: 'Estratégicas (Equipo Directivo)', count: 11, color: NAVY, desc: 'Decisiones que definen el rumbo' },
    { label: 'Tácticas (Unidades de Negocio)', count: 15, color: P, desc: 'Ejecución y mejora continua por área' },
    { label: 'Proyectos Transversales', count: 4, color: PL, desc: 'Coordinación entre múltiples áreas' },
  ]
  const units = [
    { name: 'Comercial', n: 10 },
    { name: 'Operaciones', n: 7 },
    { name: 'Finanzas', n: 5 },
    { name: 'Personas', n: 4 },
    { name: 'Otras áreas', n: 4 },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-xs font-bold text-navy mb-3.5">Por nivel de decisión</p>
        {levels.map((l, i) => (
          <div key={i} className="mb-3.5">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-700 font-semibold">{l.label}</span>
              <span className="text-lg font-extrabold" style={{ color: l.color }}>{l.count}</span>
            </div>
            <AnimBar value={l.count} max={total} color={l.color} started={started} delay={i * 150} height={7} />
            <p className="text-[11px] text-gray-400 mt-0.5">{l.desc}</p>
          </div>
        ))}
        <div className="mt-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2.5">
          <span className="text-2xl font-extrabold text-navy">{total}</span>
          <span className="text-xs text-gray-500">actividades claves<br />100% con KPI asignado</span>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-navy mb-3.5">Por área responsable</p>
        {units.map((u, i) => (
          <div key={i} className="mb-2.5">
            <div className="flex justify-between mb-0.5">
              <span className="text-xs text-gray-700">{u.name}</span>
              <span className="text-xs font-bold text-primary">{u.n}</span>
            </div>
            <AnimBar value={u.n} max={15} color={i < 2 ? P : PL} started={started} delay={200 + i * 80} height={5} />
          </div>
        ))}
      </div>
    </div>
  )
}

function KPISystem({ started }) {
  const cycles = [
    { freq: 'Semanal', icon: '⚡', label: 'Revisión operativa de equipos', color: DANGER, count: 6 },
    { freq: 'Quincenal', icon: '📊', label: 'Seguimiento táctico por unidad', color: WARN, count: 9 },
    { freq: 'Mensual', icon: '📈', label: 'Revisión ejecutiva de avance', color: P, count: 12 },
    { freq: 'Trimestral', icon: '🎯', label: 'Evaluación estratégica del período', color: NAVY, count: 3 },
  ]
  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {cycles.map((c, i) => (
          <div
            key={i}
            className="p-3.5 rounded-lg border transition-all duration-400"
            style={{
              borderColor: `${c.color}33`,
              background: `${c.color}08`,
              opacity: started ? 1 : 0,
              transform: started ? 'none' : 'translateY(10px)',
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <div className="flex justify-between mb-1.5">
              <span className="text-lg">{c.icon}</span>
              <span className="text-xl font-extrabold" style={{ color: c.color }}>{c.count}</span>
            </div>
            <div className="text-sm font-bold text-navy">{c.freq}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Objetivos estratégicos', val: '10' },
          { label: 'KPIs definidos', val: '30+' },
          { label: 'Responsables asignados', val: '100%' },
        ].map((s, i) => (
          <div key={i} className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xl font-extrabold text-navy">{s.val}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CasoAlineamientoPanel({ expanded }) {
  const [tab, setTab] = useState('diagnostico')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const n1 = useCount(2, visible)
  const n2 = useCount(30, visible)
  const n3 = useCount(10, visible)
  const n4 = useCount(4, visible)

  const tabs = [
    { id: 'diagnostico', label: 'Diagnóstico Cultural' },
    { id: 'pillars', label: 'Pilares y Objetivos' },
    { id: 'actividades', label: 'Plan de Actividades' },
    { id: 'seguimiento', label: 'Sistema de KPIs' },
  ]

  const handleCTAClick = (e) => {
    e.preventDefault()
    analytics.ctaClick('Conversemos', 'caso_alineamiento_cta')
    scrollToSection('#contacto')
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden bg-white border border-gray-100/80 shadow-card">
        <div className="bg-navy rounded-t-2xl p-6 md:p-7 text-white">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex gap-1.5 mb-2.5">
                <span className="bg-primary rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Alineamiento Estratégico</span>
                <span className="border border-white/20 rounded-md px-2.5 py-1 text-[10px] text-white/55">2024</span>
              </div>
              <h3 className="font-serif text-lg md:text-xl font-normal leading-tight mb-1.5">
                {expanded?.title || 'Del plan estratégico a la ejecución: un equipo, una hoja de ruta'}
              </h3>
              <p className="text-white/50 text-xs">{expanded?.industryLabel || 'Empresa de servicios · Chile · 2024'}</p>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { val: n1, suf: ' días', label: 'duración del taller' },
                { val: n2, suf: '', label: 'actividades claves definidas' },
                { val: n3, suf: '', label: 'objetivos estratégicos' },
                { val: n4, suf: '', label: 'pilares estratégicos' },
              ].map((s, i) => (
                <div key={i} className="text-center bg-white/5 rounded-lg py-2.5 px-3">
                  <div className="text-xl font-extrabold font-serif text-white leading-none">{s.val}{s.suf}</div>
                  <div className="text-[9px] text-white/45 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-1 p-1.5 bg-gray-50 border-b border-gray-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-semibold transition-colors ${tab === t.id ? 'bg-navy text-white' : 'text-gray-500'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5 md:p-6">
          {tab === 'diagnostico' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Jornada 1 — Dinámica de liderazgo</p>
              <p className="text-sm font-bold text-navy mb-4">Mapa de comportamientos habilitadores y bloqueadores</p>
              <BehaviorMap started={visible} />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Palancas a potenciar</p>
                  <p className="text-xs text-gray-700 leading-relaxed">El equipo identificó el foco en metas y el liderazgo con claridad como los principales aceleradores de la ejecución estratégica.</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Obstáculos a gestionar</p>
                  <p className="text-xs text-gray-700 leading-relaxed">La resistencia a nuevas formas de trabajo y la baja cultura de accountability concentraron la mayor parte de las menciones como frenos a la velocidad de ejecución.</p>
                </div>
              </div>
            </>
          )}

          {tab === 'pillars' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Jornada 2 — Consolidación plenaria</p>
              <p className="text-sm font-bold text-navy mb-4">4 pilares · 10 objetivos estratégicos</p>
              <PillarMap started={visible} />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {[
                  { pilar: 'Rentabilidad Sostenible', color: NAVY, objetivos: ['Crecimiento de ingresos y márgenes', 'Nuevas líneas de negocio', 'Eficiencia de costos operacionales'] },
                  { pilar: 'Clientes & Mercado', color: P, objetivos: ['Posicionamiento y diferenciación de marca', 'Fidelización y experiencia del cliente', 'Expansión de cartera'] },
                  { pilar: 'Excelencia Operacional', color: PL, objetivos: ['Estandarización de procesos clave', 'Mejora continua y gestión de calidad'] },
                  { pilar: 'Personas & Capacidades', color: WARN, objetivos: ['Desarrollo del talento interno', 'Cultura de desempeño y accountability'] },
                ].map((p, i) => (
                  <div key={i} className="p-3 rounded-lg border transition-opacity duration-400" style={{ borderColor: `${p.color}33`, background: `${p.color}06`, opacity: visible ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                      <span className="text-xs font-bold text-navy">{p.pilar}</span>
                    </div>
                    {p.objetivos.map((o, j) => (
                      <div key={j} className="flex gap-1 mb-1">
                        <span className="text-[10px] font-bold flex-shrink-0" style={{ color: p.color }}>{j + 1}.</span>
                        <span className="text-[11px] text-gray-700">{o}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'actividades' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">De ideas brutas a plan ejecutable</p>
              <p className="text-sm font-bold text-navy mb-4">30 actividades claves priorizadas y asignadas</p>
              <div className="flex flex-wrap items-center gap-4 mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {[
                  { n: '75+', label: 'Post-its generados', c: '#9ca3af' },
                  { n: '→', label: '', c: '#d1d5db' },
                  { n: '30', label: 'Tras priorización', c: WARN },
                  { n: '→', label: '', c: '#d1d5db' },
                  { n: '100%', label: 'Con KPI asignado', c: P },
                ].map((x, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl md:text-2xl font-extrabold" style={{ color: x.c }}>{x.n}</div>
                    {x.label && <div className="text-[10px] text-gray-500">{x.label}</div>}
                  </div>
                ))}
                <div className="flex-1 min-w-[120px] text-xs text-gray-500 leading-snug">Cada actividad con meta, responsable y frecuencia de revisión.</div>
              </div>
              <ActivitiesChart started={visible} />
            </>
          )}

          {tab === 'seguimiento' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">El resultado diferencial</p>
              <p className="text-sm font-bold text-navy mb-4">Sistema de seguimiento estructurado en cuatro ciclos</p>
              <KPISystem started={visible} />
              <div className="mt-4 p-3.5 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-[10px] font-bold text-primary uppercase mb-1.5">El impacto</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  El equipo directivo cerró el taller con un RoadMap completamente operacionalizado. Las actividades emergieron del propio equipo, elevando el nivel de compromiso y apropiación. Por primera vez, todos los líderes salieron con la misma hoja de ruta, con trazabilidad directa desde cada KPI hasta los pilares estratégicos.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-sm text-gray-500 m-0">¿Necesitas un taller de alineamiento estratégico para tu equipo?</p>
          <a href="#contacto" onClick={handleCTAClick} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            Conversemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </m.div>
    </div>
  )
}
