
import React, { useState } from 'react';
import { CHECKLIST_DATA } from '../data';
import { ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, Info, Gavel, Smartphone, ScanSearch } from 'lucide-react';
import AiVideoScanner from '../components/AiVideoScanner';

const KnowledgeItem = ({ title, children }: { title: string, children?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-surface border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors text-left"
            >
                <span className="font-bold text-white text-lg">{title}</span>
                {isOpen ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>
            {isOpen && (
                <div className="p-5 border-t border-border bg-black/20 animate-in slide-in-from-top-2 duration-200">
                    {children}
                </div>
            )}
        </div>
    )
}

interface ToolsProps {
  initialTab?: 'SCAN' | 'KNOWLEDGE' | 'NEURAL';
}

const Tools: React.FC<ToolsProps> = ({ initialTab = 'NEURAL' }) => {
  const [activeTab, setActiveTab] = useState<'SCAN' | 'KNOWLEDGE' | 'NEURAL'>(initialTab);
  const [checks, setChecks] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<number | null>(null);

  const toggleCheck = (item: string) => {
    const newChecks = new Set(checks);
    if (newChecks.has(item)) newChecks.delete(item);
    else newChecks.add(item);
    setChecks(newChecks);
  };

  const analyzeRisk = () => {
    setResult(checks.size);
    setTimeout(() => {
        const el = document.getElementById('risk-result');
        el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center mb-10">
          <div className="bg-surface p-1 rounded-lg border border-border inline-flex flex-wrap justify-center">
            <button 
                onClick={() => setActiveTab('NEURAL')}
                className={`px-6 py-3 rounded-md font-bold text-[10px] transition-all flex items-center gap-2 tracking-widest uppercase ${activeTab === 'NEURAL' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
            >
                <ScanSearch size={14} /> NEURAL SCAN
            </button>
            <button 
                onClick={() => setActiveTab('SCAN')}
                className={`px-6 py-3 rounded-md font-bold text-[10px] transition-all flex items-center gap-2 tracking-widest uppercase ${activeTab === 'SCAN' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
            >
                ⚡ QUICK CHECK
            </button>
            <button 
                onClick={() => setActiveTab('KNOWLEDGE')}
                className={`px-6 py-3 rounded-md font-bold text-[10px] transition-all flex items-center gap-2 tracking-widest uppercase ${activeTab === 'KNOWLEDGE' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
            >
                📚 KIẾN THỨC
            </button>
          </div>
      </div>

      {activeTab === 'NEURAL' && (
        <div className="space-y-8">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-serif font-bold mb-3 text-white uppercase italic">NEURAL VISION AGENT</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Công nghệ AI thực thụ để phân tích pixel và các điểm ảnh lỗi trong Deepfake.</p>
            </div>
            <AiVideoScanner />
        </div>
      )}

      {activeTab === 'SCAN' && (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-serif font-bold mb-3 text-white">CÔNG CỤ RÀ SOÁT RỦI RO</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Sử dụng danh sách kiểm tra này khi bạn nhận được cuộc gọi video đáng ngờ. Đánh dấu vào các biểu hiện bạn quan sát được.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {CHECKLIST_DATA.map((cat) => (
                    <div key={cat.category} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-gray-600 transition-colors">
                        <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center gap-2">
                            <span className="font-bold text-white">{cat.category}</span>
                        </div>
                        <div className="p-4 space-y-4">
                            {cat.items.map((item) => (
                                <label key={item} className="flex items-start gap-3 cursor-pointer group p-2 rounded hover:bg-white/5 transition-colors">
                                    <div className={`shrink-0 w-6 h-6 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-300 ${checks.has(item) ? 'bg-primary border-primary scale-110' : 'border-gray-600 group-hover:border-primary'}`}>
                                        {checks.has(item) && <div className="w-2.5 h-2.5 bg-black rounded-sm" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={checks.has(item)} onChange={() => toggleCheck(item)} />
                                    <span className={`text-sm transition-colors ${checks.has(item) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mb-12">
                <button 
                    onClick={analyzeRisk}
                    className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-black px-10 py-4 rounded font-mono font-bold text-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:scale-105 active:scale-95"
                >
                    🔬 PHÂN TÍCH KẾT QUẢ
                </button>
            </div>

            {result !== null && (
                <div id="risk-result" className="animate-in slide-in-from-bottom-8 duration-700 scroll-mt-24">
                    {result === 0 ? (
                        <div className="bg-success/10 border-2 border-success rounded-xl p-8 text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={100} /></div>
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="text-success font-bold text-2xl mb-2">AN TOÀN</h3>
                            <p className="text-gray-300">Không phát hiện dấu hiệu Deepfake. Tuy nhiên, luôn giữ cảnh giác!</p>
                        </div>
                    ) : result <= 3 ? (
                        <div className="bg-warning/10 border-2 border-warning rounded-xl p-8 text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={100} /></div>
                            <div className="text-5xl mb-4">⚠️</div>
                            <h3 className="text-warning font-bold text-2xl mb-2">CẢNH BÁO ({result} dấu hiệu)</h3>
                            <p className="text-gray-300">Phát hiện điểm bất thường. Hãy yêu cầu gọi lại bằng SĐT di động thông thường.</p>
                        </div>
                    ) : (
                        <div className="bg-secondary/10 border-2 border-secondary rounded-xl p-8 text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={100} /></div>
                            <div className="text-5xl mb-4 animate-bounce">🚨</div>
                            <h3 className="text-secondary font-bold text-3xl mb-2">NGUY HIỂM CAO ({result} dấu hiệu)</h3>
                            <p className="text-white font-bold text-lg">99% ĐÂY LÀ LỪA ĐẢO. NGẮT KẾT NỐI NGAY LẬP TỨC!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
      )}

      {activeTab === 'KNOWLEDGE' && (
        <div className="space-y-4">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2">KIẾN THỨC CỐT LÕI</h2>
                <p className="text-gray-500">Hiểu rõ kẻ thù để phòng vệ hiệu quả hơn</p>
            </div>
            
            <KnowledgeItem title="✅ QUY TRÌNH XÁC THỰC 4 BƯỚC (QUAN TRỌNG NHẤT)">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { step: 1, title: "NGẮT MÁY", sub: "Không cần giải thích", color: "#FF2A6D" },
                        { step: 2, title: "GỌI LẠI", sub: "SĐT đã lưu sẵn", color: "#FFD700" },
                        { step: 3, title: "XÁC THỰC", sub: "Quay mặt, đưa tay", color: "#00F0FF" },
                        { step: 4, title: "BÁO CÁO", sub: "Hotline 113", color: "#05FF00" },
                    ].map((s) => (
                        <div key={s.step} className="bg-black/40 p-4 rounded text-center border-t-4" style={{ borderColor: s.color }}>
                            <div className="text-3xl font-black" style={{ color: s.color }}>{s.step}</div>
                            <div className="text-xs font-bold text-white mt-1">{s.title}</div>
                            <div className="text-[0.6rem] text-gray-500">{s.sub}</div>
                        </div>
                    ))}
                </div>
            </KnowledgeItem>
        </div>
      )}
    </div>
  );
};

export default Tools;
