const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const GEMMA_MODEL = process.env.GEMMA_MODEL || 'gemma4:e2b';

// Body parser for JSON payloads (analyze endpoint)
app.use(express.json({ limit: '256kb' }));

// Security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// CORS for mobile app API requests
app.use('/api', (_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (_req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// API: Referrals data
app.get('/api/referrals', (_req, res) => {
  const dataPath = path.join(__dirname, 'data', 'referrals.json');
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(raw);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load referral data' });
  }
});

// ─── Gemma 4 Document Analysis ───────────────────────────────────────────────

const GEMMA_SYSTEM_PROMPT = `You are a legal document classifier for an immigration assistance app called Claro. 
You analyze OCR text extracted from scanned immigration documents.

Your job is to:
1. Identify the document type (Notice of Hearing, Notice to Appear, EAD Card, Asylum Receipt, Bond Notice, Removal Order, RFE Notice, or Unknown)
2. Determine the issuing agency (EOIR, DHS, USCIS, ICE, CBP, or Unknown)
3. Rate confidence from 0.0 to 1.0
4. Set urgency (high or normal)
5. Extract key fields (dates, locations, agencies, required actions)
6. Provide plain-language explanations in English, Spanish, and Haitian Creole
7. Detect any scam indicators (fake letterhead, requests for wire transfers, unofficial phone numbers, threats of immediate arrest)

Respond ONLY with valid JSON matching this exact schema:
{
  "documentType": "string",
  "agency": "string",
  "confidence": 0.0,
  "urgency": "high|normal",
  "scamWarnings": [{"id": "string", "message": {"en": "string", "es": "string", "ht": "string"}}],
  "explanation": {
    "en": {"title": "string", "summary": "string", "whyItMatters": "string", "nextStep": "string", "helpHint": "string"},
    "es": {"title": "string", "summary": "string", "whyItMatters": "string", "nextStep": "string", "helpHint": "string"},
    "ht": {"title": "string", "summary": "string", "whyItMatters": "string", "nextStep": "string", "helpHint": "string"}
  },
  "fields": [
    {"key": "agency|documentType|eventDate|location|nextAction", "value": "string", "critical": true}
  ]
}`;

app.post('/api/analyze', async (req, res) => {
  const { ocrText } = req.body;

  if (!ocrText || typeof ocrText !== 'string') {
    return res.status(400).json({ error: 'ocrText is required' });
  }

  if (ocrText.length > 10000) {
    return res.status(400).json({ error: 'ocrText too long (max 10000 chars)' });
  }

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: GEMMA_MODEL,
        stream: false,
        format: 'json',
        options: { temperature: 0.1, top_p: 0.8, num_predict: 2048, num_ctx: 2048 },
        messages: [
          { role: 'system', content: GEMMA_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Analyze the following OCR text from a scanned immigration document and return the JSON analysis:\n\n---\n${ocrText}\n---`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Ollama error:', response.status, errText);
      return res.status(502).json({ error: 'Ollama request failed', status: response.status });
    }

    const data = await response.json();
    const text = data?.message?.content;

    if (!text) {
      return res.status(502).json({ error: 'Empty response from Ollama' });
    }

    // Parse & validate the JSON
    const analysis = JSON.parse(text);

    // Ensure required fields exist with safe defaults
    const result = {
      documentType: analysis.documentType || 'Unknown',
      agency: analysis.agency || 'Unknown',
      confidence: typeof analysis.confidence === 'number' ? Math.min(1, Math.max(0, analysis.confidence)) : 0.5,
      urgency: analysis.urgency === 'high' ? 'high' : 'normal',
      scamWarnings: Array.isArray(analysis.scamWarnings) ? analysis.scamWarnings : [],
      explanation: analysis.explanation || {},
      fields: Array.isArray(analysis.fields) ? analysis.fields : [],
      model: GEMMA_MODEL,
    };

    res.json(result);
  } catch (err) {
    console.error('Analyze error:', err.message);
    res.status(500).json({ error: 'Analysis failed', detail: err.message });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname), {
  maxAge: '1h',
  etag: true,
}));

// SPA fallback — serve index.html for any unmatched route
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Claro web running on port ${PORT}`);
});
