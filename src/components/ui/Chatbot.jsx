import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ChevronDown } from 'lucide-react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Election Expert. Ask me anything about the Indian election process, ECI rules, or voting.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const backendUrl = '/api/chat';
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, history: messages })
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now(), text: data.text, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Sorry, I couldn't connect to the server. Please ensure your VITE_BACKEND_URL is set correctly and the backend is running.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 right-5 w-12 h-12 bg-ink text-white rounded-claude flex items-center justify-center shadow-warm-md hover:bg-ink/90 transition-colors z-40"
          >
            <MessageSquare size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-5 right-5 w-[90vw] md:w-[360px] h-[480px] max-h-[80vh] bg-white border border-surface-border rounded-claude shadow-warm-md flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-surface">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-ink text-white flex items-center justify-center">
                  <Bot size={13} />
                </div>
                <span className="text-sm font-semibold text-ink">Election Expert</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-1"></span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink-faint hover:text-ink transition-colors p-1 rounded-claude hover:bg-surface-raised"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-claude text-sm leading-relaxed ${
                    msg.isBot
                      ? 'bg-white border border-surface-border text-ink'
                      : 'bg-ink text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-surface-border px-3 py-2 rounded-claude flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-ink-faint rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-ink-faint rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-ink-faint rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="px-3 py-3 border-t border-surface-border bg-white flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about voting..."
                className="flex-1 bg-surface border border-surface-border rounded-claude px-3 py-2 text-sm text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 bg-ink text-white rounded-claude flex items-center justify-center disabled:opacity-40 hover:bg-ink/90 transition-all flex-shrink-0"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
