/**
 * Analytics: Google Tag Manager y/o Google Analytics 4
 * Robusto e idempotente: flags globales, guardia de consentimiento, carga segura.
 */

import { GA_ID, GTM_ID } from '../config'

const GLOBAL_GA_FLAG = '__hr_ga_loaded__'
const GLOBAL_GTAG_FLAG = '__hr_gtag_ready__'

const useGTM = Boolean(GTM_ID)

function isAnalyticsEnabled() {
  if (!GTM_ID && !GA_ID) return false
  // En el futuro, si pones un banner de cookies: return localStorage.getItem('consent') === 'true'
  return true
}

export { isAnalyticsEnabled }

function loadGtag() {
  if (typeof window === 'undefined' || !GA_ID) return
  if (window[GLOBAL_GA_FLAG]) return

  const existing = document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`)
  if (!existing) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
  }

  window[GLOBAL_GA_FLAG] = true
}

export function initAnalytics() {
  if (typeof window === 'undefined' || !isAnalyticsEnabled()) return
  window.dataLayer = window.dataLayer || []

  if (useGTM) return
  if (!GA_ID) return

  loadGtag()

  if (!window[GLOBAL_GTAG_FLAG]) {
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window[GLOBAL_GTAG_FLAG] = true
  }

  window.gtag('config', GA_ID, {
    send_page_view: false,
    page_title: document.title,
  })
}

export function pageView(path, title = '') {
  if (typeof window === 'undefined' || !isAnalyticsEnabled()) return

  if (useGTM) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'virtual_page_view',
      page_path: path,
      page_title: title || document.title,
    })
    return
  }

  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      send_to: GA_ID,
    })
  }
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !isAnalyticsEnabled()) return
  if (useGTM) {
    window.dataLayer?.push({ event: eventName, ...params })
  } else if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

export const analytics = {
  contactFormSubmit: () => {
    if (!isAnalyticsEnabled()) return
    if (useGTM) {
      window.dataLayer?.push({ event: 'generate_lead', form_name: 'contacto' })
    } else if (GA_ID && typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { form_name: 'contacto' })
    }
  },

  ctaClick: (label, location) =>
    trackEvent('cta_click', { event_label: label, event_category: 'engagement', location }),

  whatsappClick: (source) =>
    trackEvent('whatsapp_click', { event_label: source || 'floating', event_category: 'conversion' }),

  emailClick: (source) =>
    trackEvent('email_click', { event_label: source || 'direct', event_category: 'engagement' }),

  scrollToSection: (sectionId) =>
    trackEvent('scroll_section', { event_label: sectionId, event_category: 'engagement' }),
}
