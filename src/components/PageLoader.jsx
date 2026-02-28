import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function PageLoader() {
  const prefersReducedMotion = useReducedMotion()
  const [show, setShow] = useState(() => !sessionStorage.getItem('seenLoader'))

  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('seenLoader', '1')
      setShow(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [show])

  if (prefersReducedMotion || !show) return null

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-navy flex items-center justify-center overflow-hidden"
        >
          {/* Grain sutil */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
            <div className="grain-texture absolute inset-0" />
          </div>

          <div className="relative z-10 text-center">
            <m.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <img src="/logo-white.png" alt="HR Analytics" className="h-16 md:h-20 mx-auto" />
            </m.div>

            <m.div
              className="h-0.5 bg-white/20 rounded-full mx-auto max-w-[140px] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <m.div
                className="h-full bg-primary-light rounded-full"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                // Animación acelerada para que termine antes de los 700ms
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </m.div>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-white/50 text-xs tracking-[0.25em] uppercase font-medium"
            >
              People Analytics
            </m.p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
