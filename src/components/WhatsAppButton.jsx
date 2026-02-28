import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { analytics } from '../utils/analytics'
import SocialIcon from './SocialIcon'
import { WHATSAPP_URL } from '../config'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          onClick={() => analytics.whatsappClick('floating')}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-4 md:right-6 z-40 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
        >
          <m.div
            animate={hovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <SocialIcon type="message" className="w-6 h-6 text-white" />
          </m.div>
          <m.span
            initial={{ width: 0, opacity: 0 }}
            animate={hovered ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
            className="overflow-hidden whitespace-nowrap font-medium text-sm"
          >
            {'\u00BFHablamos?'}
          </m.span>
        </m.a>
      )}
    </AnimatePresence>
  )
}
