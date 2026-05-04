import { BookOpen, Users, Heart, Zap, Globe, Star } from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Títulos de manga' },
  { value: '2M+', label: 'Lectores activos' },
  { value: '15+', label: 'Idiomas' },
  { value: '99.9%', label: 'Uptime garantizado' },
];

const team = [
  { name: 'Carlos M.', role: 'Fundador & CEO', avatar: 'CM' },
  { name: 'Ana R.', role: 'Directora de Contenido', avatar: 'AR' },
  { name: 'Diego L.', role: 'Lead Developer', avatar: 'DL' },
  { name: 'Sara P.', role: 'Diseño UX', avatar: 'SP' },
];

const values = [
  { icon: Heart, title: 'Pasión por el manga', desc: 'Somos lectores de manga antes que nada. Construimos la plataforma que nosotros mismos querríamos usar.' },
  { icon: Globe, title: 'Acceso universal', desc: 'Creemos que el manga debe ser accesible para todos, sin barreras económicas ni geográficas.' },
  { icon: Zap, title: 'Mejora continua', desc: 'Publicamos actualizaciones cada semana basándonos en el feedback de nuestra comunidad.' },
  { icon: Users, title: 'Comunidad primero', desc: 'Nuestras decisiones se guían por lo que es mejor para nuestros 2 millones de lectores.' },
];

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      {/* Hero */}
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="w-16 h-16 bg-manga-red rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Sobre <span className="text-manga-red">MangaLine</span>
          </h1>
          <p className="text-manga-muted text-base max-w-2xl mx-auto leading-relaxed">
            Somos una plataforma de lectura de manga creada por fans, para fans. Nuestra misión es hacer
            que el manga sea accesible a todos los hispanohablantes del mundo, de forma gratuita y sin
            complicaciones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-manga-card border border-manga-border rounded-xl p-6 text-center">
              <p className="text-3xl font-black text-manga-red mb-1">{stat.value}</p>
              <p className="text-manga-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="max-w-3xl">
          <h2 className="text-white font-black text-2xl mb-4">Nuestra historia</h2>
          <div className="space-y-4 text-manga-muted text-sm leading-relaxed">
            <p>
              MangaLine nació en 2021 con una idea simple: crear el mejor lugar en internet para leer
              manga en español. Éramos un grupo de amigos frustrados por la falta de opciones de calidad
              en nuestro idioma.
            </p>
            <p>
              Empezamos con apenas 500 títulos y un servidor pequeño. Hoy, cuatro años después, somos la
              plataforma de manga en español más grande de América Latina, con más de 50,000 títulos y
              2 millones de lectores mensuales.
            </p>
            <p>
              Seguimos siendo un equipo pequeño y apasionado, comprometido con mantener MangaLine gratuito
              y accesible para todos.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-manga-card border border-manga-border rounded-xl p-5">
                <Icon className="w-6 h-6 text-manga-red mb-3" />
                <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                <p className="text-manga-muted text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6">El equipo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.name} className="bg-manga-card border border-manga-border rounded-xl p-5 text-center">
                <div className="w-14 h-14 bg-manga-red rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-black text-sm">{member.avatar}</span>
                </div>
                <p className="text-white font-bold text-sm">{member.name}</p>
                <p className="text-manga-muted text-xs mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-manga-card border border-manga-border rounded-2xl p-8 text-center">
          <Star className="w-8 h-8 text-manga-red mx-auto mb-4" />
          <h3 className="text-white font-bold text-xl mb-2">¿Quieres ser parte de MangaLine?</h3>
          <p className="text-manga-muted text-sm mb-6 max-w-md mx-auto">
            Siempre estamos buscando personas apasionadas por el manga y la tecnología.
            Escríbenos si quieres colaborar.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-manga-red hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Contactar al equipo
          </a>
        </div>
      </div>
    </div>
  );
}
