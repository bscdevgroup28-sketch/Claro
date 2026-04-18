const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

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
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
