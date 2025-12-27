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
    knowledge: "BẠN CÓ BIẾT?",
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
    knowledge: "DID YOU KNOW?",
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
    { id: "v1", title: "Gia đình Lego", difficulty: "Dễ", desc: "Soi kỹ bàn tay và khuôn mặt nhân vật.", hint: "Chú ý ngón tay và biến dạng khi quay đầu.", fake_pos: 2, advice: "Ngón tay người ông bị dính vào nhau, khuôn mặt bé gái bị biến dạng mờ nhòe khi quay đầu.", video_url: "https://youtu.be/UOaKSgHVARM", technical_flaws: [] },
    { id: "v2", title: "Nhóm người chụm tay", difficulty: "Khó", desc: "Quan sát bề mặt da tay.", hint: "AI thường làm da quá mịn hoặc thiếu độ trong mờ.", fake_pos: 1, advice: "Da tay quá mịn như sáp, thiếu độ trong mờ tự nhiên (subsurface scattering) và chi tiết lỗ chân lông/nếp nhăn.", video_url: "https://youtu.be/OO8p3jN7TBQ", technical_flaws: [] },
    { id: "v3", title: "Hươu cao cổ", difficulty: "Trung bình", desc: "Để ý chân hươu khi di chuyển.", hint: "Kiểm tra sự tiếp xúc giữa chân và mặt đất.", fake_pos: 1, advice: "Chân hươu bước đi trượt trên cỏ (moonwalking), tách nền (background separation) giữa hươu và núi bị lỗi.", video_url: "https://youtu.be/hglX1Q93en8", technical_flaws: [] },
    { id: "v4", title: "Chuồn chuồn", difficulty: "Dễ", desc: "Quan sát kỹ đôi cánh.", hint: "Các chi tiết cực nhỏ thường bị AI làm mờ.", fake_pos: 2, advice: "Cánh chuồn chuồn nhìn như nhựa đục, thiếu chi tiết gân cánh sắc nét, đôi khi hòa lẫn vào thân.", video_url: "https://youtu.be/-wenF_aW-gM", technical_flaws: [] },
    { id: "v5", title: "Thiên nga", difficulty: "Trung bình", desc: "Nhìn vào phần hình ảnh phản chiếu.", hint: "AI phản chiếu thường sai lệch quy luật vật lý.", fake_pos: 1, advice: "Hình phản chiếu dưới nước bị méo mó, sóng nước di chuyển không khớp với hướng bơi của thiên nga.", video_url: "https://youtu.be/pP3-hpkg6Ps", technical_flaws: [] },
    { id: "v6", title: "Thác nước", difficulty: "Khó", desc: "Quan sát dòng nước chảy.", hint: "Nước AI thường trông giống khói.", fake_pos: 2, advice: "Dòng nước đổ xuống nhìn giống sương khói mờ ảo, chuyển động lặp lại (loop) thiếu sức nặng của nước.", video_url: "https://youtu.be/J52kFGgVMpc", technical_flaws: [] },
    { id: "v7", title: "Hoàng hôn", difficulty: "Khó", desc: "Để ý các đám mây.", hint: "AI làm mây bị biến dạng/tan chảy.", fake_pos: 1, advice: "Các đám mây di chuyển bất thường, tự tan chảy hoặc biến hình (morphing) tại chỗ thay vì trôi theo gió.", video_url: "https://youtu.be/jLXuTEAd0eY", technical_flaws: [] },
    { id: "v8", title: "Cắt cát dưa hấu", difficulty: "Dễ", desc: "Nhìn vào kết cấu cát khi bị cắt.", hint: "Cát thật có độ tơi xốp đặc trưng.", fake_pos: 1, advice: "Khối cát bị cắt trông dẻo như cao su/đất sét, không có độ tơi xốp và rơi vụn tự nhiên của cát động lực.", video_url: "https://youtu.be/7T0pGbJJcnE", technical_flaws: [] },
    { id: "v9", title: "Múc cát xanh", difficulty: "Dễ", desc: "Để ý vết lõm sau khi múc.", hint: "AI khó xử lý sự thay đổi hình khối liên tục.", fake_pos: 1, advice: "Cát sau khi múc để lại vết lõm bị méo mó, hoặc cát tự động \"liền\" lại một cách phi vật lý.", video_url: "https://youtu.be/AQ8VkGH9hk0", technical_flaws: [] },
    { id: "v10", title: "Máy ép thủy lực", difficulty: "Dễ", desc: "Quan sát nước khi bị ép mạnh.", hint: "Vật lý chất lỏng là điểm yếu của AI.", fake_pos: 2, advice: "Chất lỏng bắn ra quá dữ dội hoặc có hình dáng/màu sắc thiếu tự nhiên so với lực ép thực tế, các mảnh vỡ bay ra không theo quy luật vật lý.", video_url: "https://youtu.be/8Kmnc2jGE74", technical_flaws: [] }
  ],
  en: [
    { id: "v1", title: "Lego Family", difficulty: "Easy", desc: "Check hands and faces.", hint: "Watch fingers and head rotation distortion.", fake_pos: 2, advice: "Grandfather's fingers are fused, girl's face distorts when turning head.", video_url: "https://youtu.be/UOaKSgHVARM", technical_flaws: [] },
    { id: "v2", title: "Hand Cluster", difficulty: "Hard", desc: "Observe hand skin surface.", hint: "AI skin is often too smooth or lacks subsurface scattering.", fake_pos: 1, advice: "Skin is too waxy, missing natural translucency and pore/wrinkle details.", video_url: "https://youtu.be/OO8p3jN7TBQ", technical_flaws: [] },
    { id: "v3", title: "Giraffe", difficulty: "Medium", desc: "Watch feet during movement.", hint: "Check ground contact.", fake_pos: 1, advice: "Giraffe slides on grass (moonwalking), background separation from mountains is glitched.", video_url: "https://youtu.be/hglX1Q93en8", technical_flaws: [] },
    { id: "v4", title: "Dragonfly", difficulty: "Easy", desc: "Observe wings closely.", hint: "Fine details are often blurred by AI.", fake_pos: 2, advice: "Wings look like opaque plastic, missing sharp vein details, blending into the body.", video_url: "https://youtu.be/-wenF_aW-gM", technical_flaws: [] },
    { id: "v5", title: "Swan", difficulty: "Medium", desc: "Look at the water reflection.", hint: "AI reflections often break physics laws.", fake_pos: 1, advice: "Water reflection is distorted, waves don't match the swan's swimming direction.", video_url: "https://youtu.be/pP3-hpkg6Ps", technical_flaws: [] },
    { id: "v6", title: "Waterfall", difficulty: "Hard", desc: "Observe flowing water.", hint: "AI water often looks like smoke/mist.", fake_pos: 2, advice: "Water looks like mist, repetitive loops lack water's weight.", video_url: "https://youtu.be/J52kFGgVMpc", technical_flaws: [] },
    { id: "v7", title: "Sunset", difficulty: "Hard", desc: "Watch the clouds.", hint: "AI morphs or melts clouds.", fake_pos: 1, advice: "Clouds move abnormally, melting or morphing instead of drifting with wind.", video_url: "https://youtu.be/jLXuTEAd0eY", technical_flaws: [] },
    { id: "v8", title: "Sand Cutting", difficulty: "Easy", desc: "Observe sand texture when cut.", hint: "Real sand has specific crumble.", fake_pos: 1, advice: "Sand block looks rubbery like clay, missing natural crumble of kinetic sand.", video_url: "https://youtu.be/7T0pGbJJcnE", technical_flaws: [] },
    { id: "v9", title: "Blue Sand Scoop", difficulty: "Easy", desc: "Observe scoop depression.", hint: "AI struggles with continuous shape change.", fake_pos: 1, advice: "Scooped area is distorted or 'heals' in a non-physical way.", video_url: "https://youtu.be/AQ8VkGH9hk0", technical_flaws: [] },
    { id: "v10", title: "Hydraulic Press", difficulty: "Easy", desc: "Observe liquid under pressure.", hint: "Fluid physics is an AI weakness.", fake_pos: 2, advice: "Liquid splash is too violent or unnatural, debris violates physics laws.", video_url: "https://youtu.be/8Kmnc2jGE74", technical_flaws: [] }
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
      category: "💡 BẠN CÓ BIẾT?",
      items: [
        { title: "Deepfake '3 giây'", content: "Chỉ cần 3 giây mẫu âm thanh, kẻ xấu có thể giả dạng giọng nói của bất kỳ ai với độ chính xác kinh ngạc." },
        { title: "Artifacts là gì?", content: "Đó là những lỗi nhỏ trong video AI (như răng mờ, mắt nháy lệch) mà chỉ khi soi kỹ chúng ta mới phát hiện được." },
        { title: "Bóng đổ 'phản chủ'", content: "AI rất giỏi vẽ mặt nhưng rất tệ khi vẽ bóng đổ. Luôn soi bóng mũi để tìm vết nứt của sự thật." }
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
      category: "⚖️ PHÁP LUẬT VIỆT NAM",
      items: [
        { title: "Tội lừa đảo chiếm đoạt tài sản", content: "Theo Điều 174 Bộ luật Hình sự 2015, hành vi sử dụng công nghệ cao (Deepfake) để lừa đảo có thể bị phạt tù từ 2 năm đến chung thân tùy mức độ thiệt hại." },
        { title: "Nghị định 13/2023/NĐ-CP", content: "Quy định nghiêm ngặt về bảo vệ dữ liệu cá nhân. Việc sử dụng hình ảnh người khác tạo Deepfake khi chưa được phép là vi phạm pháp luật." }
      ]
    }
  ],
  en: [
    {
      category: "💡 DID YOU KNOW?",
      items: [
        { title: "3-Second Voice", content: "With just 3 seconds of audio, bad actors can clone anyone's voice with staggering accuracy." },
        { title: "What are Artifacts?", content: "Small glitches in AI videos (like blurry teeth or unsynced blinking) that reveal the fake upon close inspection." },
        { title: "Betraying Shadows", content: "AI is great at faces but terrible at shadows. Always check the nose shadow to find cracks in the lie." }
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
      category: "⚖️ VIETNAMESE LAW",
      items: [
        { title: "Property appropriation fraud", content: "Under Article 174 of the 2015 Penal Code, using Deepfake for fraud can lead to imprisonment from 2 years to life." },
        { title: "Decree 13/2023/ND-CP", content: "Strict personal data protection. Unauthorized Deepfake creation using others' images is illegal." }
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