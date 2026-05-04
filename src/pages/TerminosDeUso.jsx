import { FileText } from 'lucide-react';

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-white font-bold text-lg mb-3">{title}</h2>
      <div className="text-manga-muted text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function TerminosDeUso() {
  return (
    <div className="min-h-screen bg-manga-bg pt-16">
      <div className="border-b border-manga-border bg-manga-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <FileText className="w-7 h-7 text-manga-red" />
            <h1 className="text-3xl font-black text-white">Términos de uso</h1>
          </div>
          <p className="text-manga-muted text-sm">Última actualización: 1 de enero de 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Section title="1. Aceptación de los términos">
          <p>
            Al acceder y usar MangaLine, aceptas estar sujeto a estos Términos de Uso. Si no estás de acuerdo
            con alguna parte de estos términos, no podrás acceder al servicio.
          </p>
        </Section>

        <Section title="2. Descripción del servicio">
          <p>
            MangaLine es una plataforma de lectura de manga online en español. Proporcionamos acceso a una
            biblioteca de títulos de manga de forma gratuita para uso personal y no comercial.
          </p>
          <p>
            El servicio se ofrece "tal como está" y podemos modificar, suspender o discontinuarlo en cualquier
            momento sin previo aviso.
          </p>
        </Section>

        <Section title="3. Uso aceptable">
          <p>Te comprometes a:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>No reproducir, distribuir ni explotar comercialmente el contenido.</li>
            <li>No usar sistemas automatizados (bots, scrapers) para acceder al contenido.</li>
            <li>No intentar acceder a sistemas o datos no autorizados.</li>
            <li>No publicar contenido ilegal, ofensivo o que viole derechos de terceros.</li>
          </ul>
        </Section>

        <Section title="4. Propiedad intelectual">
          <p>
            El contenido de manga disponible en MangaLine está protegido por derechos de autor de sus
            respectivos autores y editores. MangaLine respeta los derechos de propiedad intelectual y
            responde a notificaciones DMCA válidas.
          </p>
        </Section>

        <Section title="5. Cuentas de usuario">
          <p>
            Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades
            realizadas bajo tu cuenta. Notifícanos inmediatamente de cualquier uso no autorizado.
          </p>
        </Section>

        <Section title="6. Limitación de responsabilidad">
          <p>
            MangaLine no será responsable por daños indirectos, incidentales o consecuentes derivados del
            uso o la imposibilidad de uso del servicio.
          </p>
        </Section>

        <Section title="7. Cambios a los términos">
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entran en
            vigor al publicarse. El uso continuado del servicio constituye la aceptación de los nuevos términos.
          </p>
        </Section>

        <Section title="8. Contacto">
          <p>
            Para preguntas sobre estos términos, contáctanos en{' '}
            <a href="mailto:legal@mangaline.com" className="text-manga-red hover:underline">
              legal@mangaline.com
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}
