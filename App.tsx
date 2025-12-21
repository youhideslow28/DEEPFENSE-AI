
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenge from './pages/Challenge';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import AiComingSoon from './pages/AiComingSoon';
import MatrixBackground from './components/MatrixBackground';
import AiChat from './components/AiChat';
import { PageType } from './types';

const App: React.FC = () => {
  const [page, setPage] = useState<PageType>('HOME');
  const [toolTab, setToolTab] = useState<'SCAN' | 'KNOWLEDGE'>('SCAN');

  const renderPage = () => {
    switch (page) {
      case 'HOME': return <Home setPage={setPage} setToolTab={setToolTab} />;
      case 'TOOLS': return <Tools initialTab={toolTab} />;
      case 'CHALLENGE': return <Challenge />;
      case 'AI_PROJECT': return <AiComingSoon />;
      case 'CONTACT': return <Contact />;
      default: return <Home setPage={setPage} setToolTab={setToolTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative">
      {/* Background Matrix Effect */}
      <MatrixBackground />
      
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl z-10">
        {renderPage()}
      </main>

      {/* AI Assistant Chatbot */}
      <AiChat />

      <footer className="border-t border-border py-12 mt-12 bg-surface/50 text-center z-10 backdrop-blur-sm">
        <div className="font-serif font-black tracking-widest text-2xl text-white/20 mb-2">DEEPFENSE</div>
        <div className="text-[0.6rem] text-gray-500 uppercase tracking-wider mb-4">
            DEEPFENSE FINAL VER | ĐỒ ÁN MÔN NHẬP MÔN NGÀNH VÀ KĨ NĂNG MỀM 2025<br/>
            GVHD: TS. TRẦN THU THỦY | SV: HỒ XUÂN NGUYỄN
        </div>
        <div className="text-[0.6rem] text-gray-600">
            © 2025 DEEPFENSE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
