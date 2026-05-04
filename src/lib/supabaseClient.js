import { createClient } from '@supabase/supabase-js';

function resolveCredentials() {
  return {
    url: localStorage.getItem('supabase_url') || import.meta.env.VITE_SUPABASE_URL || '',
    key: localStorage.getItem('supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  };
}

function buildClient() {
  const { url, key } = resolveCredentials();
  if (!url || !key) {
    // Return a no-op proxy so the app doesn't crash — all queries will resolve with { data: null, error }
    const stub = {
      from: () => stub,
      select: () => stub,
      insert: () => stub,
      update: () => stub,
      delete: () => stub,
      eq: () => stub,
      ilike: () => stub,
      order: () => stub,
      limit: () => stub,
      single: () => Promise.resolve({ data: null, error: { message: 'Supabase no configurado' } }),
      then: (resolve) => resolve({ data: null, error: { message: 'Supabase no configurado' } }),
    };
    return stub;
  }
  try {
    return createClient(url, key);
  } catch {
    const stub = {
      from: () => stub,
      select: () => stub,
      insert: () => stub,
      update: () => stub,
      delete: () => stub,
      eq: () => stub,
      ilike: () => stub,
      order: () => stub,
      limit: () => stub,
      single: () => Promise.resolve({ data: null, error: { message: 'Credenciales inválidas' } }),
      then: (resolve) => resolve({ data: null, error: { message: 'Credenciales inválidas' } }),
    };
    return stub;
  }
}

export const supabase = buildClient();

export function isSupabaseConfigured() {
  const { url, key } = resolveCredentials();
  return Boolean(url && key);
}
