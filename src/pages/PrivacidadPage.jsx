import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config'

export default function PrivacidadPage() {
  useEffect(() => {
    document.title = 'Política de Privacidad | HR Analytics'
    return () => { document.title = 'HR Analytics | Consultoría en People Analytics' }
  }, [])

  return (
    <div className="flex flex-col pt-header pb-page-bottom">
        <div className="container-premium">
          <div className="max-w-prose mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary-dark mb-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Volver al inicio
          </Link>
          <h1 className="section-title text-3xl md:text-4xl text-gray-900 mb-6">Política de Privacidad</h1>
          <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed space-y-4 [&_p]:text-justify [&_p]:hyphens-none">
            <p>HR Analytics SpA respeta tu privacidad y se compromete a proteger tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos la información que nos proporcionas.</p>
            <h2 className="font-bold text-gray-900 text-base mt-6">Información que recopilamos</h2>
            <p>Recopilamos la información que entregas directamente al completar formularios de contacto, suscribirte a nuestro newsletter o comunicarte con nosotros por correo, WhatsApp o redes sociales (por ejemplo, nombre, correo electrónico y mensaje), así como datos de uso de nuestra web.</p>
            <h2 className="font-bold text-gray-900 text-base mt-6">Uso de la información</h2>
            <p>Utilizamos esta información para responder tus consultas, enviar comunicaciones relevantes sobre People Analytics, mejorar nuestros servicios y cumplir obligaciones legales cuando corresponda.</p>
            <h2 className="font-bold text-gray-900 text-base mt-6">Protección de datos</h2>
            <p>Implementamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso no autorizado, pérdida, uso indebido o alteración.</p>
            <h2 className="font-bold text-gray-900 text-base mt-6">Contacto</h2>
            <p>Para ejercer tus derechos o realizar consultas sobre privacidad, puedes escribir a: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-primary-dark underline">{CONTACT_EMAIL}</a></p>
          </div>
          </div>
        </div>
    </div>
  )
}
