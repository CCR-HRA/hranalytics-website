import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { navLinks } from './header/constants'
import { scrollToSection } from '../utils/scroll'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false))
    return () => cancelAnimationFrame(id)
  }, [location.pathname, location.hash])

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

  const handleSectionClick = (href) => {
    if (href === '#inicio') {
      scrollTop()
      return
    }
    if (href.startsWith('#')) {
      navigate({ pathname: '/', hash: href.slice(1) })
      requestAnimationFrame(() => scrollToSection(href))
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
                className="bg-white rounded-lg shadow-professional border border-gray-100 py-1 w-max max-w-[160px] max-h-[60vh] overflow-y-auto"
              >
                <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  Ir a página
                </p>
                <button
                  onClick={scrollTop}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3 h-3 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Volver arriba
                </button>
                <div className="border-t border-gray-100 my-0.5" />
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleSectionClick(link.href)}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
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
            aria-label={open ? 'Cerrar menú de navegación' : 'Ir a página'}
            aria-expanded={open}
          >
            <svg className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </m.button>
        </div>
      )}
    </AnimatePresence>
  )
}
