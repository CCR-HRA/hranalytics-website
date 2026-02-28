import { useRef } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Card con efecto 3D tilt al pasar el mouse. Estilo boutique.
 */
export default function TiltCard({ children, className = '', intensity = 8, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useTransform(y, [0, 1], [intensity, -intensity])
  const rotateY = useTransform(x, [0, 1], [-intensity, intensity])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    x.set(relX)
    y.set(relY)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        backfaceVisibility: 'hidden',
      }}
      className={`[transform-style:preserve-3d] ${className}`}
      {...props}
    >
      <m.div
        style={{ transform: 'translateZ(20px)', backfaceVisibility: 'hidden' }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="will-change-transform h-full"
      >
        {children}
      </m.div>
    </m.div>
  )
}
