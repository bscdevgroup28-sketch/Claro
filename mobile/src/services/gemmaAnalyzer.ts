/**
 * Gemma 4 document analysis service.
 *
 * Sends OCR text to the Claro server which forwards it to a local
 * Ollama instance running Gemma 4 weights. No cloud API keys needed —
 * all inference happens on the host machine.
 *
 * Falls back gracefully when Ollama is unavailable —
 * the local regex classifiers still work as a safety net.
 */

import { ExplanationContent, ExtractedField, LanguageCode, UrgencyLevel } from '../types';

// Railway for production, local for dev. Ollama runs on the same machine as the server.
const API_BASE = __DEV__
  ? 'http://10.0.2.2:3000'   // Android emulator → host machine
  : 'https://claro-web-production.up.railway.app';
const TIMEOUT_MS = 60_000;  // Ollama local inference can take a moment

export interface GemmaAnalysisResult {
  documentType: string;
  agency: string;
  confidence: number;
  urgency: UrgencyLevel;
  scamWarnings: Array<{
    id: string;
    message: Record<LanguageCode, string>;
  }>;
  explanation: Record<LanguageCode, ExplanationContent>;
  fields: ExtractedField[];
  model: string;
}

/**
 * Call the Gemma 4 analysis endpoint.
 * Returns null if the request fails (offline, timeout, server error).
 */
export async function analyzeWithGemma(
  ocrText: string,
): Promise<GemmaAnalysisResult | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(`${API_BASE}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ocrText }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      console.warn(`Gemma API returned ${response.status}`);
      return null;
    }

    const data: GemmaAnalysisResult = await response.json();

    // Validate minimum required fields
    if (!data.documentType || !data.explanation) {
      console.warn('Gemma response missing required fields');
      return null;
    }

    // Ensure fields have confirmed: false (Gemma doesn't know user confirmation state)
    if (data.fields) {
      data.fields = data.fields.map((f) => ({ ...f, confirmed: false }));
    }

    return data;
  } catch (err) {
    // Network error, timeout, or JSON parse failure — fall back to local
    console.warn('Gemma analysis unavailable, using local classifiers:', (err as Error).message);
    return null;
  }
}
