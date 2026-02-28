import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import TiltCard from './TiltCard'
import SectionReveal, { RevealItem } from './SectionReveal'
import { insights as content } from '../data/content'

export default function InsightsSection() {
  return (
    <section id="insights" className="py-section lg:py-section-lg bg-white z-[6]">
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
          <RevealItem>
            <p className="mt-6 text-gray-600 text-sm md:text-base max-w-wide mx-auto leading-relaxed">
              {content.intro}
            </p>
          </RevealItem>
        </SectionReveal>

        <SectionReveal className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch" staggerDelay={0.08}>
          {content.items.map((item) => (
            <RevealItem key={item.id} className="h-full">
              <TiltCard intensity={6} className="group h-full">
                <article className="p-7 md:p-8 rounded-lg border border-gray-200/80 hover:border-primary/25 hover:shadow-card transition-all duration-300 h-full min-h-[200px] flex flex-col text-center">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{item.tag}</span>
                  <h3 className="content-h3 mt-3">{item.title}</h3>
                  <p className="mt-4 text-[15px] text-gray-600 leading-relaxed flex-grow">{item.excerpt}</p>
                </article>
              </TiltCard>
            </RevealItem>
          ))}
        </SectionReveal>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
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
