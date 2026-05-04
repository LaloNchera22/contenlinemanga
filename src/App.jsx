import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PlatformLayout from './layouts/PlatformLayout';
import AccountLayout from './layouts/AccountLayout';
import SupportLayout from './layouts/SupportLayout';
import LegalLayout from './layouts/LegalLayout';

import './index.css';

// ── Platform ──────────────────────────────────────────────────────────────────
const Home = lazy(() => import('./pages/Home'));
const MangaDetail = lazy(() => import('./pages/MangaDetail'));
const MangaTranslator = lazy(() => import('./pages/MangaTranslator'));
const Explorar = lazy(() => import('./pages/Explorar'));
const Popular = lazy(() => import('./pages/Popular'));
const Generos = lazy(() => import('./pages/Generos'));
const Novedades = lazy(() => import('./pages/Novedades'));
const Aleatorio = lazy(() => import('./pages/Aleatorio'));

// ── Account ───────────────────────────────────────────────────────────────────
const Registrarse = lazy(() => import('./pages/Registrarse'));
const IniciarSesion = lazy(() => import('./pages/IniciarSesion'));
const ListaDeLectura = lazy(() => import('./pages/ListaDeLectura'));
const Historial = lazy(() => import('./pages/Historial'));
const Configuracion = lazy(() => import('./pages/Configuracion'));

// ── Support ───────────────────────────────────────────────────────────────────
const CentroDeAyuda = lazy(() => import('./pages/CentroDeAyuda'));
const Contacto = lazy(() => import('./pages/Contacto'));
const ReportarError = lazy(() => import('./pages/ReportarError'));
const SolicitarManga = lazy(() => import('./pages/SolicitarManga'));
const ApiDocs = lazy(() => import('./pages/ApiDocs'));

// ── Legal ─────────────────────────────────────────────────────────────────────
const TerminosDeUso = lazy(() => import('./pages/TerminosDeUso'));
const Privacidad = lazy(() => import('./pages/Privacidad'));
const Cookies = lazy(() => import('./pages/Cookies'));
const DMCA = lazy(() => import('./pages/DMCA'));
const SobreNosotros = lazy(() => import('./pages/SobreNosotros'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="w-8 h-8 border-2 border-manga-red border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Lazy({ component: Component }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Platform ────────────────────────────────────────────────────── */}
        <Route element={<PlatformLayout />}>
          <Route path="/" element={<Lazy component={Home} />} />
          <Route path="/manga/:id" element={<Lazy component={MangaDetail} />} />
          <Route path="/traductor" element={<Lazy component={MangaTranslator} />} />
          <Route path="/explorar" element={<Lazy component={Explorar} />} />
          <Route path="/popular" element={<Lazy component={Popular} />} />
          <Route path="/generos" element={<Lazy component={Generos} />} />
          <Route path="/novedades" element={<Lazy component={Novedades} />} />
          <Route path="/aleatorio" element={<Lazy component={Aleatorio} />} />
        </Route>

        {/* ── Account ─────────────────────────────────────────────────────── */}
        <Route element={<AccountLayout />}>
          <Route path="/registrarse" element={<Lazy component={Registrarse} />} />
          <Route path="/iniciar-sesion" element={<Lazy component={IniciarSesion} />} />
          <Route path="/lista-de-lectura" element={<Lazy component={ListaDeLectura} />} />
          <Route path="/historial" element={<Lazy component={Historial} />} />
          <Route path="/configuracion" element={<Lazy component={Configuracion} />} />
        </Route>

        {/* ── Support ─────────────────────────────────────────────────────── */}
        <Route element={<SupportLayout />}>
          <Route path="/centro-de-ayuda" element={<Lazy component={CentroDeAyuda} />} />
          <Route path="/contacto" element={<Lazy component={Contacto} />} />
          <Route path="/reportar-error" element={<Lazy component={ReportarError} />} />
          <Route path="/solicitar-manga" element={<Lazy component={SolicitarManga} />} />
          <Route path="/api" element={<Lazy component={ApiDocs} />} />
        </Route>

        {/* ── Legal ───────────────────────────────────────────────────────── */}
        <Route element={<LegalLayout />}>
          <Route path="/terminos-de-uso" element={<Lazy component={TerminosDeUso} />} />
          <Route path="/privacidad" element={<Lazy component={Privacidad} />} />
          <Route path="/cookies" element={<Lazy component={Cookies} />} />
          <Route path="/dmca" element={<Lazy component={DMCA} />} />
          <Route path="/sobre-nosotros" element={<Lazy component={SobreNosotros} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
