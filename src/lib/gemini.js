import { GoogleGenerativeAI } from '@google/generative-ai';

export function getGeminiApiKey() {
  return localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
}

export function isGeminiConfigured() {
  return Boolean(getGeminiApiKey());
}

export function getGeminiModel() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
  });
}

// Legacy export — kept for backward compat but prefer getGeminiModel() so the key is always fresh
export const geminiModel = getGeminiModel();
