import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteVerification = env.VITE_GOOGLE_SITE_VERIFICATION || ''
  const gtmId = env.VITE_GTM_ID || ''

  return {
    server: { host: true },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-framer': ['framer-motion'],
            'vendor-lucide': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    plugins: [
      react(),
      {
        name: 'html-inject-google',
        transformIndexHtml(html) {
          let out = html
          out = out.replace('<!-- GOOGLE_SITE_VERIFICATION -->', siteVerification ? `    <meta name="google-site-verification" content="${siteVerification}" />` : '')
          if (gtmId) {
            const gtmHead = `    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');</script>
    <!-- End Google Tag Manager -->`
            const gtmBody = `    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`
            out = out.replace('<!-- GOOGLE_TAG_MANAGER -->', gtmHead)
            out = out.replace('<!-- GOOGLE_TAG_MANAGER_BODY -->', gtmBody)
          } else {
            out = out.replace('<!-- GOOGLE_TAG_MANAGER -->', '')
            out = out.replace('<!-- GOOGLE_TAG_MANAGER_BODY -->', '')
          }
          return out
        },
      },
    ],
  }
})
