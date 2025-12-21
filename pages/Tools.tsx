import React, { useState } from 'react';
import { CHECKLIST_DATA } from '../data';
import { ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, Info, Gavel, Smartphone } from 'lucide-react';

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
  initialTab?: 'SCAN' | 'KNOWLEDGE';
}

const Tools: React.FC<ToolsProps> = ({ initialTab = 'SCAN' }) => {
  const [activeTab, setActiveTab] = useState<'SCAN' | 'KNOWLEDGE'>(initialTab);
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
    // Scroll to result
    setTimeout(() => {
        const el = document.getElementById('risk-result');
        el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center mb-10">
          <div className="bg-surface p-1 rounded-lg border border-border inline-flex">
            <button 
                onClick={() => setActiveTab('SCAN')}
                className={`px-8 py-3 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'SCAN' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
            >
                ⚡ QUICK SCAN
            </button>
            <button 
                onClick={() => setActiveTab('KNOWLEDGE')}
                className={`px-8 py-3 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'KNOWLEDGE' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white'}`}
            >
                📚 KIẾN THỨC
            </button>
          </div>
      </div>

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

                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl">
                        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3 border-b border-gray-700 pb-4">
                            <ShieldCheck className="text-primary"/> QUY TRÌNH XỬ LÝ KHẨN CẤP
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold shrink-0">1</span>
                                <div>
                                    <strong className="text-white block mb-1">Ngắt cuộc gọi ngay</strong>
                                    <p className="text-sm text-gray-400">Không nghe giải thích, không chần chừ.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold shrink-0">2</span>
                                <div>
                                    <strong className="text-white block mb-1">Xác minh chéo</strong>
                                    <p className="text-sm text-gray-400">Gọi lại bằng số điện thoại di động (GSM) thông thường.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold shrink-0">3</span>
                                <div>
                                    <strong className="text-white block mb-1">Kiểm tra "Liveness"</strong>
                                    <p className="text-sm text-gray-400">Yêu cầu người gọi quay mặt sang trái/phải hoặc đưa tay lên che mặt.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold shrink-0">4</span>
                                <div>
                                    <strong className="text-white block mb-1">Báo cáo cơ quan</strong>
                                    <p className="text-sm text-gray-400">Liên hệ 113 hoặc ngân hàng nếu đã lỡ chuyển tiền.</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
            
            {/* Sắp xếp: Hành động > Bản chất > Lý do > Phòng ngừa > Pháp lý */}

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

            <KnowledgeItem title="⚙️ DEEPFENSE HOẠT ĐỘNG NHƯ NÀO? (DỄ HIỂU)">
                 <div className="mb-4 text-gray-300">
                    Deepfake sử dụng 2 hệ thống AI đấu đá lẫn nhau (gọi là GANs), hãy tưởng tượng như sau:
                 </div>
                 <div className="flex flex-col md:flex-row gap-4 mb-6 items-stretch justify-center">
                    <div className="bg-black/40 p-5 rounded flex-1 border border-secondary/30 text-center">
                        <div className="text-4xl mb-2">🎨</div>
                        <div className="text-secondary font-bold mb-2">AI TẠO GIẢ (Họa sĩ lừa đảo)</div>
                        <p className="text-xs text-gray-400">Cố gắng vẽ khuôn mặt giả sao cho giống thật nhất có thể để đánh lừa.</p>
                    </div>
                    
                    <div className="flex items-center justify-center text-gray-500 font-bold">VS</div>

                    <div className="bg-black/40 p-5 rounded flex-1 border border-success/30 text-center">
                        <div className="text-4xl mb-2">👮</div>
                        <div className="text-success font-bold mb-2">AI SOI LỖI (Cảnh sát giám định)</div>
                        <p className="text-xs text-gray-400">Cố gắng phát hiện ra đâu là ảnh giả. Nếu phát hiện được, bắt AI kia vẽ lại.</p>
                    </div>
                 </div>
                 <div className="bg-primary/5 p-4 rounded text-sm text-gray-300 text-center border border-primary/20">
                    <strong className="text-primary">KẾT QUẢ:</strong> Sau hàng triệu lần "đấu đá", AI Tạo Giả sẽ vẽ giỏi đến mức AI Soi Lỗi không nhận ra được nữa. Đó là lúc Deepfake hoàn thiện.
                 </div>
            </KnowledgeItem>

            <KnowledgeItem title="🧠 TẠI SAO MẮT NGƯỜI DỄ BỊ LỪA?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/40 p-5 rounded border-l-4 border-primary">
                        <div className="text-primary font-bold mb-3 flex items-center gap-2"><Info size={16}/> NGUYÊN NHÂN TÂM LÝ</div>
                        <ul className="text-sm text-gray-300 space-y-3 list-disc list-inside">
                            <li>Não bộ con người ưu tiên tin vào <strong className="text-white">thị giác</strong> hơn các giác quan khác.</li>
                            <li>Kẻ lừa đảo thường tạo <strong className="text-white">tình huống khẩn cấp</strong> (tai nạn, cấp cứu) khiến nạn nhân hoảng loạn, bỏ qua tư duy phản biện.</li>
                            <li>Sự tin tưởng vào người thân/cấp trên làm giảm sự đề phòng.</li>
                        </ul>
                    </div>
                    <div className="bg-black/40 p-5 rounded border-l-4 border-success">
                        <div className="text-success font-bold mb-3 flex items-center gap-2"><ShieldCheck size={16}/> GIẢI PHÁP TÂM LÝ</div>
                        <ul className="text-sm text-gray-300 space-y-3 list-disc list-inside">
                            <li>Luôn tuân thủ nguyên tắc: <strong className="text-white">"Chậm lại 1 nhịp"</strong>.</li>
                            <li>Tự đặt câu hỏi: "Tại sao họ lại hối thúc mình chuyển tiền?".</li>
                            <li>Thiết lập "Mật khẩu gia đình" (Code word) để xác thực người thân.</li>
                        </ul>
                    </div>
                </div>
            </KnowledgeItem>

            <KnowledgeItem title="📱 VỆ SINH SỐ (DIGITAL HYGIENE)">
                <div className="flex gap-4 items-start">
                    <div className="bg-surface p-3 rounded-full border border-gray-700 shrink-0">
                        <Smartphone className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <p className="text-gray-300 text-sm mb-3">
                            Để tránh bị lấy hình ảnh làm nguyên liệu huấn luyện Deepfake, bạn nên:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-black/30 p-2 rounded text-gray-400">🔒 Hạn chế đăng ảnh rõ mặt ở chế độ Công khai (Public).</div>
                            <div className="bg-black/30 p-2 rounded text-gray-400">🚫 Không chia sẻ dữ liệu sinh trắc học bừa bãi.</div>
                            <div className="bg-black/30 p-2 rounded text-gray-400">👀 Cẩn trọng với các ứng dụng "Xem khuôn mặt già đi" hoặc "Ghép mặt vào phim".</div>
                            <div className="bg-black/30 p-2 rounded text-gray-400">🔐 Bật xác thực 2 bước (2FA) cho mọi tài khoản MXH.</div>
                        </div>
                    </div>
                </div>
            </KnowledgeItem>

            <KnowledgeItem title="⚖️ PHÁP LÝ & XỬ PHẠT TẠI VIỆT NAM">
                <div className="flex gap-4 items-start">
                    <div className="bg-surface p-3 rounded-full border border-gray-700 shrink-0">
                        <Gavel className="text-warning" size={24} />
                    </div>
                    <div>
                        <p className="text-gray-300 text-sm mb-3">
                            Theo pháp luật Việt Nam, hành vi sử dụng Deepfake để lừa đảo chiếm đoạt tài sản có thể bị truy cứu trách nhiệm hình sự:
                        </p>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex gap-2"><span className="text-warning">•</span> <strong>Tội lừa đảo chiếm đoạt tài sản (Điều 174 BLHS):</strong> Phạt tù lên đến 20 năm hoặc tù chung thân.</li>
                            <li className="flex gap-2"><span className="text-warning">•</span> <strong>Tội sử dụng mạng máy tính thực hiện hành vi chiếm đoạt tài sản (Điều 290 BLHS):</strong> Phạt tù lên đến 20 năm.</li>
                        </ul>
                    </div>
                </div>
            </KnowledgeItem>
        </div>
      )}
    </div>
  );
};

export default Tools;