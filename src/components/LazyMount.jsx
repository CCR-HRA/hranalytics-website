import { useEffect, useRef, useState } from 'react'

/**
 * Monta children solo cuando el marcador entra cerca del viewport.
 * rootMargin grande para "pre-cargar" antes de que el usuario llegue.
 */
export default function LazyMount({ children, rootMargin = '700px', minHeight = 1 }) {
  const [mounted, setMounted] = useState(false)
  const markerRef = useRef(null)

  useEffect(() => {
    if (mounted) return
    const el = markerRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          obs.disconnect()
        }
      },
      { rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [mounted, rootMargin])

  if (mounted) return children
  return <div ref={markerRef} style={{ minHeight }} aria-hidden />
}
