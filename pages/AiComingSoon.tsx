
import React from 'react';
import { Cpu, Fingerprint, ScanEye, Shield, Smartphone, ArrowRight, Mic, UploadCloud, BrainCircuit } from 'lucide-react';
import { Language } from '../types';

interface AiComingSoonProps {
  lang: Language;
}

// Fixed missing helper component for SPECTROGRAM ANALYSIS section
const ActivityIcon = ({size, className}: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

const AiComingSoon: React.FC<AiComingSoonProps> = ({ lang }) => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 px-4 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
            <Cpu size={14} /> {lang === 'vi' ? 'DỰ ÁN ĐANG PHÁT TRIỂN' : 'PROJECT IN DEVELOPMENT'}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
          DEEPFENSE<span className="text-purple-500">.AI</span>
        </h1>
        <p className="text-xl text-white font-mono mb-6 bg-surface inline-block px-4 py-2 rounded border border-gray-800">
             {lang === 'vi' ? '"Khi AI tấn công, hãy dùng AI để phòng thủ."' : '"When AI attacks, use AI to defend."'}
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {lang === 'vi' 
            ? 'Hệ thống phòng thủ chủ động sử dụng trí tuệ nhân tạo để quét, phân tích và ngăn chặn các cuộc tấn công Deepfake theo thời gian thực.'
            : 'Active defense system using AI to scan, analyze, and prevent Deepfake attacks in real-time.'}
        </p>
      </div>

      {/* Logic Flowchart Diagram (Left to Right) */}
      <div className="mb-24 overflow-x-auto pb-8">
        <h3 className="text-center font-bold text-gray-500 mb-10 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
             <BrainCircuit /> {lang === 'vi' ? 'CƠ CHẾ HOẠT ĐỘNG TỔNG THỂ' : 'OVERALL OPERATION MECHANISM'}
        </h3>
        
        {/* Flex container for flow */}
        <div className="min-w-[900px] flex items-center justify-center gap-6 px-4">
            
            {/* STEP 1: INPUTS (NGUỒN DỮ LIỆU) */}
            <div className="flex flex-col gap-4">
                <div className="text-xs font-bold text-gray-500 text-center mb-2 tracking-widest uppercase">{lang === 'vi' ? 'NGUỒN DỮ LIỆU' : 'DATA SOURCES'}</div>
                
                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-56 hover:border-blue-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 group-hover:scale-110 transition-transform"><Smartphone size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">VIDEO CALL</span>
                        <span className="text-[10px] text-gray-500">Zalo/Messenger/Tele</span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-56 hover:border-green-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-green-500/20 p-3 rounded-lg text-green-400 group-hover:scale-110 transition-transform"><UploadCloud size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">VIDEO FILE</span>
                        <span className="text-[10px] text-gray-500">Upload MP4/MOV</span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-56 hover:border-yellow-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-yellow-500/20 p-3 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform"><Mic size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{lang === 'vi' ? 'ÂM THANH' : 'AUDIO'}</span>
                        <span className="text-[10px] text-gray-500">{lang === 'vi' ? 'Voice Chat/Ghi âm' : 'Voice Chat/Recording'}</span>
                    </div>
                </div>
            </div>

            {/* Connector 1 */}
            <div className="flex flex-col items-center justify-center h-full">
                 <div className="w-12 h-1 bg-gradient-to-r from-gray-700 to-purple-500 rounded-full"></div>
                 <div className="text-purple-500 animate-pulse -ml-2"><ArrowRight /></div>
            </div>

            {/* STEP 2: AI PROCESSING CORE */}
            <div className="relative flex flex-col items-center">
                <div className="text-xs font-bold text-purple-500 text-center mb-4 tracking-widest uppercase">DEEPFENSE CORE ENGINE</div>
                
                <div className="bg-black/80 backdrop-blur-xl p-1 rounded-2xl border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                    <div className="bg-gray-900 rounded-xl p-6 w-80 flex flex-col gap-4 relative overflow-hidden">
                        {/* Scan effect inside */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 shadow-[0_0_10px_#a855f7] animate-[scan_2s_ease-in-out_infinite]"></div>
                        
                        <div className="bg-black/60 p-3 rounded border border-purple-500/30 flex items-center gap-3">
                            <ScanEye className="text-purple-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'THỊ GIÁC MÁY TÍNH' : 'COMPUTER VISION'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'Phân tích điểm ảnh, ánh sáng' : 'Pixel and light analysis'}</div>
                            </div>
                        </div>

                        <div className="bg-black/60 p-3 rounded border border-blue-500/30 flex items-center gap-3">
                            <ActivityIcon className="text-blue-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'PHÂN TÍCH PHỔ ÂM' : 'SPECTROGRAM ANALYSIS'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'Đồng bộ khẩu hình & Giọng' : 'Lip-sync and voice sync'}</div>
                            </div>
                        </div>

                        <div className="bg-black/60 p-3 rounded border border-green-500/30 flex items-center gap-3">
                            <Fingerprint className="text-green-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'SINH TRẮC HỌC' : 'BIOMETRICS'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'Nhịp thở, mạch đập' : 'Breathing, pulse rate'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connector 2 */}
            <div className="flex flex-col items-center justify-center h-full">
                 <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-red-500 rounded-full"></div>
                 <div className="text-red-500 animate-pulse -ml-2"><ArrowRight /></div>
            </div>

            {/* STEP 3: OUTPUT (KẾT QUẢ) */}
            <div className="flex flex-col gap-4">
                <div className="text-xs font-bold text-gray-500 text-center mb-2 tracking-widest uppercase">{lang === 'vi' ? 'KẾT QUẢ & HÀNH ĐỘNG' : 'RESULTS & ACTIONS'}</div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-red-500/50 w-64 text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)] group">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                    
                    <div className="flex justify-center mb-4">
                        <div className="bg-red-500/10 p-4 rounded-full border border-red-500/50 group-hover:scale-110 transition-transform">
                             <Shield className="text-red-500" size={48} />
                        </div>
                    </div>
                    
                    <div className="text-4xl font-black text-white mb-1">99.9%</div>
                    <div className="text-xs font-bold text-red-400 tracking-wider mb-4">{lang === 'vi' ? 'PHÁT HIỆN GIẢ MẠO' : 'FAKE DETECTION'}</div>
                    
                    <div className="flex flex-col gap-2 text-[10px] text-left bg-black/60 p-3 rounded border border-gray-800">
                         <div className="flex items-center gap-2 text-gray-400 italic">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            {lang === 'vi' ? 'Cảnh báo người dùng' : 'Alert user'}
                         </div>
                         <div className="flex items-center gap-2 text-gray-400 italic">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            {lang === 'vi' ? 'Ngắt kết nối khẩn cấp' : 'Emergency disconnect'}
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiComingSoon;
