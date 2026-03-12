import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domMax } from 'framer-motion'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import { initAnalytics } from './utils/analytics'
import { GOOGLE_CLIENT_ID } from './config'

initAnalytics()

const clientId = GOOGLE_CLIENT_ID
const root = createRoot(document.getElementById('root'))

const AppWithProviders = (
  <StrictMode>
    <BrowserRouter>
      <LazyMotion features={domMax} strict>
        <App />
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>
)

root.render(
  clientId ? (
    <GoogleOAuthProvider clientId={clientId}>
      {AppWithProviders}
    </GoogleOAuthProvider>
  ) : AppWithProviders
)
