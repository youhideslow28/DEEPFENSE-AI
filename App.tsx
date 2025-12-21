
import React, { useState, useEffect } from 'react';
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
  const [hasError, setHasError] = useState(false);

  // Error Boundary đơn giản
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("App Crash:", error);
      // setHasError(true); // Tạm thời comment để không chặn render nếu chỉ là lỗi nhỏ
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const renderPage = () => {
    try {
      switch (page) {
        case 'HOME': return <Home setPage={setPage} setToolTab={setToolTab} />;
        case 'TOOLS': return <Tools initialTab={toolTab} />;
        case 'CHALLENGE': return <Challenge />;
        case 'AI_PROJECT': return <AiComingSoon />;
        case 'CONTACT': return <Contact />;
        default: return <Home setPage={setPage} setToolTab={setToolTab} />;
      }
    } catch (e) {
      return (
        <div className="p-20 text-center text-secondary font-mono">
          <h2 className="text-2xl font-bold mb-4">CRITICAL RENDER ERROR</h2>
          <button onClick={() => window.location.reload()} className="bg-white text-black px-4 py-2 rounded">REBOOT SYSTEM</button>
        </div>
      );
    }
  };

  if (hasError) {
    return <div className="bg-black text-red-500 p-10 font-mono">SYSTEM_CRITICAL_FAILURE: Please check console for logs.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative bg-[#050505]">
      {/* Background Matrix Effect */}
      <MatrixBackground />
      
      {/* Navbar - Z-index cao để luôn nổi */}
      <Navbar currentPage={page} setPage={setPage} />
      
      {/* Main Content - Z-index 10 để nằm trên Matrix */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl relative z-10">
        {renderPage()}
      </main>

      {/* AI Assistant Chatbot */}
      <AiChat />

      <footer className="border-t border-white/5 py-12 mt-12 bg-black/80 text-center relative z-10 backdrop-blur-md">
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
