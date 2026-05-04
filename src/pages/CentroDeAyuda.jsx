import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

const faqs = [
  {
    category: 'Lectura',
    items: [
      { q: '¿Es gratis leer manga en MangaLine?', a: 'Sí, MangaLine es completamente gratuito. Puedes leer todos los títulos disponibles sin pagar nada ni registrarte.' },
      { q: '¿Necesito registrarme para leer?', a: 'No es obligatorio. Puedes leer sin cuenta, pero al registrarte podrás guardar tu lista de lectura, historial y recibir notificaciones de nuevos capítulos.' },
      { q: '¿Puedo descargar manga para leer offline?', a: 'La descarga offline está disponible para usuarios registrados. Desde la página del manga encontrarás el botón de descarga en los capítulos.' },
    ],
  },
  {
    category: 'Cuenta',
    items: [
      { q: '¿Cómo cambio mi contraseña?', a: 'Ve a Configuración > Seguridad > Cambiar contraseña. Si olvidaste tu contraseña, usa la opción "¿Olvidaste tu contraseña?" en el login.' },
      { q: '¿Puedo eliminar mi cuenta?', a: 'Sí. Ve a Configuración > Cuenta > Eliminar cuenta. Ten en cuenta que esta acción es irreversible y perderás todos tus datos.' },
    ],
  },
  {
    category: 'Contenido',
    items: [
      { q: '¿Cómo solicito un manga que no está disponible?', a: 'Puedes solicitarlo desde la sección "Solicitar manga" en el menú de Soporte. Revisamos todas las solicitudes periódicamente.' },
      { q: '¿Con qué frecuencia se actualizan los capítulos?', a: 'Actualizamos la plataforma diariamente con los últimos capítulos disponibles. Sigue los mangas para recibir notificaciones inmediatas.' },
      { q: '¿Por qué no puedo ver un capítulo específico?', a: 'Puede que el capítulo esté siendo procesado o haya sido reportado por problemas de calidad. Intenta nuevamente en unas horas.' },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-manga-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left bg-manga-card hover:bg-manga-border/30 transition-colors"
      >
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-manga-muted flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-manga-muted flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-manga-card border-t border-manga-border">
          <p className="text-manga-muted text-sm leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function CentroDeAyuda() {
  const [search, setSearch] = useState('');

  const filtered = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      {/* Header */}
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-manga-red/20 border border-manga-red/30 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-manga-red" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Centro de ayuda</h1>
          <p className="text-manga-muted text-sm mb-6">¿En qué podemos ayudarte?</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en preguntas frecuentes..."
              className="w-full bg-manga-bg border border-manga-border rounded-xl pl-10 pr-4 py-3 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-white font-bold text-base mb-4 uppercase tracking-wide text-xs text-manga-red">
              {cat.category}
            </h2>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <FAQItem key={item.q} {...item} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-manga-muted">No se encontraron resultados para "{search}"</p>
          </div>
        )}

        <div className="bg-manga-card border border-manga-border rounded-2xl p-6 text-center">
          <p className="text-white font-bold mb-1">¿No encontraste lo que buscabas?</p>
          <p className="text-manga-muted text-sm mb-4">Contacta con nuestro equipo de soporte</p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  );
}
