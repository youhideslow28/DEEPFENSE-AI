
import { EnhancedLevelData, ChecklistItem, NewsItem, FunFact, PersonalityQuestion, Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  vi: {
    hero_badge: "HỆ THỐNG GIÁM SÁT AN NINH AI",
    hero_title: "NỀN TẢNG PHÒNG CHỐNG DEEPFAKE",
    hero_desc: "Dự án giáo dục cộng đồng về Deepfake. Hãy trang bị kiến thức để bảo vệ bản thân và gia đình trước các cuộc tấn công AI tinh vi.",
    btn_scan: "QUÉT RỦI RO",
    btn_challenge: "THỬ THÁCH",
    btn_ai: "AI ENGINE",
    warning_center: "TRUNG TÂM CẢNH BÁO",
    hotline: "HOTLINE PHẢN ỨNG NHANH",
    knowledge: "KIẾN THỨC CỐT LỐI",
    about_us: "VỀ CHÚNG TÔI & LIÊN HỆ",
    mission: "SỨ MỆNH",
    vision: "TẦM NHÌN",
    team: "ĐỘI NGŨ",
    report_form: "BÁO CÁO SỰ CỐ",
    send_report: "GỬI BÁO CÁO",
    success_msg: "GỬI THÀNH CÔNG!",
    contact_support: "KÊNH HỖ TRỢ",
    police: "CẢNH SÁT 113",
    cyber_security: "AN NINH MẠNG",
    footer_rights: "BẢO LƯU MỌI QUYỀN.",
    agent_welcome: "Xin chào! Tôi là DEEPFENSE AGENT. Tôi có thể giúp gì cho bạn?",
    agent_placeholder: "Yêu cầu phân tích...",
    result_pass: "AN TOÀN",
    result_fail: "NGUY HIỂM"
  },
  en: {
    hero_badge: "AI SECURITY MONITORING SYSTEM",
    hero_title: "DEEPFAKE DEFENSE PLATFORM",
    hero_desc: "Community education project on Deepfakes. Empower yourself with knowledge to protect your family against sophisticated AI attacks.",
    btn_scan: "RISK SCAN",
    btn_challenge: "CHALLENGE",
    btn_ai: "AI ENGINE",
    warning_center: "WARNING CENTER",
    hotline: "EMERGENCY HOTLINE",
    knowledge: "CORE KNOWLEDGE",
    about_us: "ABOUT US & CONTACT",
    mission: "MISSION",
    vision: "VISION",
    team: "TEAM",
    report_form: "REPORT AN INCIDENT",
    send_report: "SEND REPORT",
    success_msg: "SENT SUCCESSFULLY!",
    contact_support: "SUPPORT CHANNELS",
    police: "POLICE 113",
    cyber_security: "CYBER SECURITY",
    footer_rights: "ALL RIGHTS RESERVED.",
    agent_welcome: "Hello! I am DEEPFENSE AGENT. How can I assist you today?",
    agent_placeholder: "Enter analysis request...",
    result_pass: "SECURE",
    result_fail: "DANGER"
  }
};

export const LEVELS: Record<Language, EnhancedLevelData[]> = {
  vi: [
    { id: "v1", title: "GIA ĐÌNH LEGO", difficulty: "Dễ", desc: "Soi kỹ bàn tay nhân vật.", hint: "AI thường làm dính các ngón tay.", fake_pos: 2, advice: "Lỗi dính ngón tay và mặt biến dạng khi quay. AI chưa giỏi vẽ cấu trúc xương tay phức tạp.", video_url: "https://youtu.be/UOaKSgHVARM", technical_flaws: [] },
    { id: "v2", title: "BÀN TAY DƯỚI TÁN CÂY", difficulty: "Dễ", desc: "Quan sát bề mặt da tay.", hint: "AI thường làm da quá mịn hoặc thiếu độ trong mờ.", fake_pos: 2, advice: "Da tay mịn như sáp và thiếu độ trong mờ tự nhiên. Người thật có vân da và mạch máu mờ.", video_url: "https://youtu.be/OO8p3jN7TBQ", technical_flaws: [] },
    { id: "v3", title: "HƯƠU CAO CỔ", difficulty: "Trung bình", desc: "Để ý chân hươu khi di chuyển.", hint: "Kiểm tra sự tiếp xúc giữa chân và mặt đất.", fake_pos: 1, advice: "Chân bị trượt trên cỏ và tách nền lộ liễu. AI gặp khó khăn trong việc gắn kết vật thể vào nền.", video_url: "https://youtu.be/hglX1Q93en8", technical_flaws: [] },
    { id: "v4", title: "CHUỒN CHUỒN", difficulty: "Trung bình", desc: "Quan sát kỹ đôi cánh.", hint: "Các chi tiết cực nhỏ như gân cánh thường bị AI làm mờ.", fake_pos: 2, advice: "Cánh bị mờ và thiếu chi tiết gân cánh. AI thường lược bỏ các vân li ti khi chuyển động nhanh.", video_url: "https://youtu.be/-wenF_aW-gM", technical_flaws: [] },
    { id: "v5", title: "THIÊN NGA", difficulty: "Khó", desc: "Nhìn vào phần hình ảnh phản chiếu.", hint: "AI thường sai lệch quy luật vật lý của bóng đổ và phản chiếu.", fake_pos: 1, advice: "Phản chiếu dưới nước không khớp chuyển động. Sóng nước chuyển động phi vật lý.", video_url: "https://youtu.be/pP3-hpkg6Ps", technical_flaws: [] },
    { id: "v6", title: "THÁC NƯỚC", difficulty: "Khó", desc: "Quan sát dòng nước chảy.", hint: "Nước AI thường trông giống khói hoặc bị lặp lại (loop).", fake_pos: 2, advice: "Dòng nước giống khói và chuyển động lặp lại (loop). Thiếu sự hỗn loạn tự nhiên của nước thật.", video_url: "https://youtu.be/J52kFGgVMpc", technical_flaws: [] },
    { id: "v7", title: "HOÀNG HÔN", difficulty: "Khó", desc: "Để ý các đám mây.", hint: "AI làm mây bị biến dạng/tan chảy thay vì trôi.", fake_pos: 2, advice: "Mây bị biến hình và tan chảy tại chỗ. Quy luật trôi của mây bị phá vỡ.", video_url: "https://youtu.be/jLXuTEAd0eY", technical_flaws: [] },
    { id: "v8", title: "RỪNG CÂY SƯƠNG MÙ", difficulty: "Khó", desc: "Nhìn vào chuyển động sương.", hint: "Sương mù AI thường trôi phi vật lý.", fake_pos: 2, advice: "Sương mù di chuyển không tự nhiên. AI thường render sương mù như một lớp phủ phẳng.", video_url: "https://youtu.be/7T0pGbJJcnE", technical_flaws: [] },
    { id: "v9", title: "PHI THUYỀN KHÔNG GIAN", difficulty: "Rất khó", desc: "Để ý tia lửa xẹt.", hint: "AI khó xử lý các hạt vật chất nhỏ và tia sáng động.", fake_pos: 2, advice: "Tia lửa bị nhấp nháy bất thường. Các hạt vật chất li ti thường bị AI làm biến dạng.", video_url: "https://youtu.be/AQ8VkGH9hk0", technical_flaws: [] },
    { id: "v10", title: "MÁY ÉP THỦY LỰC", difficulty: "Rất khó", desc: "Quan sát nước dừa khi bị ép.", hint: "Nước thật phải bắn tung tóe, không loang dẻo.", fake_pos: 1, advice: "Nước dừa loang ra như thạch và vỏ dừa biến dạng dẻo. AI sai quy luật vật lý của chất lỏng.", video_url: "https://youtu.be/8Kmnc2jGE74", technical_flaws: [] }
  ],
  en: [
    { id: "v1", title: "LEGO FAMILY", difficulty: "Easy", desc: "Check character hands.", hint: "AI often merges fingers.", fake_pos: 2, advice: "Merged fingers and facial distortion. AI struggles with complex bone structures.", video_url: "https://youtu.be/UOaKSgHVARM", technical_flaws: [] },
    { id: "v2", title: "HAND UNDER TREE", difficulty: "Easy", desc: "Observe hand skin texture.", hint: "AI skin looks too smooth or waxy.", fake_pos: 2, advice: "Waxy skin and lack of natural subsurface scattering. Real skin has subtle veins.", video_url: "https://youtu.be/OO8p3jN7TBQ", technical_flaws: [] },
    { id: "v3", title: "GIRAFFE", difficulty: "Medium", desc: "Watch the feet while moving.", hint: "Check the contact point between feet and ground.", fake_pos: 1, advice: "Sliding feet on grass and poor edge blending. AI fails to anchor objects properly.", video_url: "https://youtu.be/hglX1Q93en8", technical_flaws: [] },
    { id: "v4", title: "DRAGONFLY", difficulty: "Medium", desc: "Observe the wings closely.", hint: "Fine details like wing veins often get blurred.", fake_pos: 2, advice: "Blurry wings and missing vein details. AI tends to smooth out micro-textures.", video_url: "https://youtu.be/-wenF_aW-gM", technical_flaws: [] },
    { id: "v5", title: "SWAN", difficulty: "Hard", desc: "Look at the water reflection.", hint: "AI reflections often mismatch physical movements.", fake_pos: 1, advice: "Reflection mismatch and non-physical water waves. AI fails light/water physics.", video_url: "https://youtu.be/pP3-hpkg6Ps", technical_flaws: [] },
    { id: "v6", title: "WATERFALL", difficulty: "Hard", desc: "Observe the water flow.", hint: "AI water looks like smoke or has noticeable loops.", fake_pos: 2, advice: "Water looks like smoke with repetitive loops. Lacks natural chaos of real water.", video_url: "https://youtu.be/J52kFGgVMpc", technical_flaws: [] },
    { id: "v7", title: "SUNSET", difficulty: "Hard", desc: "Watch the clouds.", hint: "AI clouds often morph/melt instead of drifting.", fake_pos: 2, advice: "Clouds morphing and melting in place. Drifting laws are broken.", video_url: "https://youtu.be/jLXuTEAd0eY", technical_flaws: [] },
    { id: "v8", title: "FOGGY FOREST", difficulty: "Hard", desc: "Look at fog movement.", hint: "AI fog often drifts non-physically.", fake_pos: 2, advice: "Unnatural fog movement. AI renders fog as a flat overlay instead of volume.", video_url: "https://youtu.be/7T0pGbJJcnE", technical_flaws: [] },
    { id: "v9", title: "SPACE SHIP", difficulty: "Expert", desc: "Watch the sparks.", hint: "AI struggles with small particles and dynamic light.", fake_pos: 2, advice: "Abnormal flickering sparks. Small particles often get distorted by AI.", video_url: "https://youtu.be/AQ8VkGH9hk0", technical_flaws: [] },
    { id: "v10", title: "HYDRAULIC PRESS", difficulty: "Expert", desc: "Watch the coconut water.", hint: "Real water splashes, doesn't spread like jelly.", fake_pos: 1, advice: "Coconut water spreads like jelly and shell deforms like plastic. Failed physics.", video_url: "https://youtu.be/8Kmnc2jGE74", technical_flaws: [] }
  ]
};

export const CHECKLIST_DATA: Record<Language, ChecklistItem[]> = {
  vi: [
    { category: "👁️ MẮT & KHUÔN MẶT", items: ["Nháy mắt bất thường (quá ít hoặc quá nhanh)", "Mắt không di chuyển tự nhiên theo hướng nhìn", "Da mặt trông quá mịn hoặc quá bết so với cổ"] },
    { category: "👄 MIỆNG & ÂM THANH", items: ["Khẩu hình không khớp hoàn toàn với lời nói", "Âm thanh bị vang hoặc có tạp âm lạ", "Giọng nói nghe máy móc, thiếu cảm xúc"] },
    { category: "✋ CHI TIẾT CƠ THỂ", items: ["Bàn tay có số lượng ngón bất thường hoặc dính nhau", "Trang sức (khuyên tai, kính) bị nhấp nháy", "Chuyển động đầu bị giật lag hoặc méo mó"] },
    { category: "🖼️ BỐI CẢNH & ÁNH SÁNG", items: ["Phông nền bị biến dạng khi nhân vật di chuyển", "Bóng đổ trên mặt không khớp với hướng sáng", "Vật thể ở xa bị nhòe hoặc rung lắc bất thường"] }
  ],
  en: [
    { category: "👁️ EYES & FACE", items: ["Abnormal blinking (too little or too fast)", "Eyes don't move naturally with gaze direction", "Facial skin looks too smooth or blurry"] },
    { category: "👄 MOUTH & AUDIO", items: ["Lip movements don't perfectly match speech", "Audio is echoey or has strange background noise", "Voice sounds robotic or lacks emotion"] },
    { category: "✋ BODY DETAILS", items: ["Hands have unusual finger counts or merged fingers", "Jewelry (earrings, glasses) flickers", "Head movements are glitchy or distorted"] },
    { category: "🖼️ CONTEXT & LIGHTING", items: ["Background distorts when the person moves", "Shadows on face don't match light source", "Distant objects are blurry or shake unnaturally"] }
  ]
};

export const FUN_FACTS: Record<Language, FunFact[]> = {
  vi: [
    { title: "MẮT VUÔNG?", content: "Các mẫu AI cũ thường tạo ra con ngươi hình vuông thay vì hình tròn tự nhiên." },
    { title: "NHỊP THỞ", content: "Deepfake hiếm khi mô phỏng được nhịp thở nhẹ nhàng làm rung vai của con người." },
    { title: "GÓC NGHIÊNG", content: "AI gặp khó khăn nhất khi nhân vật quay nghiêng mặt 90 độ." }
  ],
  en: [
    { title: "SQUARE EYES?", content: "Old AI models often created square pupils instead of natural circular ones." },
    { title: "BREATHING", content: "Deepfakes rarely simulate the subtle shoulder movements of human breathing." },
    { title: "SIDE PROFILE", content: "AI struggles most when a character turns their face 90 degrees." }
  ]
};

export const KNOWLEDGE_BASE: Record<Language, any[]> = {
  vi: [
    {
      category: "⚖️ PHÁP LUẬT VIỆT NAM",
      items: [
        { title: "Tội lừa đảo chiếm đoạt tài sản", content: "Theo Điều 174 Bộ luật Hình sự 2015, hành vi sử dụng công nghệ cao (Deepfake) để lừa đảo có thể bị phạt tù từ 2 năm đến chung thân tùy mức độ thiệt hại." },
        { title: "Nghị định 13/2023/NĐ-CP", content: "Quy định nghiêm ngặt về bảo vệ dữ liệu cá nhân. Việc sử dụng hình ảnh người khác tạo Deepfake khi chưa được phép là vi phạm pháp luật." },
        { title: "Xử phạt hành chính", content: "Phạt tiền từ 10 - 20 triệu đồng đối với hành vi cung cấp, chia sẻ thông tin giả mạo, sai sự thật trên mạng xã hội." }
      ]
    },
    {
      category: "🛡️ PHÒNG VỆ ĐỜI SỐNG (DỄ NHỚ)",
      items: [
        { title: "Quy tắc 30 giây", content: "Khi nhận cuộc gọi khẩn cấp, hãy im lặng 30 giây để quan sát kỹ cử động mắt và miệng của người gọi." },
        { title: "Mật mã gia đình", content: "Hãy cùng người thân thiết lập một 'từ khóa bí mật'. Nếu người gọi không biết từ này, đó chắc chắn là Deepfake." },
        { title: "Cử động bất ngờ", content: "Yêu cầu người gọi đưa tay ngang mặt hoặc xoay đầu. AI hiện tại thường bị lỗi nhòe hình khi có vật thể che mặt." }
      ]
    },
    {
      category: "📱 KỸ THUẬT CƠ BẢN",
      items: [
        { title: "Kiểm tra SIM GSM", content: "Luôn gọi lại vào số điện thoại thường (không qua app) để xác nhận. Deepfake chỉ hoạt động trên môi trường internet." },
        { title: "Soi bóng đổ", content: "Nhìn vào bóng của mũi hoặc khuyên tai. AI thường render bóng đổ sai hướng so với nguồn sáng thực tế." },
        { title: "Độ trễ âm thanh", content: "Nếu âm thanh và hình ảnh lệch nhau dù mạng ổn định, đó là dấu hiệu AI đang xử lý thời gian thực." }
      ]
    }
  ],
  en: [
    {
      category: "⚖️ VIETNAMESE LAW",
      items: [
        { title: "Fraudulent appropriation of property", content: "According to Article 174 of the 2015 Penal Code, using high technology (Deepfake) for fraud can be punished with 2 years to life imprisonment depending on the damage." },
        { title: "Decree 13/2023/ND-CP", content: "Strict regulations on personal data protection. Using others' images to create Deepfakes without permission is a violation of the law." },
        { title: "Administrative penalties", content: "Fines of 10 - 20 million VND for providing or sharing fake or untruthful information on social networks." }
      ]
    },
    {
      category: "🛡️ LIFE DEFENSE (EASY TO REMEMBER)",
      items: [
        { title: "30-Second Rule", content: "When receiving an emergency call, stay silent for 30 seconds to closely observe the caller's eye and mouth movements." },
        { title: "Family Password", content: "Establish a 'secret keyword' with relatives. If the caller doesn't know this word, it's definitely a Deepfake." },
        { title: "Unexpected Movement", content: "Ask the caller to wave their hand in front of their face or turn their head. Current AI often glitches when objects cover the face." }
      ]
    },
    {
      category: "📱 BASIC TECHNIQUES",
      items: [
        { title: "GSM SIM Check", content: "Always call back on a regular phone number (not via app) to confirm. Deepfake only works over the internet." },
        { title: "Shadow Inspection", content: "Look at the shadows of the nose or earrings. AI often renders shadows in the wrong direction relative to the real light source." },
        { title: "Audio Latency", content: "If sound and image are out of sync despite stable network, it's a sign that AI is processing in real-time." }
      ]
    }
  ]
};

export const SURVEY_SCALE: Record<Language, string[]> = {
  vi: ["😱 Rất lo sợ", "😟 Lo lắng", "😐 Bình thường", "🛡️ Cảnh giác", "⚡ Rất tự tin"],
  en: ["😱 Terrified", "😟 Anxious", "😐 Neutral", "🛡️ Vigilant", "⚡ Very Confident"]
};

export const PERSONALITY_QUESTIONS: Record<Language, PersonalityQuestion[]> = {
  vi: [
    { id: "q1", text: "Tôi thường tin vào những video có hình ảnh người thân mà không cần kiểm chứng thêm.", trait: "AWARENESS" },
    { id: "q2", text: "Tôi cảm thấy lo lắng khi nhận được cuộc gọi từ số lạ yêu cầu chuyển tiền gấp.", trait: "ANXIETY" },
    { id: "q3", text: "Tôi tự tin rằng mình có thể phân biệt được video thật và giả bằng mắt thường.", trait: "CONFIDENCE" },
    { id: "q4", text: "Tôi luôn nghi ngờ tính xác thực của các thông tin gây sốc trên mạng xã hội.", trait: "SKEPTICISM" }
  ],
  en: [
    { id: "q1", text: "I often trust videos showing relatives without further verification.", trait: "AWARENESS" },
    { id: "q2", text: "I feel anxious when receiving calls from strangers asking for urgent money transfers.", trait: "ANXIETY" },
    { id: "q3", text: "I am confident that I can distinguish between real and fake videos with the naked eye.", trait: "CONFIDENCE" },
    { id: "q4", text: "I always doubt the authenticity of shocking information on social media.", trait: "SKEPTICISM" }
  ]
};

export const NEWS_DATA: Record<Language, NewsItem[]> = {
  vi: [
    { tag: "HÀ NỘI", title: "Giả mạo Công an lừa đảo chiếm đoạt tài sản", date: "11/2025", loss: "2.3 Tỷ VNĐ", desc: "Đối tượng dùng Deepfake mặc quân phục để gọi video lừa đảo người dân qua Zalo.", url: "https://vtv.vn" },
    { tag: "QUỐC TẾ", title: "CEO giả mạo lừa công ty 25 triệu USD", date: "09/2025", loss: "25 Triệu USD", desc: "Nhân viên tài chính chuyển tiền sau cuộc họp video mà toàn bộ đồng nghiệp là Deepfake.", url: "https://cnn.com" },
    { tag: "TP.HCM", title: "Chiêu trò 'người thân cấp cứu' bằng Deepfake", date: "10/2025", loss: "500 Triệu VNĐ", desc: "Kẻ xấu giả giọng và mặt con cái đang cấp cứu để hối thúc cha mẹ chuyển tiền gấp.", url: "https://tuoitre.vn" },
    { tag: "CÔNG NGHỆ", title: "Phát hiện mã nguồn tạo Deepfake AI mới", date: "08/2025", loss: "N/A", desc: "Công cụ mới cho phép tạo video giả mạo chỉ với 1 bức ảnh và 3 giây âm thanh.", url: "https://tinhte.vn" },
    { tag: "NGÂN HÀNG", title: "Cảnh báo lừa đảo xác thực khuôn mặt", date: "07/2025", loss: "Chưa thống kê", desc: "Tội phạm dùng Deepfake vượt qua hệ thống eKYC của một số tổ chức tài chính.", url: "https://vnexpress.net" },
    { tag: "GIẢI TRÍ", title: "Người nổi tiếng bị gán ghép hình ảnh nhạy cảm", date: "06/2025", loss: "Uy tín", desc: "Làn sóng Deepfake khiêu dâm tấn công các nghệ sĩ gây bức xúc dư luận.", url: "https://zingnews.vn" }
  ],
  en: [
    { tag: "HANOI", title: "Fake Police Officer Property Fraud", date: "11/2025", loss: "$100k", desc: "Subjects used Deepfake uniforms for video call scams via Zalo.", url: "https://vtv.vn" },
    { tag: "INTL", title: "Fake CEO Scams Company for $25M", date: "09/2025", loss: "$25M", desc: "Finance employee transferred funds after a video call where all participants were Deepfakes.", url: "https://cnn.com" },
    { tag: "HCMC", title: "'Emergency' Scam using Deepfake Tech", date: "10/2025", loss: "$20k", desc: "Scammers spoof children's voices and faces in fake emergency situations to rush parents.", url: "https://tuoitre.vn" },
    { tag: "TECH", title: "New Deepfake AI Source Code Discovered", date: "08/2025", loss: "N/A", desc: "A new tool allows generating fake videos with just 1 photo and 3 seconds of audio.", url: "https://tinhte.vn" },
    { tag: "BANKING", title: "Facial Authentication Scam Warning", date: "07/2025", loss: "TBD", desc: "Criminals use Deepfake to bypass eKYC systems of several financial organizations.", url: "https://vnexpress.net" },
    { tag: "ENT", title: "Celebrities Targeted by Non-consensual Deepfakes", date: "06/2025", loss: "Reputation", desc: "Wave of pornographic Deepfakes attacking artists causes public outrage.", url: "https://zingnews.vn" }
  ]
};
