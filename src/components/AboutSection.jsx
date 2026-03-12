/**
 * Sección Quiénes somos. Contenido y mensajes de interfaz en español.
 */
import { Mail, MessageCircle, Linkedin, Calendar, Briefcase, Building2, Globe, GraduationCap } from 'lucide-react'
import { analytics } from '../utils/analytics'
import { about as content } from '../data/content'
import { scrollToSection } from '../utils/scroll'
import {
  CONTACT_EMAIL,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  LINKEDIN_URL,
  LINKEDIN_HANDLE,
  CALENDAR_BOOKING_URL,
} from '../config'

export default function AboutSection() {
  const handleCtaClick = () => {
    analytics.ctaClick('Agendar conversación', 'about')
    scrollToSection('#contacto')
  }

  const statIcons = {
    'stat-exp': Briefcase,
    'stat-multi': Building2,
    'stat-industries': Globe,
    'stat-mit': GraduationCap,
  }

  return (
    <section
      id="quienes-somos"
      className="relative py-10 lg:py-12 bg-gradient-to-b from-gray-50/80 to-white z-[2]"
    >
      <div className="container-premium">
        {/* Encabezado compacto: contenido visible de inmediato */}
        <div className="text-center mb-10">
          <p className="section-eyebrow text-primary">{content.heading}</p>
          <h2 className="section-title text-3xl sm:text-4xl text-gray-900">{content.subheading}</h2>
          <div className="section-divider mt-5" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Tarjeta de identidad: foto + credenciales unificadas */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden mb-8">
            <div className="flex flex-col lg:flex-row">
              {/* Foto + nombre */}
              <div className="flex items-center gap-5 p-6 lg:p-8 lg:border-r border-gray-100">
                <img
                  src="/images/profile.jpg"
                  alt={content.profileName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top ring-2 ring-primary/15 ring-offset-2 ring-offset-white shadow-sm shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 whitespace-nowrap">{content.profileName}</h3>
                  <p className="text-primary font-medium text-sm mt-0.5 whitespace-nowrap">{content.profileRole}</p>
                  <p className="text-primary font-semibold text-sm">{content.profileCompany}</p>
                  <p className="text-gray-500 text-xs mt-1">{content.profileLocation}</p>
                </div>
              </div>
              {/* Estadísticas en grid ordenado con iconos */}
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {content.statsBar.map((stat) => {
                  const Icon = statIcons[stat.id]
                  return (
                    <div key={stat.id} className="p-4 lg:p-6 flex flex-col items-center text-center min-h-[7.5rem] justify-center">
                      {Icon && (
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2 text-primary shrink-0">
                          <Icon className="w-4 h-4" strokeWidth={2} />
                        </div>
                      )}
                      <span className="text-primary font-bold text-xl lg:text-2xl">{stat.value}</span>
                      <span className="text-gray-600 text-sm mt-0.5">{stat.label}</span>
                      {stat.labelDetail ? (
                        <p className="text-gray-400 text-xs mt-1.5 leading-snug max-w-[9rem] mx-auto line-clamp-2">
                          {stat.labelDetail}
                        </p>
                      ) : (
                        <span className="mt-1.5 h-5 block" aria-hidden />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Experiencia */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 lg:p-8 mb-6">
            <h3 className="content-h3 text-lg text-gray-900 mb-4">{content.experienceTitle}</h3>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed text-justify">
              {content.experienceText1}
            </p>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed text-justify">
              {content.experienceText2}
            </p>
            <div className="mt-6 relative pl-[6.5rem]">
              {/* Línea vertical continua y uniforme */}
              <div
                className="absolute left-[6.5rem] top-6 bottom-6 w-px bg-primary/20 -translate-x-1/2"
                aria-hidden
              />
              {content.timelineDetailed.map((hito, i) => (
                <div key={`${hito.yearFrom}-${hito.company}`} className="flex gap-4 py-4 last:pb-0 group relative">
                  <div className="absolute -left-[6.5rem] w-[5.5rem] text-right pt-0.5">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-primary/5 text-primary font-mono text-xs font-bold whitespace-nowrap group-hover:bg-primary/10 transition-colors">
                      {hito.yearFrom} → {hito.yearTo}
                    </span>
                  </div>
                  <div className="min-w-0 pl-4 relative">
                    <span className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/50 ring-2 ring-white" aria-hidden />
                    <p className="font-semibold text-gray-900 text-sm">{hito.company}</p>
                    <p className="text-gray-500 text-xs">{hito.role}</p>
                    <p className="text-gray-600 text-xs leading-relaxed text-justify mt-1">
                      {hito.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 text-gray-600 text-sm leading-relaxed text-justify">
              {content.consultingCallout}
            </div>
          </div>

          {/* Formación */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 lg:p-8 mb-6">
            <h3 className="content-h3 text-lg text-gray-900 mb-4">{content.formationTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.estudios.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-primary/25 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
                    <img
                      src={item.logo}
                      alt={`Logo ${item.place}`}
                      className="w-8 h-8 object-contain opacity-90"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-primary text-xs font-medium mt-0.5">{item.years}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.place}</p>
                    {item.location && (
                      <p className="text-gray-500 text-xs mt-0.5">{item.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filosofía */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 lg:p-8 mb-6">
            <blockquote className="border-l-4 border-primary/50 bg-primary/[0.03] -mx-6 px-6 py-3 rounded-r-lg">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify italic">
                &ldquo;{content.quote}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Contacto y CTAs */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-card p-6 lg:p-8">
            <h3 className="content-h3 text-lg text-gray-900 mb-4">Contacto</h3>
            <div className="flex flex-wrap gap-3">
              {CONTACT_EMAIL && (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {CONTACT_EMAIL}
                </a>
              )}
              {WHATSAPP_URL && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  {WHATSAPP_DISPLAY || 'WhatsApp'}
                </a>
              )}
              {LINKEDIN_URL && (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                  linkedin.com/in/{LINKEDIN_HANDLE || 'cristianhranalytics'}
                </a>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleCtaClick}
                className="btn-primary"
              >
                {content.ctaAgendar}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              {CALENDAR_BOOKING_URL && (
                <a
                  href={CALENDAR_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.ctaClick('Agendar en calendario', 'about')}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {content.ctaCalendar}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
