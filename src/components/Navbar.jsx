import { useState } from 'react';
import { Search, Menu, X, BookOpen, Bell, User } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const links = [
    { label: 'Inicio', href: '#' },
    { label: 'Explorar', href: '#explorar' },
    { label: 'Popular', href: '#popular' },
    { label: 'Géneros', href: '#generos' },
    { label: 'Novedades', href: '#novedades' },
  ];

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-manga-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-manga-red rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              Manga<span className="text-manga-red">Line</span>
            </span>
          </a>

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

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-manga-card border border-manga-border rounded-lg px-3 py-1.5">
                <Search className="w-4 h-4 text-manga-muted" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar manga..."
                  className="bg-transparent text-sm text-manga-text outline-none w-40"
                  onBlur={() => setSearchOpen(false)}
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="w-3.5 h-3.5 text-manga-muted" />
                </button>
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
            <a
              href="#"
              className="text-sm text-manga-muted hover:text-white transition-colors px-3 py-1.5"
            >
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
            <div className="flex items-center gap-2 bg-manga-card border border-manga-border rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-manga-muted flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar manga..."
                className="bg-transparent text-sm text-manga-text outline-none w-full"
              />
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
