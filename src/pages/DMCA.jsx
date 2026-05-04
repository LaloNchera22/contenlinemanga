import { AlertTriangle, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function DMCA() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', work: '', url: '', statement: '',
  });

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
          <p className="text-manga-muted text-sm">
            Hemos recibido tu notificación DMCA. La procesaremos en un plazo de 5 días hábiles y
            te responderemos a {form.email}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <AlertTriangle className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">DMCA</h1>
          </div>
          <p className="text-manga-muted text-sm">Política de derechos de autor y notificaciones de infracción</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Policy text */}
        <div className="space-y-4 text-manga-muted text-sm leading-relaxed">
          <p>
            MangaLine respeta los derechos de propiedad intelectual y espera que sus usuarios hagan lo mismo.
            En respuesta a las notificaciones de los titulares de derechos de autor, eliminaremos contenido
            que infrinja derechos de autor conforme a la Ley de Derechos de Autor del Milenio Digital (DMCA).
          </p>
          <p>
            Si crees que algún contenido en nuestra plataforma infringe tus derechos de autor, puedes
            enviar una notificación de infracción usando el formulario a continuación o enviando un email a{' '}
            <a href="mailto:dmca@mangaline.com" className="text-manga-red hover:underline">dmca@mangaline.com</a>.
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-manga-card border border-manga-border rounded-xl p-5">
          <h2 className="text-white font-bold text-base mb-3">Requisitos de la notificación DMCA</h2>
          <ol className="list-decimal list-inside space-y-2 text-manga-muted text-sm">
            <li>Identificación del trabajo protegido por derechos de autor.</li>
            <li>URL del material presuntamente infractor en nuestra plataforma.</li>
            <li>Información de contacto (nombre, dirección, teléfono, email).</li>
            <li>Declaración de buena fe de que el uso no está autorizado.</li>
            <li>Declaración, bajo pena de perjurio, de que la información es exacta.</li>
            <li>Firma electrónica o física del titular o agente autorizado.</li>
          </ol>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Formulario de notificación DMCA</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                  Nombre completo <span className="text-manga-red">*</span>
                </label>
                <input name="name" value={form.name} onChange={handle} required
                  className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                  placeholder="Tu nombre legal" />
              </div>
              <div>
                <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                  Email <span className="text-manga-red">*</span>
                </label>
                <input name="email" type="email" value={form.email} onChange={handle} required
                  className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                  placeholder="tu@empresa.com" />
              </div>
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Empresa / Editorial (si aplica)
              </label>
              <input name="company" value={form.company} onChange={handle}
                className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                placeholder="Nombre de la empresa" />
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Obra protegida <span className="text-manga-red">*</span>
              </label>
              <input name="work" value={form.work} onChange={handle} required
                className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                placeholder="Título del manga u obra infringida" />
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                URL del contenido infractor <span className="text-manga-red">*</span>
              </label>
              <input name="url" value={form.url} onChange={handle} required
                className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                placeholder="https://mangaline.com/manga/..." />
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Declaración <span className="text-manga-red">*</span>
              </label>
              <textarea name="statement" value={form.statement} onChange={handle} required rows={4}
                className="w-full bg-manga-card border border-manga-border rounded-lg px-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors resize-none"
                placeholder="Declaro, bajo pena de perjurio, que soy el titular de los derechos o estoy autorizado para actuar en nombre del titular..." />
            </div>

            <button type="submit"
              className="flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              Enviar notificación DMCA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
