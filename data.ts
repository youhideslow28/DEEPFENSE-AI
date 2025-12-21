
import { LevelData, ChecklistItem, NewsItem, FunFact, PersonalityQuestion } from './types';

export const LEVELS: LevelData[] = [
  { 
    title: "PHÂN TÍCH NHÂN VẬT A", 
    desc: "Quan sát kỹ cử động cơ mặt và ánh sáng vùng mắt.", 
    hint: "Tìm điểm bất thường ở vùng tiếp giáp giữa mặt và tóc.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là Deepfake. Bạn có thể thấy vùng viền mặt bị nhòe nhẹ khi nhân vật quay đầu nhanh, đây là lỗi phổ biến của thuật toán thế hệ cũ.",
    video_url: "https://youtu.be/UOaKSgHVARM"
  },
  { 
    title: "ĐỐI CHIẾU KHẨU HÌNH", 
    desc: "Tập trung vào sự đồng bộ giữa âm thanh và chuyển động môi.", 
    hint: "Chú ý các phụ âm cần mím môi như P, B, M.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là Deepfake. Khẩu hình miệng thường bị trễ khoảng vài mil giây so với âm thanh thật, tạo cảm giác thiếu tự nhiên.",
    video_url: "https://youtu.be/OO8p3jN7TBQ"
  },
  { 
    title: "KIỂM TRA CẤU TRÚC RĂNG", 
    desc: "Nhìn vào khoang miệng khi nhân vật nói các từ có âm mở.", 
    hint: "Răng thật có kẽ hở rõ ràng, AI thường làm mờ chúng thành một khối.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là Deepfake. AI đời cũ gặp khó khăn trong việc vẽ từng chiếc răng riêng lẻ, thường tạo ra một 'mảng trắng' duy nhất.",
    video_url: "https://youtu.be/hglX1Q93en8"
  },
  { 
    title: "PHÂN TÍCH NGUỒN SÁNG", 
    desc: "Xác định hướng ánh sáng đổ trên khuôn mặt.", 
    hint: "Bóng của mũi phải khớp với hướng sáng của môi trường.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là Deepfake. Ánh sáng trên khuôn mặt nhân vật không đồng nhất với phông nền, cho thấy khuôn mặt được ghép vào sau.",
    video_url: "https://youtu.be/-wenF_aW-gM"
  },
  { 
    title: "BIỂU CẢM VI MÔ", 
    desc: "Quan sát các nếp nhăn nhỏ quanh mắt khi cười.", 
    hint: "Cảm xúc thật luôn đi kèm với các chuyển động cơ nhỏ nhất.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là Deepfake. Nhân vật có biểu cảm 'đơ' ở vùng mắt dù miệng đang cười lớn, dấu hiệu điển hình của việc thiếu dữ liệu cảm xúc.",
    video_url: "https://youtu.be/pP3-hpkg6Ps"
  },
  { 
    title: "ĐỘ MỊN CỦA DA", 
    desc: "Đánh giá chi tiết bề mặt da và lỗ chân lông.", 
    hint: "Da quá hoàn hảo, không có khuyết điểm thường là sản phẩm của AI.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là Deepfake. AI thường 'làm mịn' da quá mức để che giấu các lỗi ghép nối, khiến da trông như nhựa hoặc sáp.",
    video_url: "https://youtu.be/J52kFGgVMpc"
  },
  { 
    title: "VẬT THỂ TRONG SUỐT", 
    desc: "Quan sát kính mắt hoặc các vật thể xuyên thấu nếu có.", 
    hint: "Tìm kiếm sự biến dạng của hình ảnh qua lớp kính.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là Deepfake. Sự phản chiếu trên tròng kính không khớp với chuyển động của nhân vật, cho thấy lỗi xử lý layer.",
    video_url: "https://youtu.be/jLXuTEAd0eY"
  },
  { 
    title: "KẾT CẤU TÓC TƠ", 
    desc: "Nhìn vào phần tóc mái và các sợi tóc mảnh.", 
    hint: "Sợi tóc thật phải tách bạch và chuyển động tự nhiên.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là Deepfake. Phần tóc ở viền mặt trông như một mảng màu đặc, không có độ tơi của sợi tóc thật.",
    video_url: "https://youtu.be/7T0pGbJJcnE"
  },
  { 
    title: "ẢNH HƯỞNG HẬU CẢNH", 
    desc: "Để ý phần phông nền ngay sát cạnh khuôn mặt.", 
    hint: "Nền bị méo khi nhân vật di chuyển là dấu hiệu ghép mặt.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là Deepfake. Bạn có thể thấy các đường thẳng ở hậu cảnh bị cong nhẹ mỗi khi nhân vật nghiêng đầu.",
    video_url: "https://youtu.be/AQ8VkGH9hk0"
  },
  { 
    title: "XÁC THỰC TỔNG THỂ", 
    desc: "Kết hợp mọi kỹ năng đã học để đánh giá video cuối cùng.", 
    hint: "Tin vào trực giác của bạn nếu cảm thấy 'thung lũng kỳ lạ' (Uncanny Valley).",
    fake_pos: 2, 
    advice: "Video bên PHẢI là Deepfake. Tổng thể chuyển động quá trơn tru nhưng thiếu đi nhịp thở và các cử động vô thức của con người.",
    video_url: "https://youtu.be/8Kmnc2jGE74"
  },
];

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
    { id: "q1", text: "Tôi cảm thấy tự tin hơn khi phân biệt thật giả.", trait: "CONFIDENCE" },
    { id: "q2", text: "Tôi vẫn cảm thấy lo lắng vì AI quá giống thật.", trait: "ANXIETY" },
    { id: "q3", text: "Tôi sẽ luôn kiểm chứng lại các cuộc gọi video.", trait: "SKEPTICISM" },
    { id: "q4", text: "Tôi đã nhận biết được các lỗi hình ảnh cơ bản.", trait: "AWARENESS" },
    { id: "q5", text: "Tôi cảm thấy sốc trước sự tinh vi của công nghệ Deepfake.", trait: "ANXIETY" }, 
    { id: "q6", text: "Tôi cảm thấy an tâm hơn khi biết cách phòng vệ.", trait: "CONFIDENCE" }, 
    { id: "q7", text: "Tôi sẵn sàng chia sẻ kiến thức này cho người thân.", trait: "AWARENESS" } 
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
  },
  { 
    tag: "CẢNH BÁO", title: "Deepfake mượn tiền 'lướt sóng' chứng khoán", date: "12/2025", loss: "Hàng Tỷ VNĐ", 
    desc: "Hack Facebook tạo video 5 giây rồi tắt với lý do 'mạng lag' để mượn tiền.",
    url: "https://baochinhphu.vn"
  },
  { 
    tag: "LỪA TÌNH", title: "Lừa đảo tình cảm bằng công nghệ Face Swap", date: "08/2025", loss: "1.2 Tỷ VNĐ", 
    desc: "Ghép mặt người mẫu vào video call dụ dỗ đầu tư tiền ảo.",
    url: "https://cand.com.vn"
  },
  {
    tag: "CẬP NHẬT", title: "Giả danh nhân viên ngân hàng hỗ trợ khóa thẻ", date: "01/2025", loss: "890 Triệu VNĐ",
    desc: "Yêu cầu quét mã QR để bảo mật nhưng thực chất là chiếm đoạt OTP.",
    url: "https://baotintuc.vn"
  }
];

export const FUN_FACTS: FunFact[] = [
    { title: "MẮT VUÔNG?", content: "Mô hình cũ thường tạo phản chiếu đồng tử hình vuông." },
    { title: "QUÊN THỞ", content: "AI thường quên mô phỏng nhịp thở phồng xẹp của ngực." },
    { title: "GIỌNG 3 GIÂY", content: "AI chỉ cần 3 giây mẫu âm thanh để sao chép giọng nói." }
];
