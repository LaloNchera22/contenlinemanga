import { Cookie } from 'lucide-react';

const COOKIE_TYPES = [
  {
    name: 'Esenciales',
    color: 'text-green-400 bg-green-500/10 border-green-500/20',
    required: true,
    desc: 'Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.',
    examples: ['Sesión de usuario', 'Token de autenticación', 'Preferencias de idioma'],
  },
  {
    name: 'Funcionales',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    required: false,
    desc: 'Permiten recordar tus preferencias para mejorar tu experiencia.',
    examples: ['Modo de lectura', 'Posición en el capítulo', 'Historial de lectura local'],
  },
  {
    name: 'Analíticas',
    color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    required: false,
    desc: 'Nos ayudan a entender cómo se usa la plataforma para mejorarla.',
    examples: ['Páginas más visitadas', 'Tiempo en la plataforma', 'Errores de carga'],
  },
];

export default function Cookies() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Cookie className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Política de cookies</h1>
          </div>
          <p className="text-manga-muted text-sm">Última actualización: 1 de enero de 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-manga-muted text-sm leading-relaxed">
          <p>
            MangaLine usa cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico
            y personalizar el contenido. Esta política explica qué cookies usamos y por qué.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">¿Qué son las cookies?</h2>
          <p className="text-manga-muted text-sm leading-relaxed">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
            un sitio web. Permiten que el sitio recuerde tus acciones y preferencias durante un período
            de tiempo.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">Tipos de cookies que usamos</h2>
          <div className="space-y-4">
            {COOKIE_TYPES.map((type) => (
              <div key={type.name} className={`border rounded-xl p-5 ${type.color.split(' ').slice(1).join(' ')}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold text-sm ${type.color.split(' ')[0]}`}>{type.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded border ${type.required ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-manga-bg text-manga-muted border-manga-border'}`}>
                    {type.required ? 'Obligatoria' : 'Opcional'}
                  </span>
                </div>
                <p className="text-manga-muted text-sm mb-3">{type.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((ex) => (
                    <span key={ex} className="text-xs bg-manga-bg text-manga-muted px-2 py-1 rounded border border-manga-border">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-3">Cómo controlar las cookies</h2>
          <p className="text-manga-muted text-sm leading-relaxed mb-3">
            Puedes controlar las cookies desde la configuración de tu navegador. Ten en cuenta que
            desactivar ciertas cookies puede afectar la funcionalidad del sitio.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser) => (
              <a
                key={browser}
                href="#"
                className="text-xs bg-manga-card border border-manga-border hover:border-manga-red text-manga-muted hover:text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                {browser}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-3">Contacto</h2>
          <p className="text-manga-muted text-sm">
            Si tienes preguntas sobre nuestra política de cookies, escríbenos a{' '}
            <a href="mailto:privacidad@mangaline.com" className="text-manga-red hover:underline">
              privacidad@mangaline.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
