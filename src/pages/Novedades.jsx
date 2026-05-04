import { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function timeAgo(date) {
  const diff = (Date.now() - new Date(date)) / 1000;
  if (diff < 60) return 'hace un momento';
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
  return `hace ${Math.floor(diff / 86400)} días`;
}

export default function Novedades() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('mangas')
      .select('id, title, cover_url, genre, rank, is_trending, created_at')
      .order('created_at', { ascending: false })
      .limit(40)
      .then(({ data }) => {
        if (!data || data.length === 0) {
          supabase
            .from('mangas')
            .select('id, title, cover_url, genre, rank, is_trending')
            .order('rank', { ascending: true })
            .limit(40)
            .then(({ data: fallback }) => {
              setMangas(fallback || []);
              setLoading(false);
            });
        } else {
          setMangas(data);
          setLoading(false);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      {/* Header */}
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Flame className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Novedades</h1>
          </div>
          <p className="text-manga-muted text-sm">Últimas actualizaciones de capítulos</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-manga-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {mangas.map((manga, i) => (
              <Link
                key={manga.id}
                to={`/manga/${manga.id}`}
                className="flex items-center gap-4 bg-manga-card border border-manga-border hover:border-manga-red rounded-xl px-4 py-3 transition-all group"
              >
                {/* Cover */}
                <div className="w-10 h-14 flex-shrink-0 overflow-hidden rounded border border-manga-border">
                  <img
                    src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/40/56`}
                    alt={manga.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate group-hover:text-manga-red transition-colors">
                    {manga.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-manga-muted text-xs">{manga.genre}</span>
                    {manga.is_trending && (
                      <span className="flex items-center gap-1 text-manga-red text-xs font-bold">
                        <Flame className="w-3 h-3" /> Trending
                      </span>
                    )}
                  </div>
                </div>

                {/* Chapter */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-white text-xs font-bold">Cap. Nuevo</p>
                  <div className="flex items-center gap-1 text-manga-muted text-xs mt-0.5 justify-end">
                    <Clock className="w-3 h-3" />
                    <span>{manga.created_at ? timeAgo(manga.created_at) : `hace ${(i + 1) * 15} min`}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
