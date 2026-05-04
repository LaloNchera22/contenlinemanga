import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Hash } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    supabase
      .from('mangas')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setManga(data);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-manga-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-manga-muted text-sm">Cargando manga...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-black text-manga-red mb-4">404</p>
          <p className="text-white font-bold text-xl mb-2">Manga no encontrado</p>
          <p className="text-manga-muted text-sm mb-6">Este manga no existe o fue eliminado.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/1200/400`}
          alt={manga.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-manga-bg via-manga-bg/60 to-transparent" />

        {/* Glow accents */}
        <div className="hero-glow w-64 h-64 bg-manga-red -top-10 -right-10 opacity-30" style={{ position: 'absolute' }} />
        <div className="hero-glow w-48 h-48 bg-manga-purple bottom-0 left-1/4 opacity-20" style={{ position: 'absolute' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative pb-20">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-manga-muted hover:text-white text-sm font-semibold mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Cover */}
          <div className="flex-shrink-0">
            <div className="relative w-40 sm:w-52">
              <img
                src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/200/280`}
                alt={manga.title}
                className="w-full rounded-2xl shadow-2xl border-2 border-manga-border"
              />
              {manga.is_trending && (
                <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-black px-2 py-1 rounded-lg flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  HOT
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Genre badge */}
            <span className="inline-block bg-manga-red/20 text-manga-red text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              {manga.genre}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 break-words">
              {manga.title}
            </h1>

            {/* Stats row */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 bg-manga-card border border-manga-border rounded-lg px-3 py-1.5">
                <Hash className="w-4 h-4 text-manga-red" />
                <span className="text-white text-sm font-bold">Rank {manga.rank}</span>
              </div>
              {manga.is_trending && (
                <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-1.5">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm font-bold">Trending</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-12 h-1 bg-manga-red rounded-full mb-4" />

            {/* Description */}
            <div className="bg-manga-card border border-manga-border rounded-2xl p-5">
              <h2 className="text-xs font-black text-manga-muted uppercase tracking-widest mb-3">Sinopsis</h2>
              <p className="text-manga-text text-sm leading-relaxed">
                {manga.description || 'No hay descripción disponible para este manga.'}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="flex-1 bg-manga-red hover:bg-red-600 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 tracking-wide">
                LEER AHORA
              </button>
              <button className="flex-1 bg-manga-card hover:bg-manga-border text-white font-bold py-3.5 rounded-xl transition-all border border-manga-border tracking-wide">
                + AÑADIR A LISTA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
