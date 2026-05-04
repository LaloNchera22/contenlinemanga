import { Database, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabaseClient';

export default function DbConfigBanner() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
      <Database className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-yellow-400 text-sm font-semibold mb-0.5">Base de datos no configurada</p>
        <p className="text-yellow-400/70 text-xs">
          Configura tu proyecto de Supabase para ver el contenido real.{' '}
          <Link to="/configuracion" className="underline hover:text-yellow-300 transition-colors">
            Ir a Configuración
          </Link>
        </p>
      </div>
      <Link
        to="/configuracion"
        className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/10 px-3 py-1.5 rounded-lg transition-colors"
      >
        <Settings className="w-3.5 h-3.5" />
        Configurar
      </Link>
    </div>
  );
}
