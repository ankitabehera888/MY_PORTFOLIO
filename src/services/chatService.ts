import { generateLocalGroundedResponse, type ChatHistoryItem } from './kiboKnowledge';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const STORAGE_KEY = 'kibo_portfolio_chat_history_v1';

export const SUGGESTED_PROMPTS = [
  'Tell me about Ankita',
  'Explore my projects',
  'What are my technical skills?',
  'Tell me about my certifications'
];

export const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  role: 'assistant',
  content: "Hi! I'm **Kibo**, Ankita's personal portfolio assistant. I can guide you through her AI/ML projects, technical skills, certifications, and research milestones. What would you like to explore?",
  timestamp: Date.now()
};

/**
 * Load chat history from sessionStorage
 */
export function loadChatHistory(): ChatMessage[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Kibo] Failed to parse saved chat history:', err);
  }
  return [INITIAL_WELCOME_MESSAGE];
}

/**
 * Save chat history to sessionStorage
 */
export function saveChatHistory(messages: ChatMessage[]): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (err) {
    console.warn('[Kibo] Failed to persist chat history:', err);
  }
}

/**
 * Clear chat history
 */
export function clearSavedChatHistory(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('[Kibo] Failed to clear chat history:', err);
  }
}

/**
 * Send user query to the secure backend AI endpoint /api/chat.
 * If backend is unavailable or encounters an error, gracefully falls back to the
 * high-precision contextual grounded engine with conversation history.
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error('Message cannot be empty.');
  }

  // Build conversational context for the LLM
  // Include up to 10 recent messages so follow-up questions maintain full context
  const recentHistory: ChatHistoryItem[] = history
    .filter((m) => m.id !== 'welcome-0')
    .slice(-10)
    .map((m) => ({
      role: m.role,
      content: m.content
    }));

  const messagesPayload: ChatHistoryItem[] = [
    ...recentHistory,
    { role: 'user', content: trimmed }
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messagesPayload,
        query: trimmed
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.reply === 'string' && data.reply.trim().length > 0) {
        return data.reply.trim();
      }
    }

    console.warn('[Kibo] API returned status:', response.status, 'Falling back to local grounded engine.');
    return generateLocalGroundedResponse(trimmed, messagesPayload);
  } catch (err) {
    console.warn('[Kibo] Backend API call failed, using grounded fallback engine:', err);
    return generateLocalGroundedResponse(trimmed, messagesPayload);
  }
}
