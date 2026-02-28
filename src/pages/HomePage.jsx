import { lazy, Suspense } from 'react'
import LazyMount from '../components/LazyMount'

import Hero from '../components/Hero'
import ClientsSection from '../components/ClientsSection'
import TrustBarSection from '../components/TrustBarSection'
import ServicesSection from '../components/ServicesSection'
import IndustriesSection from '../components/IndustriesSection'
import HRAnalyticsSection from '../components/HRAnalyticsSection'
import ValuePropCompact from '../components/ValuePropCompact'
import AboutSection from '../components/AboutSection'
import InsightsSection from '../components/InsightsSection'
import ContactForm from '../components/ContactForm'

// Lazy (below-the-fold)
const SuccessCasesSection = lazy(() => import('../components/SuccessCasesSection'))
const RecommendationsSection = lazy(() => import('../components/RecommendationsSection'))
const FAQSection = lazy(() => import('../components/FAQSection'))
const CTASection = lazy(() => import('../components/CTASection'))

export default function HomePage() {
  return (
    <div className="flex flex-col pb-page-bottom">
      {/* 1. LA PROMESA */}
      <Hero />

      {/* 2. QUÉ HACEMOS: Servicios arriba (destaque) */}
      <ServicesSection />

      {/* 3. AUTORIDAD: Clientes y TrustBar */}
      <ClientsSection />
      <TrustBarSection />

      {/* 4. PARA QUIÉN */}
      <IndustriesSection />

      {/* 4. PRUEBA: Impacto y Testimonios */}
      {/* Importante: el ID queda siempre (para que el menú pueda scrollear) */}
      <div id="recomendaciones">
        <LazyMount minHeight={600}>
          <Suspense fallback={null}>
            <SuccessCasesSection />
            <RecommendationsSection />
          </Suspense>
        </LazyMount>
      </div>

      {/* 5. CÓMO LO RESOLVEMOS */}
      <HRAnalyticsSection />
      <ValuePropCompact />

      {/* 6. LIDERAZGO INTELECTUAL */}
      <AboutSection />
      <InsightsSection />

      {/* 7. CIERRE Y CONVERSIÓN */}
      <LazyMount minHeight={520}>
        <Suspense fallback={null}>
          <FAQSection />
          <CTASection />
        </Suspense>
      </LazyMount>

      {/* Mantener eager por ahora para no afectar #contacto */}
      <ContactForm />
    </div>
  )
}
