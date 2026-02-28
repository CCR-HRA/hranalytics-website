import { useState } from 'react'

/**
 * Imagen de servicio: dimensiones uniformes 3:2, carga progresiva y fallback de marca.
 */
const DIMENSIONS = {
  thumb: { width: 360, height: 240 },
  detail: { width: 540, height: 360 },
}

export default function ServiceImage({ src, alt = '', variant = 'thumb' }) {
  const [status, setStatus] = useState('loading')
  const isThumb = variant === 'thumb'
  const { width, height } = DIMENSIONS[variant] || DIMENSIONS.thumb

  return (
    <div className="relative w-full h-full overflow-hidden bg-primary/5">
      {/* Placeholder / loading: gradiente de marca */}
      {status !== 'error' && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/95 via-primary to-primary-dark transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-hidden
        >
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      )}

      {/* Fallback visual de error */}
      {status === 'error' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400"
          aria-label="Imagen no disponible"
        >
          <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium">Imagen no disponible</span>
        </div>
      )}

      {/* Imagen */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`w-full h-full object-cover object-center transition-all duration-500 ${
          isThumb ? 'group-hover:scale-105' : ''
        } ${status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />

      {/* Overlay inferior solo cuando la imagen cargó */}
      {status === 'loaded' && (
        <div
          className={`absolute inset-0 pointer-events-none ${
            isThumb
              ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
              : 'bg-gradient-to-br from-black/40 via-transparent to-transparent'
          }`}
          aria-hidden
        />
      )}
    </div>
  )
}
