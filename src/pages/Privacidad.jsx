import { Shield } from 'lucide-react';

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-white font-bold text-lg mb-3">{title}</h2>
      <div className="text-manga-muted text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Política de privacidad</h1>
          </div>
          <p className="text-manga-muted text-sm">Última actualización: 1 de enero de 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Section title="1. Información que recopilamos">
          <p>Recopilamos los siguientes tipos de información:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong className="text-manga-text">Información de cuenta:</strong> nombre, correo electrónico y contraseña (cifrada).</li>
            <li><strong className="text-manga-text">Datos de uso:</strong> historial de lectura, lista de favoritos, preferencias.</li>
            <li><strong className="text-manga-text">Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo.</li>
            <li><strong className="text-manga-text">Cookies:</strong> para mejorar tu experiencia de navegación (ver Política de Cookies).</li>
          </ul>
        </Section>

        <Section title="2. Cómo usamos tu información">
          <p>Usamos tu información para:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Proporcionar y mejorar nuestros servicios.</li>
            <li>Sincronizar tu historial y lista de lectura entre dispositivos.</li>
            <li>Enviarte notificaciones sobre nuevos capítulos (si lo tienes activado).</li>
            <li>Detectar y prevenir fraude o abuso.</li>
            <li>Cumplir con obligaciones legales.</li>
          </ul>
        </Section>

        <Section title="3. Compartir información">
          <p>
            No vendemos ni alquilamos tu información personal. Solo la compartimos con:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Proveedores de servicios necesarios para operar la plataforma (Supabase para almacenamiento).</li>
            <li>Autoridades cuando sea requerido por ley.</li>
          </ul>
        </Section>

        <Section title="4. Retención de datos">
          <p>
            Conservamos tus datos mientras tu cuenta esté activa. Al eliminar tu cuenta, borraremos
            tus datos personales en un plazo de 30 días, salvo obligaciones legales.
          </p>
        </Section>

        <Section title="5. Tus derechos">
          <p>Tienes derecho a:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Acceder, corregir o eliminar tu información personal.</li>
            <li>Exportar tus datos en formato portable.</li>
            <li>Oponerte al procesamiento de tus datos.</li>
            <li>Retirar tu consentimiento en cualquier momento.</li>
          </ul>
          <p className="mt-2">Para ejercer estos derechos, contáctanos en <a href="mailto:privacidad@mangaline.com" className="text-manga-red hover:underline">privacidad@mangaline.com</a></p>
        </Section>

        <Section title="6. Seguridad">
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información,
            incluyendo cifrado SSL, contraseñas hasheadas y acceso restringido a datos personales.
          </p>
        </Section>

        <Section title="7. Contacto">
          <p>
            Si tienes preguntas sobre esta política, escríbenos a{' '}
            <a href="mailto:privacidad@mangaline.com" className="text-manga-red hover:underline">
              privacidad@mangaline.com
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}
