import { useState } from 'react';
import { BookPlus, Send, CheckCircle } from 'lucide-react';

export default function SolicitarManga() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', genre: '', source: '', notes: '', email: '' });

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
          <h2 className="text-white text-xl font-bold mb-2">Solicitud enviada</h2>
          <p className="text-manga-muted text-sm mb-6">
            Hemos recibido tu solicitud para <strong className="text-white">{form.title}</strong>. La revisaremos y te notificaremos si es aprobada.
          </p>
          <button
            onClick={() => { setSent(false); setForm({ title: '', author: '', genre: '', source: '', notes: '', email: '' }); }}
            className="text-manga-red text-sm hover:underline"
          >
            Solicitar otro manga
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
            <BookPlus className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Solicitar manga</h1>
          </div>
          <p className="text-manga-muted text-sm">Pide que agreguemos un título a nuestra biblioteca</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-manga-card border border-manga-border rounded-xl p-4 mb-6 text-sm text-manga-muted">
          📋 Revisamos todas las solicitudes semanalmente. Los títulos más solicitados tienen mayor prioridad.
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Título del manga <span className="text-manga-red">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handle}
                required
                placeholder="Ej: One Piece"
                className="w-full bg-manga-bg border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
              />
            </div>
            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Autor / Mangaka
              </label>
              <input
                name="author"
                value={form.author}
                onChange={handle}
                placeholder="Ej: Eiichiro Oda"
                className="w-full bg-manga-bg border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              Género
            </label>
            <input
              name="genre"
              value={form.genre}
              onChange={handle}
              placeholder="Ej: Acción, Aventura"
              className="w-full bg-manga-bg border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
            />
          </div>

          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              Enlace de referencia (MyAnimeList, AniList, etc.)
            </label>
            <input
              name="source"
              value={form.source}
              onChange={handle}
              placeholder="https://myanimelist.net/manga/..."
              className="w-full bg-manga-bg border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
            />
          </div>

          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              Notas adicionales
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handle}
              rows={3}
              placeholder="¿Por qué quieres que agreguemos este manga?"
              className="w-full bg-manga-bg border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
              Tu email (para notificarte cuando esté disponible)
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="tu@email.com"
              className="w-full bg-manga-bg border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            <Send className="w-4 h-4" />
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}
