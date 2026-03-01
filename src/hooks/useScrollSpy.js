import { useState, useEffect, useRef } from 'react'

const RESIZE_DEBOUNCE_MS = 120
// Delays para recalcular offsets después del mount inicial.
// Las secciones con LazyMount/Suspense cambian la altura de la página
// una vez que se renderizan, por lo que necesitamos recalcular.
const LAZY_RECALC_DELAYS_MS = [600, 1400, 2800]

/**
 * Hook para detectar la sección visible durante el scroll (scroll spy).
 *
 * @param {string[]} selectors - IDs o selectores CSS (ej: ['#inicio', '#contacto'])
 * @param {number} [offset=100] - Offset desde el top para considerar "activa"
 * @param {object} [options]
 * @param {boolean} [options.enabled=true] - Si false, no hace nada (ej. cuando no estamos en Home)
 * @returns {string} - Selector del elemento activo (ej: '#contacto')
 */
export function useScrollSpy(selectors, offset = 100, options = { enabled: true }) {
  const [activeId, setActiveId] = useState(selectors[0] || '')
  const sectionOffsetsRef = useRef([])
  const debounceRef = useRef(null)
  const lazyTimers = useRef([])

  useEffect(() => {
    if (!options.enabled) return

    let ticking = false

    const calculateOffsets = () => {
      sectionOffsetsRef.current = selectors
        .map((selector) => {
          const id = selector.replace(/^#/, '')
          const el = document.getElementById(id) || document.querySelector(selector)
          if (!el) return null
          return {
            id: selector,
            top: el.getBoundingClientRect().top + window.scrollY - offset - 10,
          }
        })
        .filter(Boolean)
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          // Ordenar por posición en página (el DOM tiene #recomendaciones antes de #que-hacemos y #quienes-somos)
          const sectionOffsets = [...sectionOffsetsRef.current].sort((a, b) => a.top - b.top)
          let currentActive = selectors[0]

          for (let i = 0; i < sectionOffsets.length; i++) {
            if (scrollY >= sectionOffsets[i].top) {
              currentActive = sectionOffsets[i].id
            }
          }

          setActiveId((prev) => (prev === currentActive ? prev : currentActive))
          ticking = false
        })
        ticking = true
      }
    }

    const onResize = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        calculateOffsets()
        onScroll()
        debounceRef.current = null
      }, RESIZE_DEBOUNCE_MS)
    }

    const onLoad = () => {
      calculateOffsets()
      onScroll()
    }

    calculateOffsets()
    onScroll()

    // Recalcular en múltiples momentos post-mount para capturar secciones
    // que se montan via LazyMount / Suspense y cambian la altura del documento
    lazyTimers.current.forEach(clearTimeout)
    lazyTimers.current = LAZY_RECALC_DELAYS_MS.map((delay) =>
      setTimeout(() => {
        calculateOffsets()
        onScroll()
      }, delay)
    )

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onLoad)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      lazyTimers.current.forEach(clearTimeout)
    }
  }, [selectors, offset, options.enabled])

  return activeId
}
