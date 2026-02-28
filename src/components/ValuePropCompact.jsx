import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import TiltCard from './TiltCard'
import SectionReveal, { RevealItem } from './SectionReveal'
import { valueProposition as content } from '../data/content'

export default function ValuePropCompact() {
  return (
    <section className="py-section lg:py-section-lg bg-gray-50/60 z-[2]">
      <div className="container-premium">
        <SectionReveal className="section-header">
          <RevealItem>
            <p className="section-eyebrow text-primary">{content.heading}</p>
          </RevealItem>
          <RevealItem>
            <h2 className="section-title text-gray-900">{content.subheading}</h2>
          </RevealItem>
          <RevealItem>
            <div className="section-divider mt-6" />
          </RevealItem>
        </SectionReveal>

        <SectionReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch" staggerDelay={0.07}>
          {content.items.map((item) => (
            <RevealItem key={item.title} className="h-full">
              <TiltCard intensity={5} className="group h-full">
                <div className="p-6 md:p-7 bg-white rounded-lg border border-gray-200/80 hover:border-primary/25 hover:shadow-card transition-all duration-300 h-full flex flex-col text-center">
                  <h3 className="content-h3 flex-shrink-0">{item.title}</h3>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed line-clamp-3 flex-1 min-h-[3.5rem] hyphens-none">{item.description}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </SectionReveal>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link to="/propuesta-de-valor" className="capability-link">
            Ver propuesta de valor completa
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </m.div>
      </div>
    </section>
  )
}
