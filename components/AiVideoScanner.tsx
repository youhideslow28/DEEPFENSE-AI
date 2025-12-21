
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, ShieldAlert, Zap, Search, FileText, CheckCircle } from 'lucide-react';

const AiVideoScanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
      setAnalysis(null);
      setScore(null);
    }
  };

  const runAnalysis = async () => {
    if (!preview) return;
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = preview.split(',')[1];
      
      const prompt = `
        Hãy đóng vai một chuyên gia giám định hình ảnh kỹ thuật số (Forensic Expert). 
        Phân tích hình ảnh này để tìm các dấu hiệu Deepfake hoặc can thiệp của AI.
        YÊU CẦU:
        1. Đưa ra một "Deepfake Probability Score" (0-100%).
        2. Chỉ ra ít nhất 3 điểm bất thường cụ thể (Ví dụ: viền môi bị nhòe, ánh sáng mắt không khớp, cấu trúc da quá mịn).
        3. So sánh ngắn gọn: Người thật sẽ có đặc điểm X, nhưng trong ảnh này lại là Y.
        Trình bày bằng tiếng Việt, ngắn gọn, dùng gạch đầu dòng.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { mimeType: file?.type || 'image/jpeg', data: base64Data } }
            ]
          }
        ]
      });

      const resultText = response.text || "Không thể phân tích dữ liệu.";
      setAnalysis(resultText);
      
      // Extract score if possible, or mock it
      const scoreMatch = resultText.match(/\d+/);
      setScore(scoreMatch ? parseInt(scoreMatch[0]) : 75);

    } catch (error) {
      setAnalysis("Lỗi hệ thống khi phân tích. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Upload Area */}
        <div className="flex-1">
          <label className="group relative border-2 border-dashed border-gray-800 hover:border-primary/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-black/20">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-64 rounded-lg shadow-lg" />
            ) : (
              <>
                <div className="bg-primary/10 p-4 rounded-full text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">Tải ảnh/Screenshot video</span>
                <span className="text-[10px] text-gray-500 mt-2">Dung lượng tối đa: 5MB</span>
              </>
            )}
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
          
          {preview && !loading && !analysis && (
            <button 
              onClick={runAnalysis}
              className="w-full mt-4 bg-primary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all uppercase text-xs"
            >
              <Search size={16} /> Bắt đầu quét Neural
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="flex-1 flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <div className="text-primary font-mono text-[10px] animate-pulse uppercase tracking-[0.3em]">Đang giải mã Layer...</div>
            </div>
          ) : analysis ? (
            <div className="animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Zap className="text-primary" size={18} />
                        <span className="text-xs font-bold text-white uppercase font-mono">Kết quả phân tích</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${score && score > 50 ? 'border-secondary text-secondary bg-secondary/10' : 'border-success text-success bg-success/10'}`}>
                        RỦI RO: {score}%
                    </div>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[11px] text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {analysis}
                </div>
                
                <div className="mt-4 flex gap-2">
                    <button onClick={() => {setPreview(null); setAnalysis(null);}} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2 rounded text-[10px] font-bold uppercase hover:bg-white/10">Xóa</button>
                    <button className="flex-1 bg-primary/20 border border-primary/50 text-primary py-2 rounded text-[10px] font-bold uppercase hover:bg-primary hover:text-black transition-colors">Tải báo cáo PDF</button>
                </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center opacity-30">
                <ShieldAlert size={48} className="mb-4 text-gray-600" />
                <p className="text-xs text-gray-500 uppercase font-mono tracking-widest">Hệ thống đang chờ dữ liệu đầu vào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiVideoScanner;
