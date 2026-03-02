import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { getMegaMenuData } from '../data/servicesCatalog'

/** Icono de cuadrícula (3x2) para "otros servicios" */
function GridIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServicesNavButton() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [expandedPillars, setExpandedPillars] = useState(() => new Set())
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const currentHash = location.hash?.replace(/^#/, '') ?? ''

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false))
    return () => cancelAnimationFrame(id)
  }, [location.pathname, location.hash])

  const megaData = getMegaMenuData()

  // Al abrir el menú: expandir el pilar que contiene el servicio actual (por hash)
  useEffect(() => {
    if (!open) return
    const data = getMegaMenuData()
    const currentGroup = data.find((g) => g.items.some((i) => i.path === `/servicios#${currentHash}`))
    const id = requestAnimationFrame(() => {
      setExpandedPillars((prev) => {
        const next = new Set(prev)
        if (currentGroup) next.add(currentGroup.category)
        else if (data[0]) next.add(data[0].category)
        return next
      })
    })
    return () => cancelAnimationFrame(id)
  }, [open, currentHash])

  const togglePillar = (category) => {
    setExpandedPillars((prev) => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  const handleServiceClick = (pathOrHash) => {
    if (pathOrHash === '/#servicios') {
      navigate({ pathname: '/', hash: 'servicios' })
    } else {
      navigate(pathOrHash)
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <div ref={menuRef} className="fixed bottom-24 left-4 md:bottom-6 md:left-6 z-40 flex flex-col items-end gap-2">
          <AnimatePresence>
            {open && (
              <m.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-white rounded-lg shadow-professional border border-gray-100 py-1 min-w-[200px] max-w-[85vw] sm:max-w-[320px] max-h-[60vh] overflow-x-auto overflow-y-auto"
              >
                <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  Ir a otro servicio
                </p>
                <button
                  onClick={scrollTop}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <svg className="w-3 h-3 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Volver arriba
                </button>
                <button
                  onClick={() => handleServiceClick('/#servicios')}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <svg className="w-3 h-3 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Ver todos los servicios
                </button>
                <div className="border-t border-gray-100 my-0.5" />
                {megaData.map((group) => {
                  const isExpanded = expandedPillars.has(group.category)
                  return (
                    <div key={group.category} className="border-b border-gray-50 last:border-b-0">
                      <button
                        type="button"
                        onClick={() => togglePillar(group.category)}
                        className="w-full text-left px-2.5 py-1.5 text-[10px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors flex items-center justify-between gap-2"
                        aria-expanded={isExpanded}
                      >
                        <span className="whitespace-nowrap truncate">{group.category}</span>
                        <svg
                          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12 }}
                          >
                            {group.items.map((item) => {
                              const itemSlug = item.path?.split('#')[1]
                              const isCurrent = location.pathname === '/servicios' && currentHash === itemSlug
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => handleServiceClick(item.path)}
                                  disabled={isCurrent}
                                  className={`w-full text-left pl-4 pr-2.5 py-1.5 text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                                    isCurrent
                                      ? 'text-gray-400 cursor-default'
                                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                                  }`}
                                >
                                  {isCurrent && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                                  )}
                                  {item.label}
                                </button>
                              )
                            })}
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </m.div>
            )}
          </AnimatePresence>
          <m.button
            onClick={() => setOpen((prev) => !prev)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full shadow-professional flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 transition-colors ${
              open ? 'bg-primary-dark text-white' : 'bg-primary hover:bg-primary-dark text-white'
            }`}
            aria-label={open ? 'Cerrar menú de servicios' : 'Ver otros servicios'}
            aria-expanded={open}
          >
            <GridIcon className={`w-5 h-5 ${open ? 'scale-110' : ''}`} />
          </m.button>
        </div>
      )}
    </AnimatePresence>
  )
}
