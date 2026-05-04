import { useState } from 'react';
import { Settings, Key, Database, Check, Eye, EyeOff, AlertCircle, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { isGeminiConfigured } from '../lib/gemini';

function ApiConfigSection() {
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(() => localStorage.getItem('supabase_anon_key') || '');
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showSupabaseKey, setShowSupabaseKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (supabaseUrl.trim()) {
      localStorage.setItem('supabase_url', supabaseUrl.trim());
    } else {
      localStorage.removeItem('supabase_url');
    }
    if (supabaseKey.trim()) {
      localStorage.setItem('supabase_anon_key', supabaseKey.trim());
    } else {
      localStorage.removeItem('supabase_anon_key');
    }
    if (geminiKey.trim()) {
      localStorage.setItem('gemini_api_key', geminiKey.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    setSaved(true);
    // Reload to reinitialize Supabase client with new credentials
    setTimeout(() => window.location.reload(), 800);
  }

  const dbOk = isSupabaseConfigured();
  const geminiOk = isGeminiConfigured();

  return (
    <div className="bg-manga-card border border-manga-border rounded-2xl overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-manga-border flex items-center gap-3">
        <Key className="w-5 h-5 text-manga-purple" />
        <h2 className="text-white font-bold text-base">Configuración de APIs</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Status badges */}
        <div className="flex flex-wrap gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
            dbOk
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-manga-red/10 border-manga-red/30 text-manga-red'
          }`}>
            <Database className="w-3.5 h-3.5" />
            Supabase: {dbOk ? 'Conectado' : 'No configurado'}
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
            geminiOk
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
          }`}>
            <Key className="w-3.5 h-3.5" />
            Gemini AI: {geminiOk ? 'Configurado' : 'Sin API key'}
          </div>
        </div>

        {/* Supabase */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm font-semibold flex items-center gap-2">
              <Database className="w-4 h-4 text-manga-muted" />
              Supabase (Base de datos)
            </h3>
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-manga-purple hover:underline flex items-center gap-1"
            >
              Crear proyecto <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-manga-muted mb-1.5 block uppercase tracking-wide font-medium">
                URL del proyecto
              </label>
              <input
                type="url"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://tu-proyecto.supabase.co"
                className="w-full bg-manga-bg border border-manga-border focus:border-manga-purple rounded-xl px-3 py-2.5 text-sm text-manga-text placeholder-manga-muted/50 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-manga-muted mb-1.5 block uppercase tracking-wide font-medium">
                Anon Key
              </label>
              <div className="relative">
                <input
                  type={showSupabaseKey ? 'text' : 'password'}
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  placeholder="eyJhbGciOi..."
                  className="w-full bg-manga-bg border border-manga-border focus:border-manga-purple rounded-xl px-3 py-2.5 pr-10 text-sm text-manga-text placeholder-manga-muted/50 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowSupabaseKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-manga-muted hover:text-white transition-colors"
                >
                  {showSupabaseKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-manga-muted/60 mt-1.5">
                La encontrarás en Project Settings → API → anon public
              </p>
            </div>
          </div>
        </div>

        {/* Gemini */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm font-semibold flex items-center gap-2">
              <Key className="w-4 h-4 text-manga-muted" />
              Google Gemini AI (Traductor)
            </h3>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-manga-purple hover:underline flex items-center gap-1"
            >
              Obtener key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>
            <label className="text-xs text-manga-muted mb-1.5 block uppercase tracking-wide font-medium">
              API Key
            </label>
            <div className="relative">
              <input
                type={showGeminiKey ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full bg-manga-bg border border-manga-border focus:border-manga-purple rounded-xl px-3 py-2.5 pr-10 text-sm text-manga-text placeholder-manga-muted/50 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowGeminiKey((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-manga-muted hover:text-white transition-colors"
              >
                {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-manga-muted/60 mt-1.5">
              Necesaria para usar el Traductor de Manga con IA. Gratis en Google AI Studio.
            </p>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-start gap-2.5 bg-manga-bg border border-manga-border rounded-xl p-3">
          <AlertCircle className="w-4 h-4 text-manga-muted flex-shrink-0 mt-0.5" />
          <p className="text-xs text-manga-muted leading-relaxed">
            Las claves se guardan <span className="text-white">localmente en tu navegador</span> (localStorage) y nunca se envían a ningún servidor externo. Al guardar, la página se recargará para aplicar los cambios.
          </p>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
            saved
              ? 'bg-green-500/20 text-green-400 border border-green-500/40'
              : 'bg-manga-purple hover:bg-purple-600 text-white'
          }`}
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Guardado — recargando...</>
          ) : (
            'Guardar configuración'
          )}
        </button>
      </div>
    </div>
  );
}

export default function Configuracion() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Settings className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Configuración</h1>
          </div>
          <p className="text-manga-muted text-sm">Personaliza tu experiencia y conecta tus servicios</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ApiConfigSection />
      </div>
    </div>
  );
}
