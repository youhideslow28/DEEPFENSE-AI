
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ScanLine } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Xin chào! Tôi là DEEPFENSE AGENT (Beta). Tôi có thể hỗ trợ gì về an toàn trực tuyến?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Check if API Key exists to prevent crash on GitHub Pages
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        setMessages(prev => [...prev, 
            { role: 'user', text: input },
            { role: 'model', text: '⚠️ Cảnh báo: Agent chưa được cấu hình API Key để hoạt động trên môi trường này.' }
        ]);
        setInput('');
        return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const systemInstruction = `
        Bạn là DEEPFENSE AGENT - trợ lý AI chuyên về an ninh mạng và phòng chống Deepfake.
        Bạn đang là phiên bản thử nghiệm (Beta).

        YÊU CẦU TRẢ LỜI:
        1. CẤU TRÚC:
           - Bắt đầu bằng lời chào ngắn gọn.
           - Nội dung chính: Ngắn gọn, súc tích, PHẢI DÙNG GẠCH ĐẦU DÒNG (-) cho các ý chính. Tránh viết đoạn văn dài dòng.
           - Kết thúc: Lịch sự, nhắc nhở đây là bản Beta hoặc khuyến nghị kiểm tra thêm.

        2. PHẠM VI CHỦ ĐỀ:
           - CHỈ TRẢ LỜI về: Deepfake, lừa đảo trực tuyến, bảo mật, an toàn thông tin, cách phòng tránh.
           - TỪ CHỐI KHÉO LÉO nếu hỏi về: Chính trị, tình cảm, giải trí, code, hoặc các chủ đề không liên quan.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })), 
            { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: { systemInstruction }
      });

      const text = response.text || "Lỗi kết nối máy chủ.";
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Hệ thống đang bảo trì hoặc API Key hết hạn. Vui lòng thử lại sau." }]);
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
        <div className="pointer-events-auto bg-surface border border-primary/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-[350px] h-[500px] flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 relative group">
            <div className="bg-primary/10 border-b border-primary/20 p-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-[50%] h-full animate-[shimmer_2s_infinite] pointer-events-none"></div>
                
                <div className="flex items-center gap-2 relative z-10">
                    <div className="bg-primary text-black p-1.5 rounded-full"><Bot size={18} /></div>
                    <div>
                        <h3 className="text-white font-bold text-sm tracking-widest font-mono">DEEPFENSE AGENT</h3>
                        <div className="flex items-center gap-1 text-[10px] text-success">
                            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span> SYSTEM ACTIVE
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white relative z-10"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 relative">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                        <div className={`max-w-[85%] rounded-lg p-3 text-sm whitespace-pre-wrap ${
                            msg.role === 'user' 
                                ? 'bg-primary/20 border border-primary/50 text-white font-medium rounded-tr-none' 
                                : 'bg-gray-800/80 border border-gray-700 text-gray-200 rounded-tl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-surface border-t border-gray-800">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Yêu cầu phân tích..."
                        className="flex-1 bg-black/50 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none transition-colors"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-primary text-black p-2 rounded hover:bg-white disabled:opacity-50 transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="text-[9px] text-gray-600 mt-2 text-center flex justify-center items-center gap-1 font-mono uppercase">
                    <ScanLine size={10} /> Neural Defense Protocol
                </div>
            </div>
        </div>
      )}

      {!isOpen && (
        <div className="pointer-events-auto mb-3 animate-bounce cursor-pointer" onClick={() => setIsOpen(true)}>
             <div className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg relative border-2 border-primary hover:scale-105 transition-transform">
                Hỏi AI AGENT!
                <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-r-2 border-b-2 border-primary transform rotate-45"></div>
             </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-primary text-black p-4 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-white hover:scale-110 transition-all duration-300 group relative"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default AiChat;
