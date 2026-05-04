import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import MangaDetail from './pages/MangaDetail';
import MangaTranslator from './pages/MangaTranslator';

// Platform
import Explorar from './pages/Explorar';
import Popular from './pages/Popular';
import Generos from './pages/Generos';
import Novedades from './pages/Novedades';
import Aleatorio from './pages/Aleatorio';

// Account
import Registrarse from './pages/Registrarse';
import IniciarSesion from './pages/IniciarSesion';
import ListaDeLectura from './pages/ListaDeLectura';
import Historial from './pages/Historial';
import Configuracion from './pages/Configuracion';

// Support
import CentroDeAyuda from './pages/CentroDeAyuda';
import Contacto from './pages/Contacto';
import ReportarError from './pages/ReportarError';
import SolicitarManga from './pages/SolicitarManga';
import ApiDocs from './pages/ApiDocs';

// Legal
import TerminosDeUso from './pages/TerminosDeUso';
import Privacidad from './pages/Privacidad';
import Cookies from './pages/Cookies';
import DMCA from './pages/DMCA';
import SobreNosotros from './pages/SobreNosotros';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-manga-bg text-manga-text">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
            <Route path="/traductor" element={<MangaTranslator />} />

            {/* Platform */}
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/generos" element={<Generos />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/aleatorio" element={<Aleatorio />} />

            {/* Account */}
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/lista-de-lectura" element={<ListaDeLectura />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/configuracion" element={<Configuracion />} />

            {/* Support */}
            <Route path="/centro-de-ayuda" element={<CentroDeAyuda />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/reportar-error" element={<ReportarError />} />
            <Route path="/solicitar-manga" element={<SolicitarManga />} />
            <Route path="/api" element={<ApiDocs />} />

            {/* Legal */}
            <Route path="/terminos-de-uso" element={<TerminosDeUso />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
