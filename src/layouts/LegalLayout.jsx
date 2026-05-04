import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, ArrowLeft, FileText, Shield, Cookie, AlertTriangle, Info } from 'lucide-react';
import Footer from '../components/Footer';

const legalLinks = [
  { label: 'Términos de uso', to: '/terminos-de-uso', icon: FileText },
  { label: 'Privacidad', to: '/privacidad', icon: Shield },
  { label: 'Cookies', to: '/cookies', icon: Cookie },
  { label: 'DMCA', to: '/dmca', icon: AlertTriangle },
  { label: 'Sobre nosotros', to: '/sobre-nosotros', icon: Info },
];

export default function LegalLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#0e0e10] text-manga-text">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700/40 bg-[#0a0a0c]/95 backdrop-blur-md">
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
              <div className="h-5 w-px bg-slate-700/60" />
              <Link to="/" className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-white">
                  Manga<span className="text-slate-400">Line</span>
                </span>
              </Link>
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-500/10 border border-slate-500/30 rounded-full">
                <FileText className="w-3 h-3 text-slate-400" />
                <span className="text-slate-400 text-xs font-medium">Legal</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {legalLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === to
                      ? 'bg-slate-600/30 text-slate-200 font-medium'
                      : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
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
