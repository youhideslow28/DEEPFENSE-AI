
import { LevelData, ChecklistItem, NewsItem, FunFact, PersonalityQuestion } from './types';

export interface EnhancedLevelData extends LevelData {
  technical_flaws: {
    feature: string;
    real_behavior: string;
    ai_error: string;
  }[];
}

export const LEVELS: EnhancedLevelData[] = [
  { 
    id: "v1",
    title: "GIA ĐÌNH LEGO (FAMILY LEGO)", 
    difficulty: "Dễ",
    desc: "Soi kỹ bàn tay và các chi tiết khuôn mặt của nhân vật.", 
    hint: "AI thường 'sáng tạo' thêm ngón tay hoặc làm mờ các chi tiết khớp nối nhỏ.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Biological Inconsistency': Ngón tay dính nhau, bàn tay thiếu cấu trúc xương thực tế và khuôn mặt có hiện tượng biến dạng nhẹ (warping) khi nhân vật quay đầu.",
    video_url: "https://youtu.be/-wenF_aW-gM",
    technical_flaws: [
      { feature: "Cấu trúc bàn tay", real_behavior: "5 ngón rõ ràng, khớp nối tự nhiên.", ai_error: "Ngón tay dính nhau hoặc biến dạng khi quay mặt." }
    ]
  },
  { 
    id: "v2",
    title: "BÀN TAY DƯỚI TÁN CÂY (HANDS/TREES)", 
    difficulty: "Dễ",
    desc: "Đánh giá chất liệu da và cấu trúc nhành cây.", 
    hint: "Da AI thường có độ bóng như sáp (waxy) và thiếu nếp gấp vi mô.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Surface Texture': Da tay trông mịn màng quá mức như sáp (waxy appearance), thiếu độ trong mờ tự nhiên và các nếp nhăn nhỏ ở khớp ngón tay.",
    video_url: "https://youtu.be/7T0pGbJJcnE",
    technical_flaws: [
      { feature: "Kết cấu biểu bì", real_behavior: "Có lỗ chân lông, nếp nhăn và độ trong mờ tự nhiên.", ai_error: "Mịn màng như sáp, thiếu chi tiết vi mô." }
    ]
  },
  { 
    id: "v3",
    title: "HƯƠU CAO CỔ (GIRAFFE)", 
    difficulty: "Trung bình",
    desc: "Phân tích bước chân và sự tương tác với mặt đất.", 
    hint: "Để ý hiện tượng 'trượt chân' (skating) khi con vật di chuyển.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Temporal Consistency': Chân hươu cao cổ có hiện tượng trượt trên cỏ (skating effect) và đường viền tách nền (masking) bị lộ liễu, không hòa hợp với môi trường.",
    video_url: "https://youtu.be/J52kFGgVMpc",
    technical_flaws: [
      { feature: "Tiếp xúc bề mặt", real_behavior: "Bàn chân cố định tại một điểm khi chạm đất.", ai_error: "Chân trượt trên cỏ, tách nền lộ liễu." }
    ]
  },
  { 
    id: "v4",
    title: "CHUỒN CHUỒN (DRAGONFLY)", 
    difficulty: "Trung bình",
    desc: "Nhìn kỹ vào gân cánh và độ rung của đôi cánh.", 
    hint: "Cánh chuồn chuồn thật có cấu trúc gân sắc nét như mạng nhện.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Fine Detail Rendering': Đôi cánh bị mờ (motion blur giả tạo) và thiếu hoàn toàn hệ thống gân cánh phức tạp vốn có của chuồn chuồn thật.",
    video_url: "https://youtu.be/pP3-hpkg6Ps",
    technical_flaws: [
      { feature: "Độ sắc nét chi tiết", real_behavior: "Gân cánh mạng nhện rõ rệt.", ai_error: "Cánh bị mờ, thiếu chi tiết gân cánh." }
    ]
  },
  { 
    id: "v5",
    title: "THIÊN NGA (SWANS)", 
    difficulty: "Khó",
    desc: "Nhìn vào hình ảnh phản chiếu trên mặt nước.", 
    hint: "Phản chiếu phải là hình ảnh đối xứng hoàn hảo qua trục mặt nước.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Reflection Logic': Hình ảnh phản chiếu dưới nước hoàn toàn không khớp với cử động phía trên. Sóng nước cũng di chuyển theo cách phi vật lý (không lan tỏa theo trọng tâm).",
    video_url: "https://youtu.be/jLXuTEAd0eY",
    technical_flaws: [
      { feature: "Logic phản chiếu", real_behavior: "Đối xứng hoàn hảo qua mặt nước.", ai_error: "Phản chiếu không khớp, sóng nước phi vật lý." }
    ]
  },
  { 
    id: "v6",
    title: "THÁC NƯỚC (WATERFALL)", 
    difficulty: "Khó",
    desc: "Phân tích dòng chảy của nước đổ xuống.", 
    hint: "Nước rơi có trọng lực, không lơ lửng như khói.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Material Simulation': Dòng nước trông nhẹ như khói, thiếu khối lượng vật lý. Chuyển động của nước bị lặp lại (looping artifacts) một cách máy móc.",
    video_url: "https://youtu.be/8Kmnc2jGE74",
    technical_flaws: [
      { feature: "Vật lý dòng chảy", real_behavior: "Nước rơi có trọng lượng, tạo bọt trắng.", ai_error: "Dòng nước giống khói, chuyển động lặp lại loop." }
    ]
  },
  { 
    id: "v7",
    title: "HOÀNG HÔN (SUNSET)", 
    difficulty: "Khó",
    desc: "Quan sát sự biến đổi của các đám mây.", 
    hint: "Mây thật di chuyển theo khối đồng nhất.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Latent Space Morphing': Các đám mây có hiện tượng bị biến hình hoặc 'tan chảy' ngay tại chỗ thay vì trôi tịnh tiến theo hướng gió như tự nhiên.",
    video_url: "https://youtu.be/AQ8VkGH9hk0",
    technical_flaws: [
      { feature: "Tính nhất quán của mây", real_behavior: "Di chuyển tịnh tiến tự nhiên.", ai_error: "Mây bị biến hình/tan chảy tại chỗ thay vì trôi." }
    ]
  },
  { 
    id: "v8",
    title: "XÚC CÁT ĐỘNG LỰC HỌC (KINETIC SAND)", 
    difficulty: "Trung bình",
    desc: "Phân tích hình dạng lỗ rỗng sau khi thìa xúc cát lên.", 
    hint: "Cát thật giữ nguyên hình dạng lòng thìa sắc nét.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Geometric Stability': Hình dạng của cái lỗ bị biến đổi liên tục (morphing) thay vì giữ nguyên hình khối ổn định sau khi bị tác động.",
    video_url: "https://youtu.be/OO8p3jN7TBQ",
    technical_flaws: [
      { feature: "Ổn định hình học", real_behavior: "Lỗ rỗng giữ nguyên hình dạng lòng thìa.", ai_error: "Viền lỗ bị biến dạng liên tục sau khi xúc." }
    ]
  },
  { 
    id: "v9",
    title: "CẮT CÁT (SAND CUT)", 
    difficulty: "Dễ",
    desc: "Cảm nhận độ giòn và kết cấu của vật liệu khi bị cắt.", 
    hint: "Cát nén khi cắt phải vỡ vụn thành các hạt nhỏ.",
    fake_pos: 2, 
    advice: "Video bên PHẢI là AI. Lỗi 'Material Consistency': Kết cấu vật liệu trông giống cao su hoặc nhựa dẻo hơn là cát nén nứt vỡ thành hạt li ti.",
    video_url: "https://youtu.be/hglX1Q93en8",
    technical_flaws: [
      { feature: "Kết cấu vật liệu", real_behavior: "Cát vỡ vụn sắc nét thành hạt li ti.", ai_error: "Trông dẻo như đất sét hoặc cao su." }
    ]
  },
  { 
    id: "v10",
    title: "MÁY ÉP THỦY LỰC (HYDRAULIC PRESS)", 
    difficulty: "Dễ",
    desc: "Phân tích cách chất lỏng phản ứng dưới áp suất cực lớn.", 
    hint: "Nước thật khi bắn ra phải có độ hỗn loạn và bắn tia ngẫu nhiên.",
    fake_pos: 1, 
    advice: "Video bên TRÁI là AI. Lỗi 'Fluid Dynamics': Nước dừa loang ra quá mượt như thạch dẻo thay vì bắn tung tóe. Vỏ dừa cũng bị biến dạng dẻo (như nhựa) thay vì nứt vỡ giòn.",
    video_url: "https://youtu.be/UOaKSgHVARM",
    technical_flaws: [
      { feature: "Động lực học chất lỏng", real_behavior: "Nước bắn tung tóe tự nhiên.", ai_error: "Nước loang ra như thạch, vỏ dừa biến dạng dẻo." }
    ]
  },
];

export const EDUCATIONAL_RULES = [
  {
    title: "QUY TẮC 1: VẬT LÝ & TRỌNG LỰC",
    content: "AI thường gặp khó khăn trong việc mô phỏng 'khối lượng' và 'áp suất'. Trong các ví dụ như thác nước hay cát, hãy để ý xem vật liệu có rơi tự nhiên theo trọng lực không, hay nó lơ lửng và biến hình như khói. Chất lỏng thật luôn có sự hỗn loạn vật lý (chaotic splashes) và không bao giờ chảy theo những quỹ đạo hoàn hảo tuyệt đối."
  },
  {
    title: "QUY TẮC 2: CHI TIẾT SINH HỌC",
    content: "Cấu trúc con người là rào cản lớn nhất. Hãy soi kỹ bàn tay (số lượng ngón, khớp nối), ánh mắt (điểm phản chiếu ánh sáng phải đồng nhất) và texture da (da thật có lỗ chân lông, nếp nhăn nheo khi cử động). AI thường 'làm mịn' (blurring) quá mức khiến bề mặt trông như nhựa sáp hoặc làm dính các chi tiết nhỏ vào phông nền."
  },
  {
    title: "QUY TẮC 3: TÍNH NHẤT QUÁN MÔI TRƯỜNG",
    content: "Hãy nhìn vào phông nền và các hình ảnh phản chiếu. Một lỗi kinh điển của AI là 'Skating' (vật thể di chuyển nhưng chân bị trượt trên nền) hoặc phản chiếu dưới nước không khớp với cử động thực phía trên. Các vật thể ở hậu cảnh cũng thường bị méo mó (warping) khi có vật thể ở tiền cảnh chuyển động lướt ngang qua."
  }
];

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
    { id: "q1", text: "Tôi thường tin vào các video tin tức nóng hổi trên mạng xã hội mà không cần kiểm chứng nguồn.", trait: "AWARENESS" },
    { id: "q2", text: "Tôi tự tin mình có thể phân biệt video thật và video giả chỉ sau 5 giây quan sát.", trait: "CONFIDENCE" },
    { id: "q3", text: "Tôi luôn cảm thấy nghi ngờ khi một người quen gọi video yêu cầu chuyển tiền gấp.", trait: "SKEPTICISM" },
    { id: "q4", text: "Tôi lo lắng rằng công nghệ Deepfake sẽ sớm khiến chúng ta không thể tin vào bất cứ thứ gì nữa.", trait: "ANXIETY" }
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
    desc: "Đối tượng dùng Deepfake mặc quân phục gọi video qua Zalo để chiếm quyền điện thoại người dân.",
    url: "https://vtv.vn" 
  },
  { 
    tag: "TP.HCM", title: "'Con trai du học' xin tiền cấp cứu tai nạn", date: "10/2025", loss: "480 Triệu VNĐ", 
    desc: "Nạn nhân nhận cuộc gọi video thấy mặt con trai đang nằm viện (giả tạo bằng AI) để yêu cầu chuyển tiền gấp.",
    url: "https://tuoitre.vn"
  },
  { 
    tag: "QUỐC TẾ", title: "CEO giả tham gia cuộc họp lừa 25 triệu USD", date: "09/2025", loss: "25 Triệu USD", 
    desc: "Vụ lừa kỷ lục tại Hong Kong khi cả phòng họp đều là Deepfake điều khiển bởi AI.",
    url: "https://cnn.com"
  },
  { 
    tag: "CẢNH BÁO", title: "Deepfake mượn tiền 'lướt sóng' chứng khoán", date: "12/2025", loss: "Hàng Tỷ VNĐ", 
    desc: "Hack Facebook tạo video 5 giây rồi tắt với lý do 'mạng lag' để mượn tiền người thân.",
    url: "https://baochinhphu.vn"
  },
  { 
    tag: "LỪA TÌNH", title: "Lừa đảo tình cảm bằng công nghệ Face Swap", date: "08/2025", loss: "1.2 Tỷ VNĐ", 
    desc: "Ghép mặt người mẫu vào video call dụ dỗ đầu tư tiền ảo thông qua các nền tảng hẹn hò.",
    url: "https://cand.com.vn"
  },
  {
    tag: "CẬP NHẬT", title: "Giả danh nhân viên ngân hàng hỗ trợ khóa thẻ", date: "01/2025", loss: "890 Triệu VNĐ",
    desc: "Yêu cầu quét mã QR để bảo mật nhưng thực chất là chiếm đoạt OTP thông qua video Deepfake.",
    url: "https://baotintuc.vn"
  }
];

export const FUN_FACTS: FunFact[] = [
    { title: "MẮT VUÔNG?", content: "Các mô hình AI cũ thường tạo ra phản chiếu đồng tử hình vuông thay vì hình tròn tự nhiên." },
    { title: "QUÊN THỞ", content: "AI thường quên mô phỏng nhịp thở phồng xẹp của lồng ngực khi nhân vật đang nói chuyện." },
    { title: "GIỌNG 3 GIÂY", content: "Chỉ cần 3 giây mẫu âm thanh, AI đã có thể sao chép giọng nói của bạn với độ chính xác 90%." }
];
