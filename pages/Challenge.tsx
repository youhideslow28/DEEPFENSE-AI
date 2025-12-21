
import React, { useState, useEffect } from 'react';
import { LEVELS } from '../data';
import { GameState, UserSession } from '../types';
import { CheckCircle2, XCircle, BrainCircuit, Cpu, Zap, Info, Search, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const STORAGE_KEY = 'DEEPFENSE_USER_DATA';
const GAME_STATE_KEY = 'DEEPFENSE_GAME_STATE';

const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (videoId) {
      const origin = window.location.origin;
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&controls=1&origin=${encodeURIComponent(origin)}`;
    }
    return url;
};

const Challenge: React.FC = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      const savedGame = localStorage.getItem(GAME_STATE_KEY);
      if (savedGame) setGameState(JSON.parse(savedGame));
      else startNewGame();
    }
  }, []);

  const startNewGame = () => {
    const shuffled = [...LEVELS].sort(() => 0.5 - Math.random()).slice(0, 10);
    const newState = { levels: shuffled, current: 0, score: 0, wrong_count: 0, wrong_topics: [], finished: false, show_result: false, last_correct: null };
    setGameState(newState);
    setAiAnalysis(null);
  };

  const handleChoice = async (choice: 1 | 2) => {
    if (!gameState) return;
    const currentLevel = gameState.levels[gameState.current];
    const isCorrect = currentLevel.fake_pos === choice;
    
    setGameState(prev => prev ? ({
        ...prev,
        show_result: true,
        last_correct: isCorrect,
        score: isCorrect ? prev.score + 1 : prev.score,
        wrong_count: !isCorrect ? prev.wrong_count + 1 : prev.wrong_count,
        wrong_topics: !isCorrect ? [...prev.wrong_topics, currentLevel.title] : prev.wrong_topics
    }) : null);

    generateForensicReport(currentLevel);
  };

  const generateForensicReport = async (level: any) => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
            Đóng vai chuyên gia Neural Forensic. Phân tích video YouTube: "${level.title}".
            Bên ${level.fake_pos === 1 ? "Trái" : "Phải"} là AI Deepfake.
            Hãy viết một báo cáo so sánh lỗi sai cực kỳ kỹ thuật và chuyên sâu.
            YÊU CẦU:
            - So sánh: Người thật (Baseline) vs AI (Artifacts).
            - Chỉ ra điểm yếu pixel cụ thể trong video này (ví dụ: texture da, viền môi, ánh sáng mắt).
            - Trình bày dạng danh sách gạch đầu dòng, ngôn ngữ sắc bén, ngắn gọn.
            - Kết luận bằng 1 câu về "Deepfake Signature" phát hiện được.
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [{ parts: [{ text: prompt }] }]
        });
        setAiAnalysis(response.text || "Dữ liệu phân tích trống.");
    } catch (e) {
        setAiAnalysis("Lỗi kết nối Neural Core. Sử dụng dữ liệu offline.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  const nextLevel = () => {
    if (!gameState) return;
    if (gameState.current >= gameState.levels.length - 1) {
        setGameState(prev => prev ? ({ ...prev, finished: true }) : null);
    } else {
        setGameState(prev => prev ? ({ ...prev, current: prev.current + 1, show_result: false }) : null);
        setAiAnalysis(null);
    }
  };

  if (!user) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="bg-surface border border-primary/20 p-10 rounded-3xl shadow-2xl max-w-sm w-full text-center">
                 <Cpu size={48} className="text-primary mx-auto mb-6 animate-spin-slow" />
                 <h2 className="text-2xl font-black text-white mb-2 italic uppercase">AUTHENTICATION</h2>
                 <p className="text-gray-500 text-xs mb-8 uppercase tracking-widest font-mono">Nhập Agent ID để truy cập hệ thống quét</p>
                 <form onSubmit={(e) => { e.preventDefault(); setUser({username: usernameInput, history: []}); startNewGame(); }} className="space-y-4">
                     <input 
                         type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}
                         className="w-full bg-black border border-gray-800 rounded-xl p-4 text-center font-mono text-primary font-bold text-lg outline-none uppercase tracking-tighter"
                         placeholder="ID-NUMBER-XXX" autoFocus
                     />
                     <button type="submit" className="w-full bg-primary text-black font-black py-4 rounded-xl hover:bg-white transition-all text-xs uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)]">KÍCH HOẠT QUÉT</button>
                 </form>
            </div>
        </div>
    )
  }

  if (gameState && gameState.finished) {
    return (
      <div className="flex flex-col items-center py-10 max-w-2xl mx-auto animate-in zoom-in duration-500">
        <div className="bg-surface border border-white/5 p-12 rounded-3xl w-full text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <h2 className="text-gray-500 font-mono text-[10px] mb-6 tracking-[0.5em] uppercase">Missions Summary Completed</h2>
            <div className="text-8xl font-black text-white mb-2 italic">
                {gameState.score}<span className="text-2xl text-gray-700 not-italic">/10</span>
            </div>
            <div className={`text-xs font-bold uppercase mb-10 ${gameState.score >= 7 ? 'text-success' : 'text-secondary'}`}>
                {gameState.score >= 7 ? 'RANK: MASTER DETECTOR' : 'RANK: JUNIOR ANALYST'}
            </div>
            <button onClick={startNewGame} className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs transition-all uppercase hover:bg-primary shadow-xl">BẮT ĐẦU CHIẾN DỊCH MỚI</button>
        </div>
      </div>
    );
  }

  if (!gameState) return <div className="text-primary text-center mt-40 font-mono tracking-widest animate-pulse">CONNECTING TO YOUTUBE FEED...</div>;

  const lvl = gameState.levels[gameState.current] as any;
  const progress = ((gameState.current) / gameState.levels.length) * 100;

  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                 <Zap size={14} className="text-primary animate-pulse" />
                 <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-black">Neural Scanner Active</span>
              </div>
              <h3 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">{lvl.title}</h3>
          </div>
          <div className="flex items-center gap-4 shrink-0">
               <div className="text-right">
                  <div className="text-[9px] text-gray-500 font-mono uppercase">Progress</div>
                  <div className="text-primary font-mono font-bold text-2xl leading-none">{gameState.current + 1}<span className="text-gray-800">/10</span></div>
               </div>
          </div>
      </div>

      <div className="h-1 bg-gray-900 rounded-full overflow-hidden mb-10">
            <div className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_#00F0FF]" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             {/* Left Column: Video & Actions */}
             <div className="lg:col-span-8 space-y-6">
                 <div className="relative bg-black border border-white/10 rounded-3xl overflow-hidden aspect-video shadow-2xl group">
                    <iframe 
                        src={getEmbedUrl(lvl.video_url)} 
                        className="w-full h-full" 
                        title="Challenge Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    
                    {/* Visual Overlay Indicators */}
                    <div className="absolute top-6 left-6 pointer-events-none">
                        <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-lg border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Search size={12} /> A-SIDE CHANNEL
                        </div>
                    </div>
                    <div className="absolute top-6 right-6 pointer-events-none">
                        <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-lg border border-secondary/30 text-secondary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Search size={12} /> B-SIDE CHANNEL
                        </div>
                    </div>

                    {gameState.show_result && (
                         <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-[scan_3s_linear_infinite] shadow-[0_0_20px_#00F0FF] opacity-30"></div>
                         </div>
                    )}
                 </div>
                 
                 {!gameState.show_result ? (
                     <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => handleChoice(1)} className="group relative py-6 border border-white/10 bg-surface/40 text-white font-black rounded-2xl hover:border-primary hover:text-primary transition-all uppercase text-xs overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            TRÁI LÀ DEEPFAKE
                         </button>
                         <button onClick={() => handleChoice(2)} className="group relative py-6 border border-white/10 bg-surface/40 text-white font-black rounded-2xl hover:border-secondary hover:text-secondary transition-all uppercase text-xs overflow-hidden">
                            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            PHẢI LÀ DEEPFAKE
                         </button>
                     </div>
                 ) : (
                    <div className="animate-in slide-in-from-bottom-6 duration-500">
                        <div className={`p-8 rounded-3xl border-2 flex flex-col sm:flex-row items-center gap-8 ${gameState.last_correct ? 'bg-success/5 border-success/30' : 'bg-secondary/5 border-secondary/30'}`}>
                            <div className="shrink-0">
                                {gameState.last_correct ? <CheckCircle2 className="text-success" size={64} /> : <XCircle className="text-secondary" size={64} />}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className={`text-2xl font-black mb-2 uppercase italic ${gameState.last_correct ? 'text-success' : 'text-secondary'}`}>
                                    {gameState.last_correct ? "XÁC THỰC THÀNH CÔNG" : "PHÂN TÍCH SAI LỆCH"}
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                                    {gameState.last_correct 
                                        ? "Bạn đã phát hiện chính xác những điểm bất thường trong luồng dữ liệu AI." 
                                        : "Mắt của bạn đã bị đánh lừa bởi thuật toán làm mịn. Hãy xem bảng phân tích bên cạnh."}
                                </p>
                            </div>
                            <button onClick={nextLevel} className="shrink-0 bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-primary transition-all text-xs uppercase shadow-xl hover:scale-105 active:scale-95">TIẾP THEO</button>
                        </div>
                    </div>
                 )}
             </div>

             {/* Right Column: Forensic Comparison Console */}
             <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                 <div className="bg-surface border border-white/5 rounded-3xl p-6 flex-1 flex flex-col relative overflow-hidden group">
                     {/* Console Header */}
                     <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2">
                            <BrainCircuit className="text-primary" size={20} />
                            <span className="text-xs font-black text-white uppercase tracking-widest italic">Neural Forensic Reports</span>
                        </div>
                        <div className="text-[8px] font-mono text-gray-500 animate-pulse">STATUS: {isAnalyzing ? 'SCANNING...' : 'COMPLETED'}</div>
                     </div>

                     {/* Main Report Body */}
                     <div className="flex-1 font-mono text-[11px] space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        {isAnalyzing ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 py-20 opacity-40">
                                <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <div className="animate-pulse">DECODING VIDEO STREAM...</div>
                            </div>
                        ) : aiAnalysis ? (
                            <div className="animate-in fade-in duration-700">
                                {/* Error Table Comparison */}
                                <div className="bg-black/60 border border-white/5 rounded-xl p-4 mb-6">
                                    <div className="grid grid-cols-2 gap-4 text-[9px] uppercase font-black tracking-widest mb-4">
                                        <div className="text-success border-b border-success/20 pb-1">Human Baseline</div>
                                        <div className="text-secondary border-b border-secondary/20 pb-1">AI Artifacts</div>
                                    </div>
                                    <div className="space-y-4">
                                        {lvl.technical_flaws?.map((flaw: any, i: number) => (
                                            <div key={i} className="border-b border-white/5 pb-3 last:border-0">
                                                <div className="text-gray-500 text-[8px] mb-1 uppercase tracking-tighter">{flaw.feature}</div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="text-gray-300 leading-tight pr-2 border-r border-white/5">{flaw.real_behavior}</div>
                                                    <div className="text-secondary/80 leading-tight italic">{flaw.ai_error}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Dynamic AI Analysis */}
                                <div className="text-gray-400 whitespace-pre-wrap leading-relaxed border-l-2 border-primary/30 pl-4 py-2 bg-primary/5 rounded-r-lg">
                                    {aiAnalysis}
                                </div>
                                
                                {lvl.timestamp_glitch && (
                                    <div className="mt-6 flex items-center gap-2 bg-secondary/10 p-3 rounded-lg border border-secondary/20">
                                        <Info size={14} className="text-secondary" />
                                        <span className="text-[10px] text-secondary font-black uppercase">Vùng lỗi xác định: {lvl.timestamp_glitch}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full gap-4 py-20 opacity-20 text-center">
                                <ShieldCheck size={48} />
                                <p className="uppercase text-[10px] tracking-widest font-black max-w-[150px]">Vui lòng chọn video để bắt đầu phân tích kỹ thuật</p>
                            </div>
                        )}
                     </div>
                 </div>

                 <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                    <div className="text-[9px] text-gray-500 font-mono mb-2 uppercase tracking-widest">Global Defense Intel</div>
                    <div className="text-[11px] text-primary leading-tight font-medium italic">
                        "Lưu ý: Deepfake thế hệ mới có thể xóa bỏ hoàn toàn nếp nhăn vi mô. Luôn yêu cầu đối phương 'ngoáy tai' hoặc 'quay mặt 90 độ' để phá vỡ cấu trúc AI."
                    </div>
                 </div>
             </div>
      </div>
    </div>
  );
};

export default Challenge;
