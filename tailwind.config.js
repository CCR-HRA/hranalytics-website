/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* Espaciado premium: más aire, ritmo claro */
      spacing: {
        'section': '2.5rem',
        'section-lg': '3.5rem',
        '18': '4.5rem',
        '22': '5.5rem',
        'header': '5.5rem', /* Espacio bajo header fijo */
        'page-top': '4rem',   /* Marco: aire superior del contenido */
        'page-bottom': '5rem', /* Marco: aire inferior antes del footer */
      },
      maxWidth: {
        'content': '42rem',
        'wide': '48rem',
        'prose': '65ch',
      },
      colors: {
        primary: '#216a69',
        'primary-dark': '#174D4D',
        'primary-light': '#2d8a88',
        'navy': '#0a1628',
        'navy-light': '#132238',
        'gray-850': '#1a1a1a',
        'gray-950': '#0a0a0a',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(1.875rem, 3.75vw, 2.875rem)', { lineHeight: '1.2' }],
        'display': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15' }],
        'lead': ['1.25rem', { lineHeight: '1.5' }],
      },
      letterSpacing: {
        'wide': '0.05em',
        'wider': '0.1em',
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(0,0,0,0.06), 0 4px 16px -4px rgba(0,0,0,0.04)',
        'professional': '0 8px 32px -8px rgba(0,0,0,0.1), 0 4px 16px -4px rgba(0,0,0,0.05)',
        'card': '0 2px 8px -2px rgba(0,0,0,0.04), 0 4px 20px -4px rgba(33,106,105,0.04)',
        'card-hover': '0 12px 40px -8px rgba(0,0,0,0.1), 0 4px 16px -4px rgba(33,106,105,0.08)',
        'elegant': '0 1px 3px rgba(0,0,0,0.04)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
