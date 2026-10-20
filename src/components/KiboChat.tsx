import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import {
  type ChatMessage,
  SUGGESTED_PROMPTS,
  INITIAL_WELCOME_MESSAGE,
  loadChatHistory,
  saveChatHistory,
  clearSavedChatHistory,
  sendChatMessage
} from '../services/chatService';

/**
 * Lightweight safe Markdown renderer for Kibo chat bubbles.
 * Parses bold, italic, code, bullet lists, numbered lists, and internal #section anchors.
 */
const FormattedMessage: React.FC<{ content: string; onAnchorClick?: (id: string) => void }> = ({
  content,
  onAnchorClick
}) => {
  // Parse inline text formatting (bold, italic, links, code)
  const renderInline = (text: string) => {
    // Regex for markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderFormatting(text.slice(lastIndex, match.index)));
      }
      const label = match[1];
      const url = match[2];

      if (url.startsWith('#')) {
        const targetId = url.slice(1);
        parts.push(
          <button
            key={`anchor-${match.index}`}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onAnchorClick) {
                onAnchorClick(targetId);
              } else {
                const el = document.getElementById(targetId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-0.5 text-[#9A6E1E] hover:text-[#7A5614] font-semibold underline decoration-[#D4A338]/60 underline-offset-2 transition-colors cursor-pointer"
          >
            {label}
          </button>
        );
      } else {
        parts.push(
          <a
            key={`link-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#9A6E1E] hover:text-[#7A5614] font-semibold underline decoration-[#D4A338]/60 underline-offset-2 transition-colors"
          >
            {label}
            <ExternalLink className="w-3 h-3 inline-block opacity-75" />
          </a>
        );
      }
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(renderFormatting(text.slice(lastIndex)));
    }

    return parts.length > 0 ? parts : text;
  };

  const renderFormatting = (raw: string): React.ReactNode => {
    // Tokenize **bold**, *italic*, `code`
    const tokens = raw.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return tokens.map((token, i) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={i} className="font-semibold text-[#191816]">{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith('*') && token.endsWith('*')) {
        return <em key={i} className="italic text-[#3D3934]">{token.slice(1, -1)}</em>;
      }
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-[#EAD8BD] font-mono text-xs text-[#6B4B14] font-medium"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      return token;
    });
  };

  // Split into lines for list processing
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-4 list-disc marker:text-[#D4A338]">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="text-[13.5px] leading-relaxed text-[#2C2824] pl-1">
                {item}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-4 list-decimal marker:text-[#9A6E1E] marker:font-semibold">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="text-[13.5px] leading-relaxed text-[#2C2824] pl-1">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line creates spacing
    if (!trimmed) {
      flushList();
      continue;
    }

    // Bullet point: "- " or "* "
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(renderInline(bulletMatch[1]));
      continue;
    }

    // Numbered list: "1. ", "2. ", etc.
    const numberMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(renderInline(numberMatch[1]));
      continue;
    }

    // Regular paragraph line
    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="text-[13.5px] leading-relaxed text-[#2C2824] my-1.5 first:mt-0 last:mb-0">
        {renderInline(trimmed)}
      </p>
    );
  }
  flushList();

  return <div className="space-y-1">{elements}</div>;
};

export const KiboChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadChatHistory());
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      // Small timeout to autofocus input after modal animation completes
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Listen for global trigger events (e.g. "LET'S TALK" button, Escape key, or #kibo link)
  useEffect(() => {
    const handleOpenKibo = (e: Event) => {
      const customEvent = e as CustomEvent<{ toggle?: boolean; open?: boolean }>;
      if (customEvent.detail?.toggle) {
        setIsOpen((prev) => !prev);
      } else if (customEvent.detail?.open !== undefined) {
        setIsOpen(customEvent.detail.open);
      } else {
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-kibo-chat', handleOpenKibo);
    window.addEventListener('keydown', handleKeyDown);

    const checkHash = () => {
      if (window.location.hash === '#kibo' || window.location.hash === '#chat') {
        setIsOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('open-kibo-chat', handleOpenKibo);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
    saveChatHistory(messages);
  }, [messages, isOpen]);

  // Handle submitting query
  const handleSend = async (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(text, newHistory);
      const assistantMsg: ChatMessage = {
        id: `kibo-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('[Kibo] Error receiving response:', err);
      const fallbackMsg: ChatMessage = {
        id: `kibo-${Date.now()}`,
        role: 'assistant',
        content: "I'm having a brief connection hitch, but you can explore Ankita's [Projects](#projects), [Skills](#skills), or reach her at **ankitabehera888777@gmail.com**!",
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    clearSavedChatHistory();
    setMessages([INITIAL_WELCOME_MESSAGE]);
  };

  const handleAnchorClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] pointer-events-none font-sans print:hidden">
          {/* Subtle click-outside backdrop to dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-stone-900/15 backdrop-blur-[2px] pointer-events-auto"
            aria-hidden="true"
          />

          {/* Modal pinned cleanly at bottom-right */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="flex flex-col w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#FAF3E7] rounded-2xl border border-[#D8C8AE] shadow-2xl shadow-stone-900/25 overflow-hidden backdrop-blur-md"
              role="dialog"
              aria-label="Kibo AI Assistant Chat"
            >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#F2E6D3] via-[#FAF3E7] to-[#EFE1CB] border-b border-[#D8C8AE]/90 select-none">
              <div className="flex items-center gap-3">
                {/* Kibo Sprout Avatar */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#F5EADB] border border-[#D4A338]/70 shadow-sm overflow-hidden flex-shrink-0">
                  <img
                    src="/kibo-avatar.png"
                    alt="Kibo Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#191816] tracking-tight">
                      Kibo
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#E8D8BF] text-[#7A5614] border border-[#D8C8AE]/60 uppercase tracking-wider">
                      AI
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-[#565149] font-medium">
                      Ankita's Portfolio Assistant
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Clear conversation"
                  aria-label="Clear chat"
                  className="p-1.5 rounded-lg text-[#565149] hover:text-[#191816] hover:bg-[#E8D8BF]/60 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat window"
                  className="p-1.5 rounded-lg text-[#565149] hover:text-[#191816] hover:bg-[#E8D8BF]/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body / Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-[#FAF3E7] to-[#F5EADB] scroll-smooth">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5EADB] border border-[#D4A338]/60 overflow-hidden mt-0.5 shadow-xs">
                        <img
                          src="/kibo-avatar.png"
                          alt="Kibo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-[#E5D2B5] text-[#191816] font-medium rounded-tr-xs border border-[#D8C4A0]'
                          : 'bg-[#FAF3E7] text-[#191816] rounded-tl-xs border border-[#D8C8AE]/90 shadow-sm'
                      }`}
                    >
                      <FormattedMessage content={msg.content} onAnchorClick={handleAnchorClick} />
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 justify-start"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5EADB] border border-[#D4A338]/60 overflow-hidden shadow-xs">
                    <img
                      src="/kibo-avatar.png"
                      alt="Kibo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-xs bg-[#FAF3E7] border border-[#D8C8AE]/90 shadow-sm flex items-center gap-1.5">
                    <span className="text-xs text-[#565149] font-medium mr-1">
                      Kibo is thinking
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A338] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A338] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A338] animate-bounce" />
                  </div>
                </motion.div>
              )}

              {/* Suggested Prompts (shown when conversation is new or has 1 welcome message) */}
              {messages.length <= 2 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] uppercase tracking-wider text-[#7D7567] font-semibold mb-2">
                    Suggested Questions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs px-2.5 py-1.5 rounded-full bg-[#FAF3E7] hover:bg-[#F0E2CC] text-[#3D3934] hover:text-[#191816] border border-[#D8C8AE] hover:border-[#D4A338] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input & Footer */}
            <div className="p-3 bg-[#FAF3E7] border-t border-[#D8C8AE]/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Ask Kibo about Ankita's projects, skills..."
                    className="w-full pl-3.5 pr-3 py-2 text-xs sm:text-[13px] rounded-xl bg-[#F2E6D3]/70 hover:bg-[#F2E6D3] focus:bg-[#FAF3E7] text-[#191816] placeholder:text-[#8C8375] border border-[#D8C8AE] focus:border-[#D4A338] focus:ring-2 focus:ring-[#D4A338]/25 outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#D4A338] hover:bg-[#B8860B] active:bg-[#9A6E1E] text-slate-950 disabled:bg-[#E8D8BF] disabled:text-[#8C8375] disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4A338]/50"
                >
                  <Send className="w-4 h-4 translate-x-0.5" />
                </button>
              </form>

              {/* Grounding note footer */}
              <div className="flex items-center justify-between mt-2 px-1 text-[10.5px] text-[#7D7567]">
                <span>Grounded strictly in Ankita's verified portfolio.</span>
                <span className="hidden sm:inline font-mono text-[9.5px]">Enter ↵ to send</span>
              </div>
            </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
