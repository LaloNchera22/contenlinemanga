import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shuffle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Aleatorio() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Buscando un manga aleatorio...');

  useEffect(() => {
    async function goRandom() {
      const { count } = await supabase
        .from('mangas')
        .select('*', { count: 'exact', head: true });

      if (!count || count === 0) {
        setStatus('No se encontraron mangas disponibles.');
        return;
      }

      const randomOffset = Math.floor(Math.random() * count);
      const { data } = await supabase
        .from('mangas')
        .select('id')
        .range(randomOffset, randomOffset)
        .limit(1);

      if (data && data[0]) {
        navigate(`/manga/${data[0].id}`, { replace: true });
      } else {
        setStatus('No se pudo encontrar un manga. Inténtalo de nuevo.');
      }
    }
    goRandom();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-manga-bg pt-16 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-manga-card border border-manga-border rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shuffle className="w-8 h-8 text-manga-red animate-spin" style={{ animationDuration: '2s' }} />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Manga Aleatorio</h2>
        <p className="text-manga-muted text-sm">{status}</p>
      </div>
    </div>
  );
}
