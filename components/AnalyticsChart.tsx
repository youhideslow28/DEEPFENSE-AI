
import React, { useEffect, useState, useMemo } from 'react';
import { Brain, Activity, Zap, Shield, Target } from 'lucide-react';

const AnalyticsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'PSYCHOLOGY'>('METRICS');
  const [rotation, setRotation] = useState(0);
  const [pulse, setPulse] = useState(1);

  // Sử dụng useMemo để cố định dữ liệu ngẫu nhiên, tránh re-render gây rung màn hình
  const barHeights = useMemo(() => 
    [...Array(20)].map(() => Math.random() * 15 + 3), 
  []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.8) % 360);
      setPulse(1 + Math.sin(Date.now() / 600) * 0.03);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const data = {
    defenseIndex: 8.4,
    stats: [
      { label: 'DEEPFAKE', val: 35, color: '#FF2A6D' },
      { label: 'NEURAL_STABLE', val: 65, color: '#05FF00' }
    ],
    traits: [
      { label: 'SKEPTICISM', val: 92 },
      { label: 'CONFIDENCE', val: 78 },
      { label: 'AWARENESS', val: 85 }
    ]
  };

  return (
    <div className="bg-[#050505] border border-primary/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,1)] h-full w-full flex flex-col font-mono relative overflow-hidden group">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00F0FF33_0%,_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="text-primary animate-pulse" size={16} />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/80 tracking-widest uppercase leading-none">NEURAL_DIAGNOSTIC</span>
            <span className="text-[7px] text-primary/60 font-mono uppercase tracking-tighter mt-1">CORE_STABLE_V2.5</span>
          </div>
        </div>
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10">
          <button 
            onClick={() => setActiveTab('METRICS')} 
            className={`p-1.5 rounded-md transition-all ${activeTab === 'METRICS' ? 'bg-primary text-black shadow-[0_0_10px_#00F0FF]' : 'text-gray-500 hover:text-white'}`}
          >
            <Zap size={14} />
          </button>
          <button 
            onClick={() => setActiveTab('PSYCHOLOGY')} 
            className={`p-1.5 rounded-md transition-all ${activeTab === 'PSYCHOLOGY' ? 'bg-primary text-black shadow-[0_0_10px_#00F0FF]' : 'text-gray-500 hover:text-white'}`}
          >
            <Brain size={14} />
          </button>
        </div>
      </div>

      {/* Main Content Area - Fixed Height to prevent shaking */}
      <div className="flex-1 relative p-6 flex flex-col items-center justify-center overflow-hidden">
        {activeTab === 'METRICS' ? (
          <div className="w-full h-full flex flex-col animate-in zoom-in fade-in duration-300">
            {/* Circular Progress Gauge */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center mb-6 shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <circle 
                    cx="50" cy="50" r="46" fill="none" 
                    stroke="url(#gaugeGrad)" strokeWidth="4" 
                    strokeDasharray={`${data.defenseIndex * 28.9}, 289`} 
                    strokeLinecap="round" 
                />
                <defs>
                    <linearGradient id="gaugeGrad">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                </defs>
              </svg>
              {/* Rotating Pointer Ring */}
              <div 
                className="absolute inset-0 border border-primary/10 rounded-full scale-90" 
                style={{ transform: `scale(0.85) rotate(${rotation}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#00F0FF]"></div>
              </div>
              <div className="text-center relative z-10" style={{ transform: `scale(${pulse})` }}>
                <div className="text-[8px] font-black text-primary/60 tracking-widest mb-1 uppercase">DEF_IDX</div>
                <div className="text-4xl font-black text-white italic tracking-tighter">{data.defenseIndex}</div>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
              {data.stats.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3 relative overflow-hidden group/card hover:bg-white/10 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: s.color }}></div>
                  <div className="text-[7px] text-gray-500 font-black mb-1 uppercase tracking-widest">{s.label}</div>
                  <div className="text-lg font-black text-white">{s.val}%</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col animate-in slide-in-from-right-4 fade-in duration-300">
             <div className="flex-1 relative flex items-center justify-center shrink-0 mb-4">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Brain size={100} className="text-primary" />
                </div>
                {/* Visualizer bars */}
                <div className="flex items-end gap-1 h-12 w-full px-4 relative z-10">
                    {barHeights.map((h, i) => (
                        <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-primary/10 to-primary/60 rounded-t-sm" 
                            style={{ 
                                height: `${h + Math.sin(Date.now()/500 + i)*3}px`,
                                transition: 'height 0.1s ease-out'
                            }}
                        ></div>
                    ))}
                </div>
             </div>
             <div className="bg-black/40 border border-white/5 p-4 rounded-xl mt-auto">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black">NEURAL_STABILITY</span>
                    <span className="text-[8px] text-success font-black tracking-widest">OPTIMAL</span>
                 </div>
                 <div className="space-y-2">
                    {data.traits.map((t, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <div className="flex justify-between text-[7px] font-mono text-gray-400">
                                <span>{t.label}</span>
                                <span>{t.val}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${t.val}%` }}></div>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="bg-black/60 border-t border-white/5 p-3 flex justify-between items-center text-[7px] font-mono px-6 shrink-0">
        <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-1.5"><Target size={10} className="text-secondary" /> SCAN: 2.4GHz</span>
            <span className="flex items-center gap-1.5"><Shield size={10} className="text-success" /> AES_256</span>
        </div>
        <div className="text-primary/80 animate-pulse uppercase font-black tracking-widest flex items-center gap-1">
            <span className="w-1 h-1 bg-primary rounded-full"></span> LIVE_DATA
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
