import { useEffect } from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { pageView } from '../utils/analytics'

/**
 * Transición de página: solo fade para evitar que el contenido quede desplazado.
 * (y: 16 hacía que cada página apareciera más abajo y se viera texto de la anterior)
 */
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
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
