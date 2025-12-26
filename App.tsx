
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenge from './pages/Challenge';
import Tools from './pages/Tools';
import AboutContact from './pages/AboutContact';
import AiComingSoon from './pages/AiComingSoon';
import MatrixBackground from './components/MatrixBackground';
import AiChat from './components/AiChat';
import { PageType, Language } from './types';
import { TRANSLATIONS } from './data';

const App: React.FC = () => {
  const [page, setPage] = useState<PageType>('HOME');
  const [lang, setLang] = useState<Language>('vi');
  const [toolTab, setToolTab] = useState<'SCAN' | 'KNOWLEDGE'>('SCAN');
  const t = TRANSLATIONS[lang];

  const renderPage = () => {
    switch (page) {
      case 'HOME': return <Home setPage={setPage} setToolTab={setToolTab} lang={lang} />;
      case 'TOOLS': return <Tools initialTab={toolTab} lang={lang} />;
      case 'CHALLENGE': return <Challenge lang={lang} />;
      case 'AI_PROJECT': return <AiComingSoon lang={lang} />;
      case 'ABOUT_CONTACT': return <AboutContact lang={lang} />;
      default: return <Home setPage={setPage} setToolTab={setToolTab} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative bg-[#050505]">
      <MatrixBackground />
      <Navbar currentPage={page} setPage={setPage} lang={lang} setLang={setLang} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl z-10">{renderPage()}</main>
      <AiChat lang={lang} />
      <footer className="border-t border-white/5 py-12 mt-12 bg-black/80 text-center z-10 backdrop-blur-md relative overflow-hidden">
        <div className="font-serif font-black tracking-widest text-2xl text-white/10 mb-2 italic">DEEPFENSE</div>
        <div className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-4 font-mono leading-loose">
            DEEPFENSE FINAL VER | PROJECT 2025<br/>
            NEURAL DEFENSE PROTOCOL ACTIVE
        </div>
        <div className="text-[9px] text-gray-700 font-mono">© 2025 DEEPFENSE. {t.footer_rights}</div>
      </footer>
    </div>
  );
};

export default App;
