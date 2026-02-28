import { m } from 'framer-motion'

/**
 * Revela palabra a palabra con clip y translate. Para Hero.
 */
export default function HeroWordReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ')

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <m.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.25em] align-baseline will-change-[clip-path]"
        >
          {word}
        </m.span>
      ))}
    </span>
  )
}
