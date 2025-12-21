
import React, { useState, useEffect } from 'react';
import { LEVELS, PERSONALITY_QUESTIONS, EDUCATIONAL_RULES } from '../data';
import { GameState, PersonalityTestResult, LikertScale } from '../types';
import { CheckCircle2, XCircle, BrainCircuit, Zap, Search, ShieldCheck, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Challenge: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [surveyStep, setSurveyStep] = useState<number | null>(0); // 0 means starting survey
  const [surveyResults, setSurveyResults] = useState<Record<string, number>>({});
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startNewGame = () => {
    const shuffled = [...LEVELS].sort(() => 0.5 - Math.random()).slice(0, 10);
    const newState = { levels: shuffled, current: 0, score: 0, wrong_count: 0, wrong_topics: [], finished: false, show_result: false, last_correct: null };
    setGameState(newState);
    setAiAnalysis(null);
    setSurveyStep(null);
  };

  const handleSurveyAnswer = (questionId: string, value: number) => {
    setSurveyResults(prev => ({ ...prev, [questionId]: value }));
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
            Đóng vai chuyên gia Neural Forensic cao cấp. 
            Phân tích lỗi sai kỹ thuật của video Deepfake "${level.title}". 
            Bên ${level.fake_pos === 1 ? "Trái" : "Phải"} là AI. 
            Dựa trên gợi ý kỹ thuật: "${level.advice}". 
            Hãy viết một báo cáo rút kinh nghiệm chuyên sâu, chi tiết và sắc bén (khoảng 100 chữ).
            Nêu rõ tại sao con người thật sẽ không bao giờ có lỗi pixel như vậy.
            Sử dụng các thuật ngữ như: Latent space, artifacting, mesh distortion, temporal jitter.
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [{ parts: [{ text: prompt }] }]
        });
        setAiAnalysis(response.text || "Dữ liệu offline: " + level.advice);
    } catch (e) {
        setAiAnalysis("Hệ thống Neural Core đang bận. Rút kinh nghiệm: " + level.advice);
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

  // UI: Survey Step
  if (surveyStep !== null) {
      const q = PERSONALITY_QUESTIONS[surveyStep];
      return (
          <div className="max-w-2xl mx-auto py-20 px-4 animate-in fade-in duration-700">
              <div className="bg-surface border border-primary/20 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
                  <div className="flex items-center gap-3 mb-8">
                      <HelpCircle className="text-primary" />
                      <span className="text-[10px] text-primary font-mono uppercase tracking-[0.3em]">Neural Awareness Survey</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-10 leading-relaxed italic">{q.text}</h2>
                  <div className="grid grid-cols-1 gap-3">
                      {[
                          { label: "Hoàn toàn không đồng ý", val: 1 },
                          { label: "Không đồng ý", val: 2 },
                          { label: "Bình thường", val: 3 },
                          { label: "Đồng ý", val: 4 },
                          { label: "Hoàn toàn đồng ý", val: 5 }
                      ].map(opt => (
                          <button 
                            key={opt.val}
                            onClick={() => handleSurveyAnswer(q.id, opt.val)}
                            className="w-full text-left p-4 bg-black/40 border border-white/5 rounded-xl hover:bg-primary hover:text-black hover:font-bold transition-all text-sm group flex justify-between items-center"
                          >
                            {opt.label}
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                      ))}
                  </div>
                  <div className="mt-8 flex justify-center gap-1">
                      {PERSONALITY_QUESTIONS.map((_, i) => (
                          <div key={i} className={`h-1 w-8 rounded-full ${i <= surveyStep ? 'bg-primary' : 'bg-gray-800'}`}></div>
                      ))}
                  </div>
              </div>
          </div>
      );
  }

  if (gameState && gameState.finished) {
    return (
      <div className="max-w-4xl mx-auto py-10 animate-in zoom-in duration-500">
        <div className="bg-surface border border-white/5 p-12 rounded-3xl text-center shadow-2xl relative mb-10">
            <h2 className="text-gray-500 font-mono text-[10px] mb-6 tracking-[0.5em] uppercase italic">Final Neural Report</h2>
            <div className="text-8xl font-black text-white mb-2 italic tracking-tighter">
                {gameState.score}<span className="text-2xl text-gray-700 not-italic">/10</span>
            </div>
            <p className="text-primary font-mono text-sm mb-10 uppercase tracking-widest">
                {gameState.score >= 8 ? "Master Detector" : gameState.score >= 5 ? "Senior Analyst" : "Training Required"}
            </p>
            <button onClick={() => setSurveyStep(0)} className="bg-primary text-black px-12 py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:scale-105 transition-all">THỰC HIỆN LẠI CHIẾN DỊCH</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATIONAL_RULES.map((rule, i) => (
                <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-colors">
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
    <div className="max-w-6xl mx-auto py-4 px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                 <Zap size={14} className="text-primary animate-pulse" />
                 <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">MISSION {gameState.current + 1}</span>
                 <span className={`text-[8px] px-2 py-0.5 rounded-full border ${lvl.difficulty === 'Dễ' ? 'border-success text-success' : lvl.difficulty === 'Trung bình' ? 'border-warning text-warning' : 'border-secondary text-secondary'}`}>{lvl.difficulty}</span>
              </div>
              <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-none">{lvl.title}</h3>
          </div>
          <div className="text-right shrink-0">
              <div className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Progress</div>
              <div className="text-primary font-mono font-bold text-2xl leading-none">{gameState.current + 1}<span className="text-gray-800">/10</span></div>
          </div>
      </div>

      <div className="h-1 bg-gray-900 rounded-full overflow-hidden mb-10">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             <div className="lg:col-span-8 space-y-6">
                 <div className="relative bg-black border border-white/10 rounded-3xl overflow-hidden aspect-video shadow-2xl group">
                    <iframe 
                        src={getEmbedUrl(lvl.video_url)} 
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    
                    {!gameState.show_result && (
                        <div className="absolute top-4 inset-x-4 flex justify-between pointer-events-none">
                            <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-primary/20 text-primary text-[9px] font-black uppercase italic">SCAN_CHANNEL_A</div>
                            <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-secondary/20 text-secondary text-[9px] font-black uppercase italic">SCAN_CHANNEL_B</div>
                        </div>
                    )}

                    {gameState.show_result && (
                         <div className="absolute inset-0 pointer-events-none bg-black/40 flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/30 shadow-[0_0_20px_#00F0FF] animate-[scan_4s_linear_infinite]"></div>
                         </div>
                    )}
                 </div>
                 
                 {!gameState.show_result ? (
                     <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => handleChoice(1)} className="py-6 border border-white/10 bg-surface text-white font-black rounded-2xl hover:border-primary hover:text-primary transition-all uppercase text-[10px] tracking-widest shadow-xl">
                            TRÁI LÀ DEEPFAKE
                         </button>
                         <button onClick={() => handleChoice(2)} className="py-6 border border-white/10 bg-surface text-white font-black rounded-2xl hover:border-secondary hover:text-secondary transition-all uppercase text-[10px] tracking-widest shadow-xl">
                            PHẢI LÀ DEEPFAKE
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
                                    {gameState.last_correct ? "XÁC THỰC THÀNH CÔNG" : "LỖI PHÁT HIỆN LAYER"}
                                </h4>
                                <p className="text-gray-400 text-xs italic leading-relaxed">
                                    {gameState.last_correct 
                                        ? "Mắt của bạn đã phát hiện đúng sự bất thường của các pixel do AI tổng hợp." 
                                        : "Thuật toán render đã đánh lừa nhận thức của bạn. Hãy nghiên cứu kỹ báo cáo bên cạnh."}
                                </p>
                            </div>
                            <button onClick={nextLevel} className="shrink-0 bg-white text-black px-8 py-3 rounded-xl font-black hover:bg-primary transition-all text-[10px] uppercase shadow-xl">TIẾP THEO</button>
                        </div>
                    </div>
                 )}
             </div>

             <div className="lg:col-span-4 space-y-6">
                 <div className="bg-surface border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[400px]">
                     <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2">
                            <BrainCircuit className="text-primary" size={18} />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Forensic Intelligence</span>
                        </div>
                        <div className="text-[8px] font-mono text-gray-500">{isAnalyzing ? 'DECODING...' : 'IDLE'}</div>
                     </div>

                     <div className="flex-1 font-mono text-[11px] leading-relaxed">
                        {isAnalyzing ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-40">
                                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                                <div className="text-[9px] animate-pulse">EXTRACTING METADATA...</div>
                            </div>
                        ) : aiAnalysis ? (
                            <div className="animate-in fade-in duration-1000">
                                <div className="bg-black/40 border border-white/5 p-4 rounded-xl mb-6 italic text-gray-300">
                                    {aiAnalysis}
                                </div>
                                <div className="space-y-4">
                                    {lvl.technical_flaws?.map((flaw: any, i: number) => (
                                        <div key={i} className="border-t border-white/5 pt-3">
                                            <div className="text-primary text-[8px] font-black uppercase mb-1 tracking-tighter">FEATURE: {flaw.feature}</div>
                                            <div className="grid grid-cols-2 gap-2 text-[9px]">
                                                <div className="text-gray-500 border-r border-white/5 pr-2">BASELINE: {flaw.real_behavior}</div>
                                                <div className="text-secondary/80">ARTIFACT: {flaw.ai_error}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20">
                                <ShieldCheck size={40} className="mb-4" />
                                <p className="uppercase text-[9px] font-black tracking-widest max-w-[150px]">Vui lòng phân tích video và đưa ra lựa chọn</p>
                            </div>
                        )}
                     </div>
                 </div>
                 
                 <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                    <div className="text-[9px] text-gray-500 font-mono mb-2 uppercase tracking-widest">Training Advice</div>
                    <p className="text-[11px] text-gray-400 italic">
                        {lvl.hint}
                    </p>
                 </div>
             </div>
      </div>
    </div>
  );
};

export default Challenge;
