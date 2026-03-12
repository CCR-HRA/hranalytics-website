/**
 * Panel del caso Incentivos. Contenido y mensajes de interfaz en español.
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import { scrollToSection } from '../utils/scroll'
import { analytics } from '../utils/analytics'
import { IconIncentivos, IconCheck, IconCoin, IconChart, IconCalendar, IconTrendUp, IconTrophy, IconScale, IconLock, IconRefresh } from './CaseStudyIcons'

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
    <div className="rounded-full overflow-hidden bg-white/20" style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-[1100ms]"
        style={{
          background: color,
          width: started ? `${(value / max) * 100}%` : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

function Diagnostico({ started }) {
  const variables = [
    { label: 'Ventas (peso 50%)', pct: 62, color: DANGER, ref: 'Meta de ventas mensual' },
    { label: 'Calidad del servicio (16,7%)', pct: 71, color: WARN, ref: 'Auditorías internas' },
    { label: 'Control de costos (16,7%)', pct: 77, color: P, ref: 'Gestión de inventario' },
    { label: 'Encuesta de cliente (16,7%)', pct: 83, color: SUCCESS, ref: 'NPS y satisfacción' },
  ]
  const tramos = [
    { label: 'Tramo 1  $0–$2,5 millones', pct: 21, bvm: '$74 mil', color: '#94a3b8' },
    { label: 'Tramo 2  $2,5–$5 millones', pct: 17, bvm: '$134 mil', color: PL },
    { label: 'Tramo 3  $5–$7,5 millones', pct: 16, bvm: '$168 mil', color: PL },
    { label: 'Tramo 4  $7,5–$10 millones', pct: 14, bvm: '$217 mil', color: P },
    { label: 'Tramo 5  $10–$12,5 millones', pct: 11, bvm: '$263 mil', color: P },
    { label: 'Tramo 6  $12,5–$15 millones', pct: 9, bvm: '$318 mil', color: WARN },
    { label: 'Tramo 7+  $15 millones+', pct: 12, bvm: '$374 mil', color: PURPLE },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-xs font-bold text-white mb-1">Cumplimiento promedio por variable — modelo anterior</p>
        <p className="text-[11px] text-white/70 mb-3">4 variables de cálculo sobre la utilidad mensual</p>
        {variables.map((v, i) => (
          <div key={i} className="mb-3.5" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 80}ms` }}>
            <div className="flex justify-between mb-1">
              <span className="text-[11px] text-white/80 font-medium">{v.label}</span>
              <span className="text-[13px] font-extrabold" style={{ color: v.color }}>{v.pct}%</span>
            </div>
            <AnimBar value={v.pct} max={100} color={v.color} started={started} delay={i * 80} height={7} />
            <p className="text-[10px] text-white/85 mt-0.5">{v.ref}</p>
          </div>
        ))}
        <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200 text-[11px] text-red-900 leading-relaxed">
          <strong>Problema central:</strong> El 5% lineal sobre utilidad generaba pagos desproporcionados en tramos altos sin mejora equivalente en desempeño, con costos insostenibles a mediano plazo.
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-white mb-1">Distribución de la dotación por tramo de utilidad</p>
        <p className="text-[11px] text-white/70 mb-3">Bono variable promedio mensual por tramo en modelo anterior</p>
        {tramos.map((t, i) => (
          <div key={i} className="mb-2.5" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 60 + 200}ms` }}>
            <div className="grid grid-cols-[130px_1fr_50px] gap-2 items-center">
              <span className="text-[10px] font-semibold" style={{ color: t.color }}>{t.label}</span>
              <AnimBar value={t.pct} max={25} color={t.color} started={started} delay={i * 60 + 200} height={6} />
              <div className="text-right">
                <div className="text-[10px] font-bold" style={{ color: t.color }}>{t.pct}%</div>
                <div className="text-[9px] text-white/85">{t.bvm}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-2.5 p-3 bg-primary/20 rounded-lg border border-primary/30 text-[11px] text-white/90 leading-relaxed">
          <strong className="text-primary-light">Hallazgo clave:</strong> El 86% de la dotación se concentra en tramos 1 al 5, generando un alto potencial de ahorro con una escala escalonada decreciente.
        </div>
      </div>
    </div>
  )
}

// Gráfico cartesiano: modelo anterior vs. nuevo (brecha = ahorro)
function GraficoComparativo({ started }) {
  const W = 560
  const H = 300
  const PAD = { top: 24, right: 40, bottom: 52, left: 70 }
  const w = W - PAD.left - PAD.right
  const h = H - PAD.top - PAD.bottom

  const puntos = [
    { u: 0, ant: 0, nuevo: 0 },
    { u: 2.5, ant: 125, nuevo: 55 },
    { u: 5, ant: 250, nuevo: 192 },
    { u: 7.5, ant: 375, nuevo: 276 },
    { u: 10, ant: 500, nuevo: 344 },
    { u: 12.5, ant: 625, nuevo: 410 },
    { u: 15, ant: 750, nuevo: 468 },
    { u: 17.5, ant: 875, nuevo: 522 },
    { u: 20, ant: 1000, nuevo: 544 },
    { u: 22, ant: 1100, nuevo: 544 },
  ]

  const maxU = 22
  const maxB = 1200
  const xS = (v) => (v / maxU) * w
  const yS = (v) => h - (v / maxB) * h

  const pathAnt = puntos.map((p, i) =>
    `${i === 0 ? 'M' : 'L'}${xS(p.u).toFixed(1)},${yS(p.ant).toFixed(1)}`
  ).join(' ')

  const pathNuevo = puntos.map((p, i) => {
    if (i === 0) return `M${xS(p.u).toFixed(1)},${yS(p.nuevo).toFixed(1)}`
    return `H${xS(p.u).toFixed(1)} L${xS(p.u).toFixed(1)},${yS(p.nuevo).toFixed(1)}`
  }).join(' ')

  const rev = [...puntos].reverse()
  const ahorroPath =
    pathAnt +
    rev.map((p, i) => {
      if (i === 0) return `L${xS(p.u).toFixed(1)},${yS(p.nuevo).toFixed(1)}`
      return `L${xS(p.u).toFixed(1)},${yS(p.nuevo).toFixed(1)}`
    }).join(' ') + ' Z'

  const ticksX = [0, 5, 10, 15, 20]
  const ticksY = [0, 200, 400, 600, 800, 1000]

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!started) return
    let frame
    const start = performance.now()
    const animate = (now) => {
      const p = Math.min((now - start) / 1800, 1)
      setProgress(1 - Math.pow(1 - p, 3))
      if (p < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [started])

  const clipW = progress * (w + 4)

  const maxBrechaP = puntos.reduce((best, p) =>
    (p.ant - p.nuevo) > (best.ant - best.nuevo) ? p : best, puntos[0])

  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-white mb-1">La brecha entre ambos modelos representa el ahorro para la organización</p>
      <p className="text-[11px] text-white/70 mb-3">
        A mayor utilidad del punto de venta, mayor es el ahorro generado por la escala escalonada vs. la distribución lineal anterior.
        Eje X: utilidad mensual (millones de pesos) · Eje Y: bono variable (miles de pesos)
      </p>

      <div className="overflow-x-auto min-w-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-[560px] h-auto" style={{ fontFamily: 'inherit' }}>
          <defs>
            <clipPath id="revealC-incentivos">
              <rect x={PAD.left} y={PAD.top - 10} width={clipW} height={h + 20} />
            </clipPath>
            <linearGradient id="gradAhorro-incentivos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SUCCESS} stopOpacity="0.35" />
              <stop offset="100%" stopColor={SUCCESS} stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <g transform={`translate(${PAD.left},${PAD.top})`}>
            {ticksY.map((v) => (
              <line key={v} x1={0} y1={yS(v)} x2={w} y2={yS(v)} stroke="#e5e7eb" strokeWidth={1} strokeDasharray={v === 0 ? '0' : '3,3'} />
            ))}
            {ticksX.map((v) => (
              <line key={v} x1={xS(v)} y1={0} x2={xS(v)} y2={h} stroke="#e5e7eb" strokeWidth={1} strokeDasharray={v === 0 ? '0' : '3,3'} />
            ))}

            <line x1={0} y1={0} x2={0} y2={h} stroke="#94a3b8" strokeWidth={1.5} />
            <line x1={0} y1={h} x2={w} y2={h} stroke="#94a3b8" strokeWidth={1.5} />

            <g clipPath="url(#revealC-incentivos)">
              <path d={ahorroPath} fill="url(#gradAhorro-incentivos)" />
            </g>
            <g clipPath="url(#revealC-incentivos)">
              <path d={pathAnt} fill="none" stroke={DANGER} strokeWidth={2.5} strokeDasharray="7,4" opacity={0.85} />
            </g>
            <g clipPath="url(#revealC-incentivos)">
              <path d={pathNuevo} fill="none" stroke={P} strokeWidth={2.5} />
            </g>
            <g clipPath="url(#revealC-incentivos)">
              <line x1={xS(17.5)} y1={yS(544)} x2={xS(22)} y2={yS(544)} stroke={WARN} strokeWidth={1.5} strokeDasharray="5,3" />
            </g>

            {progress > 0.75 && (() => {
              const op = Math.min((progress - 0.75) / 0.25, 1)
              const px = xS(maxBrechaP.u)
              const y1 = yS(maxBrechaP.ant)
              const y2 = yS(maxBrechaP.nuevo)
              const mid = (y1 + y2) / 2
              const labelW = 110
              const labelX = Math.max(0, px - labelW - 12)
              return (
                <g opacity={op}>
                  <line x1={px} y1={y1 + 4} x2={px} y2={y2 - 4} stroke={SUCCESS} strokeWidth={1.5} />
                  <rect x={labelX} y={mid - 14} width={labelW} height={28} rx={5} fill="white" stroke={SUCCESS} strokeWidth={1} />
                  <text x={labelX + labelW / 2} y={mid - 3} fontSize={9} fill={SUCCESS} fontWeight={700} textAnchor="middle">Zona de ahorro</text>
                  <text x={labelX + labelW / 2} y={mid + 9} fontSize={9} fill="#374151" textAnchor="middle">para la organización</text>
                </g>
              )
            })()}

            {progress > 0.85 && (
              <g opacity={Math.min((progress - 0.85) / 0.15, 1)}>
                <text x={xS(19.5)} y={yS(544) - 8} fontSize={9} fill={WARN} fontWeight={700} textAnchor="middle">tope máximo de bono</text>
              </g>
            )}

            {ticksY.map((v) => (
              <text key={v} x={-10} y={yS(v) + 4} fontSize={9} fill="#94a3b8" textAnchor="end">
                {v === 0 ? '0' : `$${v.toLocaleString('es-CL')} mil`}
              </text>
            ))}
            {ticksX.map((v) => (
              <text key={v} x={xS(v)} y={h + 16} fontSize={9} fill="#94a3b8" textAnchor="middle">
                {v === 0 ? '$0' : `$${v} MM`}
              </text>
            ))}
            <text x={w / 2} y={h + 40} fontSize={10} fill="#6b7280" textAnchor="middle" fontWeight={600}>Utilidad mensual del punto de venta</text>
            <text x={-48} y={h / 2} fontSize={10} fill="#6b7280" textAnchor="middle" fontWeight={600} transform={`rotate(-90, -48, ${h / 2})`}>Bono variable estimado</text>
          </g>
        </svg>
      </div>

      <div className="flex gap-5 mt-2.5 flex-wrap items-center">
        <div className="flex gap-2 items-center">
          <svg width={28} height={10}><line x1={0} y1={5} x2={28} y2={5} stroke={DANGER} strokeWidth={2.5} strokeDasharray="6,3" /></svg>
          <span className="text-[11px] text-white/70">Modelo anterior — costo lineal creciente</span>
        </div>
        <div className="flex gap-2 items-center">
          <svg width={28} height={10}><line x1={0} y1={5} x2={28} y2={5} stroke={P} strokeWidth={2.5} /></svg>
          <span className="text-[11px] text-white/70">Nuevo modelo — escala escalonada con tope</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-7 h-2.5 rounded" style={{ background: `${SUCCESS}40`, border: `1px solid ${SUCCESS}` }} />
          <span className="text-[11px] font-bold" style={{ color: SUCCESS }}>Zona de ahorro para la organización</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
        {[
          { label: 'Ahorro crece con la utilidad', desc: 'A mayor utilidad, mayor es la diferencia entre ambos modelos', Icon: IconTrendUp, color: SUCCESS },
          { label: 'Tope máximo protege el costo', desc: 'La organización no paga más allá de un nivel definido de utilidad', Icon: IconLock, color: WARN },
          { label: 'Sin impacto en tramos bajos', desc: 'La brecha es mínima en tramos iniciales, protegiendo al colaborador', Icon: IconScale, color: P },
        ].map((k, i) => {
          const BoxIcon = k.Icon
          return (
          <div key={i} className="p-3 rounded-lg" style={{ background: `${k.color}08`, border: `1px solid ${k.color}33`, opacity: started ? Math.min(progress * 2, 1) : 0, transition: 'opacity 0.5s' }}>
            <div className="flex justify-center mb-1"><BoxIcon className="w-5 h-5" color={k.color} /></div>
            <p className="text-[11px] font-bold mb-0.5" style={{ color: k.color }}>{k.label}</p>
            <p className="text-[10px] text-white/70 m-0 leading-snug">{k.desc}</p>
          </div>
          )
        })}
      </div>
    </div>
  )
}

// Gráfico proyección 12 meses: ingreso colaborador vs costo empresa
function GraficoProyeccion({ started }) {
  const W = 560
  const H = 280
  const PAD = { top: 28, right: 36, bottom: 54, left: 68 }
  const w = W - PAD.left - PAD.right
  const h = H - PAD.top - PAD.bottom

  const meses = [
    { m: 1, label: 'Mes 1', colab: 98, empresa: 100 },
    { m: 2, label: 'Mes 2', colab: 99, empresa: 97 },
    { m: 3, label: 'Mes 3', colab: 100, empresa: 95 },
    { m: 4, label: 'Mes 4', colab: 101, empresa: 93 },
    { m: 5, label: 'Mes 5', colab: 102, empresa: 91 },
    { m: 6, label: 'Mes 6', colab: 103, empresa: 90 },
    { m: 7, label: 'Mes 7', colab: 104, empresa: 89 },
    { m: 8, label: 'Mes 8', colab: 105, empresa: 88 },
    { m: 9, label: 'Mes 9', colab: 106, empresa: 87 },
    { m: 10, label: 'Mes 10', colab: 107, empresa: 86 },
    { m: 11, label: 'Mes 11', colab: 108, empresa: 85 },
    { m: 12, label: 'Mes 12', colab: 109, empresa: 84 },
  ]

  const minY = 80
  const maxY = 115
  const xS = (i) => (i / (meses.length - 1)) * w
  const yS = (v) => h - ((v - minY) / (maxY - minY)) * h

  const pathColab = meses.map((p, i) => `${i === 0 ? 'M' : 'L'}${xS(i).toFixed(1)},${yS(p.colab).toFixed(1)}`).join(' ')
  const pathEmpresa = meses.map((p, i) => `${i === 0 ? 'M' : 'L'}${xS(i).toFixed(1)},${yS(p.empresa).toFixed(1)}`).join(' ')

  const areaColab =
    meses.map((p, i) => `${i === 0 ? 'M' : 'L'}${xS(i).toFixed(1)},${yS(p.colab).toFixed(1)}`).join(' ') +
    ` L${xS(meses.length - 1)},${yS(100)} L${xS(0)},${yS(100)} Z`

  const areaEmpresa =
    `M${xS(0)},${yS(100)} ` +
    meses.map((p, i) => `L${xS(i).toFixed(1)},${yS(p.empresa).toFixed(1)}`).join(' ') +
    ` L${xS(meses.length - 1)},${yS(100)} Z`

  const ticksY = [85, 90, 95, 100, 105, 110]

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!started) return
    let frame
    const start = performance.now()
    const animate = (now) => {
      const p = Math.min((now - start) / 2000, 1)
      setProgress(1 - Math.pow(1 - p, 3))
      if (p < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [started])

  const clipW = progress * (w + 4)

  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-white mb-1">Proyección a 12 meses: ingreso del colaborador y costo para la organización</p>
      <p className="text-[11px] text-white/70 mb-3">
        Índice base 100 = situación en el mes de implementación. La brecha creciente entre ambas curvas refleja el autofinanciamiento progresivo del nuevo modelo.
      </p>

      <div className="overflow-x-auto min-w-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-[560px] h-auto" style={{ fontFamily: 'inherit' }}>
          <defs>
            <clipPath id="revealP-incentivos">
              <rect x={PAD.left} y={PAD.top - 10} width={clipW} height={h + 20} />
            </clipPath>
            <linearGradient id="gradColab-incentivos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SUCCESS} stopOpacity="0.25" />
              <stop offset="100%" stopColor={SUCCESS} stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="gradEmpresa-incentivos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={P} stopOpacity="0.04" />
              <stop offset="100%" stopColor={P} stopOpacity="0.22" />
            </linearGradient>
          </defs>

          <g transform={`translate(${PAD.left},${PAD.top})`}>
            {ticksY.map((v) => (
              <line key={v} x1={0} y1={yS(v)} x2={w} y2={yS(v)} stroke={v === 100 ? '#94a3b8' : '#e5e7eb'} strokeWidth={v === 100 ? 1.5 : 1} strokeDasharray={v === 100 ? '0' : '3,3'} />
            ))}
            <text x={-10} y={yS(100) + 4} fontSize={9} fill="#64748b" textAnchor="end" fontWeight={700}>base</text>
            <line x1={0} y1={0} x2={0} y2={h} stroke="#94a3b8" strokeWidth={1.5} />
            <line x1={0} y1={h} x2={w} y2={h} stroke="#94a3b8" strokeWidth={1.5} />

            <g clipPath="url(#revealP-incentivos)">
              <path d={areaEmpresa} fill="url(#gradEmpresa-incentivos)" />
            </g>
            <g clipPath="url(#revealP-incentivos)">
              <path d={areaColab} fill="url(#gradColab-incentivos)" />
            </g>
            <g clipPath="url(#revealP-incentivos)">
              <path d={pathEmpresa} fill="none" stroke={P} strokeWidth={2.5} />
            </g>
            <g clipPath="url(#revealP-incentivos)">
              <path d={pathColab} fill="none" stroke={SUCCESS} strokeWidth={2.5} />
            </g>

            {meses.map((p, i) => (
              <g key={i} opacity={progress > i / meses.length ? 1 : 0} style={{ transition: 'opacity 0.2s' }}>
                <circle cx={xS(i)} cy={yS(p.colab)} r={3} fill={SUCCESS} />
                <circle cx={xS(i)} cy={yS(p.empresa)} r={3} fill={P} />
              </g>
            ))}

            {progress > 0.9 && (() => {
              const op = Math.min((progress - 0.9) / 0.1, 1)
              const xi = xS(meses.length - 1)
              const yC = yS(meses[meses.length - 1].colab)
              const yE = yS(meses[meses.length - 1].empresa)
              const mid = (yC + yE) / 2
              return (
                <g opacity={op}>
                  <line x1={xi + 6} y1={yC + 3} x2={xi + 6} y2={yE - 3} stroke="#64748b" strokeWidth={1} strokeDasharray="2,2" />
                  <rect x={xi - 74} y={mid - 13} width={68} height={26} rx={5} fill="white" stroke="#e5e7eb" strokeWidth={1} />
                  <text x={xi - 40} y={mid - 2} fontSize={9} fill={SUCCESS} fontWeight={700} textAnchor="middle">+9 puntos</text>
                  <text x={xi - 40} y={mid + 9} fontSize={9} fill="#374151" textAnchor="middle">de brecha</text>
                </g>
              )
            })()}

            {progress > 0.6 && (() => {
              const op = Math.min((progress - 0.6) / 0.2, 1)
              const xi = xS(5)
              const yMid = yS(92)
              return (
                <g opacity={op}>
                  <rect x={xi - 2} y={yMid - 12} width={104} height={24} rx={5} fill={`${P}18`} stroke={P} strokeWidth={1} />
                  <text x={xi + 50} y={yMid + 1} fontSize={9} fill={P} fontWeight={700} textAnchor="middle">Zona de autofinanciamiento</text>
                </g>
              )
            })()}

            {ticksY.filter((v) => v !== 100).map((v) => (
              <text key={v} x={-10} y={yS(v) + 4} fontSize={9} fill="#94a3b8" textAnchor="end">{v}</text>
            ))}
            {meses.map((p, i) => (i % 2 === 0 ? <text key={i} x={xS(i)} y={h + 16} fontSize={9} fill="#94a3b8" textAnchor="middle">{p.label}</text> : null))}
            <text x={w / 2} y={h + 40} fontSize={10} fill="#6b7280" textAnchor="middle" fontWeight={600}>Período de implementación</text>
            <text x={-50} y={h / 2} fontSize={10} fill="#6b7280" textAnchor="middle" fontWeight={600} transform={`rotate(-90, -50, ${h / 2})`}>Índice (base 100 = inicio)</text>
          </g>
        </svg>
      </div>

      <div className="flex gap-5 mt-2.5 flex-wrap items-center">
        <div className="flex gap-2 items-center">
          <svg width={28} height={10}><line x1={0} y1={5} x2={28} y2={5} stroke={SUCCESS} strokeWidth={2.5} /></svg>
          <span className="text-[11px] text-white/70">Ingreso total del colaborador</span>
        </div>
        <div className="flex gap-2 items-center">
          <svg width={28} height={10}><line x1={0} y1={5} x2={28} y2={5} stroke={P} strokeWidth={2.5} /></svg>
          <span className="text-[11px] text-white/70">Costo de incentivos para la organización</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-7 h-2.5 rounded border border-dashed border-slate-400" style={{ background: '#94a3b833' }} />
          <span className="text-[11px] text-white/70">Línea base al inicio del modelo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
        {[
          { Icon: IconTrendUp, color: SUCCESS, titulo: 'Colaborador gana más', desc: 'El ingreso total sube progresivamente gracias a la escala y al ajuste del sueldo base garantizado.' },
          { Icon: IconCoin, color: P, titulo: 'La organización ahorra', desc: 'El costo de incentivos decrece mes a mes al reemplazar la distribución lineal por la escala decreciente con tope.' },
          { Icon: IconRefresh, color: WARN, titulo: 'Modelo se autofinancia', desc: 'La brecha creciente entre ambas curvas muestra que el ahorro generado supera la inversión inicial del cambio.' },
        ].map((k, i) => {
          const ProjIcon = k.Icon
          return (
          <div key={i} className="p-3 rounded-lg" style={{ background: `${k.color}08`, border: `1px solid ${k.color}33`, opacity: started ? 1 : 0, transition: `opacity 0.5s ease ${i * 150 + 400}ms` }}>
            <div className="flex justify-center mb-1"><ProjIcon className="w-5 h-5" color={k.color} /></div>
            <p className="text-[11px] font-bold mb-0.5" style={{ color: k.color }}>{k.titulo}</p>
            <p className="text-[10px] text-white/70 m-0 leading-snug">{k.desc}</p>
          </div>
          )
        })}
      </div>
    </div>
  )
}

function ModeloPropuesto({ started }) {
  return (
    <div>
      <GraficoComparativo started={started} />
      <ComparativoYVariables started={started} />
    </div>
  )
}

function ComparativoYVariables({ started }) {
  const comparativo = [
    { criterio: 'Variables de cálculo', antes: '4 variables (16,7% c/u)', despues: '5 variables (pesos diferenciados)' },
    { criterio: 'Distribución del bono', antes: '5% lineal fijo', despues: 'Escala escalonada decreciente' },
    { criterio: 'Bono mínimo asegurado', antes: '3 categorías por local', despues: '1 bono mínimo unificado para tramo base' },
    { criterio: 'Tope máximo de pago', antes: 'Sin tope definido', despues: 'Tope a partir de utilidad máx.' },
    { criterio: 'Sueldo base mínimo garantizado', antes: 'Variable sin piso', despues: 'Piso salarial garantizado' },
    { criterio: 'Capacitación', antes: 'No incluida', despues: '5% peso en cálculo' },
  ]
  const variables = [
    { nombre: 'Ventas', pct: 48, color: P },
    { nombre: 'Calidad', pct: 22, color: PL },
    { nombre: 'Costos / Inv.', pct: 16, color: WARN },
    { nombre: 'Servicio', pct: 9, color: SUCCESS },
    { nombre: 'Capacitación', pct: 5, color: PURPLE },
  ]
  return (
    <>
      <p className="text-xs font-bold text-white mb-2">Comparativo criterio a criterio: modelo anterior vs. propuesta</p>
      <div className="rounded-xl overflow-hidden border border-white/20 mb-5">
        <div className="grid grid-cols-[2fr_1.3fr_1.5fr] bg-navy p-2.5">
          <span className="text-[10px] font-bold text-white/85 uppercase tracking-wider">Criterio</span>
          <span className="text-[10px] font-bold text-white text-center">Modelo anterior</span>
          <span className="text-[10px] font-bold text-white text-center">Nuevo modelo</span>
        </div>
        {comparativo.map((r, i) => (
          <div key={i} className="grid grid-cols-[2fr_1.3fr_1.5fr] border-t border-white/10" style={{ opacity: started ? 1 : 0, transition: `opacity 0.3s ease ${i * 55}ms`, background: i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)' }}>
            <div className="p-2.5"><span className="text-[11px] text-white/85 font-medium">{r.criterio}</span></div>
            <div className="p-2.5 text-center"><span className="text-[11px] text-red-400">{r.antes}</span></div>
            <div className="p-2.5 text-center"><span className="text-[11px] text-primary-light font-semibold">{r.despues}</span></div>
          </div>
        ))}
      </div>
      <p className="text-xs font-bold text-white mb-2">Distribución de las 5 variables — nuevo modelo</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {variables.map((v, i) => (
          <div key={i} className="flex-1 min-w-[80px] p-3 rounded-lg text-center" style={{ background: `${v.color}10`, border: `1px solid ${v.color}33`, opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 80}ms` }}>
            <div className="text-xl font-extrabold" style={{ color: v.color }}>{v.pct}%</div>
            <div className="text-[10px] text-white/70 mt-0.5">{v.nombre}</div>
          </div>
        ))}
      </div>
    </>
  )
}

function Impacto({ started }) {
  return (
    <div>
      <GraficoProyeccion started={started} />
      <ImpactoKPIsYSegmentos started={started} />
    </div>
  )
}

function ImpactoKPIsYSegmentos({ started }) {
  const kpis = [
    { val: '68%', label: 'dotación beneficiada', color: SUCCESS, Icon: IconCheck },
    { val: '11%', label: 'ahorro neto estimado', color: WARN, Icon: IconCoin },
    { val: '86%', label: 'concentración tramos 1–5', color: P, Icon: IconChart },
    { val: '4', label: 'meses de alta rotación modelo', color: PURPLE, Icon: IconCalendar },
  ]
  const segmentos = [
    { label: 'Mantiene o mejora renta', pct: 68, color: SUCCESS },
    { label: 'Impacto neutro (ajuste sueldo base)', pct: 21, color: WARN },
    { label: 'Disminución en tramos intermedios', pct: 11, color: DANGER },
  ]
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        {kpis.map((k, i) => {
          const KpiIcon = k.Icon
          return (
          <div key={i} className="p-3 rounded-xl text-center" style={{ background: `${k.color}08`, border: `1px solid ${k.color}33`, opacity: started ? 1 : 0, transform: started ? 'none' : 'translateY(10px)', transition: `all 0.4s ease ${i * 80}ms` }}>
            <div className="flex justify-center mb-1"><KpiIcon className="w-6 h-6" color={k.color} /></div>
            <div className="text-2xl font-extrabold leading-none" style={{ color: k.color }}>{k.val}</div>
            <div className="text-[9px] text-white/70 mt-1">{k.label}</div>
          </div>
          )
        })}
      </div>
      <p className="text-xs font-bold text-white mb-3">Distribución del impacto en la dotación</p>
      {segmentos.map((s, i) => (
        <div key={i} className="mb-3.5" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 80 + 200}ms` }}>
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-white/85">{s.label}</span>
            <span className="text-sm font-extrabold" style={{ color: s.color }}>{s.pct}%</span>
          </div>
          <AnimBar value={s.pct} max={100} color={s.color} started={started} delay={i * 80 + 200} height={8} />
        </div>
      ))}
      <div className="p-3 bg-amber-900/30 rounded-lg border border-amber-500/30 text-[11px] text-white/85 leading-relaxed mt-2">
        El 11% con disminución en rangos intermedios se compensa vía ajuste del piso salarial garantizado, asegurando que ningún colaborador pierda ingreso total.
      </div>
    </div>
  )
}

function Conclusiones({ started }) {
  const logros = [
    { n: '01', Icon: IconTrendUp, color: P, titulo: 'Movilidad interna y carrera vertical', desc: 'La escala escalonada crea incentivos reales para que los líderes de punto de venta aumenten la utilidad y avancen de tramo.' },
    { n: '02', Icon: IconTrophy, color: PL, titulo: 'Competitividad salarial diferenciada', desc: 'La combinación de piso salarial garantizado más bono variable por tramo posiciona la oferta por sobre los competidores directos.' },
    { n: '03', Icon: IconCoin, color: WARN, titulo: 'Sustentabilidad financiera del modelo', desc: 'La escala decreciente con tope máximo genera ahorros crecientes a medida que aumentan las utilidades.' },
    { n: '04', Icon: IconScale, color: PURPLE, titulo: 'Equidad y simplicidad administrativa', desc: 'Un único bono fijo asegurado para el tramo base reemplaza las tres categorías diferenciadas por local.' },
  ]
  const metricas = [
    { label: 'Ahorro estimado a 12 meses', val: '~11%', color: SUCCESS },
    { label: 'Dotación sin impacto negativo neto', val: '89%', color: P },
    { label: 'Variables de desempeño incluidas', val: '5', color: PL },
    { label: 'Tramos de utilidad definidos', val: '8', color: PURPLE },
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
            <p className="text-[11px] text-white/85 leading-relaxed m-0">{l.desc}</p>
          </div>
          )
        })}
      </div>
      <p className="text-xs font-bold text-white mb-2">Métricas clave del proyecto</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {metricas.map((m, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center" style={{ opacity: started ? 1 : 0, transition: `opacity 0.4s ease ${i * 70 + 400}ms` }}>
            <span className="text-[11px] text-white/75">{m.label}</span>
            <span className="text-sm font-extrabold" style={{ color: m.color }}>{m.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CasoIncentivosPanel({ expanded }) {
  const [tab, setTab] = useState('diagnostico')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const n1 = useCount(820, visible)
  const n2 = useCount(68, visible)
  const n3 = useCount(11, visible)
  const n4 = useCount(5, visible)

  const tabs = [
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'modelo', label: 'Modelo Propuesto' },
    { id: 'impacto', label: 'Análisis de Impacto' },
    { id: 'conclusiones', label: 'Logros' },
  ]

  const navigate = useNavigate()
  const handleCTAClick = (e) => {
    e.preventDefault()
    analytics.ctaClick('Conversemos', 'caso_incentivos_cta')
    if (!scrollToSection('#contacto')) navigate({ pathname: '/', hash: 'contacto' })
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden bg-[#0f2035] border border-white/10 shadow-card">
        <div className="bg-navy rounded-t-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1 opacity-90">
                <IconIncentivos className="w-10 h-10 sm:w-12 sm:h-12" color="rgba(255,255,255,0.9)" />
              </div>
              <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ background: PURPLE }}>{expanded?.service || 'Compensaciones & Incentivos'}</span>
                <span className="border border-white/25 rounded-md px-3 py-1.5 text-[11px] text-white/85">2024</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal leading-tight mb-2">
                {expanded?.title || 'Rediseño del modelo de incentivos variable para líderes de punto de venta'}
              </h3>
              <p className="text-white/85 text-sm mb-4">{expanded?.industryLabel || 'Organización con múltiples puntos de venta a nivel nacional · Chile · 2024'}</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-nowrap w-full">
                {[
                  { val: n1, suf: '+', label: 'registros analizados' },
                  { val: n2, suf: '%', label: 'dotación beneficiada' },
                  { val: n3, suf: '%', label: 'ahorro estimado en incentivos' },
                  { val: n4, suf: '', label: 'variables de desempeño' },
                ].map((s, i) => (
                  <div key={i} className="flex-1 min-w-[4.5rem] text-center bg-white/5 rounded-lg py-2 px-2 sm:p-3">
                    {expanded?.service && <div className="text-[8px] sm:text-[9px] text-white/85 uppercase tracking-wider mb-0.5 leading-tight">{expanded.service}</div>}
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
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 1 — Auditoría del modelo vigente</p>
              <p className="text-sm font-bold text-white mb-4">Diagnóstico del sistema de incentivos anterior</p>
              <p className="text-xs text-white/70 mb-4">Análisis sobre 820+ registros mensuales de líderes de punto de venta · 14 meses</p>
              <Diagnostico started={visible} />
            </>
          )}
          {tab === 'modelo' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 2 — Diseño del nuevo modelo</p>
              <p className="text-sm font-bold text-white mb-4">Escala escalonada con 5 variables y tope máximo definido</p>
              <ModeloPropuesto started={visible} />
            </>
          )}
          {tab === 'impacto' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 3 — Simulación sobre datos históricos</p>
              <p className="text-sm font-bold text-white mb-4">Impacto en dotación y posición vs. mercado</p>
              <Impacto started={visible} />
            </>
          )}
          {tab === 'conclusiones' && (
            <>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light mb-0.5">Fase 4 — Entregables y valor generado</p>
              <p className="text-sm font-bold text-white mb-4">Logros del proyecto y métricas clave</p>
              <Conclusiones started={visible} />
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-t border-white/10 bg-primary/20 border border-primary/30 rounded-b-2xl">
          <p className="text-sm text-white/90 m-0">¿Necesitas rediseñar tu modelo de incentivos?</p>
          <a href="#contacto" onClick={handleCTAClick} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            Conversemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </m.div>
    </div>
  )
}
