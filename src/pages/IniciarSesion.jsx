import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function IniciarSesion() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

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
          <h1 className="text-2xl font-black text-white">Bienvenido de nuevo</h1>
          <p className="text-manga-muted text-sm mt-1">Inicia sesión para continuar leyendo</p>
        </div>

        {/* Form */}
        <div className="bg-manga-card border border-manga-border rounded-2xl p-6">
          <div className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-manga-muted text-xs font-medium uppercase tracking-wide">
                  Contraseña
                </label>
                <a href="#" className="text-manga-red text-xs hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted" />
                <input
                  name="password"
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={handle}
                  placeholder="Tu contraseña"
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
              Iniciar sesión
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-manga-muted text-xs">
              ¿No tienes cuenta?{' '}
              <Link to="/registrarse" className="text-manga-red hover:underline font-medium">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
