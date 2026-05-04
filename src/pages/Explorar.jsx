import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { genres } from '../data/manga';
import DbConfigBanner from '../components/DbConfigBanner';

export default function Explorar() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('rank');

  useEffect(() => {
    async function fetchMangas() {
      setLoading(true);
      let query = supabase
        .from('mangas')
        .select('id, title, cover_url, genre, rank, is_trending');

      if (search.trim().length >= 2) {
        query = query.ilike('title', `%${search.trim()}%`);
      }
      if (selectedGenre) {
        query = query.ilike('genre', `%${selectedGenre}%`);
      }
      if (sortBy === 'rank') {
        query = query.order('rank', { ascending: true });
      } else if (sortBy === 'title') {
        query = query.order('title', { ascending: true });
      }

      const { data } = await query.limit(48);
      setMangas(data || []);
      setLoading(false);
    }
    fetchMangas();
  }, [search, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      {/* Header */}
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-black text-white mb-1">Explorar Manga</h1>
          <p className="text-manga-muted text-sm">Descubre miles de títulos en español</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DbConfigBanner />
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título..."
              className="w-full bg-manga-card border border-manga-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-manga-card border border-manga-border rounded-lg pl-10 pr-8 py-2.5 text-sm text-manga-text outline-none focus:border-manga-red transition-colors appearance-none cursor-pointer"
            >
              <option value="">Todos los géneros</option>
              {genres.map((g) => (
                <option key={g.name} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-manga-card border border-manga-border rounded-lg pl-10 pr-8 py-2.5 text-sm text-manga-text outline-none focus:border-manga-red transition-colors appearance-none cursor-pointer"
            >
              <option value="rank">Por ranking</option>
              <option value="title">Por título</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-manga-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : mangas.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-manga-muted text-lg mb-2">No se encontraron resultados</p>
            <p className="text-manga-muted text-sm">Intenta con otros filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mangas.map((manga) => (
              <Link
                key={manga.id}
                to={`/manga/${manga.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg border border-manga-border group-hover:border-manga-red transition-colors">
                  <img
                    src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/200/280`}
                    alt={manga.title}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {manga.is_trending && (
                    <span className="absolute top-2 left-2 bg-manga-red text-white text-xs font-bold px-2 py-0.5 rounded">
                      HOT
                    </span>
                  )}
                </div>
                <div className="mt-2 px-0.5">
                  <p className="text-white text-xs font-semibold truncate group-hover:text-manga-red transition-colors">
                    {manga.title}
                  </p>
                  <p className="text-manga-muted text-xs truncate mt-0.5">{manga.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
