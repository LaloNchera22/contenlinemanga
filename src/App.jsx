import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularManga from './components/PopularManga';
import Genres from './components/Genres';
import LatestUpdates from './components/LatestUpdates';
import Features from './components/Features';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-manga-bg text-manga-text">
      <Navbar />
      <main>
        <Hero />
        <PopularManga />
        <Genres />
        <LatestUpdates />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
