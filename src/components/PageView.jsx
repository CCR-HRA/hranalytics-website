import { useEffect } from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { pageView } from '../utils/analytics'

/**
 * Transición de página: entrada/salida simétricas (y: 16 / -16), duración 0.4s.
 */
const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

export default function PageView() {
  const outlet = useOutlet()
  const location = useLocation()

  useEffect(() => {
    const path = `${location.pathname}${location.search}`
    const timer = setTimeout(() => {
      pageView(path, document.title)
    }, 150)
    return () => clearTimeout(timer)
  }, [location.pathname, location.search])

  if (!outlet) return null

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
        className="page-view flex flex-col flex-1 min-h-0 w-full overflow-x-hidden bg-white"
      >
        {outlet}
      </m.div>
    </AnimatePresence>
  )
}
