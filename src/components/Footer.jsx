import { Link, useNavigate } from 'react-router-dom'
import { COMPANY_ADDRESS, CONTACT_EMAIL, SOCIAL_LINKS, WHATSAPP_DISPLAY, WHATSAPP_URL } from '../config'
import SocialIcon from './SocialIcon'
import { footer as content } from '../data/content'
import { scrollToSection } from '../utils/scroll'

const socialLinks = SOCIAL_LINKS.map(({ label, ...rest }) => ({ ...rest, label }))

const linkBase = 'text-gray-400 hover:text-primary-light transition-colors duration-200 text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy underline-offset-4 hover:underline'

export default function Footer() {
  const navigate = useNavigate()

  const handleHashClick = (e) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    const scrolled = scrollToSection(href)
    if (!scrolled && href?.startsWith('#')) {
      navigate({ pathname: '/', hash: href.replace(/^#/, '') })
    }
  }

  const cols = content.columns

  return (
    <footer className="bg-navy text-white py-20 lg:py-24 border-t border-white/5">
      <div className="container-premium">
        {/* Multi-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Logo + tagline + región + social */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img src="/logo-white.png" alt="HR Analytics" className="h-14 hover:opacity-90 transition-opacity" loading="lazy" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-3">
              {content.tagline}
            </p>
            <p className="text-gray-500 text-xs mb-4">{content.region}</p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkBase} p-1 -m-1`}
                  title={link.label}
                  aria-label={link.label}
                >
                  <SocialIcon type={link.iconType} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Industrias */}
          {cols?.industries && (
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">
                {cols.industries.title}
              </h3>
              <ul className="space-y-3">
                {cols.industries.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} onClick={handleHashClick} className={`${linkBase} block w-fit`}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 3: Capabilities (Servicios) */}
          {cols?.services && (
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">
                {cols.services.title}
              </h3>
              <ul className="space-y-3">
                {cols.services.items.map((item) => (
                  <li key={item.label}>
                    {item.route ? (
                      <Link to={item.href} className={`${linkBase} block w-fit`}>{item.label}</Link>
                    ) : (
                      <a href={item.href} onClick={handleHashClick} className={`${linkBase} block w-fit`}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 4: La firma */}
          {cols?.laFirma && (
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">
                {cols.laFirma.title}
              </h3>
              <ul className="space-y-3">
                {cols.laFirma.items.map((item) => (
                  <li key={item.label}>
                    {item.route ? (
                      <Link to={item.href} className={`${linkBase} block w-fit`}>{item.label}</Link>
                    ) : (
                      <a href={item.href} onClick={handleHashClick} className={`${linkBase} block w-fit`}>{item.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 5: Contacto */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">
              Contacto
            </h3>
            {COMPANY_ADDRESS && (
              <p className="text-gray-400 text-sm mb-3 max-w-xs">{COMPANY_ADDRESS}</p>
            )}
            <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkBase} block mb-2`}>{CONTACT_EMAIL}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${linkBase} block`}>{WHATSAPP_DISPLAY}</a>
          </div>

          {/* Col 6: Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {content.legal?.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={`${linkBase} block w-fit`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {content.copyright}</p>
          <div className="flex gap-6 text-sm">
            {content.legal?.map((item) => (
              <Link key={item.href} to={item.href} className={linkBase}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
