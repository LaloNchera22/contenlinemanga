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
      .select('id, title, cover_url, genre, rank, is_trending, description')
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
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-black text-xs font-mono uppercase tracking-widest">Cargando...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="border border-black p-12 text-center max-w-sm mx-4">
          <p className="text-6xl font-black text-black mb-4">404</p>
          <p className="font-bold text-black text-lg mb-1 uppercase tracking-tight">Manga no encontrado</p>
          <p className="text-gray-500 text-sm mb-8">Este manga no existe o fue eliminado.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-black bg-black text-white text-sm font-bold px-6 py-3 hover:bg-white hover:text-black transition-colors uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Brutalist header strip */}
      <div className="border-b border-black bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-black text-xs font-bold uppercase tracking-widest hover:underline group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Volver
          </Link>
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            MANGA/{id}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row gap-10">
          {/* Cover — grayscale by default, full color on hover */}
          <div className="flex-shrink-0">
            <div className="relative w-40 sm:w-52 border border-black">
              <img
                src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/200/280`}
                alt={manga.title}
                className="w-full block grayscale hover:grayscale-0 transition-all duration-500"
              />
              {manga.is_trending && (
                <div className="absolute top-0 right-0 bg-black text-white text-xs font-black px-2 py-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  HOT
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Genre badge */}
            <span className="inline-block border border-black text-black text-xs font-bold px-3 py-1 uppercase tracking-widest mb-4">
              {manga.genre}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-none mb-6 break-words uppercase">
              {manga.title}
            </h1>

            {/* Stats row */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-1.5 border border-black px-3 py-1.5">
                <Hash className="w-3.5 h-3.5 text-black" />
                <span className="text-black text-xs font-bold uppercase tracking-wide">Rank {manga.rank}</span>
              </div>
              {manga.is_trending && (
                <div className="flex items-center gap-1.5 border border-black px-3 py-1.5 bg-black">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wide">Trending</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-black mb-6" />

            {/* Description */}
            <div className="border border-black p-5 mb-8">
              <h2 className="text-xs font-black text-black uppercase tracking-widest mb-3 border-b border-black pb-2">
                Sinopsis
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed font-mono">
                {manga.description || 'No hay descripción disponible para este manga.'}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-black hover:bg-white text-white hover:text-black border border-black font-black py-3.5 text-sm uppercase tracking-widest transition-colors">
                LEER AHORA
              </button>
              <button className="flex-1 bg-white hover:bg-black text-black hover:text-white border border-black font-bold py-3.5 text-sm uppercase tracking-widest transition-colors">
                + AÑADIR A LISTA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
