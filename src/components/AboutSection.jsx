import { analytics } from '../utils/analytics'
import SocialIcon from './SocialIcon'
import AnimatedCounter from './AnimatedCounter'
import { CALENDAR_BOOKING_URL, SOCIAL_LINKS } from '../config'
import { about as content } from '../data/content'
import { scrollToSection } from '../utils/scroll'

function StatsBarAnimated({ stats }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white shadow-card border border-primary-dark/20 px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <AnimatedCounter
            key={stat.id ?? i}
            value={stat.value}
            label={stat.label}
            labelDetail={stat.labelDetail}
            duration={1.2}
            variant="statsBar"
            className="text-center md:border-r md:border-white/10 last:md:border-r-0 px-2"
          />
        ))}
      </div>
    </div>
  )
}

const socialLinks = SOCIAL_LINKS

export default function AboutSection() {
  return (
    <section id="quienes-somos" className="relative py-section lg:py-section-lg bg-gray-50/50 overflow-hidden z-[2]">
      <div className="container-premium">
        {/* Header */}
        <div className="section-header">
          <p className="section-eyebrow text-primary">
            {content.heading}
          </p>
          <h2 className="section-title text-gray-900">
            {content.subheading}
          </h2>
          <div className="section-divider mt-6" />
        </div>

        {/* Card 1: Profile */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-elegant border border-gray-100/80 overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-2 ring-gray-100">
                  <img src="/images/profile.jpg" alt="Cristian Cornejo" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900">{content.profileName}</h3>
                <p className="text-primary text-sm font-medium mt-0.5">{content.profileRole}</p>
                <p className="text-gray-600 text-sm mt-2">{content.profileLocation}</p>
                {/* Contacto compacto inline */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      <SocialIcon type={link.iconType} className="w-4 h-4 text-current" />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault()
                      analytics.ctaClick('Agendar conversación', 'about')
                      scrollToSection('#contacto')
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    {content.ctaAgendar}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                  {CALENDAR_BOOKING_URL && (
                    <a
                      href={CALENDAR_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.ctaClick('Agendar reunión', 'about')}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-primary border border-primary hover:bg-primary/5 text-sm font-semibold rounded-lg transition-colors"
                    >
                      {content.ctaCalendar}
                      <SocialIcon type="calendar" className="w-4 h-4 text-current" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Acerca de + Cita */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-elegant border border-gray-100/80 p-6 md:p-8">
            <h3 className="content-h3 text-lg mb-4">{content.aboutTitle}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5 text-justify hyphens-none">
              {content.aboutText}
            </p>
            <blockquote className="blockquote-section text-base text-justify hyphens-none">
              {content.quote}
            </blockquote>
          </div>
        </div>

        {/* Card 3: Experiencia */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-elegant border border-gray-100/80 p-6 md:p-8">
            <h3 className="content-h3 text-lg mb-4">{content.experienceTitle}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3 text-justify hyphens-none">
              {content.experienceText1}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-justify hyphens-none">
              {content.experienceText2}
            </p>
            <div className="relative">
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200 hidden sm:block" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {content.timeline.map((item) => (
                  <div
                    key={item.year}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0 mb-3 relative z-10 border-2 border-white shadow" />
                    <span className="text-primary font-bold text-sm">{item.year}</span>
                    <p className="font-semibold text-gray-900 text-sm mt-0.5">{item.company}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Formación */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-elegant border border-gray-100/80 p-6 md:p-8">
            <h3 className="content-h3 text-lg mb-5">{content.formationTitle}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-stretch">
              {content.estudios.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 hover:-translate-y-0.5 transition-all duration-200 h-full"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-100 mb-3 flex items-center justify-center p-1">
                    <img src={item.logo} alt={item.place} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-primary text-sm font-medium mt-1">{item.years}</p>
                  <p className="text-gray-700 text-xs mt-0.5 line-clamp-1">{item.place}</p>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{item.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar con contadores animados */}
        <StatsBarAnimated stats={content.statsBar} />
      </div>
    </section>
  )
}
