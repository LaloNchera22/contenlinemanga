import { History, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Historial() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <History className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Historial</h1>
          </div>
          <p className="text-manga-muted text-sm">Continúa donde lo dejaste</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-manga-card border border-manga-border rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-manga-muted" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Inicia sesión para continuar</h2>
          <p className="text-manga-muted text-sm mb-6">
            Tu historial de lectura se sincroniza entre dispositivos cuando tienes una cuenta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/iniciar-sesion"
              className="bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/registrarse"
              className="bg-manga-card border border-manga-border hover:border-manga-red text-manga-text font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
