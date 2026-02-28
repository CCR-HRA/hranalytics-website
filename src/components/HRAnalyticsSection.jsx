import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import SectionReveal, { RevealItem } from './SectionReveal'
import { scrollToSection } from '../utils/scroll'
import { trustBar as trustContent, hranalytics as content } from '../data/content'

export default function HRAnalyticsSection() {
  return (
    <section id="que-hacemos" className="py-section lg:py-section-lg bg-white relative z-[1]">
      <div className="container-premium">
        <div className="max-w-content mx-auto">
          <SectionReveal className="section-header">
            <RevealItem>
              <p className="section-eyebrow text-primary">{content.eyebrow}</p>
            </RevealItem>
            <RevealItem>
              <h2 className="section-title text-gray-900">{content.heading}</h2>
            </RevealItem>
            <RevealItem>
              <div className="section-divider mt-6 mb-8" />
            </RevealItem>
            <RevealItem>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                {content.body}
              </p>
            </RevealItem>
            <RevealItem>
            <nav className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8" aria-label="Temas de HR Analytics">
              {content.cascadeLinks.map((link) => (
                <Link
                  key={link.to}
                    to={link.to}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/5 border border-primary/20 text-primary font-semibold text-sm hover:bg-primary/10 hover:border-primary/40 hover:text-primary-dark transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {link.label}
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
              ))}
              </nav>
            </RevealItem>
            <RevealItem>
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#servicios')
              }}
              className="btn-primary"
            >
              {content.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            </RevealItem>
          </SectionReveal>

          {/* Nos respaldan */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-12 border-t border-gray-100"
          >
            <p className="text-center section-eyebrow text-primary/70 mb-6">
              {trustContent.heading}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
              {trustContent.items.map((item) => (
                <div key={item.id} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary tracking-tight">{item.value}</p>
                  <p className="mt-2 text-xs md:text-sm text-gray-600 leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
