import { KIBO_SYSTEM_PROMPT } from '../src/services/kiboKnowledge';

/**
 * Serverless API handler for Kibo AI Chatbot
 * Deployable to Vercel, Netlify, or Node.js serverless runtimes.
 * Protects OPENROUTER_API_KEY on the server side.
 */
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'OPENROUTER_API_KEY is not configured in server environment.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ankitabehera.dev',
        'X-Title': 'Ankita Behera Portfolio - Kibo AI'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        messages: [
          { role: 'system', content: KIBO_SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.35,
        max_tokens: 800
      })
    });

    if (!openRouterRes.ok) {
      const errText = await openRouterRes.text();
      console.error('[Kibo Serverless] OpenRouter error:', openRouterRes.status, errText);
      return res.status(openRouterRes.status).json({ error: 'Failed to generate response from OpenRouter.' });
    }

    const data = await openRouterRes.json();
    const reply = data?.choices?.[0]?.message?.content || '';

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error('[Kibo Serverless] Exception:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
