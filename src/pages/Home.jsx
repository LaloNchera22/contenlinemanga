import Hero from '../components/Hero';
import PopularManga from '../components/PopularManga';
import Genres from '../components/Genres';
import LatestUpdates from '../components/LatestUpdates';
import Features from '../components/Features';

export default function Home() {
  return (
    <>
      <Hero />
      <PopularManga />
      <Genres />
      <LatestUpdates />
      <Features />
    </>
  );
}
