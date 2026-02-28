import { m } from 'framer-motion'
import TiltCard from './TiltCard'
import SectionReveal, { RevealItem } from './SectionReveal'
import { industries as content } from '../data/content'
import { scrollToSection } from '../utils/scroll'

const industryIcons = {
  mineria: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l4-2 4-2 4 2 4-2V5a2 2 0 00-2-2h-2" /></svg>
  ),
  agro: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  ),
  consumo: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  ),
  banca: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  retail: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
  ),
}

export default function IndustriesSection() {
  return (
    <section id="industrias" className="py-section lg:py-section-lg bg-gray-50/60 z-[4]">
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

        <SectionReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch" staggerDelay={0.06}>
          {content.items.map((item) => (
            <RevealItem key={item.id} className="h-full">
              <TiltCard intensity={6} className="group h-full">
                <div className="p-6 bg-white rounded-sm border border-gray-200/80 hover:border-primary/30 hover:shadow-card transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start gap-4 flex-1 min-h-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                      {industryIcons[item.id] || industryIcons.agro}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="content-h3">{item.name}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1 min-h-[3.5rem]">{item.desc}</p>
                      <p className="mt-3 text-xs text-primary font-medium flex-shrink-0">{item.casePreview}</p>
                    </div>
                  </div>
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
          className="mt-10 text-center"
        >
          <a
            href="#recomendaciones"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#recomendaciones')
            }}
            className="capability-link"
          >
            Ver casos de impacto
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </m.div>
      </div>
    </section>
  )
}
