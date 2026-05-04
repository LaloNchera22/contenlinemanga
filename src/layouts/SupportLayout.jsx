import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, ArrowLeft, HelpCircle, Mail, AlertCircle, PlusCircle, Code2 } from 'lucide-react';
import Footer from '../components/Footer';

const supportLinks = [
  { label: 'Centro de ayuda', to: '/centro-de-ayuda', icon: HelpCircle },
  { label: 'Contacto', to: '/contacto', icon: Mail },
  { label: 'Reportar error', to: '/reportar-error', icon: AlertCircle },
  { label: 'Solicitar manga', to: '/solicitar-manga', icon: PlusCircle },
  { label: 'API', to: '/api', icon: Code2 },
];

export default function SupportLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#081510] text-manga-text">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-900/40 bg-[#060f0a]/95 backdrop-blur-md">
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
              <div className="h-5 w-px bg-emerald-900/60" />
              <Link to="/" className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-white">
                  Manga<span className="text-emerald-400">Line</span>
                </span>
              </Link>
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <HelpCircle className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-medium">Soporte</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {supportLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === to
                      ? 'bg-emerald-600/20 text-emerald-300 font-medium'
                      : 'text-slate-400 hover:text-white hover:bg-emerald-900/30'
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
