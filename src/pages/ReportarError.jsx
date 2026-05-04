import { useState } from 'react';
import { Bug, Send, CheckCircle } from 'lucide-react';

const ERROR_TYPES = [
  'Capítulo no carga',
  'Imágenes rotas o incorrectas',
  'Traducción incorrecta',
  'Error en la lectura',
  'Problema con mi cuenta',
  'Error en el buscador',
  'Otro',
];

export default function ReportarError() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ type: '', url: '', description: '', email: '' });

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-manga-bg pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Reporte enviado</h2>
          <p className="text-manga-muted text-sm mb-6">
            Gracias por ayudarnos a mejorar. Revisaremos tu reporte a la brevedad.
          </p>
          <button
            onClick={() => { setSent(false); setForm({ type: '', url: '', description: '', email: '' }); }}
            className="text-manga-red text-sm hover:underline"
          >
            Enviar otro reporte
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Bug className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Reportar error</h1>
          </div>
          <p className="text-manga-muted text-sm">Ayúdanos a mejorar la plataforma</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              Tipo de error
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handle}
              required
              className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text outline-none focus:border-manga-red transition-colors"
            >
              <option value="">Selecciona el tipo de error</option>
              {ERROR_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              URL donde ocurre el error
            </label>
            <input
              name="url"
              value={form.url}
              onChange={handle}
              placeholder="https://mangaline.com/manga/..."
              className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
            />
          </div>

          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              Descripción del error <span className="text-manga-red">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handle}
              required
              rows={5}
              placeholder="Describe qué pasó, qué esperabas que pasara, y los pasos para reproducirlo..."
              className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              Tu email (opcional, para notificarte cuando se resuelva)
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="tu@email.com"
              className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            <Send className="w-4 h-4" />
            Enviar reporte
          </button>
        </form>
      </div>
    </div>
  );
}
