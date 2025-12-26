
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ScanLine } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

declare var process: any;

const AiChat: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t.agent_welcome }]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `
        You are DEEPFENSE AGENT - an AI security assistant specializing in Deepfake prevention.
        Current Language: ${lang === 'vi' ? 'Vietnamese' : 'English'}.
        
        RULES:
        1. Always respond in ${lang === 'vi' ? 'Vietnamese' : 'English'}.
        2. Be concise. Use bullet points (-) for main ideas.
        3. Only discuss cybersecurity, Deepfakes, and online safety. Refuse other topics politely.
        4. Maintain a professional and helpful tone.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })), 
            { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: { systemInstruction }
      });

      const text = response.text || (lang === 'vi' ? "Lỗi kết nối." : "Connection error.");
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: lang === 'vi' ? "Hệ thống bảo trì." : "System maintenance." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="pointer-events-auto bg-surface border border-primary/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-[350px] h-[500px] flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            <div className="bg-primary/10 border-b border-primary/20 p-4 flex justify-between items-center relative overflow-hidden">
                <div className="flex items-center gap-2 relative z-10">
                    <div className="bg-primary text-black p-1.5 rounded-full"><Bot size={18} /></div>
                    <div>
                        <h3 className="text-white font-bold text-sm font-mono tracking-widest">DEEPFENSE AGENT</h3>
                        <div className="flex items-center gap-1 text-[10px] text-success">
                            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span> ONLINE
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-primary/20 border border-primary/50 text-white rounded-tr-none' : 'bg-gray-800/80 border border-gray-700 text-gray-200 rounded-tl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-surface border-t border-gray-800">
                <div className="flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder={t.agent_placeholder} className="flex-1 bg-black/50 border border-gray-700 rounded px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                    <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-primary text-black p-2 rounded hover:bg-white disabled:opacity-50"><Send size={18} /></button>
                </div>
            </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="pointer-events-auto bg-primary text-black p-4 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 transition-all">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default AiChat;
