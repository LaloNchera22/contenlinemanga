import { Link } from 'react-router-dom';
import { genres } from '../data/manga';

export default function Generos() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      {/* Header */}
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-black text-white mb-1">Géneros</h1>
          <p className="text-manga-muted text-sm">Explora manga por categoría</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              to={`/explorar?genre=${encodeURIComponent(genre.name)}`}
              className="group bg-manga-card border border-manga-border hover:border-manga-red rounded-xl p-6 transition-all hover:bg-manga-border/30"
            >
              <div className="text-4xl mb-3">{genre.emoji}</div>
              <h3 className="text-white font-bold text-base group-hover:text-manga-red transition-colors">
                {genre.name}
              </h3>
              <p className="text-manga-muted text-xs mt-1">
                {genre.count.toLocaleString()} títulos
              </p>
            </Link>
          ))}
        </div>

        {/* Popular combos */}
        <div className="mt-12">
          <h2 className="text-white font-bold text-xl mb-4">Combinaciones populares</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Acción + Fantasía',
              'Romance + Drama',
              'Isekai + Aventura',
              'Sci-Fi + Thriller',
              'Comedia + Slice of Life',
              'Terror + Misterio',
              'Deportes + Drama',
              'Artes Marciales + Acción',
            ].map((combo) => (
              <Link
                key={combo}
                to="/explorar"
                className="bg-manga-card border border-manga-border hover:border-manga-red text-manga-muted hover:text-white text-sm px-4 py-2 rounded-full transition-colors"
              >
                {combo}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
