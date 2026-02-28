import { clients as content } from '../data/content'

export default function ClientsSection() {
  return (
    <section id="reconocimiento" className="relative py-section lg:py-section-lg overflow-hidden bg-navy z-[5]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(33,106,105,0.15)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container-premium relative z-10">
        <div className="section-header">
          <p className="section-eyebrow text-primary-light mb-4">
            Reconocimiento
          </p>
          <h2 className="section-title text-3xl md:text-4xl text-white">
            {content.title}
          </h2>
          <p className="text-white/70 text-sm mt-4 max-w-md mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {content.items.map((client) => (
            <div
              key={client.name}
              className="group flex-1 min-w-[140px] max-w-[200px] hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative h-full min-h-[110px] md:min-h-[130px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10">
                {/* Card: dark bg for logos diseñados para fondo oscuro, light para el resto */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-6 md:p-8 transition-colors duration-300 group-hover:brightness-110 ${
                    client.darkBg ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  {/* Marco sutil para logos con darkBg - integra el negro de forma elegante */}
                  {client.darkBg ? (
                    <div className="w-full h-full flex items-center justify-center p-2 rounded-xl">
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className={`w-auto object-contain ${
                          client.name === 'Collahuasi'
                            ? 'h-16 md:h-20 lg:h-24 max-w-[190px] md:max-w-[220px] scale-110 md:scale-125'
                            : 'h-14 md:h-16 lg:h-20 max-w-[150px] md:max-w-[180px]'
                        }`}
                      />
                    </div>
                  ) : (
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      className={`w-auto object-contain filter transition-all duration-300 group-hover:drop-shadow-lg ${
                        client.name === 'Collahuasi'
                          ? 'h-16 md:h-20 lg:h-24 max-w-[190px] md:max-w-[220px] scale-110 md:scale-125'
                          : 'h-14 md:h-16 lg:h-20 max-w-[150px] md:max-w-[180px]'
                      }`}
                    />
                  )}
                </div>
                {/* Brillo sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
