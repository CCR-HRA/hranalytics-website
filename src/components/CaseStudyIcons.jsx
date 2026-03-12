/**
 * Iconos SVG propios para casos de estudio.
 * Diseño geométrico minimalista, sin relación con estética IA.
 * Todos los textos y etiquetas asociados están en español.
 */

const P = '#216a69'
const SUCCESS = '#10b981'

/** Iconos pequeños para KPI y logros */
export function IconCheck({ className = 'w-5 h-5', color = SUCCESS }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M4 10l4 4 8-8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}
export function IconCoin({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><circle cx="10" cy="10" r="6" stroke={color} strokeWidth="2" fill="none" /><path d="M7 10h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
  )
}
export function IconChart({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><rect x="4" y="10" width="3" height="6" rx="1" fill={color} /><rect x="9" y="6" width="3" height="10" rx="1" fill={color} opacity="0.8" /><rect x="14" y="2" width="3" height="14" rx="1" fill={color} opacity="0.6" /></svg>
  )
}
export function IconCalendar({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><rect x="3" y="4" width="14" height="13" rx="2" stroke={color} strokeWidth="2" fill="none" /><path d="M3 8h14" stroke={color} strokeWidth="1.5" /><path d="M7 2v4M13 2v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
  )
}
export function IconTrendUp({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M4 14l5-5 4 4 6-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}
export function IconTrophy({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M5 4h10v4a4 4 0 01-8 0V4z" stroke={color} strokeWidth="1.5" fill="none" /><path d="M4 4H2v2h2M16 4h2v2h-2" stroke={color} strokeWidth="1.5" /><path d="M7 8v6a2 2 0 002 2h2a2 2 0 002-2V8" stroke={color} strokeWidth="1.5" fill="none" /><path d="M10 14v2M8 16h4" stroke={color} strokeWidth="1.5" /></svg>
  )
}
export function IconScale({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M10 2v16M4 6h12M6 10l4-4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="14" r="2" stroke={color} strokeWidth="1.5" fill="none" /></svg>
  )
}
export function IconLock({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><rect x="4" y="8" width="12" height="8" rx="2" stroke={color} strokeWidth="1.5" fill="none" /><path d="M6 8V5a4 4 0 018 0v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
  )
}
export function IconRefresh({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}><path d="M16 10a6 6 0 11-2-4M16 4v4h-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 10a6 6 0 0110-4M4 14v-4h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" /></svg>
  )
}

/** Ciclos de seguimiento — HR Analytics */
export function IconSemanal({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="4" y="6" width="2" height="8" rx="1" fill={color} opacity="0.9" />
      <rect x="9" y="4" width="2" height="12" rx="1" fill={color} opacity="0.9" />
      <rect x="14" y="8" width="2" height="6" rx="1" fill={color} opacity="0.9" />
    </svg>
  )
}
export function IconQuincenal({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="4" y="12" width="3" height="4" rx="1" fill={color} opacity="0.7" />
      <rect x="8.5" y="8" width="3" height="8" rx="1" fill={color} opacity="0.85" />
      <rect x="13" y="4" width="3" height="12" rx="1" fill={color} />
    </svg>
  )
}
export function IconMensual({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M4 14l4-4 4 2 6-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="4" y1="14" x2="18" y2="14" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  )
}
export function IconTrimestral({ className = 'w-5 h-5', color }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="1.5" fill={color} />
    </svg>
  )
}

const PL = '#2d8a88'
const NAVY = '#0a1628'
const WARN = '#f59e0b'

/** SPP — Diagnóstico estratégico: brújula + ejes de análisis */
export function IconSPP({ className = 'w-12 h-12', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
      <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="24" y1="8" x2="24" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="32" x2="24" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="24" x2="16" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="24" x2="40" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 16 L28 24 L24 32 L20 24 Z" fill={color} opacity="0.6" />
      <circle cx="24" cy="24" r="3" fill={color} />
    </svg>
  )
}

/** Alineamiento — Pilares conectados: bloques alineados */
export function IconAlineamiento({ className = 'w-12 h-12', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="4" y="28" width="10" height="12" rx="2" fill={color} opacity="0.4" />
      <rect x="18" y="20" width="10" height="20" rx="2" fill={color} opacity="0.6" />
      <rect x="32" y="12" width="10" height="28" rx="2" fill={color} />
      <line x1="14" y1="34" x2="18" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="30" x2="32" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="8" r="2" fill={WARN} />
    </svg>
  )
}

/** Capacitación — Medición en niveles: barras de progreso */
export function IconCapacitacion({ className = 'w-12 h-12', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="8" y="32" width="6" height="8" rx="1" fill={color} opacity="0.5" />
      <rect x="18" y="24" width="6" height="16" rx="1" fill={color} opacity="0.7" />
      <rect x="28" y="16" width="6" height="24" rx="1" fill={color} />
      <line x1="8" y1="28" x2="40" y2="28" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <rect x="36" y="8" width="4" height="4" rx="1" fill={PL} />
    </svg>
  )
}

/** Incentivos — Escala escalonada: gráfico de tramos */
export function IconIncentivos({ className = 'w-12 h-12', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M8 40 L8 32 L16 32 L16 24 L24 24 L24 18 L32 18 L32 12 L40 12 L40 40 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5" />
      <path d="M8 32 L16 32 L16 24 L24 24 L24 18 L32 18 L32 12 L40 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="8" y1="40" x2="40" y2="40" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

/** Ilustración de cabecera para SPP — más elaborada */
export function IllustrationSPP({ className = 'w-full max-w-[200px]' }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden>
      <rect x="10" y="10" width="140" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="80" cy="55" r="25" stroke={P} strokeWidth="2" fill="none" opacity="0.4" />
      <circle cx="80" cy="55" r="15" stroke={P} strokeWidth="1.5" fill="none" />
      {[0, 90, 180, 270].map((a, i) => {
        const rad = (a * Math.PI) / 180
        const x1 = 80 + 15 * Math.cos(rad)
        const y1 = 55 + 15 * Math.sin(rad)
        const x2 = 80 + 25 * Math.cos(rad)
        const y2 = 55 + 25 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={P} strokeWidth="1.5" strokeLinecap="round" />
      })}
      <circle cx="80" cy="55" r="4" fill={P} />
      <rect x="20" y="88" width="30" height="14" rx="2" fill={NAVY} opacity="0.08" />
      <rect x="55" y="88" width="50" height="14" rx="2" fill={P} opacity="0.12" />
      <rect x="110" y="88" width="30" height="14" rx="2" fill={PL} opacity="0.15" />
    </svg>
  )
}

/** Ilustración de cabecera para Alineamiento */
export function IllustrationAlineamiento({ className = 'w-full max-w-[200px]' }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden>
      <rect x="10" y="10" width="140" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="25" y="55" width="22" height="45" rx="3" fill={P} opacity="0.5" />
      <rect x="55" y="40" width="22" height="60" rx="3" fill={P} opacity="0.7" />
      <rect x="85" y="28" width="22" height="72" rx="3" fill={P} />
      <rect x="115" y="18" width="22" height="82" rx="3" fill={PL} />
      <line x1="47" y1="72" x2="55" y2="65" stroke={P} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="77" y1="55" x2="85" y2="48" stroke={P} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="107" y1="38" x2="115" y2="32" stroke={P} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Ilustración de cabecera para Capacitación */
export function IllustrationCapacitacionCustom({ className = 'w-full max-w-[200px]' }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden>
      <rect x="10" y="10" width="140" height="100" rx="8" fill="#f0f9f9" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="35" y="65" width="18" height="35" rx="2" fill={P} opacity="0.6" />
      <rect x="58" y="50" width="18" height="50" rx="2" fill={P} opacity="0.8" />
      <rect x="81" y="38" width="18" height="62" rx="2" fill={P} />
      <rect x="104" y="28" width="18" height="72" rx="2" fill={PL} />
      <line x1="20" y1="52" x2="140" y2="52" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <text x="130" y="48" fontSize="8" fill="#64748b" fontWeight="600">4.0</text>
    </svg>
  )
}

/** Ilustración genérica para casos con progressBars (Minería, Consumo) */
export function IllustrationResults({ className = 'w-full max-w-[200px]' }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden>
      <rect x="10" y="10" width="140" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="30" y="55" width="22" height="45" rx="2" fill={P} opacity="0.6" />
      <rect x="58" y="42" width="22" height="58" rx="2" fill={P} opacity="0.8" />
      <rect x="86" y="32" width="22" height="68" rx="2" fill={P} />
      <rect x="114" y="24" width="22" height="76" rx="2" fill={PL} />
      <line x1="20" y1="48" x2="140" y2="48" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  )
}

/** Ilustración de cabecera para Incentivos */
export function IllustrationIncentivos({ className = 'w-full max-w-[200px]' }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden>
      <rect x="10" y="10" width="140" height="100" rx="8" fill="#faf5ff" stroke="#e2e8f0" strokeWidth="1" />
      <path d="M25 95 L25 75 L45 75 L45 58 L65 58 L65 42 L85 42 L85 28 L105 28 L105 18 L135 18 L135 95 Z" fill="#7c3aed" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <path d="M25 75 L45 75 L45 58 L65 58 L65 42 L85 42 L85 28 L105 28 L105 18 L135 18" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="25" y1="95" x2="135" y2="95" stroke="#94a3b8" strokeWidth="1" />
    </svg>
  )
}
