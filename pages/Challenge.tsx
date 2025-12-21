
import React, { useState } from 'react';
import { LEVELS, PERSONALITY_QUESTIONS, EDUCATIONAL_RULES } from '../data';
import { GameState } from '../types';
import { CheckCircle2, XCircle, BrainCircuit, Zap, ShieldCheck, HelpCircle, ArrowRight, BookOpen, Search, RotateCcw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

declare var process: any;

const Challenge: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [surveyStep, setSurveyStep] = useState<number | null>(0);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startNewGame = () => {
    const newState: GameState = { 
      levels: [...LEVELS], 
      current: 0, 
      score: 0, 
      wrong_count: 0, 
      wrong_topics: [], 
      finished: false, 
      show_result: false, 
      last_correct: null 
    };
    setGameState(newState);
    setAiAnalysis(null);
    setSurveyStep(null);
  };

  const handleSurveyAnswer = () => {
    if (surveyStep !== null && surveyStep < PERSONALITY_QUESTIONS.length - 1) {
        setSurveyStep(surveyStep + 1);
    } else {
        startNewGame();
    }
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
            Hãy đóng vai một chuyên gia Giám định Pháp y Kỹ thuật số. 
            Phân tích lỗi AI của video mang tên "${level.title}". 
            Ghi chú kỹ thuật hiện có: "${level.advice}".
            Nhiệm vụ: Viết một báo cáo phân tích sâu (150-200 chữ). 
            Phải giải thích tại sao AI lại tạo ra lỗi đó (ví dụ: lỗi render Latent Space, sự thiếu nhất quán của mạng nơ-ron GANs) và so sánh với vật lý thực tế. 
            Cuối cùng đưa ra lời khuyên sắc bén cho người dùng. 
            Ngôn ngữ: Tiếng Việt, chuyên nghiệp, uy tín.
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [{ parts: [{ text: prompt }] }]
        });
        setAiAnalysis(response.text || "Báo cáo nội bộ: " + level.advice);
    } catch (e) {
        setAiAnalysis("Hệ thống Neural Core đang bận. Ghi chú kỹ thuật: " + level.advice);
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

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : url;
  };

  if (surveyStep !== null) {
      const q = PERSONALITY_QUESTIONS[surveyStep];
      return (
          <div className="max-w-2xl mx-auto py-20 px-4 animate-in fade-in duration-700">
              <div className="bg-surface border border-primary/20 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
                  <div className="flex items-center gap-3 mb-8">
                      <HelpCircle className="text-primary" />
                      <span className="text-[10px] text-primary font-mono uppercase tracking-[0.3em]">Neural Assessment Protocol</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-10 leading-relaxed italic">{q.text}</h2>
                  <div className="grid grid-cols-1 gap-3">
                      {["Hoàn toàn không đồng ý", "Không đồng ý", "Bình thường", "Đồng ý", "Hoàn toàn đồng ý"].map((label) => (
                          <button 
                            key={label}
                            onClick={handleSurveyAnswer}
                            className="w-full text-left p-4 bg-black/40 border border-white/5 rounded-xl hover:bg-primary hover:text-black hover:font-bold transition-all text-sm group flex justify-between items-center"
                          >
                            {label}
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      );
  }

  if (gameState && gameState.finished) {
    return (
      <div className="max-w-5xl mx-auto py-10 animate-in zoom-in duration-500">
        <div className="bg-surface border border-white/5 p-12 rounded-3xl text-center shadow-2xl relative mb-12">
            <h2 className="text-gray-500 font-mono text-[10px] mb-6 tracking-[0.5em] uppercase italic">Neural Campaign Completed</h2>
            <div className="text-8xl font-black text-white mb-2 italic tracking-tighter">
                {gameState.score}<span className="text-2xl text-gray-700 not-italic">/10</span>
            </div>
            <p className="text-primary font-mono text-sm mb-10 uppercase tracking-widest italic">
                {gameState.score >= 8 ? "Chuyên gia Pháp y Kỹ thuật" : gameState.score >= 5 ? "Cộng tác viên An ninh" : "Học viên đang thực tập"}
            </p>
            <button onClick={() => setSurveyStep(0)} className="bg-primary text-black px-12 py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                <RotateCcw size={14} /> THIẾT LẬP LẠI CHIẾN DỊCH
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATIONAL_RULES.map((rule, i) => (
                <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl border-l-4 border-l-primary/40">
                    <BookOpen size={20} className="text-primary mb-4" />
                    <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-tighter italic">{rule.title}</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed italic">{rule.content}</p>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (!gameState) return null;

  const lvl = gameState.levels[gameState.current] as any;
  const progress = ((gameState.current) / gameState.levels.length) * 100;

  return (
    <div className="max-w-7xl mx-auto py-4 px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                 <Zap size={14} className="text-primary" />
                 <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">MISSION {gameState.current + 1} - {lvl.difficulty}</span>
              </div>
              <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-none">{lvl.title}</h3>
          </div>
          <div className="text-right shrink-0">
              <div className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Neural Progress</div>
              <div className="text-primary font-mono font-bold text-2xl leading-none">{gameState.current + 1}<span className="text-gray-800">/10</span></div>
          </div>
      </div>

      <div className="h-1 bg-gray-900 rounded-full overflow-hidden mb-10">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             <div className="lg:col-span-8 space-y-6">
                 <div className="relative bg-black border border-white/10 rounded-3xl overflow-hidden aspect-video shadow-2xl">
                    <iframe 
                        src={getEmbedUrl(lvl.video_url)} 
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    
                    {!gameState.show_result && (
                        <div className="absolute top-4 inset-x-4 flex justify-between pointer-events-none">
                            <div className="bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-primary/20 text-primary text-[9px] font-black uppercase italic">ANALYZING_A</div>
                            <div className="bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-secondary/20 text-secondary text-[9px] font-black uppercase italic">ANALYZING_B</div>
                        </div>
                    )}
                 </div>
                 
                 {!gameState.show_result ? (
                     <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => handleChoice(1)} className="py-6 border border-white/10 bg-surface text-white font-black rounded-2xl hover:border-primary hover:text-primary transition-all uppercase text-[10px] tracking-widest shadow-xl">
                            BÊN TRÁI LÀ DEEPFAKE
                         </button>
                         <button onClick={() => handleChoice(2)} className="py-6 border border-white/10 bg-surface text-white font-black rounded-2xl hover:border-secondary hover:text-secondary transition-all uppercase text-[10px] tracking-widest shadow-xl">
                            BÊN PHẢI LÀ DEEPFAKE
                         </button>
                     </div>
                 ) : (
                    <div className="animate-in slide-in-from-bottom-6 duration-500">
                        <div className={`p-8 rounded-3xl border-2 flex flex-col sm:flex-row items-center gap-8 ${gameState.last_correct ? 'bg-success/5 border-success/30' : 'bg-secondary/5 border-secondary/30'}`}>
                            <div className="shrink-0">
                                {gameState.last_correct ? <CheckCircle2 className="text-success" size={48} /> : <XCircle className="text-secondary" size={48} />}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className={`text-xl font-black mb-2 uppercase italic ${gameState.last_correct ? 'text-success' : 'text-secondary'}`}>
                                    {gameState.last_correct ? "XÁC THỰC THÀNH CÔNG" : "PHÁT HIỆN SAI LỆCH"}
                                </h4>
                                <p className="text-gray-400 text-xs italic leading-relaxed">
                                    {gameState.last_correct 
                                        ? "Neural core đã xác nhận phán đoán. Dữ liệu giả mạo đã bị phơi bày." 
                                        : "Nhận thức của bạn đã bị AI đánh lừa. Hãy nghiên cứu kỹ báo cáo giám định bên cạnh."}
                                </p>
                            </div>
                            <button onClick={nextLevel} className="shrink-0 bg-white text-black px-8 py-3 rounded-xl font-black hover:bg-primary transition-all text-[10px] uppercase shadow-xl">TIẾP THEO</button>
                        </div>
                    </div>
                 )}
             </div>

             <div className="lg:col-span-4 flex flex-col gap-6">
                 <div className="bg-surface border border-white/5 rounded-3xl p-6 flex flex-col min-h-[480px] shadow-xl">
                     <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2">
                            <BrainCircuit className="text-primary" size={18} />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Neural Forensic Report</span>
                        </div>
                        <div className="text-[8px] font-mono text-gray-500 italic">{isAnalyzing ? 'DECODING...' : 'IDLE'}</div>
                     </div>

                     <div className="flex-1 font-mono text-[11px] leading-relaxed">
                        {isAnalyzing ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-40 py-20">
                                <Search className="animate-pulse text-primary mb-4" size={32} />
                                <div className="text-[9px] animate-pulse">EXTRACTING_ARTIFACTS...</div>
                            </div>
                        ) : aiAnalysis ? (
                            <div className="animate-in fade-in duration-1000">
                                <div className="bg-black/40 border border-white/5 p-4 rounded-xl mb-6 italic text-gray-300 border-l-2 border-l-primary leading-relaxed shadow-inner">
                                    {aiAnalysis}
                                </div>
                                <div className="space-y-4">
                                    {lvl.technical_flaws?.map((flaw: any, i: number) => (
                                        <div key={i} className="border-t border-white/5 pt-3">
                                            <div className="text-primary text-[8px] font-black uppercase mb-1 tracking-tighter">DATA_KEY: {flaw.feature}</div>
                                            <div className="grid grid-cols-2 gap-2 text-[9px]">
                                                <div className="text-gray-500 pr-2 border-r border-white/5 uppercase italic">THẬT: {flaw.real_behavior}</div>
                                                <div className="text-secondary font-bold uppercase italic">AI: {flaw.ai_error}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20">
                                <ShieldCheck size={40} className="mb-4" />
                                <p className="uppercase text-[9px] font-black tracking-widest leading-loose">CHỜ KẾT QUẢ<br/>PHÂN TÍCH CHUYÊN SÂU</p>
                            </div>
                        )}
                     </div>
                 </div>
                 
                 <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                    <div className="text-[9px] text-gray-500 font-mono mb-2 uppercase tracking-widest italic">Gợi ý giám định</div>
                    <p className="text-[11px] text-gray-400 italic leading-relaxed">
                        {lvl.hint}
                    </p>
                 </div>
             </div>
      </div>
    </div>
  );
};

export default Challenge;
