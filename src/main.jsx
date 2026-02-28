import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domMax } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { initAnalytics } from './utils/analytics'

initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LazyMotion features={domMax} strict>
        <App />
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>,
)
