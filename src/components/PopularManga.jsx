import { Star, BookOpen, ChevronRight } from 'lucide-react';
import { popularManga } from '../data/manga';

function MangaCard({ manga }) {
  return (
    <div className="flex-shrink-0 w-40 sm:w-44 card-hover cursor-pointer group">
      <div className="relative rounded-xl overflow-hidden mb-2 shadow-lg">
        <img
          src={manga.cover}
          alt={manga.title}
          className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Badge */}
        {manga.badge && (
          <span className={`absolute top-2 left-2 ${manga.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-md`}>
            {manga.badge}
          </span>
        )}

        {/* Rating */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded-md px-1.5 py-0.5">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold">{manga.rating}</span>
        </div>
      </div>

      <h3 className="text-white text-sm font-semibold truncate leading-tight">{manga.title}</h3>
      <p className="text-manga-muted text-xs mt-0.5 truncate">{manga.genre}</p>
      <div className="flex items-center gap-1 mt-1 text-manga-muted">
        <BookOpen className="w-3 h-3" />
        <span className="text-xs">{manga.chapters} caps.</span>
      </div>
    </div>
  );
}

export default function PopularManga() {
  return (
    <section id="popular" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Manga <span className="gradient-text">Popular</span>
            </h2>
            <p className="text-manga-muted text-sm mt-1">Los más leídos de la semana</p>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-manga-red hover:text-red-400 text-sm font-semibold transition-colors"
          >
            Ver todo
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 lg:grid lg:grid-cols-4 xl:grid-cols-4 lg:overflow-visible lg:pb-0">
          {popularManga.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </div>
    </section>
  );
}
