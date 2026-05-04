import { Play, ChevronRight, Star } from 'lucide-react';

const featuredManga = [
  { src: "https://picsum.photos/seed/hero1/180/260", rotate: "-rotate-6", z: "z-10", offset: "translate-x-0 translate-y-2" },
  { src: "https://picsum.photos/seed/hero2/180/260", rotate: "rotate-0", z: "z-20", offset: "translate-x-0 translate-y-0" },
  { src: "https://picsum.photos/seed/hero3/180/260", rotate: "rotate-6", z: "z-10", offset: "translate-x-0 translate-y-2" },
];

const stats = [
  { value: "50K+", label: "Títulos" },
  { value: "2M+", label: "Lectores" },
  { value: "Daily", label: "Actualizaciones" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background glows */}
      <div
        className="hero-glow w-96 h-96 bg-manga-red top-20 -left-20"
        style={{ position: 'absolute' }}
      />
      <div
        className="hero-glow w-80 h-80 bg-manga-purple bottom-20 right-10"
        style={{ position: 'absolute' }}
      />
      <div
        className="hero-glow w-64 h-64 bg-manga-orange top-1/2 left-1/2"
        style={{ position: 'absolute' }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-manga-card border border-manga-border rounded-full px-4 py-1.5 text-sm text-manga-muted mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Más de 500 nuevos capítulos hoy</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
              Lee Manga
              <br />
              <span className="gradient-text">Online Gratis</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-manga-muted">
                Sin Límites
              </span>
            </h1>

            <p className="text-manga-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Descubre miles de mangas en español. Desde los clásicos más queridos hasta los últimos
              lanzamientos, todo en un solo lugar con la mejor calidad de imagen.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <a
                href="#"
                className="flex items-center justify-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
              >
                <Play className="w-5 h-5 fill-white" />
                Empezar a Leer
              </a>
              <a
                href="#popular"
                className="flex items-center justify-center gap-2 bg-manga-card hover:bg-manga-border text-white font-semibold px-8 py-3.5 rounded-xl transition-all border border-manga-border"
              >
                Ver Popular
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-manga-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: manga stack */}
          <div className="flex-shrink-0 relative flex items-center justify-center w-full lg:w-auto">
            <div className="relative flex items-end justify-center gap-2 h-72 sm:h-80 lg:h-96">
              {featuredManga.map((m, i) => (
                <div
                  key={i}
                  className={`relative ${m.z} transform ${m.rotate} ${m.offset} card-hover`}
                >
                  <img
                    src={m.src}
                    alt="Manga cover"
                    className="w-32 sm:w-40 lg:w-44 h-48 sm:h-60 lg:h-64 object-cover rounded-xl shadow-2xl"
                  />
                  {i === 1 && (
                    <div className="absolute -top-3 -right-3 bg-manga-red text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      4.9
                    </div>
                  )}
                </div>
              ))}

              {/* Floating tag */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-manga-card border border-manga-border rounded-xl px-4 py-2.5 shadow-xl whitespace-nowrap">
                <p className="text-xs text-manga-muted">Capítulo más reciente</p>
                <p className="text-sm font-bold text-white">Dragon's Ascent — Cap. 312</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
