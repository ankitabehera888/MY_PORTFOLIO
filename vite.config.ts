import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { KIBO_SYSTEM_PROMPT } from './src/services/kiboKnowledge.ts'

function kiboChatApiPlugin(apiKey: string): Plugin {
  const handler = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    // Match /api/chat path
    const url = req.url?.split('?')[0];
    if (url === '/api/chat' && req.method === 'POST') {
      try {
        const body = await new Promise<string>((resolve, reject) => {
          let data = '';
          req.on('data', chunk => { data += chunk; });
          req.on('end', () => resolve(data));
          req.on('error', reject);
        });

        const parsed = JSON.parse(body || '{}');
        const messages = Array.isArray(parsed.messages) ? parsed.messages : [];
        const effectiveKey = apiKey || process.env.OPENROUTER_API_KEY || '';

        if (!effectiveKey) {
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'OPENROUTER_API_KEY is not configured.' }));
          return;
        }

        const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${effectiveKey}`,
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
          console.error('[Kibo Vite Dev API] OpenRouter error:', openRouterRes.status, errText);
          res.statusCode = openRouterRes.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'OpenRouter API error' }));
          return;
        }

        const data = (await openRouterRes.json()) as any;
        const reply = data?.choices?.[0]?.message?.content || '';

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ reply }));
      } catch (err: any) {
        console.error('[Kibo Vite Dev API] Error handling /api/chat:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
      }
    } else {
      next();
    }
  };

  return {
    name: 'kibo-chat-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      kiboChatApiPlugin(apiKey),
    ],
  };
})
