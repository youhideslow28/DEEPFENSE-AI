
import React, { useState } from 'react';
import { Brain, Activity, Zap, Shield, Target } from 'lucide-react';

const AnalyticsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'PSYCHOLOGY'>('METRICS');
  
  const data = {
    defenseIndex: 8.4,
    stats: [
      { label: 'DETECTION_RATE', val: 84, color: '#FF2A6D' },
      { label: 'SYSTEM_STABILITY', val: 96, color: '#05FF00' }
    ],
    traits: [
      { label: 'SKEPTICISM', val: 92 },
      { label: 'CONFIDENCE', val: 78 },
      { label: 'AWARENESS', val: 85 }
    ]
  };

  return (
    <div className="bg-[#050505] border border-primary/20 rounded-3xl shadow-2xl h-full w-full flex flex-col font-mono relative overflow-hidden">
      {/* Static Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-b border-white/5 p-5 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <Activity className="text-primary" size={18} />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">NEURAL_DIAGNOSTIC</span>
            <span className="text-[8px] text-primary/60 font-mono uppercase mt-1">CORE_STATE: STABLE</span>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('METRICS')} 
            className={`p-2 rounded-lg transition-all ${activeTab === 'METRICS' ? 'bg-primary text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <Zap size={14} />
          </button>
          <button 
            onClick={() => setActiveTab('PSYCHOLOGY')} 
            className={`p-2 rounded-lg transition-all ${activeTab === 'PSYCHOLOGY' ? 'bg-primary text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <Brain size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative p-8 flex flex-col items-center justify-center">
        {activeTab === 'METRICS' ? (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            {/* GAUGE 8.4 STATIC */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-10">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <circle 
                    cx="50" cy="50" r="46" fill="none" 
                    stroke="#00F0FF" strokeWidth="4" 
                    strokeDasharray={`${8.4 * 28.9}, 289`} 
                    strokeLinecap="round" 
                />
              </svg>
              <div className="text-center relative z-10">
                <div className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase mb-1">DEF_IDX</div>
                <div className="text-5xl font-black text-white italic tracking-tighter">8.4</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {data.stats.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: s.color }}></div>
                  <div className="text-[8px] text-gray-500 font-black mb-2 uppercase tracking-widest">{s.label}</div>
                  <div className="text-xl font-black text-white">{s.val}%</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6 animate-in fade-in duration-300">
             {data.traits.map((t, i) => (
                <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest font-black">
                        <span>{t.label}</span>
                        <span>{t.val}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${t.val}%` }}></div>
                    </div>
                </div>
             ))}
             <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl mt-4">
                 <div className="text-[10px] text-primary font-black tracking-widest uppercase italic">THÔNG BÁO HỆ THỐNG</div>
                 <p className="text-[11px] text-gray-500 mt-2 italic leading-relaxed">Neural analysis engine đang hoạt động ổn định. Không phát hiện xung đột dữ liệu trong phiên làm việc hiện tại.</p>
             </div>
          </div>
        )}
      </div>

      <div className="bg-black/60 border-t border-white/5 p-4 flex justify-between items-center text-[8px] font-mono px-8 shrink-0">
        <div className="flex items-center gap-6 text-gray-600 uppercase font-black">
            <span className="flex items-center gap-1.5"><Target size={12} className="text-secondary" /> SCAN: ACTIVE</span>
            <span className="flex items-center gap-1.5"><Shield size={12} className="text-success" /> SSL: SECURE</span>
        </div>
        <div className="text-primary/60 font-black uppercase tracking-widest italic">NEURAL_CORE_v2.5</div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
