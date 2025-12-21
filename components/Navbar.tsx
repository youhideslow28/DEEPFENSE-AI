
import React from 'react';
import { PageType } from '../types';
import { Shield, Home, Swords, Cpu, Phone, Bot } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  setPage: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: 'TRANG CHỦ', icon: <Home size={14} /> },
    { id: 'TOOLS', label: 'CÔNG CỤ', icon: <Cpu size={14} /> },
    { id: 'CHALLENGE', label: 'THỬ THÁCH', icon: <Swords size={14} /> },
    { id: 'AI_PROJECT', label: 'DỰ ÁN AI', icon: <Bot size={14} /> },
    { id: 'CONTACT', label: 'LIÊN HỆ', icon: <Phone size={14} /> },
  ];

  return (
    <div className="sticky top-0 z-[100] w-full bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-24 py-4 md:py-0">
          {/* Logo */}
          <div 
            className="flex items-center gap-4 mb-4 md:mb-0 cursor-pointer group" 
            onClick={() => setPage('HOME')}
          >
            <div className="relative">
                <Shield className="text-primary group-hover:scale-110 transition-transform duration-500" size={36} strokeWidth={1.5} />
                <div className="absolute inset-0 bg-primary blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif text-3xl font-black tracking-tighter text-white leading-none">
                DEEPFENSE
              </h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="h-[1px] w-4 bg-primary/40"></span>
                  <span className="font-mono text-[0.6rem] text-primary tracking-[0.4em] uppercase font-bold opacity-60">
                    Neural Defense
                  </span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black font-mono transition-all duration-500 uppercase tracking-widest
                  ${currentPage === item.id 
                    ? 'text-primary bg-primary/5 shadow-[0_0_20px_rgba(0,240,255,0.05)]' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'}
                `}
              >
                {item.icon}
                {item.label}
                {currentPage === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary shadow-[0_0_10px_#00F0FF]"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
