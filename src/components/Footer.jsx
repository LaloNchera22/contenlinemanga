import { BookOpen, X, Globe, Play, Heart } from 'lucide-react';

const links = {
  Plataforma: ['Explorar', 'Novedades', 'Popular', 'Géneros', 'Aleatorio'],
  Cuenta: ['Registrarse', 'Iniciar sesión', 'Lista de lectura', 'Historial', 'Configuración'],
  Soporte: ['Centro de ayuda', 'Contacto', 'Reportar error', 'Solicitar manga', 'API'],
  Legal: ['Términos de uso', 'Privacidad', 'Cookies', 'DMCA', 'Sobre nosotros'],
};

export default function Footer() {
  return (
    <footer className="border-t border-manga-border mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-manga-red rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Manga<span className="text-manga-red">Line</span>
              </span>
            </a>
            <p className="text-manga-muted text-sm leading-relaxed mb-5">
              Tu plataforma de lectura de manga online en español, gratis y sin registros.
            </p>
            <div className="flex gap-3">
              {[X, Globe, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-manga-card border border-manga-border hover:border-manga-red rounded-lg flex items-center justify-center text-manga-muted hover:text-manga-red transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-manga-muted hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-manga-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-manga-muted text-xs text-center sm:text-left">
            © 2025 MangaLine. Todos los derechos reservados.
          </p>
          <p className="text-manga-muted text-xs flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-manga-red fill-manga-red" /> para los fans del manga
          </p>
        </div>
      </div>
    </footer>
  );
}
