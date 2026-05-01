import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

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
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/chat';
      
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

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
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-transform hover:scale-105 z-40 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-96 h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-bold">Election Expert</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl ${msg.isBot ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm' : 'bg-primary text-white rounded-tr-sm'}`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about voting..."
                className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary rounded-full px-4 py-2 text-sm transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-opacity"
              >
                <Send size={16} className="ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
