import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../utils/scroll'

const INITIAL_DELAY_MS = 150
const INITIAL_DELAY_WHEN_HASH_MS = 850 // después de PageLoader ~700ms para no hacer scroll bajo el overlay
const RETRY_DELAYS_MS = [100, 300, 600, 1200, 2000]

export default function ScrollManager() {
  const { pathname, hash, state } = useLocation()
  const timersRef = useRef([])

  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    const prefersReduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const smooth = !prefersReduce

    const effectiveHash = hash ? hash.replace(/^#/, '') : ''
    const target = effectiveHash ? `#${effectiveHash}` : (state?.scrollTo ?? null)

    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    let cancelled = false
    const attempt = (i) => {
      if (cancelled) return
      if (scrollToSection(target, { smooth })) return
      if (i >= RETRY_DELAYS_MS.length) return
      const t = setTimeout(() => attempt(i + 1), RETRY_DELAYS_MS[i])
      timersRef.current.push(t)
    }

    const delay = effectiveHash ? INITIAL_DELAY_WHEN_HASH_MS : INITIAL_DELAY_MS
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
