import { useState, useRef, useCallback } from 'react';
import {
  Upload, X, Languages, Copy, Check, AlertCircle,
  Loader2, FileImage, ChevronDown, Scan, Info,
} from 'lucide-react';

const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh-CN', label: '中文 (简体)' },
  { code: 'zh-TW', label: '中文 (繁體)' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'th', label: 'ภาษาไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'pl', label: 'Polski' },
  { code: 'ru', label: 'Русский' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ar', label: 'العربية' },
];

const TYPE_STYLES = {
  dialogo: 'bg-manga-red/20 text-manga-red',
  onomatopeya: 'bg-manga-orange/20 text-manga-orange',
  narracion: 'bg-manga-purple/20 text-manga-purple',
  titulo: 'bg-blue-900/30 text-blue-400',
  otro: 'bg-manga-border text-manga-muted',
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });
}

async function callGemini(imageBase64, mimeType, targetLanguageLabel, apiKey) {
  const prompt = `Analiza esta página de manga y realiza las siguientes tareas:

1. Extrae TODO el texto visible: diálogos en globos de texto, narración en cajas, onomatopeyas, títulos, carteles, etc.
2. Traduce cada fragmento de texto al idioma: ${targetLanguageLabel}
3. Clasifica cada texto como: dialogo, narracion, onomatopeya, titulo u otro.
4. Proporciona una breve descripción visual de la escena en ${targetLanguageLabel}.

Responde ÚNICAMENTE con JSON válido con esta estructura:
{
  "textos": [
    {
      "original": "texto original",
      "traduccion": "traducción al ${targetLanguageLabel}",
      "tipo": "dialogo|narracion|onomatopeya|titulo|otro"
    }
  ],
  "descripcion": "descripción breve de la escena"
}

Si no hay texto visible devuelve: {"textos": [], "descripcion": "Página sin texto detectable"}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
            { text: prompt },
          ],
        }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('La API no devolvió contenido');

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('La respuesta no tiene formato JSON válido');

  return JSON.parse(match[0]);
}

function CopyButton({ text, id, copiedId, onCopy }) {
  const copied = copiedId === id;
  return (
    <button
      onClick={() => onCopy(text, id)}
      title="Copiar texto"
      className="p-1.5 rounded-lg text-manga-muted hover:text-white hover:bg-manga-border transition-colors"
    >
      {copied
        ? <Check className="w-3.5 h-3.5 text-green-400" />
        : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function PageCard({ page, result, isLoading, onRemove, onTranslate, onCopy, copiedId }) {
  return (
    <div className="bg-manga-card border border-manga-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-manga-border bg-manga-bg/40">
        <div className="flex items-center gap-2 min-w-0">
          <FileImage className="w-4 h-4 text-manga-muted flex-shrink-0" />
          <span className="text-sm text-manga-text truncate font-medium">{page.name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          {!result && !isLoading && (
            <button
              onClick={onTranslate}
              className="flex items-center gap-1.5 text-xs font-semibold bg-manga-purple/20 hover:bg-manga-purple/30 text-manga-purple px-3 py-1.5 rounded-lg transition-colors"
            >
              <Scan className="w-3 h-3" />
              Traducir
            </button>
          )}
          {result && (
            <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
              <Check className="w-3 h-3" />
              Completado
            </span>
          )}
          <button
            onClick={onRemove}
            className="p-1.5 text-manga-muted hover:text-manga-red rounded-lg hover:bg-manga-red/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="grid md:grid-cols-2">
        {/* Original image */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-manga-border flex items-start justify-center">
          <img
            src={page.url}
            alt={page.name}
            className="max-h-[480px] w-full object-contain rounded-xl bg-black/40"
          />
        </div>

        {/* Translation panel */}
        <div className="p-4 flex flex-col">
          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-manga-purple/20 flex items-center justify-center">
                  <Scan className="w-7 h-7 text-manga-purple" />
                </div>
                <Loader2 className="absolute -top-1 -right-1 w-5 h-5 text-manga-purple animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-white text-sm font-medium mb-1">Analizando con Gemini AI</p>
                <p className="text-manga-muted text-xs">Extrayendo y traduciendo texto...</p>
              </div>
            </div>
          )}

          {!isLoading && !result && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12 text-center">
              <Languages className="w-10 h-10 text-manga-muted/40" />
              <p className="text-manga-muted text-sm">
                Haz clic en <span className="text-manga-purple font-medium">Traducir</span> para procesar esta página
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
              {/* Scene description */}
              {result.descripcion && (
                <div className="flex items-start gap-2.5 bg-manga-bg border border-manga-border rounded-xl p-3">
                  <Info className="w-4 h-4 text-manga-muted flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-manga-muted font-medium uppercase tracking-wide mb-0.5">Escena</p>
                    <p className="text-sm text-manga-text">{result.descripcion}</p>
                  </div>
                </div>
              )}

              {result.textos?.length === 0 && (
                <p className="text-sm text-manga-muted text-center py-6">
                  No se detectó texto en esta página
                </p>
              )}

              {result.textos?.map((item, idx) => (
                <div key={idx} className="bg-manga-bg border border-manga-border rounded-xl p-3 group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${TYPE_STYLES[item.tipo] ?? TYPE_STYLES.otro}`}>
                      {item.tipo ?? 'texto'}
                    </span>
                    <CopyButton
                      text={item.traduccion}
                      id={`${page.id}-${idx}`}
                      copiedId={copiedId}
                      onCopy={onCopy}
                    />
                  </div>
                  {item.original && (
                    <p className="text-xs text-manga-muted/60 line-through mb-1">{item.original}</p>
                  )}
                  <p className="text-sm text-manga-text font-medium leading-relaxed">{item.traduccion}</p>
                </div>
              ))}

              {result.textos?.length > 0 && (
                <button
                  onClick={() =>
                    onCopy(
                      result.textos
                        .map((t) => `[${t.tipo}]\n${t.original}\n→ ${t.traduccion}`)
                        .join('\n\n'),
                      `${page.id}-all`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 text-xs text-manga-muted hover:text-white border border-manga-border hover:border-manga-purple/50 py-2.5 rounded-xl transition-colors mt-1"
                >
                  {copiedId === `${page.id}-all`
                    ? <><Check className="w-3.5 h-3.5 text-green-400" /> Copiado</>
                    : <><Copy className="w-3.5 h-3.5" /> Copiar todas las traducciones</>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MangaTranslator() {
  const [pages, setPages] = useState([]);
  const [targetLang, setTargetLang] = useState('es');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [dragOver, setDragOver] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  const addFiles = useCallback((files) => {
    const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
    const newPages = images.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPages((prev) => [...prev, ...newPages]);
  }, []);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  function removePage(id) {
    setPages((prev) => prev.filter((p) => p.id !== id));
    setResults((prev) => { const r = { ...prev }; delete r[id]; return r; });
    setErrors((prev) => { const r = { ...prev }; delete r[id]; return r; });
    setLoading((prev) => { const r = { ...prev }; delete r[id]; return r; });
  }

  async function translatePage(page) {
    const key = apiKey.trim() || import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) {
      setErrors((prev) => ({ ...prev, [page.id]: 'Ingresa tu API Key de Gemini en la configuración.' }));
      return;
    }

    setLoading((prev) => ({ ...prev, [page.id]: true }));
    setErrors((prev) => { const r = { ...prev }; delete r[page.id]; return r; });

    try {
      const base64 = await fileToBase64(page.file);
      const langLabel = LANGUAGES.find((l) => l.code === targetLang)?.label ?? targetLang;
      const result = await callGemini(base64, page.file.type, langLabel, key);
      setResults((prev) => ({ ...prev, [page.id]: result }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [page.id]: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, [page.id]: false }));
    }
  }

  async function translateAll() {
    for (const page of pages) {
      if (!results[page.id] && !loading[page.id]) {
        await translatePage(page);
      }
    }
  }

  async function copyText(text, id) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const anyLoading = Object.values(loading).some(Boolean);
  const pendingCount = pages.filter((p) => !results[p.id] && !loading[p.id]).length;

  return (
    <div className="min-h-screen bg-manga-bg pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-manga-purple/20 border border-manga-purple/40 rounded-full text-manga-purple text-sm mb-4">
            <Scan className="w-4 h-4" />
            Herramienta para Creadores
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Escáner y{' '}
            <span className="gradient-text">Traductor de Manga</span>
          </h1>
          <p className="text-manga-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Sube páginas de tu manga, extrae el texto automáticamente con visión por IA y tradúcelo
            al idioma que elijas. Potenciado por <span className="text-manga-purple font-medium">Google Gemini</span>.
          </p>
        </div>

        {/* Config panel */}
        <div className="bg-manga-card border border-manga-border rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Languages className="w-4 h-4 text-manga-purple" />
            Configuración
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* API key input */}
            <div>
              <label className="text-xs text-manga-muted mb-1.5 block font-medium uppercase tracking-wide">
                API Key de Gemini
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza… (o define VITE_GEMINI_API_KEY)"
                  className="w-full bg-manga-bg border border-manga-border focus:border-manga-purple rounded-xl px-3 py-2.5 text-sm text-manga-text outline-none transition-colors pr-16"
                />
                <button
                  onClick={() => setShowApiKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-manga-muted hover:text-white transition-colors"
                >
                  {showApiKey ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <p className="text-xs text-manga-muted mt-1.5">
                Consigue tu key gratuita en{' '}
                <span className="text-manga-purple">aistudio.google.com</span>
              </p>
            </div>

            {/* Language selector */}
            <div>
              <label className="text-xs text-manga-muted mb-1.5 block font-medium uppercase tracking-wide">
                Idioma de destino
              </label>
              <div className="relative">
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-manga-bg border border-manga-border focus:border-manga-purple rounded-xl px-3 py-2.5 text-sm text-manga-text outline-none transition-colors appearance-none cursor-pointer"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-manga-muted pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Global error (no API key) */}
        {Object.entries(errors).map(([id, msg]) => (
          !results[id] && (
            <div key={id} className="flex items-start gap-3 bg-red-900/20 border border-manga-red/40 text-manga-red rounded-xl p-4 mb-4 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {msg}
            </div>
          )
        ))}

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all mb-6 select-none ${
            dragOver
              ? 'border-manga-purple bg-manga-purple/10 scale-[1.01]'
              : 'border-manga-border hover:border-manga-purple/50 hover:bg-manga-card/40'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              dragOver ? 'bg-manga-purple/30 scale-110' : 'bg-manga-card'
            }`}>
              <Upload className={`w-7 h-7 transition-colors ${dragOver ? 'text-manga-purple' : 'text-manga-muted'}`} />
            </div>
            <div>
              <p className="text-white font-semibold mb-1">
                {dragOver ? 'Suelta las imágenes aquí' : 'Arrastra páginas de manga aquí'}
              </p>
              <p className="text-manga-muted text-sm">o haz clic para seleccionar archivos</p>
            </div>
            <p className="text-xs text-manga-muted">PNG, JPG, WEBP — puedes subir múltiples páginas a la vez</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {/* Pages list */}
        {pages.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-manga-muted text-sm">
                <span className="text-white font-semibold">{pages.length}</span>{' '}
                {pages.length === 1 ? 'página cargada' : 'páginas cargadas'}
                {pendingCount > 0 && (
                  <span className="ml-2 text-manga-muted">· {pendingCount} sin traducir</span>
                )}
              </p>
              <button
                onClick={translateAll}
                disabled={anyLoading || pendingCount === 0}
                className="flex items-center gap-2 bg-manga-red hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                {anyLoading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Languages className="w-4 h-4" />}
                {anyLoading ? 'Traduciendo...' : 'Traducir todo'}
              </button>
            </div>

            <div className="space-y-6">
              {pages.map((page) => (
                <div key={page.id}>
                  {errors[page.id] && !results[page.id] && (
                    <div className="flex items-start gap-3 bg-red-900/20 border border-manga-red/40 text-manga-red rounded-xl p-3 mb-2 text-xs">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      {errors[page.id]}
                    </div>
                  )}
                  <PageCard
                    page={page}
                    result={results[page.id]}
                    isLoading={!!loading[page.id]}
                    onRemove={() => removePage(page.id)}
                    onTranslate={() => translatePage(page)}
                    onCopy={copyText}
                    copiedId={copiedId}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {pages.length === 0 && (
          <div className="text-center py-6">
            <p className="text-manga-muted text-sm">
              Sube tus páginas de manga para comenzar con la traducción
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
