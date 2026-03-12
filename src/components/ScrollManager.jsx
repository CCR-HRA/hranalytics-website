/**
 * Gestiona el scroll al cambiar de ruta/hash. Sin mensajes visibles. Interfaz en español.
 */
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../utils/scroll'

const INITIAL_DELAY_MS = 150
const INITIAL_DELAY_WHEN_HASH_MS = 850 // después de PageLoader ~700ms para no hacer scroll bajo el overlay
const RETRY_DELAYS_MS = [100, 300, 600, 1200, 2000]
const SECOND_SCROLL_DELAY_MS = 600 // segundo intento tras layout estable (imágenes, lazy, etc.)

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function ScrollManager() {
  const { pathname, hash, state } = useLocation()
  const timersRef = useRef([])

  // Scroll antes del paint: si hay hash, ir directo a la sección (evita flash al hacer clic en Testimonios)
  useLayoutEffect(() => {
    const effectiveHash = hash ? hash.replace(/^#/, '') : ''
    const target = effectiveHash ? `#${effectiveHash}` : (state?.scrollTo ?? null)
    if (!target) {
      scrollToTop()
      return
    }
    // Ir a la sección de inmediato, antes del paint, para no mostrar el top de la página
    scrollToSection(target, { smooth: false })
  }, [pathname, hash, state])

  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    // Si el Header ya manejó el scroll (clic en hash desde home), no hacer doble scroll (evita flash)
    if (state?.scrollHandled) return

    const prefersReduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const smooth = !prefersReduce

    const effectiveHash = hash ? hash.replace(/^#/, '') : ''
    const target = effectiveHash ? `#${effectiveHash}` : (state?.scrollTo ?? null)

    if (!target) return

    let cancelled = false
    const attempt = (i) => {
      if (cancelled) return
      const ok = scrollToSection(target, { smooth })
      if (ok) {
        // Segundo intento tras layout estable (LazyMount, imágenes, etc.) para que el scroll llegue al final
        const t2 = setTimeout(() => {
          if (!cancelled) scrollToSection(target, { smooth })
        }, SECOND_SCROLL_DELAY_MS)
        timersRef.current.push(t2)
        return
      }
      if (i >= RETRY_DELAYS_MS.length) return
      const t = setTimeout(() => attempt(i + 1), RETRY_DELAYS_MS[i])
      timersRef.current.push(t)
    }

    // Si ya estamos en home, delay corto; si venimos de otra página, esperar PageLoader + render
    const isHome = pathname === '/'
    const delay = effectiveHash
      ? (isHome ? 50 : INITIAL_DELAY_WHEN_HASH_MS)
      : INITIAL_DELAY_MS
    const t0 = setTimeout(() => attempt(0), delay)
    timersRef.current.push(t0)

    return () => {
      cancelled = true
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [pathname, hash, state])

  return null
}
