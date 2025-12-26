
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Target, Users, Shield, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

const AboutContact: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', scamPhone: '', desc: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.phone || !formData.desc) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* About Us Section */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold mb-6 tracking-widest uppercase italic border border-primary/20">
              <Users size={12}/> {t.about_us}
            </div>
            <h2 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">
              {t.mission} & <span className="text-primary">{t.vision}</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed italic border-l-4 border-primary pl-6 mb-8">
              {lang === 'vi' 
                ? "DeepFense ra đời với mục tiêu trở thành tấm khiên số vững chắc nhất cho cộng đồng trước làn sóng tin giả và lừa đảo Deepfake đang ngày càng tinh vi."
                : "DeepFense was born with the goal of becoming the strongest digital shield for the community against the increasingly sophisticated wave of fake news and Deepfake scams."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-white/5 p-8 rounded-3xl group hover:border-primary/30 transition-all">
                <Target className="text-primary mb-6" size={32} />
                <h4 className="text-white font-bold mb-4 uppercase italic">{t.mission}</h4>
                <p className="text-gray-500 text-sm italic leading-relaxed">
                   {lang === 'vi' 
                    ? "Phổ cập kiến thức nhận biết Deepfake cho 1 triệu người dùng Việt Nam vào năm 2026 thông qua giáo dục tương tác."
                    : "Universalizing Deepfake recognition knowledge to 1 million Vietnamese users by 2026 through interactive education."}
                </p>
            </div>
            <div className="bg-surface border border-white/5 p-8 rounded-3xl group hover:border-primary/30 transition-all">
                <Shield className="text-primary mb-6" size={32} />
                <h4 className="text-white font-bold mb-4 uppercase italic">{t.vision}</h4>
                <p className="text-gray-500 text-sm italic leading-relaxed">
                   {lang === 'vi' 
                    ? "Tích hợp AI Agent trực tiếp vào các nền tảng mạng xã hội để cảnh báo rủi ro theo thời gian thực."
                    : "Integrating AI Agents directly into social media platforms to warn of risks in real-time."}
                </p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-10 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Users size={150}/></div>
              <h4 className="text-primary font-black text-[10px] mb-8 uppercase tracking-[0.3em]">{t.team}</h4>
              <div className="space-y-4 text-white">
                  <div className="flex items-center gap-4">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="font-mono text-lg font-bold">LỚP 25NS - KHOA KTMT & ĐT</span>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="font-mono text-lg font-bold tracking-tight">VKU UNIVERSITY - PROJECT 2025</span>
                  </div>
              </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {submitted && (
                    <div className="absolute inset-0 bg-surface/95 backdrop-blur flex flex-col items-center justify-center z-10 animate-in fade-in">
                        <div className="text-5xl mb-4">🎉</div>
                        <h3 className="text-success font-bold text-xl">{t.success_msg}</h3>
                    </div>
                )}
                <h3 className="text-white text-2xl font-black mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                    <Send className="text-primary" size={24}/> {t.report_form}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{lang === 'vi' ? 'Họ và tên' : 'Full Name'} *</label>
                        <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{lang === 'vi' ? 'Số điện thoại' : 'Phone Number'} *</label>
                        <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{lang === 'vi' ? 'Mô tả chi tiết' : 'Description'} *</label>
                        <textarea className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all h-32 resize-none" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all uppercase text-xs tracking-[0.2em] shadow-lg shadow-primary/20">
                        {t.send_report} <ArrowRight size={16}/>
                    </button>
                </form>
            </div>

            <div className="bg-secondary/5 border border-secondary/20 rounded-3xl p-8 space-y-6">
                <h4 className="text-secondary font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                   <Phone size={14} /> {t.hotline}
                </h4>
                <div className="space-y-4 text-sm font-mono">
                    <div className="flex justify-between items-center text-gray-400">
                        <span>{t.police}</span>
                        <span className="text-secondary font-bold">113</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                        <span>{t.cyber_security}</span>
                        <span className="text-secondary font-bold">069.219.4053</span>
                    </div>
                    <div className="pt-4 border-t border-secondary/10 flex items-center gap-3 text-gray-400">
                        <Mail size={16} /> support@deepfense.vn
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <MapPin size={16} /> VKU UNIVERSITY, DANANG
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContact;
