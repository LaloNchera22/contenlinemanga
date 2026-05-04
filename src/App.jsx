import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MangaDetail from './pages/MangaDetail';
import MangaTranslator from './pages/MangaTranslator';
import Footer from './components/Footer';
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
