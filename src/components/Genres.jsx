import { genres } from '../data/manga';

export default function Genres() {
  return (
    <section id="generos" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-manga-border to-transparent mb-16" />

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Explora por <span className="gradient-text">Géneros</span>
          </h2>
          <p className="text-manga-muted text-sm sm:text-base">
            Encuentra tu próximo manga favorito entre miles de géneros
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {genres.map((genre) => (
            <a
              key={genre.name}
              href="#"
              className="group flex flex-col items-center gap-2 bg-manga-card hover:bg-manga-border border border-manga-border hover:border-manga-red/50 rounded-xl p-4 transition-all text-center"
            >
              <span className="text-2xl">{genre.emoji}</span>
              <span className="text-white text-sm font-semibold group-hover:text-manga-red transition-colors">
                {genre.name}
              </span>
              <span className="text-manga-muted text-xs">
                {genre.count.toLocaleString()}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
