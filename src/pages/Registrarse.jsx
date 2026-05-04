import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function Registrarse() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen bg-manga-bg pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-manga-red rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Crea tu cuenta</h1>
          <p className="text-manga-muted text-sm mt-1">Únete a más de 2 millones de lectores</p>
        </div>

        {/* Form */}
        <div className="bg-manga-card border border-manga-border rounded-2xl p-6">
          <div className="space-y-4">
            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Nombre de usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handle}
                  placeholder="lector_manga"
                  className="w-full bg-manga-bg border border-manga-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="tu@email.com"
                  className="w-full bg-manga-bg border border-manga-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-manga-muted text-xs font-medium uppercase tracking-wide block mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
                <input
                  name="password"
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={handle}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-manga-bg border border-manga-border rounded-lg pl-10 pr-10 py-2.5 text-sm text-manga-text placeholder-manga-muted outline-none focus:border-manga-red transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-manga-muted hover:text-white transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button className="w-full bg-manga-red hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors text-sm mt-2">
              Crear cuenta gratis
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-manga-muted text-xs">
              ¿Ya tienes cuenta?{' '}
              <Link to="/iniciar-sesion" className="text-manga-red hover:underline font-medium">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        <p className="text-manga-muted text-xs text-center mt-4">
          Al registrarte aceptas nuestros{' '}
          <Link to="/terminos-de-uso" className="text-manga-red hover:underline">Términos de uso</Link>
          {' '}y{' '}
          <Link to="/privacidad" className="text-manga-red hover:underline">Política de privacidad</Link>
        </p>
      </div>
    </div>
  );
}
