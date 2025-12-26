
import React from 'react';
import { PageType, Language } from '../types';
import { Shield, Home, Swords, Cpu, Info, Bot, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../data';

interface NavbarProps {
  currentPage: PageType;
  setPage: (page: PageType) => void;
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, lang, setLang }) => {
  const t = TRANSLATIONS[lang];
  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: lang === 'vi' ? 'TRANG CHỦ' : 'HOME', icon: <Home size={14} /> },
    { id: 'TOOLS', label: lang === 'vi' ? 'CÔNG CỤ' : 'TOOLS', icon: <Cpu size={14} /> },
    { id: 'CHALLENGE', label: lang === 'vi' ? 'THỬ THÁCH' : 'CHALLENGE', icon: <Swords size={14} /> },
    { id: 'AI_PROJECT', label: lang === 'vi' ? 'DỰ ÁN AI' : 'AI PROJECT', icon: <Bot size={14} /> },
    { id: 'ABOUT_CONTACT', label: lang === 'vi' ? 'VỀ CHÚNG TÔI' : 'ABOUT US', icon: <Info size={14} /> },
  ];

  return (
    <div className="sticky top-0 z-[100] w-full bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-24 py-4 md:py-0">
          <div className="flex items-center gap-4 mb-4 md:mb-0 cursor-pointer group" onClick={() => setPage('HOME')}>
            <Shield className="text-primary group-hover:scale-110 transition-transform duration-500" size={36} />
            <div className="flex flex-col">
              <h1 className="font-serif text-3xl font-black tracking-tighter text-white leading-none">DEEPFENSE</h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="h-[1px] w-4 bg-primary/40"></span>
                  <span className="font-mono text-[0.6rem] text-primary tracking-[0.4em] uppercase font-bold opacity-60">AI PROTECTION</span>
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setPage(item.id)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black font-mono transition-all duration-500 uppercase tracking-widest
                  ${currentPage === item.id ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-white'}`}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.label}</span>
                {currentPage === item.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary"></span>}
              </button>
            ))}
            
            <div className="ml-4 h-8 flex items-center bg-white/5 rounded-full p-1 border border-white/10">
               <button onClick={() => setLang('vi')} className={`px-2 py-1 text-[9px] font-bold rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-black' : 'text-gray-500'}`}>VI</button>
               <button onClick={() => setLang('en')} className={`px-2 py-1 text-[9px] font-bold rounded-full transition-all ${lang === 'en' ? 'bg-primary text-black' : 'text-gray-500'}`}>EN</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
