import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { WHATSAPP_URL, CALENDAR_BOOKING_URL } from '../config'
import { analytics } from '../utils/analytics'
import { faq as content } from '../data/content'

export default function FAQSection() {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="faq" className="py-section lg:py-section-lg bg-white z-[9]">
      <div className="container-premium">
        <div className="section-header">
          <p className="section-eyebrow text-primary">
            {content.eyebrow}
          </p>
          <h2 className="section-title text-gray-900">
            {content.heading}
          </h2>
          <div className="section-divider mt-6" />
          <p className="mt-6 text-gray-600 text-sm md:text-base max-w-prose mx-auto leading-relaxed">
            {content.intro}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {content.items.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-gray-100/80 overflow-hidden shadow-elegant hover:shadow-card transition-all duration-300"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
                id={`faq-question-${faq.id}`}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded-2xl"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <m.span
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  className="flex-shrink-0 text-primary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </m.span>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <m.div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl border border-primary/10 shadow-soft px-6 py-7 text-center">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-primary mb-2">
            {content.ctaTitle}
          </p>
          <p className="text-gray-700 mb-5">
            {content.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.whatsappClick('faq_section')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {content.ctaWhatsApp}
            </a>
            {CALENDAR_BOOKING_URL && (
              <a
                href={CALENDAR_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary/20 text-primary font-semibold rounded-lg bg-white hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {content.ctaCalendar}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
