import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { m, useScroll, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'
import HeroWordReveal from './HeroWordReveal'
import HeroParticles from './HeroParticles'
import { analytics } from '../utils/analytics'
import { scrollToSection } from '../utils/scroll'
import { hero as content } from '../data/content'

export default function Hero() {
  const ref = useRef(null)
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
    // Si el scroll pasa a un contenedor (ej. .page-view), especificar container en options.
  })
  const yScroll = useTransform(scrollYProgress, [0, 1], [0, 80])
  const scaleScroll = useTransform(scrollYProgress, [0, 0.5], [1, 1.04])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grain overlay sutil - textura boutique */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay" aria-hidden>
        <div className="grain-texture absolute inset-0" />
      </div>

      <m.div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center hero-ken-burns"
        style={{
          backgroundImage: "url('/images/hero_1.jpg')",
          y: yScroll,
          scale: scaleScroll,
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(23,77,77,0.45) 0%, rgba(23,77,77,0.58) 50%, rgba(23,77,77,0.72) 100%)',
        }}
      />
      <HeroParticles />

      <m.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-20 flex flex-col items-center"
      >
        <h1 aria-label={content.title} className="text-hero font-serif font-normal text-white text-center tracking-normal max-w-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <HeroWordReveal text={content.title} delay={0.15} />
        </h1>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 md:mt-8 max-w-2xl text-lead text-white text-center leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
        >
          {content.subtitle}
        </m.p>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.15 }}
          className="mt-6 text-base text-white/90 text-center max-w-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        >
          {content.tagline}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-12 flex flex-col items-center gap-5"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <MagneticButton>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault()
                  analytics.ctaClick(content.ctaPrimary, 'hero')
                  navigate({ pathname: '/', hash: 'contacto' })
                  scrollToSection('#contacto')
                }}
                className="inline-flex items-center justify-center min-w-[200px] px-10 py-4 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
              >
                {content.ctaPrimary}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault()
                  analytics.ctaClick(content.ctaSecondary, 'hero')
                  scrollToSection('#servicios')
                }}
                className="inline-flex items-center justify-center min-w-[200px] px-10 py-4 bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-white/60 hover:border-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
              >
                {content.ctaSecondary}
              </a>
            </MagneticButton>
          </div>
        </m.div>

        <m.a
          href="#que-hacemos"
          aria-label="Ir a la siguiente sección"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('#que-hacemos')
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase">{content.scrollLabel}</span>
          <m.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="block w-4 h-6 border border-white/40 rounded-full flex items-start justify-center pt-1.5 group-hover:border-white/60"
          >
            <span className="w-px h-1.5 bg-white/60 rounded-full" />
          </m.span>
        </m.a>
      </m.div>
    </section>
  )
}
