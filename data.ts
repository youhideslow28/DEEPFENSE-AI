
import { LevelData, ChecklistItem, NewsItem, FunFact, PersonalityQuestion } from './types';

export interface EnhancedLevelData extends LevelData {
  technical_flaws: {
    feature: string;
    real_behavior: string;
    ai_error: string;
  }[];
  timestamp_glitch: string;
}

export const LEVELS: EnhancedLevelData[] = [
  { 
    id: "v1",
    title: "MÁY ÉP THỦY LỰC (HYDRAULIC PRESS)", 
    difficulty: "Dễ",
    desc: "Quan sát cách chất lỏng phản ứng dưới áp lực cực lớn.", 
    hint: "Trọng lực và sự bắn tia của chất lỏng thật rất hỗn loạn, không mượt mà quá mức.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Fluid Dynamics': Chất lỏng khi bị ép chảy ra theo quỹ đạo quá hoàn hảo, thiếu các tia bắn nhỏ (splashes) và áp suất không làm thay đổi mật độ bọt khí một cách tự nhiên như vật lý thực tế.",
    video_url: "https://youtu.be/UOaKSgHVARM",
    timestamp_glitch: "0:05 - 0:10",
    technical_flaws: [
      { feature: "Động lực học chất lỏng", real_behavior: "Bắn tia ngẫu nhiên, tạo bọt khí không đều.", ai_error: "Chảy tràn như gel, quỹ đạo quá mượt." }
    ]
  },
  { 
    id: "v2",
    title: "XÚC CÁT ĐỘNG LỰC HỌC (KINETIC SAND)", 
    difficulty: "Dễ",
    desc: "Phân tích hình dạng lỗ thủng sau khi thìa xúc cát lên.", 
    hint: "AI thường gặp khó khăn trong việc duy trì hình dạng hình học ổn định của các lỗ rỗng.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Geometric Stability': Hình dạng của cái lỗ để lại sau khi xúc cát bị biến đổi liên tục (morphing) thay vì giữ nguyên hình lòng thìa như video bên phải.",
    video_url: "https://youtu.be/OO8p3jN7TBQ",
    timestamp_glitch: "Toàn thời gian",
    technical_flaws: [
      { feature: "Cấu trúc rỗng", real_behavior: "Giữ nguyên hình dạng lòng thìa sắc nét.", ai_error: "Viền lỗ bị co giãn hoặc mờ dần không tự nhiên." }
    ]
  },
  { 
    id: "v3",
    title: "CẮT CÁT (SAND CUT)", 
    difficulty: "Dễ",
    desc: "Cảm nhận độ giòn và kết cấu của vật liệu khi bị cắt.", 
    hint: "Cát thật khi cắt sẽ vỡ vụn thành các hạt li ti, không dính lại như cao su.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Material Texture': Kết cấu vật liệu trông giống cao su hoặc polymer đặc hơn là các hạt cát nén. AI không render được sự sụp đổ của từng hạt cát nhỏ khi dao đi qua.",
    video_url: "https://youtu.be/hglX1Q93en8",
    timestamp_glitch: "0:03 - 0:07",
    technical_flaws: [
      { feature: "Sụp đổ vật liệu", real_behavior: "Rơi vụn thành hạt li ti ngay lập tức.", ai_error: "Dính mảng lớn, trông dẻo như đất sét." }
    ]
  },
  { 
    id: "v4",
    title: "GIA ĐÌNH LEGO (FAMILY LEGO)", 
    difficulty: "Dễ",
    desc: "Soi kỹ bàn tay và các chi tiết khuôn mặt của nhân vật.", 
    hint: "AI thường 'sáng tạo' thêm ngón tay hoặc làm mờ các chi tiết khớp nối nhỏ.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Biological Inconsistency': Bàn tay nhân vật có cấu trúc ngón không rõ ràng, các khối Lego bị hòa lẫn vào da người thay vì tách biệt hoàn toàn.",
    video_url: "https://youtu.be/-wenF_aW-gM",
    timestamp_glitch: "Cận cảnh bàn tay",
    technical_flaws: [
      { feature: "Số lượng ngón tay", real_behavior: "5 ngón rõ ràng, khớp nối tự nhiên.", ai_error: "Ngón tay dính nhau hoặc có 6 ngón." }
    ]
  },
  { 
    id: "v5",
    title: "CHUỒN CHUỒN (DRAGONFLY)", 
    difficulty: "Dễ",
    desc: "Nhìn kỹ vào gân cánh và độ rung của đôi cánh.", 
    hint: "Cánh chuồn chuồn thật có cấu trúc gân như mạng nhện, cực kỳ sắc nét.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Fine Detail Rendering': Cánh chuồn chuồn bị mờ đục (opaque) và thiếu hệ thống gân cánh phức tạp. AI dùng chuyển động mờ (motion blur) để che giấu việc không render được chi tiết cực nhỏ.",
    video_url: "https://youtu.be/pP3-hpkg6Ps",
    timestamp_glitch: "0:12",
    technical_flaws: [
      { feature: "Độ trong suốt cánh", real_behavior: "Trong suốt với mạng lưới gân đen rõ rệt.", ai_error: "Mờ như nhựa đục, mất chi tiết gân." }
    ]
  },
  { 
    id: "v6",
    title: "HƯƠU CAO CỔ (GIRAFFE)", 
    difficulty: "Trung bình",
    desc: "Phân tích bước chân và sự tương tác với mặt đất.", 
    hint: "Để ý hiện tượng 'trượt chân' (skating) khi con vật di chuyển.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Temporal Consistency': Chân hươu cao cổ có hiện tượng trượt trên mặt đất thay vì bám trụ chắc chắn. Viền thân cũng bị 'lem' màu vào phông nền phía sau.",
    video_url: "https://youtu.be/J52kFGgVMpc",
    timestamp_glitch: "0:10 - 0:15",
    technical_flaws: [
      { feature: "Tiếp xúc bề mặt", real_behavior: "Bàn chân cố định tại một điểm khi chạm đất.", ai_error: "Bàn chân trượt nhẹ hoặc xuyên qua mặt đất." }
    ]
  },
  { 
    id: "v7",
    title: "THIÊN NGA (SWANS)", 
    difficulty: "Trung bình",
    desc: "Nhìn vào hình ảnh phản chiếu trên mặt nước.", 
    hint: "Phản chiếu phải là hình ảnh đối xứng hoàn hảo qua trục mặt nước.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Reflection Logic': Hình ảnh phản chiếu dưới nước của con thiên nga không khớp với cử động thực tế phía trên. AI thường render phông nền và phản chiếu độc lập dẫn đến sai lệch vật lý.",
    video_url: "https://youtu.be/jLXuTEAd0eY",
    timestamp_glitch: "Mặt nước",
    technical_flaws: [
      { feature: "Đối xứng phản chiếu", real_behavior: "Chuyển động trên và dưới mặt nước đồng bộ 100%.", ai_error: "Phản chiếu bị trễ nhịp hoặc hình dạng khác biệt." }
    ]
  },
  { 
    id: "v8",
    title: "TAY VÀ CÂY (HANDS/TREES)", 
    difficulty: "Khó",
    desc: "Đánh giá chất liệu da và cấu trúc nhành cây.", 
    hint: "Da AI thường có độ bóng như sáp (waxy) và thiếu các nếp gấp vi mô.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Subsurface Scattering': Ánh sáng xuyên qua da trông không thực tế, tạo cảm giác da như làm bằng nhựa sáp. Các nhành cây phía sau bị biến dạng khi tay lướt qua.",
    video_url: "https://youtu.be/7T0pGbJJcnE",
    timestamp_glitch: "Viền ngón tay",
    technical_flaws: [
      { feature: "Kết cấu biểu bì", real_behavior: "Có lỗ chân lông, nếp nhăn và vết nám nhẹ.", ai_error: "Mịn màng quá mức, bóng loáng như sáp mỳ." }
    ]
  },
  { 
    id: "v9",
    title: "HOÀNG HÔN (SUNSET)", 
    difficulty: "Khó",
    desc: "Quan sát sự biến đổi của các đám mây.", 
    hint: "Mây thật di chuyển theo khối, không tự nhiên sinh ra hoặc mất đi giữa chừng.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Latent Space Morphing': Các đám mây nhỏ có hiện tượng tự biến hình (morphing) thành hình dạng khác hoặc biến mất rồi xuất hiện lại một cách vô lý.",
    video_url: "https://youtu.be/AQ8VkGH9hk0",
    timestamp_glitch: "Góc trên bên phải",
    technical_flaws: [
      { feature: "Tính nhất quán của mây", real_behavior: "Di chuyển tịnh tiến theo hướng gió.", ai_error: "Hình dáng mây co giãn hoặc thay đổi cấu trúc liên tục." }
    ]
  },
  { 
    id: "v10",
    title: "THÁC NƯỚC (WATERFALL)", 
    difficulty: "Khó",
    desc: "Phân tích dòng chảy của nước đổ xuống.", 
    hint: "Nước rơi có trọng lực, không lơ lửng như khói.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Motion Loop': Dòng nước trông giống như làn khói đang bay hơn là nước rơi có trọng lượng. AI cũng tạo ra một vòng lặp (loop) lộ liễu khiến dòng chảy trông rất máy móc.",
    video_url: "https://youtu.be/8Kmnc2jGE74",
    timestamp_glitch: "Chân thác nước",
    technical_flaws: [
      { feature: "Khối lượng dòng chảy", real_behavior: "Nước đổ xuống có bọt trắng và áp lực mạnh.", ai_error: "Nước trông nhẹ như mây khói, chuyển động lặp lại." }
    ]
  },
];

export const EDUCATIONAL_RULES = [
  {
    title: "QUY TẮC 1: VẬT LÝ & TRỌNG LỰC",
    content: "AI thường gặp khó khăn trong việc mô phỏng 'khối lượng' và 'áp suất'. Trong các ví dụ như thác nước hay cát, hãy để ý xem vật liệu có rơi tự nhiên theo trọng lực không, hay nó lơ lửng và biến hình như khói. Chất lỏng thật luôn có sự hỗn loạn và không bao giờ chảy theo những đường cong mượt mà tuyệt đối."
  },
  {
    title: "QUY TẮC 2: CHI TIẾT SINH HỌC",
    content: "Cấu trúc con người là rào cản lớn nhất của AI. Hãy soi kỹ bàn tay (số lượng ngón, khớp nối), ánh mắt (điểm phản chiếu ánh sáng phải đồng nhất) và texture da (da thật có lỗ chân lông, nếp nhăn chân chim khi cười). AI thường 'làm mịn' quá mức khiến mọi thứ trông như nhựa sáp hoặc làm dính các chi tiết vào nhau."
  },
  {
    title: "QUY TẮC 3: TÍNH NHẤT QUÁN MÔI TRƯỜNG",
    content: "Hãy nhìn vào phông nền và các hình ảnh phản chiếu. Một lỗi kinh điển của AI là 'Skating' (con vật di chuyển nhưng chân bị trượt trên nền) hoặc phản chiếu dưới nước không khớp với vật thể phía trên. Các vật thể ở hậu cảnh cũng thường bị méo mó (warping) khi có vật thể ở tiền cảnh chuyển động đi qua."
  }
];

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
    { id: "q1", text: "Tôi thường xuyên sử dụng mạng xã hội và tin vào các video tin tức.", trait: "AWARENESS" },
    { id: "q2", text: "Tôi cảm thấy mình có khả năng nhận ra video giả mạo chỉ sau vài giây.", trait: "CONFIDENCE" },
    { id: "q3", text: "Tôi luôn có thói quen kiểm tra nguồn gốc của một video lạ.", trait: "SKEPTICISM" },
    { id: "q4", text: "Tôi cảm thấy lo lắng khi AI có thể bắt chước người thân của mình.", trait: "ANXIETY" }
];

export const CHECKLIST_DATA: ChecklistItem[] = [
  {
    category: "👁️ MẮT & HÀNH VI",
    items: ["Nháy mắt bất thường", "Đồng tử mờ hoặc lệch", "Biểu cảm mắt vô hồn"]
  },
  {
    category: "👄 MIỆNG & GIỌNG",
    items: ["Tiếng đi trước hình", "Khẩu hình miệng méo", "Giọng nói robot"]
  },
  {
    category: "🎨 KỸ THUẬT",
    items: ["Ánh sáng & bóng sai", "Viền tóc mờ nhòe", "Gọng kính đứt đoạn"]
  },
  {
    category: "🚨 LỪA ĐẢO",
    items: ["Yêu cầu tiền gấp", "Áp lực tâm lý", "Bàn tay bất thường"]
  }
];

export const NEWS_DATA: NewsItem[] = [
  { 
    tag: "HÀ NỘI", title: "Giả mạo Công an yêu cầu cài App mã độc", date: "11/2025", loss: "2.3 Tỷ VNĐ", 
    desc: "Đối tượng dùng Deepfake mặc quân phục gọi video qua Zalo để chiếm quyền điện thoại.",
    url: "https://vtv.vn" 
  },
  { 
    tag: "TP.HCM", title: "'Con trai du học' xin tiền cấp cứu tai nạn", date: "10/2025", loss: "480 Triệu VNĐ", 
    desc: "Ông T.V.M nhận cuộc gọi video thấy con trai bị thương giả tạo bằng AI.",
    url: "https://tuoitre.vn"
  },
  { 
    tag: "QUỐC TẾ", title: "CEO giả tham gia cuộc họp lừa 25 triệu USD", date: "09/2025", loss: "25 Triệu USD", 
    desc: "Vụ lừa kỷ lục tại Hong Kong khi cả phòng họp đều là Deepfake.",
    url: "https://cnn.com"
  }
];

export const FUN_FACTS: FunFact[] = [
    { title: "MẮT VUÔNG?", content: "Mô hình cũ thường tạo phản chiếu đồng tử hình vuông." },
    { title: "QUÊN THỞ", content: "AI thường quên mô phỏng nhịp thở phồng xẹp của ngực." },
    { title: "GIỌNG 3 GIÂY", content: "AI chỉ cần 3 giây mẫu âm thanh để sao chép giọng nói." }
];
