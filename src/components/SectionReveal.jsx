import { m } from 'framer-motion'

const defaultVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Wrapper para revelar hijos con stagger cuando entran en viewport.
 * Usar como contenedor con children que se animan en secuencia.
 */
export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.08,
  amount = 0.2,
  once = true,
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '-40px 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}

export function RevealItem({ children, className = '', variants = defaultVariants }) {
  return (
    <m.div variants={variants} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </m.div>
  )
}
