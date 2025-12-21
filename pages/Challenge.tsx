
import React, { useState, useEffect } from 'react';
import { LEVELS, PERSONALITY_QUESTIONS } from '../data';
import { GameState, UserSession, GameHistoryItem, LikertScale, PersonalityTestResult } from '../types';
import { RefreshCcw, PlayCircle, CheckCircle2, XCircle, UserPlus, Save, UploadCloud, ShieldAlert, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'DEEPFENSE_USER_DATA';
const GAME_STATE_KEY = 'DEEPFENSE_GAME_STATE';

const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (videoId) {
      // Tự động lấy origin hiện tại (dù là github.io hay tên miền riêng)
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&controls=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`;
    }
    return url;
};

const LikertOption: React.FC<{ 
    qId: string, 
    value: LikertScale, 
    label: string, 
    onClick: (qId: string, value: LikertScale) => void,
    activeValue?: LikertScale 
}> = ({ qId, value, label, onClick, activeValue }) => (
    <div 
        onClick={() => onClick(qId, value)}
        className={`flex-1 cursor-pointer transition-all p-3 rounded-lg border flex flex-col items-center gap-1 ${activeValue === value 
            ? 'bg-primary border-primary text-black font-bold' 
            : 'bg-black/40 border-gray-800 text-gray-500 hover:bg-gray-800'}`}
    >
        <div className="text-xl">{['😡', '😟', '😐', '🙂', '🤩'][value - 1]}</div>
        <div className="text-[8px] uppercase font-bold text-center mt-1">{label}</div>
    </div>
);

const Challenge: React.FC = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, LikertScale>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      const savedGame = localStorage.getItem(GAME_STATE_KEY);
      if (savedGame) setGameState(JSON.parse(savedGame));
      else startNewGame();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    const existingData = localStorage.getItem(STORAGE_KEY);
    let session: UserSession = existingData ? { ...JSON.parse(existingData), username: usernameInput } : { username: usernameInput, history: [] };
    setUser(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    startNewGame();
  };

  const handleLogout = () => {
    setUser(null);
    setGameState(null);
    localStorage.removeItem(GAME_STATE_KEY);
  };

  const startNewGame = () => {
    const shuffled = [...LEVELS].sort(() => 0.5 - Math.random()).slice(0, 10);
    const newState = { levels: shuffled, current: 0, score: 0, wrong_count: 0, wrong_topics: [], finished: false, show_result: false, last_correct: null };
    setGameState(newState);
    setShowFeedback(false);
    setPersonalityAnswers({});
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(newState));
  };

  const handleChoice = (choice: 1 | 2) => {
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
  };

  const nextLevel = () => {
    if (!gameState) return;
    if (gameState.current >= gameState.levels.length - 1) setShowFeedback(true);
    else setGameState(prev => prev ? ({ ...prev, current: prev.current + 1, show_result: false }) : null);
  };

  const saveAndFinish = () => {
    if (!gameState || !user) return;
    if (Object.keys(personalityAnswers).length < PERSONALITY_QUESTIONS.length) {
        alert("Vui lòng hoàn thành khảo sát.");
        return;
    }
    setIsUploading(true);
    const interval = setInterval(() => {
        setUploadProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setTimeout(finishGame, 500);
                return 100;
            }
            return prev + 10;
        });
    }, 100);
  };

  const finishGame = () => {
    if (!gameState || !user) return;
    const result: PersonalityTestResult = { answers: personalityAnswers };
    const newHistoryItem: GameHistoryItem = { id: Date.now().toString(), timestamp: Date.now(), score: gameState.score, wrong_topics: gameState.wrong_topics, personality: result };
    const updatedUser = { ...user, history: [newHistoryItem, ...user.history] };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    setGameState(prev => prev ? ({ ...prev, finished: true }) : null);
    setShowFeedback(false);
    setIsUploading(false);
  };

  if (isUploading) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <div className="bg-surface border border-primary/20 p-8 rounded-2xl text-center max-w-xs w-full">
                <UploadCloud size={40} className="text-primary animate-bounce mx-auto mb-4" />
                <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">ĐANG LƯU KẾT QUẢ...</h3>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
            </div>
        </div>
    )
  }

  if (!user) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <div className="bg-surface border border-primary/20 p-8 rounded-2xl shadow-xl max-w-xs w-full">
                 <div className="text-center mb-6">
                     <UserPlus size={32} className="text-primary mx-auto mb-4" />
                     <h2 className="text-xl font-bold text-white uppercase italic">ĐĂNG KÝ AGENT</h2>
                 </div>
                 <form onSubmit={handleLogin} className="space-y-4">
                     <input 
                         type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}
                         className="w-full bg-black border border-gray-800 rounded-lg p-3 text-center font-mono text-primary font-bold text-sm outline-none uppercase"
                         placeholder="TÊN CỦA BẠN..." autoFocus
                     />
                     <button 
                         type="submit" disabled={!usernameInput.trim()}
                         className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:scale-105 transition-all text-xs uppercase"
                     >
                         BẮT ĐẦU
                     </button>
                 </form>
            </div>
        </div>
    )
  }

  if (showFeedback && gameState) {
      return (
          <div className="max-w-2xl mx-auto py-8">
              <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-2 uppercase italic">KHẢO SÁT TÂM LÝ</h2>
              </div>
              <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-8">
                  {PERSONALITY_QUESTIONS.map((q) => (
                      <div key={q.id}>
                          <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-3">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                              {q.text}
                          </h4>
                          <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map(v => (
                                <LikertOption 
                                  key={v} qId={q.id} value={v as LikertScale} 
                                  label={['Rất thấp', 'Thấp', 'Vừa', 'Cao', 'Rất cao'][v-1]}
                                  onClick={(id, val) => setPersonalityAnswers(prev => ({...prev, [id]: val}))}
                                  activeValue={personalityAnswers[q.id]}
                                />
                              ))}
                          </div>
                      </div>
                  ))}
                  <button 
                      onClick={saveAndFinish}
                      className="w-full bg-success text-black font-bold py-4 rounded-xl hover:brightness-110 transition-all uppercase text-sm tracking-widest"
                  >
                      KẾT THÚC & LƯU
                  </button>
              </div>
          </div>
      )
  }

  if (gameState && gameState.finished) {
    return (
      <div className="flex flex-col items-center py-8 max-w-xl mx-auto">
        <div className="text-center mb-8 bg-surface border border-gray-800 p-10 rounded-2xl w-full">
            <h2 className="text-[10px] text-gray-500 font-mono mb-4 tracking-widest uppercase">Báo cáo tổng kết</h2>
            <div className="text-7xl font-black text-white mb-6">
                {gameState.score}<span className="text-2xl text-gray-700">/10</span>
            </div>
            <div className="text-sm font-bold text-primary uppercase mb-8 border-y border-gray-800 py-3 italic">
                AGENT: {user.username}
            </div>

            <div className="text-left bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-white font-bold text-xs mb-4 flex items-center gap-2 uppercase">
                    <BookOpen size={14} className="text-primary" /> Bài học:
                </h3>
                {gameState.wrong_topics.length > 0 ? (
                    <div className="space-y-3">
                        {Array.from(new Set(gameState.wrong_topics)).map((topic, i) => (
                            <div key={i} className="bg-white/5 p-3 rounded-lg border-l-2 border-secondary text-[11px] text-gray-400">
                                <span className="text-secondary font-bold uppercase">{topic}</span>: Cần quan sát kỹ hơn.
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-success text-sm font-bold text-center">Tuyệt vời! Bạn không sai câu nào.</p>
                )}
            </div>
        </div>

        <div className="flex gap-4 w-full">
            <button onClick={startNewGame} className="flex-1 bg-primary text-black p-4 rounded-xl font-bold text-xs transition-all uppercase">
                THỬ LẠI
            </button>
            <button onClick={handleLogout} className="flex-1 bg-gray-900 text-gray-400 p-4 rounded-xl font-bold text-xs transition-all border border-gray-800 uppercase">
                ĐỔI TÊN
            </button>
        </div>
      </div>
    );
  }

  if (!gameState) return <div className="text-primary text-center mt-40 font-mono tracking-widest animate-pulse">BOOTING...</div>;

  const lvl = gameState.levels[gameState.current];
  const progress = ((gameState.current) / gameState.levels.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex justify-between items-end mb-4 px-2">
          <div>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-mono">Mission</span>
              <h3 className="text-white text-2xl font-black italic uppercase">{lvl.title}</h3>
          </div>
          <div className="text-right">
              <span className="text-primary font-mono font-bold text-lg">{gameState.current + 1}<span className="text-gray-700">/10</span></span>
          </div>
      </div>

      <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden mb-8 mx-2">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="space-y-6 px-2">
             <div className="relative bg-black border-2 border-gray-800 rounded-2xl overflow-hidden aspect-video shadow-xl">
                <iframe 
                    src={getEmbedUrl(lvl.video_url)} 
                    className="w-full h-full" 
                    title="Challenge Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-4 py-1.5 rounded-lg text-[10px] font-bold border border-primary/20 text-primary uppercase">
                    BÊN TRÁI
                </div>
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-4 py-1.5 rounded-lg text-[10px] font-bold border border-secondary/20 text-secondary uppercase">
                    BÊN PHẢI
                </div>
             </div>
             
             {!gameState.show_result ? (
                 <div className="grid grid-cols-2 gap-4">
                     <button onClick={() => handleChoice(1)} className="py-6 border border-gray-800 bg-surface/50 text-white font-bold rounded-xl hover:border-primary hover:text-primary transition-all uppercase text-sm">
                        Bên <span className="underline">Trái</span> là Deepfake
                     </button>
                     <button onClick={() => handleChoice(2)} className="py-6 border border-gray-800 bg-surface/50 text-white font-bold rounded-xl hover:border-secondary hover:text-secondary transition-all uppercase text-sm">
                        Bên <span className="underline">Phải</span> là Deepfake
                     </button>
                 </div>
             ) : (
                <div className="bg-surface border-2 p-6 rounded-2xl flex items-center gap-6" style={{ borderColor: gameState.last_correct ? '#05FF00' : '#FF2A6D' }}>
                    <div className="shrink-0">
                        {gameState.last_correct ? <CheckCircle2 className="text-success" size={40} /> : <XCircle className="text-secondary" size={40} />}
                    </div>
                    <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-1 uppercase ${gameState.last_correct ? 'text-success' : 'text-secondary'}`}>
                            {gameState.last_correct ? "XÁC THỰC THÀNH CÔNG" : "THẤT BẠI"}
                        </h3>
                        <p className="text-gray-400 text-[11px] leading-relaxed italic">
                            {lvl.advice}
                        </p>
                    </div>
                    <button onClick={nextLevel} className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-primary transition-all flex items-center gap-2 text-[10px] uppercase shadow-lg">
                        TIẾP THEO
                    </button>
                </div>
             )}
      </div>
    </div>
  );
};

export default Challenge;
