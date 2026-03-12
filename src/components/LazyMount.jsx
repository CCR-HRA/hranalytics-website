/**
 * Monta children solo cuando el marcador entra cerca del viewport.
 * Componente de utilidad; no expone mensajes al usuario. Interfaz en español.
 * rootMargin grande para "pre-cargar" antes de que el usuario llegue.
 * forceMount: si true, monta de inmediato (útil al navegar a #contacto para que el scroll llegue al final).
 */
import { useEffect, useRef, useState } from 'react'
export default function LazyMount({ children, rootMargin = '700px', minHeight = 1, forceMount = false }) {
  const [mounted, setMounted] = useState(forceMount)
  const markerRef = useRef(null)

  useEffect(() => {
    if (forceMount) setMounted(true)
  }, [forceMount])

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
