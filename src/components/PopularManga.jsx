import { useState, useEffect } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function badgeForManga(manga) {
  if (manga.rank === 1) return { label: 'TOP 1', color: 'bg-yellow-500' };
  if (manga.rank === 2) return { label: 'TOP 2', color: 'bg-gray-400' };
  if (manga.rank === 3) return { label: 'TOP 3', color: 'bg-orange-600' };
  if (manga.is_trending)  return { label: 'HOT',   color: 'bg-orange-500' };
  return null;
}

function MangaCard({ manga }) {
  const badge = badgeForManga(manga);
  return (
    <Link
      to={`/manga/${manga.id}`}
      className="flex-shrink-0 w-40 sm:w-44 card-hover cursor-pointer group"
    >
      <div className="relative rounded-xl overflow-hidden mb-2 shadow-lg">
        <img
          src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/200/280`}
          alt={manga.title}
          className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {badge && (
          <span className={`absolute top-2 left-2 ${badge.color} text-white text-xs font-bold px-2 py-0.5 rounded-md`}>
            {badge.label}
          </span>
        )}

        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded-md px-1.5 py-0.5">
          <span className="text-manga-muted text-xs font-bold">#{manga.rank}</span>
        </div>
      </div>

      <h3 className="text-white text-sm font-semibold truncate leading-tight">{manga.title}</h3>
      <p className="text-manga-muted text-xs mt-0.5 truncate">{manga.genre}</p>
      <div className="flex items-center gap-1 mt-1 text-manga-muted">
        <BookOpen className="w-3 h-3" />
        <span className="text-xs">Ver detalles</span>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-40 sm:w-44 animate-pulse">
      <div className="rounded-xl bg-manga-card h-56 sm:h-64 mb-2" />
      <div className="h-3 bg-manga-card rounded w-3/4 mb-1" />
      <div className="h-3 bg-manga-card rounded w-1/2" />
    </div>
  );
}

export default function PopularManga() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('mangas')
      .select('*')
      .order('rank', { ascending: true })
      .limit(8)
      .then(({ data }) => {
        setMangas(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="popular" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 lg:grid lg:grid-cols-4 xl:grid-cols-4 lg:overflow-visible lg:pb-0">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : mangas.map((manga) => <MangaCard key={manga.id} manga={manga} />)
          }
        </div>
      </div>
    </section>
  );
}
