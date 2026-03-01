import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import SocialIcon from './SocialIcon'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { navLinks, socialLinks } from './header/constants'
import { getMegaMenuData } from '../data/servicesCatalog'
import MegaMenuPanel from './header/MegaMenuPanel'
import { scrollToSection } from '../utils/scroll'

export default function Header() {
  const { pathname, hash: locationHash } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(null)
  const [mobileMegaOpen, setMobileMegaOpen] = useState(null)

  const megaCloseTimer = useRef(null)
  const chevronHandledRef = useRef(false)
  const chevronTimerRef = useRef(null)
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

  // Orden igual al DOM en HomePage: inicio → servicios → industrias → recomendaciones → que-hacemos → quienes-somos → contacto
  const sectionSelectors = useMemo(
    () => ['#inicio', '#servicios', '#industrias', '#recomendaciones', '#que-hacemos', '#quienes-somos', '#contacto'],
    []
  )
  const scrollSpyActive = useScrollSpy(sectionSelectors, 120, { enabled: isHome })
  // Hash tiene prioridad al hacer clic para que el ítem activo coincida de inmediato (desktop y menú hamburguesa)
  const activeSection = isHome
    ? (locationHash ? (locationHash.startsWith('#') ? locationHash : `#${locationHash}`) : scrollSpyActive)
    : pathname

  const isHrOrChildActive = pathname === '/propuesta-de-valor' || pathname === '/nuestro-enfoque' || activeSection === '#que-hacemos'
  const useLightText = true

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current)
      if (chevronTimerRef.current) clearTimeout(chevronTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isHome) {
      cancelMegaClose()
      queueMicrotask(() => setMegaOpen(null))
    }
  }, [isHome])

  // Cerrar mega menú al redimensionar por debajo de lg (1024px): el trigger está oculto
  // pero el portal sigue visible, causando solapamiento con el menú móvil.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = () => {
      if (!mq.matches) setMegaOpen(null)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prevMobileMenuOpen.current && !mobileMenuOpen) {
      menuButtonRef.current?.focus()
    }
    prevMobileMenuOpen.current = mobileMenuOpen
  }, [mobileMenuOpen])

  // Scroll-lock: body overflow hidden cuando hay overlay (menú móvil o mega desktop).
  // Cleanup garantizado: siempre restauramos al valor anterior.
  const shouldLockScroll = mobileMenuOpen || !!megaOpen
  useEffect(() => {
    if (!shouldLockScroll) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev || ''
    }
  }, [shouldLockScroll])

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

  const toggleMobileMega = (key) => {
    setMobileMegaOpen((prev) => (prev === key ? null : key))
  }

  // Lógica simplificada: delegamos la navegación a React Router
  const handleNavClick = (href) => {
    closeMenus()
    if (!href) return
    if (href.startsWith('#')) {
      navigate({ pathname: '/', hash: href.slice(1) })
      // Si ya estamos en home, scroll inmediato (evita el delay de 850ms del ScrollManager)
      if (isHome) requestAnimationFrame(() => scrollToSection(href))
    } else if (href.startsWith('/')) {
      navigate(href)
    }
  }

  const handleMobileMenuKeyDown = (e) => {
    if (e.key === 'Escape') closeMenus()
  }

  const megaItems = { services: getMegaMenuData() }
  const megaTitles = Object.fromEntries(
    navLinks.filter((l) => l.mega).map((l) => [l.mega, l.label])
  )

  const isDropdownActive = !!megaOpen
  const headerSolid = scrolled || isDropdownActive || !isHome
  const headerHeightCss = headerHeightPx != null ? `${headerHeightPx}px` : '5.5rem'

  return (
    <header
      ref={headerRef}
      style={{
        '--header-height': headerHeightCss,
        paddingTop: 'env(safe-area-inset-top)',
        zIndex: megaOpen ? 101 : undefined,
      }}
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
              className="fixed inset-x-0 bottom-0 z-[48] bg-black/30 cursor-pointer"
              style={{ top: 'var(--header-height, 5.5rem)' }}
              onClick={closeMenus}
              role="button"
              tabIndex={-1}
              aria-label="Cerrar menú"
            />
          )}
        </AnimatePresence>

        <div className="relative z-[49] flex items-center justify-between">
          <Link to="/" onClick={closeMenus} className="flex items-center">
            <img
              src={useLightText ? '/logo-white.png' : '/logo-teal.png'}
              alt="HR Analytics"
              className="h-12 md:h-14 object-contain transition-transform hover:scale-105 duration-200"
              loading="eager"
              decoding="async"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación principal">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const hasMega = link.mega && megaItems[link.mega]?.length > 0
                const hasChildren = link.children?.length
                const isActive = hasMega
                  ? (link.mega === 'industries' ? activeSection === '#industrias' : link.mega === 'services' ? activeSection === '#servicios' : isHrOrChildActive)
                  : hasChildren
                    ? isHrOrChildActive
                    : (link.href === '#que-hacemos' ? isHrOrChildActive : (activeSection === link.href || (link.path && activeSection === link.path)))

                const to = link.href?.startsWith('/') ? link.href : { pathname: '/', hash: link.href?.replace(/^#/, '') || '' }

                const linkClasses = `text-sm font-medium transition-all duration-200 relative px-3 py-2 -mx-1 rounded inline-flex items-center gap-1 text-white hover:text-primary-light ${isActive ? 'text-primary-light bg-white/10' : ''}`

                if (hasMega || hasChildren) {
                  const triggerMega = hasMega ? link.mega : 'enfoque'
                  const panelItems = megaItems[triggerMega]
                  return (
                    <li
                      key={link.href}
                      className="relative inline-flex items-center"
                    >
                      <Link
                        to={to}
                        onClick={(e) => {
                          closeMenus()
                          if (link.href?.startsWith('#')) {
                            e.preventDefault()
                            handleNavClick(link.href)
                          }
                        }}
                        className={`${linkClasses} touch-manipulation min-h-[44px] inline-flex items-center shrink-0 cursor-pointer`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        ref={megaOpen === triggerMega ? megaTriggerRef : undefined}
                        onPointerDown={(e) => {
                          e.preventDefault()
                          if (chevronTimerRef.current) clearTimeout(chevronTimerRef.current)
                          chevronHandledRef.current = true
                          setMegaOpen((prev) => (prev === triggerMega ? null : triggerMega))
                          chevronTimerRef.current = setTimeout(() => {
                            chevronHandledRef.current = false
                            chevronTimerRef.current = null
                          }, 300)
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (chevronHandledRef.current) return
                          setMegaOpen((prev) => (prev === triggerMega ? null : triggerMega))
                        }}
                        aria-expanded={megaOpen === triggerMega}
                        aria-haspopup="true"
                        aria-label={megaOpen === triggerMega ? `Cerrar menú de ${link.label}` : `Abrir menú de ${link.label}`}
                        className="relative z-10 p-3 ml-1 rounded text-white hover:text-primary-light hover:bg-white/10 transition-colors touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer select-none shrink-0"
                      >
                        <svg className={`w-5 h-5 transition-transform duration-200 ${megaOpen === triggerMega ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isActive && <m.span layoutId={`nav-indicator-${triggerMega}`} className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-light rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                      {megaOpen === triggerMega && panelItems?.length > 0 &&
                        createPortal(
                          <MegaMenuPanel
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
                          />,
                          document.body
                        )}
                    </li>
                  )
                }

                return (
                  <li key={link.href} className="relative">
                    <Link to={to} onClick={() => handleNavClick(link.href)} className={linkClasses}>
                      {link.label}
                      {isActive && <m.span layoutId={`nav-indicator-${(link.href || '').replace(/^#/, '')}`} className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-primary-light" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
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
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 min-h-[44px] min-w-[44px] rounded-lg text-white hover:bg-white/10 transition-colors touch-manipulation"
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
              id="mobile-nav"
              aria-label="Menú de navegación"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 overflow-y-auto max-h-[85vh] max-h-[85dvh] bg-navy/98 backdrop-blur-md rounded-xl -mx-2 px-4 overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
                <div onKeyDown={handleMobileMenuKeyDown}>
                  <ul className="space-y-1">
                    {navLinks.map((link, i) => {
                      const hasMega = link.mega && megaItems[link.mega]?.length > 0
                      const hasChildren = link.children?.length
                      const hasSubmenu = hasMega || hasChildren
                      const triggerKey = hasMega ? link.mega : hasChildren ? 'enfoque' : null
                      const isActive = hasMega
                        ? (link.mega === 'industries' ? activeSection === '#industrias' : link.mega === 'services' ? activeSection === '#servicios' : isHrOrChildActive)
                        : hasChildren
                          ? isHrOrChildActive
                          : (link.href === '#que-hacemos' ? isHrOrChildActive : (activeSection === link.href || (link.path && activeSection === link.path)))
                      const to = link.href?.startsWith('/') ? link.href : { pathname: '/', hash: link.href?.replace(/^#/, '') || '' }
                      const isExpanded = mobileMegaOpen === triggerKey
                      const panelItems = triggerKey ? megaItems[triggerKey] : null

                      if (hasSubmenu && panelItems?.length > 0) {
                        const isCategorized = panelItems[0]?.category != null
                        const flatItems = isCategorized ? panelItems.flatMap((g) => g.items ?? []) : panelItems
                        return (
                          <m.li key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="space-y-0">
                            <div className="flex w-full items-center">
                              <Link
                                to={to}
                                onClick={(e) => {
                                  closeMenus()
                                  if (link.href?.startsWith('#')) {
                                    e.preventDefault()
                                    handleNavClick(link.href)
                                  }
                                }}
                                className={`flex-1 font-medium py-3 px-3 rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center cursor-pointer ${isActive ? 'text-primary-light bg-white/10' : 'text-white hover:bg-white/5'}`}
                              >
                                {link.label}
                              </Link>
                              <button
                                type="button"
                                onClick={() => toggleMobileMega(triggerKey)}
                                aria-expanded={isExpanded}
                                aria-controls={`mobile-submenu-${triggerKey}`}
                                aria-label={isExpanded ? `Cerrar menú de ${link.label}` : `Abrir menú de ${link.label}`}
                                className="p-3 rounded-lg transition-colors touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center shrink-0 text-white hover:bg-white/5"
                              >
                                <svg className={`w-5 h-5 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                            <div
                              id={`mobile-submenu-${triggerKey}`}
                              className={`overflow-hidden transition-[max-height] duration-200 ease-out ${isExpanded ? 'max-h-[800px]' : 'max-h-0'}`}
                            >
                              <ul className="pl-4 space-y-0 border-l-2 border-white/20 ml-3 pb-2">
                                  {isCategorized
                                    ? panelItems.map((group) => (
                                        <li key={group.category} className="pt-2">
                                          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">{group.category}</p>
                                          <ul className="space-y-1">
                                            {(group.items ?? []).map((item) => (
                                              <li key={item.id ?? item.href ?? item.label}>
                                                <Link
                                                  to={item.href}
                                                  onClick={closeMenus}
                                                  className="block py-3 px-2 text-sm text-white/90 hover:text-primary-light rounded-lg hover:bg-white/5 touch-manipulation min-h-[44px] flex items-center"
                                                >
                                                  {item.label}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </li>
                                      ))
                                    : flatItems.map((item) => (
                                        <li key={item.id ?? item.href ?? item.label}>
                                          <Link
                                            to={item.href}
                                            onClick={closeMenus}
                                            className="block py-3 px-2 text-sm text-white/90 hover:text-primary-light rounded-lg hover:bg-white/5 touch-manipulation min-h-[44px] flex items-center"
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                              </ul>
                            </div>
                          </m.li>
                        )
                      }

                      return (
                        <m.li key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}>
                          <Link
                            to={to}
                            onClick={() => handleNavClick(link.href)}
                            className={`block font-medium py-3 px-3 rounded-lg transition-colors ${isActive ? 'text-primary-light bg-white/10' : 'text-white hover:bg-white/5'}`}
                          >
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
