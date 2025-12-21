
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
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative bg-[#050505]">
      {/* Background Matrix Effect */}
      <MatrixBackground />
      
      <Navbar 
        currentPage={page} 
        setPage={setPage} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl z-10">
        {renderPage()}
      </main>

      {/* AI Assistant Chatbot */}
      <AiChat />

      <footer className="border-t border-white/5 py-12 mt-12 bg-black/80 text-center z-10 backdrop-blur-md relative overflow-hidden">
        <div className="font-serif font-black tracking-widest text-2xl text-white/10 mb-2 italic">DEEPFENSE</div>
        <div className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-4 font-mono leading-loose">
            DEEPFENSE FINAL VER | PROJECT 2025<br/>
            NEURAL DEFENSE PROTOCOL ACTIVE
        </div>
        <div className="text-[9px] text-gray-700 font-mono">
            © 2025 DEEPFENSE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default App;
