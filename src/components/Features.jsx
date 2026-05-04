import { BookOpen, Zap, Download, Bell, Smartphone, Users } from 'lucide-react';
import { features } from '../data/manga';

const iconMap = { BookOpen, Zap, Download, Bell, Smartphone, Users };

function FeatureCard({ feature }) {
  const Icon = iconMap[feature.icon];
  return (
    <div className="group bg-manga-card hover:bg-manga-border border border-manga-border hover:border-manga-red/40 rounded-2xl p-6 transition-all">
      <div className="w-11 h-11 bg-manga-red/10 group-hover:bg-manga-red/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
        <Icon className="w-5 h-5 text-manga-red" />
      </div>
      <h3 className="text-white font-bold text-base mb-2">{feature.title}</h3>
      <p className="text-manga-muted text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-manga-border to-transparent mb-16" />

        <div className="text-center mb-12">
          <span className="inline-block text-manga-red text-sm font-bold uppercase tracking-widest mb-3">
            ¿Por qué MangaLine?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Todo lo que necesitas
            <br />
            <span className="gradient-text">en un solo lugar</span>
          </h2>
          <p className="text-manga-muted max-w-xl mx-auto">
            Diseñado para lectores exigentes que quieren la mejor experiencia de lectura
            disponible en cualquier dispositivo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-manga-red via-red-700 to-manga-purple p-8 sm:p-12 text-center">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/5 rounded-full" />

          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Empieza a leer hoy
            </h2>
            <p className="text-red-100 text-base mb-8 max-w-md mx-auto">
              Únete a más de 2 millones de lectores. Es completamente gratis, sin registros obligatorios.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="bg-white text-manga-red font-black px-8 py-3.5 rounded-xl hover:bg-red-50 transition-colors shadow-lg"
              >
                Leer Gratis Ahora
              </a>
              <a
                href="#"
                className="border-2 border-white/50 hover:border-white text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
