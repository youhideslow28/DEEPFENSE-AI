import React, { useState } from 'react';
import { Brain, Activity, Zap, Shield, Target } from 'lucide-react';
import { Language } from '../types';

const AnalyticsChart: React.FC<{ lang: Language }> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'PSYCHOLOGY'>('METRICS');
  
  const metricsLabels = lang === 'vi' 
    ? { detection: 'TỈ LỆ PHÁT HIỆN', stability: 'ĐỘ ỔN ĐỊNH HỆ THỐNG', title: 'TRUNG TÂM PHÂN TÍCH', status: 'TRẠNG THÁI: ỔN ĐỊNH' }
    : { detection: 'DETECTION RATE', stability: 'SYSTEM STABILITY', title: 'DIAGNOSTIC CENTER', status: 'STATE: STABLE' };

  const data = {
    defenseIndex: 8.4,
    stats: [
      { label: metricsLabels.detection, val: 84, color: '#FF2A6D' },
      { label: metricsLabels.stability, val: 96, color: '#05FF00' }
    ],
    traits: [
      { label: lang === 'vi' ? 'HOÀI NGHI' : 'SKEPTICISM', val: 92 },
      { label: lang === 'vi' ? 'TỰ TIN' : 'CONFIDENCE', val: 78 },
      { label: lang === 'vi' ? 'NHẬN THỨC' : 'AWARENESS', val: 85 }
    ]
  };

  return (
    <div className="bg-[#050505] border border-primary/20 rounded-3xl shadow-2xl h-full w-full flex flex-col font-mono relative overflow-hidden">
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="text-primary" size={16} />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none">{metricsLabels.title}</span>
            <span className="text-[7px] text-primary/60 font-mono uppercase mt-0.5">{metricsLabels.status}</span>
          </div>
        </div>
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
          <button onClick={() => setActiveTab('METRICS')} className={`p-1.5 rounded-lg transition-all ${activeTab === 'METRICS' ? 'bg-primary text-black' : 'text-gray-500'}`}><Zap size={12} /></button>
          <button onClick={() => setActiveTab('PSYCHOLOGY')} className={`p-1.5 rounded-lg transition-all ${activeTab === 'PSYCHOLOGY' ? 'bg-primary text-black' : 'text-gray-500'}`}><Brain size={12} /></button>
        </div>
      </div>

      <div className="flex-1 relative p-8 flex flex-col items-center justify-center">
        {activeTab === 'METRICS' ? (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-40 h-40 flex items-center justify-center mb-10">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#00F0FF" strokeWidth="4" strokeDasharray={`${8.4 * 28.9}, 289`} strokeLinecap="round" />
              </svg>
              <div className="text-center relative z-10">
                <div className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase mb-1">DEF_IDX</div>
                <div className="text-5xl font-black text-white italic tracking-tighter">8.4</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {data.stats.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: s.color }}></div>
                  <div className="text-[8px] text-gray-500 font-black mb-2 uppercase tracking-widest">{s.label}</div>
                  <div className="text-xl font-black text-white">{s.val}%</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;