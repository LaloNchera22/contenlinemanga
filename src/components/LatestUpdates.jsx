import { useState, useEffect } from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function UpdateRow({ item, index }) {
  return (
    <Link
      to={`/manga/${item.id}`}
      className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-manga-card transition-colors group"
    >
      <span className={`text-lg font-black w-5 text-center flex-shrink-0 ${index < 3 ? 'text-manga-red' : 'text-manga-muted'}`}>
        {index + 1}
      </span>

      <img
        src={item.cover_url || `https://picsum.photos/seed/${item.id}/80/110`}
        alt={item.title}
        className="w-10 h-14 sm:w-12 sm:h-16 object-cover rounded-lg flex-shrink-0"
        loading="lazy"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-white text-sm font-semibold truncate group-hover:text-manga-red transition-colors">
          {item.title}
        </h3>
        <p className="text-manga-muted text-xs mt-0.5">{item.genre}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="bg-manga-red/20 text-manga-red text-xs px-2 py-0.5 rounded-md font-medium">
            Rank #{item.rank}
          </span>
        </div>
      </div>

      {item.is_trending && (
        <div className="flex-shrink-0">
          <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-md font-medium">HOT</span>
        </div>
      )}
    </Link>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-3 animate-pulse">
      <div className="w-5 h-5 bg-manga-card rounded" />
      <div className="w-10 h-14 bg-manga-card rounded-lg" />
      <div className="flex-1">
        <div className="h-3 bg-manga-card rounded w-3/4 mb-2" />
        <div className="h-3 bg-manga-card rounded w-1/2" />
      </div>
    </div>
  );
}

export default function LatestUpdates() {
  const [updates, setUpdates] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('mangas').select('id, title, cover_url, rank, genre, is_trending').order('rank', { ascending: true }).limit(6),
      supabase.from('mangas').select('id, title, cover_url, rank, genre, is_trending').eq('is_trending', true).order('rank', { ascending: true }).limit(4),
    ]).then(([{ data: updatesData }, { data: trendingData }]) => {
      setUpdates(updatesData || []);
      setTrending(trendingData || []);
      setLoading(false);
    });
  }, []);

  return (
    <section id="novedades" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest updates — 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Últimas <span className="gradient-text">Actualizaciones</span>
                </h2>
                <p className="text-manga-muted text-sm mt-1">Recién llegados a la plataforma</p>
              </div>
              <a
                href="#"
                className="flex items-center gap-1 text-manga-red hover:text-red-400 text-sm font-semibold transition-colors"
              >
                Ver todo
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-manga-card border border-manga-border rounded-2xl p-2 divide-y divide-manga-border/50">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                : updates.map((item, i) => <UpdateRow key={item.id} item={item} index={i} />)
              }
            </div>
          </div>

          {/* Trending sidebar */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-manga-red" />
              <h2 className="text-xl font-black text-white">Tendencias</h2>
            </div>

            <div className="bg-manga-card border border-manga-border rounded-2xl overflow-hidden">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 border-b border-manga-border/50 last:border-0 animate-pulse">
                      <div className="w-12 h-16 bg-manga-border rounded-lg" />
                      <div className="flex-1">
                        <div className="h-3 bg-manga-border rounded w-3/4 mb-2" />
                        <div className="h-3 bg-manga-border rounded w-1/2" />
                      </div>
                    </div>
                  ))
                : trending.map((item, i) => (
                    <Link
                      key={item.id}
                      to={`/manga/${item.id}`}
                      className="flex items-center gap-3 p-4 hover:bg-manga-border transition-colors border-b border-manga-border/50 last:border-0 group"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.cover_url || `https://picsum.photos/seed/${item.id}/80/110`}
                          alt={item.title}
                          className="w-12 h-16 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <span
                          className={`absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white ${
                            i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-600' : 'bg-manga-muted'
                          }`}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold truncate group-hover:text-manga-red transition-colors">
                          {item.title}
                        </p>
                        <p className="text-manga-muted text-xs mt-0.5">{item.genre}</p>
                      </div>
                    </Link>
                  ))
              }
              {!loading && trending.length === 0 && (
                <p className="text-manga-muted text-sm text-center py-8">No hay tendencias aún</p>
              )}
            </div>

            {/* CTA banner */}
            <div className="mt-4 bg-gradient-to-br from-manga-red/20 to-manga-purple/20 border border-manga-red/30 rounded-2xl p-5 text-center">
              <p className="text-white font-bold mb-1">Notificaciones</p>
              <p className="text-manga-muted text-xs mb-4">
                Entérate cuando salgan nuevos capítulos
              </p>
              <button className="w-full bg-manga-red hover:bg-red-600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors">
                Activar alertas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
