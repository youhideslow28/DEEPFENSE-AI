
import { LevelData, ChecklistItem, NewsItem, FunFact, PersonalityQuestion } from './types';

// Mở rộng interface nội bộ cho mục đích so sánh
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
    title: "SỰ BIẾN DẠNG CỦA LỚP ĐÈ (OCCLUSION)", 
    desc: "Phân tích khi có vật thể che ngang khuôn mặt.", 
    hint: "AI thường bị 'nháy' hình khi bàn tay hoặc ly nước đè lên các điểm ảnh mặt.",
    fake_pos: 1, 
    advice: "Video bên TRÁI gặp lỗi xử lý phân tầng. Khi tay đưa lên, thuật toán không kịp render các pixel bên dưới, gây ra hiện tượng 'tan chảy' viền tay.",
    video_url: "https://youtu.be/UOaKSgHVARM",
    timestamp_glitch: "0:08 - 0:12",
    technical_flaws: [
      { feature: "Cạnh biên (Edges)", real_behavior: "Sắc nét, tách biệt hoàn toàn với vật thể đè lên.", ai_error: "Bị nhòe (motion blur) và dính vào vật thể." },
      { feature: "Kết cấu da", real_behavior: "Giữ nguyên chi tiết lỗ chân lông khi bị che.", ai_error: "Bị biến dạng cấu trúc hoặc mất chi tiết đột ngột." }
    ]
  },
  { 
    title: "ĐỒNG BỘ QUANG PHỔ MÔI (LIP-SYNC)", 
    desc: "Kiểm tra độ trễ giữa âm thanh và chuyển động cơ miệng.", 
    hint: "Các âm khó như 'M, P, B' yêu cầu nén môi vật lý mà AI hay làm thiếu.",
    fake_pos: 2, 
    advice: "Video bên PHẢI có độ trễ 12ms trong khẩu hình. AI tạo ra các hình dáng môi 'trung bình' thay vì các cử động bật hơi dứt khoát.",
    video_url: "https://youtu.be/OO8p3jN7TBQ",
    timestamp_glitch: "Toàn thời gian",
    technical_flaws: [
      { feature: "Khớp âm (Phonemes)", real_behavior: "Cơ môi co thắt mạnh cho các phụ âm bậc.", ai_error: "Chuyển động lướt, thiếu lực nén cơ học." },
      { feature: "Răng & Lưỡi", real_behavior: "Nhìn rõ từng chi tiết khi mở miệng.", ai_error: "Thường bị mờ thành một khối trắng đục." }
    ]
  },
  { 
    title: "ÁNH SÁNG VÀ PHẢN CHIẾU ĐỒNG TỬ", 
    desc: "Soi điểm sáng trong mắt nhân vật.", 
    hint: "Mắt thật luôn có điểm phản chiếu ánh sáng (catchlight) đồng nhất giữa hai bên.",
    fake_pos: 2, 
    advice: "Video bên PHẢI lộ lỗi render nguồn sáng. Điểm sáng trong mắt trái và phải không cùng vị trí, chứng tỏ mặt được ghép từ nhiều nguồn ảnh khác nhau.",
    video_url: "https://youtu.be/-wenF_aW-gM",
    timestamp_glitch: "Cận cảnh (Close-up)",
    technical_flaws: [
      { feature: "Catchlight", real_behavior: "Hình dáng và vị trí điểm sáng khớp với nguồn sáng phòng.", ai_error: "Hình dáng điểm sáng bị lệch hoặc có hình dạng kỳ lạ (hình vuông)." },
      { feature: "Mạch máu mắt", real_behavior: "Có các vi mạch nhỏ li ti tự nhiên.", ai_error: "Lòng trắng quá sạch hoặc có độ mịn nhân tạo." }
    ]
  },
  { 
    title: "VI BIỂU CẢM VÙNG MẮT (MICRO-EXPRESSIONS)", 
    desc: "Để ý các nếp nhăn nhỏ khi nhân vật cười hoặc nói.", 
    hint: "Cảm xúc thật luôn đi kèm với sự co thắt của các cơ quanh mắt (Orbicularis oculi).",
    fake_pos: 1, 
    advice: "Video bên TRÁI là 'mặt nạ AI'. Miệng cười nhưng vùng mắt hoàn toàn bất động, không có nếp nhăn chân chim xuất hiện.",
    video_url: "https://youtu.be/J52kFGgVMpc",
    technical_flaws: [
      { feature: "Nếp nhăn động", real_behavior: "Xuất hiện và biến mất theo nhịp biểu cảm.", ai_error: "Vùng trán và quanh mắt quá mịn, không thay đổi theo nụ cười." },
      { feature: "Nhịp nháy mắt", real_behavior: "Tự nhiên, không đều đặn (vô thức).", ai_error: "Quá đều hoặc quá lâu không nháy mắt." }
    ],
    timestamp_glitch: "0:15 - 0:22"
  }
];

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
    { id: "q1", text: "Tôi cảm thấy tự tin hơn khi phân biệt thật giả.", trait: "CONFIDENCE" },
    { id: "q2", text: "Tôi vẫn cảm thấy lo lắng vì AI quá giống thật.", trait: "ANXIETY" },
    { id: "q3", text: "Tôi sẽ luôn kiểm chứng lại các cuộc gọi video.", trait: "SKEPTICISM" },
    { id: "q4", text: "Tôi đã nhận biết được các lỗi hình ảnh cơ bản.", trait: "AWARENESS" }
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
