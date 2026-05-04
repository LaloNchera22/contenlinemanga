import { Code2, Key, Zap, Shield, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function CodeBlock({ code, lang = 'json' }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="relative bg-manga-bg border border-manga-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-manga-border">
        <span className="text-manga-muted text-xs font-mono">{lang}</span>
        <button onClick={copy} className="text-manga-muted hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 text-xs text-manga-text overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const endpoints = [
  {
    method: 'GET',
    path: '/api/v1/mangas',
    desc: 'Lista todos los mangas disponibles',
    params: '?page=1&limit=20&genre=Acción&sort=rank',
    response: `{
  "data": [
    {
      "id": "uuid",
      "title": "Dragon's Ascent",
      "genre": "Acción / Fantasía",
      "rank": 1,
      "is_trending": true,
      "cover_url": "https://..."
    }
  ],
  "total": 5000,
  "page": 1,
  "limit": 20
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/mangas/:id',
    desc: 'Obtiene el detalle de un manga por ID',
    params: '',
    response: `{
  "id": "uuid",
  "title": "Dragon's Ascent",
  "genre": "Acción / Fantasía",
  "description": "...",
  "rank": 1,
  "is_trending": true,
  "cover_url": "https://..."
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/mangas/random',
    desc: 'Devuelve un manga aleatorio',
    params: '?genre=Acción',
    response: `{
  "id": "uuid",
  "title": "...",
  ...
}`,
  },
];

const METHOD_COLOR = {
  GET: 'bg-green-500/20 text-green-400 border-green-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Code2 className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">API de MangaLine</h1>
          </div>
          <p className="text-manga-muted text-sm">Documentación pública para desarrolladores</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Key, title: 'Autenticación', desc: 'API key requerida en el header Authorization' },
            { icon: Zap, title: 'Rate limit', desc: '100 peticiones / minuto por IP' },
            { icon: Shield, title: 'HTTPS', desc: 'Todas las peticiones deben usar HTTPS' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-manga-card border border-manga-border rounded-xl p-4">
              <Icon className="w-5 h-5 text-manga-red mb-2" />
              <p className="text-white text-sm font-bold">{title}</p>
              <p className="text-manga-muted text-xs mt-1">{desc}</p>
            </div>
          ))}
        </div>

        {/* Base URL */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">URL base</h2>
          <CodeBlock code="https://api.mangaline.com/v1" lang="url" />
        </div>

        {/* Auth example */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">Autenticación</h2>
          <CodeBlock
            code={`curl -H "Authorization: Bearer TU_API_KEY" \\
     https://api.mangaline.com/v1/mangas`}
            lang="bash"
          />
        </div>

        {/* Endpoints */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Endpoints</h2>
          <div className="space-y-6">
            {endpoints.map((ep) => (
              <div key={ep.path} className="bg-manga-card border border-manga-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-manga-border">
                  <span className={`text-xs font-black px-2 py-0.5 rounded border ${METHOD_COLOR[ep.method] || ''}`}>
                    {ep.method}
                  </span>
                  <code className="text-white text-sm font-mono">{ep.path}</code>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-manga-muted text-sm">{ep.desc}</p>
                  {ep.params && (
                    <div>
                      <p className="text-manga-muted text-xs uppercase tracking-wide font-medium mb-1">Parámetros</p>
                      <code className="text-manga-text text-xs bg-manga-bg px-3 py-1.5 rounded block font-mono">
                        {ep.params}
                      </code>
                    </div>
                  )}
                  <div>
                    <p className="text-manga-muted text-xs uppercase tracking-wide font-medium mb-1">Respuesta</p>
                    <CodeBlock code={ep.response} lang="json" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get key CTA */}
        <div className="bg-manga-red/10 border border-manga-red/30 rounded-2xl p-6 text-center">
          <h3 className="text-white font-bold text-lg mb-2">¿Quieres acceso a la API?</h3>
          <p className="text-manga-muted text-sm mb-4">
            Regístrate y solicita tu API key gratuita con 100 peticiones/minuto.
          </p>
          <a
            href="/registrarse"
            className="inline-flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Obtener API key gratis
          </a>
        </div>
      </div>
    </div>
  );
}
