import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { analytics } from '../utils/analytics'
import { scrollToSection } from '../utils/scroll'

const SCROLL_THRESHOLD = 300

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    analytics.ctaClick('Conversemos (sticky)', 'sticky_mobile_cta')
    if (pathname === '/') {
      scrollToSection('#contacto')
    } else {
      navigate({ pathname: '/', hash: 'contacto' })
    }
  }

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[50] p-3 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <a
        href="#contacto"
        onClick={handleClick}
        className="block w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Conversemos
      </a>
    </div>
  )
}
