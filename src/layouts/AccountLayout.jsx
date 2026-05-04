import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, User, ArrowLeft, BookMarked, History, Settings } from 'lucide-react';
import Footer from '../components/Footer';

const accountLinks = [
  { label: 'Registrarse', to: '/registrarse', icon: User },
  { label: 'Iniciar sesión', to: '/iniciar-sesion', icon: User },
  { label: 'Lista de lectura', to: '/lista-de-lectura', icon: BookMarked },
  { label: 'Historial', to: '/historial', icon: History },
  { label: 'Configuración', to: '/configuracion', icon: Settings },
];

export default function AccountLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-manga-text">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-900/40 bg-[#080d1a]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Plataforma
              </Link>
              <div className="h-5 w-px bg-blue-900/60" />
              <Link to="/" className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-white">
                  Manga<span className="text-blue-400">Line</span>
                </span>
              </Link>
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <User className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 text-xs font-medium">Mi Cuenta</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {accountLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === to
                      ? 'bg-blue-600/20 text-blue-300 font-medium'
                      : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
