import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

const SUBJECTS = [
  'Problema técnico',
  'Contenido incorrecto',
  'Mi cuenta',
  'Propuesta de colaboración',
  'Otro',
];

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

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
          <h2 className="text-white text-xl font-bold mb-2">Mensaje enviado</h2>
          <p className="text-manga-muted text-sm mb-6">
            Gracias por contactarnos. Te responderemos en menos de 48 horas a {form.email}.
          </p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
            className="text-manga-red text-sm hover:underline"
          >
            Enviar otro mensaje
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
            <Mail className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Contacto</h1>
          </div>
          <p className="text-manga-muted text-sm">Estamos aquí para ayudarte</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-4">
            <div className="bg-manga-card border border-manga-border rounded-xl p-4">
              <Mail className="w-5 h-5 text-manga-red mb-2" />
              <p className="text-white text-sm font-bold">Email</p>
              <p className="text-manga-muted text-xs mt-1">soporte@mangaline.com</p>
            </div>
            <div className="bg-manga-card border border-manga-border rounded-xl p-4">
              <MessageSquare className="w-5 h-5 text-manga-red mb-2" />
              <p className="text-white text-sm font-bold">Tiempo de respuesta</p>
              <p className="text-manga-muted text-xs mt-1">Menos de 48 horas</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">Nombre</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handle}
                  required
                  placeholder="Tu nombre"
                  className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                />
              </div>
              <div>
                <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handle}
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">Asunto</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handle}
                required
                className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text outline-none focus:border-manga-red transition-colors"
              >
                <option value="">Selecciona un asunto</option>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">Mensaje</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                required
                rows={5}
                placeholder="Describe tu consulta con el mayor detalle posible..."
                className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
