import {
  getProviderInfo,
  analyzeLeadWithAI,
  generateFollowUpWithAI,
} from './server/gemini';
import type { Env } from './server/gemini';

interface WorkerEnv extends Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Initialized lazily on first request: workerd can report an unreliable
// clock during module evaluation.
let startedAt = 0;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function readJson(request: Request): Promise<any | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function handleApiRequest(request: Request, env: WorkerEnv): Promise<Response | null> {
  const { pathname } = new URL(request.url);

  if (!pathname.startsWith('/api/')) return null;

  if (pathname === '/api/health' && request.method === 'GET') {
    if (!startedAt) startedAt = Date.now();
    const info = getProviderInfo(env);
    return json({
      status: 'ok',
      uptime: Math.floor((Date.now() - startedAt) / 1000),
      timestamp: new Date().toISOString(),
      hasKey: info.provider !== 'none',
      provider: info.provider,
      model: info.modelName,
      mode: info.provider !== 'none' ? info.provider : 'mock-fallback',
    });
  }

  if (pathname === '/api/analyze-lead' && request.method === 'POST') {
    try {
      const body = await readJson(request);
      const lead = body?.lead;
      if (!lead || !lead.name || !lead.originalMessage) {
        return json({ error: 'Lead information with name and message is required.' }, 400);
      }

      const info = getProviderInfo(env);
      if (info.provider === 'none') {
        return json({
          fallback: true,
          mode: 'mock',
          message: 'No external API key configured. Utilizing local fallback.',
        });
      }

      try {
        const result = await analyzeLeadWithAI(env, lead);
        return json({
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
        return json({
          fallback: true,
          mode: 'mock-fallback',
          message: isTimeout
            ? 'Live AI request timed out after 12s. Used local engine.'
            : 'Live model request failed. Falling back to local engine.',
        });
      }
    } catch (error: any) {
      console.error('Server error during analyze-lead:', error?.message || error);
      return json(
        {
          error: 'AI analysis is temporarily unavailable. Please try again.',
          fallbackAvailable: true,
        },
        500
      );
    }
  }

  if (pathname === '/api/generate-followup' && request.method === 'POST') {
    try {
      const body = await readJson(request);
      const lead = body?.lead;
      const tone = body?.tone;
      const previousMessage = body?.previousMessage;
      if (!lead || !lead.name || !lead.originalMessage) {
        return json({ error: 'Lead information is required.' }, 400);
      }

      const info = getProviderInfo(env);
      if (info.provider === 'none') {
        return json({
          fallback: true,
          mode: 'mock',
          message: 'No external API key configured. Utilizing local fallback.',
        });
      }

      try {
        const result = await generateFollowUpWithAI(env, { lead, tone, previousMessage });
        return json({
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
        return json({
          fallback: true,
          mode: 'mock-fallback',
          message: isTimeout
            ? 'Live AI request timed out after 12s. Used local engine.'
            : 'Live model request failed. Falling back to local engine.',
        });
      }
    } catch (error: any) {
      console.error('Server error during generate-followup:', error?.message || error);
      return json(
        {
          error: 'Unable to generate a follow-up right now. Please try again.',
          fallbackAvailable: true,
        },
        500
      );
    }
  }

  return json({ error: 'Not found' }, 404);
}

export default {
  async fetch(request: Request, env: WorkerEnv, _ctx: ExecutionContext): Promise<Response> {
    const apiResponse = await handleApiRequest(request, env);
    if (apiResponse) return apiResponse;

    return env.ASSETS.fetch(request);
  },
};
