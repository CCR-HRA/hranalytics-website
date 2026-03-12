import { useLocation } from 'react-router-dom'
import SkipLink from './SkipLink'
import ScrollManager from './ScrollManager'
import PageLoader from './PageLoader'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import WhatsAppButton from './WhatsAppButton'
import BackToTop from './BackToTop'
import ChatWidget from './ChatWidget'
import StickyMobileCTA from './StickyMobileCTA'
import ServicesNavButton from './ServicesNavButton'
import PageView from './PageView'

export default function AppLayout() {
  const { pathname } = useLocation()
  const isServicesPage = pathname === '/servicios'

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SkipLink />
      <ScrollManager />
      <PageLoader />
      <ScrollProgress />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col min-h-0 min-w-0 w-full">
        <PageView />
      </main>

      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
      {isServicesPage ? <ServicesNavButton /> : <BackToTop />}
      <ChatWidget />
    </div>
  )
}
