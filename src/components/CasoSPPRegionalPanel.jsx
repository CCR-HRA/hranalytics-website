/**
 * Panel del caso SPP Regional. Contenido y mensajes de interfaz en español.
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'
import { analytics } from '../utils/analytics'
import { IconSPP } from './CaseStudyIcons'

const P = '#216a69'
const NAVY = '#0a1628'
const PL = '#2d8a88'
const WARN = '#f59e0b'
const DANGER = '#ef4444'
const SUCCESS = '#10b981'
const PURPLE = '#7c3aed'

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

function GraficoRotacion({ started }) {
  const W = 560
  const H = 230
  const PAD = { top: 20, right: 80, bottom: 52, left: 52 }
  const w = W - PAD.left - PAD.right
  const h = H - PAD.top - PAD.bottom
  const anios = ['Año 1', 'Año 2', 'Año 3', 'Año 4']
  const areas = [
    { nombre: 'Área C', color: P, vals: [19, 22, 25, 23] },
    { nombre: 'Área B', color: WARN, vals: [28, 33, 38, 35] },
    { nombre: 'Área D', color: PL, vals: [14, 16, 15, 17] },
  ]
  const maxV = 45
  const barW = (w / anios.length) / (areas.length + 1)
  const xS = (ai, gi) => (ai / anios.length) * w + gi * (barW + 3) + barW * 0.5

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!started) return
    let frame
    const start = performance.now()
    const animate = (now) => {
      const p = Math.min((now - start) / 1400, 1)
      setProgress(1 - Math.pow(1 - p, 3))
      if (p < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [started])

  const promedio = 27
  const yProm = h - (promedio / maxV) * h

  return (
    <div className="mb-5">
      <p className="text-xs font-bold text-white mb-0.5">Rotación histórica por área — últimos 4 años</p>
      <p className="text-[10px] text-white/70 mb-2">Porcentaje de rotación anual por agrupación funcional</p>
      <div className="overflow-x-auto min-w-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-[560px] h-auto">
          <g transform={`translate(${PAD.left},${PAD.top})`}>
            {[0, 10, 20, 30, 40].map((v) => (
              <g key={v}>
                <line x1={0} y1={h - (v / maxV) * h} x2={w} y2={h - (v / maxV) * h} stroke="#e5e7eb" strokeWidth={v === 0 ? 1.5 : 1} strokeDasharray={v === 0 ? '0' : '3,3'} />
                <text x={-6} y={h - (v / maxV) * h + 4} fontSize={9} fill="#94a3b8" textAnchor="end">{v}%</text>
              </g>
            ))}
            <line x1={0} y1={yProm} x2={w} y2={yProm} stroke={DANGER} strokeWidth={1.5} strokeDasharray="5,3" opacity={0.7} />
            <text x={w + 4} y={yProm + 4} fontSize={9} fill={DANGER} fontWeight={700}>Prom. {promedio}%</text>
            {anios.map((an, ai) =>
              areas.map((a, gi) => {
                const x = xS(ai, gi)
                const bh = (a.vals[ai] / maxV) * h * progress
                return (
                  <g key={`${ai}-${gi}`}>
                    <rect x={x} y={h - bh} width={barW} height={bh} fill={a.color} fillOpacity={0.85} rx={2} />
                    {progress > 0.9 && (
                      <text x={x + barW / 2} y={h - bh - 4} fontSize={8} fill={a.color} textAnchor="middle" fontWeight={700}>{a.vals[ai]}%</text>
                    )}
                  </g>
                )
              })
            )}
            <line x1={0} y1={h} x2={w} y2={h} stroke="#94a3b8" strokeWidth={1.5} />
            {anios.map((an, ai) => (
              <text key={ai} x={xS(ai, 1)} y={h + 14} fontSize={9} fill="#6b7280" textAnchor="middle">{an}</text>
            ))}
          </g>
        </svg>
      </div>
      <div className="flex gap-4 mt-1.5 flex-wrap">
        {areas.map((a, i) => (
          <div key={i} className="flex gap-1.5 items-center">
            <div className="w-2.5 h-2.5 rounded" style={{ background: a.color }} />
            <span className="text-[10px] text-white/70">{a.nombre}</span>
          </div>
        ))}
        <div className="flex gap-1.5 items-center">
          <svg width={20} height={8}><line x1={0} y1={4} x2={20} y2={4} stroke={DANGER} strokeWidth={1.5} strokeDasharray="4,2" /></svg>
          <span className="text-[10px]" style={{ color: DANGER }}>Promedio global</span>
        </div>
      </div>
    </div>
  )
}

function GraficoProyeccion({ started }) {
  const [scenario, setScenario] = useState('sinAccion')
  const anos = ['Año 0', 'Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5']
  const scenarios = {
    sinAccion: { label: 'Sin plan de acción', color: DANGER, dotacion: [100, 97, 93, 88, 84, 80] },
    planParcial: { label: 'Plan parcial', color: WARN, dotacion: [100, 99, 97, 95, 93, 91] },
    planCompleto: { label: 'Plan completo', color: SUCCESS, dotacion: [100, 100, 99, 98, 98, 97] },
  }
  const demanda = [100, 100, 99, 99, 98, 98]
  const areas = [
    { nombre: 'Área A', sinAccion: 68, planParcial: 80, planCompleto: 94, color: DANGER },
    { nombre: 'Área B', sinAccion: 73, planParcial: 83, planCompleto: 95, color: WARN },
    { nombre: 'Área D', sinAccion: 84, planParcial: 90, planCompleto: 97, color: PL },
    { nombre: 'Área E', sinAccion: 87, planParcial: 92, planCompleto: 98, color: PURPLE },
    { nombre: 'Área F', sinAccion: 91, planParcial: 94, planCompleto: 99, color: SUCCESS },
  ]

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!started) return
    setProgress(0)
    let frame
    const start = performance.now()
    const animate = (now) => {
      const p = Math.min((now - start) / 1600, 1)
      setProgress(1 - Math.pow(1 - p, 3))
      if (p < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [started, scenario])

  const CW = 420
  const CH = 240
  const CP = { top: 24, right: 20, bottom: 48, left: 58 }
  const cw = CW - CP.left - CP.right
  const ch = CH - CP.top - CP.bottom
  const minY1 = 65
  const maxY1 = 108
  const xS1 = (i) => (i / (anos.length - 1)) * cw
  const yS1 = (v) => ch - ((v - minY1) / (maxY1 - minY1)) * ch
  const clipW1 = progress * (cw + 4)

  const cur = scenarios[scenario]
  const pathDem = demanda.map((v, i) => `${i === 0 ? 'M' : 'L'}${xS1(i).toFixed(1)},${yS1(v).toFixed(1)}`).join(' ')
  const pathDot = cur.dotacion.map((v, i) => `${i === 0 ? 'M' : 'L'}${xS1(i).toFixed(1)},${yS1(v).toFixed(1)}`).join(' ')
  const areaB =
    demanda.map((v, i) => `${i === 0 ? 'M' : 'L'}${xS1(i).toFixed(1)},${yS1(v).toFixed(1)}`).join(' ') + ' ' +
    [...cur.dotacion].reverse().map((v, i) => `L${xS1(cur.dotacion.length - 1 - i).toFixed(1)},${yS1(v).toFixed(1)}`).join(' ') + ' Z'

  const barH = 22

  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-white mb-0.5">Proyección de dotación disponible — horizonte 5 años</p>
      <p className="text-[10px] text-white/70 mb-3">Índice base 100 = dotación actual. Compara tres escenarios según el nivel de intervención.</p>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {Object.entries(scenarios).map(([key, sc]) => (
          <button
            key={key}
            type="button"
            onClick={() => setScenario(key)}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all border-2"
            style={{
              borderColor: sc.color,
              background: scenario === key ? sc.color : 'white',
              color: scenario === key ? 'white' : sc.color,
            }}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className="mb-5 overflow-hidden">
        <p className="text-[10px] font-bold text-white mb-2">Dotación global proyectada vs. demanda</p>
        <div className="overflow-x-auto min-w-0">
          <svg width={CW} height={CH} className="block">
            <defs>
              <clipPath id="revealG-spp-reg">
                <rect x={CP.left} y={CP.top - 10} width={clipW1} height={ch + 20} />
              </clipPath>
              <linearGradient id="gradB-spp-reg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={cur.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={cur.color} stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <g transform={`translate(${CP.left},${CP.top})`}>
              {[70, 80, 90, 100].map((v) => (
                <g key={v}>
                  <line x1={0} y1={yS1(v)} x2={cw} y2={yS1(v)} stroke={v === 100 ? '#94a3b8' : '#e5e7eb'} strokeWidth={v === 100 ? 1.5 : 1} strokeDasharray={v === 100 ? '0' : '3,3'} />
                  <text x={-8} y={yS1(v) + 4} fontSize={9} fill="#94a3b8" textAnchor="end">{v}</text>
                </g>
              ))}
              <text x={-10} y={yS1(100) + 4} fontSize={8} fill="#64748b" fontWeight={700} textAnchor="end">base</text>
              <g clipPath="url(#revealG-spp-reg)">
                <path d={areaB} fill="url(#gradB-spp-reg)" />
              </g>
              <g clipPath="url(#revealG-spp-reg)">
                <path d={pathDem} fill="none" stroke={P} strokeWidth={2} strokeDasharray="5,3" />
              </g>
              <g clipPath="url(#revealG-spp-reg)">
                <path d={pathDot} fill="none" stroke={cur.color} strokeWidth={2.5} />
              </g>
              {anos.map((_, i) => (
                <g key={i} opacity={progress > i / anos.length ? 1 : 0} style={{ transition: 'opacity 0.2s' }}>
                  <circle cx={xS1(i)} cy={yS1(demanda[i])} r={3} fill={P} />
                  <circle cx={xS1(i)} cy={yS1(cur.dotacion[i])} r={3.5} fill={cur.color} />
                </g>
              ))}
              {progress > 0.9 && (
                <g opacity={Math.min((progress - 0.9) / 0.1, 1)}>
                  <rect x={xS1(5) - 68} y={yS1(cur.dotacion[5]) - 13} width={62} height={22} rx={4} fill="white" stroke={cur.color} strokeWidth={1} />
                  <text x={xS1(5) - 37} y={yS1(cur.dotacion[5]) - 3} fontSize={9} fill={cur.color} fontWeight={700} textAnchor="middle">Índice {cur.dotacion[5]}</text>
                  <text x={xS1(5) - 37} y={yS1(cur.dotacion[5]) + 7} fontSize={8} fill="#6b7280" textAnchor="middle">al año 5</text>
                </g>
              )}
              <line x1={0} y1={ch} x2={cw} y2={ch} stroke="#94a3b8" strokeWidth={1.5} />
              {anos.map((a, i) => (
                <text key={i} x={xS1(i)} y={ch + 16} fontSize={9} fill="#6b7280" textAnchor="middle">{a}</text>
              ))}
              <text x={cw / 2} y={ch + 36} fontSize={10} fill="#6b7280" textAnchor="middle" fontWeight={600}>Horizonte de planificación</text>
            </g>
          </svg>
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          <div className="flex gap-1.5 items-center">
            <svg width={22} height={8}><line x1={0} y1={4} x2={22} y2={4} stroke={P} strokeWidth={2} strokeDasharray="5,3" /></svg>
            <span className="text-[10px] text-white/70">Demanda proyectada</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <svg width={22} height={8}><line x1={0} y1={4} x2={22} y2={4} stroke={cur.color} strokeWidth={2} /></svg>
            <span className="text-[10px] text-white/70">Dotación — {cur.label}</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[10px] font-bold text-white mb-3">Dotación proyectada al año 5 por área funcional</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {areas.map((a, i) => {
            const val = a[scenario]
            const bc = val >= 95 ? SUCCESS : val >= 85 ? WARN : DANGER
            return (
              <div key={i} style={{ opacity: started ? 1 : 0, transition: `opacity 0.3s ease ${i * 70}ms` }}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-semibold text-white/85">{a.nombre}</span>
                  <span className="text-xs font-extrabold" style={{ color: bc }}>{val}%</span>
                </div>
                <div className="h-5 bg-white/20 rounded-md overflow-hidden relative">
                  <div className="h-full rounded-md transition-all duration-700" style={{ width: `${val * progress}%`, background: bc, opacity: 0.75 }} />
                  <div className="absolute top-0 left-[95%] w-0.5 h-full bg-white/30" />
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-[9px] text-white/60 mt-2 pl-2 border-l-2 border-white/20 leading-snug">
          Umbral 95% · Rojo: acción inmediata · Amarillo: seguimiento · Verde: estable
        </p>
      </div>

      <div>
        <p className="text-[10px] font-bold text-white mb-2">Comparativo de escenarios — índice global al año 5</p>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr] gap-1.5 p-2.5 bg-navy">
            {['Escenario', 'Índice', 'Brecha', 'Estado'].map((h, i) => (
              <span key={i} className="text-[8px] font-bold text-white/60 uppercase">{h}</span>
            ))}
          </div>
          {Object.entries(scenarios).map(([key, sc], i) => {
            const isActive = key === scenario
            const brecha = 98 - sc.dotacion[5]
            const estado = brecha > 10 ? 'Crítico' : brecha > 5 ? 'Moderado' : 'Estable'
            const estadoColor = brecha > 10 ? DANGER : brecha > 5 ? WARN : SUCCESS
            return (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                className="w-full grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr] gap-1.5 p-2.5 border-t border-gray-100 text-left transition-colors"
                style={{ background: isActive ? `${sc.color}15` : i % 2 === 0 ? 'white' : '#f8fafc' }}
              >
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: isActive ? sc.color : '#e5e7eb' }} />
                  <span className="text-[10px] font-medium" style={{ color: isActive ? sc.color : '#374151' }}>{sc.label}</span>
                </div>
                <span className="text-[10px] font-bold text-center" style={{ color: sc.color }}>{sc.dotacion[5]}</span>
                <span className="text-[10px] font-bold text-center" style={{ color: brecha > 10 ? DANGER : brecha > 5 ? WARN : SUCCESS }}>-{brecha}</span>
                <span className="text-[10px] text-center" style={{ color: estadoColor }}>{estado}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function GraficoRiesgo({ started }) {
  const W = 540
  const H = 250
  const PAD = { top: 20, right: 30, bottom: 54, left: 62 }
  const w = W - PAD.left - PAD.right
  const h = H - PAD.top - PAD.bottom
  const clusters = [
    { nombre: 'Área A', x: 3.8, y: 4.1, r: 18, color: DANGER },
    { nombre: 'Área B', x: 3.2, y: 3.4, r: 14, color: WARN },
    { nombre: 'Área D', x: 2.1, y: 2.8, r: 12, color: PL },
    { nombre: 'Área F', x: 1.4, y: 1.9, r: 10, color: SUCCESS },
    { nombre: 'Área E', x: 2.8, y: 1.6, r: 11, color: PURPLE },
  ]
  const xS = (v) => (v / 5) * w
  const yS = (v) => h - (v / 5) * h

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!started) return
    let frame
    const start = performance.now()
    const animate = (now) => {
      const p = Math.min((now - start) / 1200, 1)
      setProgress(1 - Math.pow(1 - p, 3))
      if (p < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [started])

  return (
    <div className="mb-5">
      <p className="text-xs font-bold text-white mb-0.5">Mapa de riesgo — brecha de competencias vs. riesgo operacional por área</p>
      <p className="text-[10px] text-white/70 mb-2">Las áreas arriba a la derecha requieren transferencia inmediata de conocimiento y planes de sucesión.</p>
      <div className="overflow-x-auto min-w-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-[540px] h-auto">
          <g transform={`translate(${PAD.left},${PAD.top})`}>
            <rect x={xS(2.5)} y={0} width={w - xS(2.5)} height={yS(2.5)} fill={`${DANGER}15`} rx={4} />
            <rect x={0} y={yS(5)} width={xS(2.5)} height={yS(2.5) - yS(5)} fill={`${SUCCESS}15`} rx={4} />
            <text x={xS(3.75)} y={yS(4.7)} fontSize={9} fill={`${DANGER}99`} textAnchor="middle" fontWeight={700}>Alta prioridad</text>
            <text x={xS(1.25)} y={yS(0.3)} fontSize={9} fill={`${SUCCESS}99`} textAnchor="middle" fontWeight={700}>Baja prioridad</text>
            {[1, 2, 3, 4, 5].map((v) => (
              <g key={v}>
                <line x1={xS(v)} y1={0} x2={xS(v)} y2={h} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="3,3" />
                <line x1={0} y1={yS(v)} x2={w} y2={yS(v)} stroke="#e5e7eb" strokeWidth={1} strokeDasharray="3,3" />
                <text x={xS(v)} y={h + 14} fontSize={8} fill="#94a3b8" textAnchor="middle">{v}</text>
                <text x={-8} y={yS(v) + 3} fontSize={8} fill="#94a3b8" textAnchor="end">{v}</text>
              </g>
            ))}
            <line x1={0} y1={h} x2={w} y2={h} stroke="#94a3b8" strokeWidth={1.5} />
            <line x1={0} y1={0} x2={0} y2={h} stroke="#94a3b8" strokeWidth={1.5} />
            {clusters.map((c, i) => (
              <g key={i} style={{ transition: `opacity 0.4s ease ${i * 100}ms` }} opacity={progress > i / clusters.length ? 1 : 0}>
                <circle cx={xS(c.x)} cy={yS(c.y)} r={c.r * progress} fill={c.color} fillOpacity={0.2} stroke={c.color} strokeWidth={1.5} />
                <text x={xS(c.x)} y={yS(c.y) + 3} fontSize={9} fill={c.color} fontWeight={700} textAnchor="middle">{c.nombre}</text>
              </g>
            ))}
            <text x={w / 2} y={h + 36} fontSize={10} fill="#6b7280" textAnchor="middle" fontWeight={600}>Nivel de brecha de competencias (1–5)</text>
            <text x={-46} y={h / 2} fontSize={10} fill="#6b7280" textAnchor="middle" fontWeight={600} transform={`rotate(-90,-50,${h / 2})`}>Riesgo operacional (1–5)</text>
          </g>
        </svg>
      </div>
    </div>
  )
}

function TabMetodologia({ started }) {
  const items = [
    { titulo: 'Análisis cuantitativo', desc: 'Revisión histórica de rotación, dotación y demanda durante 4 años, con proyecciones a 5 años por agrupación funcional.', color: P },
    { titulo: 'Entrevistas cualitativas', desc: 'Sesiones estructuradas con líderes clave para mapear competencias, riesgos y percepción del negocio.', color: PURPLE },
    { titulo: 'Mapa de brechas', desc: 'Cruce entre rotación proyectada, disponibilidad en el mercado laboral y nivel de competencias actuales.', color: WARN },
    { titulo: 'Plan de recomendaciones', desc: 'Acciones priorizadas por urgencia e impacto: sucesión, transferencia de conocimiento, desarrollo y atracción.', color: SUCCESS },
  ]
  const fases = [
    { n: '01', label: 'Planificación y alcance', color: P },
    { n: '02', label: 'Recopilación de datos', color: PL },
    { n: '03', label: 'Análisis y proyección', color: WARN },
    { n: '04', label: 'Resultados y recomendaciones', color: PURPLE },
  ]
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
        {items.map((it, i) => (
          <div key={i} className="p-4 rounded-xl border transition-all duration-400" style={{ background: `${it.color}08`, borderColor: `${it.color}40`, opacity: started ? 1 : 0, transform: started ? 'none' : 'translateY(8px)', transitionDelay: `${i * 80}ms` }}>
            <p className="text-xs font-bold mb-1.5" style={{ color: it.color }}>{it.titulo}</p>
            <p className="text-[11px] text-white/80 leading-relaxed m-0">{it.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs font-bold text-white mb-2">Fases del proyecto</p>
      <div className="flex gap-0 rounded-lg overflow-hidden border-2" style={{ borderColor: P }}>
        {fases.map((f, i) => (
          <div key={i} className="flex-1 p-3 text-center transition-opacity duration-400" style={{ background: `${f.color}15`, opacity: started ? 1 : 0, transitionDelay: `${i * 100 + 300}ms` }}>
            <div className="text-lg font-extrabold leading-none" style={{ color: f.color }}>{f.n}</div>
            <div className="text-[10px] text-white/80 mt-1 leading-snug">{f.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabRotacion({ started }) {
  const hallazgos = [
    { color: DANGER, txt: 'El Área A concentra la mayor rotación del período analizado, con una brecha significativa respecto al promedio global.' },
    { color: WARN, txt: 'El Área B muestra un patrón de rotación creciente año a año, con una aceleración marcada en el tercer año.' },
    { color: SUCCESS, txt: 'Las áreas D y F presentan niveles de rotación estables y por debajo del promedio, con baja variabilidad.' },
    { color: P, txt: 'El promedio global de rotación se sitúa en 27%, lo que representa un riesgo acumulado de pérdida superior al 50% de la dotación en 5 años sin intervención.' },
  ]
  return (
    <div>
      <GraficoRotacion started={started} />
      <p className="text-xs font-bold text-white mb-2">Hallazgos principales</p>
      <div className="flex flex-col gap-2">
        {hallazgos.map((h, i) => (
          <div key={i} className="flex gap-2.5 p-3 rounded-lg border transition-opacity duration-400" style={{ background: `${h.color}08`, borderColor: `${h.color}33`, opacity: started ? 1 : 0, transitionDelay: `${i * 80 + 200}ms` }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5" style={{ background: h.color }} />
            <p className="text-[11px] text-white/85 leading-relaxed m-0">{h.txt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabBrechas({ started }) {
  const recomendaciones = [
    { area: 'Área A', urgencia: 'Alta', accion: 'Plan de sucesión activo + transferencia de conocimiento inmediata', color: DANGER },
    { area: 'Área B', urgencia: 'Alta', accion: 'Atracción proactiva de talento + planes de desarrollo acelerado', color: DANGER },
    { area: 'Área D', urgencia: 'Media', accion: 'Fortalecer habilidades estratégicas en mandos medios', color: WARN },
    { area: 'Área E', urgencia: 'Media', accion: 'Identificar perfiles de alto potencial para rotación interna', color: WARN },
    { area: 'Área F', urgencia: 'Baja', accion: 'Mantener dotación y monitorear tendencias de mercado laboral', color: SUCCESS },
  ]
  return (
    <div>
      <GraficoProyeccion started={started} />
      <GraficoRiesgo started={started} />
      <p className="text-xs font-bold text-white mb-2">Recomendaciones por área según nivel de urgencia</p>
      <div className="rounded-xl overflow-hidden border border-white/20">
        <div className="grid grid-cols-[1.5fr_0.7fr_2.5fr] gap-2 p-2.5 bg-navy">
          {['Área funcional', 'Urgencia', 'Acción recomendada'].map((h, i) => (
            <span key={i} className="text-[9px] font-bold text-white/60 uppercase">{h}</span>
          ))}
        </div>
        {recomendaciones.map((r, i) => (
          <div key={i} className="grid grid-cols-[1.5fr_0.7fr_2.5fr] gap-2 p-2.5 border-t border-white/10" style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)', opacity: started ? 1 : 0, transition: `opacity 0.3s ease ${i * 70}ms` }}>
            <span className="text-[11px] font-medium text-white/85">{r.area}</span>
            <span className="text-[10px] font-bold text-center" style={{ color: r.color, background: `${r.color}15`, padding: '2px 8px', borderRadius: 20 }}>{r.urgencia}</span>
            <span className="text-[11px] text-white/75">{r.accion}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabResultados({ started }) {
  const logros = [
    { n: '01', titulo: 'Visibilidad a 5 años', desc: 'Por primera vez el negocio contó con una proyección cuantitativa de rotación y brechas de dotación por área funcional.', color: P },
    { n: '02', titulo: 'Foco en áreas críticas', desc: 'Se identificaron las dos agrupaciones con mayor riesgo acumulado, permitiendo priorizar recursos de desarrollo, sucesión y atracción.', color: DANGER },
    { n: '03', titulo: 'Integración negocio y gestión de personas', desc: 'El proceso incorporó la percepción directa de líderes del negocio, alineando la agenda de talento con los desafíos estratégicos y comerciales reales.', color: PURPLE },
    { n: '04', titulo: 'Base para el plan de acción', desc: 'Los resultados se convirtieron en el insumo central para que los socios de negocio desarrollaran planes de acción concretos y medibles con cada área.', color: WARN },
  ]
  const metricas = [
    { label: 'Años de datos históricos analizados', val: '4', color: P },
    { label: 'Agrupaciones funcionales evaluadas', val: '5', color: PL },
    { label: 'Líderes entrevistados', val: '9', color: PURPLE },
    { label: 'Rotación proyectada sin intervención', val: '>50%', color: DANGER },
    { label: 'Horizonte de planificación', val: '5 años', color: WARN },
    { label: 'Áreas de acción prioritaria', val: '2', color: SUCCESS },
  ]
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {logros.map((l, i) => (
          <div key={i} className="p-4 rounded-xl border transition-all duration-400" style={{ background: `${l.color}08`, borderColor: `${l.color}40`, opacity: started ? 1 : 0, transform: started ? 'none' : 'translateY(8px)', transitionDelay: `${i * 100}ms` }}>
            <p className="text-[10px] font-extrabold uppercase tracking-wider mb-2" style={{ color: l.color }}>{l.n}. {l.titulo}</p>
            <p className="text-[11px] text-white/85 leading-relaxed m-0">{l.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs font-bold text-white mb-2">Métricas del proyecto</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {metricas.map((m, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 70 + 400}ms` }}>
            <span className="text-[11px] text-white/75">{m.label}</span>
            <span className="text-base font-extrabold" style={{ color: m.color }}>{m.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CasoSPPRegionalPanel({ expanded }) {
  const [tab, setTab] = useState('metodologia')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const n1 = useCount(27, visible)
  const n2 = useCount(9, visible)
  const n3 = useCount(5, visible)
  const n4 = useCount(50, visible)

  const tabs = [
    { id: 'metodologia', label: 'Metodología' },
    { id: 'rotacion', label: 'Análisis de Rotación' },
    { id: 'brechas', label: 'Brechas y Riesgos' },
    { id: 'resultados', label: 'Logros' },
  ]

  const navigate = useNavigate()
  const handleCTAClick = (e) => {
    e.preventDefault()
    analytics.ctaClick('Conversemos', 'caso_spp_regional_cta')
    if (!scrollToSection('#contacto')) navigate({ pathname: '/', hash: 'contacto' })
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden bg-[#0f2035] border border-white/10 shadow-card">
        <div className="bg-navy rounded-t-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1 opacity-90">
                <IconSPP className="w-10 h-10 sm:w-12 sm:h-12" color="rgba(255,255,255,0.9)" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-primary rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider">{expanded?.service || 'Planificación Estratégica'}</span>
                  <span className="border border-white/20 rounded-md px-3 py-1.5 text-[11px] text-white/60">2025</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-normal leading-tight mb-2">
                  {expanded?.title || 'Planificación estratégica regional LATAM'}
                </h3>
                <p className="text-white/85 text-sm">{expanded?.industryLabel || 'Organización con presencia en múltiples mercados de la región · 2025'}</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-nowrap w-full">
              {[
                { val: n1, suf: '%', label: 'rotación promedio global histórica' },
                { val: n2, suf: '', label: 'líderes clave entrevistados' },
                { val: n3, suf: '', label: 'áreas funcionales evaluadas' },
                { val: n4, suf: '%+', label: 'rotación acumulada proyectada sin acción' },
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
          {tab === 'metodologia' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Diseño del proyecto</p>
              <p className="text-sm font-bold text-white mb-4">Metodología de planificación estratégica de personas</p>
              <p className="text-xs text-white/90 mb-4">Enfoque integrado de datos cuantitativos y perspectiva cualitativa de líderes del negocio</p>
              <TabMetodologia started={visible} />
            </>
          )}
          {tab === 'rotacion' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 2 — Análisis cuantitativo</p>
              <p className="text-sm font-bold text-white mb-4">Comportamiento de la rotación por área funcional</p>
              <p className="text-xs text-white/90 mb-4">Análisis histórico de 4 años con identificación de patrones y áreas de mayor riesgo</p>
              <TabRotacion started={visible} />
            </>
          )}
          {tab === 'brechas' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 3 — Proyección y riesgos</p>
              <p className="text-sm font-bold text-white mb-4">Brechas de dotación y mapa de riesgo por competencias</p>
              <p className="text-xs text-white/90 mb-4">Proyección a 5 años y priorización de acciones por nivel de urgencia e impacto</p>
              <TabBrechas started={visible} />
            </>
          )}
          {tab === 'resultados' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 4 — Entregables y valor generado</p>
              <p className="text-sm font-bold text-white mb-4">Logros del proyecto y métricas clave</p>
              <p className="text-xs text-white/90 mb-4">Impacto en la toma de decisiones estratégicas de gestión de personas</p>
              <TabResultados started={visible} />
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-t border-white/10 bg-primary/20 border border-primary/30 rounded-b-2xl">
          <p className="text-sm text-white/90 m-0">¿Necesitas proyección de dotación y brechas de talento para tu organización?</p>
          <a href="#contacto" onClick={handleCTAClick} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            Conversemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </m.div>
    </div>
  )
}
