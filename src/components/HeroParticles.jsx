/**
 * Partículas flotantes que dan vida al fondo del hero (tablero).
 * Valores pseudo-aleatorios para consistencia en SSR.
 */
function seeded(i, max) {
  return ((i * 7 + 13) % max) / max
}

export default function HeroParticles() {
  const count = 24
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 1.5 + seeded(i, 100) * 2.5,
    left: seeded(i + 1, 100) * 100,
    delay: seeded(i + 2, 100) * 20,
    duration: 15 + seeded(i + 3, 100) * 25,
  }))

  return (
    <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/20 hero-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: '110%',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
