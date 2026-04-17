require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { apiLimiter } = require('./middleware/rateLimit');
const contactRouter = require('./routes/contact');
const bookingRouter = require('./routes/booking');

const app = express();
const PORT = process.env.PORT || 5174;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: [CLIENT_ORIGIN, 'http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

// Security headers (lightweight, without helmet dep)
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Rate limiting on all /api routes
app.use('/api', apiLimiter);

// ── Routes ──────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Lisgraphix API', timestamp: new Date().toISOString() });
});

app.use('/api/contact', contactRouter);
app.use('/api/booking', bookingRouter);

// 404 handler for unknown API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({ ok: false, message: 'Route not found.' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, message: 'Internal server error.' });
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Lisgraphix API server running`);
  console.log(`  → http://localhost:${PORT}/api/health`);
  console.log(`  → Accepting requests from: ${CLIENT_ORIGIN}\n`);
});
