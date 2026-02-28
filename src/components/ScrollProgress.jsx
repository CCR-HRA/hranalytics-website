import { useState, useEffect, useRef } from 'react'
import { m } from 'framer-motion'

const PROGRESS_THRESHOLD = 0.5 // Solo actualizar estado si cambia más de 0.5% (reduce destello)

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafId = useRef(null)
  const lastProgress = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const value = height > 0 ? (winScroll / height) * 100 : 0
      if (Math.abs(value - lastProgress.current) >= PROGRESS_THRESHOLD || value === 0 || value === 100) {
        lastProgress.current = value
        setProgress(value)
      }
      rafId.current = null
    }

    const handleScroll = () => {
      if (rafId.current == null) {
        rafId.current = window.requestAnimationFrame(updateProgress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current != null) window.cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/10">
      <m.div
        className="h-full w-full bg-primary-light origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </div>
  )
}
