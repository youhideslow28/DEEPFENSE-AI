
import React from 'react';
import { PageType, Language } from '../types';
import { NEWS_DATA, FUN_FACTS, TRANSLATIONS } from '../data';
import { Activity, Play, AlertTriangle, Lightbulb, PhoneCall, Cpu, ArrowUpRight, ShieldCheck } from 'lucide-react';
import AnalyticsChart from '../components/AnalyticsChart';

interface HomeProps {
  setPage: (page: PageType) => void;
  setToolTab: (tab: 'SCAN' | 'KNOWLEDGE') => void;
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ setPage, setToolTab, lang }) => {
  const t = TRANSLATIONS[lang];
  const newsItems = NEWS_DATA[lang];
  const facts = FUN_FACTS[lang];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest mb-6 uppercase">
            {t.hero_badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 italic uppercase">
            {lang === 'vi' ? 'NỀN TẢNG ' : 'THE '}
            <span className="text-primary block md:inline">{lang === 'vi' ? 'PHÒNG CHỐNG DEEPFAKE' : 'DEEPFAKE DEFENSE'}</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed border-l-2 border-primary pl-4">{t.hero_desc}</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { setPage('TOOLS'); setToolTab('SCAN'); }} className="bg-primary text-black hover:bg-white px-8 py-3.5 rounded-lg font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-widest shadow-lg shadow-primary/20">
              <Activity size={16} /> {t.btn_scan}
            </button>
            <button onClick={() => setPage('AI_PROJECT')} className="bg-purple-600 text-white hover:bg-purple-500 px-8 py-3.5 rounded-lg font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-widest shadow-lg shadow-purple-500/20">
              <Cpu size={16} /> {t.btn_ai}
            </button>
            <button onClick={() => setPage('CHALLENGE')} className="bg-black border border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3.5 rounded-lg font-bold text-xs transition-all flex items-center gap-2 uppercase tracking-widest">
              <Play size={16} /> {t.btn_challenge}
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 h-[380px]"><AnalyticsChart lang={lang} /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        <div className="lg:col-span-8 bg-surface border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-2 rounded-lg"><AlertTriangle className="text-secondary" size={20} /></div>
                    <div>
                      <h2 className="text-white font-black text-sm tracking-widest uppercase italic leading-none">{t.warning_center}</h2>
                      <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter mt-1">LATEST_NETWORK_THREATS_REPORT</p>
                    </div>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2">
                {newsItems.map((news, index) => (
                    <div key={index} className="p-6 border-b border-r border-white/5 hover:bg-white/5 transition-all group cursor-pointer relative flex flex-col" onClick={() => window.open(news.url, '_blank')}>
                        <div className="flex items-center justify-between mb-3">
                            <span className="bg-secondary/10 text-secondary text-[8px] font-black px-2 py-0.5 rounded tracking-widest border border-secondary/20 uppercase">{news.tag}</span>
                            <span className="text-[9px] text-gray-500 font-mono italic">{news.date}</span>
                        </div>
                        <h3 className="text-md font-bold text-white group-hover:text-primary transition-colors mb-2 leading-tight">{news.title}</h3>
                        <p className="text-[11px] text-gray-400 line-clamp-2 italic leading-relaxed mb-4">{news.desc}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="text-[10px] text-secondary font-black uppercase tracking-tight">{lang === 'vi' ? 'THIỆT HẠI' : 'LOSS'}: {news.loss}</div>
                          <ArrowUpRight size={14} className="text-gray-700 group-hover:text-primary" />
                        </div>
                    </div>
                ))}
             </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="bg-secondary/5 border border-secondary/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                 <h4 className="text-secondary font-black text-[10px] mb-6 uppercase tracking-widest border-b border-secondary/10 pb-3 flex items-center gap-2">
                    <PhoneCall size={14} /> {t.hotline}
                 </h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-black/60 p-4 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{t.police}</span>
                        <span className="text-secondary font-black text-2xl tracking-tighter">113</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/60 p-4 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{t.cyber_security}</span>
                        <span className="text-secondary font-black text-md tracking-tighter">069.219.4053</span>
                    </div>
                 </div>
             </div>
             <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex-1 shadow-xl relative overflow-hidden">
                 <h4 className="text-primary font-black text-[10px] mb-6 uppercase tracking-widest border-b border-primary/10 pb-3 flex items-center gap-2">
                    <Lightbulb size={14} /> {t.knowledge}
                 </h4>
                 <div className="space-y-6">
                    {facts.map((f, i) => (
                        <div key={i} className="text-[11px] text-gray-400 flex gap-4">
                            <div className="bg-primary/20 h-5 w-5 rounded flex items-center justify-center shrink-0"><ShieldCheck size={10} className="text-primary" /></div>
                            <span><strong className="text-gray-200 uppercase block mb-1 tracking-tight">{f.title}</strong> {f.content}</span>
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
