import { m } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import { trustBar as content } from '../data/content'

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function TrustBarSection() {
  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: '-40px' }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
      }}
      className="relative z-10 -mt-px py-5 md:py-6 bg-white border-y border-gray-100"
      aria-label="Credenciales"
    >
      <div className="container-premium">
        <m.p
          variants={itemVariants}
          transition={{ duration: 0.5 }}
          className="text-center section-eyebrow text-primary/80 mb-6"
        >
          {content.heading}
        </m.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 max-w-4xl mx-auto">
          {content.items.map((item) => (
            <m.div key={item.id} variants={itemVariants} transition={{ duration: 0.5 }} className="text-center">
              <AnimatedCounter value={item.value} label={item.label} duration={1.2} />
            </m.div>
          ))}
        </div>
      </div>
    </m.section>
  )
}
