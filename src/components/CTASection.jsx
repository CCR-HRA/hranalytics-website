import { Link } from 'react-router-dom'
import { analytics } from '../utils/analytics'
import { CALENDAR_BOOKING_URL } from '../config'
import { cta as content } from '../data/content'
import { scrollToSection } from '../utils/scroll'

export default function CTASection() {
  return (
    <section className="py-section lg:py-section-lg bg-navy relative overflow-hidden z-[7]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative z-10 container-premium text-center">
        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-3xl mx-auto">
          {content.title}
        </h2>
        <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
          {content.subtitle}
        </p>
        <div className="flex flex-col items-center gap-4">
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault()
              analytics.ctaClick(content.buttonLabel, 'cta_section')
              scrollToSection('#contacto')
            }}
            className="inline-flex items-center justify-center px-12 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {content.buttonLabel}
          </a>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          {CALENDAR_BOOKING_URL && (
            <p className="text-white/80">
              o{' '}
              <a
                href={CALENDAR_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.ctaClick('Agendar (Calendar)', 'cta_section')}
                className="text-white/90 hover:text-white font-medium underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors duration-200"
                aria-label="Agendar reunión (abre en nueva pestaña)"
              >
                {content.calendarLinkText}
              </a>
            </p>
          )}
          <Link
            to="/propuesta-de-valor"
            className="text-white/80 hover:text-white font-medium underline underline-offset-4"
          >
            {content.secondaryCta}
          </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
