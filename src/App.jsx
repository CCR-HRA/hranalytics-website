import { Suspense, lazy } from "react"
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'

const PropuestaValorPage = lazy(() => import('./pages/PropuestaValorPage'))
const NuestroEnfoquePage = lazy(() => import('./pages/NuestroEnfoquePage'))
const AllServicesPage = lazy(() => import('./pages/AllServicesPage'))
const CasosPage = lazy(() => import('./pages/CasosPage'))

function ServiceSlugRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/servicios#${slug ?? ''}`} replace />
}

const PrivacidadPage = lazy(() => import('./pages/PrivacidadPage'))
const TerminosPage = lazy(() => import('./pages/TerminosPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const PageFallback = () => (
  <div className="flex justify-center min-h-[40vh] items-center text-gray-500 text-sm">
    Cargando...
  </div>
)

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/propuesta-de-valor" element={<ErrorBoundary><Suspense fallback={<PageFallback />}><PropuestaValorPage /></Suspense></ErrorBoundary>} />
          <Route path="/nuestro-enfoque" element={<ErrorBoundary><Suspense fallback={<PageFallback />}><NuestroEnfoquePage /></Suspense></ErrorBoundary>} />
          <Route path="/servicios" element={<ErrorBoundary><Suspense fallback={<PageFallback />}><AllServicesPage /></Suspense></ErrorBoundary>} />
          <Route path="/casos" element={<ErrorBoundary><Suspense fallback={<PageFallback />}><CasosPage /></Suspense></ErrorBoundary>} />
          <Route path="/servicios/:slug" element={<ServiceSlugRedirect />} />
          <Route path="/privacidad" element={<ErrorBoundary><Suspense fallback={<PageFallback />}><PrivacidadPage /></Suspense></ErrorBoundary>} />
          <Route path="/terminos" element={<ErrorBoundary><Suspense fallback={<PageFallback />}><TerminosPage /></Suspense></ErrorBoundary>} />
          <Route path="*" element={<ErrorBoundary><Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense></ErrorBoundary>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
