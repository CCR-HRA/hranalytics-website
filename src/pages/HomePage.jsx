/**
 * Página de inicio. Contenido y mensajes de interfaz en español.
 */
import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
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
import RecommendationsSection from '../components/RecommendationsSection'
import SuccessCasesSection from '../components/SuccessCasesSection'

// Lazy (below-the-fold)
const FAQSection = lazy(() => import('../components/FAQSection'))
const CTASection = lazy(() => import('../components/CTASection'))

export default function HomePage() {
  const { hash } = useLocation()
  const forceMountAboveContact = hash?.replace(/^#/, '') === 'contacto'

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

      {/* 4. PRUEBA: Testimonios primero, luego Casos de impacto (eager para evitar flash al hacer clic) */}
      <div id="recomendaciones">
        <RecommendationsSection />
        <SuccessCasesSection />
      </div>

      {/* 5. CÓMO LO RESOLVEMOS */}
      <HRAnalyticsSection />
      <ValuePropCompact />

      {/* 6. LIDERAZGO INTELECTUAL */}
      <AboutSection />
      <InsightsSection />

      {/* 7. CIERRE Y CONVERSIÓN */}
      <LazyMount minHeight={520} forceMount={forceMountAboveContact}>
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
