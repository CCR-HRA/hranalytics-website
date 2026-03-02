import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config'

export default function TerminosPage() {
  useEffect(() => {
    document.title = 'Términos de Uso | HR Analytics'
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
          <h1 className="section-title text-3xl md:text-4xl text-gray-900 mb-6">Términos de Uso</h1>
          <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed space-y-4 [&_p]:text-justify [&_p]:hyphens-none">
            <p>Al acceder y usar el sitio web de HR Analytics SpA aceptas estos términos de uso. El contenido de este sitio es de carácter informativo y no constituye asesoría profesional hasta que se formalice un acuerdo de servicios.</p>
            <h2 className="font-bold text-gray-900 text-base mt-6">Uso permitido</h2>
            <p>Puedes usar este sitio para informarte sobre nuestros servicios de People Analytics, contactarnos y acceder a los contenidos publicados. No está permitido copiar, distribuir, modificar ni reutilizar el contenido sin autorización previa por escrito.</p>
            <h2 className="font-bold text-gray-900 text-base mt-6">Propiedad intelectual</h2>
            <p>Todo el contenido del sitio (textos, diseños, logos e imágenes) es propiedad de HR Analytics SpA o se utiliza bajo licencia.</p>
            <h2 className="font-bold text-gray-900 text-base mt-6">Contacto</h2>
            <p>Para consultas relacionadas con estos términos, escríbenos a: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-primary-dark underline">{CONTACT_EMAIL}</a></p>
          </div>
          </div>
        </div>
    </div>
  )
}
