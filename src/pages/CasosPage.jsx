/**
 * Página de casos de impacto. Contenido y mensajes de interfaz en español.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import CasosImpactoDashboard from '../components/CasosImpactoDashboard'
import CasoDetalleSection from '../components/CasoDetalleSection'
import RecommendationsSection from '../components/RecommendationsSection'
import { successCases as casesContent } from '../data/content'

const contentClass = 'mx-auto max-w-[72rem] w-full px-6 lg:px-8'

export default function CasosPage() {
  const [casoActivoContentId, setCasoActivoContentId] = useState(1)

  useEffect(() => {
    document.title = 'Casos de impacto | HR Analytics'
    return () => { document.title = 'HR Analytics | Consultoría en People Analytics' }
  }, [])

  return (
    <div className="flex flex-col bg-gray-50/50 pb-page-bottom min-h-screen">
      {/* Hero compacto: título y acción visibles de inmediato */}
      <section className="bg-primary text-white pt-header pb-5 sm:pb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:48px_48px]" aria-hidden="true" />
        <div className={`${contentClass} relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
          <div className="min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm mb-2 sm:mb-1 transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a inicio
            </Link>
            <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif leading-tight">
                Casos de impacto
              </h1>
              <p className="mt-0.5 text-white/80 text-sm max-w-xl">
                Resultados medibles en People Analytics, compensaciones y planificación estratégica.
              </p>
            </m.div>
          </div>
          {casesContent.privacyNotice && (
            <p className="text-white/60 text-xs max-w-xs shrink-0 hidden lg:block text-justify leading-relaxed">
              {casesContent.privacyNotice}{' '}
              <Link to="/privacidad" className="text-white/80 font-medium underline underline-offset-2 hover:text-white">
                política de privacidad
              </Link>
              {casesContent.privacyNoticeLinkSuffix}
            </p>
          )}
        </div>
        {casesContent.privacyNotice && (
          <p className={`${contentClass} relative z-10 mt-3 text-white/50 text-[11px] lg:hidden text-justify leading-relaxed`}>
            {casesContent.privacyNotice}{' '}
            <Link to="/privacidad" className="text-white/70 font-medium underline">política de privacidad</Link>
            {casesContent.privacyNoticeLinkSuffix}
          </p>
        )}
      </section>

      {/* Dashboard de Casos */}
      <CasosImpactoDashboard onCasoChange={setCasoActivoContentId} />

      {/* Transición suave dashboard → panel detalle */}
      <div className="h-8 bg-gradient-to-b from-[#0a1628] to-[#0f2035]" aria-hidden />

      {/* Análisis técnico completo (scroll target) */}
      <section
        id="caso-detalle"
        className="pt-6 pb-16 lg:pt-8 lg:pb-24 bg-[#0f2035]"
      >
        <div className="container-premium">
          {casesContent.privacyNotice && (
            <p className="mb-6 text-white/50 text-xs sm:text-sm max-w-2xl leading-relaxed text-justify">
              {casesContent.privacyNotice}{' '}
              <Link to="/privacidad" className="text-emerald-400/90 hover:text-emerald-400 font-medium underline underline-offset-2">
                política de privacidad
              </Link>
              {casesContent.privacyNoticeLinkSuffix}
            </p>
          )}
          <CasoDetalleSection contentId={casoActivoContentId} />
        </div>
      </section>

      {/* Testimonios */}
      <RecommendationsSection />
    </div>
  )
}
