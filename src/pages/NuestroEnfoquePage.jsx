import { Link } from 'react-router-dom'
import { enfoque as content } from '../data/content'

const icons = [
  <svg key="1" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
  <svg key="2" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15m11 11v-5h-.581m0 0a8.003 8.003 0 0015.357-2m0 0a8.001 8.001 0 0015.357 2M15 3v5h.581m0 0a8.001 8.001 0 0115.357 2m0 0a8.001 8.001 0 0115.357-2M9 4v5" /></svg>,
  <svg key="3" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
]

export default function NuestroEnfoquePage() {
  return (
    <div className="flex flex-col pt-header pb-page-bottom">
        <div className="container-premium relative z-10">
          <div className="w-full">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary-dark mb-10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a HR Analytics
            </Link>

            <div className="text-center mb-14">
              <p className="section-eyebrow text-primary mb-4">
                {content.heading}
              </p>
              <h1 className="section-title text-3xl md:text-4xl text-gray-900">
                {content.subheading}
              </h1>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>

            <div className="bg-white rounded-2xl shadow-professional border border-gray-100/80 p-8 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
                <div className="hidden sm:block absolute top-10 left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" aria-hidden />
                {content.items.map((item, i) => (
                  <div
                    key={item.title}
                    className="relative flex flex-col items-center text-center p-6 md:p-7 rounded-xl bg-gray-50/50 hover:bg-white shadow-card hover:shadow-soft border border-transparent hover:border-primary/15 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-5 text-primary">
                      {icons[i]}
                    </div>
                    <p className="font-bold text-gray-900 text-base leading-snug">{item.title}</p>
                    <p className="text-primary text-xs font-semibold tracking-wide mt-2">{item.tag}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mt-3 flex-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="mt-14 text-center">
              <p className="text-xl md:text-2xl font-medium text-gray-800 max-w-2xl mx-auto leading-relaxed">
                &ldquo;{content.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
    </div>
  )
}
