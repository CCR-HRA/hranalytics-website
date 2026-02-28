import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import SocialIcon from './SocialIcon'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { navLinks, socialLinks } from './header/constants'
import { getMegaMenuData } from '../data/servicesCatalog'
import MegaMenuPanel from './header/MegaMenuPanel'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(null)
  const [_mobileMegaOpen, setMobileMegaOpen] = useState(null)

  const megaCloseTimer = useRef(null)
  const isMountedRef = useRef(true)
  const menuButtonRef = useRef(null)
  const megaTriggerRef = useRef(null)
  const prevMobileMenuOpen = useRef(false)
  const headerRef = useRef(null)
  const [headerHeightPx, setHeaderHeightPx] = useState(null)

  const isHome = pathname === '/'

  // Delay aumentado a 250ms para evitar parpadeos y "zonas muertas" del mouse
  const scheduleMegaClose = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current)
    megaCloseTimer.current = window.setTimeout(() => {
      if (isMountedRef.current) setMegaOpen(null)
      megaCloseTimer.current = null
    }, 250)
  }

  const cancelMegaClose = () => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current)
      megaCloseTimer.current = null
    }
  }

  const sectionSelectors = useMemo(
    () => ['#inicio', '#servicios', '#industrias', '#que-hacemos', '#quienes-somos', '#recomendaciones', '#contacto'],
    []
  )
  const scrollSpyActive = useScrollSpy(sectionSelectors, 120, { enabled: isHome })
  const activeSection = isHome ? scrollSpyActive : pathname

  const isHrOrChildActive = pathname === '/propuesta-de-valor' || pathname === '/nuestro-enfoque' || activeSection === '#que-hacemos'
  const useLightText = true

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!isHome) {
      cancelMegaClose()
      queueMicrotask(() => setMegaOpen(null))
    }
  }, [isHome])

  useEffect(() => {
    if (prevMobileMenuOpen.current && !mobileMenuOpen) {
      menuButtonRef.current?.focus()
    }
    prevMobileMenuOpen.current = mobileMenuOpen
  }, [mobileMenuOpen])

  // Hysteresis (60 / 40) evita parpadeo al cruzar el umbral; rAF reduce repaints
  useEffect(() => {
    const THRESHOLD_ON = 60
    const THRESHOLD_OFF = 40
    let rafId = null
    const handleScroll = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled((prev) => (y >= THRESHOLD_ON ? true : y <= THRESHOLD_OFF ? false : prev))
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const measure = () => setHeaderHeightPx(el.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    setHeaderHeightPx(el.getBoundingClientRect().height)
  }, [scrolled])

  useEffect(() => {
    if (headerHeightPx != null) {
      document.documentElement.style.setProperty('--header-height', `${headerHeightPx}px`)
    }
  }, [headerHeightPx])

  const closeMenus = () => {
    cancelMegaClose()
    setMobileMenuOpen(false)
    setMobileMegaOpen(null)
    setMegaOpen(null)
  }

  // Lógica simplificada: delegamos la navegación a React Router
  const handleNavClick = (href) => {
    closeMenus()
    if (!href) return
    if (href.startsWith('#')) navigate({ pathname: '/', hash: href.slice(1) })
    else if (href.startsWith('/')) navigate(href)
  }

  const handleMobileMenuKeyDown = (e) => {
    if (e.key === 'Escape') closeMenus()
  }

  const enfoqueLink = navLinks.find((l) => l.children?.length)
  const megaItems = {
    services: getMegaMenuData(),
    enfoque: enfoqueLink?.children ?? [],
  }
  const megaTitles = Object.fromEntries(
    navLinks.filter((l) => l.mega).map((l) => [l.mega, l.label])
  )
  Object.assign(megaTitles, enfoqueLink ? { enfoque: enfoqueLink.label } : {})

  const isDropdownActive = !!megaOpen
  const headerSolid = scrolled || isDropdownActive || !isHome
  const headerHeightCss = headerHeightPx != null ? `${headerHeightPx}px` : '5.5rem'

  return (
    <header
      ref={headerRef}
      style={{ '--header-height': headerHeightCss }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        headerSolid
          ? 'bg-navy py-3 border-b border-white/10 backdrop-blur-sm'
          : 'bg-navy/40 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container-premium">
        <AnimatePresence>
          {megaOpen && (
            <m.div
              key="mega-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
              className="fixed inset-x-0 bottom-0 z-[48] bg-black/30"
              style={{ top: 'var(--header-height, 5.5rem)' }}
              onClick={closeMenus}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <div className="relative z-[49] flex items-center justify-between">
          <Link to="/" onClick={closeMenus} className="flex items-center">
            <img
              src={useLightText ? '/logo-white.png' : '/logo-teal.png'}
              alt="HR Analytics"
              className="h-12 md:h-14 object-contain transition-transform hover:scale-105 duration-200"
              loading="lazy"
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-6" aria-label="Navegación principal">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const hasMega = link.mega && megaItems[link.mega]?.length > 0
                const hasChildren = link.children?.length
                const isActive = hasMega
                  ? (link.mega === 'industries' ? activeSection === '#industrias' : link.mega === 'services' ? activeSection === '#servicios' : isHrOrChildActive)
                  : hasChildren
                    ? isHrOrChildActive
                    : (activeSection === link.href || (link.path && activeSection === link.path))

                const to = link.href?.startsWith('/') ? link.href : { pathname: '/', hash: link.href?.replace(/^#/, '') || '' }

                const linkClasses = `text-sm font-medium transition-all duration-200 relative px-3 py-2 -mx-1 rounded inline-flex items-center gap-1 text-white hover:text-primary-light ${isActive ? 'text-primary-light bg-white/10' : ''}`

                if (hasMega || hasChildren) {
                  const triggerMega = hasMega ? link.mega : 'enfoque'
                  const panelItems = megaItems[triggerMega]
                  return (
                    <li
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => { cancelMegaClose(); setMegaOpen(triggerMega) }}
                      onMouseLeave={scheduleMegaClose}
                    >
                      <Link
                        ref={megaOpen === triggerMega ? megaTriggerRef : undefined}
                        to={to}
                        onClick={(e) => {
                          if (hasMega) { e.preventDefault(); setMegaOpen(megaOpen === triggerMega ? null : triggerMega); }
                          else { handleNavClick(link.href) }
                        }}
                        aria-expanded={megaOpen === triggerMega}
                        className={linkClasses}
                      >
                        {link.label}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {isActive && <m.span layoutId={`nav-indicator-${triggerMega}`} className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary-light rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                      </Link>
                      <AnimatePresence mode="wait">
                        {megaOpen === triggerMega && panelItems?.length > 0 && (
                          <MegaMenuPanel
                            key={triggerMega}
                            type={triggerMega}
                            items={panelItems}
                            title={megaTitles[triggerMega]}
                            scrolled={scrolled || isDropdownActive}
                            returnFocusRef={megaTriggerRef}
                            onHashClick={(e) => {
                              const href = e.currentTarget.getAttribute('href')
                              handleNavClick(href)
                            }}
                            onClose={closeMenus}
                            onMouseEnter={() => { cancelMegaClose(); setMegaOpen(triggerMega) }}
                            onMouseLeave={scheduleMegaClose}
                          />
                        )}
                      </AnimatePresence>
                    </li>
                  )
                }

                return (
                  <li key={link.href} className="relative">
                    <Link to={to} onClick={() => handleNavClick(link.href)} className={linkClasses}>
                      {link.label}
                      {isActive && <m.span layoutId="nav-indicator" className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-primary-light" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center gap-4 pl-6 border-l border-white/20">
              {socialLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel ?? link.label} className="w-9 h-9 flex items-center justify-center rounded-lg hover:opacity-80 transition-all">
                  <SocialIcon type={link.iconType} className="w-5 h-5 text-white opacity-90" />
                </a>
              ))}
            </div>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <m.svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.2 }}>
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
            </m.svg>
          </button>
        </div>

        {/* Menú Móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden mt-4 pb-4 overflow-hidden bg-navy/98 backdrop-blur-md rounded-xl -mx-2 px-4"
            >
              <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
                <div onKeyDown={handleMobileMenuKeyDown}>
                  <ul className="space-y-1">
                    {navLinks.map((link, i) => {
                      const to = link.href?.startsWith('/') ? link.href : { pathname: '/', hash: link.href?.replace(/^#/, '') || '' }
                      return (
                        <m.li key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}>
                          <Link to={to} onClick={() => handleNavClick(link.href)} className="block text-white font-medium py-3 px-3 rounded-lg hover:bg-white/5 transition-colors">
                            {link.label}
                          </Link>
                        </m.li>
                      )
                    })}
                  </ul>
                </div>
              </FocusTrap>
            </m.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
