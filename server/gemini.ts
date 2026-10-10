import { GoogleGenAI, Type } from '@google/genai/web';

export type DetectedProvider = 'gemini' | 'opencode' | 'openai' | 'groq' | 'none';

/**
 * Runtime secrets/config. On Cloudflare Workers this is the Workers `env`
 * binding object; in Node dev it is `process.env`.
 */
export interface Env {
  GEMINI_API_KEY?: string;
  OPENCODE_API_KEY?: string;
  ZEN_API_KEY?: string;
  OPENAI_API_KEY?: string;
  GROQ_API_KEY?: string;
  AI_PROVIDER?: string;
  OPENCODE_MODEL?: string;
  AI_BASE_URL?: string;
}

export interface ProviderInfo {
  provider: DetectedProvider;
  key: string;
  modelName: string;
}

export const SERVER_AI_TIMEOUT_MS = 12000;

export const GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

/**
 * Robust provider resolver.
 * Supports:
 * 1. OpenCode Zen AI (via OPENCODE_API_KEY or non-Google key in GEMINI_API_KEY)
 * 2. Google Gemini (via AIza... or AQ.A... key in GEMINI_API_KEY)
 * 3. OpenAI (via sk-... key)
 * 4. Groq (via gsk_... key)
 */
export function getProviderInfo(env: Env): ProviderInfo {
  const geminiKey = (env.GEMINI_API_KEY || '').replace(/^["']|["']$/g, '').trim();
  const opencodeKey = (
    env.OPENCODE_API_KEY ||
    env.ZEN_API_KEY ||
    ''
  ).replace(/^["']|["']$/g, '').trim();
  const openaiKey = (env.OPENAI_API_KEY || '').replace(/^["']|["']$/g, '').trim();
  const groqKey = (env.GROQ_API_KEY || '').replace(/^["']|["']$/g, '').trim();
  const explicitProvider = (env.AI_PROVIDER || '').toLowerCase().trim();

  // 1. Explicit OpenCode Zen variable or AI_PROVIDER=opencode
  if (opencodeKey || explicitProvider === 'opencode' || explicitProvider === 'zen') {
    const key = opencodeKey || geminiKey;
    const model = env.OPENCODE_MODEL || 'zen-fast';
    return { provider: 'opencode', key, modelName: `OpenCode Zen (${model})` };
  }

  // 2. Groq key (starts with gsk_)
  if (groqKey || geminiKey.startsWith('gsk_')) {
    const key = groqKey || geminiKey;
    return { provider: 'groq', key, modelName: 'Groq (llama-3.3-70b)' };
  }

  // 3. OpenAI key (starts with sk- or sk-proj-)
  if (openaiKey || geminiKey.startsWith('sk-')) {
    const key = openaiKey || geminiKey;
    return { provider: 'openai', key, modelName: 'OpenAI (gpt-4o-mini)' };
  }

  // 4. Google Gemini (GEMINI_API_KEY: handles AIza... and modern AQ.A... formats)
  if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY' && geminiKey.length > 8) {
    return { provider: 'gemini', key: geminiKey, modelName: 'Gemini' };
  }

  return { provider: 'none', key: '', modelName: 'Demo Fallback Mode' };
}

export function hasGeminiApiKey(env: Env): boolean {
  const info = getProviderInfo(env);
  return info.provider !== 'none';
}

export function getGeminiClient(env: Env): GoogleGenAI | null {
  const info = getProviderInfo(env);
  if (info.provider !== 'gemini') return null;

  return new GoogleGenAI({
    apiKey: info.key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export interface LeadAnalysisPayload {
  intent: 'High' | 'Medium' | 'Low';
  priority: 'High' | 'Medium' | 'Low';
  summary: string;
  suggestedAction: string;
}

export interface FollowUpPayload {
  message: string;
  subject?: string;
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    intent: {
      type: Type.STRING,
      enum: ['High', 'Medium', 'Low'],
      description: 'Estimated buying or interest intent.',
    },
    priority: {
      type: Type.STRING,
      enum: ['High', 'Medium', 'Low'],
      description: 'Recommended priority level for following up.',
    },
    summary: {
      type: Type.STRING,
      description: 'Concise 1-2 sentence professional summary of what the lead wants.',
    },
    suggestedAction: {
      type: Type.STRING,
      description: 'Practical recommended next step for the sales or client team.',
    },
  },
  required: ['intent', 'priority', 'summary', 'suggestedAction'],
};

const followUpSchema = {
  type: Type.OBJECT,
  properties: {
    message: {
      type: Type.STRING,
      description: 'The personalized, concise follow-up email/message body.',
    },
    subject: {
      type: Type.STRING,
      description: 'An appropriate subject line for this follow-up.',
    },
  },
  required: ['message'],
};

/**
 * Enforces an explicit server-side timeout on external AI requests.
 * Prevents hanging requests if the upstream model provider stalls.
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs = SERVER_AI_TIMEOUT_MS,
  operationName = 'AI operation'
): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      const err = new Error(`${operationName} timed out after ${timeoutMs / 1000} seconds`);
      (err as any).name = 'TimeoutError';
      reject(err);
    }, timeoutMs);
  });

  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }),
    timeoutPromise,
  ]);
}

function extractJSON(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Unable to parse JSON from AI response: ' + text.slice(0, 100));
  }
}

async function callOpenCodeZen(
  env: Env,
  key: string,
  preferredModel: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const baseUrl = env.AI_BASE_URL || 'https://opencode.ai/zen/v1';
  const url = `${baseUrl.replace(/\/$/, '')}/chat/completions`;

  const candidateModels = Array.from(
    new Set([
      preferredModel,
      'deepseek-v4-flash',
      'gpt-4o-mini',
      'zen-fast',
      'zen-default',
    ].filter(Boolean))
  );

  let lastError = '';

  for (const currentModel of candidateModels) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        signal: AbortSignal.timeout(SERVER_AI_TIMEOUT_MS),
        body: JSON.stringify({
          model: currentModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.4,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content?.trim();
        if (content) return content;
      } else {
        const errText = await res.text();
        lastError = `[${currentModel}]: ${errText}`;
      }
    } catch (e: any) {
      lastError = e?.message || String(e);
    }
  }

  throw new Error(`OpenCode Zen upstream rejected requests across candidate models: ${lastError}`);
}

async function callOpenAICompatible(
  url: string,
  key: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<any> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    signal: AbortSignal.timeout(SERVER_AI_TIMEOUT_MS),
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`AI request failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty response from AI engine');
  return extractJSON(content);
}

export async function analyzeLeadWithAI(
  env: Env,
  lead: {
    name: string;
    company: string;
    email: string;
    originalMessage: string;
    source?: string;
  }
): Promise<{ data: LeadAnalysisPayload; provider: string; model: string }> {
  return withTimeout(
    (async () => {
      const info = getProviderInfo(env);

      // 1. OpenCode Zen Engine
      if (info.provider === 'opencode') {
        const model = env.OPENCODE_MODEL || 'zen-fast';
        const systemPrompt = `You are a sales intelligence system for FlowDesk. Analyze the lead and respond with ONLY valid JSON:
{
  "intent": "High" | "Medium" | "Low",
  "priority": "High" | "Medium" | "Low",
  "summary": "1-2 sentence summary of lead needs",
  "suggestedAction": "Immediate recommended next step"
}`;
        const userPrompt = `Lead: ${lead.name}\nCompany: ${lead.company}\nInquiry: "${lead.originalMessage}"`;
        const raw = await callOpenCodeZen(env, info.key, model, systemPrompt, userPrompt);
        const parsed = extractJSON(raw);
        return { data: parsed, provider: 'opencode', model: `OpenCode Zen (${model})` };
      }

      // 2. OpenAI Engine
      if (info.provider === 'openai') {
        const systemPrompt = `You are a sales intelligence system for FlowDesk. Analyze the lead and respond with JSON:
{ "intent": "High"|"Medium"|"Low", "priority": "High"|"Medium"|"Low", "summary": "...", "suggestedAction": "..." }`;
        const userPrompt = `Lead: ${lead.name}\nCompany: ${lead.company}\nInquiry: "${lead.originalMessage}"`;
        const parsed = await callOpenAICompatible(
          'https://api.openai.com/v1/chat/completions',
          info.key,
          'gpt-4o-mini',
          systemPrompt,
          userPrompt
        );
        return { data: parsed, provider: 'openai', model: 'gpt-4o-mini' };
      }

      // 3. Groq Engine
      if (info.provider === 'groq') {
        const systemPrompt = `You are a sales intelligence system for FlowDesk. Analyze the lead and respond with JSON:
{ "intent": "High"|"Medium"|"Low", "priority": "High"|"Medium"|"Low", "summary": "...", "suggestedAction": "..." }`;
        const userPrompt = `Lead: ${lead.name}\nCompany: ${lead.company}\nInquiry: "${lead.originalMessage}"`;
        const parsed = await callOpenAICompatible(
          'https://api.groq.com/openai/v1/chat/completions',
          info.key,
          'llama-3.3-70b-versatile',
          systemPrompt,
          userPrompt
        );
        return { data: parsed, provider: 'groq', model: 'llama-3.3-70b' };
      }

      // 4. Google Gemini Engine (with instant multi-model fallback)
      if (info.provider === 'gemini') {
        const client = getGeminiClient(env);
        if (!client) throw new Error('Gemini client unavailable');

        const prompt = `Analyze this inbound lead:
Name: ${lead.name}
Company: ${lead.company}
Channel/Source: ${lead.source || 'Website'}
Inbound Message: "${lead.originalMessage}"`;

        let lastError: any = null;

        for (const model of GEMINI_MODELS) {
          try {
            const response = await client.models.generateContent({
              model,
              contents: prompt,
              config: {
                systemInstruction:
                  'You are an expert B2B sales intelligence engine for FlowDesk. Understand the lead context, estimate purchasing intent, assign priority, and suggest an actionable next step. Never fabricate details not stated by the prospect. Return strictly valid structured JSON matching the schema.',
                responseMimeType: 'application/json',
                responseSchema: analysisSchema,
                temperature: 0.2,
              },
            });

            const text = response.text?.trim();
            if (text) {
              return { data: JSON.parse(text) as LeadAnalysisPayload, provider: 'gemini', model };
            }
          } catch (err: any) {
            lastError = err;
          }
        }

        throw lastError || new Error('All Gemini models failed.');
      }

      throw new Error('No supported AI provider configured.');
    })(),
    SERVER_AI_TIMEOUT_MS,
    'Lead Analysis'
  );
}

export async function generateFollowUpWithAI(
  env: Env,
  params: {
    lead: {
      name: string;
      company: string;
      originalMessage: string;
      source?: string;
      summary?: string;
      intent?: string;
      suggestedAction?: string;
    };
    tone?: 'Professional' | 'Friendly' | 'Concise';
    previousMessage?: string;
  }
): Promise<{ data: FollowUpPayload; provider: string; model: string }> {
  return withTimeout(
    (async () => {
      const info = getProviderInfo(env);
      const tone = params.tone || 'Professional';

      // 1. OpenCode Zen Engine
      if (info.provider === 'opencode') {
        const model = env.OPENCODE_MODEL || 'zen-fast';
        const systemPrompt = `You are a sales assistant for FlowDesk writing on behalf of Alex. Write a personalized follow-up message in a ${tone} tone. Return ONLY JSON:
{
  "message": "The follow-up message body",
  "subject": "Email subject line"
}`;
        const userPrompt = `Lead Name: ${params.lead.name}\nCompany: ${params.lead.company}\nInquiry: "${params.lead.originalMessage}"\n${params.previousMessage ? `Make this variation distinctly different from: "${params.previousMessage}"` : ''}`;
        const raw = await callOpenCodeZen(env, info.key, model, systemPrompt, userPrompt);

        let parsed: FollowUpPayload;
        try {
          parsed = extractJSON(raw);
          if (!parsed.message) {
            parsed = { message: raw.trim(), subject: `Follow-up regarding ${params.lead.company}` };
          }
        } catch {
          parsed = { message: raw.trim(), subject: `Follow-up regarding ${params.lead.company}` };
        }

        return { data: parsed, provider: 'opencode', model: `OpenCode Zen (${model})` };
      }

      // 2. OpenAI Engine
      if (info.provider === 'openai') {
        const systemPrompt = `You are a sales assistant for FlowDesk. Write a personalized follow-up in tone ${tone}. Output JSON: { "message": "...", "subject": "..." }`;
        const userPrompt = `Lead Name: ${params.lead.name}\nCompany: ${params.lead.company}\nInquiry: "${params.lead.originalMessage}"\n${params.previousMessage ? `Variation distinctly different from: "${params.previousMessage}"` : ''}`;
        const parsed = await callOpenAICompatible(
          'https://api.openai.com/v1/chat/completions',
          info.key,
          'gpt-4o-mini',
          systemPrompt,
          userPrompt
        );
        return { data: parsed, provider: 'openai', model: 'gpt-4o-mini' };
      }

      // 3. Groq Engine
      if (info.provider === 'groq') {
        const systemPrompt = `You are a sales assistant for FlowDesk. Write a personalized follow-up in tone ${tone}. Output JSON: { "message": "...", "subject": "..." }`;
        const userPrompt = `Lead Name: ${params.lead.name}\nCompany: ${params.lead.company}\nInquiry: "${params.lead.originalMessage}"\n${params.previousMessage ? `Variation distinctly different from: "${params.previousMessage}"` : ''}`;
        const parsed = await callOpenAICompatible(
          'https://api.groq.com/openai/v1/chat/completions',
          info.key,
          'llama-3.3-70b-versatile',
          systemPrompt,
          userPrompt
        );
        return { data: parsed, provider: 'groq', model: 'llama-3.3-70b' };
      }

      // 4. Google Gemini Engine (with instant multi-model fallback)
      if (info.provider === 'gemini') {
        const client = getGeminiClient(env);
        if (!client) throw new Error('Gemini client unavailable');

        const prompt = `Write a personalized follow-up response to this prospect:
Lead Name: ${params.lead.name}
Company: ${params.lead.company}
Inquiry: "${params.lead.originalMessage}"
${params.lead.summary ? `Context Summary: ${params.lead.summary}` : ''}
${params.lead.suggestedAction ? `Suggested Action: ${params.lead.suggestedAction}` : ''}
${params.previousMessage ? `Previous variation to alter: "${params.previousMessage}"` : ''}

Desired Tone: ${tone}`;

        let lastError: any = null;

        for (const model of GEMINI_MODELS) {
          try {
            const response = await client.models.generateContent({
              model,
              contents: prompt,
              config: {
                systemInstruction: `You are an AI follow-up assistant for FlowDesk writing on behalf of Alex (Sales/Client Lead). Write a concise, genuine, human follow-up message. Match tone: ${tone}. Address the prospect's actual questions. Provide a clear, low-pressure next step (e.g. 15-min call or sending specifics). Do NOT make promises about pricing or availability unless mentioned in context. Do NOT use cheesy sales cliches like "Dear valued customer" or "Hope this finds you well". Return valid JSON with "message" and optional "subject".`,
                responseMimeType: 'application/json',
                responseSchema: followUpSchema,
                temperature: 0.7,
              },
            });

            const text = response.text?.trim();
            if (text) {
              return { data: JSON.parse(text) as FollowUpPayload, provider: 'gemini', model };
            }
          } catch (err: any) {
            lastError = err;
          }
        }

        throw lastError || new Error('All Gemini models failed.');
      }

      throw new Error('No supported AI provider configured.');
    })(),
    SERVER_AI_TIMEOUT_MS,
    'Follow-up Generation'
  );
}
