import { useState, useEffect, useRef } from 'react'
import { m } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'
import { analytics } from '../utils/analytics'

const P = '#216a69'
const NAVY = '#0a1628'
const PL = '#2d8a88'
const WARN = '#f59e0b'
const DANGER = '#ef4444'

function useCount(target, started, duration = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!started) return
    const n = parseFloat(target)
    if (Number.isNaN(n)) { setV(target); return }
    let t0 = null
    const tick = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setV(Math.floor(e * n))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target])
  return v
}

function HBar({ label, value, max = 8, color = P, started, delay = 0 }) {
  const pct = (value / max) * 100
  return (
    <div className="mb-2.5">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600 font-medium">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{value}/{max} líderes</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            background: color,
            width: started ? `${pct}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

function RadarChart({ data, started }) {
  const cx = 120
  const cy = 120
  const r = 85
  const n = data.length
  const angles = data.map((_, i) => (i * 2 * Math.PI) / n - Math.PI / 2)
  const toXY = (angle, radius) => [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
  const rings = [0.25, 0.5, 0.75, 1]
  const actPoints = data.map((d, i) => toXY(angles[i], (d.actual / 5) * r))
  const futPoints = data.map((d, i) => toXY(angles[i], (d.future / 5) * r))
  const poly = (pts) => pts.map((p) => p.join(',')).join(' ')

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[240px]">
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={angles.map((a) => toXY(a, ring * r).join(',')).join(' ')}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="0.8"
        />
      ))}
      {angles.map((a, i) => {
        const [x, y] = toXY(a, r)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="0.8" />
      })}
      <polygon
        points={poly(futPoints)}
        fill={`${P}22`}
        stroke={P}
        strokeWidth="1.5"
        style={{ opacity: started ? 1 : 0, transition: 'opacity 0.8s ease 0.4s' }}
      />
      <polygon
        points={poly(actPoints)}
        fill={`${WARN}33`}
        stroke={WARN}
        strokeWidth="1.5"
        style={{ opacity: started ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}
      />
      {data.map((d, i) => {
        const [x, y] = toXY(angles[i], r + 16)
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fill="#374151" fontWeight="500">
            {d.label}
          </text>
        )
      })}
      <circle cx={cx} cy={cy} r="3" fill={NAVY} />
    </svg>
  )
}

function RiskMatrix({ clusters, started }) {
  return (
    <div className="relative w-full pb-[100%] border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
      <div className="absolute inset-0 p-3">
        <div className="absolute left-1/2 top-0 right-0 bottom-1/2 bg-red-50/60" />
        <div className="absolute left-0 top-1/2 right-1/2 bottom-0 bg-green-50/60" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-gray-400 whitespace-nowrap">Capacidad Actual →</div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] text-gray-400 whitespace-nowrap">Riesgo Operacional →</div>
        {clusters.map((c, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center transition-opacity duration-400"
            style={{
              left: `${c.x}%`,
              top: `${100 - c.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: started ? 1 : 0,
              transitionDelay: `${i * 60}ms`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm"
              style={{
                background: c.x < 50 && c.y > 50 ? DANGER : c.x > 50 && c.y < 50 ? '#10b981' : WARN,
              }}
            />
            <span
              className="text-[7px] font-semibold text-navy whitespace-nowrap mt-0.5"
              style={{ opacity: started ? 1 : 0, transitionDelay: `${i * 60 + 200}ms` }}
            >
              {c.name}
            </span>
          </div>
        ))}
        <div className="absolute right-1.5 top-1.5 text-[8px] font-bold text-red-500">CRÍTICO</div>
        <div className="absolute left-1.5 bottom-1.5 text-[8px] font-bold text-emerald-500">ESTABLE</div>
      </div>
    </div>
  )
}

function Donut({ segments, size = 90, started }) {
  const total = segments.reduce((a, s) => a + s.value, 0)
  let cumulative = 0
  const r = 32
  const cx = 45
  const cy = 45
  const circ = 2 * Math.PI * r

  return (
    <svg width={size} height={size} viewBox="0 0 90 90">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
      {segments.map((seg, i) => {
        const pct = seg.value / total
        const offset = circ * (1 - pct)
        const rotation = (cumulative / total) * 360 - 90
        cumulative += seg.value
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="12"
            strokeDasharray={circ}
            strokeDashoffset={started ? offset : circ}
            strokeLinecap="butt"
            transform={`rotate(${rotation} ${cx} ${cy})`}
            style={{ transition: `stroke-dashoffset 1s ease ${i * 200}ms` }}
          />
        )
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="800" fill={NAVY}>
        {segments[0]?.value}
      </text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="7" fill="#6b7280">
        clusters
      </text>
    </svg>
  )
}

export default function CasoSPPPanel({ expanded }) {
  const [tab, setTab] = useState('foda')
  const [fodaSide, setFodaSide] = useState('negocio')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const c1 = useCount(12, visible)
  const c2 = useCount(20, visible)
  const c3 = useCount(24, visible)
  const c4 = useCount(75, visible)

  const fodaNegocio = {
    fortalezas: [
      { label: 'Posición financiera sólida y estable', v: 6 },
      { label: 'Equipo con profundo conocimiento del negocio', v: 5 },
      { label: 'Cartera de servicios valorada por clientes', v: 4 },
      { label: 'Capacidad de inversión en mejoras', v: 3 },
    ],
    debilidades: [
      { label: 'Foco estratégico poco claro para los equipos', v: 7, color: DANGER },
      { label: 'Toma de decisiones lenta y centralizada', v: 6, color: DANGER },
      { label: 'Gestión basada en intuición, no en datos', v: 5, color: WARN },
      { label: 'Procesos internos sin estandarización', v: 5, color: WARN },
    ],
    oportunidades: [
      { label: 'Simplificar y externalizar procesos de soporte', v: 7 },
      { label: 'Digitalización y automatización de procesos clave', v: 6 },
      { label: 'Rediseño de estructura para mayor agilidad', v: 4 },
      { label: 'Mejora continua y eficiencia operacional', v: 3 },
    ],
    amenazas: [
      { label: 'Competencia con mayor velocidad de respuesta', v: 5 },
      { label: 'Presión creciente sobre márgenes operacionales', v: 5 },
      { label: 'Entorno económico y regulatorio incierto', v: 4 },
      { label: 'Cambios en preferencias y demanda del mercado', v: 3 },
    ],
  }

  const fodaPersonas = {
    fortalezas: [
      { label: 'Equipos comprometidos y con experiencia', v: 6 },
      { label: 'Cultura de buen trato y trabajo en equipo', v: 5 },
      { label: 'Relaciones interpersonales sólidas', v: 3 },
      { label: 'Valoración positiva del ambiente laboral', v: 2 },
    ],
    debilidades: [
      { label: 'Ausencia de programa formal de desarrollo', v: 6, color: DANGER },
      { label: 'Liderazgo con baja preparación para el cambio', v: 5, color: DANGER },
      { label: 'Roles y responsabilidades poco definidos', v: 4, color: WARN },
      { label: 'Trabajo en silos entre áreas', v: 2, color: WARN },
    ],
    oportunidades: [
      { label: 'Rediseño de estructuras y tramos de control', v: 6 },
      { label: 'Incorporar analítica de personas (People Analytics)', v: 6 },
      { label: 'Mallas de desarrollo por rol y competencia', v: 5 },
      { label: 'Planificación de sucesión en posiciones clave', v: 1 },
    ],
    amenazas: [
      { label: 'Riesgo de pérdida de talento clave', v: 2 },
      { label: 'Mercado laboral competitivo y escaso', v: 2 },
      { label: 'Propuesta de valor al empleado poco diferenciada', v: 2 },
    ],
  }

  const radarData = [
    { label: 'Liderazgo', actual: 3.2, future: 4.5 },
    { label: 'Analytics', actual: 2.1, future: 4.8 },
    { label: 'Técnico', actual: 3.8, future: 4.2 },
    { label: 'Gest. Cambio', actual: 2.4, future: 4.0 },
    { label: 'Planificación', actual: 2.8, future: 4.3 },
    { label: 'Colaboración', actual: 2.6, future: 3.9 },
  ]

  const clusters = [
    { name: 'Liderazgo Senior', x: 35, y: 78 },
    { name: 'Mandos Medios', x: 42, y: 65 },
    { name: 'Equipos de Proyecto', x: 55, y: 60 },
    { name: 'Roles Técnicos', x: 30, y: 55 },
    { name: 'Soporte Digital', x: 60, y: 42 },
    { name: 'Planificación', x: 25, y: 70 },
    { name: 'Operaciones', x: 65, y: 35 },
    { name: 'Personas y Cultura', x: 70, y: 48 },
  ]

  const donutData = [
    { label: 'Requiere evolución del rol', value: 13, color: DANGER },
    { label: 'Estable con brechas menores', value: 7, color: WARN },
    { label: 'Capacidad adecuada', value: 4, color: '#10b981' },
  ]

  const tabs = [
    { id: 'foda', label: 'FODA' },
    { id: 'capacidades', label: 'Capacidades' },
    { id: 'riesgo', label: 'Riesgo Operacional' },
    { id: 'recomendaciones', label: 'Recomendaciones' },
  ]

  const recomendaciones = [
    { letra: '1', titulo: 'Comunicación y gestión del cambio', desc: 'Diseñar un plan comunicacional que reduzca la incertidumbre interna, explicite las decisiones estratégicas y genere confianza en la dirección de la organización.', impacto: 'Alto', urgencia: 'Inmediata' },
    { letra: '2', titulo: 'Taller de alineamiento con liderazgo', desc: 'Facilitar una jornada ejecutiva para consolidar prioridades, definir actividades claves con responsables y establecer un sistema de seguimiento con KPIs.', impacto: 'Alto', urgencia: 'Inmediata' },
    { letra: '3', titulo: 'Incorporar People Analytics', desc: 'Desarrollar capacidades internas de analítica de personas para que las decisiones sobre estructura, desarrollo y dotación se basen en datos.', impacto: 'Alto', urgencia: 'Corto plazo' },
    { letra: '4', titulo: 'Programa de desarrollo por perfil', desc: 'Diseñar mallas de aprendizaje diferenciadas por rol: liderazgo para mandos medios, habilidades técnicas para equipos especializados y analítica para gestores.', impacto: 'Alto', urgencia: 'Corto plazo' },
    { letra: '5', titulo: 'Rediseño de estructura organizacional', desc: 'Revisar tramos de control, eliminar duplicidades y clarificar responsabilidades para ganar velocidad de respuesta y reducir trabajo en silos.', impacto: 'Medio', urgencia: 'Mediano plazo' },
    { letra: '6', titulo: 'Externalización de procesos de soporte', desc: 'Identificar funciones no estratégicas que pueden externalizarse para liberar capacidad interna y focalizar el talento en actividades de mayor valor.', impacto: 'Medio', urgencia: 'Mediano plazo' },
    { letra: '7', titulo: 'Estandarización de procesos internos', desc: 'Documentar y estandarizar procesos operacionales clave para reducir variabilidad, facilitar la escalabilidad y mejorar la trazabilidad de resultados.', impacto: 'Medio', urgencia: 'Largo plazo' },
  ]

  const urgColors = { Inmediata: DANGER, 'Corto plazo': WARN, 'Mediano plazo': PL, 'Largo plazo': '#94a3b8' }

  const foda = fodaSide === 'negocio' ? fodaNegocio : fodaPersonas

  const handleCTAClick = (e) => {
    e.preventDefault()
    analytics.ctaClick('Conversemos', 'caso_spp_cta')
    scrollToSection('#contacto')
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl overflow-hidden bg-white border border-gray-100/80 shadow-card"
      >
        {/* Header */}
        <div className="bg-navy rounded-t-2xl p-6 md:p-8 text-white">
          <div className="flex flex-wrap justify-between items-start gap-5">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {expanded?.badgeLabels ? (
                  <>
                    <span className="bg-primary rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider">
                      <span className="block leading-tight">{expanded.badgeLabels.primary.es}</span>
                      <span className="block text-[9px] font-normal normal-case opacity-90 mt-0.5">{expanded.badgeLabels.primary.en}</span>
                    </span>
                    <span className="border border-white/20 rounded-md px-3 py-1.5 text-[11px] text-white/60">
                      <span className="block leading-tight">{expanded.badgeLabels.secondary.es}</span>
                      <span className="block text-[9px] font-normal normal-case opacity-75 mt-0.5">{expanded.badgeLabels.secondary.en}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="bg-primary rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider">Workforce Planning</span>
                    <span className="border border-white/20 rounded-md px-3 py-1 text-[11px] text-white/60">People Analytics</span>
                  </>
                )}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal leading-tight mb-2">
                Diagnóstico estratégico de personas para gerencia en transformación
              </h3>
              <p className="text-white/55 text-sm">Empresa con foco en crecimiento organizacional · Chile</p>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-1 min-w-0 justify-end flex-nowrap">
              {[
                { val: c1, suf: '', label: 'líderes participantes' },
                { val: c2, suf: 'h', label: 'horas de levantamiento' },
                { val: c3, suf: '', label: 'perfiles analizados' },
                { val: c4, suf: '%', label: 'coincidencia en brechas clave' },
              ].map((s, i) => (
                <div key={i} className="flex-1 min-w-[4.5rem] text-center bg-white/5 rounded-lg py-2 px-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-extrabold font-serif text-white leading-none">{s.val}{s.suf}</div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Context strip */}
        <div className="flex flex-wrap gap-8 p-6 border-b border-gray-100 bg-gray-50/30">
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">El desafío</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Organización en etapa de cambio con foco estratégico difuso: equipos sin claridad de prioridades, decisiones lentas y sin respaldo de datos, y roles internos poco definidos.
            </p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">La metodología</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Diagnóstico integrado con metodología estructurada: levantamiento cualitativo (entrevistas en profundidad), cuantitativo (cuestionarios estandarizados) y análisis de brechas actuales y futuras por perfil de cargo.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1.5 bg-gray-50 border-b border-gray-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-1 rounded-lg text-xs font-semibold transition-colors ${
                tab === t.id ? 'bg-navy text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {tab === 'foda' && (
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['negocio', 'personas'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFodaSide(s)}
                    className={`flex-1 py-3.5 border-b-2 text-sm font-semibold transition-all ${
                      fodaSide === s
                        ? 'bg-primary/5 text-primary border-primary'
                        : 'border-transparent text-gray-400'
                    }`}
                  >
                    FODA {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {[
                  { key: 'fortalezas', label: 'Fortalezas', color: '#10b981', bg: 'bg-green-50' },
                  { key: 'debilidades', label: 'Debilidades', color: DANGER, bg: 'bg-red-50' },
                  { key: 'oportunidades', label: 'Oportunidades', color: PL, bg: 'bg-primary/5' },
                  { key: 'amenazas', label: 'Amenazas', color: WARN, bg: 'bg-amber-50' },
                ].map((q, qi) => (
                  <div
                    key={q.key}
                    className={`p-5 ${qi % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} ${qi < 2 ? 'border-b border-gray-100' : ''} ${qi % 2 === 0 ? 'sm:border-r border-gray-100' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: q.color }} />
                      <p className="text-[10px] font-bold uppercase tracking-widest m-0" style={{ color: q.color }}>
                        {q.label}
                      </p>
                    </div>
                    {foda[q.key].map((item, i) => (
                      <HBar key={i} label={item.label} value={item.v} color={item.color || q.color} started={visible} delay={i * 80} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-[11px] text-gray-400 m-0">Las barras reflejan el nivel de consenso entre los líderes participantes. Mayor barra = mayor coincidencia en la mención.</p>
              </div>
            </div>
          )}

          {tab === 'capacidades' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 p-6 bg-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Brecha de Capacidades</p>
                <p className="text-sm font-bold text-navy mb-4">Actual vs. Requerida (3 años)</p>
                <div className="flex justify-center">
                  <RadarChart data={radarData} started={visible} />
                </div>
                <div className="flex gap-4 justify-center mt-3">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-5 h-0.5 rounded" style={{ background: WARN }} />
                    <span className="text-[11px] text-gray-500">Capacidad actual</span>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-5 h-0.5 rounded bg-primary" />
                    <span className="text-[11px] text-gray-500">Requerida 2026</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Proyección de Roles (3 años)</p>
                  <div className="flex items-center gap-5">
                    <Donut segments={donutData} started={visible} size={90} />
                    <div className="flex-1">
                      {donutData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                          <span className="text-[11px] text-gray-700 flex-1">{d.label}</span>
                          <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 p-5 bg-white flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Brechas Prioritarias</p>
                  {[
                    { label: 'Analytics y datos', gap: 2.7, color: DANGER },
                    { label: 'Gestión del cambio', gap: 1.6, color: DANGER },
                    { label: 'Planificación estratégica', gap: 1.5, color: WARN },
                    { label: 'Liderazgo de personas', gap: 1.3, color: WARN },
                    { label: 'Colaboración transversal', gap: 1.3, color: WARN },
                  ].map((b, i) => (
                    <div key={i} className="mb-2.5">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-xs text-gray-700">{b.label}</span>
                        <span className="text-[11px] font-bold" style={{ color: b.color }}>Δ {b.gap.toFixed(1)} pts</span>
                      </div>
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            background: b.color,
                            width: visible ? `${(b.gap / 3) * 100}%` : '0%',
                            transitionDelay: `${i * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'riesgo' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 p-6 bg-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Matriz de Riesgo</p>
                <p className="text-sm font-bold text-navy mb-4">Capacidad actual vs. Riesgo operacional</p>
                <RiskMatrix clusters={clusters} started={visible} />
                <div className="flex gap-3 mt-3 flex-wrap">
                  {[{ c: DANGER, l: 'Crítico' }, { c: WARN, l: 'Atención' }, { c: '#10b981', l: 'Estable' }].map((x) => (
                    <div key={x.l} className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 rounded-full" style={{ background: x.c }} />
                      <span className="text-[11px] text-gray-500">{x.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-gray-200 p-5 bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Disponibilidad en Mercado Laboral</p>
                  {[
                    { label: 'Dificultad alta para atraer', pct: 53, color: DANGER },
                    { label: 'Dificultad media', pct: 26, color: WARN },
                    { label: 'Disponible en mercado', pct: 21, color: '#10b981' },
                  ].map((b, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-700">{b.label}</span>
                        <span className="text-xs font-bold" style={{ color: b.color }}>{b.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            background: b.color,
                            width: visible ? `${b.pct}%` : '0%',
                            transitionDelay: `${i * 150}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-2">Alerta Principal</p>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    <strong>54% de los perfiles</strong> requiere evolución del rol en los próximos 3 años. Los perfiles de Liderazgo Senior y Planificación concentran el mayor riesgo: brechas altas + criticidad operacional + mercado laboral competitivo.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">Oportunidad</p>
                  <p className="text-sm text-gray-700 leading-relaxed m-0">
                    Los perfiles de Operaciones y Soporte Digital muestran <strong>capacidad actual adecuada</strong> y bajo riesgo, siendo candidatos naturales para externalización parcial o restructuración sin impacto operacional relevante.
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === 'recomendaciones' && (
            <div className="flex flex-col gap-2.5">
              {recomendaciones.map((r, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-4 items-start p-4 rounded-xl border border-gray-200 bg-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                    {r.letra}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <span className="text-sm font-bold text-navy">{r.titulo}</span>
                      <div className="flex gap-1.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${urgColors[r.urgencia]}22`, color: urgColors[r.urgencia] }}
                        >
                          {r.urgencia}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          Impacto {r.impacto}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed m-0">{r.desc}</p>
                  </div>
                </m.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex flex-wrap justify-between items-center gap-3 p-4 md:p-6 border-t border-gray-100 bg-gray-50/50">
          <p className="text-sm text-gray-500 m-0">¿Necesitas un diagnóstico estratégico de personas para tu organización?</p>
          <a
            href="#contacto"
            onClick={handleCTAClick}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Conversemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </m.div>
    </div>
  )
}
