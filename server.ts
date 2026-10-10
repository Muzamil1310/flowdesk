import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getProviderInfo,
  analyzeLeadWithAI,
  generateFollowUpWithAI,
} from './server/gemini';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// API Status & Observability Endpoint
app.get('/api/health', (_req, res) => {
  const info = getProviderInfo();
  res.json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    hasKey: info.provider !== 'none',
    provider: info.provider,
    model: info.modelName,
    mode: info.provider !== 'none' ? info.provider : 'mock-fallback',
  });
});

// Real AI Lead Analysis Endpoint
app.post('/api/analyze-lead', async (req, res) => {
  try {
    const { lead } = req.body;
    if (!lead || !lead.name || !lead.originalMessage) {
      return res.status(400).json({ error: 'Lead information with name and message is required.' });
    }

    const info = getProviderInfo();
    if (info.provider === 'none') {
      return res.json({
        fallback: true,
        mode: 'mock',
        message: 'No external API key configured. Utilizing local fallback.',
      });
    }

    try {
      const result = await analyzeLeadWithAI(lead);
      return res.json({
        fallback: false,
        mode: result.provider,
        model: result.model,
        data: result.data,
      });
    } catch (err: any) {
      const isTimeout = err?.name === 'TimeoutError' || err?.message?.includes('timed out');
      console.warn(
        `  ➜  [Notice]: Live AI request ${isTimeout ? 'timed out (12s)' : 'did not respond'}. Using local fallback.`
      );
      return res.json({
        fallback: true,
        mode: 'mock-fallback',
        message: isTimeout
          ? 'Live AI request timed out after 12s. Used local engine.'
          : 'Live model request failed. Falling back to local engine.',
      });
    }
  } catch (error: any) {
    console.error('Server error during analyze-lead:', error?.message || error);
    res.status(500).json({
      error: 'AI analysis is temporarily unavailable. Please try again.',
      fallbackAvailable: true,
    });
  }
});

// Real AI Follow-up Generator Endpoint
app.post('/api/generate-followup', async (req, res) => {
  try {
    const { lead, tone, previousMessage } = req.body;
    if (!lead || !lead.name || !lead.originalMessage) {
      return res.status(400).json({ error: 'Lead information is required.' });
    }

    const info = getProviderInfo();
    if (info.provider === 'none') {
      return res.json({
        fallback: true,
        mode: 'mock',
        message: 'No external API key configured. Utilizing local fallback.',
      });
    }

    try {
      const result = await generateFollowUpWithAI({ lead, tone, previousMessage });
      return res.json({
        fallback: false,
        mode: result.provider,
        model: result.model,
        data: result.data,
      });
    } catch (err: any) {
      const isTimeout = err?.name === 'TimeoutError' || err?.message?.includes('timed out');
      console.warn(
        `  ➜  [Notice]: Live AI request ${isTimeout ? 'timed out (12s)' : 'did not respond'}. Using local fallback.`
      );
      return res.json({
        fallback: true,
        mode: 'mock-fallback',
        message: isTimeout
          ? 'Live AI request timed out after 12s. Used local engine.'
          : 'Live model request failed. Falling back to local engine.',
      });
    }
  } catch (error: any) {
    console.error('Server error during generate-followup:', error?.message || error);
    res.status(500).json({
      error: 'Unable to generate a follow-up right now. Please try again.',
      fallbackAvailable: true,
    });
  }
});

// Vite Middleware for Dev / Static for Production
if (!isProd) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // The production server is compiled to dist/server.js, alongside index.html and assets.
  // Serve the directory containing this compiled file instead of dist/dist.
  app.use(express.static(__dirname));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });
}

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`\n  ➜  Local:     http://localhost:${port}/`);
  console.log(`  ➜  Network:   http://127.0.0.1:${port}/\n`);
});

// Graceful process shutdown for production containers
const handleShutdown = (signal: string) => {
  console.log(`Received ${signal}. Gracefully shutting down FlowDesk server...`);
  server.close(() => {
    console.log('FlowDesk HTTP server closed cleanly.');
    process.exit(0);
  });
  // Force close if connections don't drain within 5s
  setTimeout(() => {
    console.warn('Forcing process exit after timeout.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
