
import React from 'react';
import { PageType } from '../types';
import { NEWS_DATA, FUN_FACTS } from '../data';
import { Activity, ShieldCheck, Play, AlertTriangle, Lightbulb, PhoneCall, ArrowUpRight, Cpu } from 'lucide-react';
import AnalyticsChart from '../components/AnalyticsChart';

interface HomeProps {
  setPage: (page: PageType) => void;
  setToolTab: (tab: 'SCAN' | 'KNOWLEDGE') => void;
}

const Home: React.FC<HomeProps> = ({ setPage, setToolTab }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section - Compact Version */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest mb-6 uppercase">
            Protocol Active
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 italic uppercase">
            NỀN TẢNG <span className="text-primary block md:inline">DEEPFENSE.AI</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed border-l-2 border-primary pl-4">
            Giải pháp bảo vệ người dùng trước hiểm họa Deepfake. Quét rủi ro và học tập để phản kháng tội phạm AI.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => { setPage('TOOLS'); setToolTab('SCAN'); }}
              className="bg-primary text-black hover:bg-white px-6 py-3 rounded-lg font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <Activity size={16} /> QUÉT RỦI RO
            </button>
            
            <button 
               onClick={() => setPage('AI_PROJECT')}
               className="bg-purple-600 text-white hover:bg-purple-500 px-6 py-3 rounded-lg font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <Cpu size={16} /> AI ENGINE
            </button>

            <button 
               onClick={() => setPage('CHALLENGE')}
               className="bg-black border border-secondary text-secondary hover:bg-secondary hover:text-white px-6 py-3 rounded-lg font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <Play size={16} /> THỬ THÁCH
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 h-[350px]">
           <AnalyticsChart />
        </div>
      </div>

      {/* Warning Center - 6 Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        <div className="lg:col-span-8 bg-surface border border-gray-800 rounded-2xl overflow-hidden flex flex-col">
             <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="text-secondary" size={18} />
                    <span className="text-white font-bold text-xs tracking-widest uppercase italic">TRUNG TÂM CẢNH BÁO</span>
                </div>
                <div className="text-[9px] text-gray-500 font-mono">LIVE FEED</div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2">
                {NEWS_DATA.map((news, index) => (
                    <div 
                        key={index}
                        className="p-5 border-b border-r border-gray-800/50 hover:bg-white/5 transition-all group cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">{news.tag}</span>
                            <span className="text-[9px] text-gray-500 font-mono italic">{news.date}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors mb-2 line-clamp-1">
                            {news.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 line-clamp-2 italic leading-relaxed">
                            {news.desc}
                        </p>
                    </div>
                ))}
             </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
                 <h4 className="text-secondary font-bold text-[10px] mb-4 uppercase tracking-widest border-b border-secondary/10 pb-3 flex items-center gap-2">
                    <PhoneCall size={14} /> HOTLINE PHẢN ỨNG
                 </h4>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-gray-400 font-bold">CẢNH SÁT</span>
                        <span className="text-secondary font-bold text-xl">113</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
                        <span className="text-[10px] text-gray-400 font-bold">AN NINH MẠNG</span>
                        <span className="text-secondary font-bold text-sm">069.219.4053</span>
                    </div>
                 </div>
             </div>

             <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex-1">
                 <h4 className="text-primary font-bold text-[10px] mb-4 uppercase tracking-widest border-b border-primary/10 pb-3 flex items-center gap-2">
                    <Lightbulb size={14} /> FUN FACTS
                 </h4>
                 <div className="space-y-3">
                    {FUN_FACTS.map((f, i) => (
                        <div key={i} className="text-[11px] text-gray-400 flex gap-2">
                            <span className="text-primary">•</span>
                            <span><strong className="text-gray-300">{f.title}:</strong> {f.content}</span>
                        </div>
                    ))}
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
