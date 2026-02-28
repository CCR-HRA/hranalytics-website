import { useRef, useEffect, useState } from 'react'
import { m, useInView } from 'framer-motion'

/**
 * Cuenta animada que se activa cuando el elemento entra en viewport.
 * Soporta números (18+, 4, 5) y texto (MIT).
 * variant: 'default' | 'statsBar' (statsBar = texto blanco para barra oscura, soporta labelDetail).
 */
export default function AnimatedCounter({ value, label, labelDetail, duration = 1.5, className = '', variant = 'default' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: variant === 'statsBar' ? '-10px' : '-50px', amount: variant === 'statsBar' ? 0.3 : 0.5 })
  const [display, setDisplay] = useState(null)

  const match = String(value).match(/^(\d+)(.*)$/)
  const numPart = match ? parseInt(match[1], 10) : null
  const suffix = match?.[2] ?? ''
  const isNumeric = numPart !== null

  useEffect(() => {
    if (!inView) return
    if (isNumeric) {
      const end = numPart
      const startTime = performance.now()

      const tick = (now) => {
        const elapsed = (now - startTime) / 1000
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        const current = Math.floor(eased * end)
        setDisplay(`${current}${suffix}`)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync display for non-numeric value
      setDisplay(value)
    }
  }, [inView, numPart, suffix, value, duration, isNumeric])

  const isStatsBar = variant === 'statsBar'
  const valueClass = isStatsBar
    ? 'text-2xl md:text-3xl font-bold tracking-tight text-white'
    : 'text-2xl md:text-3xl font-bold text-primary tracking-tight'
  const labelClass = isStatsBar
    ? 'text-white/80 text-xs mt-1 uppercase tracking-wide'
    : 'mt-2 text-xs md:text-sm text-gray-600 leading-relaxed'

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <p className={valueClass}>
        {display ?? (isNumeric ? `0${suffix}` : value)}
      </p>
      <p className={labelClass}>{label}</p>
      {isStatsBar && labelDetail && (
        <p className="text-white/80 text-xs mt-0.5 normal-case tracking-normal">{labelDetail}</p>
      )}
    </m.div>
  )
}
