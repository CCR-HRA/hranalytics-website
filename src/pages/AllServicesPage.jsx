/**
 * Página de todos los servicios. Contenido y mensajes de interfaz en español.
 */
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import {
  Target, Users, TrendingDown, Map, Compass, GitBranch, Layout, BarChart2,
  MapPin, ShieldCheck, Grid, Network, ClipboardList, Code2, LayoutDashboard, Rocket,
  Database, Brain, CircuitBoard, Gauge, SlidersHorizontal, Sigma, AlertCircle, BadgeCheck,
  Calendar, Search, PieChart, LineChart, ScanEye, FlaskConical, Zap, MonitorDot,
  Stethoscope, TableProperties, Gift, FileCheck, Ruler, Building2, Scale, ArrowRightLeft,
  Code, Calculator, GitCompare, ScanSearch, Workflow, Terminal, PackageCheck,
  Palette, BookOpen, BarChart, Presentation, ClipboardEdit, GraduationCap, Activity, FileBarChart,
} from 'lucide-react'
import { getServicesByPillar, PILAR_IDS } from '../data/servicesCatalog'

const ICON_MAP = {
  Target, Users, TrendingDown, Map, Compass, GitBranch, Layout, BarChart2,
  MapPin, ShieldCheck, Grid, Network, ClipboardList, Code2, LayoutDashboard, Rocket,
  Database, Brain, CircuitBoard, Gauge, SlidersHorizontal, Sigma, AlertCircle, BadgeCheck,
  Calendar, Search, PieChart, LineChart, ScanEye, FlaskConical, Zap, MonitorDot,
  Stethoscope, TableProperties, Gift, FileCheck, Ruler, Building2, Scale, ArrowRightLeft,
  Code, Calculator, GitCompare, ScanSearch, Workflow, Terminal, PackageCheck,
  Palette, BookOpen, BarChart, Presentation, ClipboardEdit, GraduationCap, Activity, FileBarChart,
}
import { extendedServices } from '../data/extendedServices'
import { CALENDAR_BOOKING_URL } from '../config'
import { recommendations } from '../data/content'
import { analytics } from '../utils/analytics'

export default function AllServicesPage() {
  useEffect(() => {
    document.title = 'Servicios | HR Analytics'
    return () => { document.title = 'HR Analytics | Consultoría en People Analytics' }
  }, [])

  const pillars = getServicesByPillar()
  const contentClass = 'mx-auto max-w-[72rem] w-full px-6 lg:px-8'

  // Testimonios vinculados a servicios (para el carrusel)
  const serviceTestimonialIds = [...new Set(extendedServices.map((s) => s.relatedTestimonialId).filter(Boolean))]
  const serviceTestimonials = recommendations.items.filter((r) => serviceTestimonialIds.includes(r.id))

  return (
    <div className="flex flex-col bg-gray-50/50 pb-page-bottom">
      {/* Hero inicial: fondo blanco para evitar franja verde-teal bajo el header */}
      <section className="bg-white text-gray-900 pt-header pb-6 relative overflow-hidden border-b border-gray-100">
        <div className={`${contentClass} relative z-10 pt-2`}>
          <Link
            to="/#servicios"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium text-sm py-2 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a inicio
          </Link>
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="section-eyebrow text-primary text-[10px] tracking-widest font-semibold uppercase">
              Lo que hacemos
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight text-gray-900 mt-1">
              Servicios y metodologías
            </h1>
            <div className="mt-2 overflow-x-auto overflow-y-hidden -mx-1 px-1">
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg !whitespace-nowrap inline-block min-w-max">
                Metodologías probadas para decisiones estratégicas en RR.HH.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Carrusel de testimonios compacto */}
      {serviceTestimonials.length > 0 && (
        <TestimoniosCarousel testimonials={serviceTestimonials} contentClass={contentClass} />
      )}

      {/* Navegación por pilares */}
      <nav className="sticky top-[var(--header-height,5.5rem)] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-2" aria-label="Navegación por pilares">
        <div className={`${contentClass} flex flex-wrap gap-2 justify-center`}>
          {pillars.map((pilar) => {
            const pilarId = PILAR_IDS[pilar.pillarKey]
            if (!pilarId) return null
            return (
              <a
                key={pilar.pillarKey}
                href={`#${pilarId}`}
                className="px-3 py-1.5 text-xs font-bold text-navy/70 hover:text-primary uppercase tracking-wider transition-colors rounded"
              >
                {pilar.category}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Contenido: cada pilar con sus servicios (acordeón) */}
      <div className={contentClass}>
        {pillars.map((pilar) => {
          const pilarId = PILAR_IDS[pilar.pillarKey]
          if (!pilarId) return null
          return (
          <section
            key={pilar.pillarKey}
            id={pilarId}
            className="scroll-mt-[calc(var(--header-height,5.5rem)+4rem)] py-8 first:pt-6"
          >
            <div className="mb-6">
              <h2 className="section-pillar-label border-l-4 border-primary pl-4">
                {pilar.category}
              </h2>
              <p className="mt-2 pl-4 text-xs text-gray-500 flex flex-wrap items-center gap-x-1 gap-y-1">
                {pilar.services.map((service, i) => (
                  <span key={service.id} className="inline-flex items-center gap-x-1">
                    {i > 0 && <span className="text-gray-300" aria-hidden>·</span>}
                    <a
                      href={`#${service.slug}`}
                      className="text-gray-600 hover:text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
                    >
                      {service.title}
                    </a>
                  </span>
                ))}
              </p>
            </div>
            <div className="space-y-3">
              {pilar.services.map((service) => (
                <ServiceAccordion key={service.id} service={service} />
              ))}
            </div>
          </section>
          )
        })}
      </div>
    </div>
  )
}

function TestimoniosCarousel({ testimonials, contentClass }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const rec = testimonials[currentIndex % testimonials.length]

  useEffect(() => {
    if (testimonials.length <= 1) return
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(t)
  }, [testimonials.length])

  const goNext = () => setCurrentIndex((i) => (i + 1) % testimonials.length)
  const goPrev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-6 bg-white border-b border-gray-100" aria-label="Testimonios de clientes">
      <div className={contentClass}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-3">Qué dicen nuestros clientes</p>
        <div className="relative max-w-2xl mx-auto">
          <div className="min-h-[140px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <m.article
                key={rec?.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-4"
              >
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  {rec?.photo && (
                    <img src={rec.photo} alt={rec.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                  )}
                  {rec?.companyLogo && (
                    <img src={rec.companyLogo} alt={rec.company} className="h-6 w-auto max-w-[80px] object-contain opacity-90" loading="lazy" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{rec?.quote}&rdquo;</p>
                  <p className="mt-2 font-semibold text-gray-900 text-sm">{rec?.name}</p>
                  <p className="text-primary text-xs">{rec?.role} · {rec?.company}</p>
                </div>
              </m.article>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Testimonio anterior"
              className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir a testimonio ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              aria-label="Siguiente testimonio"
              className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceAccordion({ service }) {
  const { hash } = useLocation()
  const currentSlug = hash?.replace(/^#/, '') ?? ''
  const [expanded, setExpanded] = useState(currentSlug === service.slug)

  useEffect(() => {
    if (currentSlug !== service.slug) return
    const id = requestAnimationFrame(() => setExpanded(true))
    return () => cancelAnimationFrame(id)
  }, [currentSlug, service.slug])

  const toggle = () => setExpanded((prev) => !prev)

  return (
    <section
      id={service.slug}
      className="scroll-mt-[calc(var(--header-height,5.5rem)+4rem)] bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden"
    >
      <button
        type="button"
        onClick={toggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-expanded={expanded}
        aria-controls={`service-content-${service.slug}`}
        id={`service-trigger-${service.slug}`}
      >
        <div>
          <p className="text-primary text-xs font-bold tracking-widest uppercase">{service.subtitle}</p>
          <h3 className="text-lg md:text-xl font-serif text-gray-900 mt-0.5">{service.title}</h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            id={`service-content-${service.slug}`}
            role="region"
            aria-labelledby={`service-trigger-${service.slug}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-2 border-t border-gray-100">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-8">
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-base font-bold text-gray-900">La perspectiva estratégica</h4>
                  {service.why.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 text-sm leading-relaxed text-justify hyphens-none">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="lg:col-span-7 pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-100 lg:border-l lg:border-gray-100 lg:pl-8">
                  <MethodologyVisual methodology={service.methodology} />
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <a
                      href={CALENDAR_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.ctaClick('Agendar reunión', 'service_detail')}
                      className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide transition-all rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Agendar reunión
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}

const STEP_GRADIENTS = [
  'linear-gradient(135deg, rgba(0, 86, 179, 0.08), rgba(33, 106, 105, 0.04))',
  'linear-gradient(135deg, rgba(0, 86, 179, 0.14), rgba(33, 106, 105, 0.06))',
  'linear-gradient(135deg, rgba(0, 86, 179, 0.2), rgba(33, 106, 105, 0.08))',
  'linear-gradient(135deg, rgba(0, 86, 179, 0.26), rgba(33, 106, 105, 0.1))',
]

function MethodologyVisual({ methodology }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-900 mb-5">Nuestra Metodología</h4>
      {/* Desktop: timeline horizontal con conectores */}
      <div className="hidden sm:block">
        <m.div
          className="relative grid grid-cols-4 gap-3 items-stretch"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
            hidden: {},
          }}
        >
          {/* Línea conectora horizontal */}
          <div
            className="absolute top-[1.75rem] left-[0.75rem] right-[0.75rem] h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, rgba(0, 86, 179, 0.2), rgba(0, 86, 179, 0.35), rgba(33, 106, 105, 0.4))' }}
            aria-hidden
          />
          {methodology.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Target
            const iconBg = STEP_GRADIENTS[index] ?? STEP_GRADIENTS[0]
            return (
              <m.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative group min-w-0"
              >
                <div
                  className={`flex flex-col items-center justify-start text-center p-4 rounded-xl border border-gray-100 bg-white shadow-soft transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 min-h-[190px] ${index === 3 ? 'ring-1 ring-primary/20' : ''}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-3 text-primary transition-transform group-hover:scale-105"
                    style={{ background: iconBg }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2} aria-hidden />
                  </div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                    {index + 1}
                  </span>
                  <p className="text-xs font-semibold text-gray-900 leading-snug">{item.name}</p>
                </div>
              </m.div>
            )
          })}
        </m.div>
      </div>
      {/* Mobile: timeline vertical con conectores */}
      <div className="sm:hidden space-y-0">
        <m.div
          className="relative"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.05,
              },
            },
            hidden: {},
          }}
        >
          {methodology.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Target
            const isLast = index === methodology.length - 1
            const iconBg = STEP_GRADIENTS[index] ?? STEP_GRADIENTS[0]
            return (
              <m.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-4 pl-10 group"
              >
                {/* Línea vertical conectora */}
                {!isLast && (
                  <div
                    className="absolute left-[1.35rem] top-12 bottom-0 w-px bg-gradient-to-b from-primary/30 to-primary/10"
                  />
                )}
                <div
                  className="absolute left-0 top-1 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-primary transition-transform group-active:scale-95"
                  style={{ background: iconBg }}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} aria-hidden />
                </div>
                <div
                  className={`flex-1 min-w-0 min-h-[80px] py-3 pr-3 rounded-xl border border-gray-100 bg-white shadow-soft transition-all duration-200 active:shadow-md active:border-primary/20 flex flex-col justify-center ${!isLast ? 'border-b-0 rounded-b-none' : ''}`}
                >
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    Paso {index + 1}
                  </span>
                  <p className="text-sm font-semibold text-gray-900 leading-snug mt-0.5">{item.name}</p>
                </div>
              </m.div>
            )
          })}
        </m.div>
      </div>
    </div>
  )
}
