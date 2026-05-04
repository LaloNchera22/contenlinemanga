import { useState, useEffect } from 'react';
import { TrendingUp, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const RANK_COLORS = ['text-yellow-400', 'text-gray-400', 'text-orange-500'];

export default function Popular() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('mangas')
      .select('id, title, cover_url, genre, rank, is_trending, description')
      .order('rank', { ascending: true })
      .limit(50)
      .then(({ data }) => {
        setMangas(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      {/* Header */}
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <TrendingUp className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Manga Popular</h1>
          </div>
          <p className="text-manga-muted text-sm">Los títulos más leídos de la plataforma</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-manga-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {mangas.map((manga, index) => (
              <Link
                key={manga.id}
                to={`/manga/${manga.id}`}
                className="flex items-center gap-4 bg-manga-card border border-manga-border hover:border-manga-red rounded-xl p-4 transition-all group"
              >
                {/* Rank */}
                <div className="w-10 flex-shrink-0 text-center">
                  <span className={`text-2xl font-black ${RANK_COLORS[index] || 'text-manga-muted'}`}>
                    {index + 1}
                  </span>
                </div>

                {/* Cover */}
                <div className="w-12 h-16 flex-shrink-0 overflow-hidden rounded-lg border border-manga-border">
                  <img
                    src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/48/64`}
                    alt={manga.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-bold text-sm truncate group-hover:text-manga-red transition-colors">
                      {manga.title}
                    </p>
                    {manga.is_trending && (
                      <span className="flex items-center gap-1 bg-manga-red/20 text-manga-red text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                        <TrendingUp className="w-3 h-3" /> HOT
                      </span>
                    )}
                  </div>
                  <p className="text-manga-muted text-xs mt-0.5 truncate">{manga.genre}</p>
                  {manga.description && (
                    <p className="text-manga-muted text-xs mt-1 line-clamp-1 hidden sm:block">
                      {manga.description}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-1 text-manga-muted flex-shrink-0">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-medium">Rank #{manga.rank}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
