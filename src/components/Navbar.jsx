import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, BookOpen, Bell, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef(null);

  const links = [
    { label: 'Inicio', href: '/' },
    { label: 'Explorar', href: '#explorar' },
    { label: 'Popular', href: '#popular' },
    { label: 'Géneros', href: '#generos' },
    { label: 'Novedades', href: '#novedades' },
  ];

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      const { data } = await supabase
        .from('mangas')
        .select('id, title, genre, cover_url')
        .ilike('title', `%${query.trim()}%`)
        .limit(6);
      setResults(data || []);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery('');
    setResults([]);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const SearchDropdown = () =>
    results.length > 0 ? (
      <div className="absolute top-full left-0 right-0 mt-1 bg-manga-card border border-manga-border rounded-xl shadow-2xl overflow-hidden z-50">
        {results.map((manga) => (
          <Link
            key={manga.id}
            to={`/manga/${manga.id}`}
            onClick={closeSearch}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-manga-border transition-colors group"
          >
            <img
              src={manga.cover_url || `https://picsum.photos/seed/${manga.id}/40/56`}
              alt={manga.title}
              className="w-8 h-11 object-cover rounded-md flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate group-hover:text-manga-red transition-colors">
                {manga.title}
              </p>
              <p className="text-manga-muted text-xs truncate">{manga.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    ) : null;

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-manga-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-manga-red rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              Manga<span className="text-manga-red">Line</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-manga-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Translator link */}
          <Link
            to="/traductor"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold bg-manga-purple/20 hover:bg-manga-purple/30 text-manga-purple px-4 py-2 rounded-lg transition-colors border border-manga-purple/30"
          >
            <Languages className="w-4 h-4" />
            Traductor
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {searchOpen ? (
              <div ref={searchRef} className="relative">
                <div className="flex items-center gap-2 bg-manga-card border border-manga-border rounded-lg px-3 py-1.5">
                  <Search className="w-4 h-4 text-manga-muted flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar manga..."
                    className="bg-transparent text-sm text-manga-text outline-none w-48"
                  />
                  {searching && (
                    <span className="w-3 h-3 border-2 border-manga-muted border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  )}
                  <button onClick={closeSearch}>
                    <X className="w-3.5 h-3.5 text-manga-muted" />
                  </button>
                </div>
                <SearchDropdown />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-manga-muted hover:text-white transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <button className="p-2 text-manga-muted hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <a href="#" className="text-sm text-manga-muted hover:text-white transition-colors px-3 py-1.5">
              Iniciar sesión
            </a>
            <a
              href="#"
              className="text-sm font-semibold bg-manga-red hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Registrarse
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-manga-muted hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-manga-muted hover:text-white"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div ref={searchRef} className="relative">
              <div className="flex items-center gap-2 bg-manga-card border border-manga-border rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-manga-muted flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar manga..."
                  className="bg-transparent text-sm text-manga-text outline-none w-full"
                />
                {searching && (
                  <span className="w-3 h-3 border-2 border-manga-muted border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}
              </div>
              <SearchDropdown />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-manga-border mt-1">
            <nav className="flex flex-col gap-1 pt-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-manga-muted hover:text-white hover:bg-manga-card px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/traductor"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-manga-purple hover:bg-manga-purple/10 px-3 py-2 rounded-lg transition-colors text-sm font-medium border border-manga-purple/30 mx-0"
              >
                <Languages className="w-4 h-4" />
                Traductor de Manga
              </Link>
              <div className="flex gap-2 mt-3 px-3">
                <a
                  href="#"
                  className="flex-1 text-center text-sm text-manga-muted border border-manga-border hover:border-manga-red px-4 py-2 rounded-lg transition-colors"
                >
                  Iniciar sesión
                </a>
                <a
                  href="#"
                  className="flex-1 text-center text-sm font-semibold bg-manga-red hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Registrarse
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
