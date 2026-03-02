import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import SuccessCasesSection from '../components/SuccessCasesSection'
import RecommendationsSection from '../components/RecommendationsSection'

const contentClass = 'mx-auto max-w-[72rem] w-full px-6 lg:px-8'

export default function CasosPage() {
  useEffect(() => {
    document.title = 'Casos de impacto | HR Analytics'
    return () => { document.title = 'HR Analytics | Consultoría en People Analytics' }
  }, [])

  return (
    <div className="flex flex-col bg-gray-50/50 pb-page-bottom min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white pt-24 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:48px_48px]" aria-hidden="true" />
        <div className={`${contentClass} relative z-10 pt-4`}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm py-2 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a inicio
          </Link>
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight">
              Casos de impacto
            </h1>
            <p className="mt-2 text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl">
              Proyectos realizados con metodologías probadas. Resultados medibles en People Analytics, compensaciones y planificación estratégica.
            </p>
          </m.div>
        </div>
      </section>

      {/* Casos y testimonios */}
      <div className="flex-1">
        <SuccessCasesSection />
        <RecommendationsSection />
      </div>
    </div>
  )
}
